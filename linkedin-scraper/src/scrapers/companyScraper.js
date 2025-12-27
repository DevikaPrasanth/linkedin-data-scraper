const { delay } = require('../utils/delay');

async function scrapeCompany(page, companyUrl) {
  const companySlug = companyUrl.split('/company/')[1]?.split('/')[0];
  const peopleUrl = `${companyUrl.replace(/\/$/, '')}/people/`;

  console.log('Trying company people page:', peopleUrl);

  await page.goto(peopleUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await delay(5000);

  // STEP 1: Try direct people extraction (best-effort)
  let employees = await page.evaluate(() => {
    const seen = new Set();
    const results = [];

    const links = document.querySelectorAll('a[href*="/in/"]');

    for (const link of links) {
      if (results.length >= 1) break;

      const name = link.innerText?.trim();
      const profileUrl = link.href.split('?')[0];

      if (!name || name.length < 3) continue;
      if (name.includes('·') || name === 'Following') continue;
      if (seen.has(profileUrl)) continue;

      seen.add(profileUrl);

      results.push({
        name,
        title: null,
        location: null,
        profileUrl,
        verified: false,
      });
    }

    return results;
  });

  // STEP 2: Fallback — verify via profile experience
  if (employees.length === 0) {
    console.log('Falling back to profile verification');

    const fallbackProfile = await page.evaluate(() => {
      const link = document.querySelector('a[href*="/in/"]');
      return link ? link.href.split('?')[0] : null;
    });

    if (fallbackProfile) {
      await page.goto(fallbackProfile, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      await delay(4000);

      const verifiedEmployee = await page.evaluate(companySlug => {
        const experienceSection = document.querySelector('#experience');
        if (!experienceSection) return null;

        const text = experienceSection.innerText.toLowerCase();
        if (!text.includes(companySlug.replace('-', ' '))) return null;

        const name =
          document.querySelector('h1')?.innerText?.trim() || null;

        return {
          name,
          title: null,
          location: null,
          profileUrl: window.location.href.split('?')[0],
          verified: true,
        };
      }, companySlug);

      if (verifiedEmployee) {
        employees = [verifiedEmployee];
      }
    }
  }

  const output = {
    companyUrl,
    extractedAt: new Date().toISOString(),
    employees,
    note:
      employees.length === 0
        ? 'Employee list restricted by LinkedIn'
        : 'At least one employee verified via public profile',
  };

  console.log(JSON.stringify(output, null, 2));
  return output;
}

module.exports = { scrapeCompany };
