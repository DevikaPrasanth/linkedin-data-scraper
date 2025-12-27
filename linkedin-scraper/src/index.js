const { launchBrowser } = require('./browser/launch');
const { loadCookies } = require('./utils/cookies');
const { scrapeCompany } = require('./scrapers/companyScraper');
const { scrapeProfile } = require('./scrapers/profileScraper');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const browser = await launchBrowser();
    const context = await browser.newContext();

    // Load LinkedIn session cookies
    await loadCookies(context);

    const page = await context.newPage();

    // Increase default timeout for LinkedIn
    page.setDefaultTimeout(60000);

    // Test authentication – LinkedIn feed should load
    await page.goto('https://www.linkedin.com/feed/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await page.waitForTimeout(5000); // visual confirmation
    console.log('LinkedIn feed loaded successfully');

    // -------- INPUTS --------
    const companyUrl = process.argv[2] || 'https://www.linkedin.com/company/google/';
    const profileUrl = process.argv[3] || 'https://www.linkedin.com/in/sundarpichai/';
    // ------------------------

    // Ensure samples folder exists
    const samplesDir = path.join(__dirname, '../samples');
    if (!fs.existsSync(samplesDir)) {
      fs.mkdirSync(samplesDir, { recursive: true });
      console.log(`Created folder: ${samplesDir}`);
    }

    // -------- SCRAPE COMPANY --------
    console.log('\n========== COMPANY SCRAPER OUTPUT ==========');
    const companyData = await scrapeCompany(page, companyUrl);

    // Save company JSON
    const companyPath = path.join(samplesDir, 'company.json');
    fs.writeFileSync(companyPath, JSON.stringify(companyData, null, 2));
    console.log(`Company data saved to ${companyPath}`);

    // -------- SCRAPE PROFILE --------
    console.log('\n========== PROFILE SCRAPER OUTPUT ==========');
    const profileData = await scrapeProfile(page, profileUrl);

    // Save profile JSON
    const profilePath = path.join(samplesDir, 'profile.json');
    fs.writeFileSync(profilePath, JSON.stringify(profileData, null, 2));
    console.log(`Profile data saved to ${profilePath}`);

    await browser.close();
    console.log('\n Scraping completed successfully!');

  } catch (error) {
    console.error('Error running scraper:', error.message);
  }
})();
