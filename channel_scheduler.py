"""
Autonomous Channel Scheduler for @YourEnglishflywithme
Runs 24/7 on Render in the cloud alongside FastAPI and Telegram Bot.
Timezone: Asia/Tashkent (UTC+5)

Strict Hourly Schedule:
- 06:00 - Morning Vocabulary (Part 1 - 15 words)
- 09:00 - Bilingual Story + Deep Sentence Analysis + Story Vocab
- 12:00 - 4-Skills: Reading, Listening, Writing, Speaking
- 14:00 - Common Mistakes #1
- 17:00 - Vocabulary (Part 2 - 15 words) + Grammar Masterclass
- 19:00 - Common Mistakes #2 + Interactive Telegram Quiz Polls
- 21:00 - Daily Homework
- 23:00 - Daily Review & Results Checking
"""

import asyncio
from datetime import datetime, timezone, timedelta
import json
import logging
import os
from pathlib import Path

from aiogram import Bot

logger = logging.getLogger("channel_scheduler")
logger.setLevel(logging.INFO)

CHANNEL_ID = os.getenv("CHANNEL_ID", "-1004461906816")
OWNER_ID = int(os.getenv("OWNER_ID", "8659750733"))
DB_PATH = Path(__file__).resolve().parent / "database.json"

TASHKENT_TZ = timezone(timedelta(hours=5))

def get_tashkent_now():
    now = datetime.now(TASHKENT_TZ)
    date_key = now.strftime("%Y-%m-%d")
    return date_key, now.hour, now.minute, now

