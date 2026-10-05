import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
for (const url of process.argv.slice(2)) {
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const sw = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
  console.log(url, JSON.stringify(sw));
  await page.close();
}
await browser.close();
