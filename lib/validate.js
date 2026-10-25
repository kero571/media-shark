const URLK=/^(img|photo|logo|poster|media|cover|href|url|src)$/;
const URL_OK=/^(\/(?![\/\\])|#|https?:\/\/|mailto:|tel:|$)/i;
const ENUM={ratio:['16/9','21/9','4/3','1/1','3/4','9/16'],fit:['cover','contain']};
// New content must have exactly the same shape as the default; URLs can't be javascript: etc.; enums are whitelisted.
export function validate(def,v,key=''){
if(Array.isArray(def)){if(!Array.isArray(v))return false;
 if(def.length===0)return v.length<=40&&v.every(x=>typeof x==='string'&&x.length>0&&x.length<2000&&URL_OK.test(x)); // gallery: list of uploaded file URLs
 return v.length>=1&&v.length<=60&&v.every(x=>validate(def[0],x,key))}
if(def&&typeof def==='object'){if(!v||typeof v!=='object'||Array.isArray(v))return false;const a=Object.keys(def),b=Object.keys(v);return a.length===b.length&&a.every(k=>Object.hasOwn(v,k)&&validate(def[k],v[k],k))}
if(typeof v!=='string'&&typeof v!=='number')return false;const s=String(v);if(s.length>6000)return false;
if(ENUM[key])return ENUM[key].includes(s);
return !(URLK.test(key)&&!URL_OK.test(s))}
