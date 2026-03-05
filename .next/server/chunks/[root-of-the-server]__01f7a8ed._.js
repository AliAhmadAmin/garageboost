module.exports=[98043,e=>{"use strict";var t=e.i(63021);let r=global.prisma||new t.PrismaClient({log:["error","warn"]});e.s(["prisma",0,r])},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},42315,(e,t,r)=>{"use strict";t.exports=e.r(18622)},47540,(e,t,r)=>{"use strict";t.exports=e.r(42315).vendored["react-rsc"].React},63021,(e,t,r)=>{t.exports=e.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},75601,e=>{"use strict";let t=()=>{let e=process.env.SESSION_SECRET;if(!e)throw Error("SESSION_SECRET is required in production");return e||"dev-session-secret"},r=()=>{if(globalThis.crypto?.subtle)return globalThis.crypto;throw Error("Web Crypto API is not available")},a=e=>("u">typeof Buffer?Buffer.from(e).toString("base64"):btoa(String.fromCharCode(...e))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),i=e=>{let t=e.replace(/-/g,"+").replace(/_/g,"/"),r=t.padEnd(t.length+(4-t.length%4)%4,"=");if("u">typeof Buffer)return new Uint8Array(Buffer.from(r,"base64"));let a=atob(r),i=new Uint8Array(a.length);for(let e=0;e<a.length;e+=1)i[e]=a.charCodeAt(e);return i},n=async(e,t)=>{let i=r(),n=await i.subtle.importKey("raw",new TextEncoder().encode(t),{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return a(new Uint8Array(await i.subtle.sign("HMAC",n,new TextEncoder().encode(e))))},o=async(e,t,a)=>{let n=r(),o=await n.subtle.importKey("raw",new TextEncoder().encode(a),{name:"HMAC",hash:"SHA-256"},!1,["verify"]);return n.subtle.verify("HMAC",o,i(t),new TextEncoder().encode(e))},s=async e=>{let r=t(),i=a(new TextEncoder().encode(JSON.stringify({alg:"HS256",typ:"JWT"}))),o=a(new TextEncoder().encode(JSON.stringify(e))),s=`${i}.${o}`,l=await n(s,r);return`${s}.${l}`},l=async e=>{if(!e)return null;let r=t(),a=e.split(".");if(3!==a.length)return null;let[n,s,l]=a,d=`${n}.${s}`;if(!await o(d,l,r))return null;try{let e=new TextDecoder().decode(i(s)),t=JSON.parse(e);if(!t.exp||t.exp<Math.floor(Date.now()/1e3)||!t.sub||!t.role)return null;return t}catch{return null}},d=async e=>{let t=(e.headers.get("cookie")||"").split(";").map(e=>e.trim()).filter(e=>e.startsWith("garage-session=")),r=t.length>0?t[t.length-1]:null;return l(r?r.slice(15):null)};e.s(["getSessionFromRequest",0,d,"isAdminRole",0,e=>"ADMIN"===e||"SUPER_ADMIN"===e||"PLATFORM_ADMIN"===e,"signSession",0,s])},57715,45202,e=>{"use strict";var t=e.i(89171),r=e.i(98043),a=e.i(75601);let i=e=>"GARAGE_OWNER"===e,n=e=>"GARAGE_STAFF"===e,o=e=>"OWNER"===e||"MANAGER"===e?"ALL":"ASSIGNED";e.s(["getAssignmentScope",0,o,"isGarageOwnerRole",0,i,"isGarageStaffRole",0,n],45202);let s=(e,r)=>({response:t.NextResponse.json({error:r},{status:e})}),l=async e=>{let t=await (0,a.getSessionFromRequest)(e);return t?{session:t}:s(401,"Unauthorized")},d=async(e,t)=>{if(!t)return s(400,"garageId is required");let o=await l(e);if("response"in o)return o;let{session:d}=o;if((0,a.isAdminRole)(d.role))return o;if(i(d.role))return await r.prisma.garage.findFirst({where:{id:t,ownerId:d.sub},select:{id:!0}})?o:s(403,"Forbidden");if(n(d.role)){let e=await r.prisma.staff.findFirst({where:{garageId:t,userId:d.sub,active:!0},select:{id:!0,accessRole:!0,garageId:!0}});return e?{session:d,staff:e}:s(403,"Forbidden")}return s(403,"Forbidden")},c=async(e,t)=>{let r=await d(e,t);return"response"in r||!r.staff?r:"ALL"!==o(r.staff.accessRole)?s(403,"Forbidden"):r},u=async(e,t)=>{if(!t)return s(400,"vehicleId is required");let a=await r.prisma.vehicle.findUnique({where:{id:t},select:{id:!0,garageId:!0}});return a?d(e,a.garageId):s(404,"Vehicle not found")},p=async(e,t)=>{if(!t)return s(400,"jobId is required");let a=await r.prisma.job.findUnique({where:{id:t},select:{id:!0,garageId:!0,assignedToId:!0}});if(!a)return s(404,"Job not found");let i=await d(e,a.garageId);return"response"in i?i:i.staff&&"ASSIGNED"===o(i.staff.accessRole)&&a.assignedToId!==i.staff.id?s(403,"Forbidden"):i},g=async(e,t)=>{if(!t)return s(400,"quoteId is required");let a=await r.prisma.quote.findUnique({where:{id:t},select:{id:!0,garageId:!0}});return a?d(e,a.garageId):s(404,"Quote not found")},f=async(e,t)=>{if(!t)return s(400,"invoiceId is required");let a=await r.prisma.invoice.findUnique({where:{id:t},select:{id:!0,job:{select:{garageId:!0}}}});return a&&a.job?.garageId?d(e,a.job.garageId):s(404,"Invoice not found")},h=async(e,t)=>{if(!t)return s(400,"bookingId is required");let a=await r.prisma.booking.findUnique({where:{id:t},select:{id:!0,garageId:!0,staffId:!0}});if(!a)return s(404,"Booking not found");let i=await d(e,a.garageId);return"response"in i?i:i.staff&&"ASSIGNED"===o(i.staff.accessRole)&&a.staffId!==i.staff.id?s(403,"Forbidden"):i};e.s(["requireBookingAccess",0,h,"requireGarageAccess",0,d,"requireGarageAdminAccess",0,c,"requireInvoiceAccess",0,f,"requireJobAccess",0,p,"requireQuoteAccess",0,g,"requireSession",0,l,"requireVehicleAccess",0,u],57715)},26683,e=>{"use strict";var t=e.i(89171),r=e.i(98043),a=e.i(75601);function i(e){return Buffer.from(e).toString("base64")}function n(e){return Buffer.from(e,"base64").toString("utf-8")}async function o(e){let i=await (0,a.getSessionFromRequest)(e);if(!i||!(0,a.isAdminRole)(i.role))return t.NextResponse.json({error:"Forbidden"},{status:403});try{let e=(await r.prisma.apiConfig.findMany({where:{isActive:!0}})).reduce((e,t)=>(e[t.key]={key:t.key,value:n(t.value),isActive:t.isActive},e),{});return e.REQUIRE_EMAIL_VERIFICATION||(e.REQUIRE_EMAIL_VERIFICATION={key:"REQUIRE_EMAIL_VERIFICATION",value:"false",isActive:!0}),t.NextResponse.json(e)}catch(e){return console.error("Failed to fetch API configs:",e),t.NextResponse.json({error:"Failed to fetch configuration"},{status:500})}}async function s(e){let n=await (0,a.getSessionFromRequest)(e);if(!n||!(0,a.isAdminRole)(n.role))return t.NextResponse.json({error:"Forbidden"},{status:403});try{let a=await e.json();for(let[e,t]of Object.entries(a))t.value&&await r.prisma.apiConfig.upsert({where:{key:e},update:{value:i(t.value),isActive:t.isActive,updatedAt:new Date},create:{key:e,value:i(t.value),isActive:!0}});return t.NextResponse.json({success:!0,message:"Configuration saved"})}catch(e){return console.error("Failed to save API configs:",e),t.NextResponse.json({error:"Failed to save configuration"},{status:500})}}async function l(e){try{let t=await r.prisma.apiConfig.findUnique({where:{key:e,isActive:!0}});if(!t){if("REQUIRE_EMAIL_VERIFICATION"===e)return"false";return null}return n(t.value)}catch(t){return console.error(`Failed to get API key ${e}:`,t),null}}e.s(["GET",()=>o,"POST",()=>s,"getApiKey",()=>l])},1952,e=>{"use strict";e.s(["formatUKDate",0,(e,t={day:"numeric",month:"short",year:"numeric"})=>{let r=e instanceof Date?e:new Date(e);return new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/London",...t}).format(r)}])},10902,e=>{"use strict";function t(e){if(!e)return"Vehicle";let t=[];if(e.make&&t.push(String(e.make)),e.typeApproval&&t.push(String(e.typeApproval)),e.model){let r=String(e.model).trim(),a=r.toLowerCase();r&&"unknown"!==a&&"n/a"!==a&&"na"!==a&&t.push(r)}return(e.variant&&t.push(String(e.variant)),t.length>0)?t.join(" "):e.engine?String(e.engine):e.registration?String(e.registration):e.vrm?String(e.vrm):"Vehicle"}e.s(["vehicleTitle",()=>t])},78061,e=>{"use strict";var t=e.i(1952),r=e.i(10902);let a=e=>`\xa3${(e/100).toFixed(2)}`,i=e=>(0,t.formatUKDate)(e,{year:"numeric",month:"short",day:"numeric"});function n(e){let t=e.garage||{name:"Garage Boost"},n=i(e.expiryDate),o=7>=Math.ceil((new Date(e.expiryDate).getTime()-new Date().getTime())/864e5),s=e.subtotalPence>0?Math.round(e.vatPence/e.subtotalPence*100):0,l=e.vatRate??s,d=e.items.map(e=>`
        <tr>
          <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:14px;">
            <div style="font-weight:600;">${e.name}</div>
            ${e.description?`<div style="font-size:12px; color:#6b7280;">${e.description}</div>`:""}
          </td>
          <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right; font-weight:500;">${a(e.totalPence)}</td>
        </tr>
      `).join("");return`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px 20px; }
          .vehicle-card { background: #f3f4f6; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 14px; }
          .vehicle-info { margin: 8px 0; }
          .label { font-weight: 600; color: #1f2937; }
          .value { color: #4b5563; }
          .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .cta-button:hover { background: #2563eb; }
          .contact-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .contact-section h3 { margin-top: 0; color: #1f2937; font-size: 14px; }
          .contact-item { margin: 10px 0; font-size: 13px; }
          .contact-item a { color: #3b82f6; text-decoration: none; }
          .quote-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .quote-table thead { background: #f3f4f6; }
          .quote-table th { text-align: left; padding: 12px 0; color: #1f2937; font-weight: 600; font-size: 12px; text-transform: uppercase; }
          .quote-total-row-main { background: #f3f4f6; }
          .quote-total-row-main td { padding: 12px 0; font-weight: 700; font-size: 16px; }
          .expiry-warning { background: #fef2f2; border-left: 4px solid #dc2626; padding: 12px; margin: 20px 0; border-radius: 4px; color: #991b1b; font-size: 13px; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 ${t.name}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Service Quote</p>
          </div>

          <div class="content">
            <p style="color: #4b5563; margin-bottom: 20px;">Hi ${e.customerName},</p>
            <p style="color: #4b5563; margin-bottom: 20px;">Here's your detailed quote. The quote is valid until <strong>${n}</strong>${o?" - it expires soon!":""}.</p>

            ${e.vehicle?.make?`
            <div class="vehicle-card">
              <div class="vehicle-info"><span class="label">Vehicle:</span> <span class="value">${(0,r.vehicleTitle)(e.vehicle)}</span></div>
              <div class="vehicle-info"><span class="label">Registration:</span> <span class="value">${e.vehicle.vrm||"N/A"}</span></div>
              ${e.vehicle.motExpiry?`<div class="vehicle-info"><span class="label">MOT Expires:</span> <span class="value">${i(e.vehicle.motExpiry)}</span></div>`:""}
            </div>
            `:""}

            <table class="quote-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${d}
              </tbody>
              <tfoot>
                <tr>
                  <td style="padding: 12px 0; text-align: right;">Subtotal:</td>
                  <td style="padding: 12px 0; text-align: right;">${a(e.subtotalPence)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; text-align: right;">VAT (${l}%):</td>
                  <td style="padding: 6px 0; text-align: right;">${a(e.vatPence)}</td>
                </tr>
                <tr class="quote-total-row-main">
                  <td style="padding: 12px 0; text-align: right; color: #0d9488;">Total:</td>
                  <td style="padding: 12px 0; text-align: right; color: #0d9488;">${a(e.totalPence)}</td>
                </tr>
              </tfoot>
            </table>

            ${o?`<div class="expiry-warning">⚠️ This quote expires on ${n}. Please confirm your acceptance soon.</div>`:""}

            <p style="text-align: center; margin: 30px 0 20px;">
              <a href="#" class="cta-button" style="color: #ffffff !important; text-decoration: none;">✓ Accept Quote</a>
            </p>

            <div class="contact-section">
              <h3>📞 Get in Touch</h3>
              ${t.phone?`<div class="contact-item"><strong>Phone:</strong> <a href="tel:${t.phone}">${t.phone}</a></div>`:""}
              ${t.email?`<div class="contact-item"><strong>Email:</strong> <a href="mailto:${t.email}">${t.email}</a></div>`:""}
              ${t.address?`<div class="contact-item"><strong>Address:</strong> ${t.address}${t.postcode?", "+t.postcode:""}</div>`:""}
              ${t.website?`<div class="contact-item"><strong>Website:</strong> <a href="${t.website}" target="_blank">${t.website}</a></div>`:""}
            </div>

            <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">If you have any questions or would like to discuss this quote further, please don't hesitate to contact us.</p>
          </div>

          <div class="footer">
            <p style="margin: 0;">This is an automated email from ${t.name}. Please review the quote details and contact us if you need any changes.</p>
            <p style="margin: 8px 0 0;">\xa9 ${new Date().getFullYear()} ${t.name}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `}e.s(["buildQuoteHtml",()=>n])},94270,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),i=e.i(59756),n=e.i(61916),o=e.i(74677),s=e.i(69741),l=e.i(16795),d=e.i(87718),c=e.i(95169),u=e.i(47587),p=e.i(66012),g=e.i(70101),f=e.i(26937),h=e.i(10372),m=e.i(93695);e.i(52474);var v=e.i(220),x=e.i(89171),b=e.i(98043),w=e.i(78061),y=e.i(26683),R=e.i(57715);async function A(e,t){try{let{id:r}=await t.params,a=await (0,R.requireQuoteAccess)(e,r);if("response"in a)return a.response;let i=await b.prisma.quote.findUnique({where:{id:r},include:{items:!0,garage:!0,vehicle:!0}});if(!i)return x.NextResponse.json({error:"Quote not found"},{status:404});await (0,y.getApiKey)("QUOTE_PDF_FOOTER"),await (0,y.getApiKey)("RESEND_FROM_NAME");let n=i.items.map(e=>({name:e.name,totalPence:e.totalPence,description:e.description??void 0})),o=(0,w.buildQuoteHtml)({quoteNumber:i.quoteNumber,customerName:i.customerName,customerEmail:i.customerEmail,subtotalPence:i.subtotalPence,vatRate:i.vatRate,vatPence:i.vatPence,totalPence:i.totalPence,expiryDate:i.expiryDate,items:n,garage:i.garage?{name:i.garage.name,phone:i.garage.phone??void 0,email:i.garage.email??void 0,address:i.garage.address??void 0,postcode:i.garage.postcode??void 0,website:i.garage.website??void 0}:void 0,vehicle:i.vehicle?{make:i.vehicle.make??void 0,model:i.vehicle.model??void 0,typeApproval:i.vehicle.typeApproval??void 0,vrm:i.vehicle.vrm??void 0,motExpiry:i.vehicle.motExpiry??void 0}:void 0}),s=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote ${i.quoteNumber}</title>
  <style>
    @media print {
      @page { margin: 0.5in; }
      body { margin: 0; }
    }
  </style>
</head>
<body>
  ${o}
  <script>
    window.onload = () => {
      window.print();
      setTimeout(() => window.close(), 100);
    };
  </script>
</body>
</html>`;return new x.NextResponse(s,{headers:{"Content-Type":"text/html"}})}catch(e){return console.error("Quote PDF error:",e),x.NextResponse.json({error:"Failed to generate PDF"},{status:500})}}e.s(["GET",()=>A],38310);var E=e.i(38310);let I=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/quotes/[id]/pdf/route",pathname:"/api/quotes/[id]/pdf",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/quotes/[id]/pdf/route.ts",nextConfigOutput:"",userland:E}),{workAsyncStorage:q,workUnitAsyncStorage:T,serverHooks:S}=I;function N(){return(0,a.patchFetch)({workAsyncStorage:q,workUnitAsyncStorage:T})}async function C(e,t,a){I.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let x="/api/quotes/[id]/pdf/route";x=x.replace(/\/index$/,"")||"/";let b=await I.prepare(e,t,{srcPage:x,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:w,params:y,nextConfig:R,parsedUrl:A,isDraftMode:E,prerenderManifest:q,routerServerContext:T,isOnDemandRevalidate:S,revalidateOnlyGenerated:N,resolvedPathname:C,clientReferenceManifest:P,serverActionsManifest:$}=b,k=(0,s.normalizeAppPath)(x),F=!!(q.dynamicRoutes[k]||q.routes[C]),O=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,A,!1):t.end("This page could not be found"),null);if(F&&!E){let e=!!q.routes[C],t=q.dynamicRoutes[k];if(t&&!1===t.fallback&&!e){if(R.experimental.adapterPath)return await O();throw new m.NoFallbackError}}let _=null;!F||I.isDev||E||(_="/index"===(_=C)?"/":_);let D=!0===I.isDev||!F,U=F&&!D;$&&P&&(0,o.setManifestsSingleton)({page:x,clientReferenceManifest:P,serverActionsManifest:$});let j=e.method||"GET",M=(0,n.getTracer)(),H=M.getActiveScopeSpan(),G={params:y,prerenderManifest:q,renderOpts:{experimental:{authInterrupts:!!R.experimental.authInterrupts},cacheComponents:!!R.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:R.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,i)=>I.onRequestError(e,t,a,i,T)},sharedContext:{buildId:w}},L=new l.NodeNextRequest(e),B=new l.NodeNextResponse(t),K=d.NextRequestAdapter.fromNodeNextRequest(L,(0,d.signalFromNodeResponse)(t));try{let o=async e=>I.handle(K,G).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${j} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${j} ${x}`)}),s=!!(0,i.getRequestMeta)(e,"minimalMode"),l=async i=>{var n,l;let d=async({previousCacheEntry:r})=>{try{if(!s&&S&&N&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await o(i);e.fetchMetrics=G.renderOpts.fetchMetrics;let l=G.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=G.renderOpts.collectedTags;if(!F)return await (0,p.sendResponse)(L,B,n,G.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(n.headers);d&&(t[h.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:G.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await I.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:S})},!1,T),t}},c=await I.handleResponse({req:e,nextConfig:R,cacheKey:_,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:q,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:N,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:s});if(!F)return null;if((null==c||null==(n=c.value)?void 0:n.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==c||null==(l=c.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",S?"REVALIDATED":c.isMiss?"MISS":c.isStale?"STALE":"HIT"),E&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,g.fromNodeOutgoingHttpHeaders)(c.value.headers);return s&&F||m.delete(h.NEXT_CACHE_TAGS_HEADER),!c.cacheControl||t.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,f.getCacheControlHeader)(c.cacheControl)),await (0,p.sendResponse)(L,B,new Response(c.value.body,{headers:m,status:c.value.status||200})),null};H?await l(H):await M.withPropagatedContext(e.headers,()=>M.trace(c.BaseServerSpan.handleRequest,{spanName:`${j} ${x}`,kind:n.SpanKind.SERVER,attributes:{"http.method":j,"http.target":e.url}},l))}catch(t){if(t instanceof m.NoFallbackError||await I.onRequestError(e,t,{routerKind:"App Router",routePath:k,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:S})},!1,T),F)throw t;return await (0,p.sendResponse)(L,B,new Response(null,{status:500})),null}}e.s(["handler",()=>C,"patchFetch",()=>N,"routeModule",()=>I,"serverHooks",()=>S,"workAsyncStorage",()=>q,"workUnitAsyncStorage",()=>T],94270)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__01f7a8ed._.js.map