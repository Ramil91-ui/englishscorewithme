// Master Vocabulary & IELTS Word Bank (CEFR A1 -> C2 / Band 9.0)
// High-Frequency Oxford 3000/5000, Academic Word List (AWL), Collocations & Idioms

const VOCAB_DATABASE = [
  // ================= A1 - BEGINNER (0 dan boshlovchilar) =================
  { w: "Ability", ipa: "/əˈbɪl.ə.ti/", pos: "noun", level: "A1", uz: "qobiliyat, layoqat", ex: "She demonstrated a natural ability to learn foreign languages.", topic: "Education" },
  { w: "Achieve", ipa: "/əˈtʃiːv/", pos: "verb", level: "A1", uz: "erishmoq, qo'lga kiritmoq", ex: "Consistent daily effort helps you achieve your goals.", topic: "Success" },
  { w: "Advice", ipa: "/ədˈvaɪs/", pos: "noun", level: "A1", uz: "maslahat, yo'l-yo'riq", ex: "My teacher gave me invaluable advice on test preparation.", topic: "Daily Life" },
  { w: "Agree", ipa: "/əˈɡriː/", pos: "verb", level: "A1", uz: "rozi bo'lmoq, fikriga qo'shilmoq", ex: "I strongly agree with the first speaker's perspective.", topic: "Communication" },
  { w: "Allow", ipa: "/əˈlaʊ/", pos: "verb", level: "A1", uz: "ruxsat bermoq, imkoniyat yaratmoq", ex: "Smartphones allow students to access global information instantly.", topic: "Technology" },
  { w: "Arrive", ipa: "/əˈraɪv/", pos: "verb", level: "A1", uz: "yetib kelmoq, tashrif buyurmoq", ex: "The flight arrived precisely on schedule.", topic: "Travel" },
  { w: "Believe", ipa: "/bɪˈliːv/", pos: "verb", level: "A1", uz: "ishonmoq", ex: "Experts believe that active practice enhances long-term memory.", topic: "Mindset" },
  { w: "Borrow", ipa: "/ˈbɒr.əʊ/", pos: "verb", level: "A1", uz: "qarzga olmoq, vaqtincha olmoq", ex: "University students may borrow up to five books per week.", topic: "Daily Life" },
  { w: "Choose", ipa: "/tʃuːz/", pos: "verb", level: "A1", uz: "tanlamoq, ixtiyor qilmoq", ex: "Candidates must choose one topic for the discussion.", topic: "Education" },
  { w: "Decide", ipa: "/dɪˈsaɪd/", pos: "verb", level: "A1", uz: "qaror qabul qilmoq", ex: "He decided to pursue higher education in the UK.", topic: "Decisions" },
  { w: "Describe", ipa: "/dɪˈskraɪb/", pos: "verb", level: "A1", uz: "tasvirlamoq, ta'riflamoq", ex: "Describe your hometown in the Speaking Part 1 interview.", topic: "Speaking" },
  { w: "Explain", ipa: "/ɪkˈspleɪn/", pos: "verb", level: "A1", uz: "tushuntirmoq, izohlamoq", ex: "Can you explain why sustainable energy is so vital?", topic: "Communication" },
  { w: "Improve", ipa: "/ɪmˈpruːv/", pos: "verb", level: "A1", uz: "yaxshilamoq, rivojlantirmoq", ex: "Daily shadowing exercises improve English pronunciation rapidly.", topic: "Learning" },
  { w: "Listen", ipa: "/ˈlɪs.ən/", pos: "verb", level: "A1", uz: "diqqat bilan tinglamoq", ex: "Listen attentively to distinguish subtle British accents.", topic: "Listening" },
  { w: "Practise", ipa: "/ˈpræk.tɪs/", pos: "verb", level: "A1", uz: "mashq qilmoq, shug'ullanmoq", ex: "Practise speaking in English for 20 minutes every morning.", topic: "Habits" },

  // ================= A2 - ELEMENTARY / PRE-INTERMEDIATE =================
  { w: "Accurate", ipa: "/ˈæk.jə.rət/", pos: "adj", level: "A2", uz: "aniq, to'g'ri, xatosiz", ex: "Candidates must provide accurate statistics in Writing Task 1.", topic: "Academic" },
  { w: "Benefit", ipa: "/ˈben.ɪ.fɪt/", pos: "noun/verb", level: "A2", uz: "foyda, afzallik; foyda ko'rmoq", ex: "Regular exercise yields substantial mental and physical benefits.", topic: "Health" },
  { w: "Challenge", ipa: "/ˈtʃæl.ɪndʒ/", pos: "noun/verb", level: "A2", uz: "qiyinchilik, sinov; chorlamoq", ex: "Adapting to a new academic environment presents a real challenge.", topic: "Growth" },
  { w: "Develop", ipa: "/dɪˈvel.əp/", pos: "verb", level: "A2", uz: "rivojlantirmoq, shakllantirmoq", ex: "Extensive reading develops critical reasoning skills.", topic: "Education" },
  { w: "Effort", ipa: "/ˈef.ət/", pos: "noun", level: "A2", uz: "sa'y-harakat, tirishqoqlik", ex: "Attaining fluency demands deliberate and disciplined effort.", topic: "Productivity" },
  { w: "Frequent", ipa: "/ˈfriː.kwənt/", pos: "adj", level: "A2", uz: "tez-tez uchraydigan, odatiy", ex: "Frequent vocabulary review prevents memory degradation.", topic: "Learning" },
  { w: "Manage", ipa: "/ˈmæn.ɪdʒ/", pos: "verb", level: "A2", uz: "boshqarmoq; uddalamoq", ex: "Time management is crucial to completing IELTS Reading on time.", topic: "Productivity" },
  { w: "Opportunity", ipa: "/ˌɒp.əˈtʃuː.nə.ti/", pos: "noun", level: "A2", uz: "imkoniyat, qulay vaziyat", ex: "High English proficiency unlocks global career opportunities.", topic: "Career" },
  { w: "Require", ipa: "/rɪˈkwaɪər/", pos: "verb", level: "A2", uz: "talab qilmoq, muhtoj bo'lmoq", ex: "International universities require a minimum IELTS band of 6.5.", topic: "Academic" },
  { w: "Various", ipa: "/ˈveə.ri.əs/", pos: "adj", level: "A2", uz: "turli-tuman, xilma-xil", ex: "The speaker explored various renewable energy options.", topic: "General" },
  { w: "Discover", ipa: "/dɪˈskʌv.ər/", pos: "verb", level: "A2", uz: "kashf etmoq, bilib olmoq", ex: "Scientists discovered microscopic organisms in deep sea trenches.", topic: "Science" },
  { w: "Convenient", ipa: "/kənˈviː.ni.ənt/", pos: "adj", level: "A2", uz: "qulay, oson, mos", ex: "Mobile mini-apps provide a convenient way to study anywhere.", topic: "Technology" },
  { w: "Encourage", ipa: "/ɪnˈkʌr.ɪdʒ/", pos: "verb", level: "A2", uz: "ilhomlantirmoq, dalda bermoq", ex: "Tutors encourage students to articulate opinions freely.", topic: "Education" },

  // ================= B1 - INTERMEDIATE (IELTS 5.0 - 6.0) =================
  { w: "Approach", ipa: "/əˈprəʊtʃ/", pos: "noun/verb", level: "B1", uz: "yondashuv, usul; yaqinlashmoq", ex: "We need a structured approach to master academic writing.", topic: "Methodology" },
  { w: "Circumstance", ipa: "/ˈsɜː.kəm.stɑːns/", pos: "noun", level: "B1", uz: "vaziyat, holat, shart-sharoit", ex: "Under no circumstances should exam rules be breached.", topic: "Society" },
  { w: "Consistent", ipa: "/kənˈsɪs.tənt/", pos: "adj", level: "B1", uz: "izchil, muntazam, barqaror", ex: "Consistent spaced repetition beats marathon cramming sessions.", topic: "Habits" },
  { w: "Demonstrate", ipa: "/ˈdem.ən.streɪt/", pos: "verb", level: "B1", uz: "isbotlamoq, yaqqol ko'rsatmoq", ex: "The statistics demonstrate a steady rise in electric vehicle sales.", topic: "Academic" },
  { w: "Essential", ipa: "/ɪˈsen.ʃəl/", pos: "adj", level: "B1", uz: "o'ta muhim, zaruriy", ex: "Collocations and phrasal verbs are essential for IELTS 7.0+.", topic: "Education" },
  { w: "Generate", ipa: "/ˈdʒen.ə.reɪt/", pos: "verb", level: "B1", uz: "ishlab chiqarmoq, yaratmoq", ex: "Offshore wind turbines generate sustainable electric power.", topic: "Environment" },
  { w: "Impact", ipa: "/ˈɪm.pækt/", pos: "noun/verb", level: "B1", uz: "ta'sir, natija; ta'sir o'tkazmoq", ex: "Urbanization has a profound impact on indigenous biodiversity.", topic: "Environment" },
  { w: "Maintain", ipa: "/meɪnˈteɪn/", pos: "verb", level: "B1", uz: "bir maromda ushlab turmoq", ex: "Candidates must maintain composure during the speaking test.", topic: "Mindset" },
  { w: "Participate", ipa: "/pɑːˈtɪs.ɪ.peɪt/", pos: "verb", level: "B1", uz: "faol ishtirok etmoq, qatnashmoq", ex: "Students who participate actively in seminars retain more information.", topic: "Academic" },
  { w: "Significant", ipa: "/sɪɡˈnɪf.ɪ.kənt/", pos: "adj", level: "B1", uz: "sezilarli, salmoqli, muhim", ex: "There was a significant leap in listening comprehension scores.", topic: "Statistics" },
  { w: "Analyze", ipa: "/ˈæn.əl.aɪz/", pos: "verb", level: "B1", uz: "tahlil qilmoq, chuqur o'rganmoq", ex: "You must analyze the chart trends before drafting Task 1.", topic: "Writing" },
  { w: "Crucial", ipa: "/ˈkruː.ʃəl/", pos: "adj", level: "B1", uz: "hal qiluvchi, o'ta zarur", ex: "Grammatical accuracy plays a crucial role in examiner assessment.", topic: "IELTS" },
  { w: "Perspective", ipa: "/pəˈspek.tɪv/", pos: "noun", level: "B1", uz: "nuqtai nazar, dunyoqarash", ex: "Examining issues from a global perspective broadens intellect.", topic: "Philosophy" },

  // ================= B2 - UPPER-INTERMEDIATE (IELTS 6.0 - 7.0) =================
  { w: "Ambiguous", ipa: "/æmˈbɪɡ.ju.əs/", pos: "adj", level: "B2", uz: "noaniq, ikki xil tushuniladigan", ex: "Avoid ambiguous phrasing in IELTS academic essays.", topic: "Writing" },
  { w: "Coherent", ipa: "/kəʊˈhɪə.rənt/", pos: "adj", level: "B2", uz: "mantiqiy bog'langan, izchil", ex: "Ensure your paragraphs present a coherent progression of ideas.", topic: "Writing" },
  { w: "Facilitate", ipa: "/fəˈsɪl.ɪ.teɪt/", pos: "verb", level: "B2", uz: "osonlashtirmoq, ko'maklashmoq", ex: "Modern educational technology facilitates personalized learning.", topic: "Technology" },
  { w: "Inevitable", ipa: "/ɪnˈev.ɪ.tə.bəl/", pos: "adj", level: "B2", uz: "muqarrar, qochib bo'lmas", ex: "Technological disruptions are inevitable in the modern economy.", topic: "Society" },
  { w: "Lucrative", ipa: "/ˈluː.krə.tɪv/", pos: "adj", level: "B2", uz: "katta daromad keltiruvchi", ex: "Advanced bilingual skills open pathways to lucrative global careers.", topic: "Career" },
  { w: "Persevere", ipa: "/ˌpɜː.sɪˈvɪər/", pos: "verb", level: "B2", uz: "qat'iyat ko'rsatmoq, taslim bo'lmaslik", ex: "Those who persevere through demanding mock exams succeed.", topic: "Mindset" },
  { w: "Resilient", ipa: "/rɪˈzɪl.jənt/", pos: "adj", level: "B2", uz: "chidamli, qiyinchilikdan tez tiklanuvchi", ex: "Resilient candidates bounce back quickly from initial mistakes.", topic: "Psychology" },
  { w: "Scrutinize", ipa: "/ˈskruː.tɪ.naɪz/", pos: "verb", level: "B2", uz: "sinchkovlik bilan tekshirmoq", ex: "Examiners scrutinize grammatical range and structural variety.", topic: "IELTS" },
  { w: "Tangible", ipa: "/ˈtæn.dʒə.bəl/", pos: "adj", level: "B2", uz: "aniq ko'rinadigan, sezilarli", ex: "Daily speech practice creates tangible improvements in fluency.", topic: "Success" },
  { w: "Vulnerable", ipa: "/ˈvʌl.nər.ə.bəl/", pos: "adj", level: "B2", uz: "zaif, xavf ostida qolgan", ex: "Coastal communities are particularly vulnerable to rising sea levels.", topic: "Environment" },
  { w: "Predominant", ipa: "/prɪˈdɒm.ɪ.nənt/", pos: "adj", level: "B2", uz: "ustun turuvchi, yetakchi", ex: "English remains the predominant lingua franca in scientific research.", topic: "Language" },
  { w: "Comprehensive", ipa: "/ˌkɒm.prɪˈhen.sɪv/", pos: "adj", level: "B2", uz: "har tomonlama, to'liq qamrovli", ex: "This platform delivers a comprehensive 4-skills curriculum.", topic: "Education" },

  // ================= C1 - ADVANCED (IELTS 7.0 - 8.0) =================
  { w: "Alleviate", ipa: "/əˈliː.vi.eɪt/", pos: "verb", level: "C1", uz: "yengillashtirmoq, og'irini yengil qilmoq", ex: "Government subsidies can alleviate poverty in underdeveloped regions.", topic: "Economics" },
  { w: "Detrimental", ipa: "/ˌdet.rɪˈmen.təl/", pos: "adj", level: "C1", uz: "zararli, salbiy oqibat keltiruvchi", ex: "Excessive screen time exerts a detrimental impact on cognitive focus.", topic: "Health" },
  { w: "Equitable", ipa: "/ˈek.wɪ.tə.bəl/", pos: "adj", level: "C1", uz: "adolatli, teng huquqli", ex: "Progressive societies prioritize equitable access to quality education.", topic: "Society" },
  { w: "Fluctuate", ipa: "/ˈflʌk.tʃu.eɪt/", pos: "verb", level: "C1", uz: "beqaror o'zgarib turmoq", ex: "Commodity prices fluctuate wildly during geopolitical instability.", topic: "Economics" },
  { w: "Ineffable", ipa: "/ɪnˈef.ə.bəl/", pos: "adj", level: "C1", uz: "so'z bilan ta'riflab bo'lmas darajada oliy", ex: "Attaining Band 8.5 provided an ineffable sense of achievement.", topic: "Emotions" },
  { w: "Pivotal", ipa: "/ˈpɪv.ə.təl/", pos: "adj", level: "C1", uz: "burilish yasovchi, o'ta hal qiluvchi", ex: "Early bilingual immersion plays a pivotal role in brain flexibility.", topic: "Science" },
  { w: "Quintessential", ipa: "/ˌkwɪn.tɪˈsen.ʃəl/", pos: "adj", level: "C1", uz: "eng mukammal namuna, timsol", ex: "London is the quintessential cosmopolitan metropolis.", topic: "Culture" },
  { w: "Substantiate", ipa: "/səbˈstæn.ʃi.eɪt/", pos: "verb", level: "C1", uz: "aniq dalillar bilan asoslab bermoq", ex: "Essay writers must substantiate assertions with credible data.", topic: "Writing Task 2" },
  { w: "Ubiquitous", ipa: "/juːˈbɪk.wɪ.təs/", pos: "adj", level: "C1", uz: "hamma joyda mavjud, keng tarqalgan", ex: "Artificial intelligence has become ubiquitous in higher education.", topic: "Technology" },
  { w: "Exacerbate", ipa: "/ɪɡˈzæs.ə.beɪt/", pos: "verb", level: "C1", uz: "vaziyatni yanada og'irlashtirmoq", ex: "Deforestation exacerbates catastrophic climate anomalies.", topic: "Environment" },
  { w: "Pragmatic", ipa: "/præɡˈmæt.ɪk/", pos: "adj", level: "C1", uz: "amaliy, hayotiy foydali", ex: "We adopted a pragmatic approach focused strictly on test rubrics.", topic: "Methodology" },

  // ================= C2 - MASTERY (IELTS 8.5 - 9.0) =================
  { w: "Aberration", ipa: "/ˌæb.əˈreɪ.ʃən/", pos: "noun", level: "C2", uz: "me'yordan chetga chiqish, anomaliya", ex: "The temporary score drop was merely a statistical aberration.", topic: "Mastery" },
  { w: "Acumen", ipa: "/ˈæk.jə.mən/", pos: "noun", level: "C2", uz: "ziyraklik, teran aql va tadbirkorlik", ex: "Her acute linguistic acumen enables effortless accent replication.", topic: "Intelligence" },
  { w: "Cacophony", ipa: "/kəˈkɒf.ə.ni/", pos: "noun", level: "C2", uz: "yoqimsiz, quloqni teshuvchi shovqin", ex: "The speaker's message was lost amidst a cacophony of background noise.", topic: "Descriptive" },
  { w: "Ephemeral", ipa: "/ɪˈfem.ər.əl/", pos: "adj", level: "C2", uz: "o'tkinchi, bir lahzalik", ex: "Viral social trends are ephemeral, whereas genuine fluency endures.", topic: "Philosophy" },
  { w: "Fastidious", ipa: "/fæsˈtɪd.i.əs/", pos: "adj", level: "C2", uz: "haddan tashqari sinchkov, talabchan", ex: "Band 9 examiners are fastidious regarding nuanced lexical choices.", topic: "Character" },
  { w: "Mellifluous", ipa: "/melˈɪf.lu.əs/", pos: "adj", level: "C2", uz: "boldek yoqimli, muloyim jaranglovchi", ex: "The British orator delivered the keynote in a mellifluous voice.", topic: "Speech" },
  { w: "Panacea", ipa: "/ˌpæn.əˈsiː.ə/", pos: "noun", level: "C2", uz: "hamma muammoga universal chora", ex: "Artificial intelligence is a powerful catalyst, not a universal panacea.", topic: "Society" },
  { w: "Vicissitudes", ipa: "/vɪˈsɪs.ɪ.tʃuːdz/", pos: "noun", level: "C2", uz: "hayotiy sinovlar, taqdir o'yinlari", ex: "Perseverance enables students to navigate the vicissitudes of study.", topic: "Philosophy" },
  { w: "Zephyr", ipa: "/ˈzef.ər/", pos: "noun", level: "C2", uz: "mayin, yoqimli shabada", ex: "A gentle evening zephyr cooled the sweltering coastal plains.", topic: "Descriptive" },

  // ================= BAND 8.0 - 9.0 IDIOMS & COLLOCATIONS =================
  { w: "Bite the bullet", ipa: "[idiom]", pos: "idiom", level: "Band 8+", uz: "qiyinchilikka chidab botirlarcha yuzlashmoq", ex: "I decided to bite the bullet and sit the C2 exam without delay.", topic: "Idioms" },
  { w: "At the eleventh hour", ipa: "[idiom]", pos: "idiom", level: "Band 8+", uz: "eng so'nggi daqiqada, ayni paytda", ex: "The scholarship proposal was finalized at the eleventh hour.", topic: "Idioms" },
  { w: "A blessing in disguise", ipa: "[idiom]", pos: "idiom", level: "Band 8+", uz: "avvaliga yomon tuyulgan, biroq xushxabar bo'lgan holat", ex: "Postponing the initial exam proved to be a blessing in disguise.", topic: "Idioms" },
  { w: "Burn the midnight oil", ipa: "[idiom]", pos: "idiom", level: "Band 7.5+", uz: "kechalari bilan tinmay qunt bilan o'qimoq", ex: "Ambitious students burned the midnight oil throughout finals week.", topic: "Idioms" },
  { w: "Cut corners", ipa: "[idiom]", pos: "idiom", level: "Band 8+", uz: "sifatni buzib, arzonga yoki osonga qochmoq", ex: "Never cut corners when practicing phonetics and intonation.", topic: "Idioms" },
  { w: "Hit the nail on the head", ipa: "[idiom]", pos: "idiom", level: "Band 8.5+", uz: "masalaning ayni mag'zini to'g'ri topmoq", ex: "Your explanation of task achievement hit the nail on the head.", topic: "Idioms" },
  { w: "Through thick and thin", ipa: "[idiom]", pos: "idiom", level: "Band 8+", uz: "har qanday quvonch va qiyinchilikda birga bo'lmoq", ex: "My study partner supported me through thick and thin.", topic: "Idioms" },
  { w: "See eye to eye", ipa: "[idiom]", pos: "idiom", level: "Band 7.5+", uz: "bir-birini to'liq tushunmoq, fikri bir joydan chiqmoq", ex: "The examiners saw eye to eye regarding the candidate's fluency.", topic: "Idioms" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VOCAB_DATABASE };
}
