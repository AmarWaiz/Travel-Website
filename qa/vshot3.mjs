import { chromium } from "playwright-core";
import { readFile } from "fs/promises";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const url = process.argv[2], out = process.argv[3];
const browser = await chromium.launch({ executablePath: exe, args: ["--disable-dev-shm-usage"] });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } })).newPage();
await page.route("**/*", async (route) => {
  const u = route.request().url();
  try {
    if (u.includes("images.unsplash.com/photo-")) {
      const buf = await readFile(`img/${u.match(/photo-[a-z0-9-]+/)[0]}.jpg`);
      return route.fulfill({ body: buf, contentType: "image/jpeg" });
    }
  } catch {}
  return route.continue();
});
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: out });
console.log("saved", out);
await browser.close();
