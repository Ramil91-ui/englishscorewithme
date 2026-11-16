"""
English 4-Skills Telegram Mini App & AI IELTS Backend
Features:
1. Serves the Telegram Mini App Frontend (HTML/JS) directly at "/"
2. Telegram Bot with Mini App button and Direct Voice Message IELTS Evaluator
3. Gemini 3.8 Flash 4-Criteria IELTS Speaking & Writing Evaluation APIs
4. Telegram initData HMAC-SHA256 Security Validation
5. PWA Manifest, Service Worker, and Icon Routes for standalone App / PWABuilder
"""

import asyncio
import hashlib
import hmac
import io
import json
import os
from pathlib import Path
from urllib.parse import parse_qsl

from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from dotenv import load_dotenv
from fastapi import FastAPI, File, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from google import genai
from google.genai import types as genai_types
from pydantic import BaseModel
import uvicorn

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN", "8676027227:AAGm8-ear126qmAWz-i5BZkhaeL7n45_KvQ")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://englishscorewithme.onrender.com")
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-3.8-flash")

gemini_client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

SPEAKING_IELTS_PROMPT = """
You are a certified IELTS Speaking examiner coaching an Uzbek learner.
Listen carefully to the English audio and evaluate it strictly across the 4 official IELTS Speaking criteria.
Return ONLY valid JSON with these exact keys:
{
  "transcript": "Exact transcription of what the speaker said in English",
  "estimated_overall_band": 6.0,
  "criteria": {
    "fluency_and_coherence": {
      "band": 6.0,
      "comment_uz": "Ravonlik va fikr izchilligi bo'yicha qisqa tahlil (o'zbek tilida)"
    },
    "lexical_resource": {
      "band": 6.0,
      "comment_uz": "So'z boyligi bo'yicha qisqa tahlil (o'zbek tilida)"
    },
    "grammatical_range_and_accuracy": {
      "band": 5.5,
      "comment_uz": "Grammatika va tuzilish bo'yicha qisqa tahlil (o'zbek tilida)"
    },
    "pronunciation": {
      "band": 6.0,
      "comment_uz": "Talaffuz va urg'u bo'yicha qisqa tahlil (o'zbek tilida)"
    }
  },
  "mistakes": [
    "Har bir aniq xato va uning o'zbek tilidagi qisqa tushuntirishi"
  ],
  "upgraded_vocabulary": [
    "Oddiy so'z -> Band 7.5+ muqobili (masalan: very good -> remarkably effective)"
  ],
  "corrected_version": "Natural, Band 7.5+ grammatically accurate English version of the speaker's answer",
  "actionable_tip_uz": "Keyingi urinishda ballni +0.5 ga oshirish uchun 1 ta aniq tavsiya (o'zbek tilida)"
}
"""

WRITING_IELTS_PROMPT = """
You are a certified IELTS Writing examiner coaching an Uzbek learner.
Evaluate the essay against the given prompt across the 4 official IELTS Writing criteria.
Return ONLY valid JSON with these exact keys:
{
  "estimated_overall_band": 6.0,
  "criteria": {
    "task_response": {
      "band": 6.0,
      "comment_uz": "Mavzuni ochib berish darajasi (o'zbek tilida)"
    },
    "coherence_and_cohesion": {
      "band": 6.0,
      "comment_uz": "Abzatslar va bog'lovchi so'zlar izchilligi (o'zbek tilida)"
    },
    "lexical_resource": {
      "band": 6.0,
      "comment_uz": "Lug'at boyligi va akademik iboralar (o'zbek tilida)"
    },
    "grammatical_range_and_accuracy": {
      "band": 5.5,
      "comment_uz": "Grammatik xatolar va murakkab gaplar (o'zbek tilida)"
    }
  },
  "mistakes": [
    "Aniq grammatik yoki imlo xatosi va tuzatish izohi (o'zbek tilida)"
  ],
  "corrected_version": "Improved Band 7.5+ version preserving the user's main ideas",
  "actionable_tip_uz": "Keyingi esse uchun 1 ta aniq tavsiya (o'zbek tilida)"
}
"""

def analyze_speaking_with_gemini(audio_bytes: bytes, mime_type: str = "audio/ogg") -> dict:
    if not gemini_client:
        raise ValueError("GEMINI_API_KEY sozlanmagan! Iltimos, .env faylida GEMINI_API_KEY ni ko'rsating.")
    response = gemini_client.models.generate_content(
        model=MODEL_NAME,
        contents=[
            genai_types.Part.from_bytes(data=audio_bytes, mime_type=mime_type),
            SPEAKING_IELTS_PROMPT,
        ],
        config=genai_types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2,
        ),
    )
    return json.loads(response.text)

