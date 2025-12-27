const { delay } = require('./delay');

async function autoScroll(page, scrolls = 5) {
  for (let i = 0; i < scrolls; i++) {
    await page.mouse.wheel(0, 2000);
    await delay(1500);
  }
}

module.exports = { autoScroll };
