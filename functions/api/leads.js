const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json','cache-control':'no-store'}});
function eq(a,b){if(a.length!==b.length)return false;let r=0;for(let i=0;i<a.length;i++)r|=a.charCodeAt(i)^b.charCodeAt(i);return r===0}
export async function onRequestGet({request,env}){
  const key=request.headers.get('x-leads-key')||'';
  if(!env.LEADS_KEY||!key||!eq(key,env.LEADS_KEY))return J({error:'Unauthorized'},401);
  const r=await env.DB.prepare('SELECT id,name,email,phone,company,plan,needs,message,page,created_ms FROM leads ORDER BY id DESC LIMIT 500').all();
  return J({leads:r.results||[]});
}
