import {NextResponse} from 'next/server';import fs from 'fs/promises';import path from 'path';import crypto from 'crypto';import {isAdmin} from '@/lib/auth';import {UPLOAD_DIR} from '@/lib/content';
const OK={'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/avif':'avif','image/svg+xml':'svg','video/mp4':'mp4'};
export async function POST(r){if(!await isAdmin())return NextResponse.json({ok:false},{status:401});
const f=(await r.formData()).get('file');const ext=f&&OK[f.type];if(!ext||f.size>25e6)return NextResponse.json({ok:false,error:'type/size'},{status:400});
const name=crypto.randomBytes(8).toString('hex')+'.'+ext;await fs.mkdir(UPLOAD_DIR,{recursive:true});await fs.writeFile(path.join(UPLOAD_DIR,name),Buffer.from(await f.arrayBuffer()));return NextResponse.json({ok:true,url:'/uploads/'+name})}
