import {SITE_URL} from '@/lib/content';
export function jsonLd(c,lang){const u=SITE_URL,t=v=>v?.[lang]??'';
return{'@context':'https://schema.org','@graph':[
{'@type':['ProfessionalService','LocalBusiness'],'@id':u+'/#org',name:'Media Sharks',alternateName:lang==='ar'?'ميديا شاركس':'Media Sharks Egypt',url:`${u}/${lang}`,logo:u+'/icon.png',image:u+'/og.jpg',telephone:'+'+c.contact.whatsapp,email:c.contact.email,slogan:t(c.brand.tagline),description:t(c.seo.description),foundingDate:'2024',priceRange:'$$',
founder:{'@type':'Person',name:t(c.about.founderName),jobTitle:t(c.about.role)},
address:{'@type':'PostalAddress',streetAddress:t(c.contact.address),addressLocality:t(c.contact.city),addressCountry:'EG'},areaServed:{'@type':'Country',name:'Egypt'},knowsLanguage:['ar','en'],
sameAs:c.contact.social.map(s=>s.url).filter(Boolean),
hasOfferCatalog:{'@type':'OfferCatalog',name:t(c.services.title),itemListElement:c.services.groups.flatMap(g=>g.items).map(i=>({'@type':'Offer',itemOffered:{'@type':'Service',name:t(i)}}))}},
{'@type':'WebSite','@id':u+'/#site',url:u,name:'Media Sharks',inLanguage:lang,publisher:{'@id':u+'/#org'}},
{'@type':'FAQPage',inLanguage:lang,mainEntity:c.faq.items.map(f=>({'@type':'Question',name:t(f.q),acceptedAnswer:{'@type':'Answer',text:t(f.a)}}))}]}}
