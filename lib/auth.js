import {cookies} from 'next/headers';import {NextResponse} from 'next/server';import {adminAuth,fbConfigured} from '@/lib/firebase';import {hit} from '@/lib/rate';
export const PROD=process.env.NODE_ENV==='production';
export const COOKIE=PROD?'__Host-sid':'sid';
export const MAX_AGE=8*3600;
export const configured=()=>fbConfigured()&&!!process.env.FIREBASE_API_KEY&&!!process.env.ADMIN_UID;
// Firebase session cookie, re-checked against Firebase on every request (revoked sessions are rejected); only ADMIN_UID is allowed.
export async function isAdmin(){if(!configured())return false;const c=(await cookies()).get(COOKIE)?.value;if(!c)return false;try{const d=await adminAuth().verifySessionCookie(c,true);return d.uid===process.env.ADMIN_UID}catch{return false}}
export const ip=r=>(r.headers.get('x-forwarded-for')||'').split(',')[0].trim()||r.headers.get('x-real-ip')||'local';
export function sameOrigin(r){const o=r.headers.get('origin');if(!o)return false;try{const h=new URL(o).host;return h===r.headers.get('host')||h===r.headers.get('x-forwarded-host')}catch{return false}}
export const fail=(s,e)=>NextResponse.json({ok:false,error:e},{status:s});
export async function guard(r){if(!sameOrigin(r))return fail(403,'origin');if(!await isAdmin())return fail(401,'auth');if(!hit('w:'+ip(r),60,6e4))return fail(429,'rate');return null}
