import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y <= h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const wrap = document.querySelector("main > div");
  return [...wrap.children].map((el) => {
    const b = el.getBoundingClientRect();
    const h2 = el.querySelector("h2");
    // check first reveal child opacity
    const first = el.querySelector(":scope > div, :scope > section");
    return {
      cls: (el.className?.toString?.() || el.tagName).slice(0, 50),
      y: Math.round(b.y + window.scrollY), h: Math.round(b.height),
      heading: h2?.textContent?.slice(0, 42) || null,
      opacity: getComputedStyle(el).opacity,
    };
  });
});
console.log(JSON.stringify(info));
await browser.close();
