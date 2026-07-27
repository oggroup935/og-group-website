import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: 'app-login.png' });
console.log('OK login');
await browser.close();
