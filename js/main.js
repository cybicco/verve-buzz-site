(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=$('header.nav'),prog=$('#prog');
function onS(){const y=scrollY;nav.classList.toggle('sc',y>30);const h=document.documentElement.scrollHeight-innerHeight;prog.style.width=(h>0?y/h*100:0)+'%';tl()}
addEventListener('scroll',onS,{passive:true});
$('.burger')?.addEventListener('click',()=>$('.nav ul').classList.toggle('open'));
// glow
const gl=$('#glow');if(gl&&!rm&&matchMedia('(hover:hover)').matches)addEventListener('mousemove',e=>{gl.style.left=e.clientX+'px';gl.style.top=e.clientY+'px'});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((el,i)=>{el.style.transitionDelay=(el.dataset.d||0)+'ms';io.observe(el)});
// split text
$$('.split').forEach(el=>{let inF=false;const out=el.innerHTML.split(/(<[^>]+>)/).map(p=>{if(p.startsWith('<')){if(/^<span class="fire"/.test(p))inF=true;else if(p==='</span>')inF=false;return /^<span class="fire"/.test(p)?'<span>':p}return p.split(' ').map(w=>w?'<span'+(inF?' class="fire"':'')+'>'+w+'</span>':'').join(' ')}).join('');el.innerHTML=out;$$('span',el).forEach((s,i)=>s.style.animationDelay=(.15+i*.06)+'s')});
// counters
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,to=+el.dataset.to,suf=el.dataset.s||'';if(rm){el.textContent=to+suf;return}let t0=null;(function f(t){t0=t0||t;const p=Math.min((t-t0)/1600,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f)})(performance.now())}),{threshold:.5});
$$('[data-to]').forEach(el=>cio.observe(el));
// tabs
$$('[data-tabs]').forEach(g=>{const bs=$$('button',g),ps=$$('.panel',g.parentElement);bs.forEach((b,i)=>b.onclick=()=>{bs.forEach(x=>x.classList.remove('on'));ps.forEach(x=>x.classList.remove('on'));b.classList.add('on');ps[i].classList.add('on')})});
// timeline
const tlEl=$('.tl');function tl(){if(!tlEl)return;const r=tlEl.getBoundingClientRect(),m=innerHeight*.55;const f=Math.max(0,Math.min(r.height,m-r.top));$('.fill',tlEl).style.height=f+'px';$$('.step',tlEl).forEach(s=>{s.classList.toggle('on',s.getBoundingClientRect().top<m)})}
// manifesto
const mfs=$$('.mfl');if(mfs.length){const mo=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('on',e.isIntersecting&&e.intersectionRatio>.6)),{threshold:[.6,1],rootMargin:'-20% 0px -20% 0px'});mfs.forEach(m=>mo.observe(m))}
// card spotlight + tilt
$$('.card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');if(!rm&&c.dataset.tilt!==undefined){c.style.transform='perspective(800px) rotateY('+((x/r.width-.5)*8)+'deg) rotateX('+(-(y/r.height-.5)*8)+'deg) translateY(-4px)'}});c.addEventListener('mouseleave',()=>c.style.transform='')});
// magnetic
if(!rm)$$('.btn.p').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.28)+'px)'});b.addEventListener('mouseleave',()=>b.style.transform='')});
// horizontal track
$$('.hs').forEach(h=>{const t=$('.htrack',h);$$('.arrows button',h.parentElement).forEach((b,i)=>b.onclick=()=>t.scrollBy({left:(i?1:-1)*Math.min(560,innerWidth*.8),behavior:'smooth'}));let d=0,sx=0,sl=0;t.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;d=1;sx=e.clientX;sl=t.scrollLeft;t.style.cursor='grabbing';t.style.scrollSnapType='none'});addEventListener('pointerup',()=>{if(d){d=0;t.style.cursor='';t.style.scrollSnapType=''}});addEventListener('pointermove',e=>{if(d)t.scrollLeft=sl-(e.clientX-sx)});});
// terminal
const tm=$('#term');if(tm){const lines=[['k','$ verve brief --brand "your-brand" --goal growth'],['','> mapping audience, competitors and channels...'],['gr','✓ brand blueprint drafted (48h)'],['','> building your box: strategy + creative + performance loop'],['gr','✓ fortnightly design + deploy loops scheduled'],['','> reporting: live dashboard, human review every cycle'],['k','$ scale || snooze']];let i=0,c=0,out='';function step(){if(i>=lines.length){setTimeout(()=>{i=0;c=0;out='';step()},4000);return}const [cl,tx]=lines[i];if(rm){tm.innerHTML=lines.map(l=>'<div class="'+l[0]+'">'+l[1]+'</div>').join('');return}c++;tm.innerHTML=out+'<div class="'+cl+'">'+tx.slice(0,c)+'<span class="cur"></span></div>';if(c>=tx.length){out+='<div class="'+cl+'">'+tx+'</div>';i++;c=0;setTimeout(step,380)}else setTimeout(step,22)}
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();step()}}).observe(tm)}
// embers
const cv=$('#embers');if(cv&&!rm){const x=cv.getContext('2d');let W,H,ps=[];function rs(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight}rs();addEventListener('resize',rs);const N=innerWidth<700?40:90;function mk(init){return{x:Math.random()*W,y:init?Math.random()*H:H+10,r:Math.random()*2.4+.4,v:Math.random()*.8+.25,dx:(Math.random()-.5)*.4,a:Math.random()*.8+.2,h:Math.random()*50+10,ph:Math.random()*6}}for(let i=0;i<N;i++)ps.push(mk(1));let vis=1;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);(function f(t){if(vis){x.clearRect(0,0,W,H);ps.forEach((p,i)=>{p.y-=p.v;p.x+=p.dx+Math.sin(t/900+p.ph)*.3;if(p.y<-10)ps[i]=mk();const g=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5);g.addColorStop(0,'hsla('+p.h+',100%,62%,'+p.a+')');g.addColorStop(1,'hsla('+p.h+',100%,50%,0)');x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,p.r*5,0,7);x.fill()})}requestAnimationFrame(f)})(0)}
// builder
const sel=new Set();$$('.opt').forEach(o=>o.onclick=()=>{o.classList.toggle('on');const v=o.dataset.v;o.classList.contains('on')?sel.add(v):sel.delete(v);const h=$('#needs');if(h)h.value=[...sel].join(', ')});
// prefill from query
const q=new URLSearchParams(location.search),pl=q.get('plan');if(pl&&$('#plan'))$('#plan').value=pl;
// lightbox
const lb=document.createElement('div');lb.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(5,3,9,.94);display:none;place-items:center;padding:24px;cursor:zoom-out';lb.innerHTML='<img style="max-height:92vh;max-width:94vw;border-radius:14px">';document.body.appendChild(lb);lb.onclick=()=>lb.style.display='none';addEventListener('keydown',e=>{if(e.key==='Escape')lb.style.display='none'});
$$('[data-zoom]').forEach(el=>el.addEventListener('click',()=>{lb.firstChild.src=el.dataset.zoom;lb.firstChild.alt=el.dataset.alt||'';lb.style.display='grid'}));
// work filter
$$('[data-filter] button').forEach(b=>b.onclick=()=>{$$('[data-filter] button').forEach(x=>x.classList.remove('on'));b.classList.add('on');const f=b.dataset.f;$$('.masonry .wk').forEach(w=>w.style.display=(f==='all'||w.dataset.c===f)?'':'none')});
// forms
$$('form.f').forEach(f=>f.addEventListener('submit',async e=>{e.preventDefault();const m=$('.msg',f),btn=$('button[type=submit]',f);m.className='msg';m.textContent='Sending...';btn.disabled=true;const d=Object.fromEntries(new FormData(f));d.page=location.pathname;try{const r=await fetch('/api/lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(d)});const j=await r.json().catch(()=>({}));if(r.ok){m.className='msg ok';m.textContent='Thank you. We will get back to you shortly.';f.reset();sel.clear();$$('.opt.on').forEach(o=>o.classList.remove('on'))}else{m.className='msg er';m.textContent=j.error||'Something went wrong. Please try again or email hello@verve.buzz.'}}catch(_){m.className='msg er';m.textContent='Network error. Please email hello@verve.buzz.'}btn.disabled=false}));
onS();
})();
