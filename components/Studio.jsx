import Section from './ui/Section';import StudioCarousel from './StudioCarousel';import {videoSrc,posterOf,isCl} from '@/lib/media';
const isVid=u=>/\/video\/upload\//.test(u)||/\.(mp4|webm|mov)(\?|#|$)/i.test(u);
export default function Studio({c,lang}){const s=c.studio;
const items=(s.slides||[]).map(u=>{const vid=isVid(u);return{u,vid,lazy:isCl(u),src:vid?videoSrc(u):u,poster:vid?(posterOf(u,'')||''):''}});
return(<Section id="studio" tag={s.tag} title={s.title} lang={lang}><div className="panel overflow-hidden">
{items.length>0&&<StudioCarousel items={items} alt={s.imgAlt[lang]}/>}
<div className="p-5 text-center"><p className="font-display text-3xl gold-text md:text-4xl" dir="ltr">{s.brand}</p><p className="mt-1 text-sm font-semibold">{s.slogan[lang]} · <span className="text-gold2">{s.since[lang]}</span></p><ul className="mt-4 flex flex-wrap justify-center gap-2">{s.chips.map((x,i)=><li key={i} className="chip">{x[lang]}</li>)}</ul></div></div></Section>)}