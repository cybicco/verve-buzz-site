const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json','cache-control':'no-store'}});
const clean=(v,n)=>String(v==null?'':v).replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n);
export async function onRequestPost({request,env}){
  let d;try{d=await request.json()}catch(_){return J({error:'Invalid request.'},400)}
  if(d.website)return J({ok:true});
  const name=clean(d.name,120),email=clean(d.email,160),phone=clean(d.phone,40),company=clean(d.company,160),plan=clean(d.plan,120),needs=clean(d.needs,1200),message=clean(d.message,3000),page=clean(d.page,80);
  if(name.length<2)return J({error:'Please enter your name.'},400);
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email))return J({error:'Please enter a valid email.'},400);
  if(phone&&!/^[0-9+()\-\s]{6,20}$/.test(phone))return J({error:'Please enter a valid phone number.'},400);
  if(!env.DB)return J({error:'Service unavailable. Please email hello@verve.buzz.'},503);
  const ip=request.headers.get('cf-connecting-ip')||'x';
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip+'|verve'));
  const ih=[...new Uint8Array(buf)].slice(0,8).map(x=>x.toString(16).padStart(2,'0')).join('');
  const since=Date.now()-3600e3;
  const c=await env.DB.prepare('SELECT COUNT(*) n FROM leads WHERE ip_hash=? AND created_ms>?').bind(ih,since).first();
  if(c&&c.n>=5)return J({error:'Too many requests. Please try again later.'},429);
  await env.DB.prepare('INSERT INTO leads(name,email,phone,company,plan,needs,message,page,ip_hash,created_ms) VALUES(?,?,?,?,?,?,?,?,?,?)').bind(name,email,phone,company,plan,needs,message,page,ih,Date.now()).run();
  return J({ok:true});
}
