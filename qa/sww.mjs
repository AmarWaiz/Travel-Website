import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
for (const [url, w] of [["http://localhost:3001/",1440],["http://localhost:3001/",1024],["http://localhost:3001/",768],["http://localhost:3001/tours",1440],["http://localhost:3001/tours",1024],["http://localhost:3001/tours",768],["http://localhost:3001/tours/hunza-skardu-karakoram",1440],["http://localhost:3001/tours/hunza-skardu-karakoram",768]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(w, url.slice(21), sw > w + 1 ? "OVERFLOW" : "ok");
  await page.close();
}
await browser.close();
