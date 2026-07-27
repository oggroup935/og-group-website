const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const COARSE=matchMedia('(pointer:coarse)').matches;

/* ---------- ambient warm leak (native cursor, nothing custom) ---------- */
const leak=$('#leak');
let mx=innerWidth/2,my=innerHeight/2,lx=mx,ly=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
if(!COARSE&&leak)(function loop(){lx+=(mx-lx)*.06;ly+=(my-ly)*.06;
  leak.style.background=`radial-gradient(520px circle at ${lx}px ${ly}px,rgba(201,164,92,.10),transparent 66%)`;
  requestAnimationFrame(loop);})();

/* ---------- reveals ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
function observeView(id){
  const root=document.getElementById('v-'+id); if(!root)return;
  root.querySelectorAll('.rv').forEach(el=>{
    if(el.getBoundingClientRect().top<innerHeight*.92){el.classList.add('on');}
    else io.observe(el);
  });
}

/* ---------- nav state + scroll-drawn timelines ---------- */
const nav=$('#nav'),skyline=$('#skyline');
function drawRails(){
  $$('.tl').forEach(tl=>{
    const rail=tl.querySelector('.rail i'); if(!rail)return;
    const r=tl.getBoundingClientRect(), anchor=innerHeight*.62;
    let p=(anchor-r.top)/Math.max(1,r.height);
    p=Math.max(0,Math.min(1,p));
    rail.style.height=(p*100)+'%';
    tl.querySelectorAll('.stepc').forEach(sc=>{
      const d=sc.querySelector('.dot'); if(!d)return;
      sc.classList.toggle('lit',d.getBoundingClientRect().top<anchor+6);
    });
  });
}
/* Any late layout shift — a lazy image finally arriving, a webfont swapping,
   a view being revealed — invalidates the cached band geometry. Everything that
   can move the page calls this instead of measuring inline. The rAF defer is
   also what makes it safe to call from a synchronous image-complete branch that
   runs before the band list exists. `var` on purpose: hoisted, no TDZ. */
var mbT=false;
function remeasure(){
  if(mbT)return; mbT=true;
  requestAnimationFrame(()=>{mbT=false;measureBands();onScroll();});
}
/* ---------- photography: blur-up + scroll parallax ---------- */
const frames=$$('.ph-frame');
frames.forEach(f=>{
  const img=f.querySelector('.ph-img');
  if(!img)return;
  const done=()=>{f.classList.add('loaded');remeasure();};
  if(img.complete)done(); else img.addEventListener('load',done,{once:true});
  img.addEventListener('error',done,{once:true});
});
function parallax(){
  if(RM)return;
  frames.forEach(f=>{
    const mv=f.querySelector('.ph-move'); if(!mv)return;
    const r=f.getBoundingClientRect();
    if(r.bottom<-120||r.top>innerHeight+120||!r.height)return;
    /* -1 well below the fold … +1 well above it */
    const p=((r.top+r.height/2)-innerHeight/2)/(innerHeight/2+r.height/2);
    mv.style.transform='translate3d(0,'+(Math.max(-1,Math.min(1,p))*(COARSE?16:38)).toFixed(1)+'px,0)';
  });
}

/* ---------- cinematic bands ----------
   Geometry is cached on resize and on view change, so the scroll path does
   pure writes and never forces a synchronous reflow. background-attachment:
   fixed is deliberately not used: iOS Safari ignores it and Android Chrome
   pays for it with a full repaint every frame. */
const CB=$$('.cband').map(el=>({el:el,img:el.querySelector('.cband-img'),top:0,h:0,live:false}));
/* the quiet photography: a frame standing behind an ordinary section. Same
   shape as CB so both can share measureBands() and one scroll write. */
