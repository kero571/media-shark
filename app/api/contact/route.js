import {NextResponse} from 'next/server';import {db,fbConfigured} from '@/lib/firebase';import {sameOrigin,ip,fail} from '@/lib/auth';import {hit} from '@/lib/rate';
const clean=(s,n)=>String(s??'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,'').trim().slice(0,n);
// Public endpoint: same-origin only, size/length limits, honeypot + too-fast check, per-IP limit. Stored as plain text (React escapes it on display).
export async function POST(r){if(!sameOrigin(r))return fail(403,'origin');if(+r.headers.get('content-length')>20000)return fail(413,'size');
if(!hit('c:'+ip(r),5,36e5))return fail(429,'rate');
const b=await r.json().catch(()=>null);if(!b||typeof b!=='object')return fail(400,'json');
if(b.website||!(Number(b.ms)>=1500))return NextResponse.json({ok:true}); // bots: pretend success, store nothing
const m={name:clean(b.name,100),phone:clean(b.phone,25),sector:clean(b.sector,100),message:clean(b.message,2000),lang:b.lang==='en'?'en':'ar'};
if(m.name.length<2||!/^\+?[\d][\d\s\-()]{5,23}$/.test(m.phone))return fail(400,'invalid');
if(!fbConfigured())return fail(500,'config');
await db().collection('messages').add({...m,read:false,createdAt:Date.now()});return NextResponse.json({ok:true})}
