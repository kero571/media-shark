'use client';
import {useState,useEffect,useCallback} from 'react';
const post=b=>fetch('/api/messages',{method:'POST',body:JSON.stringify(b)});
const wa=p=>{let d=p.replace(/\D/g,'');if(d.startsWith('00'))d=d.slice(2);else if(d.startsWith('0'))d='20'+d.slice(1);return 'https://wa.me/'+d};
export default function Messages(){const [items,setItems]=useState(null),[err,setErr]=useState('');
const load=useCallback(async()=>{setErr('');const r=await post({action:'list'});if(r.status===401)return location.assign('/admin');if(!r.ok)return setErr('فشل تحميل الرسائل');setItems((await r.json()).items)},[]);
useEffect(()=>{load()},[load]);
async function act(action,id){if(action==='delete'&&!confirm('حذف هذه الرسالة نهائيًا؟'))return;const r=await post({action,id});if(r.ok)setItems(a=>action==='delete'?a.filter(m=>m.id!==id):a.map(m=>m.id===id?{...m,read:true}:m));else setErr('فشلت العملية')}
const unread=items?items.filter(m=>!m.read).length:0;
return(<div className="mx-auto max-w-4xl p-4 pb-20"><header className="sticky top-0 z-10 -mx-4 mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 bg-bg/90 p-3 backdrop-blur"><h1 className="gold-text text-xl font-extrabold">الرسائل {unread>0&&<span className="gold-btn me-2 rounded-full px-2 py-0.5 text-xs">{unread} جديدة</span>}</h1><div className="flex gap-2 text-xs"><a href="/admin" className="chip">← التعديلات</a><button onClick={load} className="chip">تحديث</button></div></header>
{err&&<p role="alert" className="mb-3 text-sm text-red-400">{err}</p>}
{items===null?<p className="text-mute">جاري التحميل...</p>:items.length===0?<p className="panel p-6 text-center text-mute">لا توجد رسائل بعد</p>:<ul className="grid gap-3">{items.map(m=><li key={m.id} className={`panel p-4 ${m.read?'opacity-70':'!border-gold'}`}>
<div className="mb-2 flex flex-wrap items-center justify-between gap-2"><b className="text-gold2">{m.name}</b><span className="text-xs text-mute">{new Date(m.createdAt).toLocaleString('ar-EG')} · {m.lang==='en'?'EN':'AR'}</span></div>
<p className="text-sm" dir="ltr"><a href={'tel:'+m.phone} className="underline">{m.phone}</a></p>{m.sector&&<p className="mt-1 text-xs text-mute">{m.sector}</p>}
{m.message&&<p className="mt-3 whitespace-pre-wrap break-words rounded-lg bg-white/[.03] p-3 text-sm">{m.message}</p>}
<div className="mt-3 flex flex-wrap gap-2 text-xs"><a href={wa(m.phone)} target="_blank" rel="noopener noreferrer" className="chip">رد عبر واتساب</a>{!m.read&&<button onClick={()=>act('read',m.id)} className="chip">تحديد كمقروءة</button>}<button onClick={()=>act('delete',m.id)} className="chip !border-red-400/40 !text-red-400">حذف</button></div></li>)}</ul>}</div>)}
