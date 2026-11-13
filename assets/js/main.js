
(function(){
  var root=document.getElementById('sg');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,c){return (c||root).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||root).querySelectorAll(s))};

  /* ---------- данные (пример) ---------- */
  /* реестр на 15.10.2026; статусы и даты — примеры */
  var ZHK=[
    {id:'geroi',n:'Герои поколений',a:'ул. им. Землячки',ad:[['ул. им. Землячки',['84','84/1','84/2','84/3','84/4','84/5','84/6','84/7','84/8','84/9','84/10']]],f:17,s:4,ok:true,t:'готов к зиме',td:'сегодня без отключений'},
    {id:'novy',n:'Новый',a:'ул. Тракторостроителей',ad:[['ул. Тракторостроителей',['21','21/1','21/2','21/3','27','27/1','27/2','27/3','29','29/1']]],f:12,s:3,ok:true,t:'готов к зиме',td:'горячая вода: отключение 10:00–16:00',w:1,al:'Тракторостроителей, 27/2: нет горячей воды до 16:00'},
    {id:'semeyny',n:'Семейный',a:'пос. Стройдеталь · пр‑кт Университетский',ad:[['пос. Стройдеталь',['1','3','5','7','9']],['пр‑кт Университетский',['42','44','44а']]],f:9,s:3,ok:true,t:'готов к зиме',td:'сегодня без отключений'},
    {id:'severny',n:'Северный',a:'ул. им. Поддубного · Северный городок · Созидательская',ad:[['ул. им. Поддубного',['2','4']],['ул. Северный городок',['4']],['ул. Созидательская',['14']]],f:10,s:3,ok:true,t:'готов к зиме',td:'сегодня без отключений'},
    {id:'bereg',n:'Берег Волги',a:'ул. им. Степана Разина',ad:[['ул. им. Степана Разина',['25/1','25/2','27','27/1']]],f:16,s:2,ok:true,t:'готов к зиме',td:'лифт, Разина 27: ремонт до 18:00',w:1},
    {id:'zenit',n:'Зенит',a:'ул. Таращанцева',ad:[['ул. Таращанцева',['83','85']]],f:14,s:2,ok:false,t:'паспорт готовности в работе',td:'сегодня без отключений'},
    {id:'granat',n:'Гранат',a:'ул. Промышленная',ad:[['ул. Промышленная',['4','6']]],f:12,s:2,ok:true,t:'готов к зиме',td:'сегодня без отключений'},
    {id:'tarifnaya',n:'Тарифная',a:'ул. Тарифная',ad:[['ул. Тарифная',['15']]],f:10,s:2,ok:true,t:'готов к зиме',td:'сегодня без отключений'},
    {id:'gvard35',n:'на 35‑й Гвардейской',a:'ул. 35-й Гвардейской',ad:[['ул. 35-й Гвардейской',['19']]],f:9,s:2,ok:true,t:'готов к зиме',td:'сегодня без отключений'},
    {id:'atlasova',n:'Атласова',a:'ул. Атласова',ad:[['ул. Атласова',['12']]],f:10,s:2,ok:true,t:'готов к зиме',td:'сегодня без отключений'}
  ];
  ZHK.forEach(function(z){z.h=z.ad.reduce(function(s,x){return s+x[1].length},0)});
  var TOTAL=ZHK.reduce(function(s,z){return s+z.h},0),READY=ZHK.reduce(function(s,z){return s+(z.ok?z.h:0)},0);
  function hn(n){var m=n%10,h=n%100;return (m===1&&h!==11?'дом':(m>=2&&m<=4&&(h<10||h>=20))?'дома':'домов')}
  var EVENTS=[
    ['02.11','Северный','Встреча жителей с управляющим','severny',0],['09.11','Зенит','День открытых подвалов','zenit',1],
    ['16.11','Герои поколений','Осенняя ярмарка во дворе','geroi',2],['30.11','Берег Волги','Мастер-класс для детей','bereg',4],
    ['27.12','Все ЖК','Новогодний праздник во дворах','',8]
  ];
  function ringIcon(ok){return '<svg viewBox="0 0 100 100" fill="none"><path d="M58.8 88 A39 39 0 1 0 41.2 88" stroke="'+(ok?'var(--ok)':'var(--amber)')+'" stroke-width="'+(ok?22:16)+'"'+(ok?'':' stroke-dasharray="14 9"')+'/></svg>'}
  function facade(f,s,seed){
    var rows=Math.min(f,12),cols=s*2,x0=34,x1=166,y0=16,y1=134,cw=(x1-x0)/cols,rh=(y1-y0)/rows,out='';
    out+='<rect x="'+x0+'" y="'+y0+'" width="'+(x1-x0)+'" height="'+(y1-y0)+'" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="1.1"/>';
    out+='<line x1="'+(x0-6)+'" y1="'+y0+'" x2="'+(x1+6)+'" y2="'+y0+'" stroke="currentColor" stroke-opacity=".6" stroke-width="1.1"/>';
    for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){
      var lit=((r*7+c*13+seed*5)%5)<2;
      out+='<rect x="'+(x0+c*cw+cw*.24)+'" y="'+(y0+r*rh+rh*.22)+'" width="'+(cw*.52)+'" height="'+(rh*.56)+'" '+(lit?'class="l"':'fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width=".6"')+'/>';
    }
    out+='<line x1="8" y1="'+y1+'" x2="192" y2="'+y1+'" stroke="currentColor" stroke-opacity=".6" stroke-width="1.1"/>';
    return '<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMax meet" aria-hidden="true">'+out+'</svg>';
  }
  function pad(n){return String(n).padStart(2,'0')}
  var ARR='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12 12 4M5 4h7v7"/></svg>';
  var bento=$('#bento');
