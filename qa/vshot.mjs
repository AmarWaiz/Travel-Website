import { chromium } from "playwright-core";
import { readFile } from "fs/promises";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const url = process.argv[2], out = process.argv[3], y = parseInt(process.argv[4] || "0");
const browser = await chromium.launch({ executablePath: exe });
const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.route("**/*", async (route) => {
  const u = route.request().url();
  try {
    if (u.includes("images.unsplash.com/photo-")) {
      const buf = await readFile(`img/${u.match(/photo-[a-z0-9-]+/)[0]}.jpg`);
      return route.fulfill({ body: buf, contentType: "image/jpeg" });
    }
    if (u.includes("i.pravatar.cc")) {
      const m = u.match(/img=(\d+)/);
      const buf = await readFile(`img/avatar-${m ? m[1] : "12"}.jpg`);
      return route.fulfill({ body: buf, contentType: "image/jpeg" });
    }
  } catch {}
  return route.continue();
});
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(async (yy) => {
  for (let s = 0; s <= yy; s += 400) { window.scrollTo(0, s); await new Promise((r) => setTimeout(r, 80)); }
}, y);
await page.waitForTimeout(1500);
await page.screenshot({ path: out });
console.log("saved", out);
await browser.close();
