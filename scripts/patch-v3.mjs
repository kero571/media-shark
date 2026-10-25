// Run once from the project root:  node scripts/patch-v3.mjs   (safe to re-run)
import fs from 'fs';
const p='data/content.default.json',c=JSON.parse(fs.readFileSync(p,'utf8')),B=(ar,en)=>({ar,en});
const s=c.studio;if('img' in s){s.media=s.img;delete s.img}s.media??='';s.cover??='';s.ratio??='16/9';s.fit??='cover';
c.events.items=c.events.items.map(x=>({title:x.title,cover:x.cover??x.img??'',ratio:x.ratio??'4/3',fit:x.fit??'cover',gallery:x.gallery??[]}));
if(c.services.groups[0]?.title?.en!=='Production')c.services.groups=[
{icon:'video',title:B('إنتاج فني','Production'),sub:B('تصوير وإنتاج بجودة سينمائية','Cinematic-quality shooting & production'),items:[B('تصوير الفيديو الإعلاني','Commercial video shooting'),B('تصوير الريلز والفيديوهات القصيرة','Reels & short-form video'),B('التصوير التجاري للمنتجات والخدمات','Commercial product & service photography'),B('تصوير وإنتاج البودكاست','Podcast recording & production')]},
{icon:'megaphone',title:B('تسويق إلكتروني','Digital Marketing'),sub:B('محتوى وحملات تحقق نتائج قابلة للقياس','Content & campaigns with measurable results'),items:[B('إدارة صفحات السوشيال ميديا','Social media page management'),B('صناعة المحتوى الإبداعي','Creative content creation'),B('كتابة المحتوى التسويقي','Marketing copywriting'),B('تصميم الجرافيك','Graphic design'),B('إدارة الحملات الإعلانية','Ad campaign management'),B('بناء البراند الشخصي','Personal brand building')]},
{icon:'mic',title:B('تغطية إعلامية','Media Coverage'),sub:B('حضور إعلامي احترافي للمؤتمرات والفعاليات','Professional media presence for conferences & events'),items:[B('التغطية الإعلامية للمؤتمرات والفعاليات','Media coverage of conferences & events'),B('تصوير وتوثيق المؤتمرات الطبية والعلمية','Filming & documenting medical and scientific conferences'),B('ريلز وملخصات ما بعد الفعالية','Post-event reels & highlights')]}];
fs.writeFileSync(p,JSON.stringify(c,null,1));console.log('content.default.json patched');
