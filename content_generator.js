// Professional Content Generator for EnglishScoreWith _me
// Adheres strictly to the user's hourly schedule:
// 06:00 - Morning Vocabulary (Part 1 - 15 words)
// 09:00 - Bilingual Story + Sentence Analysis + Story Vocab
// 12:00 - Skills: Writing, Reading, Listening (Real Audio), Speaking Conversation
// 14:00 - Common Mistakes #1
// 17:00 - Vocabulary (Part 2 - 15 words) + Grammar Lesson
// 19:00 - Common Mistakes #2 + Quizzes
// 21:00 - Daily Homework
// 23:00 - Daily Review & Results Checking

const vocabularyMorning = {
  title: "🌅 06:00 | MORNING VOCABULARY (PART 1 - 15 WORDS)",
  subtitle: "CEFR B2-C1 & EnglishScore uchun bugungi dastlabki 15 ta so'z",
  words: [
    { w: "Ambiguous", ipa: "/æmˈbɪɡ.ju.əs/", pos: "adj", uz: "noaniq, ikki xil ma'noli", ex: "The wording of the question was ambiguous." },
    { w: "Coherent", ipa: "/kəʊˈhɪə.rənt/", pos: "adj", uz: "mantiqiy, izchil", ex: "She failed to provide a coherent explanation." },
    { w: "Discrepancy", ipa: "/dɪˈskrep.ən.si/", pos: "n", uz: "tafovut, nomuvofiqlik", ex: "There is a discrepancy in the numbers." },
    { w: "Elaborate", ipa: "/iˈlæb.ər.ət/", pos: "v/adj", uz: "batafsil tushuntirmoq", ex: "Could you elaborate on that plan?" },
    { w: "Facilitate", ipa: "/fəˈsɪl.ɪ.teɪt/", pos: "v", uz: "osonlashtirmoq, ko'maklashmoq", ex: "The app facilitates daily communication." },
    { w: "Grasp", ipa: "/ɡrɑːsp/", pos: "v", uz: "chuqur tushunib yetmoq", ex: "He struggled to grasp the main concept." },
    { w: "Hesitant", ipa: "/ˈhez.ɪ.tənt/", pos: "adj", uz: "ikkilanuvchan, jur'atsiz", ex: "Don't be hesitant to speak in English." },
    { w: "Impartial", ipa: "/ɪmˈpɑː.ʃəl/", pos: "adj", uz: "xolis, beg'araz", ex: "An examiner must remain impartial." },
    { w: "Jeopardize", ipa: "/ˈdʒep.ə.daɪz/", pos: "v", uz: "xavf ostiga qo'ymoq", ex: "Cheating can jeopardize your entire exam." },
    { w: "Lucrative", ipa: "/ˈluː.krə.tɪv/", pos: "adj", uz: "katta daromadli", ex: "IT offers lucrative career opportunities." },
    { w: "Meticulous", ipa: "/məˈtɪk.jə.ləs/", pos: "adj", uz: "o'ta sinchkov, mayda detallarga e'tiborli", ex: "He prepared with meticulous care." },
    { w: "Negligible", ipa: "/ˈneɡ.lɪ.dʒə.bəl/", pos: "adj", uz: "arzimas, e'tiborga loyiq bo'lmagan", ex: "The difference was negligible." },
    { w: "Obsolete", ipa: "/ˌɒb.səˈliːt/", pos: "adj", uz: "eskirgan, iste'moldan chiqqan", ex: "Old methods are becoming obsolete." },
    { w: "Persevere", ipa: "/ˌpɜː.sɪˈvɪər/", pos: "v", uz: "qat'iyat bilan davom etmoq", ex: "If you persevere, you will score 400+." },
    { w: "Resilient", ipa: "/rɪˈzɪl.jənt/", pos: "adj", uz: "irodali, qiyinchilikka bardoshli", ex: "Successful learners are highly resilient." }
  ]
};

