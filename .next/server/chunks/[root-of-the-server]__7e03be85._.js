module.exports=[24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},98043,e=>{"use strict";var t=e.i(63021);let r=global.prisma||new t.PrismaClient({log:["error","warn"]});e.s(["prisma",0,r])},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},42315,(e,t,r)=>{"use strict";t.exports=e.r(18622)},47540,(e,t,r)=>{"use strict";t.exports=e.r(42315).vendored["react-rsc"].React},63021,(e,t,r)=>{t.exports=e.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},75601,e=>{"use strict";let t=()=>{let e=process.env.SESSION_SECRET;if(!e)throw Error("SESSION_SECRET is required in production");return e||"dev-session-secret"},r=()=>{if(globalThis.crypto?.subtle)return globalThis.crypto;throw Error("Web Crypto API is not available")},i=e=>("u">typeof Buffer?Buffer.from(e).toString("base64"):btoa(String.fromCharCode(...e))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),n=e=>{let t=e.replace(/-/g,"+").replace(/_/g,"/"),r=t.padEnd(t.length+(4-t.length%4)%4,"=");if("u">typeof Buffer)return new Uint8Array(Buffer.from(r,"base64"));let i=atob(r),n=new Uint8Array(i.length);for(let e=0;e<i.length;e+=1)n[e]=i.charCodeAt(e);return n},a=async(e,t)=>{let n=r(),a=await n.subtle.importKey("raw",new TextEncoder().encode(t),{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return i(new Uint8Array(await n.subtle.sign("HMAC",a,new TextEncoder().encode(e))))},s=async(e,t,i)=>{let a=r(),s=await a.subtle.importKey("raw",new TextEncoder().encode(i),{name:"HMAC",hash:"SHA-256"},!1,["verify"]);return a.subtle.verify("HMAC",s,n(t),new TextEncoder().encode(e))},o=async e=>{let r=t(),n=i(new TextEncoder().encode(JSON.stringify({alg:"HS256",typ:"JWT"}))),s=i(new TextEncoder().encode(JSON.stringify(e))),o=`${n}.${s}`,l=await a(o,r);return`${o}.${l}`},l=async e=>{if(!e)return null;let r=t(),i=e.split(".");if(3!==i.length)return null;let[a,o,l]=i,d=`${a}.${o}`;if(!await s(d,l,r))return null;try{let e=new TextDecoder().decode(n(o)),t=JSON.parse(e);if(!t.exp||t.exp<Math.floor(Date.now()/1e3)||!t.sub||!t.role)return null;return t}catch{return null}},d=async e=>{let t=(e.headers.get("cookie")||"").split(";").map(e=>e.trim()).filter(e=>e.startsWith("garage-session=")),r=t.length>0?t[t.length-1]:null;return l(r?r.slice(15):null)};e.s(["getSessionFromRequest",0,d,"isAdminRole",0,e=>"ADMIN"===e||"SUPER_ADMIN"===e||"PLATFORM_ADMIN"===e,"signSession",0,o])},26683,e=>{"use strict";var t=e.i(89171),r=e.i(98043),i=e.i(75601);function n(e){return Buffer.from(e).toString("base64")}function a(e){return Buffer.from(e,"base64").toString("utf-8")}async function s(e){let n=await (0,i.getSessionFromRequest)(e);if(!n||!(0,i.isAdminRole)(n.role))return t.NextResponse.json({error:"Forbidden"},{status:403});try{let e=(await r.prisma.apiConfig.findMany({where:{isActive:!0}})).reduce((e,t)=>(e[t.key]={key:t.key,value:a(t.value),isActive:t.isActive},e),{});return e.REQUIRE_EMAIL_VERIFICATION||(e.REQUIRE_EMAIL_VERIFICATION={key:"REQUIRE_EMAIL_VERIFICATION",value:"false",isActive:!0}),t.NextResponse.json(e)}catch(e){return console.error("Failed to fetch API configs:",e),t.NextResponse.json({error:"Failed to fetch configuration"},{status:500})}}async function o(e){let a=await (0,i.getSessionFromRequest)(e);if(!a||!(0,i.isAdminRole)(a.role))return t.NextResponse.json({error:"Forbidden"},{status:403});try{let i=await e.json();for(let[e,t]of Object.entries(i))t.value&&await r.prisma.apiConfig.upsert({where:{key:e},update:{value:n(t.value),isActive:t.isActive,updatedAt:new Date},create:{key:e,value:n(t.value),isActive:!0}});return t.NextResponse.json({success:!0,message:"Configuration saved"})}catch(e){return console.error("Failed to save API configs:",e),t.NextResponse.json({error:"Failed to save configuration"},{status:500})}}async function l(e){try{let t=await r.prisma.apiConfig.findUnique({where:{key:e,isActive:!0}});if(!t){if("REQUIRE_EMAIL_VERIFICATION"===e)return"false";return null}return a(t.value)}catch(t){return console.error(`Failed to get API key ${e}:`,t),null}}e.s(["GET",()=>s,"POST",()=>o,"getApiKey",()=>l])},46245,e=>{"use strict";var t=Object.defineProperty,r=Object.defineProperties,i=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(e,r,i)=>r in e?t(e,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[r]=i,l=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&o(e,r,t[r]);if(n)for(var r of n(t))s.call(t,r)&&o(e,r,t[r]);return e},d=(e,t,r)=>new Promise((i,n)=>{var a=e=>{try{o(r.next(e))}catch(e){n(e)}},s=e=>{try{o(r.throw(e))}catch(e){n(e)}},o=e=>e.done?i(e.value):Promise.resolve(e.value).then(a,s);o((r=r.apply(e,t)).next())}),c=class{constructor(e){this.resend=e}create(e){return d(this,arguments,function*(e,t={}){return yield this.resend.post("/api-keys",e,t)})}list(){return d(this,null,function*(){return yield this.resend.get("/api-keys")})}remove(e){return d(this,null,function*(){return yield this.resend.delete(`/api-keys/${e}`)})}},u=class{constructor(e){this.resend=e}create(e){return d(this,arguments,function*(e,t={}){return yield this.resend.post("/audiences",e,t)})}list(){return d(this,null,function*(){return yield this.resend.get("/audiences")})}get(e){return d(this,null,function*(){return yield this.resend.get(`/audiences/${e}`)})}remove(e){return d(this,null,function*(){return yield this.resend.delete(`/audiences/${e}`)})}};function p(e){var t;return{attachments:null==(t=e.attachments)?void 0:t.map(e=>({content:e.content,filename:e.filename,path:e.path,content_type:e.contentType,inline_content_id:e.inlineContentId})),bcc:e.bcc,cc:e.cc,from:e.from,headers:e.headers,html:e.html,reply_to:e.replyTo,scheduled_at:e.scheduledAt,subject:e.subject,tags:e.tags,text:e.text,to:e.to}}var f=class{constructor(e){this.resend=e}send(e){return d(this,arguments,function*(e,t={}){return this.create(e,t)})}create(t){return d(this,arguments,function*(t,r={}){let i=[];for(let r of t){if(r.react){if(!this.renderAsync)try{let{renderAsync:t}=yield e.A(6693);this.renderAsync=t}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}r.html=yield this.renderAsync(r.react),r.react=void 0}i.push(p(r))}return yield this.resend.post("/emails/batch",i,r)})}},h=class{constructor(e){this.resend=e}create(t){return d(this,arguments,function*(t,r={}){if(t.react){if(!this.renderAsync)try{let{renderAsync:t}=yield e.A(6693);this.renderAsync=t}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}t.html=yield this.renderAsync(t.react)}return yield this.resend.post("/broadcasts",{name:t.name,audience_id:t.audienceId,preview_text:t.previewText,from:t.from,html:t.html,reply_to:t.replyTo,subject:t.subject,text:t.text},r)})}send(e,t){return d(this,null,function*(){return yield this.resend.post(`/broadcasts/${e}/send`,{scheduled_at:null==t?void 0:t.scheduledAt})})}list(){return d(this,null,function*(){return yield this.resend.get("/broadcasts")})}get(e){return d(this,null,function*(){return yield this.resend.get(`/broadcasts/${e}`)})}remove(e){return d(this,null,function*(){return yield this.resend.delete(`/broadcasts/${e}`)})}update(e,t){return d(this,null,function*(){return yield this.resend.patch(`/broadcasts/${e}`,{name:t.name,audience_id:t.audienceId,from:t.from,html:t.html,text:t.text,subject:t.subject,reply_to:t.replyTo,preview_text:t.previewText})})}},m=class{constructor(e){this.resend=e}create(e){return d(this,arguments,function*(e,t={}){return yield this.resend.post(`/audiences/${e.audienceId}/contacts`,{unsubscribed:e.unsubscribed,email:e.email,first_name:e.firstName,last_name:e.lastName},t)})}list(e){return d(this,null,function*(){return yield this.resend.get(`/audiences/${e.audienceId}/contacts`)})}get(e){return d(this,null,function*(){return e.id||e.email?yield this.resend.get(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}update(e){return d(this,null,function*(){return e.id||e.email?yield this.resend.patch(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`,{unsubscribed:e.unsubscribed,first_name:e.firstName,last_name:e.lastName}):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}remove(e){return d(this,null,function*(){return e.id||e.email?yield this.resend.delete(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}},g=class{constructor(e){this.resend=e}create(e){return d(this,arguments,function*(e,t={}){return yield this.resend.post("/domains",{name:e.name,region:e.region,custom_return_path:e.customReturnPath},t)})}list(){return d(this,null,function*(){return yield this.resend.get("/domains")})}get(e){return d(this,null,function*(){return yield this.resend.get(`/domains/${e}`)})}update(e){return d(this,null,function*(){return yield this.resend.patch(`/domains/${e.id}`,{click_tracking:e.clickTracking,open_tracking:e.openTracking,tls:e.tls})})}remove(e){return d(this,null,function*(){return yield this.resend.delete(`/domains/${e}`)})}verify(e){return d(this,null,function*(){return yield this.resend.post(`/domains/${e}/verify`)})}},b=class{constructor(e){this.resend=e}send(e){return d(this,arguments,function*(e,t={}){return this.create(e,t)})}create(t){return d(this,arguments,function*(t,r={}){if(t.react){if(!this.renderAsync)try{let{renderAsync:t}=yield e.A(6693);this.renderAsync=t}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}t.html=yield this.renderAsync(t.react)}return yield this.resend.post("/emails",p(t),r)})}get(e){return d(this,null,function*(){return yield this.resend.get(`/emails/${e}`)})}update(e){return d(this,null,function*(){return yield this.resend.patch(`/emails/${e.id}`,{scheduled_at:e.scheduledAt})})}cancel(e){return d(this,null,function*(){return yield this.resend.post(`/emails/${e}/cancel`)})}},v="u">typeof process&&process.env&&process.env.RESEND_BASE_URL||"https://api.resend.com",x="u">typeof process&&process.env&&process.env.RESEND_USER_AGENT||"resend-node:4.8.0",y=class{constructor(e){if(this.key=e,this.apiKeys=new c(this),this.audiences=new u(this),this.batch=new f(this),this.broadcasts=new h(this),this.contacts=new m(this),this.domains=new g(this),this.emails=new b(this),!e&&("u">typeof process&&process.env&&(this.key=process.env.RESEND_API_KEY),!this.key))throw Error('Missing API key. Pass it to the constructor `new Resend("re_123")`');this.headers=new Headers({Authorization:`Bearer ${this.key}`,"User-Agent":x,"Content-Type":"application/json"})}fetchRequest(e){return d(this,arguments,function*(e,t={}){try{let n=yield fetch(`${v}${e}`,t);if(!n.ok)try{let e=yield n.text();return{data:null,error:JSON.parse(e)}}catch(t){if(t instanceof SyntaxError)return{data:null,error:{name:"application_error",message:"Internal server error. We are unable to process your request right now, please try again later."}};let e={message:n.statusText,name:"application_error"};if(t instanceof Error){let n,a;return{data:null,error:(n=l({},e),a={message:t.message},r(n,i(a)))}}return{data:null,error:e}}return{data:yield n.json(),error:null}}catch(e){return{data:null,error:{name:"application_error",message:"Unable to fetch data. The request could not be resolved."}}}})}post(e,t){return d(this,arguments,function*(e,t,r={}){let i=new Headers(this.headers);r.idempotencyKey&&i.set("Idempotency-Key",r.idempotencyKey);let n=l({method:"POST",headers:i,body:JSON.stringify(t)},r);return this.fetchRequest(e,n)})}get(e){return d(this,arguments,function*(e,t={}){let r=l({method:"GET",headers:this.headers},t);return this.fetchRequest(e,r)})}put(e,t){return d(this,arguments,function*(e,t,r={}){let i=l({method:"PUT",headers:this.headers,body:JSON.stringify(t)},r);return this.fetchRequest(e,i)})}patch(e,t){return d(this,arguments,function*(e,t,r={}){let i=l({method:"PATCH",headers:this.headers,body:JSON.stringify(t)},r);return this.fetchRequest(e,i)})}delete(e,t){return d(this,null,function*(){let r={method:"DELETE",headers:this.headers,body:JSON.stringify(t)};return this.fetchRequest(e,r)})}};e.s(["Resend",()=>y])},1952,e=>{"use strict";e.s(["formatUKDate",0,(e,t={day:"numeric",month:"short",year:"numeric"})=>{let r=e instanceof Date?e:new Date(e);return new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/London",...t}).format(r)}])},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},21517,(e,t,r)=>{t.exports=e.x("http",()=>require("http"))},24836,(e,t,r)=>{t.exports=e.x("https",()=>require("https"))},70536,e=>{"use strict";var t=e.i(98043);async function r(e,r,i,n,a,s,o){if(!r)return{available:!0};let[l,d]=n.split(":").map(Number),c=new Date(`${i}T${n}:00`),u=new Date(c.getTime()+6e4*a);for(let n of(await t.prisma.booking.findMany({where:{garageId:e,staffId:r,bookingDate:{gte:new Date(i),lt:new Date(new Date(i).getTime()+864e5)},status:{in:["PENDING","CONFIRMED"]},id:o?{not:o}:void 0},include:{service:!0}}))){let[e,t]=n.bookingTime.split(":").map(Number),r=new Date(`${i}T${n.bookingTime}:00`);if(c<new Date(r.getTime()+6e4*(n.service.durationMinutes||60))&&u>r)return{available:!1,conflict:`Conflict with booking at ${n.bookingTime} (${n.customerName})`}}for(let n of(await t.prisma.job.findMany({where:{garageId:e,assignedToId:r,bookedDate:{gte:new Date(i),lt:new Date(new Date(i).getTime()+864e5)},status:{in:["TODO","DOING"]},id:s?{not:s}:void 0}})))if(n.startedAt){let e=n.startedAt;if(c<new Date(e.getTime()+60*(n.estimatedHours||2)*6e4)&&u>e)return{available:!1,conflict:`Conflict with job ${n.jobNumber}`}}return{available:!0}}async function i(e,i,n,a){let s=await t.prisma.staff.findMany({where:{garageId:e,active:!0}}),o=[];for(let t of s){let{available:s}=await r(e,t.id,i,n,a);s&&o.push(t)}return o}async function n(e,t,i,a,s={start:8,end:17}){let o=[];for(let n=s.start;n<s.end;n++)for(let s=0;s<60;s+=30){let l=`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`,{available:d}=await r(e,t,i,l,a);d&&o.push(l)}return o}e.s(["checkStaffAvailability",()=>r,"getAvailableSlots",()=>n,"getAvailableStaff",()=>i])},88947,(e,t,r)=>{t.exports=e.x("stream",()=>require("stream"))},48782,e=>{"use strict";var t=e.i(1952);let r=e=>`\xa3${(e/100).toFixed(2)}`,i=e=>(0,t.formatUKDate)(e,{year:"numeric",month:"short",day:"numeric"});function n(e){let t=e.depositRequired?`(${r(e.depositPenceDue||0)} deposit due)`:"(No deposit required)",n="PENDING"===e.bookingStatus?"⏳ Payment Pending":"✓ Confirmed",a="PENDING"===e.bookingStatus?"#dc2626":"#059669";return`
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
  `}e.s(["buildBookingConfirmationHtml",()=>n,"buildInvoiceEmailHtml",()=>a])},6693,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_next_dist_compiled_react-dom_server_node_ac9856ec.js","server/chunks/[root-of-the-server]__7f1a87a2._.js"].map(t=>e.l(t))).then(()=>t(1631)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7e03be85._.js.map