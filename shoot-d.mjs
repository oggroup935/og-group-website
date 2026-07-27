import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:1440,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///root/site-audit/og-site-v3.html');await p.waitForTimeout(2200);
await p.evaluate(()=>document.querySelector('#doors').scrollIntoView());await p.waitForTimeout(1800);
await p.screenshot({path:'v4-doors2.png'});
console.log(errs.length?errs.join('\n'):'NO ERRORS');await b.close();