def load_db():
    default_db = {
        "ratings": {},
        "postedHistory": [],
        "postedToday": {},
        "ownerMessages": [],
        "settings": {"autoPostEnabled": True}
    }
    if DB_PATH.exists():
        try:
            with open(DB_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                default_db.update(data)
        except Exception as e:
            logger.warning(f"Error loading database.json: {e}")
    return default_db

def save_db(db):
    try:
        with open(DB_PATH, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Error saving database.json: {e}")

# -------------------------------------------------------------
# Curated Multi-Day Content Banks
# -------------------------------------------------------------
CONTENT_DAYS = [
    {
        "day": 1,
        "theme": "Habits, Productivity & Test Mastery",
        "vocab_morning": [
            {"w": "Ambiguous", "ipa": "/æmˈbɪɡ.ju.əs/", "pos": "adj", "uz": "noaniq, ikki xil ma'noli", "ex": "The wording of the question was ambiguous."},
            {"w": "Coherent", "ipa": "/kəʊˈhɪə.rənt/", "pos": "adj", "uz": "mantiqiy, izchil", "ex": "She provided a coherent and convincing argument."},
            {"w": "Discrepancy", "ipa": "/dɪˈskrep.ən.si/", "pos": "n", "uz": "tafovut, nomuvofiqlik", "ex": "There is a minor discrepancy in the data."},
            {"w": "Elaborate", "ipa": "/iˈlæb.ər.ət/", "pos": "v", "uz": "batafsil tushuntirmoq", "ex": "Could you elaborate on that particular thesis?"},
            {"w": "Facilitate", "ipa": "/fəˈsɪl.ɪ.teɪt/", "pos": "v", "uz": "osonlashtirmoq, ko'maklashmoq", "ex": "Digital apps facilitate daily vocabulary retention."},
            {"w": "Grasp", "ipa": "/ɡrɑːsp/", "pos": "v", "uz": "chuqur tushunib yetmoq", "ex": "He struggled to grasp the abstract philosophical concept."},
            {"w": "Hesitant", "ipa": "/ˈhez.ɪ.tənt/", "pos": "adj", "uz": "ikkilanuvchan, jur'atsiz", "ex": "Do not be hesitant to articulate your thoughts."},
            {"w": "Impartial", "ipa": "/ɪmˈpɑː.ʃəl/", "pos": "adj", "uz": "xolis, adolatli", "ex": "Examiners remain strictly impartial throughout."},
            {"w": "Jeopardize", "ipa": "/ˈdʒep.ə.daɪz/", "pos": "v", "uz": "xavf ostiga qo'ymoq", "ex": "Skipping mock tests can jeopardize your final band."},
            {"w": "Lucrative", "ipa": "/ˈluː.krə.tɪv/", "pos": "adj", "uz": "katta daromad keltiruvchi", "ex": "Tech fluency opens lucrative international pathways."},
            {"w": "Meticulous", "ipa": "/məˈtɪk.jə.ləs/", "pos": "adj", "uz": "o'ta sinchkov, mayda detallarga e'tiborli", "ex": "She revised her essays with meticulous care."},
            {"w": "Negligible", "ipa": "/ˈneɡ.lɪ.dʒə.bəl/", "pos": "adj", "uz": "arzimas, e'tiborga loyiq bo'lmagan", "ex": "The score difference between attempts was negligible."},
            {"w": "Obsolete", "ipa": "/ˌɒb.səˈliːt/", "pos": "adj", "uz": "eskirgan, muomaladan qolgan", "ex": "Passive memorization techniques are becoming obsolete."},
            {"w": "Persevere", "ipa": "/ˌpɜː.sɪˈvɪər/", "pos": "v", "uz": "qat'iyat bilan davom etmoq", "ex": "If you persevere daily, C1 fluency is guaranteed."},
            {"w": "Resilient", "ipa": "/rɪˈzɪl.jənt/", "pos": "adj", "uz": "irodali, qiyinchilikka bardoshli", "ex": "Resilient learners turn mistakes into stepping stones."}
        ],
        "story": {
            "topic": "The Power of Consistency (Muntazamlik qudrati)",
            "level": "B2 - Upper-Intermediate",
            "english": "David was determined to pass the EnglishScore exam with a high C1 certificate. In the beginning, he made countless errors and found the listening section overwhelming. Instead of giving up, he established a strict daily routine: twenty minutes of audio shadowing and fifteen new academic words before breakfast. Gradually, the complex accents became clearer, and his speech flowed naturally. In less than four months, he obtained an outstanding score that unlocked an international university scholarship.",
            "uzbek": "David EnglishScore imtihonini yuqori C1 darajasida topshirishga qat'iy qaror qildi. Dastlab u son-sanoqsiz xatolarga yo'l qo'ydi va tinglab tushunish bo'limi unga haddan tashqari qiyindek tuyuldi. Taslim bo'lish o'rniga, u qat'iy kunlik tartib o'rnatdi: nonushtadan oldin yigirma daqiqa audio ortidan takrorlash (shadowing) va o'n beshta yangi akademik so'z. Asta-sekin murakkab talaffuzlar ravshanlashdi va uning nutqi tabiiy ravon bo'lib qoldi. To'rt oydan kam vaqt ichida u xalqaro grant yutib olishiga imkon bergan ajoyib natijani qo'lga kiritdi.",
            "analyses": [
                {"s": "David was determined to pass the exam with a high C1 level.", "uz": "David imtihonni yuqori C1 darajasida topshirishga qat'iy qaror qildi.", "rule": "📌 'be determined to + verb' — biror narsaga qat'iy azm qilmoq."},
                {"s": "In the beginning, he made countless errors and found listening overwhelming.", "uz": "Dastlab u ko'plab xatolarga yo'l qo'ydi va eshitish unga qiyin tuyuldi.", "rule": "📌 'make errors' (do emas!). 'find something + adjective' — biror narsani qandaydir deb hisoblamoq."},
                {"s": "Instead of giving up, he established a strict daily routine.", "uz": "Taslim bo'lish o'rniga, u qat'iy kunlik tartib o'rnatdi.", "rule": "📌 'Instead of' predlogidan so'ng Gerund (-ing) fe'li keladi: 'giving up'."},
                {"s": "Gradually, his speech flowed naturally.", "uz": "Asta-sekin uning nutqi tabiiy ravon bo'lib qoldi.", "rule": "📌 'Gradually' (ravish) harakatning sekin-asta rivojlanganini ko'rsatadi."}
            ],
            "vocab": [
                {"w": "Determined", "pos": "adj", "uz": "qat'iy qaror qilgan", "ex": "She was determined to master speaking."},
                {"w": "Overwhelming", "pos": "adj", "uz": "haddan tashqari og'ir, bosim beruvchi", "ex": "The workload felt overwhelming initially."},
                {"w": "Gradually", "pos": "adv", "uz": "asta-sekinlik bilan", "ex": "His pronunciation improved gradually."},
                {"w": "Outstanding", "pos": "adj", "uz": "ajoyib, ko'zga ko'ringan", "ex": "He achieved an outstanding IELTS band 8."}
            ]
        },
        "skills": {
            "reading": (
                "📖 <b>12:00 | 4-SKILLS: READING CHALLENGE</b>\n"
                "<b>Mavzu:</b> <i>Cognitive Agility & Spaced Learning</i>\n\n"
                "Cognitive neuroscience proves that cramming before an exam creates brittle, short-lived memory traces. In contrast, retrieving knowledge across spaced intervals activates the hippocampus to restructure long-term neural connections, yielding superior retention.\n\n"
                "❓ <b>Savol:</b> Nima uchun spaced learning 'cramming'dan samaraliroq?\n"
                "A) U vaqtni tejaydi\n"
                "B) U xotirani uzoq muddatga mustahkamlaydi (hippokampusni faollashtiradi)\n"
                "C) U kitob o'qishni talab qilmaydi\n\n"
                "<i>Javobingizni izohlarda yozib qoldiring! To'g'ri javob: B</i>"
            ),
            "writing": (
                "✍️ <b>12:00 | 4-SKILLS: WRITING TASK 2 PROMPT</b>\n\n"
                "<b>Topic:</b> <i>\"Some believe that smartphones should be banned in high schools to enhance focus, while others argue they are essential educational tools. Discuss both views and give your opinion.\"</i>\n\n"
                "💡 <b>Tavsiya:</b> Fikringizni 3 qismda (Intro, Body, Conclusion) kommentariyda yozing. Eng yaxshi insholar tahlil qilinadi!"
            ),
            "speaking": (
                "🎙 <b>12:00 | 4-SKILLS: SPEAKING DRILL</b>\n\n"
                "<b>Question:</b> <i>\"How do you think artificial intelligence will transform higher education in the next decade?\"</i>\n\n"
                "🎯 <b>Vazifa:</b> Botimizga ovozli xabar (voice) yuboring va Alex AI sizning nutqingizni Band 7.5+ darajaga chiqarib tahlil qilib bersin!"
            )
        },
        "mistakes_part1": [
            {"wrong": "❌ I am looking forward to see you tomorrow.", "correct": "✅ I am looking forward to seeing you tomorrow.", "exp": "📌 'Look forward to' dagi 'to' predlogdir! Predlogdan so'ng har doim Gerund (-ing) keladi."},
            {"wrong": "❌ She explained me the grammar rule.", "correct": "✅ She explained to me the grammar rule.", "exp": "📌 'Explain' fe'li to'g'ridan-to'g'ri shaxsni olmaydi: har doim 'explain to someone' bo'ladi."}
        ],
        "vocab_evening": [
            {"w": "Scrutinize", "ipa": "/ˈskruː.tɪ.naɪz/", "pos": "v", "uz": "sinchkovlik bilan tekshirmoq", "ex": "Examiners scrutinize essay cohesion and task response."},
            {"w": "Tangible", "ipa": "/ˈtæn.dʒə.bəl/", "pos": "adj", "uz": "aniq sezilarli, ko'zga ko'ringan", "ex": "Consistent shadowing yields tangible pronunciation progress."},
            {"w": "Unanimous", "ipa": "/juːˈnæn.ɪ.məs/", "pos": "adj", "uz": "bir ovozdan qabul qilingan", "ex": "The university committee reached a unanimous consensus."},
            {"w": "Vulnerable", "ipa": "/ˈvʌl.nər.ə.bəl/", "pos": "adj", "uz": "zaif, himoyasiz", "ex": "Gaps in grammar make test answers vulnerable to score drops."},
            {"w": "Withstand", "ipa": "/wɪðˈstænd/", "pos": "v", "uz": "bardosh bermoq, chidamoq", "ex": "His analytical argument withstood rigorous cross-examination."},
            {"w": "Yield", "ipa": "/jiːld/", "pos": "v", "uz": "samara bermoq, natija keltirmoq", "ex": "Daily disciplined revision yields remarkable test outcomes."},
            {"w": "Zealous", "ipa": "/ˈzel.əs/", "pos": "adj", "uz": "shijoatli, g'ayratli", "ex": "He is a zealous advocate of English education."},
            {"w": "Alleviate", "ipa": "/əˈliː.vi.eɪt/", "pos": "v", "uz": "yengillashtirmoq, kamaytirmoq", "ex": "Deep breathing alleviates acute test anxiety."},
            {"w": "Benchmark", "ipa": "/ˈbentʃ.mɑːk/", "pos": "n", "uz": "etalon, o'lchov standarti", "ex": "A score of 400 is the international benchmark for C1."},
            {"w": "Comprehensive", "ipa": "/ˌkɒm.prɪˈhen.sɪv/", "pos": "adj", "uz": "har tomonlama, to'liq", "ex": "This channel provides comprehensive test preparation."},
            {"w": "Deteriorate", "ipa": "/dɪˈtɪə.ri.ə.reɪt/", "pos": "v", "uz": "yomonlashmoq, susaymoq", "ex": "Fluency deteriorates rapidly without spoken practice."},
            {"w": "Equitable", "ipa": "/ˈek.wɪ.tə.bəl/", "pos": "adj", "uz": "adolatli, teng huquqli", "ex": "Standardized tests aim to provide equitable assessment."},
            {"w": "Fluctuate", "ipa": "/ˈflʌk.tʃu.eɪt/", "pos": "v", "uz": "o'zgarib turmoq, tebranmoq", "ex": "Test scores fluctuate if sleep and diet are irregular."},
            {"w": "Genuine", "ipa": "/ˈdʒen.ju.ɪn/", "pos": "adj", "uz": "haqiqiy, samimiy", "ex": "She displayed genuine curiosity toward foreign cultures."},
            {"w": "Quintessential", "ipa": "/ˌkwɪn.tɪˈsen.ʃəl/", "pos": "adj", "uz": "namunaviy, eng sara timsoli", "ex": "Punctuality is the quintessential trait of successful students."}
        ],
        "grammar_evening": (
            "📘 <b>17:00 | GRAMMAR MASTERCLASS: INVERSION IN ENGLISH (CEFR C1)</b>\n\n"
            "Qachonki gap inkor yoki cheklovchi iboralar bilan boshlansa, ega va yordamchi fe'l o'rni almashadi (Inversion):\n\n"
            "1️⃣ <b>Hardly / Scarcely ... when:</b>\n"
            "• <i>Hardly had the test begun when the power went out.</i>\n\n"
            "2️⃣ <b>Not only ... but also:</b>\n"
            "• <i>Not only did he pass the exam, but he also achieved Band 8.5!</i>\n\n"
            "3️⃣ <b>Never / Seldom / Rarely:</b>\n"
            "• <i>Never have I witnessed such remarkable dedication.</i>\n\n"
            "💡 <b>Imtihon siri:</b> Inversion insho va speakingda sizning yuqori (Band 7.5 - 8.5) grammatik diapazoningizni isbotlaydi!"
        ),
        "mistakes_part2": [
            {"wrong": "❌ Although it was raining, but we went out.", "correct": "✅ Although it was raining, we went out.", "exp": "📌 'Although' bor joyda 'but' qo'yilmaydi! Ikkalasini bir gapda ishlatish noto'g'ri."},
            {"wrong": "❌ The informations were very useful.", "correct": "✅ The information was very useful.", "exp": "📌 'Information' sanalmaydigan ot. Hech qachon -s olmaydi va fe'l birlikda bo'ladi."}
        ],
        "quizzes": [
            {
                "q": "Select the grammatically correct sentence:",
                "opts": [
                    "Although she was tired, but she completed her essay.",
                    "Although she was tired, she completed her essay.",
                    "Despite she was tired, she completed.",
                    "She was tired although she completed."
                ],
                "correct": 1,
                "exp": "'Although' ishlatilganda 'but' qo'shilmaydi!"
            },
            {
                "q": "Fill in the blank: 'The new ___ provided by the tutor was crucial.'",
                "opts": ["informations", "information", "pieces of informations", "information were"],
                "correct": 1,
                "exp": "'Information' sanalmaydigan ot bo'lib, hech qachon '-s' olmaydi!"
            }
        ],
        "homework": (
            "📚 <b>21:00 | DAILY HOMEWORK (KUNLIK VAZIFA)</b>\n\n"
            "<b>Bugungi topshiriqlar:</b>\n"
            "1️⃣ <b>Vocabulary:</b> Bugungi 30 ta yangi so'zdan 5 tasini tanlab, o'z hayotingiz haqida 5 ta mustaqil gap yozing.\n"
            "2️⃣ <b>Grammar:</b> 'Not only did...', 'Never have I...' yordamida 2 ta Inversion gap tuzing.\n"
            "3️⃣ <b>Speaking & Mini App:</b> Mini Appda 1 ta Listening topshirig'ini yakunlang.\n\n"
            "⏰ <i>Topshiriq javoblaringizni kommentariyda qoldiring!</i>"
        ),
        "daily_review": (
            "🌙 <b>23:00 | DAILY REVIEW & KUN XULOSASI</b>\n\n"
            "Bugun o'rganilgan asosiy natijalar:\n"
            "✅ 30 ta yangi akademik so'z (ertalabki 15 + kechki 15)\n"
            "✅ 'The Power of Consistency' hikoyasi va gapma-gap grammatik tahlili\n"
            "✅ 4 ta ko'nikma (Reading, Writing, Speaking)\n"
            "✅ Eng ko'p yo'l qo'yiladigan 4 ta xato va interaktiv testlar\n"
            "✅ Inversion qoidalari\n\n"
            "Barchaga xayrli tun! Ertaga ertalab soat 06:00 da darslar davom etadi! 🎯"
        )
    }
]

# -------------------------------------------------------------
# Channel Posting Execution Helpers
# -------------------------------------------------------------

async def post_06_morning_vocab(bot: Bot):
    day_data = CONTENT_DAYS[0]
    words = day_data["vocab_morning"]
    text = f"🌅 <b>06:00 | MORNING VOCABULARY (PART 1 - 15 WORDS)</b>\n"
    text += f"<i>CEFR B2-C1 & IELTS uchun bugungi dastlabki 15 ta so'z</i>\n\n"
    for idx, w in enumerate(words, 1):
        text += f"<b>{idx}. {w['w']}</b> <i>{w['ipa']}</i> [{w['pos']}]\n"
        text += f"🇺🇿 <b>Ma'nosi:</b> {w['uz']}\n"
        text += f"📝 <i>\"{w['ex']}\"</i>\n\n"
    text += "🎯 <i>Kun davomida ushbu so'zlarni faol qo'llashga harakat qiling!</i>\n🔗 @YourEnglishflywithme"
    await bot.send_message(chat_id=CHANNEL_ID, text=text, parse_mode="HTML")

async def post_09_story(bot: Bot):
    s = CONTENT_DAYS[0]["story"]
    main_text = (
        f"📖 <b>09:00 | KUN HIKOYASI: {s['topic']}</b>\n"
        f"🎯 <b>Daraja:</b> <i>{s['level']}</i>\n\n"
        f"🇬🇧 <b>In English:</b>\n<i>{s['english']}</i>\n\n"
        f"🇺🇿 <b>O'zbek tilida:</b>\n<i>{s['uzbek']}</i>\n\n"
        f"👇 <i>Quyida hikoyaning gapma-gap grammatik tahlili taqdim etiladi!</i>\n🔗 @YourEnglishflywithme"
    )
    await bot.send_message(chat_id=CHANNEL_ID, text=main_text, parse_mode="HTML")
    await asyncio.sleep(1.5)

    analysis_text = "🔍 <b>HIKOYANING GAPMA-GAP CHUQUR TAHLILI:</b>\n\n"
    for idx, sa in enumerate(s["analyses"], 1):
        analysis_text += f"<b>{idx}-gap:</b> <i>\"{sa['s']}\"</i>\n"
        analysis_text += f"🇺🇿 <i>\"{sa['uz']}\"</i>\n"
        analysis_text += f"{sa['rule']}\n\n"
    await bot.send_message(chat_id=CHANNEL_ID, text=analysis_text, parse_mode="HTML")
    await asyncio.sleep(1.5)

    voc_text = "📚 <b>HIKOYADAGI ASOSIY SO'ZLAR:</b>\n\n"
    for idx, v in enumerate(s["vocab"], 1):
        voc_text += f"<b>{idx}. {v['w']}</b> [{v['pos']}] — {v['uz']}\n"
        voc_text += f"💡 <i>Misol: \"{v['ex']}\"</i>\n\n"
    voc_text += "🔗 @YourEnglishflywithme"
    await bot.send_message(chat_id=CHANNEL_ID, text=voc_text, parse_mode="HTML")

async def post_12_skills(bot: Bot):
    sk = CONTENT_DAYS[0]["skills"]
    await bot.send_message(chat_id=CHANNEL_ID, text=sk["reading"], parse_mode="HTML")
    await asyncio.sleep(2)
    await bot.send_message(chat_id=CHANNEL_ID, text=sk["writing"], parse_mode="HTML")
    await asyncio.sleep(2)
    await bot.send_message(chat_id=CHANNEL_ID, text=sk["speaking"], parse_mode="HTML")

async def post_14_mistakes_part1(bot: Bot):
    items = CONTENT_DAYS[0]["mistakes_part1"]
    text = "⚠️ <b>14:00 | COMMON MISTAKES #1</b>\n\n"
    for item in items:
        text += f"<b>Xato shakli:</b> {item['wrong']}\n"
        text += f"<b>To'g'ri shakli:</b> {item['correct']}\n"
        text += f"{item['exp']}\n\n━━━━━━━━━━━━━━━\n\n"
    text += "💡 <i>O'z nutqingizda va insholarda ushbu xatolarga yo'l qo'ymang!</i>\n🔗 @YourEnglishflywithme"
    await bot.send_message(chat_id=CHANNEL_ID, text=text, parse_mode="HTML")

async def post_17_vocab_and_grammar(bot: Bot):
    day_data = CONTENT_DAYS[0]
    words = day_data["vocab_evening"]
    text = f"🌆 <b>17:00 | VOCABULARY (PART 2 - 15 WORDS)</b>\n\n"
    for idx, w in enumerate(words, 16):
        text += f"<b>{idx}. {w['w']}</b> <i>{w['ipa']}</i> [{w['pos']}]\n"
        text += f"🇺🇿 <b>Ma'nosi:</b> {w['uz']}\n"
        text += f"📝 <i>\"{w['ex']}\"</i>\n\n"
    text += "🔗 @YourEnglishflywithme"
    await bot.send_message(chat_id=CHANNEL_ID, text=text, parse_mode="HTML")
    await asyncio.sleep(2)

    await bot.send_message(chat_id=CHANNEL_ID, text=day_data["grammar_evening"], parse_mode="HTML")

async def post_19_mistakes_and_quizzes(bot: Bot):
    day_data = CONTENT_DAYS[0]
    items = day_data["mistakes_part2"]
    text = "⚠️ <b>19:00 | COMMON MISTAKES #2 & INTERACTIVE QUIZ</b>\n\n"
    for item in items:
        text += f"<b>Xato shakli:</b> {item['wrong']}\n"
        text += f"<b>To'g'ri shakli:</b> {item['correct']}\n"
        text += f"{item['exp']}\n\n━━━━━━━━━━━━━━━\n\n"
    text += "👇 <i>Pastdagi testlarda to'g'ri variantni belgilang!</i>"
    await bot.send_message(chat_id=CHANNEL_ID, text=text, parse_mode="HTML")
    await asyncio.sleep(2)

    for q in day_data["quizzes"]:
        await bot.send_poll(
            chat_id=CHANNEL_ID,
            question=q["q"],
            options=q["opts"],
            type="quiz",
            correct_option_id=q["correct"],
            explanation=q["exp"],
            explanation_parse_mode="HTML",
            is_anonymous=False
        )
        await asyncio.sleep(2)

async def post_21_homework(bot: Bot):
    text = CONTENT_DAYS[0]["homework"]
    await bot.send_message(chat_id=CHANNEL_ID, text=text, parse_mode="HTML")

async def post_23_daily_review(bot: Bot):
    text = CONTENT_DAYS[0]["daily_review"]
    await bot.send_message(chat_id=CHANNEL_ID, text=text, parse_mode="HTML")

SLOT_HANDLERS = {
    6: (post_06_morning_vocab, "06_vocab"),
    9: (post_09_story, "09_story"),
    12: (post_12_skills, "12_skills"),
    14: (post_14_mistakes_part1, "14_mistakes1"),
    17: (post_17_vocab_and_grammar, "17_vocab2"),
    19: (post_19_mistakes_and_quizzes, "19_mistakes2"),
    21: (post_21_homework, "21_homework"),
    23: (post_23_daily_review, "23_review"),
}

# -------------------------------------------------------------
# 24/7 Channel Scheduler Loop
# -------------------------------------------------------------

async def channel_scheduler_loop(bot: Bot):
    logger.info("🚀 Channel Scheduler loop initialized for @YourEnglishflywithme")
    while True:
        try:
            db = load_db()
            if not db.get("settings", {}).get("autoPostEnabled", True):
                await asyncio.sleep(30)
                continue

            date_key, hour, minute, _ = get_tashkent_now()

            # Check all slots
            for slot_hour, (handler, slot_name) in SLOT_HANDLERS.items():
                slot_key = f"{date_key}_{slot_name}"

                # Post condition:
                # 1. It is the exact hour (hour == slot_hour) and not yet posted today.
                # 2. OR if today's slot was missed earlier today (hour >= slot_hour), catch it up cleanly.
                if hour >= slot_hour and not db.get("postedToday", {}).get(slot_key):
                    logger.info(f"⏳ Executing slot: {slot_name} for date {date_key} (Tashkent time: {hour}:{minute})")
                    try:
                        await handler(bot)
                        if "postedToday" not in db:
                            db["postedToday"] = {}
                        db["postedToday"][slot_key] = True
                        if "postedHistory" not in db:
                            db["postedHistory"] = []
                        db["postedHistory"].append({"type": slot_name, "date": datetime.utcnow().isoformat() + "Z"})
                        save_db(db)
                        logger.info(f"✅ Successfully posted slot: {slot_name}")
                        try:
                            await bot.send_message(
                                chat_id=OWNER_ID,
                                text=f"✅ Toshkent vaqti bilan <b>{slot_hour}:00</b> posti kanalga muvaffaqiyatli joylandi! ({slot_name})",
                                parse_mode="HTML"
                            )
                        except Exception:
                            pass
                    except Exception as exc:
                        logger.error(f"❌ Error sending slot {slot_name}: {exc}")

        except Exception as e:
            logger.error(f"Scheduler loop error: {e}")

        # Check every 25 seconds
        await asyncio.sleep(25)
