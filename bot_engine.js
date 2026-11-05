const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');
const content = require('./content_generator');
const { contentDays } = require('./content_bank');
const { generateVoice } = require('./audio_generator');

const CONFIG_PATH = path.join(__dirname, 'bot_config.json');
const DB_PATH = path.join(__dirname, 'database.json');

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

let db = {
  ratings: {},
  postedHistory: [],
  postedToday: {},
  ownerMessages: [],
  lastUpdateId: 0,
  settings: {
    autoPostEnabled: true
  }
};

if (fs.existsSync(DB_PATH)) {
  try {
    const loaded = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    db = Object.assign(db, loaded);
    if (!db.postedToday) db.postedToday = {};
    if (!db.ownerMessages) db.ownerMessages = [];
    if (!db.ratings) db.ratings = {};
    if (!db.postedHistory) db.postedHistory = [];
  } catch (e) {
    console.error("Database reading error, resetting fresh state.");
  }
}

function saveDB() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {
    console.error("saveDB error:", e.message);
  }
}
saveDB();

function getTashkentTime() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tashkent',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const parts = formatter.formatToParts(new Date());
  const map = {};
  parts.forEach(p => map[p.type] = p.value);
  const hour = parseInt(map.hour, 10) % 24;
  const minute = parseInt(map.minute, 10);
  const second = parseInt(map.second, 10);
  const dateKey = `${map.year}-${map.month}-${map.day}`;
  return { dateKey, hour, minute, second };
}

async function apiRequest(method, payload = {}, retries = 3) {
  const data = JSON.stringify(payload);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await new Promise((resolve, reject) => {
        const req = https.request({
          hostname: 'api.telegram.org',
          port: 443,
          path: `/bot${config.bot_token}/${method}`,
          method: 'POST',
          timeout: 15000,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
          }
        }, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(body));
            } catch (err) {
              reject(err);
            }
          });
        });

        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error("Timeout"));
        });

        req.write(data);
        req.end();
      });

      return res;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

function sendVoiceFile(filePath, caption = '') {
  try {
    const cmd = `curl.exe -s -F chat_id=${config.channel_id} -F voice=@"${filePath}" -F caption="${caption}" "https://api.telegram.org/bot${config.bot_token}/sendVoice"`;
    const res = execSync(cmd).toString();
    return JSON.parse(res);
  } catch (e) {
    console.error("sendVoiceFile error:", e.message);
    return null;
  }
}

async function notifyOwner(text) {
  try {
    await apiRequest('sendMessage', {
      chat_id: config.owner_id,
      text: text,
      parse_mode: 'HTML'
    });
  } catch (e) {}
}

// ================= MODULES ================= //

async function post06MorningVocab() {
  const v = content.vocabularyMorning;
  let text = `<b>${v.title}</b>\n<i>${v.subtitle}</i>\n\n`;
  v.words.forEach((w, idx) => {
    text += `<b>${idx + 1}. ${w.w}</b> <i>${w.ipa}</i> [${w.pos}]\n`;
    text += `🇺🇿 <b>Ma'nosi:</b> ${w.uz}\n`;
    text += `📝 <i>"${w.ex}"</i>\n\n`;
  });
  text += `🎯 <i>Kun davomida ushbu so'zlarni faol qo'llashga harakat qiling!</i>`;

  const res = await apiRequest('sendMessage', { chat_id: config.channel_id, text, parse_mode: 'HTML' });
  if (res && res.ok) {
    db.postedHistory.push({ type: '06:00_vocab_part1', date: new Date().toISOString() });
    saveDB();
    return true;
  }
  return false;
}

async function post09Story() {
  const s = content.storyContent;
  let mainText = `📖 <b>09:00 | KUN HIKOYASI: ${s.topic}</b>\n`;
  mainText += `🎯 <b>Daraja:</b> <i>${s.level}</i>\n\n`;
  mainText += `🇬🇧 <b>In English:</b>\n<i>${s.english}</i>\n\n`;
  mainText += `🇺🇿 <b>O'zbek tilida:</b>\n<i>${s.uzbek}</i>\n\n`;
  mainText += `👇 <i>Quyida hikoyaning gapma-gap grammatik tahlili taqdim etiladi!</i>`;

  await apiRequest('sendMessage', { chat_id: config.channel_id, text: mainText, parse_mode: 'HTML' });

  let analysis = `🔍 <b>HIKOYANING GAPMA-GAP CHUQUR TAHLILI:</b>\n\n`;
  s.sentenceAnalysis.forEach((sa, idx) => {
    analysis += `<b>${idx + 1}-gap:</b> <i>"${sa.sentence}"</i>\n`;
    analysis += `🇺🇿 <i>"${sa.uzbek}"</i>\n`;
    analysis += `${sa.breakdown}\n\n`;
  });
  await apiRequest('sendMessage', { chat_id: config.channel_id, text: analysis, parse_mode: 'HTML' });

  let vocText = `📚 <b>HIKOYADAGI ASOSIY SO'ZLAR:</b>\n\n`;
  s.vocabulary.forEach((v, idx) => {
    vocText += `<b>${idx + 1}. ${v.word}</b> [${v.pos}] — ${v.uz}\n`;
    vocText += `💡 <i>Misol: "${v.eg}"</i>\n\n`;
  });
  const res = await apiRequest('sendMessage', { chat_id: config.channel_id, text: vocText, parse_mode: 'HTML' });

  if (res && res.ok) {
    db.postedHistory.push({ type: '09:00_story', date: new Date().toISOString() });
    saveDB();
    return true;
  }
  return false;
}

