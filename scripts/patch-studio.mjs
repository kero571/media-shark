// Run once from the project root: node scripts/patch-studio.mjs
import fs from 'fs';
const p='data/content.default.json',c=JSON.parse(fs.readFileSync(p,'utf8')),s=c.studio;
if('img' in s){const o={};for(const [k,v] of Object.entries(s)){if(k==='img'){o.media=v;o.ratio='16/9';o.fit='cover'}else o[k]=v}c.studio=o;fs.writeFileSync(p,JSON.stringify(c,null,1));console.log('studio patched')}else console.log('already patched');
