import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(process.argv[2], { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: process.argv[3] });
console.log("saved", process.argv[3]);
await browser.close();
