import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs=[]; page.on('pageerror',e=>errs.push(e.message));
await page.goto('file:///root/site-audit/og-site-v3.html', { waitUntil: 'load' });
await page.waitForTimeout(1500);
// go investors
await page.evaluate(() => go('investors'));
await page.waitForTimeout(1600); await page.screenshot({ path: 'pg-inv-hero.png' });
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(1400); await page.screenshot({ path: 'pg-inv-2.png' });
// go sell
await page.evaluate(() => go('sell'));
await page.waitForTimeout(1600); await page.screenshot({ path: 'pg-sell-hero.png' });
await page.evaluate(() => window.scrollTo(0, 1700));
await page.waitForTimeout(1400); await page.screenshot({ path: 'pg-sell-2.png' });
// go about
await page.evaluate(() => go('about'));
await page.waitForTimeout(1400); await page.screenshot({ path: 'pg-about.png' });
// go faq
await page.evaluate(() => go('faq'));
await page.waitForTimeout(1400); await page.screenshot({ path: 'pg-faq.png' });
console.log(errs.length?('ERR: '+errs.join(' | ')):'no errors');
await browser.close();