def analyze_writing_with_gemini(topic: str, essay: str) -> dict:
    if not gemini_client:
        raise ValueError("GEMINI_API_KEY sozlanmagan! Iltimos, .env faylida GEMINI_API_KEY ni ko'rsating.")
    prompt = f"{WRITING_IELTS_PROMPT}\n\nTopic: {topic}\n\nStudent Essay:\n{essay}"
    response = gemini_client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=genai_types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2,
        ),
    )
    return json.loads(response.text)

def verify_telegram_init_data(init_data: str, bot_token: str) -> dict:
    parsed_data = dict(parse_qsl(init_data, keep_blank_values=True))
    received_hash = parsed_data.pop("hash", None)
    if not received_hash:
        raise HTTPException(status_code=401, detail="initData ichida hash topilmadi")

    data_check_string = "\n".join(
        f"{key}={value}" for key, value in sorted(parsed_data.items())
    )
    secret_key = hmac.new(
        b"WebAppData", bot_token.encode("utf-8"), hashlib.sha256
    ).digest()
    calculated_hash = hmac.new(
        secret_key, data_check_string.encode("utf-8"), hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(calculated_hash, received_hash):
        raise HTTPException(status_code=401, detail="initData imzosi yaroqsiz")

    user_raw = parsed_data.get("user")
    return json.loads(user_raw) if user_raw else {}


# ---------------------------------------------------------
# Asset Location Helper
# ---------------------------------------------------------
def find_file(filename: str) -> Path:
    candidates = [
        Path(__file__).resolve().parent / filename,
        Path(__file__).resolve().parent / "mini_app" / "frontend" / filename,
        Path(__file__).resolve().parent.parent / "frontend" / filename,
        Path(filename).resolve(),
    ]
    for c in candidates:
        if c.exists():
            return c
    return Path(__file__).resolve().parent / filename


# ---------------------------------------------------------
# FastAPI App
# ---------------------------------------------------------
app = FastAPI(title="English 4-Skills & IELTS AI Platform", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_class=HTMLResponse)
async def serve_mini_app():
    """Telegram Mini App Frontendini (PWA) to'g'ridan-to'g'ri taqdim etadi."""
    index_path = find_file("index.html")
    if index_path.exists():
        return HTMLResponse(content=index_path.read_text(encoding="utf-8"), media_type="text/html; charset=utf-8")
    return HTMLResponse(content="<h1>English 4-Skills Mini App</h1>", media_type="text/html")

@app.get("/manifest.json")
async def get_manifest():
    return FileResponse(find_file("manifest.json"), media_type="application/manifest+json")

@app.get("/sw.js")
async def get_sw():
    return FileResponse(find_file("sw.js"), media_type="application/javascript")

@app.get("/icon-192.png")
async def get_icon_192():
    return FileResponse(find_file("icon-192.png"), media_type="image/png")

@app.get("/icon-512.png")
async def get_icon_512():
    return FileResponse(find_file("icon-512.png"), media_type="image/png")

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "app": "EnglishScore & IELTS AI Platform"}

@app.get("/api/me")
async def get_current_user(x_telegram_init_data: str = Header(...)):
    user = verify_telegram_init_data(x_telegram_init_data, BOT_TOKEN)
    return {
        "telegram_id": user.get("id"),
        "first_name": user.get("first_name"),
        "username": user.get("username"),
        "xp": 120,
        "streak_days": 3,
    }

class SpeakingTextAnalyzeRequest(BaseModel):
    topic: str
    transcript: str

@app.post("/api/speaking/analyze_text")
async def analyze_speaking_text_endpoint(
    payload: SpeakingTextAnalyzeRequest,
    x_telegram_init_data: str = Header(default=""),
):
    if not gemini_client:
        raise ValueError("GEMINI_API_KEY sozlanmagan!")
    prompt = f"{SPEAKING_IELTS_PROMPT}\n\nTopic: {payload.topic}\n\nSpeaker Answer:\n{payload.transcript}"
    response = gemini_client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=genai_types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2,
        ),
    )
    return json.loads(response.text)

@app.get("/api/leaderboard")
async def get_leaderboard():
    return {
        "leaderboard": [
            {"rank": 1, "name": "Azizbek R.", "xp": 1450, "badge": "🔥 IELTS 8.0"},
            {"rank": 2, "name": "Madina K.", "xp": 1320, "badge": "💎 C1 Advanced"},
            {"rank": 3, "name": "Jasur T.", "xp": 1180, "badge": "⚡️ Band 7.5"},
            {"rank": 4, "name": "Shahzoda M.", "xp": 960, "badge": "🎯 EnglishScore 450"},
            {"rank": 5, "name": "Dilshod B.", "xp": 820, "badge": "🌟 B2 Upper"},
        ]
    }

