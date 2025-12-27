const { chromium } = require('playwright');

async function launchBrowser() {
  return await chromium.launch({
    headless: false, // IMPORTANT for LinkedIn
    args: ['--start-maximized'],
  });
}

module.exports = { launchBrowser };
