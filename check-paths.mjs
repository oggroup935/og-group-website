import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await page.goto('file:///root/site-audit/og-homepage-v2.html', { waitUntil: 'load' });
await page.waitForTimeout(1500);
// force scroll-behavior auto and jump to paths absolute top
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  const p = document.getElementById('paths');
  window.scrollTo(0, p.offsetTop - 40);
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'v2-4-paths.png' });
console.log('done');
await browser.close();
