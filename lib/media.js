// Cloudinary URL helpers (server + client). Local files (/videos, /images ...) pass through untouched.
export const isCl=s=>typeof s==='string'&&s.startsWith('https://res.cloudinary.com/');
export const videoSrc=s=>isCl(s)?s.replace('/video/upload/','/video/upload/f_auto,q_auto/'):s;
export const posterOf=(s,p)=>p||(isCl(s)?s.replace('/video/upload/','/video/upload/so_0,f_jpg,q_auto,w_540/').replace(/\.[a-z0-9]+$/i,'.jpg'):'');
export const imgW=(s,w)=>isCl(s)?s.replace('/upload/',`/upload/f_auto,q_auto,w_${w}/`):s;
export const imgH=(s,h)=>isCl(s)?s.replace('/upload/',`/upload/f_auto,q_auto,h_${h}/`):s;
