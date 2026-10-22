(()=>{'use strict';
const story=document.querySelector('.motion-story');if(!story)return;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s);
const bike=$('.motion-story-bike'),halo=$('.motion-halo'),orbit=$('.motion-orbit'),meter=$('#motionStoryMeter');
const counter=$('#motionChapterCounter'),kicker=$('#motionKicker'),headline=$('#motionHeadline'),description=$('#motionDescription');
const chapters=[
{count:'01 / 03',kicker:'CAPÍTULO 01 — ENERGIA',headline:'NÃO SIGA<br><em>O FLUXO.</em>',description:'Cada movimento começa com uma decisão: escolher o seu próprio caminho.'},
{count:'02 / 03',kicker:'CAPÍTULO 02 — PRECISÃO',headline:'SINTA CADA<br><em>CURVA.</em>',description:'Uma nova perspectiva de mobilidade, em que design e movimento se encontram.'},
{count:'03 / 03',kicker:'CAPÍTULO 03 — LIBERDADE',headline:'VÁ ALÉM<br><em>DO ÓBVIO.</em>',description:'A próxima jornada não tem roteiro. Ela começa com você.'}
];
let frame=0,chapter=-1,lastP=-1;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function paint(){frame=0;const rect=story.getBoundingClientRect();const range=Math.max(1,story.offsetHeight-innerHeight);const p=clamp(-rect.top/range,0,1);if(Math.abs(p-lastP)<.001)return;lastP=p;
const current=Math.min(2,Math.floor(p*3));if(current!==chapter){chapter=current;const data=chapters[current];counter.textContent=data.count;kicker.textContent=data.kicker;headline.innerHTML=data.headline;description.textContent=data.description;}
if(meter)meter.style.transform=`scaleX(${p})`;
if(!reduced){const x=Math.sin(p*Math.PI*2)*35,rot=(p-.5)*16,scale=.8+p*.38;bike.style.transform=`translate(calc(-50% + ${x}px),-50%) scale(${scale}) rotate(${rot}deg)`;if(halo)halo.style.opacity=String(.15+.2*Math.sin(p*Math.PI));if(orbit)orbit.style.transform=`translate(-50%,-50%) rotateX(63deg) rotate(${p*180-30}deg)`;}
}
function schedule(){if(!frame)frame=requestAnimationFrame(paint)}
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});paint();
const interlude=$('.motion-interlude'),type=$('.motion-interlude-title');if(interlude&&type&&!reduced){let interludeFrame=0;const shift=()=>{interludeFrame=0;const r=interlude.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const progress=clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);type.style.transform=`translateX(${(progress-.5)*-9}%)`;};window.addEventListener('scroll',()=>{if(!interludeFrame)interludeFrame=requestAnimationFrame(shift)},{passive:true});shift();}
const cursor=$('#motionCursor');if(cursor&&!reduced&&matchMedia('(pointer:fine)').matches){let x=-150,y=-150,cx=x,cy=y,active=false;document.querySelectorAll('.machine-stage,.product-art,.motion-story').forEach(el=>{el.addEventListener('pointerenter',()=>{active=true;cursor.classList.add('is-active')});el.addEventListener('pointerleave',()=>{active=false;cursor.classList.remove('is-active')})});window.addEventListener('pointermove',e=>{x=e.clientX-44;y=e.clientY-44},{passive:true});function follow(){cx+=(x-cx)*.19;cy+=(y-cy)*.19;if(active)cursor.style.transform=`translate3d(${cx}px,${cy}px,0) scale(1)`;requestAnimationFrame(follow)}follow();}
if(!reduced&&matchMedia('(pointer:fine)').matches){document.querySelectorAll('.product').forEach(card=>{const art=card.querySelector('.product-art');if(!art)return;card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),rx=(e.clientY-r.top)/r.height-.5,ry=(e.clientX-r.left)/r.width-.5;art.style.transform=`perspective(900px) rotateX(${-rx*5}deg) rotateY(${ry*7}deg)`});card.addEventListener('pointerleave',()=>{art.style.transform=''})})}
})();