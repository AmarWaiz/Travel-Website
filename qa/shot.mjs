import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const url = process.argv[2];
const out = process.argv[3];
const width = parseInt(process.argv[4] || "1440");
const height = parseInt(process.argv[5] || "900");
const full = process.argv[6] === "full";
const browser = await chromium.launch({ executablePath: exe });
const context = await browser.newContext({
  viewport: { width, height },
  ignoreHTTPSErrors: true,
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: "localhost,127.0.0.1" } : undefined,
});
const page = await context.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 120)); });
page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));

import { readFile } from "fs/promises";
import { createHash } from "crypto";
await page.route("**/*", async (route) => {
  const url = route.request().url();
  try {
    if (url.includes("images.unsplash.com/photo-")) {
      const id = url.match(/photo-[a-z0-9-]+/)[0];
      const buf = await readFile(`img/${id}.jpg`);
      return route.fulfill({ body: buf, contentType: "image/jpeg" });
    }
    if (url.includes("i.pravatar.cc")) {
      const h = createHash("md5").update(url).digest("hex").slice(0, 8);
      const buf = await readFile(`img/pravatar-${h}.jpg`);
      return route.fulfill({ body: buf, contentType: "image/jpeg" });
    }
  } catch { /* fall through */ }
  return route.continue();
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

// Scroll through the page to trigger whileInView reveals and count-ups
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y <= h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);
await page.screenshot({ path: out, fullPage: full });
const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
console.log(JSON.stringify({ out, viewport: width, hScroll: scrollW > width + 1, consoleErrors: errors.slice(0, 5) }));
await browser.close();
