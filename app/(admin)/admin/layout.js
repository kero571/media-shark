import '../../globals.css';
import {Cairo} from 'next/font/google';
const cairo=Cairo({subsets:['arabic','latin'],weight:['400','600','800'],display:'swap',variable:'--font-cairo'});
export const metadata={title:'لوحة تحكم Media Sharks',robots:{index:false,follow:false}};
export default function L({children}){return(<html lang="ar" dir="rtl" className={cairo.variable}><body>{children}</body></html>)}
