this.workbox=this.workbox||{},this.workbox.googleAnalytics=function(t,e,o,n,r,c,a,w,s){"use strict";try{self["workbox:google-analytics:6.0.2"]&&_()}catch(t){}const i="www.google-analytics.com",l="www.googletagmanager.com",u=/^\/(\w+\/)?collect/,m=t=>{const e=({url:t})=>t.hostname===i&&u.test(t.pathname),o=new s.NetworkOnly({plugins:[t]});return[new c.Route(e,o,"GET"),new c.Route(e,o,"POST")]},g=t=>{const e=new w.NetworkFirst({cacheName:t});return new c.Route((({url:t})=>t.hostname===i&&"/analytics.js"===t.pathname),e,"GET")},h=t=>{const e=new w.NetworkFirst({cacheName:t});return new c.Route((({url:t})=>t.hostname===l&&"/gtag/js"===t.pathname),e,"GET")},b=t=>{const e=new w.NetworkFirst({cacheName:t});return new c.Route((({url:t})=>t.hostname===l&&"/gtm.js"===t.pathname),e,"GET")};return t.initialize=(t={})=>{const n=o.cacheNames.getGoogleAnalyticsName(t.cacheName),r=new e.BackgroundSyncPlugin("workbox-google-analytics",{maxRetentionTime:2880,onSync:(c=t,async({queue:t})=>{let e;for(;e=await t.shiftRequest();){const{request:o,timestamp:n}=e,r=new URL(o.url);try{const t="POST"===o.method?new URLSearchParams(await o.clone().text()):r.searchParams,e=n-(Number(t.get("qt"))||0),a=Date.now()-e;if(t.set("qt",String(a)),c.parameterOverrides)for(const e of Object.keys(c.parameterOverrides)){const o=c.parameterOverrides[e];t.set(e,o)}"function"==typeof c.hitFilter&&c.hitFilter.call(null,t),await fetch(new Request(r.origin+r.pathname,{body:t.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(o){throw await t.unshiftRequest(e),o}}})});var c;const w=[b(n),g(n),h(n),...m(r)],s=new a.Router;for(const t of w)s.registerRoute(t);s.addFetchListener()},t}({},workbox.backgroundSync,workbox.core._private,workbox.core._private,workbox.core._private,workbox.routing,workbox.routing,workbox.strategies,workbox.strategies);
//# sourceMappingURL=workbox-offline-ga.prod.js.map
