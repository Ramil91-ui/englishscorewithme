const fs = require('fs');
const https = require('https');
const path = require('path');

function generateVoice(text, filename = 'daily_listening.mp3') {
  return new Promise((resolve) => {
    const outputPath = path.join(__dirname, filename);
    const encodedText = encodeURIComponent(text.slice(0, 300));
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=en&client=tw-ob`;

    const file = fs.createWriteStream(outputPath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(outputPath));
      });
    }).on('error', (err) => {
      console.error("Cloud TTS error:", err.message);
      resolve(null);
    });
  });
}

module.exports = { generateVoice };
