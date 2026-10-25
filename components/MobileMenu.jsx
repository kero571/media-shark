'use client';
import {useState,useEffect} from 'react';
export default function MobileMenu({links,label}){const [o,setO]=useState(false);
useEffect(()=>{if(!o)return;const k=e=>e.key==='Escape'&&setO(false);addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[o]);
return(<div className="lg:hidden"><button type="button" aria-expanded={o} aria-controls="mnav" aria-label={label} onClick={()=>setO(!o)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 text-gold2"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">{o?<path d="M6 6l12 12M18 6L6 18"/>:<path d="M4 7h16M4 12h16M4 17h16"/>}</svg></button>
{o&&<nav id="mnav" aria-label={label} className="menu-in absolute inset-x-0 top-full max-h-[calc(100svh-var(--nav))] overflow-y-auto border-b border-gold/20 bg-bg p-3 shadow-2xl"><ul className="mx-auto grid max-w-md gap-1">{links.map(l=><li key={l.href}><a href={l.href} onClick={()=>setO(false)} className="block rounded-xl px-4 py-3 text-base font-bold hover:bg-white/5 hover:text-gold2">{l.label}</a></li>)}</ul></nav>}</div>)}
