import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const sec = document.querySelector("section");
  const kids = [...sec.children].map((el) => {
    const cs = getComputedStyle(el);
    const b = el.getBoundingClientRect();
    return { tag: el.tagName, cls: el.className?.toString?.().slice(0, 60), pos: cs.position, y: Math.round(b.y), h: Math.round(b.height) };
  });
  return kids;
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
