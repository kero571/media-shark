import {isAdmin} from '@/lib/auth';import {getContent} from '@/lib/content';import Login from './Login';import Editor from './Editor';
export const dynamic='force-dynamic';
export default async function Admin(){if(!await isAdmin())return <Login/>;return <Editor initial={await getContent()}/>}
