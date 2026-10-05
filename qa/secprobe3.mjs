import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y <= h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const res = [];
  // sample one reveal element per section region
  for (const y of [1200, 2000, 3300, 5100, 6400, 7400, 8100, 8800, 9600]) {
    const el = document.elementFromPoint(720, y - window.scrollY + 450);
    res.push({ probeY: y, tag: el?.tagName, cls: el?.className?.toString?.().slice(0, 40), op: el ? getComputedStyle(el).opacity : null });
  }
  // direct: find tour cards
  const cards = document.querySelectorAll("article");
  res.push({ tourCards: cards.length, firstCardOp: cards[0] ? getComputedStyle(cards[0]).opacity : null });
  return res;
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
