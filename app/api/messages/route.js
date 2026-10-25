import {NextResponse} from 'next/server';import {guard,fail} from '@/lib/auth';import {db} from '@/lib/firebase';
export async function POST(r){const g=await guard(r);if(g)return g;const b=await r.json().catch(()=>({})),col=db().collection('messages');
try{if(b.action==='list'){const s=await col.orderBy('createdAt','desc').limit(300).get();return NextResponse.json({ok:true,items:s.docs.map(d=>({id:d.id,...d.data()}))})}
const id=String(b.id||'');if(!/^[A-Za-z0-9]{10,40}$/.test(id))return fail(400,'id');
if(b.action==='read'){await col.doc(id).update({read:true});return NextResponse.json({ok:true})}
if(b.action==='delete'){await col.doc(id).delete();return NextResponse.json({ok:true})}}catch{return fail(500,'server')}
return fail(400,'action')}
