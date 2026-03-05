module.exports=[98043,e=>{"use strict";var t=e.i(63021);let r=global.prisma||new t.PrismaClient({log:["error","warn"]});e.s(["prisma",0,r])},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},42315,(e,t,r)=>{"use strict";t.exports=e.r(18622)},47540,(e,t,r)=>{"use strict";t.exports=e.r(42315).vendored["react-rsc"].React},63021,(e,t,r)=>{t.exports=e.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},75601,e=>{"use strict";let t=()=>{let e=process.env.SESSION_SECRET;if(!e)throw Error("SESSION_SECRET is required in production");return e||"dev-session-secret"},r=()=>{if(globalThis.crypto?.subtle)return globalThis.crypto;throw Error("Web Crypto API is not available")},i=e=>("u">typeof Buffer?Buffer.from(e).toString("base64"):btoa(String.fromCharCode(...e))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),n=e=>{let t=e.replace(/-/g,"+").replace(/_/g,"/"),r=t.padEnd(t.length+(4-t.length%4)%4,"=");if("u">typeof Buffer)return new Uint8Array(Buffer.from(r,"base64"));let i=atob(r),n=new Uint8Array(i.length);for(let e=0;e<i.length;e+=1)n[e]=i.charCodeAt(e);return n},a=async(e,t)=>{let n=r(),a=await n.subtle.importKey("raw",new TextEncoder().encode(t),{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return i(new Uint8Array(await n.subtle.sign("HMAC",a,new TextEncoder().encode(e))))},s=async(e,t,i)=>{let a=r(),s=await a.subtle.importKey("raw",new TextEncoder().encode(i),{name:"HMAC",hash:"SHA-256"},!1,["verify"]);return a.subtle.verify("HMAC",s,n(t),new TextEncoder().encode(e))},o=async e=>{let r=t(),n=i(new TextEncoder().encode(JSON.stringify({alg:"HS256",typ:"JWT"}))),s=i(new TextEncoder().encode(JSON.stringify(e))),o=`${n}.${s}`,l=await a(o,r);return`${o}.${l}`},l=async e=>{if(!e)return null;let r=t(),i=e.split(".");if(3!==i.length)return null;let[a,o,l]=i,d=`${a}.${o}`;if(!await s(d,l,r))return null;try{let e=new TextDecoder().decode(n(o)),t=JSON.parse(e);if(!t.exp||t.exp<Math.floor(Date.now()/1e3)||!t.sub||!t.role)return null;return t}catch{return null}},d=async e=>{let t=(e.headers.get("cookie")||"").split(";").map(e=>e.trim()).filter(e=>e.startsWith("garage-session=")),r=t.length>0?t[t.length-1]:null;return l(r?r.slice(15):null)};e.s(["getSessionFromRequest",0,d,"isAdminRole",0,e=>"ADMIN"===e||"SUPER_ADMIN"===e||"PLATFORM_ADMIN"===e,"signSession",0,o])},57715,45202,e=>{"use strict";var t=e.i(89171),r=e.i(98043),i=e.i(75601);let n=e=>"GARAGE_OWNER"===e,a=e=>"GARAGE_STAFF"===e,s=e=>"OWNER"===e||"MANAGER"===e?"ALL":"ASSIGNED";e.s(["getAssignmentScope",0,s,"isGarageOwnerRole",0,n,"isGarageStaffRole",0,a],45202);let o=(e,r)=>({response:t.NextResponse.json({error:r},{status:e})}),l=async e=>{let t=await (0,i.getSessionFromRequest)(e);return t?{session:t}:o(401,"Unauthorized")},d=async(e,t)=>{if(!t)return o(400,"garageId is required");let s=await l(e);if("response"in s)return s;let{session:d}=s;if((0,i.isAdminRole)(d.role))return s;if(n(d.role))return await r.prisma.garage.findFirst({where:{id:t,ownerId:d.sub},select:{id:!0}})?s:o(403,"Forbidden");if(a(d.role)){let e=await r.prisma.staff.findFirst({where:{garageId:t,userId:d.sub,active:!0},select:{id:!0,accessRole:!0,garageId:!0}});return e?{session:d,staff:e}:o(403,"Forbidden")}return o(403,"Forbidden")},c=async(e,t)=>{let r=await d(e,t);return"response"in r||!r.staff?r:"ALL"!==s(r.staff.accessRole)?o(403,"Forbidden"):r},u=async(e,t)=>{if(!t)return o(400,"vehicleId is required");let i=await r.prisma.vehicle.findUnique({where:{id:t},select:{id:!0,garageId:!0}});return i?d(e,i.garageId):o(404,"Vehicle not found")},p=async(e,t)=>{if(!t)return o(400,"jobId is required");let i=await r.prisma.job.findUnique({where:{id:t},select:{id:!0,garageId:!0,assignedToId:!0}});if(!i)return o(404,"Job not found");let n=await d(e,i.garageId);return"response"in n?n:n.staff&&"ASSIGNED"===s(n.staff.accessRole)&&i.assignedToId!==n.staff.id?o(403,"Forbidden"):n},h=async(e,t)=>{if(!t)return o(400,"quoteId is required");let i=await r.prisma.quote.findUnique({where:{id:t},select:{id:!0,garageId:!0}});return i?d(e,i.garageId):o(404,"Quote not found")},g=async(e,t)=>{if(!t)return o(400,"invoiceId is required");let i=await r.prisma.invoice.findUnique({where:{id:t},select:{id:!0,job:{select:{garageId:!0}}}});return i&&i.job?.garageId?d(e,i.job.garageId):o(404,"Invoice not found")},f=async(e,t)=>{if(!t)return o(400,"bookingId is required");let i=await r.prisma.booking.findUnique({where:{id:t},select:{id:!0,garageId:!0,staffId:!0}});if(!i)return o(404,"Booking not found");let n=await d(e,i.garageId);return"response"in n?n:n.staff&&"ASSIGNED"===s(n.staff.accessRole)&&i.staffId!==n.staff.id?o(403,"Forbidden"):n};e.s(["requireBookingAccess",0,f,"requireGarageAccess",0,d,"requireGarageAdminAccess",0,c,"requireInvoiceAccess",0,g,"requireJobAccess",0,p,"requireQuoteAccess",0,h,"requireSession",0,l,"requireVehicleAccess",0,u],57715)},26683,e=>{"use strict";var t=e.i(89171),r=e.i(98043),i=e.i(75601);function n(e){return Buffer.from(e).toString("base64")}function a(e){return Buffer.from(e,"base64").toString("utf-8")}async function s(e){let n=await (0,i.getSessionFromRequest)(e);if(!n||!(0,i.isAdminRole)(n.role))return t.NextResponse.json({error:"Forbidden"},{status:403});try{let e=(await r.prisma.apiConfig.findMany({where:{isActive:!0}})).reduce((e,t)=>(e[t.key]={key:t.key,value:a(t.value),isActive:t.isActive},e),{});return e.REQUIRE_EMAIL_VERIFICATION||(e.REQUIRE_EMAIL_VERIFICATION={key:"REQUIRE_EMAIL_VERIFICATION",value:"false",isActive:!0}),t.NextResponse.json(e)}catch(e){return console.error("Failed to fetch API configs:",e),t.NextResponse.json({error:"Failed to fetch configuration"},{status:500})}}async function o(e){let a=await (0,i.getSessionFromRequest)(e);if(!a||!(0,i.isAdminRole)(a.role))return t.NextResponse.json({error:"Forbidden"},{status:403});try{let i=await e.json();for(let[e,t]of Object.entries(i))t.value&&await r.prisma.apiConfig.upsert({where:{key:e},update:{value:n(t.value),isActive:t.isActive,updatedAt:new Date},create:{key:e,value:n(t.value),isActive:!0}});return t.NextResponse.json({success:!0,message:"Configuration saved"})}catch(e){return console.error("Failed to save API configs:",e),t.NextResponse.json({error:"Failed to save configuration"},{status:500})}}async function l(e){try{let t=await r.prisma.apiConfig.findUnique({where:{key:e,isActive:!0}});if(!t){if("REQUIRE_EMAIL_VERIFICATION"===e)return"false";return null}return a(t.value)}catch(t){return console.error(`Failed to get API key ${e}:`,t),null}}e.s(["GET",()=>s,"POST",()=>o,"getApiKey",()=>l])},46245,e=>{"use strict";var t=Object.defineProperty,r=Object.defineProperties,i=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(e,r,i)=>r in e?t(e,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[r]=i,l=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&o(e,r,t[r]);if(n)for(var r of n(t))s.call(t,r)&&o(e,r,t[r]);return e},d=(e,t,r)=>new Promise((i,n)=>{var a=e=>{try{o(r.next(e))}catch(e){n(e)}},s=e=>{try{o(r.throw(e))}catch(e){n(e)}},o=e=>e.done?i(e.value):Promise.resolve(e.value).then(a,s);o((r=r.apply(e,t)).next())}),c=class{constructor(e){this.resend=e}create(e){return d(this,arguments,function*(e,t={}){return yield this.resend.post("/api-keys",e,t)})}list(){return d(this,null,function*(){return yield this.resend.get("/api-keys")})}remove(e){return d(this,null,function*(){return yield this.resend.delete(`/api-keys/${e}`)})}},u=class{constructor(e){this.resend=e}create(e){return d(this,arguments,function*(e,t={}){return yield this.resend.post("/audiences",e,t)})}list(){return d(this,null,function*(){return yield this.resend.get("/audiences")})}get(e){return d(this,null,function*(){return yield this.resend.get(`/audiences/${e}`)})}remove(e){return d(this,null,function*(){return yield this.resend.delete(`/audiences/${e}`)})}};function p(e){var t;return{attachments:null==(t=e.attachments)?void 0:t.map(e=>({content:e.content,filename:e.filename,path:e.path,content_type:e.contentType,inline_content_id:e.inlineContentId})),bcc:e.bcc,cc:e.cc,from:e.from,headers:e.headers,html:e.html,reply_to:e.replyTo,scheduled_at:e.scheduledAt,subject:e.subject,tags:e.tags,text:e.text,to:e.to}}var h=class{constructor(e){this.resend=e}send(e){return d(this,arguments,function*(e,t={}){return this.create(e,t)})}create(t){return d(this,arguments,function*(t,r={}){let i=[];for(let r of t){if(r.react){if(!this.renderAsync)try{let{renderAsync:t}=yield e.A(6693);this.renderAsync=t}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}r.html=yield this.renderAsync(r.react),r.react=void 0}i.push(p(r))}return yield this.resend.post("/emails/batch",i,r)})}},g=class{constructor(e){this.resend=e}create(t){return d(this,arguments,function*(t,r={}){if(t.react){if(!this.renderAsync)try{let{renderAsync:t}=yield e.A(6693);this.renderAsync=t}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}t.html=yield this.renderAsync(t.react)}return yield this.resend.post("/broadcasts",{name:t.name,audience_id:t.audienceId,preview_text:t.previewText,from:t.from,html:t.html,reply_to:t.replyTo,subject:t.subject,text:t.text},r)})}send(e,t){return d(this,null,function*(){return yield this.resend.post(`/broadcasts/${e}/send`,{scheduled_at:null==t?void 0:t.scheduledAt})})}list(){return d(this,null,function*(){return yield this.resend.get("/broadcasts")})}get(e){return d(this,null,function*(){return yield this.resend.get(`/broadcasts/${e}`)})}remove(e){return d(this,null,function*(){return yield this.resend.delete(`/broadcasts/${e}`)})}update(e,t){return d(this,null,function*(){return yield this.resend.patch(`/broadcasts/${e}`,{name:t.name,audience_id:t.audienceId,from:t.from,html:t.html,text:t.text,subject:t.subject,reply_to:t.replyTo,preview_text:t.previewText})})}},f=class{constructor(e){this.resend=e}create(e){return d(this,arguments,function*(e,t={}){return yield this.resend.post(`/audiences/${e.audienceId}/contacts`,{unsubscribed:e.unsubscribed,email:e.email,first_name:e.firstName,last_name:e.lastName},t)})}list(e){return d(this,null,function*(){return yield this.resend.get(`/audiences/${e.audienceId}/contacts`)})}get(e){return d(this,null,function*(){return e.id||e.email?yield this.resend.get(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}update(e){return d(this,null,function*(){return e.id||e.email?yield this.resend.patch(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`,{unsubscribed:e.unsubscribed,first_name:e.firstName,last_name:e.lastName}):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}remove(e){return d(this,null,function*(){return e.id||e.email?yield this.resend.delete(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}},m=class{constructor(e){this.resend=e}create(e){return d(this,arguments,function*(e,t={}){return yield this.resend.post("/domains",{name:e.name,region:e.region,custom_return_path:e.customReturnPath},t)})}list(){return d(this,null,function*(){return yield this.resend.get("/domains")})}get(e){return d(this,null,function*(){return yield this.resend.get(`/domains/${e}`)})}update(e){return d(this,null,function*(){return yield this.resend.patch(`/domains/${e.id}`,{click_tracking:e.clickTracking,open_tracking:e.openTracking,tls:e.tls})})}remove(e){return d(this,null,function*(){return yield this.resend.delete(`/domains/${e}`)})}verify(e){return d(this,null,function*(){return yield this.resend.post(`/domains/${e}/verify`)})}},v=class{constructor(e){this.resend=e}send(e){return d(this,arguments,function*(e,t={}){return this.create(e,t)})}create(t){return d(this,arguments,function*(t,r={}){if(t.react){if(!this.renderAsync)try{let{renderAsync:t}=yield e.A(6693);this.renderAsync=t}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}t.html=yield this.renderAsync(t.react)}return yield this.resend.post("/emails",p(t),r)})}get(e){return d(this,null,function*(){return yield this.resend.get(`/emails/${e}`)})}update(e){return d(this,null,function*(){return yield this.resend.patch(`/emails/${e.id}`,{scheduled_at:e.scheduledAt})})}cancel(e){return d(this,null,function*(){return yield this.resend.post(`/emails/${e}/cancel`)})}},b="u">typeof process&&process.env&&process.env.RESEND_BASE_URL||"https://api.resend.com",y="u">typeof process&&process.env&&process.env.RESEND_USER_AGENT||"resend-node:4.8.0",x=class{constructor(e){if(this.key=e,this.apiKeys=new c(this),this.audiences=new u(this),this.batch=new h(this),this.broadcasts=new g(this),this.contacts=new f(this),this.domains=new m(this),this.emails=new v(this),!e&&("u">typeof process&&process.env&&(this.key=process.env.RESEND_API_KEY),!this.key))throw Error('Missing API key. Pass it to the constructor `new Resend("re_123")`');this.headers=new Headers({Authorization:`Bearer ${this.key}`,"User-Agent":y,"Content-Type":"application/json"})}fetchRequest(e){return d(this,arguments,function*(e,t={}){try{let n=yield fetch(`${b}${e}`,t);if(!n.ok)try{let e=yield n.text();return{data:null,error:JSON.parse(e)}}catch(t){if(t instanceof SyntaxError)return{data:null,error:{name:"application_error",message:"Internal server error. We are unable to process your request right now, please try again later."}};let e={message:n.statusText,name:"application_error"};if(t instanceof Error){let n,a;return{data:null,error:(n=l({},e),a={message:t.message},r(n,i(a)))}}return{data:null,error:e}}return{data:yield n.json(),error:null}}catch(e){return{data:null,error:{name:"application_error",message:"Unable to fetch data. The request could not be resolved."}}}})}post(e,t){return d(this,arguments,function*(e,t,r={}){let i=new Headers(this.headers);r.idempotencyKey&&i.set("Idempotency-Key",r.idempotencyKey);let n=l({method:"POST",headers:i,body:JSON.stringify(t)},r);return this.fetchRequest(e,n)})}get(e){return d(this,arguments,function*(e,t={}){let r=l({method:"GET",headers:this.headers},t);return this.fetchRequest(e,r)})}put(e,t){return d(this,arguments,function*(e,t,r={}){let i=l({method:"PUT",headers:this.headers,body:JSON.stringify(t)},r);return this.fetchRequest(e,i)})}patch(e,t){return d(this,arguments,function*(e,t,r={}){let i=l({method:"PATCH",headers:this.headers,body:JSON.stringify(t)},r);return this.fetchRequest(e,i)})}delete(e,t){return d(this,null,function*(){let r={method:"DELETE",headers:this.headers,body:JSON.stringify(t)};return this.fetchRequest(e,r)})}};e.s(["Resend",()=>x])},1952,e=>{"use strict";e.s(["formatUKDate",0,(e,t={day:"numeric",month:"short",year:"numeric"})=>{let r=e instanceof Date?e:new Date(e);return new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/London",...t}).format(r)}])},48782,e=>{"use strict";var t=e.i(1952);let r=e=>`\xa3${(e/100).toFixed(2)}`,i=e=>(0,t.formatUKDate)(e,{year:"numeric",month:"short",day:"numeric"});function n(e){let t=e.depositRequired?`(${r(e.depositPenceDue||0)} deposit due)`:"(No deposit required)",n="PENDING"===e.bookingStatus?"⏳ Payment Pending":"✓ Confirmed",a="PENDING"===e.bookingStatus?"#dc2626":"#059669";return`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header-subtitle { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { background: white; padding: 30px 20px; }
          .booking-number { background: #f3f4f6; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .booking-number .label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; }
          .booking-number .value { font-size: 24px; font-weight: 700; color: #1f2937; margin-top: 4px; }
          .status-badge { display: inline-block; padding: 6px 12px; border-radius: 4px; background: #f0fdf4; color: ${a}; font-weight: 600; font-size: 12px; margin-top: 10px; }
          .section { margin: 25px 0; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 15px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #6b7280; font-weight: 500; }
          .detail-value { font-weight: 600; color: #1f2937; text-align: right; }
          .service-card { background: #f9fafb; border: 2px solid #e5e7eb; padding: 15px; border-radius: 4px; margin: 15px 0; }
          .service-name { font-weight: 700; color: #1f2937; margin-bottom: 8px; }
          .service-price { font-size: 18px; font-weight: 700; color: #0891b2; }
          .vehicle-info { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; border-radius: 4px; }
          .vehicle-info .info-item { margin: 8px 0; }
          .vehicle-info .label { color: #1e40af; font-weight: 600; }
          .vehicle-info .value { color: #1f2937; }
          .cta-section { text-align: center; margin: 30px 0; }
          .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; }
          .cta-button:hover { background: #2563eb; }
          .contact-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .contact-section h3 { margin-top: 0; color: #1f2937; font-size: 14px; font-weight: 600; }
          .contact-item { margin: 10px 0; font-size: 14px; }
          .contact-item a { color: #3b82f6; text-decoration: none; }
          .note-section { background: #fef9c3; border-left: 4px solid #eab308; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .note-section h4 { margin-top: 0; color: #854d0e; font-size: 12px; font-weight: 600; text-transform: uppercase; }
          .note-section p { margin: 5px 0; color: #78350f; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          .greeting { font-size: 16px; color: #1f2937; margin: 0 0 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Booking Confirmed</h1>
            <p class="header-subtitle">${e.garageName}</p>
          </div>

          <div class="content">
            <p class="greeting">Hi ${e.customerName},</p>
            <p style="color: #4b5563; margin-bottom: 20px;">Thank you for booking with us! Your appointment has been confirmed. Below are your booking details.</p>

            <div class="booking-number">
              <div class="label">Booking Reference</div>
              <div class="value">${e.bookingNumber}</div>
              <div class="status-badge">${n}</div>
            </div>

            <div class="section">
              <div class="section-title">📍 Appointment Details</div>
              <div class="detail-row">
                <div class="detail-label">Date</div>
                <div class="detail-value">${i(e.bookingDate)}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Time</div>
                <div class="detail-value">${e.bookingTime}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Service</div>
                <div class="detail-value" style="text-align: right; max-width: 300px;">${e.serviceName}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Price</div>
                <div class="detail-value">${r(e.servicePricePence)} ${t}</div>
              </div>
            </div>

            ${e.vehicleVrm?`
            <div class="vehicle-info">
              <div class="info-item">
                <span class="label">Vehicle:</span>
                <span class="value">${e.vehicleMake||"Unknown"} ${e.vehicleModel||""} (${e.vehicleVrm})</span>
              </div>
            </div>
            `:""}

            ${e.notes?`
            <div class="note-section">
              <h4>📝 Additional Notes</h4>
              <p>${e.notes.replace(/\n/g,"<br>")}</p>
            </div>
            `:""}

            ${"PENDING"===e.bookingStatus?`
            <div class="cta-section">
              <p style="color: #dc2626; font-weight: 600; margin-bottom: 15px;">⚠️ Payment Required</p>
              <p style="color: #4b5563; margin-bottom: 20px;">Complete your payment to confirm this booking:</p>
              <a href="#" class="cta-button" style="background: #dc2626;">💳 Complete Payment</a>
            </div>
            `:`
            <div class="cta-section">
              <p style="color: #059669; font-weight: 600; margin-bottom: 15px;">✓ All Set</p>
              <p style="color: #4b5563;">We look forward to seeing you on the scheduled date.</p>
            </div>
            `}

            <div class="contact-section">
              <h3>📞 Need to Change Your Appointment?</h3>
              <p style="color: #4b5563; font-size: 13px; margin: 10px 0;">If you need to reschedule or cancel, please contact us as soon as possible.</p>
              ${e.garagePhone?`<div class="contact-item"><strong>Phone:</strong> <a href="tel:${e.garagePhone}">${e.garagePhone}</a></div>`:""}
              ${e.garageEmail?`<div class="contact-item"><strong>Email:</strong> <a href="mailto:${e.garageEmail}">${e.garageEmail}</a></div>`:""}
              ${e.garageAddress?`<div class="contact-item"><strong>Address:</strong> ${e.garageAddress}${e.garagePostcode?", "+e.garagePostcode:""}</div>`:""}
            </div>

            <p style="color: #6b7280; font-size: 13px;">Please arrive 5-10 minutes early on the day of your appointment. If you have any questions, don't hesitate to reach out.</p>
          </div>

          <div class="footer">
            <p style="margin: 0;">This is an automated email from ${e.garageName}. If you did not make this booking, please contact us immediately.</p>
            <p style="margin: 8px 0 0;">\xa9 ${new Date().getFullYear()} ${e.garageName}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `}function a(e){let t=e.items.map(e=>`
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px;">
            <div style="font-weight: 500;">${e.description}</div>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 13px; font-weight: 500;">${e.price}</td>
        </tr>
      `).join("");return`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header-subtitle { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { background: white; padding: 30px 20px; }
          .invoice-header { background: #f3f4f6; padding: 20px; border-radius: 4px; margin: 20px 0; }
          .invoice-number { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; }
          .invoice-number-value { font-size: 20px; font-weight: 700; color: #1f2937; margin-top: 4px; }
          .invoice-date { color: #4b5563; font-size: 13px; margin-top: 10px; }
          .customer-section { margin: 20px 0; }
          .section-label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 8px; }
          .customer-name { font-weight: 600; color: #1f2937; }
          .customer-email { color: #4b5563; font-size: 13px; }
          .vehicle-info { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; border-radius: 4px; font-size: 13px; }
          .vehicle-info .label { color: #1e40af; font-weight: 600; }
          .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items-table thead { background: #f3f4f6; }
          .items-table th { text-align: left; padding: 12px 0; color: #1f2937; font-weight: 600; font-size: 12px; text-transform: uppercase; }
          .items-table td { padding: 12px 0; font-size: 13px; border-bottom: 1px solid #e5e7eb; }
          .total-section { margin: 20px 0; border-top: 2px solid #e5e7eb; padding-top: 15px; }
          .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
          .total-row.final { font-weight: 700; font-size: 16px; color: #0891b8; border-top: 1px solid #e5e7eb; padding-top: 12px; }
          .contact-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .contact-section h3 { margin-top: 0; color: #1f2937; font-size: 14px; font-weight: 600; }
          .contact-item { margin: 10px 0; font-size: 13px; }
          .contact-item a { color: #3b82f6; text-decoration: none; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          .greeting { font-size: 16px; color: #1f2937; margin: 0 0 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📄 Invoice</h1>
            <p class="header-subtitle">${e.garageName}</p>
          </div>

          <div class="content">
            <p class="greeting">Hi ${e.customerName},</p>
            <p style="color: #4b5563; margin-bottom: 20px;">Thank you for your business! Please find your invoice details below.</p>

            <div class="invoice-header">
              <div class="invoice-number">Invoice Number</div>
              <div class="invoice-number-value">${e.invoiceNumber}</div>
              <div class="invoice-date">Issued: ${i(e.invoiceDate)}</div>
            </div>

            <div class="customer-section">
              <div class="section-label">Bill To</div>
              <div class="customer-name">${e.customerName}</div>
              <div class="customer-email">${e.customerEmail}</div>
            </div>

            ${e.vehicleInfo?`
            <div class="vehicle-info">
              <div class="label">Service Vehicle:</div>
              <div>${e.vehicleInfo}</div>
            </div>
            `:""}

            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${t}
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>${r(e.subtotalPence)}</span>
              </div>
              <div class="total-row">
                <span>VAT (${e.vatRate}%):</span>
                <span>${r(e.vatPence)}</span>
              </div>
              <div class="total-row final">
                <span>Total Due:</span>
                <span>${r(e.totalPence)}</span>
              </div>
            </div>

            <div class="contact-section">
              <h3>💼 Questions?</h3>
              <p style="color: #4b5563; font-size: 13px; margin: 10px 0;">If you have any questions about this invoice, please contact us:</p>
              ${e.garagePhone?`<div class="contact-item"><strong>Phone:</strong> <a href="tel:${e.garagePhone}">${e.garagePhone}</a></div>`:""}
              ${e.garageEmail?`<div class="contact-item"><strong>Email:</strong> <a href="mailto:${e.garageEmail}">${e.garageEmail}</a></div>`:""}
              ${e.garageAddress?`<div class="contact-item"><strong>Address:</strong> ${e.garageAddress}${e.garagePostcode?", "+e.garagePostcode:""}</div>`:""}
            </div>

            <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">Thank you for choosing ${e.garageName}. We appreciate your business!</p>
          </div>

          <div class="footer">
            <p style="margin: 0;">This is an automated email from ${e.garageName} with your invoice details.</p>
            <p style="margin: 8px 0 0;">\xa9 ${new Date().getFullYear()} ${e.garageName}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `}e.s(["buildBookingConfirmationHtml",()=>n,"buildInvoiceEmailHtml",()=>a])},57736,e=>{"use strict";var t=e.i(47909),r=e.i(74017),i=e.i(96250),n=e.i(59756),a=e.i(61916),s=e.i(74677),o=e.i(69741),l=e.i(16795),d=e.i(87718),c=e.i(95169),u=e.i(47587),p=e.i(66012),h=e.i(70101),g=e.i(26937),f=e.i(10372),m=e.i(93695);e.i(52474);var v=e.i(220),b=e.i(89171),y=e.i(98043),x=e.i(57715),w=e.i(46245),E=e.i(48782),A=e.i(26683);async function R(e){let{searchParams:t}=new URL(e.url),r=t.get("status"),i=t.get("garageId"),n=await (0,x.requireGarageAccess)(e,i);if("response"in n)return n.response;let a={};r&&(a.status=r),i&&(a.job={garageId:i});let s=await y.prisma.invoice.findMany({where:a,include:{job:{include:{vehicle:!0,items:!0}},payments:!0},orderBy:{createdAt:"desc"}});return b.NextResponse.json(s)}async function I(e){let t=await e.json(),r=await (0,x.requireJobAccess)(e,t.jobId);if("response"in r)return r.response;let i=await y.prisma.job.findUnique({where:{id:t.jobId},include:{items:!0,vehicle:!0,garage:{select:{vatEnabled:!0}}}});if(!i)return b.NextResponse.json({error:"Job not found"},{status:404});let n=new Date().getFullYear(),a=await y.prisma.invoice.count({where:{invoiceNumber:{startsWith:`INV-${n}-`}}}),s=`INV-${n}-${String(a+1).padStart(4,"0")}`,o=0,l=0;i.items&&i.items.length>0&&i.items.forEach(e=>{"LABOR"===e.type||"SERVICE"===e.type?o+=e.totalPence:"PART"===e.type&&(l+=e.totalPence)}),console.log("[Invoice Create] Job items:",i.items?.length||0),console.log("[Invoice Create] Labor total:",o),console.log("[Invoice Create] Parts total:",l),console.log("[Invoice Create] Items breakdown:",i.items?.map(e=>({name:e.name,type:e.type,unitPrice:e.unitPricePence,quantity:e.quantity,total:e.totalPence})));let d=o+l-(i.discountPence||0),c=i.garage?.vatEnabled===!1?0:i.vatRate??20,u=Math.round(c/100*d),p=d+u;console.log("[Invoice Create] Subtotal:",d,"VAT:",u,"Total:",p);let h=new Date;h.setDate(h.getDate()+30);let g=await y.prisma.invoice.create({data:{invoiceNumber:s,jobId:i.id,subtotalPence:d,vatPence:u,totalPence:p,balancePence:p,dueDate:t.dueDate?new Date(t.dueDate):h,notes:t.notes,source:i.source||"GARAGE"},include:{job:{include:{vehicle:!0,items:!0}},payments:!0}});await y.prisma.job.update({where:{id:i.id},data:{status:"INVOICED",laborTotal:o,partsTotal:l,vatRate:c,totalPence:p}});try{let e=await (0,A.getApiKey)("RESEND_API_KEY"),t=await (0,A.getApiKey)("RESEND_FROM_EMAIL"),r=await (0,A.getApiKey)("RESEND_FROM_NAME")||process.env.NEXT_PUBLIC_APP_NAME||"Garage Boost";e||(e=process.env.RESEND_API_KEY??null),t||(t=process.env.RESEND_FROM_EMAIL??null);let n=await y.prisma.garage.findUnique({where:{id:i.garageId},select:{name:!0,phone:!0,email:!0,address:!0,postcode:!0}}),a=await y.prisma.vehicle.findUnique({where:{id:i.vehicleId},select:{make:!0,model:!0,vrm:!0}}),s=i.vehicle.ownerEmail,o=i.vehicle.ownerName;if(e&&t&&s&&!s.includes("@noemail.local")){let l=new w.Resend(e),d=(i.items||[]).map(e=>({description:e.name,quantity:e.quantity,price:`\xa3${(e.unitPricePence/100).toFixed(2)}`,totalPence:e.totalPence})),u=(0,E.buildInvoiceEmailHtml)({invoiceNumber:g.invoiceNumber,invoiceDate:g.createdAt,customerName:o,customerEmail:s,totalPence:g.totalPence,subtotalPence:g.subtotalPence,vatPence:g.vatPence,vatRate:c,items:d,garageName:n?.name||"Garage Boost",garagePhone:n?.phone||void 0,garageEmail:n?.email||void 0,garageAddress:n?.address||void 0,garagePostcode:n?.postcode||void 0,jobDescripton:i.description||void 0,vehicleInfo:a?`${a.make} ${a.model} (${a.vrm})`:void 0});await l.emails.send({from:`${n?.name||r} <${t}>`,replyTo:n?.email||void 0,to:s,subject:`📄 Invoice ${g.invoiceNumber} - ${n?.name||"Garage Boost"}`,html:u}),console.log("[Invoice] Email sent to:",s)}}catch(e){console.error("[Invoice] Failed to send invoice email:",e)}return b.NextResponse.json(g,{status:201})}e.s(["GET",()=>R,"POST",()=>I],23804);var $=e.i(23804);let N=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/invoices/route",pathname:"/api/invoices",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/invoices/route.ts",nextConfigOutput:"",userland:$}),{workAsyncStorage:P,workUnitAsyncStorage:k,serverHooks:_}=N;function T(){return(0,i.patchFetch)({workAsyncStorage:P,workUnitAsyncStorage:k})}async function S(e,t,i){N.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let b="/api/invoices/route";b=b.replace(/\/index$/,"")||"/";let y=await N.prepare(e,t,{srcPage:b,multiZoneDraftMode:!1});if(!y)return t.statusCode=400,t.end("Bad Request"),null==i.waitUntil||i.waitUntil.call(i,Promise.resolve()),null;let{buildId:x,params:w,nextConfig:E,parsedUrl:A,isDraftMode:R,prerenderManifest:I,routerServerContext:$,isOnDemandRevalidate:P,revalidateOnlyGenerated:k,resolvedPathname:_,clientReferenceManifest:T,serverActionsManifest:S}=y,q=(0,o.normalizeAppPath)(b),C=!!(I.dynamicRoutes[q]||I.routes[_]),j=async()=>((null==$?void 0:$.render404)?await $.render404(e,t,A,!1):t.end("This page could not be found"),null);if(C&&!R){let e=!!I.routes[_],t=I.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await j();throw new m.NoFallbackError}}let D=null;!C||N.isDev||R||(D="/index"===(D=_)?"/":D);let O=!0===N.isDev||!C,F=C&&!O;S&&T&&(0,s.setManifestsSingleton)({page:b,clientReferenceManifest:T,serverActionsManifest:S});let U=e.method||"GET",M=(0,a.getTracer)(),z=M.getActiveScopeSpan(),H={params:w,prerenderManifest:I,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:O,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:i.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,i,n)=>N.onRequestError(e,t,i,n,$)},sharedContext:{buildId:x}},G=new l.NodeNextRequest(e),B=new l.NodeNextResponse(t),K=d.NextRequestAdapter.fromNodeNextRequest(G,(0,d.signalFromNodeResponse)(t));try{let s=async e=>N.handle(K,H).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let i=r.get("next.route");if(i){let t=`${U} ${i}`;e.setAttributes({"next.route":i,"http.route":i,"next.span_name":t}),e.updateName(t)}else e.updateName(`${U} ${b}`)}),o=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var a,l;let d=async({previousCacheEntry:r})=>{try{if(!o&&P&&k&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await s(n);e.fetchMetrics=H.renderOpts.fetchMetrics;let l=H.renderOpts.pendingWaitUntil;l&&i.waitUntil&&(i.waitUntil(l),l=void 0);let d=H.renderOpts.collectedTags;if(!C)return await (0,p.sendResponse)(G,B,a,H.renderOpts.pendingWaitUntil),null;{let e=await a.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(a.headers);d&&(t[f.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=f.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,i=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=f.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:i}}}}catch(t){throw(null==r?void 0:r.isStale)&&await N.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:P})},!1,$),t}},c=await N.handleResponse({req:e,nextConfig:E,cacheKey:D,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:I,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:k,responseGenerator:d,waitUntil:i.waitUntil,isMinimalMode:o});if(!C)return null;if((null==c||null==(a=c.value)?void 0:a.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==c||null==(l=c.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",P?"REVALIDATED":c.isMiss?"MISS":c.isStale?"STALE":"HIT"),R&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,h.fromNodeOutgoingHttpHeaders)(c.value.headers);return o&&C||m.delete(f.NEXT_CACHE_TAGS_HEADER),!c.cacheControl||t.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,g.getCacheControlHeader)(c.cacheControl)),await (0,p.sendResponse)(G,B,new Response(c.value.body,{headers:m,status:c.value.status||200})),null};z?await l(z):await M.withPropagatedContext(e.headers,()=>M.trace(c.BaseServerSpan.handleRequest,{spanName:`${U} ${b}`,kind:a.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},l))}catch(t){if(t instanceof m.NoFallbackError||await N.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:P})},!1,$),C)throw t;return await (0,p.sendResponse)(G,B,new Response(null,{status:500})),null}}e.s(["handler",()=>S,"patchFetch",()=>T,"routeModule",()=>N,"serverHooks",()=>_,"workAsyncStorage",()=>P,"workUnitAsyncStorage",()=>k],57736)},6693,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_next_dist_compiled_react-dom_server_node_ba4b5597.js","server/chunks/[root-of-the-server]__7f1a87a2._.js"].map(t=>e.l(t))).then(()=>t(1631)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__53173fc9._.js.map