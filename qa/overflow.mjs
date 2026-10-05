import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await page.goto(process.argv[2], { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
const bad = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > 391.5 || r.left < -0.5) {
      const cls = (el.className?.toString?.() || "").slice(0, 60).replace(/\s+/g, " ");
      out.push(`${el.tagName}.${cls} L=${Math.round(r.left)} R=${Math.round(r.right)}`);
    }
  });
  return out.slice(0, 12);
});
console.log(bad.join("\n"));
await browser.close();
