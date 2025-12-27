const fs = require('fs');

async function loadCookies(context, filePath = 'cookies.json') {
  if (!fs.existsSync(filePath)) {
    throw new Error('cookies.json not found');
  }

  const cookies = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  await context.addCookies(cookies);
}

module.exports = { loadCookies };
