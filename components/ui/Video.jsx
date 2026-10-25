'use client';
import {useState} from 'react';
// <video> with a spinner while it starts/buffers. The parent must be `relative`.
export default function Video({className='',...p}){const [busy,setBusy]=useState(false);
return(<><video {...p} className={className} onPlay={()=>setBusy(true)} onWaiting={()=>setBusy(true)} onPlaying={()=>setBusy(false)} onCanPlay={()=>setBusy(false)} onPause={()=>setBusy(false)} onError={()=>setBusy(false)}/>{busy&&<span aria-hidden className="pointer-events-none absolute inset-0 m-auto h-10 w-10 animate-spin rounded-full border-[3px] border-white/25 border-t-gold"/>}</>)}
