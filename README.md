# Playwright UI + API Automation

## Overview
This repository contains Playwright Test scripts that automate UI tests against **SauceDemo** and API tests against **Restful-Booker**.
It includes:
- UI login tests for all SauceDemo user types
- API tests demonstrating Booking CRUD operations
- Test data management via JSON files
- Monocart reporter and Playwright HTML report
- GitHub Actions workflow for CI

## Setup (npm)
```bash
npm install
npx playwright install
```

## Run tests
- Run all tests:
  ```bash
  npm test
  npx playwright test
  ```
- Run UI tests:
  ```bash
  npm run ui
  ```
- Run API tests:
  ```bash
  npm run api
  ```
- View HTML report:
  ```bash
  npx playwright show-report
  npx monocart show-report reports/monocart-report.html
  ```
## CI
GitHub Actions workflow is available at `.github/workflows/ci.yml`.
