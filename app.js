const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const COARSE=matchMedia('(pointer:coarse)').matches;

/* ---- cursor (always visible, above lightbox) + ambient light-leak ---- */
const leak=$('#leak'),cur=$('#cursor');
let mx=innerWidth/2,my=innerHeight/2,lx=mx,ly=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cur){cur.style.left=mx+'px';cur.style.top=my+'px';}});
const HOT='a,button,[data-nav],.clip,.cube,.door,.door3,.faqrow,.tabs button,.x';
document.addEventListener('mouseover',e=>{if(e.target.closest(HOT))cur&&cur.classList.add('big');});
document.addEventListener('mouseout',e=>{if(e.target.closest(HOT))cur&&cur.classList.remove('big');});
if(!COARSE)(function loop(){lx+=(mx-lx)*.06;ly+=(my-ly)*.06;
  leak.style.background=`radial-gradient(440px circle at ${lx}px ${ly}px,rgba(201,164,92,.06),transparent 68%)`;
  requestAnimationFrame(loop);})();

/* ---- reveals ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}}),{threshold:.15});
function observeView(id){$$('#v-'+id+' .rv').forEach(el=>io.observe(el));}

/* ---- decrypt ---- */
function decrypt(el){const f=el.dataset.final,ch='ABCDEFGHIJKLMNOPQRSTUVWXYZ$#/0123456789';if(RM){el.textContent=f;return;}
  let fr=0;const id=setInterval(()=>{el.textContent=f.split('').map((c,i)=>c===' '?' ':(i<fr/2?f[i]:ch[Math.floor((i*7+fr)%ch.length)])).join('');fr++;if(fr/2>=f.length){clearInterval(id);el.textContent=f;}},34);}

/* ---- theme ---- */
const bgday=$('#bgday'),sklDay=$('#sklDay'),sun=$('#sun'),nav=$('#nav'),sunriseEl=$('#sunrise');
let sunriseOn=true;
function setTheme(t){
  if(t==='sunrise'){sunriseOn=true;return;}
  sunriseOn=false;
  if(t==='day'){bgday.style.opacity=1;sklDay.style.opacity=1;sun.style.opacity=.9;nav.classList.add('day');}
  else{bgday.style.opacity=0;sklDay.style.opacity=0;sun.style.opacity=0;nav.classList.remove('day');}
}
function onScroll(){if(!sunriseOn||!sunriseEl)return;const r=sunriseEl.getBoundingClientRect();const tot=r.height-innerHeight;
  let p=tot>0?(-r.top)/tot:0;p=Math.max(0,Math.min(1,p));
  bgday.style.opacity=p;sklDay.style.opacity=p;sun.style.opacity=p>.05?Math.min(1,p*2)*(1-Math.max(0,(p-.8)*5)):0;
  sun.style.bottom=(12+p*30)+'vh';sunriseEl.classList.toggle('lit',p>.5);nav.classList.toggle('day',p>.5);
  const dr=$('#doors').getBoundingClientRect();const fade=Math.max(0,Math.min(1,(dr.top-innerHeight*.4)/300));
  $('#skyline').style.opacity=.35+fade*.65;}
addEventListener('scroll',onScroll,{passive:true});

/* ---- router + portal ---- */
const portal=$('#portal'),pimg=portal.querySelector('img'),sweep=portal.querySelector('.sweep');
const THEME={lobby:'sunrise',investors:'night',partners:'night',about:'night',faq:'night'};
function show(view){$$('.view').forEach(v=>v.classList.remove('active'));$('#v-'+view).classList.add('active');
  setTheme(THEME[view]);scrollTo(0,0);observeView(view);onScroll();}
function go(nav){
  if(nav.endsWith('-cta')){location.href='mailto:og.group.holdings.llc@gmail.com';return;}
  const view=nav;if(!THEME[view])return;
  if(RM){show(view);return;}
  portal.style.transition='transform .5s cubic-bezier(.22,1,.36,1)';portal.style.transformOrigin='bottom';portal.style.transform='scaleY(1)';
  pimg.style.transition='opacity .4s .15s';pimg.style.opacity='1';
  sweep.style.transition='none';sweep.style.left='-40%';requestAnimationFrame(()=>{sweep.style.transition='left .6s ease';sweep.style.left='100%';});
  setTimeout(()=>{show(view);},520);
  setTimeout(()=>{pimg.style.opacity='0';portal.style.transformOrigin='top';portal.style.transform='scaleY(0)';},650);
}
$$('[data-nav]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();go(el.dataset.nav);}));

/* ---- lightbox ---- */
const VID={field:{src:'__VFIELD__',cap:'FIELD INTEL · DEMO DATA · FICTIONAL PROPERTIES'},
  net:{src:'__VNET__',cap:'INVESTOR NETWORK · DEMO ONLY · NAMES & DEALS NOT REAL'},
  rehab:{src:'__VREHAB__',cap:'REHAB AI · DEMO ONLY · NOT A REAL LISTING'}};
$$('.clip').forEach(el=>el.addEventListener('click',()=>{const d=VID[el.dataset.clip];const v=$('#lbv');
  v.src=d.src;$('#lbcap').textContent=d.cap;$('#lb').classList.add('on');v.play().catch(()=>{});}));
window.closeLB=()=>{const v=$('#lbv');v.pause();v.src='';$('#lb').classList.remove('on');};
addEventListener('keydown',e=>{if(e.key==='Escape')closeLB();});

/* ---- faq ---- */
$$('.faqrow').forEach(r=>r.addEventListener('click',()=>r.classList.toggle('open')));
const FAQTABS=['inv','whl'];
window.faqTab=(t,btn)=>{$$('.tabs button').forEach(b=>b.classList.remove('on'));btn.classList.add('on');
  FAQTABS.forEach(k=>{const el=$('#faq-'+k);if(!el)return;el.style.display=k===t?'block':'none';
    if(k===t)el.querySelectorAll('.rv').forEach(r=>r.classList.add('on'));});};

/* ---- boot ---- */
observeView('lobby');
$$('#v-lobby .decrypt').forEach((el,i)=>setTimeout(()=>decrypt(el),400+i*250));
onScroll();
