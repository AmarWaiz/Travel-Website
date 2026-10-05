import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
for (const url of ["http://localhost:3001/", "http://localhost:3001/tours", "http://localhost:3001/tours/delhi-layer-by-layer", "http://localhost:3001/destinations", "http://localhost:3001/blog", "http://localhost:3001/contact"]) {
  const page = await (await browser.newContext()).newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message.slice(0, 80)));
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);
  console.log(url.slice(21).padEnd(35), errs.length ? "ERRORS: " + errs.join(" | ") : "clean");
  await page.close();
}
await browser.close();
