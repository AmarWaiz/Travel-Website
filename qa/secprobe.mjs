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
  const main = document.querySelector("main");
  return [...main.children].map((el) => {
    const b = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    // find a heading inside
    const h = el.querySelector("h2");
    return {
      tag: el.tagName,
      comp: el.firstElementChild?.tagName + "." + (el.firstElementChild?.className?.toString?.().slice(0, 40)),
      y: Math.round(b.y + window.scrollY), h: Math.round(b.height),
      opacity: cs.opacity, display: cs.display,
      heading: h?.textContent?.slice(0, 40) || null,
      kids: el.querySelectorAll("*").length,
    };
  });
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