var PH={"geroi": "geroi", "novy": "novy", "semeyny": "semeyny", "severny": "severny", "bereg": "bereg", "zenit": "zenit", "granat": "granat", "tarifnaya": "tarifnaya", "gvard35": "gvard35", "atlasova": "atlasova"};
  function st(z){return z.w?'work':'ok'}
  bento.innerHTML=ZHK.map(function(z,i){
    var lbl=z.w?z.td:'без отключений',dot='<i class="dot'+(z.w?' w':'')+'"></i>';
    var sub=z.h+' '+hn(z.h)+' · '+z.a;
    var media=PH[z.id]?'<img alt="ЖК «'+z.n+'»" loading="lazy" decoding="async" src="zhk-photos/'+PH[z.id]+'-900.webp">':facade(z.f,z.s,i);
    return '<a class="tl" href="zhk.html?id='+z.id+'" data-s="'+st(z)+'" data-ok="'+(z.ok?1:0)+'"><div class="tl-ph">'+media+'<span class="tl-st">'+dot+'<span class="tx">'+lbl+'</span></span></div><div class="tl-bt"><h3>'+z.n+'</h3><p>'+sub+'</p><span class="tl-ar">'+ARR+'</span></div></a>';
  }).join('')+'<a class="tl all" href="#docs"><div class="tl-bt"><h3>Все дома по адресам</h3><p>Реестр на '+TOTAL+' '+hn(TOTAL)+': найдите свой адрес и документы дома</p><span class="tl-ar">'+ARR+'</span></div></a>';
  (function(){
    var dotsWrap=$('#bentoDots'),tlEls=bento.querySelectorAll('.tl');
    dotsWrap.innerHTML=Array.prototype.map.call(tlEls,function(){return '<i></i>'}).join('');
    var dotEls=dotsWrap.querySelectorAll('i');
    function syncBento(){
      var cw=bento.clientWidth;
      if(!cw)return;
      var center=bento.scrollLeft+cw/2,idx=0,best=1e9;
      tlEls.forEach(function(el,i){
        var c=el.offsetLeft+el.offsetWidth/2,d=Math.abs(c-center);
        if(d<best){best=d;idx=i}
        el.classList.toggle('snap-active',d<cw*.3);
      });
      dotEls.forEach(function(d,i){d.classList.toggle('on',i===idx)});
    }
    bento.addEventListener('scroll',syncBento,{passive:true});
    window.addEventListener('resize',syncBento);
    syncBento();
  })();
  $('#mq').innerHTML=(function(){var h=EVENTS.map(function(e,i){var ph=e[3]&&PH[e[3]];return '<a class="ev'+(ph?' ph':'')+'" href="event.html?id='+e[4]+'">'+(ph?'<img alt="" loading="lazy" decoding="async" src="zhk-photos/'+PH[e[3]]+'-600.webp">':'')+'<div class="tp"><span>'+e[1]+'</span>'+(i===0?'<em>ближайшее</em>':'')+'</div><div class="bt"><b>'+e[2]+'</b><div class="d mono-num">'+e[0]+'</div><span class="ev-ar"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12 12 4M5 4h7v7"/></svg></span></div></a>'}).join('');return h+h})();

  /* ---------- новости (подгружаются из news.json, редактируются через admin.html) ---------- */
  (function(){
    var M=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    function fd(s){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?(+m[3]+' '+M[+m[2]-1]+' '+m[1]):(s||'')}
    function esc(t){return String(t||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
    var ZN={geroi:'Герои поколений',novy:'Новый',semeyny:'Семейный',severny:'Северный',bereg:'Берег Волги',zenit:'Зенит',granat:'Гранат',tarifnaya:'Тарифная',gvard35:'На 35‑й Гвардейской',atlasova:'Атласова'};
    function tag(c){return ZN[c]||'Все ЖК'}
    var AR='<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 10 10 2M4 2h6v6"/></svg>';
    function render(list){
      var box=$('#nw');if(!box)return;
      if(!list||!list.length){box.outerHTML='<p class="nw-empty">Пока новостей нет.</p>';return}
      list=list.map(function(n,i){return Object.assign({},n,{id:i})}).sort(function(a,b){return (b.date||'')<(a.date||'')?-1:1}).slice(0,3);
      box.className='nw n'+list.length;
      box.innerHTML=list.map(function(n){return '<a href="news-item.html?id='+n.id+'"><div class="tp"><span class="dt">'+fd(n.date)+'</span><em class="tg">'+esc(tag(n.complex))+'</em></div><div class="tx"><h3>'+esc(n.title)+'</h3><p>'+esc(n.text)+'</p></div><span class="ar">'+AR+'</span></a>'}).join('');
    }
    fetch('news.json',{cache:'no-store'}).then(function(r){return r.ok?r.json():[]}).then(render).catch(function(){render([])});
  })();

  /* ---------- плашка отключений: показывается, только если есть тревога ---------- */
  var SHOW_ALERT=false; /* временно скрыто по просьбе клиента — чтобы вернуть, поставь true */
  var al=SHOW_ALERT&&ZHK.filter(function(z){return z.al})[0],alertEl=$('#alert');
  if(al){alertEl.hidden=false;root.classList.add('has-alert');
    alertEl.innerHTML='<b>ЖК «'+al.n+'»</b><span>'+al.al+'</span><a href="zhk.html?id='+al.id+'">Подробнее</a><button aria-label="Скрыть">×</button>';
    alertEl.querySelector('button').addEventListener('click',function(){alertEl.hidden=true;root.classList.remove('has-alert')});}


  /* ---------- линейка этажей ---------- */
  var lb=$('#lbls');for(var i=1;i<=16;i+=3){var sp=document.createElement('span');sp.className='lbl mono';sp.style.left=((i-1)/15*100)+'%';sp.textContent=String(i).padStart(2,'0');lb.appendChild(sp)}
  var fill=$('#fill'),flr=$('#flr')||{},tmp=$('#tmp')||{};
  var names=['дом работает','двор','кровля и фасад','подъезды','инженерия','подвал'];

  /* ---------- меню ---------- */
  var menu=$('#menu'),mb=$('#mbtn'),scrim=$('#menuScrim');
  function closeMenu(){menu.classList.remove('open');root.classList.remove('menu-open');scrim.classList.remove('show')}
  mb.addEventListener('click',function(){var isOpen=menu.classList.toggle('open');root.classList.toggle('menu-open',isOpen);scrim.classList.toggle('show',isOpen)});
  scrim.addEventListener('click',closeMenu);
  $$('a',menu).forEach(function(a){a.addEventListener('click',closeMenu)});

  /* ---------- заявка ---------- */
  var leadBtn=$('#leadBtn'),leadBtnMenu=$('#leadBtnMenu'),leadModal=$('#leadModal'),leadScrim=$('#leadScrim'),leadClose=$('#leadClose'),leadForm=$('#leadForm'),leadOk=$('#leadOk'),leadOkClose=$('#leadOkClose');
  var ZHKN={geroi:'Герои поколений',novy:'Новый',semeyny:'Семейный',severny:'Северный',bereg:'Берег Волги',zenit:'Зенит',granat:'Гранат',tarifnaya:'Тарифная',gvard35:'На 35‑й Гвардейской',atlasova:'Атласова'};
  function openLead(){
    leadScrim.classList.add('show');leadModal.classList.add('show');leadModal.setAttribute('aria-hidden','false');
    leadForm.hidden=false;leadOk.classList.remove('show');
    setTimeout(function(){$('#leadName').focus()},300);
  }
  function closeLead(){leadScrim.classList.remove('show');leadModal.classList.remove('show');leadModal.setAttribute('aria-hidden','true')}
  if(leadBtn){
    leadBtn.addEventListener('click',openLead);
    if(leadBtnMenu)leadBtnMenu.addEventListener('click',function(){closeMenu();openLead()});
    var leadBtnFoot=document.getElementById('leadBtnFoot');if(leadBtnFoot)leadBtnFoot.addEventListener('click',openLead);
    leadScrim.addEventListener('click',closeLead);
    leadClose.addEventListener('click',closeLead);
    leadOkClose.addEventListener('click',closeLead);
    addEventListener('keydown',function(e){if(e.key==='Escape'&&leadModal.classList.contains('show'))closeLead()});
    leadForm.addEventListener('submit',function(e){
      e.preventDefault();
      var name=$('#leadName').value.trim(),phone=$('#leadPhone').value.trim(),zhk=$('#leadZhk').value,msg=$('#leadMsg').value.trim();
      if(!phone){$('#leadPhone').focus();return}
      var lines=['Имя: '+(name||'—'),'Телефон: '+phone];
      if(zhk)lines.push('ЖК: '+(ZHKN[zhk]||zhk));
      if(msg)lines.push('Комментарий: '+msg);
      var subject=encodeURIComponent('Заявка с сайта'+(name?' — '+name:'')),body=encodeURIComponent(lines.join('\n'));
      location.href='mailto:info@sovgorod.example?subject='+subject+'&body='+body;
      leadForm.hidden=true;leadOk.classList.add('show');
    });
  }

  if(!window.gsap||!window.ScrollTrigger){return}
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ignoreMobileResize:true});

  ScrollTrigger.create({start:0,end:'max',onUpdate:function(s){
    var p=s.progress;fill.style.transform='scaleX('+p+')';root.classList.toggle('scrolled',s.scroll()>60);
    var f=1+Math.round(p*15);flr.textContent=String(f).padStart(2,'0');
  }});

  /* инверсия шапки и линейки над тёмными секциями */
  $$('[data-dark]').forEach(function(sec){
    if(sec.id==='about'){ /* светлые плашки заходят на фото: шапка и линейка меняют цвет по верху ряда плашек */
      var stEl=$('.stair');
      ScrollTrigger.create({trigger:sec,start:'top 40px',endTrigger:stEl,end:'top 100px',onToggle:function(t){root.classList.toggle('inv-top',t.isActive)}});
      ScrollTrigger.create({trigger:sec,start:function(){return 'top '+(innerHeight-16)+'px'},endTrigger:stEl,end:function(){return 'top '+(innerHeight-16)+'px'},onToggle:function(t){root.classList.toggle('inv-bot',t.isActive)}});
      return;
    }
    if(sec.id==='contacts'){ /* последняя секция: на конце страницы onToggle снимает класс, поэтому по прогрессу */
      ScrollTrigger.create({trigger:sec,start:'top 40px',end:'max',onUpdate:function(t){root.classList.toggle('inv-top',t.progress>0)}});
      ScrollTrigger.create({trigger:sec,start:function(){return 'top '+(innerHeight-16)+'px'},end:'max',onUpdate:function(t){root.classList.toggle('inv-bot',t.progress>0)}});
      return;
    }
    ScrollTrigger.create({trigger:sec,start:'top 40px',end:'bottom 40px',onToggle:function(s){root.classList.toggle('inv-top',s.isActive)}});
    ScrollTrigger.create({trigger:sec,start:function(){return 'top '+(innerHeight-16)+'px'},end:function(){return 'bottom '+(innerHeight-16)+'px'},onToggle:function(s){root.classList.toggle('inv-bot',s.isActive)}});
  });

  /* ---------- типографика: короткие слова не висят в конце строки, последняя строка не из одного слова ---------- */
  (function(){
    var N='\u00A0',re=/(?<=^|[\s(«„—–-])([A-Za-zА-Яа-яЁё]{1,3})\s+(?=\S)/g;
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode.nodeName;return /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p)||!n.nodeValue.trim()?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),list=[],n;
    while(n=w.nextNode())list.push(n);
    list.forEach(function(t){
      var v=t.nodeValue,o;
      do{o=v;v=v.replace(re,function(m,b){return b+N})}while(v!==o);
      t.nodeValue=v;
    });
    $$('p,h1,h2,h3,h4,.lead').forEach(function(el){
      if(el.children.length)return;
      el.textContent=el.textContent.replace(/\s+(\S{1,14}[.!?:;,]?)\s*$/,function(m,a){return N+a});
    });
  })();


  /* ---------- вход героя ---------- */
  if(!reduce){
    gsap.from('.hero .ln>span',{yPercent:112,duration:1.2,ease:'expo.out',stagger:.14,delay:.1,clearProps:'transform'});setTimeout(function(){gsap.set('.hero .ln>span',{clearProps:'all'})},2000);
    /* купол «заполняется» этаж за этажом: дом работает */
    gsap.from('.hero .dial,.hero .sub,.hero .stats',{opacity:0,y:24,duration:1,delay:.9,stagger:.12,ease:'power2.out',clearProps:'opacity,transform',onComplete:function(){gsap.set('.hero .dial,.hero .sub,.hero .stats',{clearProps:'all'})}});setTimeout(function(){gsap.set('.hero .dial,.hero .sub,.hero .stats',{clearProps:'all'})},2500);
    gsap.from('header.top',{opacity:0,y:-14,duration:.9,delay:.3,clearProps:'opacity,transform'});setTimeout(function(){gsap.set('header.top',{clearProps:'all'})},2000);
    $$('.rv').forEach(function(el){gsap.from(el,{y:46,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}})});
  }

  /* ---------- дом светлеет при скролле: светлый кадр проявляется снизу вверх, этаж за этажом ---------- */
  (function(){
    var house=$('#house');if(!house)return;
    function set(p){house.style.setProperty('--m',(p*135-30).toFixed(1)+'%')}
    if(reduce){set(1);return}
    set(0);var o={p:0};
    ScrollTrigger.create({trigger:house,start:'top 85%',end:'bottom 60%',onUpdate:function(t){gsap.to(o,{p:t.progress,duration:.7,ease:'power2.out',overwrite:true,onUpdate:function(){set(o.p)}})}});
  })();

  var mm=gsap.matchMedia();
  /* плашки поднимаются в один ряд и накрывают фото */
  mm.add('(min-width:901px)',function(){
    var pl=$$('.stair .st'),stairEl=$('.stair');if(!pl.length)return;
    if(reduce){gsap.set(pl,{y:0});if(stairEl)gsap.set(stairEl,{paddingBottom:0,'--pb':'0px'});return}
    var dl=Math.min(80,Math.max(30,innerWidth*0.05));
    gsap.fromTo(pl,{y:function(i){return i*dl}},{y:0,ease:'none',scrollTrigger:{trigger:'.stair',start:'top 98%',end:'top 28%',scrub:.6}});
    /* контейнер «сдувается» синхронно с карточками, чтобы следующая секция не наезжала на анимацию и не оставался пустой хвост */
    if(stairEl)gsap.fromTo(stairEl,{paddingBottom:dl*3,'--pb':dl*3+'px'},{paddingBottom:0,'--pb':'0px',ease:'none',scrollTrigger:{trigger:'.stair',start:'top 98%',end:'top 28%',scrub:.6}});
  });

  /* мобилка: держим заголовок/дом на экране, под ними карточки по очереди наезжают справа налево */
  mm.add('(max-width:900px)',function(){
    var sec=$('#about'),cont=$('.stair.stacked'),pl=$$('.stair.stacked .st');
    if(!sec||!cont||pl.length<2)return;
    /* заголовок/подзаголовок в запиненном блоке уже видны при старте пина — обычный reveal-скролл (.rv)
       иначе доигрывает уже во время пина и даёт заметный скачок на неподвижной картинке */
    var rv=sec.querySelectorAll('.rv');
    ScrollTrigger.getAll().forEach(function(t){
      for(var i=0;i<rv.length;i++){
        if(t.trigger===rv[i]){ if(t.animation)t.animation.kill(); t.kill(); break; }
      }
    });
    gsap.set(rv,{clearProps:'all'});
    if(reduce){gsap.set(pl,{xPercent:0});return}
    gsap.set(pl.slice(1),{xPercent:100});
    /* при скролле вниз держим карточку впритык к низу экрана (без пустого поля);
       при скролле вверх сдвигаем саму карточку (не дом и не заголовок) выше на ~90px,
       чтобы панель Safari не перекрывала её текст */
    var dir=0;
    function applyDir(d){
      if(d===dir)return;dir=d;
      gsap.to(cont,{y:d<0?-90:0,duration:.28,ease:'power2.out',overwrite:'auto'});
    }
    /* высота экрана при раскрытой панели Safari (самая маленькая): блок должен целиком в неё помещаться,
       иначе карточки уезжают под панель. Подгоняем высоту фото дома и привязываем старт пина к этой высоте */
    var svh=document.createElement('div');
    svh.style.cssText='position:fixed;left:0;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none';
    document.body.appendChild(svh);
    function smallH(){return Math.round(svh.getBoundingClientRect().height)||innerHeight}
    var hi=sec.querySelector('.house .hi');
    function fit(){
      if(!hi)return;
      hi.style.aspectRatio='';hi.style.height='';
      var over=sec.getBoundingClientRect().height-smallH();
      if(over>0){var nh=Math.max(150,Math.round(hi.getBoundingClientRect().height-over));hi.style.aspectRatio='auto';hi.style.height=nh+'px'}
    }
    fit();
    ScrollTrigger.addEventListener('refreshInit',fit);
    var tl=gsap.timeline({scrollTrigger:{trigger:cont,pin:sec,start:function(){return 'bottom '+smallH()+'px'},end:function(){return '+='+Math.round(cont.getBoundingClientRect().height*9.45)},scrub:.5,fastScrollEnd:true,anticipatePin:1,invalidateOnRefresh:true,onUpdate:function(self){applyDir(self.direction)}}});
    for(var i=1;i<pl.length;i++){tl.to(pl[i],{xPercent:0,ease:'none'})}
    return function(){ScrollTrigger.removeEventListener('refreshInit',fit);if(hi){hi.style.aspectRatio='';hi.style.height=''}svh.remove()};
  });

  /* ---------- сборка дома ---------- */
  var asm=$('#asm'),cds=$$('#cards .cd'),adin=$('#adin'),adial=$('#adial');
  var NM=['подвал','инженерия','подъезды','кровля и фасад','двор'];
  mm.add('(min-width:901px)',function(){
    if(reduce)return;
    asm.classList.remove('static');
    var hudOn=false,st={t:-1.15},P={},stp,Rc,Rr,cw,ch,cx0,y0;
    function layout(){
      var W=innerWidth,H=innerHeight;
      cw=Math.round(Math.min(W*.3,430));ch=Math.round(Math.max(290,Math.min(H*.42,400)));
      Rc=2000;stp=Math.asin((cw*1.1)/Rc)*180/Math.PI;
      y0=Math.round(H*.15+34);Rr=Rc+56+ch/2;
      asm.style.setProperty('--cw',cw+'px');asm.style.setProperty('--ch',ch+'px');
      adial.style.top=y0+'px';adin.style.top=Rr+'px';
      adin.innerHTML='';
      var n=Math.ceil(stp*5.3/.7);
      for(var k=-n;k<=Math.ceil(24/.7);k++){
        var ph=k*.7,long=(k%5===0);
        var t=document.createElement('i');t.className='tk'+(long?' l':'');
        t.style.cssText='top:-'+Rr+'px;height:'+(long?18:10)+'px;transform-origin:50% '+Rr+'px;transform:rotate('+ph+'deg)';
        adin.appendChild(t);
      }
      for(var i=0;i<5;i++){
        var l=document.createElement('span');l.className='tl mono';l.textContent=('0'+(i+1));
        var a=-i*stp;l.style.cssText='left:0;top:-'+(Rr-30)+'px;transform-origin:0 '+(Rr-30)+'px;transform:rotate('+a+'deg) translateX(-50%)';
        adin.appendChild(l);
      }
    }
    function render(){
      var W=innerWidth,cx=W/2,cyc=y0+56+ch/2+Rc;
      adin.style.transform='rotate('+(st.t*stp)+'deg)';
      var act=Math.round(st.t);
      cds.forEach(function(c,i){
        var th=(st.t-i)*stp,r=th*Math.PI/180;
        var x=cx+Rc*Math.sin(r),y=cyc-Rc*Math.cos(r);
        var d=Math.abs(st.t-i);
        c.style.transform='translate('+(x-cw/2)+'px,'+(y-ch/2)+'px) rotate('+th+'deg)';
        c.style.opacity=d>3.2?0:Math.max(.0,1-Math.max(0,d-.6)*.28);
        c.classList.toggle('on',i===act);
      });
      var a=Math.max(0,Math.min(4,act));if(hudOn)tmp.textContent=NM[a];
    }
    layout();render();
    var tw=gsap.to(st,{t:4.1,ease:'none',onUpdate:render,scrollTrigger:{trigger:'.asm-pin',start:'top top',end:function(){return '+='+innerHeight*3.4},pin:true,scrub:.6,anticipatePin:1,invalidateOnRefresh:true,onToggle:function(t){hudOn=t.isActive;if(!hudOn)tmp.textContent='дом работает';else render()},onRefresh:function(){layout();render()}}});
    return function(){tw.kill();asm.classList.add('static');cds.forEach(function(c){c.style.cssText=''});tmp.textContent='дом работает'};
  });
  mm.add('(max-width:900px)',function(){asm.classList.add('static')});

  /* мобилка/планшет: карточки сборки дома по очереди наезжают справа налево поверх друг друга,
     заголовок остаётся на месте — тот же приём, что и в блоке «ПРИНЦИП» */
  mm.add('(max-width:900px)',function(){
    var cardsWrap=$('#cards'),asmH2=asm.querySelector('h2');
    if(!cardsWrap||cds.length<2)return;
    var maxH=0;
    cds.forEach(function(c){maxH=Math.max(maxH,c.getBoundingClientRect().height)});
    cardsWrap.style.height=Math.ceil(maxH)+'px';
    if(reduce){gsap.set(cds,{xPercent:0});return function(){cardsWrap.style.height='';gsap.set(cds,{clearProps:'all'})}}
    gsap.set(cds.slice(1),{xPercent:100});
    /* подъём карточек при скролле вверх ограничен реальным зазором до заголовка,
       чтобы карточки не наезжали на «Отвечаем за дом целиком» (в отличие от блока
       «ПРИНЦИП», где над плашками есть фото — тут зазор намного меньше) */
    var liftAmt=90;
    if(asmH2){
      var gapAvail=cardsWrap.getBoundingClientRect().top-asmH2.getBoundingClientRect().bottom;
      liftAmt=Math.max(0,Math.min(90,gapAvail-6));
    }
    var dir=0;
    function applyDir(d){
      if(d===dir)return;dir=d;
      gsap.to(cardsWrap,{y:d<0?-liftAmt:0,duration:.28,ease:'power2.out',overwrite:'auto'});
    }
    var tl=gsap.timeline({scrollTrigger:{trigger:cardsWrap,pin:'#asm',start:'bottom bottom',end:function(){return '+='+Math.round(innerHeight*.62*(cds.length-1))},scrub:.5,fastScrollEnd:true,anticipatePin:1,invalidateOnRefresh:true,onUpdate:function(self){applyDir(self.direction)}}});
    for(var i=1;i<cds.length;i++){tl.to(cds[i],{xPercent:0,ease:'none'})}
    return function(){tl.kill();cardsWrap.style.height='';gsap.set(cds,{clearProps:'all'})};
  });

  /* ---------- 5/6 ---------- */
  window.addEventListener('load',function(){ScrollTrigger.refresh()});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ScrollTrigger.refresh()});
})();