const storyContent = {
  topic: "The Power of Consistency (Muntazamlik qudrati)",
  level: "B2 - Upper-Intermediate",
  english: "David was determined to pass the EnglishScore exam with a high C1 level. In the beginning, he made countless errors and found the listening section overwhelming. Instead of giving up, he established a strict daily routine: twenty minutes of shadowing and five new words before breakfast. Gradually, the complex accents became clearer, and his speech flowed naturally. In less than four months, he obtained an outstanding score that unlocked an international scholarship.",
  uzbek: "David EnglishScore imtihonini yuqori C1 darajasida topshirishga qat'iy qaror qildi. Dastlab u son-sanoqsiz xatolarga yo'l qo'ydi va tinglab tushunish bo'limi unga haddan tashqari qiyindek tuyuldi. Taslim bo'lish o'rniga, u qat'iy kunlik tartib o'rnatdi: nonushtadan oldin yigirma daqiqa audio ortidan takrorlash (shadowing) va beshta yangi so'z. Asta-sekin murakkab talaffuzlar ravshanlashdi va uning nutqi tabiiy ravon bo'lib qoldi. To'rt oydan kam vaqt ichida u xalqaro grant yutib olishiga imkon bergan ajoyib natijani qo'lga kiritdi.",
  sentenceAnalysis: [
    {
      sentence: "David was determined to pass the EnglishScore exam with a high C1 level.",
      uzbek: "David EnglishScore imtihonini yuqori C1 darajasida topshirishga qat'iy qaror qildi.",
      breakdown: "🔹 <b>Qoida:</b> 'be determined to + infinitive' — biror narsani amalga oshirishga azmu-qaror qilmoq."
    },
    {
      sentence: "In the beginning, he made countless errors and found the listening section overwhelming.",
      uzbek: "Dastlab u son-sanoqsiz xatolarga yo'l qo'ydi va tinglab tushunish bo'limi unga haddan tashqari qiyindek tuyuldi.",
      breakdown: "🔹 <b>Qoida:</b> 'make errors' (do errors EMAS!). 'find something + adjective' strukturasi: biror narsani qandaydir deb hisoblamoq ('found it overwhelming')."
    },
    {
      sentence: "Instead of giving up, he established a strict daily routine.",
      uzbek: "Taslim bo'lish o'rniga, u qat'iy kunlik tartib o'rnatdi.",
      breakdown: "🔹 <b>Qoida:</b> 'Instead of' predlogidan so'ng fe'l Gerund shaklida keladi: 'giving up'."
    },
    {
      sentence: "Gradually, the complex accents became clearer, and his speech flowed naturally.",
      uzbek: "Asta-sekin murakkab talaffuzlar ravshanlashdi va uning nutqi tabiiy ravon bo'lib qoldi.",
      breakdown: "🔹 <b>Qoida:</b> 'Gradually' va 'naturally' ravishlari gapdagi harakatning qay tarzda kechganini aniqlashtiradi."
    },
    {
      sentence: "In less than four months, he obtained an outstanding score that unlocked an international scholarship.",
      uzbek: "To'rt oydan kam vaqt ichida u xalqaro grant yutib olishiga imkon bergan ajoyib natijani qo'lga kiritdi.",
      breakdown: "🔹 <b>Qoida:</b> 'that unlocked...' nisbiy ergash gap (relative clause) bo'lib, 'outstanding score'ni izohlaydi."
    }
  ],
  vocabulary: [
    { word: "Determined", pos: "adj.", uz: "qat'iyatli, azm qilgan", eg: "She is determined to succeed." },
    { word: "Countless", pos: "adj.", uz: "son-sanoqsiz", eg: "He has read countless articles." },
    { word: "Overwhelming", pos: "adj.", uz: "haddan ortiq qiyin / zalvorli", eg: "The exam seemed overwhelming at first." },
    { word: "Establish", pos: "v.", uz: "yo'lga qo'ymoq, o'rnatmoq", eg: "He established a daily study plan." },
    { word: "Outstanding", pos: "adj.", uz: "ajoyib, eng zo'r", eg: "She achieved outstanding test results." }
  ]
};

