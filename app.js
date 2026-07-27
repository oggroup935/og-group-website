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


/* ---- THE DIVE ---------------------------------------------------------- */
/* Fictional dataset. Names, addresses and numbers are INVENTED — plausible
   Cleveland flavor, zero real people. The visible chip on the screen says so. */
const DV_LEADS=[
  ['82','Marcus Bell','4127 Maplecrest Ave, Cleveland 44109','hot','$142K'],
  ['79','Rita Kowalski','1093 Ashford Rd, Parma 44134','warm','$118K'],
  ['77','Dennis Okafor','2214 Birchwood Ct, Lakewood 44107','warm','$205K'],
  ['74','Gloria Stanton','886 Fernhill Dr, Euclid 44117','warm','$96K'],
  ['71','Ray Delgado','3340 Cobbler Ln, Garfield Hts 44125','warm','$130K'],
  ['68','June Marsh','512 Willow Bend Ave, Cleveland 44102','warm','$155K'],
];
const dvRows=$('#osRows');
if(dvRows){
  dvRows.innerHTML=DV_LEADS.map(l=>
    '<div class="os-row"><div class="sc">'+l[0]+'</div><div><div class="nm">'+l[1]+
    '</div><div class="ad">'+l[2]+'</div></div><div class="tg '+l[3]+'">'+l[3].toUpperCase()+
    '</div><div class="pr">'+l[4]+'</div></div>').join('');
}
const dive=$('#dive'),dvMon=$('#dvMon'),dvBezel=$('#dvBezel'),dvStand=$('#dvStand'),
      dvHead=$('#dvHead'),dvCap=$('#dvCap'),osLeads=$('#osLeads'),osRehab=$('#osRehab');
const dvNarrow=matchMedia('(max-width:860px)');
function diveScroll(){
  if(!dive||dvNarrow.matches)return;
  const r=dive.getBoundingClientRect();
  const total=r.height-innerHeight;
  const p=Math.min(1,Math.max(0,-r.top/total));   /* 0..1 through the section */
  const z=Math.min(1,Math.max(0,(p-.05)/.24));   /* zoom waits a beat, then flies */
  const e=1-Math.pow(1-z,3);                       /* easeOutCubic */
  dvMon.style.setProperty('--dvs',(.42+.82*e).toFixed(4));
  dvMon.style.setProperty('--dvy',(22-24*e).toFixed(2)+'vh');
  dvBezel.style.opacity=dvStand.style.opacity=String(1-e);
  const nav=$('#nav');if(nav){const full=e>.85&&p<.985;nav.style.opacity=full?'0':'1';nav.style.pointerEvents=full?'none':'auto';nav.style.transition='opacity .4s';}
  dvHead.style.opacity=String(Math.max(0,1-z*2.2));
  dvCap.style.opacity=p>.02&&p<.24?'1':'0';
  const rows=dvRows?dvRows.children:[];
  const lit=p>.30&&p<.52?Math.min(rows.length-1,Math.floor((p-.30)/.22*rows.length)):-1;
  for(let i=0;i<rows.length;i++)rows[i].classList.toggle('lit',i===lit);
  const rehabOn=p>=.54;
  osLeads.classList.toggle('off',rehabOn);
  osRehab.classList.toggle('off',!rehabOn);
  if(rehabOn){
    const q=Math.min(1,(p-.54)/.34);
    $$('#osRehab .os-box').forEach((b,i)=>b.classList.toggle('show',q>.12+i*.14));
    $$('#osRehab .os-line').forEach((l,i)=>l.classList.toggle('show',q>.18+i*.15));
  }
}
addEventListener('scroll',diveScroll,{passive:true});
diveScroll();

/* ---- boot ---- */
observeView('lobby');
$$('#v-lobby .decrypt').forEach((el,i)=>setTimeout(()=>decrypt(el),400+i*250));
onScroll();
