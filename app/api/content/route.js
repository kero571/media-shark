import {NextResponse} from 'next/server';import {revalidatePath} from 'next/cache';import {guard,fail} from '@/lib/auth';import {saveContent,getDefault} from '@/lib/content';import {validate} from '@/lib/validate';
export async function POST(r){const g=await guard(r);if(g)return g;if(+r.headers.get('content-length')>1e6)return fail(413,'size');
let d;try{d=JSON.parse(await r.text())}catch{return fail(400,'json')}
if(!validate(await getDefault(),d))return fail(400,'invalid');await saveContent(d);revalidatePath('/','layout');return NextResponse.json({ok:true})}
