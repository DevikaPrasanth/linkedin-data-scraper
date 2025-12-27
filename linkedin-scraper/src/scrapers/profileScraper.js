const { delay } = require('../utils/delay');

async function scrapeProfile(page, profileUrl) {
  console.log('🔍 Opening profile:', profileUrl);

  await page.goto(profileUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  // Give React some time to hydrate
  await delay(4000);

  const data = await page.evaluate(() => {
    const getText = (el) => el?.innerText?.trim() || null;

    const name = getText(document.querySelector('h1'));
    const headline = getText(document.querySelector('h2, .text-body-medium'));
    const location = getText(document.querySelector('.text-body-small.inline'));
    const connections = getText(document.querySelector('.pv-top-card--list-bullet li'));

    // Experience
    const experience = [];
    const expItems = document.querySelectorAll('#experience li, .experience-section li');
    expItems.forEach(item => {
      const title = getText(item.querySelector('h3'));
      const company = getText(item.querySelector('p span:first-child'));
      const dates = getText(item.querySelector('h4 span:last-child'));
      if (title || company) {
        experience.push({ title, company, dates });
      }
    });

    // Education
    const education = [];
    const eduItems = document.querySelectorAll('#education li, .education-section li');
    eduItems.forEach(item => {
      const school = getText(item.querySelector('h3'));
      const degree = getText(item.querySelector('p span'));
      const dates = getText(item.querySelector('h4 span:last-child'));
      if (school) {
        education.push({ school, degree, dates });
      }
    });

    // Skills
    const skills = [];
    const skillEls = document.querySelectorAll('.pv-skill-category-entity__name-text');
    skillEls.forEach(s => {
      const skill = getText(s);
      if (skill) skills.push(skill);
    });

    return { name, headline, location, connections, experience, education, skills };
  });

  const output = { ...data, profileUrl };
  console.log(JSON.stringify(output, null, 2));
  return output;
}

module.exports = { scrapeProfile };
