import { chromium } from "playwright-core";
import { readFile } from "fs/promises";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true })).newPage();
let n = 0;
await page.route("**/*", async (route) => {
  const u = route.request().url();
  try {
    if (u.includes("images.unsplash.com/photo-")) {
      const id = u.match(/photo-[a-z0-9-]+/)[0];
      console.log("serving", id);
      const buf = await readFile(`img/${id}.jpg`);
      n++;
      return route.fulfill({ body: buf, contentType: "image/jpeg" });
    }
  } catch (e) { console.log("read failed", e.message.slice(0, 80)); }
  return route.continue();
});
page.on("crash", () => console.log("PAGE CRASHED after", n, "images"));
try {
  await page.goto("http://localhost:3001/tours/empty-quarter-oman", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3000);
  console.log("survived,", n, "images served");
} catch (e) { console.log("goto error", e.message.slice(0, 100)); }
await browser.close();
