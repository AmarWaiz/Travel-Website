import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await page.goto("http://localhost:3001/tours", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const bad = await page.evaluate(() => {
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let el;
  while ((el = walker.nextNode())) {
    const r = el.getBoundingClientRect();
    // element's own box exceeding viewport, ignoring transformed off-canvas (check non-clipped)
    if (r.right > 391 && r.width > 0 && r.height > 0) {
      const cs = getComputedStyle(el);
      // skip if inside an overflow-hidden/clip ancestor or visibility hidden
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) {
        const pcs = getComputedStyle(p);
        if (pcs.visibility === "hidden" || pcs.display === "none") { clipped = true; break; }
        if (["hidden", "clip", "scroll", "auto"].includes(pcs.overflowX)) { clipped = true; break; }
        p = p.parentElement;
      }
      if (!clipped) {
        const cls = (el.className?.toString?.() || "").slice(0, 50).replace(/\s+/g, " ");
        out.push(`${el.tagName}.${cls} R=${Math.round(r.right)}`);
        if (out.length > 8) break;
      }
    }
  }
  return out;
});
console.log(bad.join("\n") || "none unclipped");
await browser.close();