/* экономия трафика: без автозапуска героя-видео */
(function(){var c=navigator.connection;if(!(c&&c.saveData))return;var v=document.querySelector('video');if(!v)return;v.removeAttribute('autoplay');v.pause();var s=v.querySelector('source');if(s)s.remove();v.load()})();

/* лента мероприятий: прокрутка пальцем, колесом и мышью + плавный автосдвиг по кругу */
(function(){
  var mq=document.getElementById('mq');if(!mq)return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pos=0,paused=false,idle=null,down=false,sx=0,sl=0,moved=0;
  function period(){return (mq.scrollWidth-(parseFloat(getComputedStyle(mq).paddingLeft)||0))/2}
  function wrap(){var P=period();if(!P)return;if(mq.scrollLeft>=P+1){mq.scrollLeft-=P}else if(mq.scrollLeft<=0&&down===false&&paused){mq.scrollLeft+=P}}
  function pause(){paused=true;clearTimeout(idle)}
  function resume(d){clearTimeout(idle);idle=setTimeout(function(){paused=false;pos=mq.scrollLeft},d||2500)}
  mq.addEventListener('scroll',function(){if(paused||down)pos=mq.scrollLeft;wrap()},{passive:true});
  mq.addEventListener('wheel',function(){pause();resume()},{passive:true});
  mq.addEventListener('touchstart',pause,{passive:true});
  mq.addEventListener('touchend',function(){resume(3500)},{passive:true});
  mq.addEventListener('mouseenter',pause);
  mq.addEventListener('mouseleave',function(){if(!down)resume(800)});
  mq.addEventListener('focusin',pause);
  mq.addEventListener('focusout',function(){resume()});
  mq.addEventListener('pointerdown',function(e){
    if(e.pointerType!=='mouse'||e.button!==0)return;
    down=true;moved=0;sx=e.clientX;sl=mq.scrollLeft;pause();mq.classList.add('drag');
    try{mq.setPointerCapture(e.pointerId)}catch(_){}
  });
  mq.addEventListener('pointermove',function(e){
    if(!down)return;var dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));mq.scrollLeft=sl-dx;
  });
  function up(){if(!down)return;down=false;mq.classList.remove('drag');wrap()}
  mq.addEventListener('pointerup',up);mq.addEventListener('pointercancel',up);
  mq.addEventListener('click',function(e){if(moved>5){e.preventDefault();e.stopPropagation();moved=0}},true);
  mq.addEventListener('dragstart',function(e){e.preventDefault()});
  if(reduce)return;
  var last=0;
  function tick(t){
    if(!paused&&!down&&!document.hidden){
      var dt=last?Math.min(t-last,50):16;
      pos+=dt*0.035;
      var P=period();if(P&&pos>=P+1)pos-=P;
      mq.scrollLeft=pos;
    }
    last=t;requestAnimationFrame(tick);
  }
  mq.scrollLeft=0;pos=0;
  requestAnimationFrame(tick);
})();
