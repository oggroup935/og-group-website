import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('file:///root/site-audit/og-homepage-prototype.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'proto-1-hero.png' });
// scroll to OS section
await page.evaluate(() => document.getElementById('os').scrollIntoView());
await page.waitForTimeout(1800);
await page.screenshot({ path: 'proto-2-os.png' });
// mid-sunrise
await page.evaluate(() => { const el = document.getElementById('sunrise'); window.scrollTo(0, el.offsetTop + el.offsetHeight * 0.45); });
await page.waitForTimeout(1200);
await page.screenshot({ path: 'proto-3-sunrise.png' });
// paths (day)
await page.evaluate(() => document.getElementById('paths').scrollIntoView());
await page.waitForTimeout(1800);
await page.screenshot({ path: 'proto-4-paths.png' });
// proof + final
await page.evaluate(() => document.getElementById('final').scrollIntoView());
await page.waitForTimeout(1800);
await page.screenshot({ path: 'proto-5-final.png' });
console.log('done');
await browser.close();
