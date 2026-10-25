import crypto from 'crypto';import {NextResponse} from 'next/server';import {guard,fail} from '@/lib/auth';
// Signed direct upload: browser -> Cloudinary (bypasses Vercel's 4.5MB limit). Whitelisted formats, our folders only.
export async function POST(r){const g=await guard(r);if(g)return g;const {CLOUDINARY_CLOUD_NAME:c,CLOUDINARY_API_KEY:k,CLOUDINARY_API_SECRET:s}=process.env;if(!c||!k||!s)return fail(500,'cloudinary');
const kind=(await r.json().catch(()=>({}))).kind==='video'?'video':'image';
const p={allowed_formats:kind==='video'?'mp4,webm,mov':'jpg,png,webp,avif',folder:'media-sharks/'+kind+'s',timestamp:Math.floor(Date.now()/1e3)};
const signature=crypto.createHash('sha1').update(Object.keys(p).sort().map(x=>`${x}=${p[x]}`).join('&')+s).digest('hex');
return NextResponse.json({...p,signature,api_key:k,cloud_name:c})}
