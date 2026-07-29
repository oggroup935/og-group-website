/* OG OS — the site IS the app.
   Every datum rendered below is FICTIONAL: invented names, addresses, phones,
   prices and deals with Cleveland flavor. The persistent on-screen chip says
   so. Zero real leads, zero real people, zero internal economics. */
const $=q=>document.querySelector(q),$$=q=>[...document.querySelectorAll(q)];

/* ---- form relay: same activated FormSubmit inbox as the seller site, via
   the alias hash so the raw address never appears in this page's source. */
const OS_ENDPOINT='https://formsubmit.co/ajax/c46ef7933753685c01ab0f71af26c3b0';

/* ================= ENTRY ================= */
const entry=$('#entry'),os=$('#os');
$$('.en-lines .el').forEach((el,i)=>setTimeout(()=>el.classList.add('on'),500+i*900));
setTimeout(()=>{$('#enterBtn').classList.add('on');$('.en-aud').classList.add('on');},500+3*900);
function enterOS(){entry.classList.add('gone');os.classList.remove('hidden');
  setTimeout(()=>{entry.remove();},900);osGo(location.hash.replace('#','')||'deck');}
$('#enterBtn').addEventListener('click',enterOS);
addEventListener('wheel',function w(e){if(document.body.contains(entry)&&!entry.classList.contains('gone')&&e.deltaY>8){enterOS();removeEventListener('wheel',w);}},{passive:true});
addEventListener('keydown',e=>{if(e.key==='Enter'&&document.body.contains(entry)&&!entry.classList.contains('gone'))enterOS();});
if(location.hash&&document.getElementById('osv-'+location.hash.replace('#',''))){enterOS();}

/* ================= ROUTER ================= */
const SCREENS=['deck','leads','field','rehab','dialer','board','partner','about','faq'];
let fiMapBuilt=false;
function osGo(id){
  if(!SCREENS.includes(id))id='deck';
  $$('.os-view').forEach(v=>v.classList.remove('on'));
  $('#osv-'+id).classList.add('on');
  $$('#osSide .it').forEach(it=>it.classList.toggle('on',it.dataset.os===id));
  if(!osGo._silent)history.pushState({os:id},'','#'+id);
  const main=$('#osMain');if(main)main.scrollTop=0;
  if(id==='field'&&!fiMapBuilt)setTimeout(buildMap,60);
  if(id==='rehab'){const s=window.OS_SEL;
    if(s)$('#rehabAddr').textContent='Rehab AI \u00b7 '+s[4]+' ';
    setTimeout(runRehab,350);}
}
addEventListener('popstate',e=>{const id=(e.state&&e.state.os)||location.hash.replace('#','')||'deck';
  osGo._silent=true;osGo(id);osGo._silent=false;});
document.addEventListener('keydown',e=>{
  if((e.key==='Enter'||e.key===' ')&&e.target.dataset&&e.target.dataset.os){e.preventDefault();osGo(e.target.dataset.os);}});
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-os]');
  if(t&&t.dataset.os){osGo(t.dataset.os);}
});

/* ================= LIVE TICKER ================= */
const osLive=$('.os-live');let tick=0;
setInterval(()=>{tick++;
  const calls=118+Math.floor(tick/3)%9, convos=12+Math.floor(tick/8)%4;
  if(osLive)osLive.innerHTML='<i>●</i> LIVE · POOL 214 · CALLS TODAY '+calls+' · CONVOS '+convos;
  const dk=$('#dkCalls');if(dk)dk.textContent=calls;
},1500);

/* ================= LEADS CENTER ================= */
const LEADS=[
 ['86','Marcus Bell','4127 Maplecrest Ave, Cleveland 44109','hot','$142K'],
 ['83','Tanya Brooks','2731 Oakport Dr, Cleveland Hts 44118','hot','$168K'],
 ['79','Rita Kowalski','1093 Ashford Rd, Parma 44134','warm','$118K'],
 ['77','Dennis Okafor','2214 Birchwood Ct, Lakewood 44107','warm','$205K'],
 ['74','Gloria Stanton','886 Fernhill Dr, Euclid 44117','warm','$96K'],
 ['71','Ray Delgado','3340 Cobbler Ln, Garfield Hts 44125','warm','$130K'],
 ['68','June Marsh','512 Willow Bend Ave, Cleveland 44102','warm','$155K'],
 ['66','Walter Feld','7719 Larkspur St, Maple Hts 44137','warm','$88K'],
];
const rowsEl=$('#osRows');
if(rowsEl)rowsEl.innerHTML=LEADS.map(l=>
 '<div class="os-row"><div class="sc">'+l[0]+'</div><div><div class="nm">'+l[1]+
 '</div><div class="ad">'+l[2]+'</div></div><div class="tg '+l[3]+'">'+l[3].toUpperCase()+
 '</div><div class="pr">'+l[4]+'</div></div>').join('');

