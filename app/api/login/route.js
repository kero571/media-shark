import {NextResponse} from 'next/server';import {adminAuth} from '@/lib/firebase';import {configured,sameOrigin,ip,fail,COOKIE,PROD,MAX_AGE} from '@/lib/auth';import {hit} from '@/lib/rate';
const opt={httpOnly:true,sameSite:'strict',secure:PROD,path:'/'};
const wait=()=>new Promise(x=>setTimeout(x,600));
export async function POST(r){if(!sameOrigin(r))return fail(403,'origin');if(!configured())return fail(500,'not-configured');
if(!hit('ip:'+ip(r),10,9e5))return NextResponse.json({ok:false,error:'rate'},{status:429,headers:{'Retry-After':'900'}});
const b=await r.json().catch(()=>({}));
// Firebase Auth verifies email+password (and applies its own brute-force protection)
const f=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:String(b.email||'').trim().slice(0,200),password:String(b.password||'').slice(0,256),returnSecureToken:true})});
const j=await f.json().catch(()=>({}));
if(!f.ok){await wait();return fail(String(j?.error?.message).includes('TOO_MANY')?429:401,'bad')}
try{const a=adminAuth(),dec=await a.verifyIdToken(j.idToken);if(dec.uid!==process.env.ADMIN_UID){await wait();return fail(401,'bad')}
const res=NextResponse.json({ok:true});res.cookies.set(COOKIE,await a.createSessionCookie(j.idToken,{expiresIn:MAX_AGE*1000}),{...opt,maxAge:MAX_AGE});return res}catch{return fail(500,'server')}}
export async function DELETE(r){if(!sameOrigin(r))return fail(403,'origin');const res=NextResponse.json({ok:true});res.cookies.set(COOKIE,'',{...opt,maxAge:0});
try{const a=adminAuth();await a.revokeRefreshTokens(process.env.ADMIN_UID)}catch{}return res}
