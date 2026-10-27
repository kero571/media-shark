'use client';
import {useEffect,useRef,useState} from 'react';import Img from './ui/Img';
export default function StudioCarousel({items,alt}){
const tr=useRef(null),refs=useRef([]),dlg=useRef(null),[cur,setCur]=useState(0),[box,setBox]=useState(-1),n=items.length;
useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setCur(+e.target.dataset.i)),{root:tr.current,threshold:.6});refs.current.forEach(el=>el&&io.observe(el));return()=>io.disconnect()},[n]);
useEffect(()=>{const d=dlg.current;if(!d)return;if(box>=0&&!d.open)d.showModal();if(box<0&&d.open)d.close()},[box]);
const go=i=>refs.current[Math.max(0,Math.min(n-1,i))]?.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
const step=d=>setBox(b=>(b+d+n)%n);
const rtl=()=>document.documentElement.dir==='rtl';
const Ar=({d,side,dis,on})=><button type="button" aria-label={d} disabled={dis} onClick={on} className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/60 text-3xl leading-none text-white backdrop-blur transition hover:bg-black/80 disabled:opacity-0 md:grid ${side} rtl:-scale-x-100`}>{d==='prev'?'‹':'›'}</button>;
const L=items[box];
return(<div className="py-4">
<div className="relative">
<div ref={tr} className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[7%] py-1 [scrollbar-width:none] sm:px-[15%] lg:px-[21%] [&::-webkit-scrollbar]:hidden">
{items.map((m,i)=><div key={m.u+i} ref={el=>refs.current[i]=el} data-i={i} className={`relative aspect-[4/5] w-[86%] flex-none snap-center overflow-hidden rounded-2xl border border-white/10 bg-black transition-all duration-500 sm:aspect-[4/3] sm:w-[70%] lg:aspect-[16/10] lg:w-[58%] ${i===cur?'opacity-100':'scale-[.97] opacity-60'}`}>
{m.vid?<video src={m.src} poster={m.poster||undefined} muted playsInline preload="metadata" aria-hidden className="absolute inset-0 h-full w-full object-contain"/>:<>
<div aria-hidden className="absolute inset-0 scale-125 opacity-60 blur-2xl"><Img src={m.src} alt="" fill sizes="200px" className="object-cover"/></div>
<Img src={m.src} alt={`${alt} ${i+1}`} fill priority={i===0} sizes="(min-width:1024px) 700px,(min-width:640px) 70vw,86vw" className="object-contain"/></>}
<button type="button" aria-label={`${m.vid?'تشغيل / Play':'عرض / View'} ${i+1}`} onClick={()=>setBox(i)} className="group absolute inset-0 cursor-pointer">
{m.vid?<span aria-hidden className="absolute bottom-3 end-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-sm text-white transition group-hover:bg-gold group-hover:text-black">▶</span>
:<span aria-hidden className="absolute bottom-3 end-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white transition group-hover:bg-gold group-hover:text-black">⤢</span>}
</button></div>)}</div>
{n>1&&<><Ar d="prev" side="start-4" dis={cur===0} on={()=>go(cur-1)}/><Ar d="next" side="end-4" dis={cur===n-1} on={()=>go(cur+1)}/></>}
</div>
{n>1&&<div className="mt-4 flex items-center justify-center gap-4"><span dir="ltr" className="text-xs tabular-nums text-mute">{cur+1} / {n}</span>
<div className="flex gap-2">{items.map((_,i)=><button key={i} type="button" aria-label={`${i+1}/${n}`} onClick={()=>go(i)} className={`h-2 rounded-full transition-all duration-300 ${i===cur?'w-7 bg-gold':'w-2 bg-white/30'}`}/>)}</div></div>}
<dialog ref={dlg} onClose={()=>setBox(-1)} onKeyDown={e=>{if(e.key==='ArrowRight')step(rtl()?-1:1);if(e.key==='ArrowLeft')step(rtl()?1:-1)}} className="m-0 h-[100svh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/90">
{L&&<div className="relative grid h-full w-full place-items-center p-4 sm:p-10" onClick={e=>e.target===e.currentTarget&&setBox(-1)}>
{L.vid?<video key={box} src={L.src} poster={L.poster||undefined} controls autoPlay playsInline className="max-h-[88svh] max-w-full rounded-lg bg-black"/>
:<img key={box} src={L.src} alt={`${alt} ${box+1}`} className="max-h-[88svh] max-w-full rounded-lg object-contain"/>}
<button type="button" aria-label="Close" onClick={()=>setBox(-1)} className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30">×</button>
{n>1&&<><button type="button" aria-label="prev" onClick={()=>step(-1)} className="absolute start-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/30 rtl:-scale-x-100">‹</button>
<button type="button" aria-label="next" onClick={()=>step(1)} className="absolute end-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/30 rtl:-scale-x-100">›</button>
<span dir="ltr" className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">{box+1} / {n}</span></>}
</div>}</dialog></div>)}