const skillsContent = {
  writing: `✍️ <b>12:00 | WRITING PRACTICE:</b>
<b>Topic:</b> <i>"Do smartphones improve or hinder students' academic performance?"</i>
<b>Task:</b> Berilgan mavzu bo'yicha 100-140 so'zdan iborat o'z fikringizni bildiring.
💡 <b>Tavsiya etiladigan so'zlar:</b> <i>facilitate, distraction, detrimental, discipline</i>.
Javoblaringizni kommentariylarda qoldiring!`,

  reading: `📖 <b>12:00 | READING COMPREHENSION:</b>
<i>"The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a kitchen timer to break work into intervals, typically 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro. The technique aims to reduce distractions and sustain high mental focus."</i>

❓ <b>Savol:</b> What is the primary purpose of the Pomodoro Technique?
A) To make cooking faster
B) To reduce distractions and sustain mental focus
C) To lengthen workday hours
<i>To'g'ri javobni fikrlarda belgilang!</i>`,

  listeningAudioScript: `Good afternoon listeners. Here is today's listening challenge. When preparing for high-stakes English exams like EnglishScore or IELTS, consistency always beats intensity. Studying twenty minutes every single day produces far better retention than studying five hours once a week. Now, listen to the speaker and identify what beats intensity in language preparation.`,

  speaking: `🗣 <b>12:00 | SPEAKING & DIALOGUE PRACTICE:</b>
<b>Vazifa: Ovoz chiqarib o'qing va ovozli xabar (voice) orqali takrorlang:</b>

👤 <b>A:</b> "Have you checked the latest EnglishScore requirements for the scholarship?"
👥 <b>B:</b> "Yes, indeed! They require at least a 420 score, which corresponds to C1 advanced."
👤 <b>A:</b> "That sounds challenging, but consistent daily practice will get us there!"`
};

const commonMistakesPart1 = {
  title: "⚠️ 14:00 | COMMON MISTAKES #1",
  items: [
    {
      wrong: "❌ I am looking forward to see you tomorrow.",
      correct: "✅ I am looking forward to seeing you tomorrow.",
      explanation: "📌 'Look forward to' birikmasidagi 'to' predlogdir! Predloglardan so'ng har doim fe'l <b>-ing (Gerund)</b> oladi: <i>to seeing</i>."
    },
    {
      wrong: "❌ She explained me the grammar rule.",
      correct: "✅ She explained to me the grammar rule.",
      explanation: "📌 'Explain' fe'li to'g'ridan-to'g'ri odamni obyekt qilib olmaydi, albatta 'to' predlogi kerak bo'ladi: <i>explain to someone</i>."
    }
  ]
};

const vocabularyEvening = {
  title: "🌆 17:00 | VOCABULARY (PART 2 - 15 WORDS) & GRAMMAR",
  words: [
    { w: "Scrutinize", ipa: "/ˈskruː.tɪ.naɪz/", pos: "v", uz: "sinchkovlik bilan tekshirmoq", ex: "The auditors scrutinized every transaction." },
    { w: "Tangible", ipa: "/ˈtæn.dʒə.bəl/", pos: "adj", uz: "aniq sezilarli, moddiy", ex: "We need tangible improvements in vocabulary." },
    { w: "Unanimous", ipa: "/juːˈnæn.ɪ.məs/", pos: "adj", uz: "bir ovozdan qabul qilingan", ex: "The decision was unanimous." },
    { w: "Vulnerable", ipa: "/ˈvʌl.nər.ə.bəl/", pos: "adj", uz: "zaif, himoyasiz", ex: "Beginners feel vulnerable when speaking." },
    { w: "Withstand", ipa: "/wɪðˈstænd/", pos: "v", uz: "bardosh bermoq", ex: "The theory failed to withstand criticism." },
    { w: "Yield", ipa: "/jiːld/", pos: "v", uz: "samara bermoq, hosil keltirmoq", ex: "Daily practice yields great results." },
    { w: "Zealous", ipa: "/ˈzel.əs/", pos: "adj", uz: "g'ayratli, ishtiyoqli", ex: "He is a zealous language learner." },
    { w: "Alleviate", ipa: "/əˈliː.vi.eɪt/", pos: "v", uz: "yengillashtirmoq, kamaytirmoq", ex: "Deep breaths alleviate test anxiety." },
    { w: "Benchmark", ipa: "/ˈbentʃ.mɑːk/", pos: "n", uz: "o'lchov standarti", ex: "A score of 400 is our benchmark." },
    { w: "Comprehensive", ipa: "/ˌkɒm.prɪˈhen.sɪv/", pos: "adj", uz: "har tomonlama, to'liq", ex: "This is a comprehensive study guide." },
    { w: "Deteriorate", ipa: "/dɪˈtɪə.ri.ə.reɪt/", pos: "v", uz: "yomonlashmoq", ex: "Language skills deteriorate without practice." },
    { w: "Equitable", ipa: "/ˈek.wɪ.tə.bəl/", pos: "adj", uz: "adolatli, teng", ex: "We guarantee equitable evaluation." },
    { w: "Fluctuate", ipa: "/ˈflʌk.tʃu.eɪt/", pos: "v", uz: "tebranmoq, o'zgarib turmoq", ex: "Test scores fluctuate if sleep is poor." },
    { w: "Genuine", ipa: "/ˈdʒen.ju.ɪn/", pos: "adj", uz: "haqiqiy, samimiy", ex: "He showed genuine enthusiasm." },
    { w: "Quintessential", ipa: "/ˌkwɪn.tɪˈsen.ʃəl/", pos: "adj", uz: "namunaviy, eng mukammal", ex: "Tea is the quintessential British beverage." }
  ],
  grammar: `📘 <b>17:00 | GRAMMAR LESSON: INVERSION IN ENGLISH</b>
Qachonki gap inkor yoki cheklovchi so'zlar bilan boshlansa, ega va yordamchi fe'l o'rni almashadi (Inversion):
• <i>Hardly had I finished breakfast when the phone rang.</i>
• <i>Not only did he pass the exam, but he also achieved C1!</i>
• <i>Never have I witnessed such dedication.</i>

⚠️ <b>Imtihonda e'tibor bering:</b> Inversion har doim rasmiy, C1 darajasidagi konstruksiyadir!`
};

