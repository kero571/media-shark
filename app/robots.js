import {SITE_URL} from '@/lib/content';
const rule={allow:'/',disallow:['/admin','/api']};
export default function robots(){return{rules:[{userAgent:'*',...rule},{userAgent:['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','PerplexityBot','Google-Extended','Applebot-Extended'],...rule}],sitemap:SITE_URL+'/sitemap.xml',host:SITE_URL}}