/* ================= FIELD INTEL MAP =================
   Real, draggable Cleveland map (OpenStreetMap tiles); the PINS are fictional
   properties at street-less approximate coordinates. */
const PINS=[
 [41.4470,-81.7220,'$142K',86,'4127 Maplecrest Ave','3 bd · 1,410 sqft · High equity'],
 [41.5060,-81.5560,'$168K',83,'2731 Oakport Dr','4 bd · 1,780 sqft · Estate'],
 [41.3880,-81.7290,'$118K',79,'1093 Ashford Rd','3 bd · 1,220 sqft · Tired landlord'],
 [41.4830,-81.7980,'$205K',77,'2214 Birchwood Ct','4 bd · 2,050 sqft · Relocation'],
 [41.5670,-81.5460,'$96K',74,'886 Fernhill Dr','2 bd · 980 sqft · Vacant'],
 [41.4170,-81.6050,'$130K',71,'3340 Cobbler Ln','3 bd · 1,350 sqft · High equity'],
 [41.4720,-81.7390,'$155K',68,'512 Willow Bend Ave','3 bd · 1,500 sqft · Probate'],
 [41.4150,-81.5610,'$88K',66,'7719 Larkspur St','2 bd · 910 sqft · As-is'],
 [41.4580,-81.6690,'$175K',73,'2908 Quarry View Rd','3 bd · 1,640 sqft · Downsizing'],
 [41.5230,-81.6010,'$122K',69,'1544 Bramble Ct','3 bd · 1,280 sqft · Vacant'],
];
function buildMap(){
  if(typeof L==='undefined'||!$('#fiMap'))return;
  fiMapBuilt=true;
  const m=L.map('fiMap',{scrollWheelZoom:true}).setView([41.4720,-81.6680],11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {maxZoom:18,attribution:'© OpenStreetMap'}).addTo(m);
  PINS.forEach(p=>{
    const ic=L.divIcon({className:'',html:'<div class="fi-pin">'+p[2]+'</div>',iconSize:[0,0]});
    L.marker([p[0],p[1]],{icon:ic}).addTo(m).on('click',()=>{
      $('#fiScore').textContent=p[3];
      $('#fiName').textContent=p[4]+'  (fictional)';
      $('#fiMeta').textContent=p[5];
      $('#fiCard').classList.add('on');
      window.OS_SEL=p;                       /* rehab screen follows the pin */
    });
  });
  m.on('click',()=>$('#fiCard').classList.remove('on'));
}

/* ================= REHAB AI ================= */
function runRehab(){
  $$('#osv-rehab .os-box').forEach((b,i)=>setTimeout(()=>b.classList.add('show'),400+i*450));
  $$('#osv-rehab .os-line').forEach((l,i)=>setTimeout(()=>l.classList.add('show'),700+i*420));
}
const rr=$('#rehabRun');
if(rr)rr.addEventListener('click',()=>{
  $$('#osv-rehab .os-box').forEach(b=>b.classList.remove('show'));
  $$('#osv-rehab .os-line').forEach(l=>l.classList.remove('show'));
  setTimeout(runRehab,150);
});

/* ================= POWER DIALER FLOOR ================= */
const PL=[
 ['Queued','Alma Reyes','Cleveland 44111'],
 ['Ringing','Chester Polk','Parma Hts 44130'],
 ['Talking · 1:42','Dora Whitfield','Euclid 44119'],
 ['Follow-up set','Gene Marsh','Lakewood 44107'],
 ['Qualified ✓','Tom Okada','Garfield Hts 44125'],
];
const plEl=$('#plRows');
if(plEl)plEl.innerHTML=PL.map((r,i)=>
 '<div class="os-row"><div class="sc" style="font-size:9px;">'+(i+1)+'</div><div><div class="nm">'+r[1]+
 '</div><div class="ad">'+r[2]+'</div></div><div class="tg '+(r[0].startsWith('Qual')?'hot':'warm')+'">'+r[0]+'</div></div>').join('');
