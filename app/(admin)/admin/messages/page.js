import {redirect} from 'next/navigation';import {isAdmin} from '@/lib/auth';import Messages from './Messages';
export const dynamic='force-dynamic';
export default async function P(){if(!await isAdmin())redirect('/admin');return <Messages/>}
