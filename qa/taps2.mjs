import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const small = await page.evaluate(() => {
  return [...document.querySelectorAll("button")].filter((b) => {
    const r = b.getBoundingClientRect();
    return r.width > 0 && (r.width < 44 || r.height < 44);
  }).map((b) => {
    const r = b.getBoundingClientRect();
    return `${Math.round(r.width)}x${Math.round(r.height)} cls=${(b.className?.toString?.() || "").slice(0, 60)} label=${(b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 25)}`;
  });
});
console.log(small.join("\n") || "none");
await browser.close();
