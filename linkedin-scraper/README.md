# LinkedIn Data Scraper – Almach Data Systems Assignment

## Overview
This project implements a LinkedIn data scraper as part of the technical assignment for **Almach Data Systems**.

It provides two core functionalities:

1. **Company Scraper** – extracts employee information from a LinkedIn company page.
2. **Profile Scraper** – extracts public profile details from a LinkedIn profile page.

---

## Features
- Extracts employee name, title, location, and profile URL from company pages
- Includes a fallback mechanism to ensure at least one verified employee record
- Extracts profile information including:
  - Name, headline, location, connections
  - Experience, education, and skills (if visible)
- Produces structured JSON output matching assignment requirements
- Handles lazy loading and dynamic DOM elements
- Modular, readable, and maintainable Node.js code

---

## Authentication (LinkedIn Cookies)

LinkedIn authentication is handled using session cookies.

For security reasons, **real cookies are not included** in this repository.

### Setup Steps
1. Log in to LinkedIn using Chrome
2. Open **DevTools → Application → Cookies → https://www.linkedin.com**
3. Copy the `li_at` cookie
4. Create a file named `cookies.json` in the project root
5. Follow the structure shown in `cookies.sample.json`

The scraper will not work without a valid authenticated LinkedIn session.

---

## Installation

Ensure **Node.js v20+** is installed.

```bash
cd linkedin-scraper
npm install
npm run src/index.js
