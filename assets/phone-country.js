/* Beengo Study — выбор страны для телефона: все страны мира, названия на языке сайта, поиск.
   Сначала страны СНГ, потом остальные по алфавиту. Коды — по данным libphonenumber (Google).
   Поле кода внешне остаётся прежним (родной <select>), поверх него — кнопка, открывающая окно выбора. */
(()=>{
const RAW='AC247,AD376,AE971,AF93,AG1,AI1,AL355,AM374,AO244,AR54,AS1,AT43,AU61,AW297,AX358,AZ994,BA387,BB1,BD880,BE32,BF226,BG359,BH973,BI257,BJ229,BL590,BM1,BN673,BO591,BQ599,BR55,BS1,BT975,BW267,BY375,BZ501,CA1,CC61,CD243,CF236,CG242,CH41,CI225,CK682,CL56,CM237,CN86,CO57,CR506,CU53,CV238,CW599,CX61,CY357,CZ420,DE49,DJ253,DK45,DM1,DO1,DZ213,EC593,EE372,EG20,EH212,ER291,ES34,ET251,FI358,FJ679,FK500,FM691,FO298,FR33,GA241,GB44,GD1,GE995,GF594,GG44,GH233,GI350,GL299,GM220,GN224,GP590,GQ240,GR30,GT502,GU1,GW245,GY592,HK852,HN504,HR385,HT509,HU36,ID62,IE353,IL972,IM44,IN91,IO246,IQ964,IR98,IS354,IT39,JE44,JM1,JO962,JP81,KE254,KG996,KH855,KI686,KM269,KN1,KP850,KR82,KW965,KY1,KZ7,LA856,LB961,LC1,LI423,LK94,LR231,LS266,LT370,LU352,LV371,LY218,MA212,MC377,MD373,ME382,MF590,MG261,MH692,MK389,ML223,MM95,MN976,MO853,MP1,MQ596,MR222,MS1,MT356,MU230,MV960,MW265,MX52,MY60,MZ258,NA264,NC687,NE227,NF672,NG234,NI505,NL31,NO47,NP977,NR674,NU683,NZ64,OM968,PA507,PE51,PF689,PG675,PH63,PK92,PL48,PM508,PR1,PS970,PT351,PW680,PY595,QA974,RE262,RO40,RS381,RU7,RW250,SA966,SB677,SC248,SD249,SE46,SG65,SH290,SI386,SJ47,SK421,SL232,SM378,SN221,SO252,SR597,SS211,ST239,SV503,SX1,SY963,SZ268,TA290,TC1,TD235,TG228,TH66,TJ992,TK690,TL670,TM993,TN216,TO676,TR90,TT1,TV688,TW886,TZ255,UA380,UG256,US1,UY598,UZ998,VA39,VC1,VE58,VG1,VI1,VN84,VU678,WF681,WS685,XK383,YE967,YT262,ZA27,ZM260,ZW263';
const CIS=['RU','KZ','UZ','KG','BY','AZ','TJ','TM','AM','GE','MD','UA'];
// дополнительные слова для поиска (сокращения и привычные названия)
const ALIAS={RU:'рф russia',US:'сша америка соединенные штаты usa america',GB:'великобритания англия британия uk england britain',
  AE:'оаэ эмираты объединенные арабские эмираты uae emirates dubai дубай',KR:'южная корея korea',KP:'северная корея north korea',
  CN:'кнр china prc',KG:'киргизия kirgizia',BY:'белоруссия belorussia',TR:'турция turkiye',SA:'ksa',CZ:'чехия czech',
  CD:'конго демократическая drc',CG:'конго республика',CI:'берег слоновой кости ivory coast',MM:'бирма burma',NL:'голландия holland',
  DE:'германия germany',VN:'вьетнам vietnam',IR:'персия',SY:'сирия',EG:'египет',MA:'марокко',TZ:'танзания',ZA:'юар south africa',KZ:'qazaqstan'};
const C=RAW.split(',').map(x=>({iso:x.slice(0,2),code:'+'+x.slice(2)}));
const flag=iso=>String.fromCodePoint(...[...iso].map(ch=>0x1F1E6+ch.charCodeAt(0)-65));
const isoFromFlag=s=>{const m=[...(s||'')].map(ch=>ch.codePointAt(0)).filter(c=>c>=0x1F1E6&&c<=0x1F1FF);return m.length>=2?String.fromCharCode(m[0]-0x1F1E6+65,m[1]-0x1F1E6+65):null};
const lang=()=>((window.beengoLang&&window.beengoLang())||document.documentElement.lang)==='en'?'en':'ru';
const OWN={ru:{KG:'Кыргызстан',US:'США'},en:{}};
const dn={};const name=(iso,l)=>{if(OWN[l][iso])return OWN[l][iso];try{dn[l]=dn[l]||new Intl.DisplayNames([l],{type:'region'});return dn[l].of(iso)||iso}catch(e){return iso}};
const norm=s=>(s||'').toLowerCase().replace(/ё/g,'е').replace(/[’'`.,\-()&]/g,' ').replace(/\s+/g,' ').trim();
const T={ru:{ph:'Поиск: страна или код',cis:'СНГ',all:'Все страны',none:'Ничего не найдено',label:'Код страны',close:'Закрыть'},
         en:{ph:'Search: country or code',cis:'CIS',all:'All countries',none:'Nothing found',label:'Country code',close:'Close'}};
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---------- одно окно выбора на всю страницу
const box=document.createElement('div');box.className='cpk';box.hidden=true;
box.innerHTML='<div class="cpk-box" role="dialog" aria-modal="false"><div class="cpk-top"><svg class="cpk-s" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input class="cpk-q" type="search" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done"><button type="button" class="cpk-x"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><ul class="cpk-list" role="listbox"></ul></div>';
document.body.appendChild(box);
const pane=box.querySelector('.cpk-box'),q=box.querySelector('.cpk-q'),list=box.querySelector('.cpk-list'),xb=box.querySelector('.cpk-x');
let cur=null,act=-1,rows=[];

const render=()=>{const l=lang(),t=T[l],o=l==='en'?'ru':'en';const s=norm(q.value),dg=q.value.replace(/\D/g,'');
  const all=C.map(c=>({...c,n:name(c.iso,l)}));let html='';
  const row=(c)=>`<li role="option" data-iso="${c.iso}" aria-selected="${c.iso===cur.iso()}"><span class="cpk-f">${flag(c.iso)}</span><span class="cpk-n">${esc(c.n)}</span><span class="cpk-c">${c.code}</span></li>`;
  if(!s&&!dg){
    const cis=CIS.map(i=>all.find(x=>x.iso===i)).filter(Boolean),rest=all.filter(x=>!CIS.includes(x.iso)).sort((a,b)=>a.n.localeCompare(b.n,l));
    html=`<li class="cpk-h" role="presentation">${t.cis}</li>${cis.map(row).join('')}<li class="cpk-h" role="presentation">${t.all}</li>${rest.map(row).join('')}`;
  }else{
    const res=[];all.forEach(c=>{const n=norm(c.n),n2=norm(name(c.iso,o)),al=norm(ALIAS[c.iso]||''),cd=c.code.slice(1);let sc=99;
      if(s){if(n.startsWith(s)||c.iso.toLowerCase()===s)sc=0;else if((' '+n).includes(' '+s))sc=1;else if(n.includes(s))sc=2;
        else if(n2.startsWith(s)||(' '+al).includes(' '+s))sc=3;else if(n2.includes(s)||al.includes(s))sc=4}
      if(dg&&(!s||sc<99||/^\+?\d[\d\s]*$/.test(q.value.trim()))){if(cd===dg)sc=Math.min(sc,0);else if(cd.startsWith(dg))sc=Math.min(sc,1)}
      if(sc<99)res.push({c,sc})});
    res.sort((a,b)=>a.sc-b.sc||(CIS.includes(b.c.iso)-CIS.includes(a.c.iso))||a.c.n.localeCompare(b.c.n,l));
    html=res.length?res.map(r=>row(r.c)).join(''):`<li class="cpk-none" role="presentation">${t.none}</li>`;
  }
  list.innerHTML=html;rows=[...list.querySelectorAll('li[data-iso]')];
  setAct(s||dg?0:Math.max(0,rows.findIndex(li=>li.dataset.iso===cur.iso())),!(s||dg))};
const setAct=(i,center)=>{if(!rows.length){act=-1;return}act=(i+rows.length)%rows.length;rows.forEach((li,k)=>li.classList.toggle('act',k===act));
  const li=rows[act];if(center){list.scrollTop=Math.max(0,li.offsetTop-list.clientHeight/2+li.offsetHeight/2)}
  else if(li.offsetTop<list.scrollTop)list.scrollTop=li.offsetTop-36;else if(li.offsetTop+li.offsetHeight>list.scrollTop+list.clientHeight)list.scrollTop=li.offsetTop+li.offsetHeight-list.clientHeight};
const place=()=>{const mob=innerWidth<=680;box.classList.toggle('sheet',mob);if(mob){pane.style.cssText='';return}
  const r=cur.hit.getBoundingClientRect(),w=Math.min(360,innerWidth-24),h=Math.min(420,innerHeight-120);
  const below=innerHeight-r.bottom-12,up=below<Math.min(h,320)&&r.top>below;
  const left=Math.max(12,Math.min(r.left,innerWidth-w-12));const mh=Math.max(220,Math.min(h,up?r.top-100:below));
  pane.style.cssText=`left:${left}px;width:${w}px;max-height:${mh}px;`+(up?`bottom:${innerHeight-r.top+8}px;top:auto`:`top:${r.bottom+8}px;bottom:auto`)};
const openFor=(p)=>{cur=p;const t=T[lang()];q.value='';q.placeholder=t.ph;q.setAttribute('aria-label',t.ph);xb.setAttribute('aria-label',t.close);
  box.hidden=false;openedAt=Date.now();document.documentElement.classList.add('dd-on','cpk-on');place();render();
  requestAnimationFrame(()=>{box.classList.add('show');q.focus({preventScroll:true})})};
const close=(back)=>{if(box.hidden)return;box.classList.remove('show');box.hidden=true;document.documentElement.classList.remove('cpk-on');
  if(!document.querySelector('.dd.open'))document.documentElement.classList.remove('dd-on');if(back&&cur)cur.hit.focus({preventScroll:true})};
const choose=li=>{if(!li||!cur)return;cur.set(li.dataset.iso,true);close(false);const tel=cur.wrap.parentElement.querySelector('input[type=tel]');if(tel&&!tel.disabled)tel.focus({preventScroll:true})};

q.addEventListener('input',render);
q.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setAct(act+(e.key==='ArrowDown'?1:-1))}
  else if(e.key==='Enter'){e.preventDefault();choose(rows[act])}else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close(true)}});