let plT=0;
setInterval(()=>{plT++;const d=$('#plDialed'),re=$('#plReached');
  const v=$('#osv-dialer');if(!v||!v.classList.contains('on'))return;
  if(d)d.textContent=42+plT%6;if(re)re.textContent=7+Math.floor(plT/4)%3;
},1800);

/* ================= DEAL BOARD ================= */
const DEALS=[
 ['West Park pocket','3 bd · brick · roof 2019','MATCHED · 4 BUYERS',''],
 ['Garfield Hts double','2-unit · long-term tenants','RESERVED IN 3H','res'],
 ['Euclid corner lot','3 bd · needs cosmetics','NEW THIS WEEK',''],
];
const bd=$('#bdGrid');
if(bd)bd.innerHTML=DEALS.map(d=>
 '<div class="bd-card"><img src="__DVPHOTO__" alt=""><div class="bd-b"><div class="bd-t">'+d[0]+
 ' <span class="fict">(fictional)</span></div><div class="bd-m">'+d[1]+'</div><span class="bd-s '+d[3]+'">'+d[2]+'</span></div></div>').join('');

/* ================= FORMS (really delivered) =================
   Same honest logic as the seller site: read the relay's body; success:false
   means NOT delivered — never print a green lie. */
function osSend(btn,note,fields,subject){
  const data={};let missing=false;
  for(const k in fields){const v=(fields[k].value||'').trim();if(!v&&k!=='note'&&k!=='zip')missing=true;data[k]=v;}
  if(missing){note.textContent='Fill the fields first — name, phone, email.';note.classList.add('err');return;}
  if(data.email&&!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(data.email)){note.textContent='That email doesn\u2019t look right — check it and try again.';note.classList.add('err');return;}
  btn.disabled=true;btn.textContent='Sending…';note.textContent='';note.classList.remove('err');
  fetch(OS_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify(Object.assign({_subject:subject,_template:'table',_captcha:'false',
      source:'network site (OG OS demo)'},data))})
    .then(r=>r.text().then(t=>{let j=null;try{j=JSON.parse(t);}catch(_){}return {ok:r.ok,j};}))
    .then(res=>{
      const delivered=res.ok&&(!res.j||String(res.j.success)!=='false');
      if(!delivered)throw new Error('relay refused');
      note.textContent="Got it — it's with us. We'll come back to you within 24–48 hours.";
      btn.textContent='Sent ✓';
    })
    .catch(()=>{
      note.textContent="Couldn't confirm the send — call or text us at (216) 677-9031 and we'll take it from there.";
      note.classList.add('err');btn.disabled=false;btn.textContent='Try again →';
    });
}
const invBtn=$('#invSend');
if(invBtn)invBtn.addEventListener('click',()=>osSend(invBtn,$('#invNote'),
 {name:$('#inv_name'),phone:$('#inv_phone'),email:$('#inv_email'),zip:$('#inv_zip'),note:$('#inv_box')},
 'Investor network application — network site'));
const ptBtn=$('#ptSend');
if(ptBtn)ptBtn.addEventListener('click',()=>osSend(ptBtn,$('#ptNote'),
 {name:$('#pt_name'),phone:$('#pt_phone'),email:$('#pt_email'),role:$('#pt_role'),note:$('#pt_note')},
 'Partner Desk application — network site'));

/* ================= SEARCH ================= */
const osSearch=$('#osSearch');
if(osSearch){
  osSearch.addEventListener('focus',()=>{if(!$('#osv-leads').classList.contains('on'))osGo('leads');});
  osSearch.addEventListener('input',()=>{
    const q=osSearch.value.trim().toLowerCase();
    $$('#osRows .os-row').forEach(r=>{r.style.display=!q||r.textContent.toLowerCase().includes(q)?'flex':'none';});
  });
}

/* ================= FAQ ================= */
$$('.faqrow').forEach(r=>r.addEventListener('click',()=>r.classList.toggle('open')));
window.faqTab=(t,btn)=>{$$('.tabs button').forEach(b=>b.classList.remove('on'));btn.classList.add('on');
  ['inv','whl'].forEach(k=>{const el=$('#faq-'+k);if(el)el.style.display=k===t?'block':'none';});};
