"""
Telegram bot va Mini-Ilova uchun Gemini API asosida IELTSning 4 ta mezoni bo'yicha
Speaking va Writing javoblarini baholovchi Python backend.

Kerakli kutubxonalar:
    pip install fastapi uvicorn aiogram google-genai pydantic python-dotenv python-multipart

.env faylida bo'lishi kerak:
    BOT_TOKEN=8676027227:AAGm8-ear126qmAWz-i5BZkhaeL7n45_KvQ
    GEMINI_API_KEY=sizning_gemini_api_kalitingiz
    WEBAPP_URL=https://sizning-mini-app-manzilingiz.netlify.app
"""

import asyncio
import hashlib
import hmac
import io
import json
import os
from urllib.parse import parse_qsl

from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from dotenv import load_dotenv
from fastapi import FastAPI, File, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
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
    """Speaking audiosini Gemini orqali 4 ta IELTS mezoni bo'yicha baholaydi."""
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
    """Writing essesini Gemini orqali 4 ta IELTS mezoni bo'yicha baholaydi."""
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
    """Telegram WebApp initData imzosini HMAC-SHA256 orqali tekshiradi."""
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
# 1. FastAPI Endpointlar (Mini-Ilova uchun)
# ---------------------------------------------------------
app = FastAPI(title="IELTS 4-Criteria AI Backend", version="0.3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class WritingAnalyzeRequest(BaseModel):
    topic: str
    essay: str


@app.get("/")
async def root_health():
    return {"status": "ok", "service": "IELTS 4-Criteria AI Backend"}


@app.post("/api/speaking/analyze")
async def analyze_speaking_endpoint(
    audio: UploadFile = File(...),
    x_telegram_init_data: str = Header(...),
):
    verify_telegram_init_data(x_telegram_init_data, BOT_TOKEN)
    audio_bytes = await audio.read()
    mime_type = audio.content_type or "audio/webm"
    return analyze_speaking_with_gemini(audio_bytes, mime_type=mime_type)


@app.post("/api/writing/analyze")
async def analyze_writing_endpoint(
    payload: WritingAnalyzeRequest,
    x_telegram_init_data: str = Header(...),
):
    verify_telegram_init_data(x_telegram_init_data, BOT_TOKEN)
    return analyze_writing_with_gemini(payload.topic, payload.essay)


# ---------------------------------------------------------
# 2. Telegram Bot (Ovozli xabar yuborilganda IELTS tahlili)
# ---------------------------------------------------------
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Mini-Ilovani ochish",
                    web_app=WebAppInfo(url=WEBAPP_URL),
                )
            ]
        ]
    )
    await message.answer(
        "Salom! Menga ingliz tilida ovozli xabar yuboring — men IELTSning 4 ta mezoni "
        "bo'yicha taxminiy Band ballingizni, xatolaringizni va Band 7.5+ to'g'ri versiyasini "
        "chiqarib beraman. Yoki Mini-Ilovani oching:",
        reply_markup=keyboard,
    )


@dp.message(F.voice)
async def handle_voice_message(message: types.Message):
    wait_msg = await message.answer("Audiongiz IELTS mezonlari bo'yicha tahlil qilinmoqda...")

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
        f"🎙 <b>Siz aytgan matn:</b>\n{result.get('transcript', '')}\n\n"
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

    # FastAPI va Telegram botini bir vaqtda parallel ishga tushirish
    await asyncio.gather(
        server.serve(),
        run_bot(),
    )


if __name__ == "__main__":
    asyncio.run(main())
