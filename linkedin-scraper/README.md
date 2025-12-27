LinkedIn Data Scraper – Almach Data Systems Assignment

Overview
This project implements a LinkedIn data scraper as part of the technical assignment for Almach Data Systems.  
It provides two main functionalities:

1. **Company Scraper** – extracts employee information from a LinkedIn company page.
2. **Profile Scraper** – extracts public profile details from a LinkedIn profile page.

---

## Features
- Extract employee names, titles, locations, and profile URLs.
- Fallback mechanism to ensure at least one verified employee.
- Extract profile information including:
  - Name, headline, location, connections
  - Experience, education, skills
- JSON output matching assignment requirements.
- Handles lazy loading and dynamic DOM elements.
- Modular and maintainable Node.js code.

---

## Authentication Note

This project uses LinkedIn session cookies for authentication.

For security reasons:
- `cookies.json` is intentionally excluded from the repository.
- To run the scraper, users must manually export their own LinkedIn cookies
  and place them in the project root as `cookies.json`.

Refer to the setup section for instructions.


## Installation

cd linkedin-scraper

npm install
Ensure Node.js v20+ is installed.

Usage
1. Setup Cookies (Optional)

Save your LinkedIn session cookies in cookies.json.

Load cookies before scraping to access logged-in content.

2. Run Command for both CompanyScraper and ProfileScraper
node src/index.js 

4. Output

JSON outputs are saved in samples/company.json and samples/profile.json.