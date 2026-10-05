import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true })).newPage();
await page.goto("http://localhost:3001/tours", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
const info = await page.evaluate(() => {
  const titles = [...document.querySelectorAll("article h3")].map((h) => h.textContent.trim().slice(0, 30));
  const count = document.body.textContent.match(/(\d+) tours? found/)?.[0];
  return { count, titles };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
