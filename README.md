# SauceDemo Playwright Test Suite

Ehab Suliman - 12113027

This project tests the SauceDemo website using Playwright and TypeScript.

## Getting Started

Run these commands in order after downloading the project:

    npm install
    npx playwright install

Then edit the config/.env file and set your credentials:

    BASE_URL=https://www.saucedemo.com
    USERNAME1=standard_user
    PASSWORD1=secret_sauce

## How to Run Tests

    npm test                 runs all tests on all browsers
    npm run test:chromium    runs tests on Chrome only
    npm run test:firefox     runs tests on Firefox only
    npm run report           opens the test report in browser

## What is Being Tested

Login: valid and invalid login attempts

Add to Cart: adding one item and adding multiple items

Checkout: completing an order with one or multiple items

Remove from Cart: removing one item, removing multiple items step by step

Sort: sorting products by name A to Z and by price high to low

## Project Files

    config/.env              your credentials and base URL
    pages/                   page object classes for each page
    tests/                   one test file per feature
    auth/storageState.json   saved login session so you do not login before every test
    playwright.config.ts     browser and test settings