import {SITE_URL as u} from '@/lib/content';
export default function sitemap(){const alt={languages:{ar:u+'/ar',en:u+'/en'}};return['ar','en'].map(l=>({url:`${u}/${l}`,lastModified:new Date(),changeFrequency:'weekly',priority:1,alternates:alt}))}
