import { chromium } from 'playwright';
const pages = ['', 'sell', 'buyers', 'partners', 'about', 'faq', 'contact'];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  for (const p of pages) {
    try {
      await page.goto(`http://localhost:3000/${p}`, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2500);
      await page.evaluate(async () => { window.scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 1200)); window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 800)); });
      await page.screenshot({ path: `${p || 'home'}-${tag}.png`, fullPage: true });
      console.log(`OK ${p || 'home'} ${tag}`);
    } catch (e) { console.log(`FAIL ${p || 'home'} ${tag}: ${e.message.split('\n')[0]}`); }
  }
  await ctx.close();
}
await browser.close();