list.addEventListener('click',e=>choose(e.target.closest('li[data-iso]')));
list.addEventListener('mousemove',e=>{const li=e.target.closest('li[data-iso]');if(li){const i=rows.indexOf(li);if(i!==act){act=i;rows.forEach((x,k)=>x.classList.toggle('act',k===act))}}});
xb.addEventListener('click',()=>close(true));
box.addEventListener('pointerdown',e=>{if(e.target===box)close(false)});
document.addEventListener('pointerdown',e=>{if(!box.hidden&&!pane.contains(e.target)&&!(cur&&cur.wrap.contains(e.target))&&e.target!==box)close(false)},true);
addEventListener('resize',()=>{if(!box.hidden)place()});
let openedAt=0;
addEventListener('scroll',e=>{const t=e.target;if(box.hidden||box.classList.contains('sheet')||Date.now()-openedAt<400)return;
  if(t===document||t===document.documentElement||t===document.scrollingElement||(t.classList&&t.classList.contains('modal')))close(false)},{passive:true,capture:true});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!box.hidden)close(true)});

// ---------- подключаем ко всем полям кода страны
const pickers=[];
document.querySelectorAll('select.tel-code,#dlCode').forEach(sel=>{
  const o0=sel.selectedOptions[0];let iso=(o0&&(o0.dataset.iso||isoFromFlag(o0.textContent)))||'RU';
  sel.innerHTML=C.map(c=>`<option value="${c.code}" data-iso="${c.iso}">${flag(c.iso)} ${c.code}</option>`).join('');
  const wrap=document.createElement('span');wrap.className='tel-pick';sel.parentNode.insertBefore(wrap,sel);wrap.appendChild(sel);
  const hit=document.createElement('button');hit.type='button';hit.className='tel-hit';hit.setAttribute('aria-haspopup','dialog');wrap.appendChild(hit);
  sel.tabIndex=-1;sel.setAttribute('aria-hidden','true');
  const p={wrap,hit,sel,iso:()=>iso,set:(i,user)=>{const o=[...sel.options].find(o=>o.dataset.iso===i);if(!o)return;iso=i;sel.value=o.value;o.selected=true;
    hit.setAttribute('aria-label',T[lang()].label+': '+name(i,lang())+' '+o.value);if(user)sel.dispatchEvent(new Event('change',{bubbles:true}))}};
  p.set(iso);hit.addEventListener('click',()=>box.hidden||cur!==p?openFor(p):close(true));
  hit.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();openFor(p)}});
  sel.addEventListener('mousedown',e=>{e.preventDefault();openFor(p)});
  pickers.push(p)});
window.beengoPhone={set:iso=>pickers.forEach(p=>p.set(iso))};
// смена языка сайта — обновляем подписи кнопок
new MutationObserver(()=>pickers.forEach(p=>p.set(p.iso()))).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
