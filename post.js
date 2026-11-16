const fs = require('fs');
const https = require('https');

const config = JSON.parse(fs.readFileSync(__dirname + '/bot_config.json', 'utf8'));

// Umumiy HTTP so'rov funksiyasi
function sendTelegramRequest(endpoint, payload) {
  const data = JSON.stringify(payload);

  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${config.bot_token}/${endpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// 1. Oddiy yoki formatlangan matnli post chiqarish
async function sendPost(text) {
  return sendTelegramRequest('sendMessage', {
    chat_id: config.channel_id,
    text: text,
    parse_mode: 'HTML',
    disable_web_page_preview: false
  });
}

// 2. Interaktiv Ingliz tili Quiz / Test chiqarish
async function sendQuiz({ question, options, correct_option_id, explanation }) {
  return sendTelegramRequest('sendPoll', {
    chat_id: config.channel_id,
    question: question,
    options: options,
    type: 'quiz',
    correct_option_id: correct_option_id,
    explanation: explanation,
    explanation_parse_mode: 'HTML',
    is_anonymous: true
  });
}

// 3. Rasmli post chiqarish (URL orqali)
async function sendPhotoPost({ photoUrl, caption }) {
  return sendTelegramRequest('sendPhoto', {
    chat_id: config.channel_id,
    photo: photoUrl,
    caption: caption,
    parse_mode: 'HTML'
  });
}

module.exports = {
  sendPost,
  sendQuiz,
  sendPhotoPost
};