async function post12Skills() {
  await apiRequest('sendMessage', { chat_id: config.channel_id, text: content.skillsContent.reading, parse_mode: 'HTML' });
  const audioPath = generateVoice(content.skillsContent.listeningAudioScript, 'daily_listening.wav', 'Microsoft Hazel Desktop');
  if (audioPath) {
    sendVoiceFile(audioPath, "🎧 12:00 | LISTENING CHALLENGE: Diqqat bilan tinglang va savolga javob bering!");
  }
  await apiRequest('sendMessage', { chat_id: config.channel_id, text: content.skillsContent.writing, parse_mode: 'HTML' });
  const res = await apiRequest('sendMessage', { chat_id: config.channel_id, text: content.skillsContent.speaking, parse_mode: 'HTML' });

  if (res && res.ok) {
    db.postedHistory.push({ type: '12:00_skills', date: new Date().toISOString() });
    saveDB();
    return true;
  }
  return false;
}

async function post14CommonMistakes() {
  const cm = content.commonMistakesPart1;
  let text = `<b>${cm.title}</b>\n\n`;
  cm.items.forEach(item => {
    text += `<b>Xato shakli:</b> ${item.wrong}\n`;
    text += `<b>To'g'ri shakli:</b> ${item.correct}\n`;
    text += `${item.explanation}\n\n━━━━━━━━━━━━━━━\n\n`;
  });
  text += `💡 <i>O'z nutqingizda ushbu xatolarga yo'l qo'ymang!</i>`;

  const res = await apiRequest('sendMessage', { chat_id: config.channel_id, text, parse_mode: 'HTML' });
  if (res && res.ok) {
    db.postedHistory.push({ type: '14:00_mistakes1', date: new Date().toISOString() });
    saveDB();
    return true;
  }
  return false;
}

async function post17VocabAndGrammar() {
  const v = content.vocabularyEvening;
  let text = `<b>${v.title}</b>\n\n`;
  v.words.forEach((w, idx) => {
    text += `<b>${idx + 16}. ${w.w}</b> <i>${w.ipa}</i> [${w.pos}]\n`;
    text += `🇺🇿 <b>Ma'nosi:</b> ${w.uz}\n`;
    text += `📝 <i>"${w.ex}"</i>\n\n`;
  });
  await apiRequest('sendMessage', { chat_id: config.channel_id, text, parse_mode: 'HTML' });
  const res = await apiRequest('sendMessage', { chat_id: config.channel_id, text: v.grammar, parse_mode: 'HTML' });

  if (res && res.ok) {
    db.postedHistory.push({ type: '17:00_vocab_part2_grammar', date: new Date().toISOString() });
    saveDB();
    return true;
  }
  return false;
}

async function post19MistakesAndQuizzes() {
  const cm = content.commonMistakesPart2;
  let text = `<b>${cm.title}</b>\n\n`;
  cm.items.forEach(item => {
    text += `<b>Xato shakli:</b> ${item.wrong}\n`;
    text += `<b>To'g'ri shakli:</b> ${item.correct}\n`;
    text += `${item.explanation}\n\n━━━━━━━━━━━━━━━\n\n`;
  });
  await apiRequest('sendMessage', { chat_id: config.channel_id, text, parse_mode: 'HTML' });

  for (const q of cm.quizzes) {
    await apiRequest('sendPoll', {
      chat_id: config.channel_id,
      question: q.q,
      options: q.opts,
      type: 'quiz',
      correct_option_id: q.correct,
      explanation: q.exp,
      explanation_parse_mode: 'HTML',
      is_anonymous: false
    });
    await new Promise(r => setTimeout(r, 1000));
  }

  db.postedHistory.push({ type: '19:00_mistakes2_quiz', date: new Date().toISOString() });
  saveDB();
  return true;
}

async function post21Homework() {
  const hw = content.homeworkContent;
  let text = `<b>${hw.title}</b>\n\n${hw.tasks}`;
  const res = await apiRequest('sendMessage', { chat_id: config.channel_id, text, parse_mode: 'HTML' });
  if (res && res.ok) {
    db.postedHistory.push({ type: '21:00_homework', date: new Date().toISOString() });
    saveDB();
    return true;
  }
  return false;
}

