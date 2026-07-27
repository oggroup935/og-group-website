import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('file:///root/site-audit/og-homepage-v2.html', { waitUntil: 'load' });
await page.waitForTimeout(1200);
const info = await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  const p = document.getElementById('paths');
  window.scrollTo(0, p.offsetTop - 40);
  return new Promise(res => setTimeout(() => {
    const sr = document.getElementById('sunrise').getBoundingClientRect();
    res({
      dayOpacity: document.getElementById('bd-day').style.opacity,
      nightExists: !!document.getElementById('bd-night'),
      sunriseTop: Math.round(sr.top), sunriseHeight: Math.round(sr.height),
      vh: window.innerHeight,
      scrollY: Math.round(window.scrollY),
      pathsOffset: Math.round(p.offsetTop),
    });
  }, 800));
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
