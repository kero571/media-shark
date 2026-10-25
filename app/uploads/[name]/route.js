import fs from 'fs/promises';import path from 'path';import {UPLOAD_DIR} from '@/lib/content';
const T={png:'image/png',jpg:'image/jpeg',webp:'image/webp',avif:'image/avif',svg:'image/svg+xml',mp4:'video/mp4'};
export async function GET(_,{params}){const {name}=await params;if(!/^[a-f0-9]{16}\.(png|jpg|webp|avif|svg|mp4)$/.test(name))return new Response('Not found',{status:404});
try{const b=await fs.readFile(path.join(UPLOAD_DIR,name));return new Response(b,{headers:{'Content-Type':T[name.split('.')[1]],'Cache-Control':'public, max-age=31536000, immutable'}})}catch{return new Response('Not found',{status:404})}}