async function post23DailyReview() {
  const rev = content.dailyReviewContent;
  let text = `<b>${rev.title}</b>\n\n${rev.text}\n\n`;

  const users = Object.values(db.ratings).sort((a, b) => b.score - a.score).slice(0, 5);
  if (users.length > 0) {
    text += `🏆 <b>BUGUNGI TOP O'QUVCHILAR:</b>\n`;
    users.forEach((u, i) => {
      text += `${i + 1}. ${u.name} — ${u.score} ball\n`;
    });
  }

  const res = await apiRequest('sendMessage', { chat_id: config.channel_id, text, parse_mode: 'HTML' });
  if (res && res.ok) {
    db.postedHistory.push({ type: '23:00_daily_review', date: new Date().toISOString() });
    saveDB();
    return true;
  }
  return false;
}

// ================= PRECISE HOURLY SCHEDULER ================= //

let isExecutingSchedule = false;

async function checkAndExecuteSchedule() {
  if (!db.settings.autoPostEnabled || isExecutingSchedule) return;

  isExecutingSchedule = true;
  try {
    const { dateKey, hour, minute } = getTashkentTime();

    const scheduleSlots = [
      { hour: 6, fn: post06MorningVocab, name: '06_vocab' },
      { hour: 9, fn: post09Story, name: '09_story' },
      { hour: 12, fn: post12Skills, name: '12_skills' },
      { hour: 14, fn: post14CommonMistakes, name: '14_mistakes1' },
      { hour: 17, fn: post17VocabAndGrammar, name: '17_vocab2' },
      { hour: 19, fn: post19MistakesAndQuizzes, name: '19_mistakes2' },
      { hour: 21, fn: post21Homework, name: '21_homework' },
      { hour: 23, fn: post23DailyReview, name: '23_review' }
    ];

    for (const slot of scheduleSlots) {
      const slotKey = `${dateKey}_${slot.name}`;

      // QAT'IY QOIDA: Faqat o'sha soatning boshlang'ich 5 daqiqasida (HH:00 - HH:05) bo'lsa va hali chiqmagan bo'lsa chiqaradi!
      // Hech qachon eskirgan soatdagi postni keyingi soatlarda kechikib chiqarmaydi!
      if (hour === slot.hour && minute <= 5 && !db.postedToday[slotKey]) {
        console.log(`[Tashkent Time ${hour}:${minute}] Posting scheduled slot: ${slot.name}`);
        const success = await slot.fn();
        if (success !== false) {
          db.postedToday[slotKey] = true;
          saveDB();
          await notifyOwner(`✅ Toshkent vaqti bilan <b>${slot.hour}:00</b> posti kanalga muvaffaqiyatli joylandi!`);
        }
      }
    }
  } catch (err) {
    console.error("Scheduler error:", err.message);
  } finally {
    isExecutingSchedule = false;
  }
}

async function handleOwnerMessage(msg) {
  const text = (msg.text || '').trim();
  if (!db.ownerMessages) db.ownerMessages = [];
  db.ownerMessages.push({ date: new Date().toISOString(), text: text });
  saveDB();

  const lower = text.toLowerCase();
  if (lower === '/start' || lower === '/help') {
    const { hour, minute } = getTashkentTime();
    await notifyOwner(`Jahongir, tizim qat'iy Toshkent vaqti bo'yicha ishlamoqda.
Hozirgi vaqt: <b>${hour}:${minute < 10 ? '0' + minute : minute}</b>

Postlar faqat aytilgan soatda chiqadi, kechiktirib aralashtirib tashlanmaydi!`);
    return;
  }

  await notifyOwner(`Buyruq qabul qilindi: "${text}".`);
}

function handlePollAnswer(answer) {
  const userId = answer.user.id;
  const userName = answer.user.first_name + (answer.user.last_name ? ' ' + answer.user.last_name : '');
  if (!db.ratings) db.ratings = {};
  if (!db.ratings[userId]) {
    db.ratings[userId] = { name: userName, score: 0 };
  }
  db.ratings[userId].score += 10;
  saveDB();
}

async function pollUpdates() {
  try {
    const res = await apiRequest('getUpdates', {
      offset: db.lastUpdateId + 1,
      timeout: 20
    });

    if (res && res.ok && res.result && res.result.length > 0) {
      for (const update of res.result) {
        db.lastUpdateId = update.update_id;
        if (update.message && update.message.chat && update.message.chat.id == config.owner_id) {
          await handleOwnerMessage(update.message);
        }
        if (update.poll_answer) {
          handlePollAnswer(update.poll_answer);
        }
      }
      saveDB();
    }
  } catch (err) {}
  setTimeout(pollUpdates, 2000);
}

const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  const { hour, minute } = getTashkentTime();
  res.end(`EnglishScore Telegram Bot is RUNNING! Toshkent vaqti: ${hour}:${minute}`);
}).listen(PORT, () => {
  console.log(`🚀 Web health-check server running on port ${PORT}`);
});

console.log("🚀 Telegram Bot Engine (Strict Hourly Precision) is running...");
pollUpdates();
setInterval(checkAndExecuteSchedule, 5000);

module.exports = {
  post06MorningVocab,
  post09Story,
  post12Skills,
  post14CommonMistakes,
  post17VocabAndGrammar,
  post19MistakesAndQuizzes,
  post21Homework,
  post23DailyReview,
  getTashkentTime
};
