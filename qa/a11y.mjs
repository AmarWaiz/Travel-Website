import { chromium } from "playwright-core";
const exe = process.env.HOME + "/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: exe });
for (const url of ["http://localhost:3001/", "http://localhost:3001/tours", "http://localhost:3001/tours/hunza-skardu-karakoram"]) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    const noAlt = imgs.filter((i) => !i.hasAttribute("alt")).length;
    const btns = [...document.querySelectorAll("button")];
    const noName = btns.filter((b) => !(b.textContent.trim() || b.getAttribute("aria-label"))).length;
    const small = btns.filter((b) => { const r = b.getBoundingClientRect(); return r.width > 0 && (r.width < 40 || r.height < 40); }).length;
    const h1 = document.querySelectorAll("h1").length;
    const links = [...document.querySelectorAll("a")];
    const noLinkName = links.filter((a) => !(a.textContent.trim() || a.getAttribute("aria-label"))).length;
    return { imgs: imgs.length, noAlt, buttons: btns.length, noName, smallTap: small, h1, links: links.length, noLinkName };
  });
  console.log(url.slice(21), JSON.stringify(r));
  await page.close();
}
await browser.close();
