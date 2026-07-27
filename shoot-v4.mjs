import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
const errs=[];
p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text())});
await p.goto('file:///root/site-audit/og-site-v3.html');
await p.waitForTimeout(2500);
// lobby doors
await p.evaluate(()=>{document.querySelector('#doors').scrollIntoView();});
await p.waitForTimeout(1800);
await p.screenshot({path:'v4-doors.png'});
const views=['partners','investors','sell','about','faq'];
for(const v of views){
  await p.evaluate(x=>window.__go?window.__go(x):document.querySelector(`[data-nav="${x}"]`).click(),v);
  await p.waitForTimeout(1600);
  await p.screenshot({path:`v4-${v}-hero.png`});
  await p.evaluate(()=>scrollTo(0,1500)); await p.waitForTimeout(1400);
  await p.screenshot({path:`v4-${v}-2.png`});
  if(v==='partners'){await p.evaluate(()=>scrollTo(0,3200));await p.waitForTimeout(1400);await p.screenshot({path:'v4-partners-3.png'});}
  await p.evaluate(()=>scrollTo(0,0));
  await p.evaluate(()=>document.querySelector('[data-nav="lobby"]').click());
  await p.waitForTimeout(1200);
}
// faq wholesaler tab
await p.evaluate(()=>document.querySelector('nav [data-nav="faq"]').click());
await p.waitForTimeout(1400);
await p.evaluate(()=>{const bs=document.querySelectorAll('.tabs button');bs[2].click();});
await p.waitForTimeout(900);
await p.screenshot({path:'v4-faq-whl.png'});
console.log(errs.length?errs.join('\n'):'NO ERRORS');
await b.close();