const PB=$$('.pbg').map(el=>({el:el,img:el.querySelector('.pbg-img'),top:0,h:0,live:false}));
let CVH=innerHeight;
function measureBands(){
  CVH=innerHeight;
  measureDoc();   /* the backdrop's clock needs document height, same cadence */
  const sy=scrollY||document.documentElement.scrollTop;
  CB.forEach(b=>{
    const r=b.el.getBoundingClientRect();
    if(!r.height)return;              /* in a hidden view — measured when shown */
    b.top=r.top+sy; b.h=r.height;
  });
  PB.forEach(b=>{
    const r=b.el.getBoundingClientRect();
    if(!r.height)return;
    b.top=r.top+sy; b.h=r.height;
  });
}
if(CB.length){
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    const b=CB.find(x=>x.el===e.target); if(!b)return;
    b.live=e.isIntersecting;
    b.el.classList.toggle('live',b.live);
    /* will-change is toggled, never left in the stylesheet: three permanent
       full-bleed layers is how a mid-range Android runs out of GPU texture */
    if(b.img)b.img.style.willChange=b.live?'transform':'auto';
    if(b.live)b.el.classList.add('on');
  }),{rootMargin:'25% 0px'});
  CB.forEach(b=>{
    cio.observe(b.el);
    if(!b.img)return;
    const done=()=>{b.el.classList.add('loaded');remeasure();};
    if(b.img.complete)done(); else b.img.addEventListener('load',done,{once:true});
    b.img.addEventListener('error',done,{once:true});
  });
  /* The band images are lazy and carry no intrinsic width/height, so the page
     grows underneath us after boot. A ResizeObserver on each band catches that
     exactly once per shift — cheaper and more reliable than polling, and it also
     covers a font swap or an FAQ row opening above the band. */
  if(window.ResizeObserver){
    const ro=new ResizeObserver(()=>remeasure());
    CB.forEach(b=>ro.observe(b.el));
    const main=document.querySelector('main')||document.body;
    if(main)ro.observe(main);
  }
}
function cbands(){
  if(RM)return;
  const vc=(scrollY||document.documentElement.scrollTop)+CVH*.5;
  for(let i=0;i<CB.length;i++){
    const b=CB[i]; if(!b.live||!b.h||!b.img)continue;
    const p=Math.max(-1,Math.min(1,((b.top+b.h*.5)-vc)/((CVH+b.h)*.5)));
    /* one write, one property: translate + a narrow scale so the raster
       never has to be regenerated at a wildly different size */
    b.img.style.transform='translate3d(0,'+(p*(COARSE?-26:-54)).toFixed(1)+'px,0) scale('+
      (1.06+(1-Math.abs(p))*.05).toFixed(4)+')';
  }
}
if(RM)CB.forEach(b=>{if(b.img)b.img.style.transform='scale(1.04)';});

/* ---------- photographic section grounds ----------
   The contract is deliberately one-directional: the CSS ships both layers at
   opacity 0, and only a successful decode adds .ok. A dead URL, a blocked host
   or no network at all therefore leaves exactly the paper page that existed
   before this feature — never a broken glyph and never a half-painted wash. */
if(PB.length){
  const pio=new IntersectionObserver(es=>es.forEach(e=>{
    const b=PB.find(x=>x.el===e.target); if(!b)return;
    b.live=e.isIntersecting;
    if(b.img)b.img.style.willChange=b.live?'transform':'auto';
  }),{rootMargin:'25% 0px'});
  PB.forEach(b=>{
    pio.observe(b.el);
    if(!b.img){b.el.classList.remove('pbg');return;}
    const ok=()=>{
      /* naturalWidth is 0 for a decode that failed even though load fired */
      if(b.img.naturalWidth>1)b.el.classList.add('ok');
      remeasure();
    };
    if(b.img.complete)ok(); else b.img.addEventListener('load',ok,{once:true});
    b.img.addEventListener('error',()=>{b.el.classList.remove('ok');},{once:true});
  });
  if(window.ResizeObserver){
    const pro=new ResizeObserver(()=>remeasure());
    PB.forEach(b=>pro.observe(b.el));
  }
}
function pbgs(){
  if(RM)return;
  const vc=(scrollY||document.documentElement.scrollTop)+CVH*.5;
  for(let i=0;i<PB.length;i++){
    const b=PB[i]; if(!b.live||!b.h||!b.img)continue;
    const p=Math.max(-1,Math.min(1,((b.top+b.h*.5)-vc)/((CVH+b.h)*.5)));
    /* shallower than the bands on purpose — this layer is scenery, and a
       ground that moves as much as the hero photograph reads as a bug */
    b.img.style.transform='translate3d(0,'+(p*(COARSE?-14:-34)).toFixed(1)+'px,0)';
  }
}

