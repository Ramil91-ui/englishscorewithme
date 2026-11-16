const { generateVoice } = require('./audio_generator');
const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./bot_config.json', 'utf8'));

function sendPost(text) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: config.channel_id,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });
    const req = https.request({
      hostname: 'api.telegram.org',
      port: 443,
      path: '/bot' + config.bot_token + '/sendMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function sendVoice(filePath, caption) {
  try {
    const cmd = `curl.exe -s -F chat_id=${config.channel_id} -F voice=@"${filePath}" -F caption="${caption}" "https://api.telegram.org/bot${config.bot_token}/sendVoice"`;
    return JSON.parse(execSync(cmd).toString());
  } catch (e) {
    console.error("sendVoice error:", e.message);
  }
}

async function run() {
  console.log("Sending 4-skills showcase to channel...");

  // Intro
  await sendPost(
    `🚀 <b>YANGI DAVR: 4 TA KO'NIKMA BO'YICHA NAMUNAVIY AMALIYOT!</b>\n\n` +
    `Kanalimizda va yangi <b>Mini-Ilovamizda</b> barcha 4 ta ko'nikmani (Listening, Reading, Writing, Speaking) kompleks rivojlantirishingiz mumkin!\n\n` +
    `Quyida har bir qismdan maxsus namunaviy dars va topshiriqlarni taqdim etamiz! 👇`
  );

  // 1. LISTENING
  const listeningScript = "Welcome to the university orientation session. Today, students must register their student cards at the main library before 4 PM. If you miss this deadline, your campus Wi-Fi access will be delayed until Monday.";
  const audioFile = await generateVoice(listeningScript, 'sample_listening.mp3');
  if (audioFile && fs.existsSync(audioFile)) {
    sendVoice(audioFile, "🎧 PART 1: LISTENING COMPREHENSION (Audio namuna)");
  }
  await sendPost(
    `🎧 <b>PART 1: LISTENING TEST SAVOLI</b>\n\n` +
    `❓ <b>Question:</b> According to the announcement, what will happen if students do not register before 4 PM?\n\n` +
    `A) They cannot enter the campus library\n` +
    `B) Their campus Wi-Fi access will be delayed until Monday\n` +
    `C) They must pay an orientation registration fee\n\n` +
    `💡 <i>To'g'ri javobni izohlarda yozing!</i>\n#listening #cefr #ielts`
  );

  // 2. READING
  await sendPost(
    `📖 <b>PART 2: READING COMPREHENSION (Matn va tahlil)</b>\n\n` +
    `<i>"Neuroplasticity is the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. When learning a foreign language, repeated exposure and active retrieval physically reshape neural pathways, which explains why daily twenty-minute micro-habits produce vastly superior fluency compared to occasional long study sessions."</i>\n\n` +
    `📌 <b>Lug'at boyligi:</b>\n` +
    `• <b>Neuroplasticity</b> — miyaning yangi neyron aloqalar hosil qilib moslashuvchanligi\n` +
    `• <b>Active retrieval</b> — bilimlarni xotiradan faol eslab chiqarish\n` +
    `• <b>Vastly superior</b> — ancha ustun, ancha samarali\n\n` +
    `❓ <b>True / False / Not Given:</b>\n` +
    `<i>Daily 20-minute study sessions are more effective for the brain than infrequent prolonged cramming.</i> (True or False?)\n#reading #ielts #vocabulary`
  );

  // 3. WRITING
  await sendPost(
    `✍️ <b>PART 3: WRITING TASK (IELTS Task 2 & Band 7.5+ Model)</b>\n\n` +
    `<b>Topic:</b> <i>"Some people believe that university education should be completely free for everyone. To what extent do you agree or disagree?"</i>\n\n` +
    `💎 <b>Band 7.5+ namunaviy kirish (Introduction):</b>\n` +
    `<i>"It is often debated whether higher education should be publicly funded without tuition fees. While some argue that free university education promotes social equity, I believe that a shared-cost model is significantly more sustainable for maintaining educational quality."</i>\n\n` +
    `🔍 <b>Foydali akademik birikmalar:</b>\n` +
    `• <i>It is often debated whether...</i> (Tez-tez bahslashiladi)\n` +
    `• <i>Publicly funded</i> (Davlat tomonidan moliyalashtiriladigan)\n` +
    `• <i>Promotes social equity</i> (Ijtimoiy tenglikni ilgari suradi)\n` +
    `• <i>Sustainable model</i> (Barqaror yondashuv)\n#writing #ielts`
  );

  // 4. SPEAKING
  await sendPost(
    `🎙 <b>PART 4: SPEAKING (IELTS Part 2 Cue Card & AI Tahlil)</b>\n\n` +
    `<b>Topic:</b> <i>Describe a skill you learned that you find very useful.</i>\n\n` +
    `🗣 <b>Band 7.5+ Model Speech:</b>\n` +
    `<i>"One indispensable skill I acquired recently is effective public speaking. Initially, speaking before an audience seemed terrifying. However, by practicing consistent breathing techniques and structuring my speeches with clear signposting, I gained tremendous confidence."</i>\n\n` +
    `🚀 <b>AI SPEAKING IMTIHONI:</b>\n` +
    `Endi o'z talaffuz va ravonligingizni tekshirish uchun ushbu matnni ovoz chiqarib o'qing va @Englishscorewithmebot ga ovozli xabar (voice) qilib yuboring! Gemini AI 4 ta mezon bo'yicha sizga darhol Band ballingizni chiqarib beradi!\n#speaking #shadowing #ai_ielts`
  );

  console.log("All 4 parts successfully posted!");
}

run().catch(console.error);