const commonMistakesPart2 = {
  title: "⚠️ 19:00 | COMMON MISTAKES #2 & INTERACTIVE QUIZ",
  items: [
    {
      wrong: "❌ Although it was raining, but we went out.",
      correct: "✅ Although it was raining, we went out.",
      explanation: "📌 'Although' bor joyda 'but' ishlatilmaydi! Ikkalasini bir gapda birdaniga ishlatish qo'pol xatodir."
    },
    {
      wrong: "❌ The informations were very useful.",
      correct: "✅ The information was very useful.",
      explanation: "📌 'Information' sanalmaydigan ot (uncountable). U hech qachon ko'plikda '-s' olmaydi va fe'l birlikda ('was') bo'ladi."
    }
  ],
  quizzes: [
    {
      q: "Select the correct sentence:",
      opts: [
        "Although she was tired, but she finished her essay.",
        "Although she was tired, she finished her essay.",
        "Despite she was tired, she finished.",
        "She was tired although she finished."
      ],
      correct: 1,
      exp: "'Although' ishlatilganda 'but' qo'yilmaydi!"
    },
    {
      q: "Fill in the blank: 'The new ___ provided by the tutor was crucial.'",
      opts: ["informations", "information", "pieces of informations", "information were"],
      correct: 1,
      exp: "'Information' sanalmaydi, hech qachon '-s' olmaydi!"
    }
  ]
};

const homeworkContent = {
  title: "📚 21:00 | DAILY HOMEWORK (KUNLIK UYGA VAZIFA)",
  tasks: `<b>Bugungi topshiriqlar (bajarish majburiy):</b>

1️⃣ <b>Vocabulary:</b> Bugungi 30 ta so'zdan (ertalabki 15 ta + kechki 15 ta) eng yoqqan 5 tasini tanlab, o'z hayotingizdan kelib chiqib 5 ta mustaqil gap yozing.
2️⃣ <b>Grammar (Inversion):</b> 'Hardly had...', 'Never have I...', 'Not only did...' konstruksiyalari bilan 3 ta gap tuzing.
3️⃣ <b>Writing:</b> 12:00 dagi Pomodoro va smartfonlar mavzusidagi mini-inshoni kommentariyda yozib qoldiring.

⏰ <i>Topshiriq javoblarini kanal izohlarida (comments) qoldiring. Eng yaxshi javoblar soat 23:00 da tahlil qilinadi!</i>`
};

const dailyReviewContent = {
  title: "🌙 23:00 | DAILY RESULTS CHECKING & REVIEW",
  text: `Kun yakunlandi! Bugun biz:
✅ 30 ta C1 darajadagi yangi so'zlarni o'rgandik.
✅ Yangi hikoya va uning chuqur sintaktik tahlili bilan tanishdik.
✅ Reading, Writing, Speaking va real audio orqali Listening mashq qildik.
✅ Eng ko'p yo'l qo'yiladigan 4 ta asosiy grammatik xatoni to'g'riladik.
✅ Uyga vazifalarni qabul qildik.

Bugun faol qatnashgan barcha o'quvchilarga rahmat! Ertaga ertalab 06:00 da yangi so'zlar bilan darslar davom etadi! 🎯`
};

module.exports = {
  vocabularyMorning,
  storyContent,
  skillsContent,
  commonMistakesPart1,
  vocabularyEvening,
  commonMistakesPart2,
  homeworkContent,
  dailyReviewContent
};
