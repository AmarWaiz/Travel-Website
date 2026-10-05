import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const sec = document.querySelector("section");
  const content = sec?.querySelector(".container-x");
  const r = (el) => { const b = el.getBoundingClientRect(); return { y: Math.round(b.y), h: Math.round(b.height) }; };
  return {
    innerHeight: window.innerHeight,
    section: r(sec),
    sectionClass: sec?.className?.slice(0, 80),
    content: content ? r(content) : null,
    contentClass: content?.className?.slice(0, 100),
    swiperH: sec?.querySelector(".swiper")?.getBoundingClientRect().height,
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