/* ---------- time of day ----------
   One number, written to :root as --tod, drives the entire backdrop: the sky
   crossfade, the two photographic washes, the survey grid, and the sun — which
   literally sets as the page is read. Nothing here reads layout: scrollHeight
   is cached by measureBands() and refreshed by remeasure(), so the scroll path
   stays a pure write and never forces a synchronous reflow.

   The write is gated on a visible delta. A CSS custom property on :root
   invalidates style for every rule that references it, so spending that on a
   change nobody can see is the one real cost in this file. */
/* `var` on purpose, same reason as mbT above: measureBands() may run before
   this line is reached, and a TDZ throw there would take the whole file down. */
var docH=0, lastTod=-1;
var root=document.documentElement, plat=null;
function measureDoc(){
  docH=Math.max(1,document.documentElement.scrollHeight-innerHeight);
}
function timeOfDay(y){
  if(!docH)measureDoc();
  /* eased so the light lingers at both ends instead of ramping linearly —
     a flat crossfade reads as a slider being dragged, not as an evening */
  const p=Math.max(0,Math.min(1,y/docH));
  const tod=p*p*(3-2*p);
  if(Math.abs(tod-lastTod)>.004){
    lastTod=tod;
    root.style.setProperty('--tod',tod.toFixed(3));
  }
  const pl=plat||(plat=$('#plat'));
  if(pl&&!RM)pl.style.transform='translate3d(0,'+(-y*.06).toFixed(1)+'px,0)';
}

function onScroll(){
  const y=scrollY||document.documentElement.scrollTop;
  if(nav)nav.classList.toggle('stuck',y>28);
  if(skyline)skyline.style.opacity=Math.max(.18,.5-y/2600);
  timeOfDay(y);
  drawRails();
  parallax();
  cbands();
  pbgs();
}
let cbTick=false;
addEventListener('scroll',()=>{
  if(cbTick)return; cbTick=true;
  requestAnimationFrame(()=>{cbTick=false;onScroll();});
},{passive:true});
let cbRT;
addEventListener('resize',()=>{
  /* an iOS address-bar collapse fires resize with a ~100px height delta and
     no width change — remeasuring on that makes the bands twitch */
  clearTimeout(cbRT);
  cbRT=setTimeout(()=>{measureBands();onScroll();},120);
},{passive:true});
measureBands();
/* fonts and the last images settle well after DOMContentLoaded */
addEventListener('load',remeasure);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(remeasure);

