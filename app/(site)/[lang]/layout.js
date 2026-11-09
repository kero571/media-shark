import '../../globals.css';
import {Cairo,Anton} from 'next/font/google';
import {getContent,SITE_URL} from '@/lib/content';
const cairo=Cairo({subsets:['arabic','latin'],weight:['400','600','800'],display:'swap',variable:'--font-cairo'});
const anton=Anton({subsets:['latin'],weight:'400',display:'swap',variable:'--font-anton'});
export async function generateMetadata({params}){const {lang}=await params;const c=await getContent();const t=v=>v[lang];
return{metadataBase:new URL(SITE_URL),title:t(c.seo.title),description:t(c.seo.description),keywords:t(c.seo.keywords).split(',').map(s=>s.trim()),applicationName:'Media Sharks',authors:[{name:t(c.about.founderName)}],
alternates:{canonical:'/'+lang,languages:{ar:'/ar',en:'/en','x-default':'/ar'}},
openGraph:{type:'website',url:'/'+lang,siteName:'Media Sharks',locale:lang==='ar'?'ar_EG':'en_US',alternateLocale:lang==='ar'?'en_US':'ar_EG',title:t(c.seo.title),description:t(c.seo.description),images:[{url:'/og.jpg',width:1200,height:630,alt:'Media Sharks'}]},
twitter:{card:'summary_large_image',title:t(c.seo.title),description:t(c.seo.description),images:['/og.jpg']},
robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}}}}
export const viewport={themeColor:'#060a12',width:'device-width',initialScale:1};
export default async function Layout({children,params}){const {lang}=await params;return(<html lang={lang} dir={lang==='ar'?'rtl':'ltr'} className={`${cairo.variable} ${anton.variable}`}><body>{children}</body></html>)}
