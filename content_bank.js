// Massive diverse content library for 30+ days of EnglishScore / CEFR excellence
// Prevents repetition and ensures varied, engaging topics daily

const contentDays = [
  {
    day: 1,
    theme: "Productivity, Habits & Mindset (Samaradorlik va odatlar)",
    vocabMorning: [
      { w: "Ambiguous", ipa: "/æmˈbɪɡ.ju.əs/", pos: "adj", uz: "noaniq, ikki xil ma'noli", ex: "The instructions were ambiguous, causing confusion." },
      { w: "Coherent", ipa: "/kəʊˈhɪə.rənt/", pos: "adj", uz: "mantiqiy, uzviy bog'langan", ex: "He presented a coherent argument during the debate." },
      { w: "Discrepancy", ipa: "/dɪˈskrep.ən.si/", pos: "n", uz: "tafovut, nomuvofiqlik", ex: "Auditors spotted a discrepancy in the budget." },
      { w: "Elaborate", ipa: "/iˈlæb.ər.ət/", pos: "v/adj", uz: "batafsil yoritmoq", ex: "Please elaborate on your proposed strategy." },
      { w: "Facilitate", ipa: "/fəˈsɪl.ɪ.teɪt/", pos: "v", uz: "yengillashtirmoq, ko'maklashmoq", ex: "The platform facilitates remote learning." },
      { w: "Grasp", ipa: "/ɡrɑːsp/", pos: "v", uz: "mohiyatini chuqur tushunmoq", ex: "He immediately grasped the significance of the event." },
      { w: "Hesitant", ipa: "/ˈhez.ɪ.tənt/", pos: "adj", uz: "ikkilanuvchan", ex: "Don't be hesitant to showcase your talent." },
      { w: "Impartial", ipa: "/ɪmˈpɑː.ʃəl/", pos: "adj", uz: "xolis, adolatli", ex: "A referee must make impartial decisions." },
      { w: "Jeopardize", ipa: "/ˈdʒep.ə.daɪz/", pos: "v", uz: "xavf ostiga qo'ymoq", ex: "Poor time management will jeopardize your exam." },
      { w: "Lucrative", ipa: "/ˈluː.krə.tɪv/", pos: "adj", uz: "katta daromad keltiruvchi", ex: "He negotiated a lucrative contract in Dubai." },
      { w: "Meticulous", ipa: "/məˈtɪk.jə.ləs/", pos: "adj", uz: "o'ta sinchkov, mayda detallarga e'tiborli", ex: "She pays meticulous attention to grammar rules." },
      { w: "Negligible", ipa: "/ˈneɡ.lɪ.dʒə.bəl/", pos: "adj", uz: "arzimas, hisobga olmaslik mumkin bo'lgan", ex: "The difference in scores was negligible." },
      { w: "Obsolete", ipa: "/ˌɒb.səˈliːt/", pos: "adj", uz: "eskirgan, muomaladan qolgan", ex: "Old rote-learning techniques are now obsolete." },
      { w: "Persevere", ipa: "/ˌpɜː.sɪˈvɪər/", pos: "v", uz: "matonat bilan davom ettirmoq", ex: "Those who persevere invariably achieve fluency." },
      { w: "Resilient", ipa: "/rɪˈzɪl.jənt/", pos: "adj", uz: "qiyinchiliklardan tez tiklanuvchi, bardoshli", ex: "A resilient student learns from every failure." }
    ],
    vocabEvening: [
      { w: "Scrutinize", ipa: "/ˈskruː.tɪ.naɪz/", pos: "v", uz: "maydalab tahlil qilmoq", ex: "Examiners scrutinize essay cohesion." },
      { w: "Tangible", ipa: "/ˈtæn.dʒə.bəl/", pos: "adj", uz: "aniq, qo'l bilan ushlab bo'ladigan natija", ex: "We saw tangible progress within two weeks." },
      { w: "Unanimous", ipa: "/juːˈnæn.ɪ.məs/", pos: "adj", uz: "yakdil, bir ovozdan", ex: "The jury reached a unanimous verdict." },
      { w: "Vulnerable", ipa: "/ˈvʌl.nər.ə.bəl/", pos: "adj", uz: "zaif, himoyasiz", ex: "Grammar gaps make candidates vulnerable." },
      { w: "Withstand", ipa: "/wɪðˈstænd/", pos: "v", uz: "chidamoq, bardosh bermoq", ex: "His logic withstood tough cross-examination." },
      { w: "Yield", ipa: "/jiːld/", pos: "v", uz: "samara bermoq; taslim bo'lmoq", ex: "Daily practice yields compounding results." },
      { w: "Zealous", ipa: "/ˈzel.əs/", pos: "adj", uz: "shijoatli, g'ayratli", ex: "He is a zealous advocate of English education." },
      { w: "Alleviate", ipa: "/əˈliː.vi.eɪt/", pos: "v", uz: "yengillashtirmoq, darmon bo'lmoq", ex: "Mindful breathing alleviates exam pressure." },
      { w: "Benchmark", ipa: "/ˈbentʃ.mɑːk/", pos: "n", uz: "etalon, o'lchov standarti", ex: "CEFR C1 is the global benchmark for professionals." },
      { w: "Comprehensive", ipa: "/ˌkɒm.prɪˈhen.sɪv/", pos: "adj", uz: "har tomonlama, mukammal", ex: "This channel offers comprehensive test preparation." },
      { w: "Deteriorate", ipa: "/dɪˈtɪə.ri.ə.reɪt/", pos: "v", uz: "yomonlashmoq, zaiflashmoq", ex: "Pronunciation deteriorates without speaking drills." },
      { w: "Equitable", ipa: "/ˈek.wɪ.tə.bəl/", pos: "adj", uz: "adolatli, teng huquqli", ex: "EnglishScore provides equitable testing globally." },
      { w: "Fluctuate", ipa: "/ˈflʌk.tʃu.eɪt/", pos: "v", uz: "o'zgarib turmoq, tebranmoq", ex: "Exam performance fluctuates without proper sleep." },
      { w: "Genuine", ipa: "/ˈdʒen.ju.ɪn/", pos: "adj", uz: "haqiqiy, soxta bo'lmagan", ex: "She spoke with genuine passion." },
      { w: "Quintessential", ipa: "/ˌkwɪn.tɪˈsen.ʃəl/", pos: "adj", uz: "eng sara namunasi bo'lgan", ex: "Discipline is quintessential to high achievement." }
    ],
    grammarLesson: `📘 <b>17:00 | GRAMMAR MASTERCLASS: INVERSION FOR ADVANCED CEFR C1</b>\n\n` +
      `<b>Inversion nima?</b> Bu gap ta'sirchanligini oshirish uchun <i>yordamchi fe'l</i>ni <i>ega</i>dan oldinga qo'yishdir.\n\n` +
      `<b>1. Never / Rarely / Seldom:</b>\n` +
      `• <i>Never have I witnessed such outstanding discipline.</i> (Hech qachon bunday matonatni ko'rmaganman)\n\n` +
      `<b>2. Not only ... but also:</b>\n` +
      `• <i>Not only did he score 450 in EnglishScore, but he also won a full scholarship!</i>\n\n` +
      `<b>3. Hardly / Scarcely ... when:</b>\n` +
      `• <i>Hardly had the test begun when the power went out.</i>\n\n` +
      `💡 <b>Imtihon siri:</b> Inversion ishlatilgan insholar va nutqlar tekshiruvchilar tomonidan eng yuqori ball bilan baholanadi!`
  },
  {
    day: 2,
    theme: "Technology, Artificial Intelligence & Modern Career",
    vocabMorning: [
      { w: "Cognitive", ipa: "/ˈkɒɡ.nə.tɪv/", pos: "adj", uz: "idrokka oid, aqliy", ex: "Learning a language enhances cognitive agility." },
      { w: "Paradigm", ipa: "/ˈpær.ə.daɪm/", pos: "n", uz: "yondashuv modeli, qolip", ex: "AI has introduced a paradigm shift in education." },
      { w: "Autonomous", ipa: "/ɔːˈtɒn.ə.məs/", pos: "adj", uz: "mustaqil, avtonom", ex: "We need autonomous systems that think critically." },
      { w: "Disruptive", ipa: "/dɪsˈrʌp.tɪv/", pos: "adj", uz: "mavjud tartibni butkul o'zgartiruvchi", ex: "Smartphones were a disruptive innovation." },
      { w: "Exponential", ipa: "/ˌek.spəˈnen.ʃəl/", pos: "adj", uz: "shiddat bilan o'suvchi", ex: "Vocabulary growth becomes exponential with daily reading." },
      { w: "Plausible", ipa: "/ˈplɔː.zə.bəl/", pos: "adj", uz: "ishonarli, haqiqatga yaqin", ex: "He presented a plausible explanation for the delay." },
      { w: "Versatile", ipa: "/ˈvɜː.sə.taɪl/", pos: "adj", uz: "ko'p qirrali, universal", ex: "A versatile professional adapts to any market." },
      { w: "Imminent", ipa: "/ˈɪm.ɪ.nənt/", pos: "adj", uz: "muqarrar, yaqinlashib kelayotgan", ex: "The launch of the project is imminent." },
      { w: "Ubiquitous", ipa: "/juːˈbɪk.wɪ.təs/", pos: "adj", uz: "hamma yerda mavjud", ex: "English has become ubiquitous in tech industries." },
      { w: "Synthesize", ipa: "/ˈsɪn.θə.saɪz/", pos: "v", uz: "umumlashtirmoq, sintez qilmoq", ex: "Can you synthesize the key points into one summary?" },
      { w: "Augment", ipa: "/ɔːɡˈment/", pos: "v", uz: "kengaytirmoq, kuchaytirmoq", ex: "AI tools augment human productivity." },
      { w: "Redundant", ipa: "/rɪˈdʌn.dənt/", pos: "adj", uz: "ortiqcha, keraksiz bo'lib qolgan", ex: "Manual data entry is becoming redundant." },
      { w: "Pragmatic", ipa: "/præɡˈmæt.ɪk/", pos: "adj", uz: "amaliy, real foydaga yo'naltirilgan", ex: "We need a pragmatic approach to English exams." },
      { w: "Empirical", ipa: "/ɪmˈpɪr.ɪ.kəl/", pos: "adj", uz: "tajribaga asoslangan", ex: "Empirical evidence proves that shadowing improves accent." },
      { w: "Imperative", ipa: "/ɪmˈper.ə.tɪv/", pos: "adj", uz: "o'ta muhim, shart bo'lgan", ex: "It is imperative that you review errors daily." }
    ],
    vocabEvening: [
      { w: "Catalyst", ipa: "/ˈkæt.əl.ɪst/", pos: "n", uz: "turtki beruvchi omil", ex: "Curiosity is the ultimate catalyst for learning." },
      { w: "Pivotal", ipa: "/ˈpɪv.ə.təl/", pos: "adj", uz: "hal qiluvchi, o'ta muhim", ex: "Passing this exam played a pivotal role in his career." },
      { w: "Conceive", ipa: "/kənˈsiːv/", pos: "v", uz: "tasavvur qilmoq, o'ylab topmoq", ex: "It is difficult to conceive of life without the internet." },
      { w: "Detrimental", ipa: "/ˌdet.rɪˈmen.təl/", pos: "adj", uz: "zararli, salbiy ta'sir ko'rsatuvchi", ex: "Lack of consistency is detrimental to progress." },
      { w: "Substantiate", ipa: "/səbˈstæn.ʃi.eɪt/", pos: "v", uz: "dalillar bilan isbotlamoq", ex: "Always substantiate your essay claims with examples." },
      { w: "Profound", ipa: "/prəˈfaʊnd/", pos: "adj", uz: "chuqur, teran", ex: "The book had a profound impact on my perspective." },
      { w: "Fostered", ipa: "/ˈfɒs.təd/", pos: "v", uz: "rivojlantirmoq, qo'llab-quvvatlamoq", ex: "The channel fosters an environment of excellence." },
      { w: "Intricate", ipa: "/ˈɪn.trɪ.kət/", pos: "adj", uz: "chigal, murakkab tuzilgan", ex: "English prepositions can be intricate." },
      { w: "Viable", ipa: "/ˈvaɪ.ə.bəl/", pos: "adj", uz: "yashovchan, amalga oshirib bo'ladigan", ex: "Daily 20-minute practice is a viable strategy." },
      { w: "Prevalent", ipa: "/ˈprev.əl.ənt/", pos: "adj", uz: "keng tarqalgan", ex: "Grammar slips are prevalent among intermediate students." },
      { w: "Mitigate", ipa: "/ˈmɪt.ɪ.ɡeɪt/", pos: "v", uz: "zararini kamaytirmoq, yumshatmoq", ex: "Preparation mitigates exam anxiety." },
      { w: "Scanty", ipa: "/ˈskæn.ti/", pos: "adj", uz: "kam, yetarli bo'lmagan", ex: "Scanty preparation leads to uncertain scores." },
      { w: "Lucid", ipa: "/ˈluː.sɪd/", pos: "adj", uz: "aniq, ravshan va tushunarli", ex: "She wrote a lucid explanation of the problem." },
      { w: "Inherent", ipa: "/ɪnˈher.ənt/", pos: "adj", uz: "tabiatiga xos, ajralmas", ex: "Mistakes are inherent in language acquisition." },
      { w: "Pinnacle", ipa: "/ˈpɪn.ə.kəl/", pos: "n", uz: "cho'qqi, eng yuqori daraja", ex: "Reaching C1 level is the pinnacle of school English." }
    ],
    grammarLesson: `📘 <b>17:00 | GRAMMAR MASTERCLASS: MIXED CONDITIONALS (ARALASH SHART GAMLAR)</b>\n\n` +
      `<b>Mixed Conditionals nima?</b> O'tmishdagi harakatning hozirgi zamondagi natijasi (yoki teskarisi) ifodalanganda ishlatiladi.\n\n` +
      `<b>Formula: Past action -> Present result:</b>\n` +
      `<i>If + Past Perfect (had V3) , would + V1 (now)</i>\n\n` +
      `• <i>If I had studied harder yesterday, I would know the answers today.</i>\n` +
      `• <i>If she hadn't missed the flight, she would be in London right now.</i>\n\n` +
      `💡 <b>EnglishScore Test Savoli:</b> "If you ___ (listen) to my advice earlier, you wouldn't be in this dilemma now." -> <b>had listened</b>!`
  }
];

module.exports = { contentDays };
