const https = require('https');
const fs = require('fs');

function downloadAndSave(url, filename) {
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  }, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      downloadAndSave(res.headers.location, filename);
      return;
    }
    const data = [];
    res.on('data', (chunk) => data.push(chunk));
    res.on('end', () => {
      const buffer = Buffer.concat(data);
      const base64 = buffer.toString('base64');
      fs.writeFileSync(filename, base64);
      console.log(`Saved ${filename}`);
    });
  }).on('error', (err) => {
    console.error(err);
  });
}

downloadAndSave('https://i.imgur.com/Du80yJk.png', 'digi.txt');
downloadAndSave('https://i.imgur.com/SOpu8lO.png', 'iefp.txt');