@app.post("/api/writing/analyze")
async def analyze_writing_endpoint(
    payload: WritingAnalyzeRequest,
    x_telegram_init_data: str = Header(default=""),
):
    if x_telegram_init_data:
        try:
            verify_telegram_init_data(x_telegram_init_data, BOT_TOKEN)
        except Exception:
            pass
    return analyze_writing_with_gemini(payload.topic, payload.essay)

@app.post("/api/speaking/analyze")
async def analyze_speaking_endpoint(
    audio: UploadFile = File(...),
    x_telegram_init_data: str = Header(default=""),
):
    if x_telegram_init_data:
        try:
            verify_telegram_init_data(x_telegram_init_data, BOT_TOKEN)
        except Exception:
            pass
    audio_bytes = await audio.read()
    mime_type = audio.content_type or "audio/webm"
    return analyze_speaking_with_gemini(audio_bytes, mime_type=mime_type)


# ---------------------------------------------------------
# Telegram Bot (aiogram 3.x)
# ---------------------------------------------------------
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    app_url = WEBAPP_URL or "https://englishscorewithme.onrender.com"
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🚀 English 4-Skills Mini-Ilova",
                    web_app=WebAppInfo(url=app_url),
                )
            ]
        ]
    )
    await message.answer(
        "👋 <b>Xush kelibsiz!</b>\n\n"
        "Bu bot va Mini-Ilova orqali siz:\n"
        "• 🎧 <b>Listening</b> va 📖 <b>Reading</b> mashqlarini bajarishingiz;\n"
        "• ✍️ <b>Writing</b> va 🎙 <b>Speaking</b> bo'yicha Gemini AI yordamida IELTSning 4 ta mezoni bo'yicha aniq Band ball olishingiz mumkin!\n\n"
        "🎙 <i>Menga istalgan inglizcha ovozli xabar (voice message) yuboring — men uni darhol tahlil qilib beraman!</i>",
        reply_markup=keyboard,
        parse_mode="HTML",
    )

@dp.message(F.voice)
async def handle_voice_message(message: types.Message):
    wait_msg = await message.answer("⏳ Audiongiz IELTS mezonlari bo'yicha tahlil qilinmoqda...")

    buffer = io.BytesIO()
    await bot.download(message.voice, destination=buffer)
    audio_bytes = buffer.getvalue()

    try:
        result = analyze_speaking_with_gemini(audio_bytes, mime_type="audio/ogg")
    except Exception as exc:
        await wait_msg.edit_text(f"Tahlil qilishda xatolik yuz berdi: {exc}")
        return

    c = result.get("criteria", {})
    fc = c.get("fluency_and_coherence", {})
    lr = c.get("lexical_resource", {})
    gr = c.get("grammatical_range_and_accuracy", {})
    pr = c.get("pronunciation", {})

    mistakes = result.get("mistakes") or []
    mistakes_text = "\n".join(f"• {m}" for m in mistakes) if mistakes else "• Jiddiy grammatik xato topilmadi!"

    upgrades = result.get("upgraded_vocabulary") or []
    upgrades_text = "\n".join(f"• {u}" for u in upgrades) if upgrades else "• Lug'at darajasi yaxshi."

    reply_text = (
        f"🎯 <b>Taxminiy IELTS Band:</b> {result.get('estimated_overall_band', '—')}\n\n"
        f"📊 <b>4 ta mezon bo'yicha ballar:</b>\n"
        f"• Fluency & Coherence: <b>{fc.get('band', '—')}</b> — {fc.get('comment_uz', '')}\n"
        f"• Lexical Resource: <b>{lr.get('band', '—')}</b> — {lr.get('comment_uz', '')}\n"
        f"• Grammar: <b>{gr.get('band', '—')}</b> — {gr.get('comment_uz', '')}\n"
        f"• Pronunciation: <b>{pr.get('band', '—')}</b> — {pr.get('comment_uz', '')}\n\n"
        f"🎙 <b>Siz aytgan matn:</b>\n<i>\"{result.get('transcript', '')}\"</i>\n\n"
        f"🔍 <b>Xatolar:</b>\n{mistakes_text}\n\n"
        f"✨ <b>So'zlarni kuchaytirish (Band 7.5+):</b>\n{upgrades_text}\n\n"
        f"✅ <b>To'g'ri va tabiiy versiya:</b>\n{result.get('corrected_version', '')}\n\n"
        f"💡 <b>Tavsiya:</b> <i>{result.get('actionable_tip_uz', '')}</i>"
    )
    await wait_msg.edit_text(reply_text, parse_mode="HTML")


async def run_bot():
    await dp.start_polling(bot)

async def main():
    port = int(os.getenv("PORT", 8000))
    server_config = uvicorn.Config(app, host="0.0.0.0", port=port, log_level="info")
    server = uvicorn.Server(server_config)

    await asyncio.gather(
        server.serve(),
        run_bot(),
    )

if __name__ == "__main__":
    asyncio.run(main())
