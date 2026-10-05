import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true })).newPage();
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const out = { h1Text: h1?.textContent?.slice(0, 40), h1Visible: !!h1 };
  if (h1) {
    const cs = getComputedStyle(h1);
    out.opacity = cs.opacity; out.display = cs.display;
    const r = h1.getBoundingClientRect();
    out.rect = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    let p = h1.parentElement, chain = [];
    while (p && chain.length < 4) { chain.push(getComputedStyle(p).opacity); p = p.parentElement; }
    out.parentOpacity = chain;
  }
  return out;
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
