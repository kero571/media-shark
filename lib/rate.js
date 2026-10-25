const m=new Map();
export function hit(key,max,win){const n=Date.now(),a=(m.get(key)||[]).filter(t=>n-t<win);if(a.length>=max){m.set(key,a);return false}a.push(n);m.set(key,a);if(m.size>5000)for(const [k,v] of m)if(!v.some(t=>n-t<win))m.delete(k);return true}
