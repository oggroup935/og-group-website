const { chromium } = require('/root/site-audit/node_modules/playwright');
const path = 'file:///root/seller-site/og-sellers.html';
const OUT = '/root/seller-site/shots';
const fs = require('fs');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const errs = [];
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  p.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text()); });
  p.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
  await p.goto(path);
  await p.waitForTimeout(1200);

  const report = {};
  // 1. views exist
  report.views = await p.$$eval('.view', vs => vs.map(v => v.id));
  report.active = await p.$eval('.view.active', v => v.id);

  // full page home
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
  await p.screenshot({ path: OUT + '/01-home-hero.png' });

  // scroll through home, capture sections
  const H = await p.evaluate(() => document.body.scrollHeight);
  report.homeHeight = H;
  const marks = [0.14, 0.3, 0.45, 0.6, 0.75, 0.9];
  for (let i = 0; i < marks.length; i++) {
    await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(H * marks[i]));
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${OUT}/02-home-${i + 1}.png` });
  }
  // rail progress check
  report.railHeight = await p.$eval('#tl1 .rail i', el => el.style.height);
  report.litSteps = await p.$$eval('#tl1 .stepc.lit', e => e.length);

  // reveals fired?
  report.unrevealed = await p.$$eval('#v-home .rv:not(.on)', e => e.length);

  // ---- FORM ----
  await p.evaluate(() => document.getElementById('offer').scrollIntoView());
  await p.waitForTimeout(600);
  await p.screenshot({ path: OUT + '/03-form-step1.png' });
  // validation: click next with nothing
  await p.click('#fs1 [data-step="2"]');
  await p.waitForTimeout(300);
  report.err1shown = await p.$eval('#e1', e => e.classList.contains('on'));
  report.stillStep1 = await p.$eval('#fs1', e => e.classList.contains('on'));
  await p.screenshot({ path: OUT + '/04-form-validation.png' });
  // fill
  await p.fill('#q_addr', '1234 Example Ave, Cleveland, OH');
  await p.click('#fs1 .opt[data-val="Inherited / estate"]');
  await p.click('#fs1 [data-step="2"]');
  await p.waitForTimeout(500);
  report.onStep2 = await p.$eval('#fs2', e => e.classList.contains('on'));
  await p.click('#fs2 .opt[data-val="Needs real work"]');
  await p.fill('#q_notes', 'Tenants in place, some back taxes.');
  await p.screenshot({ path: OUT + '/05-form-step2.png' });
  await p.click('#fs2 [data-step="3"]');
  await p.waitForTimeout(500);
  await p.click('#fs3 .opt[data-val="1–3 months"]');
  await p.click('#fs3 [data-step="4"]');
  await p.waitForTimeout(500);
  report.onStep4 = await p.$eval('#fs4', e => e.classList.contains('on'));
  report.summRows = await p.$$eval('#summ .sr', e => e.length);
  await p.fill('#q_name', 'Jane Doe');
  await p.fill('#q_phone', '(216) 555-0134');
  await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/06-form-step4.png' });
  // back nav
  await p.click('#fs4 .back');
  await p.waitForTimeout(400);
  report.backWorks = await p.$eval('#fs3', e => e.classList.contains('on'));
  await p.click('#fs3 [data-step="4"]');
  await p.waitForTimeout(400);

  // submit: done-state renders immediately, mailto fires 220ms later
  const navs = [];
  p.on('framenavigated', f => navs.push(f.url()));
  await p.click('#submitBtn');
  await p.waitForTimeout(120);
  report.onDone = await p.$eval('#fs5', e => e.classList.contains('on')).catch(e => 'ERR:' + e.message);
  await p.screenshot({ path: OUT + '/07-form-done.png' }).catch(() => { });
  await p.waitForTimeout(900);
  report.mailtoNav = navs.filter(u => u.startsWith('mailto:'));

  // ---- OTHER VIEWS ----
  for (const v of ['how', 'about', 'faq']) {
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.click(`[data-nav="${v}"]`);
    await p.waitForTimeout(1100);
    await p.screenshot({ path: `${OUT}/08-${v}-top.png` });
    const h = await p.evaluate(() => document.body.scrollHeight);
    await p.evaluate(y => window.scrollTo(0, y), Math.round(h * 0.4));
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${OUT}/09-${v}-mid.png` });
    report['unrevealed_' + v] = await p.$$eval(`#v-${v} .rv:not(.on)`, e => e.length);
  }
  // faq accordion
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(300);
  await p.click('#v-faq .faqrow');
  await p.waitForTimeout(600);
  report.faqOpens = await p.$eval('#v-faq .faqrow', e => e.classList.contains('open'));
  await p.screenshot({ path: OUT + '/10-faq-open.png' });

  // nav CTA -> back to home offer
  await p.click('nav [data-go="offer"]');
  await p.waitForTimeout(1600);
  report.ctaLandsHome = await p.$eval('.view.active', v => v.id);
  report.ctaScrolled = await p.evaluate(() => Math.round(window.scrollY));
  await p.screenshot({ path: OUT + '/11-cta-jump.png' });

  await ctx.close();

  // ---- MOBILE ----
  for (const [w, h, tag] of [[390, 844, 'mobile'], [768, 1024, 'tablet']]) {
    const c2 = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: w < 500, hasTouch: w < 500 });
    const m = await c2.newPage();
    m.on('pageerror', e => errs.push(`PAGEERROR(${tag}): ` + e.message));
    await m.goto(path);
    await m.waitForTimeout(1000);
    await m.screenshot({ path: `${OUT}/12-${tag}-hero.png` });
    const mh = await m.evaluate(() => document.body.scrollHeight);
    for (const [i, f] of [0.28, 0.5, 0.72].entries()) {
      await m.evaluate(y => window.scrollTo(0, y), Math.round(mh * f));
      await m.waitForTimeout(800);
      await m.screenshot({ path: `${OUT}/13-${tag}-${i + 1}.png` });
    }
    report['overflow_' + tag] = await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    await c2.close();
  }

  await browser.close();
  report.errors = errs;
  console.log(JSON.stringify(report, null, 2));
})();