/* ---------- router + portal ---------- */
const VIEWS=['home','how','about','faq'];
const portal=$('#portal');
const pimg=portal?portal.querySelector('img'):null;
const sweep=portal?portal.querySelector('.sweep'):null;
function show(view){
  $$('.view').forEach(v=>v.classList.remove('active'));
  const el=document.getElementById('v-'+view); if(!el)return;
  el.classList.add('active');
  scrollTo(0,0);
  observeView(view);
  measureBands();   /* the incoming view's bands had no geometry while hidden */
  onScroll();
  remeasure();      /* and again after the frame settles */
}
function go(view,then){
  if(!VIEWS.includes(view))return;
  const av=$('.view.active');
  if(av&&av.id==='v-'+view){if(then)then();return;}
  if(RM||!portal){show(view);if(then)then();return;}
  portal.style.transition='transform .5s cubic-bezier(.22,1,.36,1)';
  portal.style.transformOrigin='bottom';portal.style.transform='scaleY(1)';
  if(pimg){pimg.style.transition='opacity .4s .15s';pimg.style.opacity='1';}
  if(sweep){sweep.style.transition='none';sweep.style.left='-40%';
    requestAnimationFrame(()=>{sweep.style.transition='left .6s ease';sweep.style.left='100%';});}
  setTimeout(()=>{show(view);if(then)then();},520);
  setTimeout(()=>{if(pimg)pimg.style.opacity='0';portal.style.transformOrigin='top';portal.style.transform='scaleY(0)';},650);
}
function toOffer(){
  const jump=()=>{const t=document.getElementById('offer');if(!t)return;
    const top=t.getBoundingClientRect().top+(scrollY||0)-70;
    scrollTo({top:Math.max(0,top),behavior:RM?'auto':'smooth'});};
  const av=$('.view.active');
  if(av&&av.id==='v-home'){jump();}
  else go('home',()=>setTimeout(jump,60));
}
/* ---------- mobile menu ---------- */
const burger=$('#burger'),mmenu=$('#mmenu');
function setMenu(on){
  if(!mmenu||!burger)return;
  mmenu.classList.toggle('open',on);
  burger.classList.toggle('x',on);
  burger.setAttribute('aria-expanded',on?'true':'false');
  burger.setAttribute('aria-label',on?'Close menu':'Open menu');
  document.body.classList.toggle('nomove',on);
}
if(burger)burger.addEventListener('click',e=>{e.preventDefault();setMenu(!mmenu.classList.contains('open'));});
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);});
addEventListener('resize',()=>{if(innerWidth>1020)setMenu(false);},{passive:true});

document.addEventListener('click',e=>{
  const t=e.target.closest?e.target.closest('[data-nav],[data-go]'):null;
  if(!t)return;
  e.preventDefault();
  const inMenu=!!(mmenu&&mmenu.contains(t));
  if(inMenu)setMenu(false);
  if(t.hasAttribute('data-go')){if(inMenu)setTimeout(toOffer,340);else toOffer();return;}
  if(inMenu)setTimeout(()=>go(t.dataset.nav),200);else go(t.dataset.nav);
});

/* ---------- faq accordion ---------- */
$$('.faqrow').forEach(r=>r.addEventListener('click',()=>r.classList.toggle('open')));

