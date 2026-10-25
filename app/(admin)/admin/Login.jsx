'use client';
import {useState} from 'react';
const f='rounded-xl border border-gold/30 bg-bg px-4 py-3 outline-none focus:border-gold';
export default function Login(){const [err,setErr]=useState('');const [busy,setBusy]=useState(false);
async function go(e){e.preventDefault();setBusy(true);setErr('');const d=new FormData(e.currentTarget);const r=await fetch('/api/login',{method:'POST',body:JSON.stringify({email:d.get('email'),password:d.get('password')})});
if(r.ok)return location.reload();setBusy(false);setErr(r.status===429?'محاولات كثيرة. حاول بعد 15 دقيقة.':r.status===500?'لم يتم إعداد Firebase (راجع README)':'البريد أو كلمة المرور غير صحيحة')}
return(<main className="grid min-h-svh place-items-center p-5"><form onSubmit={go} className="panel grid w-full max-w-sm gap-4 p-6"><h1 className="gold-text text-2xl font-extrabold">لوحة التحكم</h1>
<input name="email" type="email" required autoFocus autoComplete="username" dir="ltr" placeholder="البريد الإلكتروني" className={f}/>
<input name="password" type="password" required autoComplete="current-password" dir="ltr" placeholder="كلمة المرور" className={f}/>
{err&&<p role="alert" className="text-sm text-red-400">{err}</p>}<button disabled={busy} className="btn gold-btn disabled:opacity-60">{busy?'...':'دخول'}</button></form></main>)}