/* ---------- multi-step offer form ---------- */
const A={own:'',cond:'',time:''};
let step=1;
const STEPS=5;
function stepEl(n){return document.getElementById('fs'+n);}
function err(n,on){const e=document.getElementById('e'+n);if(e)e.classList.toggle('on',!!on);}
function progress(n){
  for(let i=1;i<=4;i++){const p=document.getElementById('pb'+i);if(p)p.classList.toggle('fill',i<n||n>4);}
}
function goStep(n){
  if(n<1||n>STEPS)return;
  for(let i=1;i<=STEPS;i++){const s=stepEl(i);if(s)s.classList.toggle('on',i===n);}
  step=n;progress(n);
  if(n===4)renderSumm();
  const card=$('.formcard');
  if(card){const top=card.getBoundingClientRect().top+(scrollY||0)-80;
    if(card.getBoundingClientRect().top<-40||card.getBoundingClientRect().top>innerHeight*.6)
      scrollTo({top:Math.max(0,top),behavior:RM?'auto':'smooth'});}
  onScroll();
}
function val(id){const el=document.getElementById(id);return el?el.value.trim():'';}
function markErr(id,bad){const el=document.getElementById(id);if(el)el.classList.toggle('err',!!bad);}
function validate(n){
  if(n===1){
    const a=val('q_addr');
    const bad=a.length<5||!A.own;
    markErr('q_addr',a.length<5);
    err(1,bad);
    return !bad;
  }
  if(n===2){const bad=!A.cond;err(2,bad);return !bad;}
  if(n===3){const bad=!A.time;err(3,bad);return !bad;}
  if(n===4){
    const nm=val('q_name'),ph=val('q_phone').replace(/[^0-9]/g,''),em=val('q_email');
    const bad=!nm||(ph.length<10&&!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(em));
    markErr('q_name',!nm);markErr('q_phone',ph.length<10&&!em);
    err(4,bad);
    return !bad;
  }
  return true;
}
$$('.opts').forEach(g=>{
  const key=g.dataset.group;
  g.querySelectorAll('.opt').forEach(o=>o.addEventListener('click',()=>{
    g.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel'));
    o.classList.add('sel');
    if(key)A[key]=o.dataset.val||'';
    err(key==='own'?1:key==='cond'?2:3,false);
  }));
});
$$('[data-step]').forEach(b=>b.addEventListener('click',e=>{
  e.preventDefault();
  const n=parseInt(b.dataset.step,10);
  if(isNaN(n))return;
  if(n>step&&!validate(step))return;
  goStep(n);
}));
function renderSumm(){
  const s=document.getElementById('summ'); if(!s)return;
  const rows=[['Property',val('q_addr')||'—'],['Ownership',A.own||'—'],['Condition',A.cond||'—'],['Timeline',A.time||'—']];
  const notes=val('q_notes');
  if(notes)rows.push(['Notes',notes.length>90?notes.slice(0,90)+'…':notes]);
  s.innerHTML=rows.map(r=>`<div class="sr"><b>${r[0]}</b><span>${esc(r[1])}</span></div>`).join('');
}
function esc(t){return String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
/* ---------- submission ----------
   FORM_ENDPOINT is set in build.py. With a real URL the answers are POSTed
   server-side and the seller never touches a mail client. Empty, and the form
   degrades to opening the visitor's own mail app, with a copy-to-clipboard
   fallback on the done screen so an answer is never silently lost. */
const FORM_ENDPOINT='__FORM_ENDPOINT__';
const TO_EMAIL='__EMAIL__';
function answers(){
  return {address:val('q_addr'),ownership:A.own||'',condition:A.cond||'',timeline:A.time||'',
    notes:val('q_notes'),name:val('q_name'),phone:val('q_phone'),email:val('q_email'),
    source:'ordavidguyrealestate.com'};
}
function answerText(){
  const a=answers();
  return ['Property address: '+a.address,'Ownership: '+(a.ownership||'—'),'Condition: '+(a.condition||'—'),
    'Timeline: '+(a.timeline||'—'),'Notes: '+(a.notes||'—'),'',
    'Name: '+a.name,'Phone: '+(a.phone||'—'),'Email: '+(a.email||'—'),'',
    'Sent from '+a.source].join('\n');
}
function subjectLine(){return 'Cash offer request — '+(val('q_addr')||'Cleveland property');}
const PHONE_HTML='Call or text us at <b>(216) 677-9031</b> and we\'ll pick it up from there.';
function finish(title,msg,showFallback){
  const t=document.getElementById('doneTitle'),m=document.getElementById('doneMsg'),
        f=document.getElementById('doneFallback');
  if(t)t.textContent=title;
  if(m)m.innerHTML=msg;
  if(f)f.classList.toggle('on',!!showFallback);
  goStep(5);progress(5);
}
/* A real form POST into a hidden iframe. This is a navigation, not an XHR, so
   it is not subject to CORS at all — it goes through in the situations where
   the JSON fetch above is refused outright (a page opened from disk, a strict
   privacy extension, a corporate proxy). We can't read the response, so the
   seller is told plainly to expect a call and is still handed the copy button. */
function formPostFallback(){
  if(!FORM_ENDPOINT)return false;
  try{
    const action=FORM_ENDPOINT.replace('/ajax/','/');
    const fr=document.createElement('iframe');
    fr.name='ogpost';fr.style.display='none';fr.setAttribute('aria-hidden','true');
    document.body.appendChild(fr);
    const f=document.createElement('form');
    f.method='POST';f.action=action;f.target='ogpost';f.style.display='none';
    const a=answers();
    const fields={'Property address':a.address,'Ownership':a.ownership||'—',
      'Condition':a.condition||'—','Timeline':a.timeline||'—','Notes':a.notes||'—',
      'Name':a.name,'Phone':a.phone||'—','Email':a.email||'—','Source':a.source,
      _subject:subjectLine(),_template:'table',_captcha:'false'};
    Object.keys(fields).forEach(k=>{
      const i=document.createElement('input');
      i.type='hidden';i.name=k;i.value=fields[k];f.appendChild(i);
    });
    document.body.appendChild(f);
    f.submit();
    return true;
  }catch(_){return false;}
}
function mailFallback(){
  const href='mailto:'+TO_EMAIL+'?subject='+encodeURIComponent(subjectLine())+
             '&body='+encodeURIComponent(answerText());
  finish('Your email is ready to send.',
    'We\'ve opened an email with everything filled in — just press send in your mail app. Prefer to talk? '+PHONE_HTML,true);
  setTimeout(()=>{try{location.href=href;}catch(_){}},220);
}
const copyBtn=document.getElementById('copyBtn');
if(copyBtn)copyBtn.addEventListener('click',e=>{
  e.preventDefault();
  const txt=answerText();
  const ok=()=>{copyBtn.textContent='Copied ✓';setTimeout(()=>{copyBtn.textContent='Copy my answers';},2200);};
  const legacy=()=>{
    const ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy');ok();}catch(_){}
    document.body.removeChild(ta);
  };
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,legacy);
  else legacy();
});
const submitBtn=document.getElementById('submitBtn');
if(submitBtn)submitBtn.addEventListener('click',e=>{
  e.preventDefault();
  if(!validate(4))return;
  if(!FORM_ENDPOINT){mailFallback();return;}
  const label=submitBtn.innerHTML;
  submitBtn.classList.add('busy');
  submitBtn.innerHTML='Sending…';
  const restore=()=>{submitBtn.classList.remove('busy');submitBtn.innerHTML=label;};
  const body=Object.assign({},answers(),
    {_subject:subjectLine(),_template:'table',_captcha:'false',message:answerText()});
  /* Diagnostic channel. Never shown to a seller — it exists so that whoever is
     testing the form can read exactly what the mail relay answered instead of
     trusting a green panel. Read it with:  window.OG_LAST_SUBMIT  */
  const diag=(stage,detail)=>{
    window.OG_LAST_SUBMIT={stage:stage,detail:detail,at:new Date().toISOString()};
    try{console.info('[OG form]',stage,detail);}catch(_){}
  };
  diag('posting',{endpoint:FORM_ENDPOINT,origin:location.origin});
  fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify(body)})
    /* The relay answers HTTP 200 with {"success":"false", …} in two situations
       that both mean NOT DELIVERED: the address has never been activated, and
       the submission was rejected. Checking only r.ok therefore printed
       "Got it — it's with us." over a message that went nowhere. Read the body. */
    .then(r=>r.text().then(t=>{
      let j=null;try{j=JSON.parse(t);}catch(_){}
      return {status:r.status,ok:r.ok,json:j,text:t.slice(0,400)};
    }))
    .then(res=>{
      restore();
      const delivered=res.ok&&(!res.json||String(res.json.success)!=='false');
      diag(delivered?'delivered':'refused',res);
      if(!delivered)throw new Error((res.json&&res.json.message)||('status '+res.status));
      finish('Got it — it\'s with us.',
        'We\'ll do the homework on your address and come back with a real number, usually within 24–48 hours. Prefer to talk it through? '+PHONE_HTML,false);
    })
    .catch(err=>{
      restore();
      diag('fetch-failed',String((err&&err.message)||err));
      /* second route: a real cross-origin form POST. Its result is unreadable —
         a hidden iframe is opaque — so the copy below must not claim a delivery
         we have not observed. It says what is true: it went out, we can't
         confirm it landed, here is a phone number and a copy button. */
      if(formPostFallback()){
        finish('Sent — and here\'s a second way to reach us.',
          'Your answers are on their way. We can\'t confirm receipt from this screen, so if you haven\'t heard '+
          'from us within 24 hours, please don\'t wait on it — '+PHONE_HTML,true);
      }else{
        mailFallback();
      }
    });
});

/* ---------- boot ---------- */
observeView('home');
progress(1);
onScroll();
setTimeout(onScroll,60);
