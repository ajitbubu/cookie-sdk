"use strict";(()=>{var L={bannerText:"Privacy is our priority. We do not sell or otherwise share personal information for money or anything of value. We use strictly necessary cookies to enable site functionality and improve the performance of our website. We also store cookies to personalize the website content and to serve more relevant content to you. For more information, please visit our Privacy Policy or Cookie Policy.",acceptAll:"Accept All",rejectAll:"Reject All",preferences:"Preferences",modalTitle:"Cookie Preferences",rejectNonEssential:"Reject Non-Essential",savePreferences:"Save Preferences",reopenButton:"Cookie settings",alwaysActive:"Always Active",close:"Close",viewCookies:"View Cookies",backToCategories:"Back to categories",searchPlaceholder:"Search cookies...",exportLabel:"Export",printLabel:"Print",resetToDefault:"Reset to Default",confirmChoices:"Confirm Choices",policyLinkText:"Read our Cookie Policy",gpcNotice:"Your browser sent a Global Privacy Control (GPC) signal, so we have defaulted marketing and ad-targeting cookies to off. Strictly necessary cookies remain active to keep the site working. You may still review and enable optional analytics or functional cookies below, or leave them disabled \u2014 your choice is saved and can be changed at any time.",gpcHonored:"Opt-Out Request Honored",noCookies:"No cookies in this category.",notAvailable:"N/A",columns:{name:"Cookie",provider:"Provider",domain:"Domain",expiry:"Expiry"},categoryNames:{necessary:"Strictly Necessary Cookies",analytics:"Performance / Analytics",functional:"Functional Cookies",marketing:"Marketing Cookies"},categoryDescriptions:{necessary:"These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences.",analytics:"These cookies allow us to count visits and traffic sources so we can measure and improve site performance.",functional:"These cookies enable enhanced functionality and personalisation.",marketing:"These cookies are used to build a profile of your interests and show relevant ads. Covers sale or sharing of personal data where applicable."}},R=["necessary","analytics","functional","marketing"];function ie(){return{necessary:{enabled:!0,locked:!0,cookies:[]},analytics:{enabled:!1,cookies:[]},functional:{enabled:!1,cookies:[]},marketing:{enabled:!1,cookies:[]}}}var w={cookieName:"cc_consent",consentVersion:1,expiryDays:182,honorGpc:!0,gtm:{consentMode:!0,dataLayerEvent:"cookie_consent_update"}};function P(e){let n={...ie(),...e.categories||{}};n.necessary={...n.necessary,enabled:!0,locked:!0};let t=e.position??{};return{cookieName:e.cookieName??w.cookieName,cookieDomain:e.cookieDomain,consentVersion:e.consentVersion??w.consentVersion,expiryDays:e.expiryDays??w.expiryDays,policyUrl:e.policyUrl,honorGpc:e.honorGpc??w.honorGpc,position:{banner:t.banner??"bottom",button:t.button??"bottom-left"},categories:n,gtm:{...w.gtm,...e.gtm||{}},labels:{...L,...e.labels||{},columns:{...L.columns,...e.labels?.columns||{}},categoryNames:{...L.categoryNames,...e.labels?.categoryNames||{}},categoryDescriptions:{...L.categoryDescriptions,...e.labels?.categoryDescriptions||{}}},theme:e.theme,onConsent:e.onConsent}}var I={necessary:[],analytics:["analytics_storage"],functional:["functionality_storage","personalization_storage"],marketing:["ad_storage","ad_user_data","ad_personalization"]},M=["ad_storage","ad_user_data","ad_personalization","analytics_storage","functionality_storage","personalization_storage"];function _(e){let n={};for(let t of M)n[t]="denied";return Object.keys(I).forEach(t=>{if(e[t])for(let o of I[t])n[o]="granted"}),n}function se(e,n=document){let t=encodeURIComponent(e)+"=",o=n.cookie?n.cookie.split("; "):[];for(let a of o)if(a.indexOf(t)===0)return decodeURIComponent(a.slice(t.length));return null}function le(e){if(!e)return null;let n;try{n=JSON.parse(e)}catch{return null}if(typeof n!="object"||n===null)return null;let t=n;if(t.schemaVersion!==1||typeof t.timestamp!="string"||typeof t.version!="number")return null;let o=t.categories;if(typeof o!="object"||o===null)return null;let a=["necessary","analytics","functional","marketing"];for(let i of a)if(typeof o[i]!="boolean")return null;return{schemaVersion:1,version:t.version,timestamp:t.timestamp,categories:{...o,necessary:!0}}}function E(e,n=document){return le(se(e,n))}var D={};function pe(e,n,t){return{schemaVersion:1,version:e.consentVersion,timestamp:t,categories:{...n,necessary:!0}}}function H(e,n=document,t=()=>new Date){function o(){return E(e.cookieName,n)??D[e.cookieName]??null}function a(r){let c=pe(e,r,t().toISOString()),s=encodeURIComponent(JSON.stringify(c)),f=e.expiryDays*24*60*60,u=`${encodeURIComponent(e.cookieName)}=${s}; Max-Age=${f}; Path=/; SameSite=Lax`;e.cookieDomain&&(u+=`; Domain=${e.cookieDomain}`),typeof location<"u"&&location.protocol==="https:"&&(u+="; Secure");try{n.cookie=u,E(e.cookieName,n)===null&&(D[e.cookieName]=c,F())}catch{D[e.cookieName]=c,F()}return c}function i(){let r=o();return!r||r.version<e.consentVersion}return{read:o,write:a,needsPrompt:i}}var V=!1;function F(){!V&&typeof console<"u"&&(V=!0,console.warn("[cookie-banner-sdk] cookie write blocked; consent kept in memory for this session only."))}function U(){return typeof window<"u"?window:void 0}function $(e){return e.dataLayer=e.dataLayer||[],e.gtag||(e.gtag=function(){e.dataLayer.push(arguments)}),e.gtag}function W(e,n=500,t=U()){if(!t)return;let o=$(t),a=e?_(e):M.reduce((i,r)=>(i[r]="denied",i),{});o("consent","default",{...a,wait_for_update:n})}function Y(e,n){let t=U();e.gtm.consentMode&&t&&$(t)("consent","update",_(n)),e.gtm.consentMode&&t&&Array.isArray(t.dataLayer)&&t.dataLayer.push({event:e.gtm.dataLayerEvent,consent:{...n}}),typeof e.onConsent=="function"&&e.onConsent({...n})}function B(e){return`
  :host {
    /* Reset/define every consumed var so inherited host values can't leak in. */
    --cc-bg: #ffffff;
    --cc-fg: #111827;
    --cc-muted: #6b7280;
    --cc-border: #e5e7eb;
    --cc-surface: #f9fafb;
    --cc-accent: #DB2927;
    --cc-accent-fg: #ffffff;
    --cc-success: #16a34a;
    --cc-success-bg: #f0fdf4;
    --cc-success-border: #bbf7d0;
    --cc-radius: 10px;
    --cc-font: system-ui, -apple-system, sans-serif;
    --cc-font-size: 14px;
    --cc-heading-color: var(--cc-fg);
    --cc-heading-size: 19px;
    --cc-z: 2147483647;
    ${e?Object.entries(e).map(([t,o])=>`${t.startsWith("--cc-")?t:`--cc-${t}`}: ${o};`).join(`
    `):""}
    all: initial;
  }
  * { box-sizing: border-box; font-family: var(--cc-font); }
  /* [hidden] must beat class rules that set display (e.g. .cc-modal-actions{display:flex}). */
  [hidden] { display: none !important; }
  /* Suppress entrance animation on update() re-renders (live editing). */
  .cc-no-anim { animation: none !important; }
  @keyframes cc-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @keyframes cc-slide-down { from { transform: translateY(-100%); } to { transform: translateY(0); } }
  @keyframes cc-fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes cc-pop-in { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: none; } }

  /* ---- Banner ---- */
  .cc-banner {
    animation: cc-slide-up 0.28s ease-out;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: var(--cc-z);
    background: var(--cc-bg); color: var(--cc-fg);
    border-top: 1px solid var(--cc-border);
    padding: 16px; display: flex; gap: 12px; align-items: center;
    flex-wrap: wrap; justify-content: space-between;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
  }
  /* Position modifier: top vs default bottom. */
  .cc-banner.cc-pos-top {
    bottom: auto; top: 0;
    border-top: none; border-bottom: 1px solid var(--cc-border);
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    animation: cc-slide-down 0.28s ease-out;
  }
  .cc-banner p { margin: 0; flex: 1 1 280px; font-size: var(--cc-font-size); line-height: 1.5; }
  .cc-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  /* ---- Buttons ---- */
  button {
    cursor: pointer; border: 1px solid var(--cc-border); border-radius: var(--cc-radius);
    padding: 11px 18px; min-height: 44px; font-size: 14px; font-weight: 500;
    background: var(--cc-accent); color: var(--cc-accent-fg); transition: background 0.12s, border-color 0.12s;
  }
  button.cc-primary { background: var(--cc-accent); color: var(--cc-accent-fg); border-color: var(--cc-accent); }
  button.cc-primary:hover { filter: brightness(0.94); }
  button.cc-secondary { background: var(--cc-bg); color: var(--cc-accent); border-color: var(--cc-accent); }
  button.cc-secondary:hover { background: var(--cc-surface); }
  button.cc-tertiary { border-color: transparent; background: transparent; color: var(--cc-accent); text-decoration: underline; padding-left: 8px; padding-right: 8px; }
  button:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 2px; }

  /* ---- Floating button ---- */
  .cc-fab {
    position: fixed; z-index: var(--cc-z);
    width: 46px; height: 46px; border-radius: 50%; padding: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--cc-bg); color: var(--cc-fg);
    box-shadow: 0 2px 10px rgba(0,0,0,0.18);
  }
  /* Corner placement (default bottom-left). */
  .cc-fab.cc-fab-bottom-left  { bottom: 16px; left: 16px; }
  .cc-fab.cc-fab-bottom-right { bottom: 16px; right: 16px; }
  .cc-fab.cc-fab-top-left     { top: 16px; left: 16px; }
  .cc-fab.cc-fab-top-right    { top: 16px; right: 16px; }

  /* ---- Modal shell ---- */
  .cc-overlay {
    animation: cc-fade-in 0.2s ease-out;
    position: fixed; inset: 0; z-index: var(--cc-z);
    background: rgba(17,24,39,0.55); display: flex; align-items: center; justify-content: center;
    padding: 16px;
  }
  .cc-modal {
    animation: cc-pop-in 0.22s ease-out;
    background: var(--cc-bg); color: var(--cc-fg); border-radius: 14px;
    max-width: 600px; width: 100%; max-height: 88vh; overflow: auto;
    padding: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.28);
  }
  .cc-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .cc-title { display: flex; align-items: center; gap: 10px; color: var(--cc-fg); }
  .cc-title h2 { margin: 0; font-size: var(--cc-heading-size); font-weight: 600; color: var(--cc-heading-color); }
  .cc-close { display: flex; align-items: center; justify-content: center; border: none; background: none; color: var(--cc-muted); width: 44px; height: 44px; padding: 0; min-height: 0; border-radius: var(--cc-radius); }
  .cc-close:hover { color: var(--cc-fg); background: var(--cc-surface); }
  .cc-close-x { font-size: 16px; }

  /* ---- GPC notice + honored banner ---- */
  .cc-gpc-notice { margin: 0 0 14px; font-size: 13.5px; line-height: 1.6; color: var(--cc-muted); }
  .cc-gpc-notice a { color: var(--cc-accent); }
  .cc-gpc-honored {
    display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
    padding: 12px 14px; border: 1px solid var(--cc-success-border);
    background: var(--cc-success-bg); border-radius: var(--cc-radius);
    color: var(--cc-success); font-weight: 600; font-size: 14px;
  }

  /* ---- Category cards ---- */
  .cc-card { border: 1px solid var(--cc-border); border-radius: var(--cc-radius); padding: 16px; margin-bottom: 14px; background: var(--cc-surface); }
  .cc-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
  .cc-card-head h3 { margin: 0; font-size: 15.5px; font-weight: 600; color: var(--cc-heading-color); }
  .cc-card-desc { margin: 0 0 10px; font-size: 13.5px; line-height: 1.55; color: var(--cc-muted); }
  .cc-badge { font-size: 12px; font-weight: 600; color: var(--cc-success); background: var(--cc-success-bg); border: 1px solid var(--cc-success-border); padding: 4px 10px; border-radius: 999px; white-space: nowrap; }
  .cc-view-link { border: none; background: none; color: var(--cc-accent); padding: 0; min-height: 0; font-size: 13.5px; font-weight: 500; }
  .cc-view-link:hover { text-decoration: underline; }

  /* ---- Toggle switch ---- */
  .cc-switch { position: relative; display: inline-block; width: 44px; height: 26px; flex: none; }
  .cc-switch input { position: absolute; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
  .cc-slider { position: absolute; inset: 0; background: #cbd5e1; border-radius: 999px; transition: background 0.15s; }
  .cc-slider::before { content: ""; position: absolute; height: 20px; width: 20px; left: 3px; top: 3px; background: #fff; border-radius: 50%; transition: transform 0.15s; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
  .cc-switch input:checked + .cc-slider { background: var(--cc-accent); }
  .cc-switch input:checked + .cc-slider::before { transform: translateX(18px); }
  .cc-switch input:focus-visible + .cc-slider { outline: 2px solid var(--cc-accent); outline-offset: 2px; }

  /* ---- Detail view ---- */
  .cc-back { display: flex; align-items: center; gap: 8px; border: none; background: none; color: var(--cc-fg); padding: 0; min-height: 0; font-size: 14px; font-weight: 500; margin-bottom: 16px; }
  .cc-back:hover { color: var(--cc-accent); }
  .cc-detail-title { margin: 0 0 8px; font-size: 17px; font-weight: 600; }
  .cc-detail-desc { margin: 0 0 16px; font-size: 13.5px; line-height: 1.6; color: var(--cc-muted); }
  .cc-toolbar { display: flex; gap: 8px; margin-bottom: 14px; }
  .cc-search { flex: 1; min-width: 0; min-height: 44px; padding: 10px 14px; border: 1px solid var(--cc-border); border-radius: var(--cc-radius); font-size: 14px; background: var(--cc-bg); color: var(--cc-fg); }
  .cc-search:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 1px; }
  .cc-icon-btn { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
  .cc-icon-btn:hover { background: var(--cc-surface); }

  /* ---- Cookie table ---- */
  .cc-table-scroll { border: 1px solid var(--cc-border); border-radius: var(--cc-radius); overflow: auto; }
  .cc-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .cc-table th { text-align: left; padding: 12px 14px; color: var(--cc-muted); font-weight: 600; border-bottom: 1px solid var(--cc-border); white-space: nowrap; background: var(--cc-bg); }
  .cc-table td { padding: 12px 14px; border-bottom: 1px solid var(--cc-border); color: var(--cc-muted); }
  .cc-table tbody tr:nth-child(even) { background: var(--cc-surface); }
  .cc-table tbody tr:last-child td { border-bottom: none; }
  .cc-cell-name { color: var(--cc-fg); font-weight: 500; }
  .cc-empty-row { text-align: center; color: var(--cc-muted); padding: 20px; }

  /* ---- Footer actions ---- */
  .cc-modal-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
  .cc-modal-actions button { flex: 1 1 auto; }

  @media (prefers-reduced-motion: reduce) {
    .cc-banner, .cc-overlay, .cc-modal { animation: none; }
    .cc-slider, .cc-slider::before, button { transition: none; }
  }
  @media (max-width: 480px) {
    .cc-modal { padding: 18px; }
    .cc-toolbar { flex-wrap: wrap; }
  }
  `}function q(e){let n=document.createElement("div");n.setAttribute("data-cookie-consent-root","");let t=n.attachShadow({mode:"open"}),o=B(e),a=ue(t,o),i=null;return a||(i=document.createElement("style"),i.textContent=o,t.appendChild(i)),document.body.appendChild(n),{host:n,root:t,setTheme(r){let c=B(r);a?a.replaceSync(c):i&&(i.textContent=c)},destroy(){n.remove()}}}function ue(e,n){try{if(typeof CSSStyleSheet>"u"||typeof CSSStyleSheet.prototype.replaceSync!="function"||!("adoptedStyleSheets"in e))return null;let t=new CSSStyleSheet;return t.replaceSync(n),e.adoptedStyleSheets=[...e.adoptedStyleSheets,t],t}catch{return null}}function J(e,n){let t=document.createElement("div");t.className="cc-banner",t.setAttribute("role","dialog"),t.setAttribute("aria-label",e.modalTitle),t.setAttribute("aria-live","polite");let o=document.createElement("p");o.textContent=e.bannerText,t.appendChild(o);let a=document.createElement("div");a.className="cc-actions";let i=z(e.preferences,n.onPreferences,"cc-secondary"),r=z(e.rejectAll,n.onRejectAll,"cc-primary"),c=z(e.acceptAll,n.onAcceptAll,"cc-primary");return a.append(i,r,c),t.appendChild(a),t}function z(e,n,t){let o=document.createElement("button");return o.type="button",o.textContent=e,t&&(o.className=t),o.addEventListener("click",n),o}var j="http://www.w3.org/2000/svg";function fe(){let e=document.createElementNS(j,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","37"),e.setAttribute("height","37"),e.setAttribute("fill","#DB2927"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.8"),e.setAttribute("aria-hidden","true");let n=document.createElementNS(j,"path");n.setAttribute("d","M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4-4 4 4 0 0 1-4-4 2 2 0 0 0-2-2z"),e.appendChild(n);for(let[t,o]of[[9,9],[14,12],[10,15]]){let a=document.createElementNS(j,"circle");a.setAttribute("cx",String(t)),a.setAttribute("cy",String(o)),a.setAttribute("r","1"),a.setAttribute("fill","currentColor"),a.setAttribute("stroke","none"),e.appendChild(a)}return e}function X(e,n){let t=document.createElement("button");return t.type="button",t.className="cc-fab",t.setAttribute("aria-label",e.reopenButton),t.title=e.reopenButton,t.appendChild(fe()),t.addEventListener("click",n),t}var Q="http://www.w3.org/2000/svg";function S(e,n={}){let t=document.createElementNS(Q,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","18"),t.setAttribute("height","18"),t.setAttribute("fill",n.fill?"currentColor":"none"),t.setAttribute("stroke",n.fill?"none":"currentColor"),t.setAttribute("stroke-width","1.8"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.setAttribute("aria-hidden","true");for(let o of e){let a=document.createElementNS(Q,"path");a.setAttribute("d",o),t.appendChild(a)}return t}var N={gear:()=>S(["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.1-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z"]),check:()=>S(["M20 6 9 17l-5-5"]),back:()=>S(["M19 12H5","M12 19l-7-7 7-7"]),exportIcon:()=>S(["M12 3v12","M8 7l4-4 4 4","M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"]),print:()=>S(["M6 9V2h12v7","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 14h12v8H6z"])};function ee(e,n,t,o){let a=e.labels,i={},r=document.createElement("div");r.className="cc-overlay",r.addEventListener("click",p=>{p.target===r&&o.onClose()});let c=document.createElement("div");c.className="cc-modal",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),c.setAttribute("aria-label",a.modalTitle);let s=document.createElement("div");s.className="cc-modal-header";let f=document.createElement("div");f.className="cc-title",f.append(N.gear(),h("h2",a.modalTitle));let u=document.createElement("button");u.type="button",u.className="cc-close",u.setAttribute("aria-label",a.close),u.append(h("span","\u2715","cc-close-x")),u.addEventListener("click",o.onClose),s.append(f,u),c.appendChild(s);let d=document.createElement("div");if(d.className="cc-panel cc-panel-categories",t){let p=document.createElement("p");if(p.className="cc-gpc-notice",p.textContent=a.gpcNotice+" ",e.policyUrl){let m=document.createElement("a");m.href=e.policyUrl,m.target="_blank",m.rel="noopener",m.textContent=a.policyLinkText,p.appendChild(m)}d.appendChild(p);let l=document.createElement("div");l.className="cc-gpc-honored",l.setAttribute("role","status"),l.append(N.check(),h("span",a.gpcHonored)),d.appendChild(l)}else if(e.policyUrl){let p=document.createElement("p");p.className="cc-gpc-notice",p.textContent=a.bannerText+" ";let l=document.createElement("a");l.href=e.policyUrl,l.target="_blank",l.rel="noopener",l.textContent=a.policyLinkText,p.appendChild(l),d.appendChild(p)}for(let p of R){let l=e.categories[p];l&&d.appendChild(me(p,l,e,n,i,k))}c.appendChild(d);let y=document.createElement("div");y.className="cc-panel cc-panel-detail",y.hidden=!0,c.appendChild(y);let g=document.createElement("div");g.className="cc-modal-actions",g.append(A(a.rejectNonEssential,o.onRejectNonEssential,"cc-secondary"),A(a.acceptAll,o.onAcceptAll,"cc-primary"),A(a.savePreferences,()=>o.onSave(v()),"cc-primary")),c.appendChild(g);let b=document.createElement("div");b.className="cc-modal-actions",b.hidden=!0,b.append(A(a.resetToDefault,C,"cc-secondary"),A(a.confirmChoices,()=>o.onSave(v()),"cc-primary")),c.appendChild(b);function v(){return{necessary:!0,analytics:i.analytics?.checked??!1,functional:i.functional?.checked??!1,marketing:i.marketing?.checked??!1}}function C(){Object.keys(i).forEach(p=>{let l=i[p];l&&(l.checked=e.categories[p]?.enabled??!1)})}function x(){y.hidden=!0,b.hidden=!0,d.hidden=!1,g.hidden=!1}function k(p){y.replaceChildren(be(p,e,x)),d.hidden=!0,g.hidden=!0,y.hidden=!1,b.hidden=!1}return r.appendChild(c),{overlay:r,dialog:c}}function me(e,n,t,o,a,i){let r=t.labels,c=document.createElement("div");c.className="cc-card";let s=document.createElement("div");if(s.className="cc-card-head",s.appendChild(h("h3",r.categoryNames[e])),n.locked){let d=document.createElement("span");d.className="cc-badge",d.textContent=r.alwaysActive,s.appendChild(d)}else s.appendChild(ge(e,o[e],r.categoryNames[e],a));c.appendChild(s);let f=document.createElement("p");f.className="cc-card-desc",f.textContent=n.description??r.categoryDescriptions[e],c.appendChild(f);let u=document.createElement("button");return u.type="button",u.className="cc-view-link",u.textContent=r.viewCookies,u.addEventListener("click",()=>i(e)),c.appendChild(u),c}function ge(e,n,t,o){let a=document.createElement("label");a.className="cc-switch";let i=document.createElement("input");i.type="checkbox",i.checked=n,i.setAttribute("aria-label",t);let r=document.createElement("span");return r.className="cc-slider",a.append(i,r),o[e]=i,a}function be(e,n,t){let o=n.labels,a=n.categories[e],i=document.createElement("div"),r=document.createElement("button");r.type="button",r.className="cc-back",r.append(N.back(),h("span",o.backToCategories)),r.addEventListener("click",t),i.appendChild(r),i.appendChild(h("h3",o.categoryNames[e],"cc-detail-title")),i.appendChild(h("p",a.description??o.categoryDescriptions[e],"cc-detail-desc"));let c=document.createElement("div");c.className="cc-toolbar";let s=document.createElement("input");s.type="search",s.className="cc-search",s.placeholder=o.searchPlaceholder,s.setAttribute("aria-label",o.searchPlaceholder);let f=Z(o.exportLabel,N.exportIcon(),()=>he(e,n)),u=Z(o.printLabel,N.print(),()=>Ce(e,n));c.append(s,f,u),i.appendChild(c);let d=document.createElement("table");d.className="cc-table";let y=document.createElement("thead"),g=document.createElement("tr");[o.columns.name,o.columns.provider,o.columns.domain,o.columns.expiry].forEach(x=>g.appendChild(h("th",x))),y.appendChild(g);let b=document.createElement("tbody");function v(x){b.replaceChildren();let k=x.trim().toLowerCase(),p=a.cookies.filter(l=>!k||[l.name,l.provider,l.domain,l.purpose].some(m=>(m||"").toLowerCase().includes(k)));if(p.length===0){let l=document.createElement("tr"),m=h("td",n.labels.noCookies);m.setAttribute("colspan","4"),m.className="cc-empty-row",l.appendChild(m),b.appendChild(l);return}for(let l of p){let m=document.createElement("tr");m.append(h("td",l.name,"cc-cell-name"),h("td",l.provider||o.notAvailable),h("td",l.domain||o.notAvailable),h("td",l.duration||o.notAvailable)),b.appendChild(m)}}v(""),s.addEventListener("input",()=>v(s.value)),d.append(y,b);let C=document.createElement("div");return C.className="cc-table-scroll",C.appendChild(d),i.appendChild(C),i}function ye(e,n){let t=n.labels,o=[t.columns.name,t.columns.provider,t.columns.domain,t.columns.expiry,"Purpose"],a=r=>`"${String(r).replace(/"/g,'""')}"`,i=[o.map(a).join(",")];for(let r of n.categories[e].cookies)i.push([r.name,r.provider||t.notAvailable,r.domain||t.notAvailable,r.duration||t.notAvailable,r.purpose||t.notAvailable].map(a).join(","));return i.join(`
`)}function he(e,n){try{let t=new Blob([ye(e,n)],{type:"text/csv;charset=utf-8"}),o=URL.createObjectURL(t),a=document.createElement("a");a.href=o,a.download=`cookies-${e}.csv`,a.click(),URL.revokeObjectURL(o)}catch{}}function Ce(e,n){let t=n.labels,o=window.open("","_blank","width=720,height=600");if(!o)return;let a=o.document;a.title=`${t.categoryNames[e]} \u2014 cookies`;let i=a.createElement("h2");i.textContent=t.categoryNames[e];let r=a.createElement("table");r.setAttribute("border","1"),r.style.borderCollapse="collapse";let c=a.createElement("thead"),s=a.createElement("tr");[t.columns.name,t.columns.provider,t.columns.domain,t.columns.expiry].forEach(u=>{let d=a.createElement("th");d.textContent=u,d.style.padding="6px 10px",s.appendChild(d)}),c.appendChild(s);let f=a.createElement("tbody");for(let u of n.categories[e].cookies){let d=a.createElement("tr");[u.name,u.provider||t.notAvailable,u.domain||t.notAvailable,u.duration||t.notAvailable].forEach(y=>{let g=a.createElement("td");g.textContent=y,g.style.padding="6px 10px",d.appendChild(g)}),f.appendChild(d)}r.append(c,f),a.body.append(i,r),o.focus(),o.print()}function h(e,n,t){let o=document.createElement(e);return o.textContent=n,t&&(o.className=t),o}function A(e,n,t){let o=document.createElement("button");return o.type="button",o.textContent=e,t&&(o.className=t),o.addEventListener("click",n),o}function Z(e,n,t){let o=document.createElement("button");return o.type="button",o.className="cc-icon-btn",o.append(n,h("span",e)),o.addEventListener("click",t),o}var ve='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function te(e,n,t){let o=n.activeElement;function a(){return Array.from(e.querySelectorAll(ve)).filter(c=>c.offsetParent!==null||c===n.activeElement)}function i(c){if(c.key==="Escape"){c.preventDefault(),t();return}if(c.key!=="Tab")return;let s=a();if(s.length===0){c.preventDefault();return}let f=s[0],u=s[s.length-1],d=n.activeElement;c.shiftKey&&(d===f||!e.contains(d))?(c.preventDefault(),u.focus()):!c.shiftKey&&d===u&&(c.preventDefault(),f.focus())}e.addEventListener("keydown",i);let r=a();return r.length>0&&r[0].focus(),{release(){e.removeEventListener("keydown",i),o&&typeof o.focus=="function"&&o.focus()}}}function K(e=typeof navigator<"u"?navigator:void 0){return e?e.globalPrivacyControl===!0:!1}var T="__cookieConsentInitialized",xe=new Set(["--cc-bg","--cc-fg","--cc-muted","--cc-border","--cc-surface","--cc-accent","--cc-accent-fg","--cc-success","--cc-success-bg","--cc-success-border","--cc-radius","--cc-font","--cc-font-size","--cc-heading-color","--cc-heading-size","--cc-z"]);function G(e){console.warn(`[cookie-banner-sdk] ${e} See https://github.com/ajitbubu/cookie-sdk#configuration`)}function ke(e,n){let t=["analytics","functional","marketing"].filter(o=>(n.categories[o]?.cookies?.length??0)>0);(!e.categories||t.length===0)&&G("no optional cookie categories are configured \u2014 the preferences modal will only show 'Strictly Necessary'. Pass `categories` with the cookies your site sets.");for(let o of Object.keys(n.theme??{})){let a=o.startsWith("--cc-")?o:`--cc-${o.replace(/^--/,"")}`;xe.has(a)||G(`theme key "${o}" is not a recognized --cc-* variable and will have no effect.`)}}function oe(){return{necessary:!0,analytics:!0,functional:!0,marketing:!0}}function ne(){return{necessary:!0,analytics:!1,functional:!1,marketing:!1}}function ae(e){let n=window;if(n[T])return G("init() called more than once \u2014 ignoring this call and returning the existing instance. Call destroy() first if you mean to re-initialize."),n[T];let t=P(e);ke(e,t);let o=t.honorGpc&&K(),a=H(t),i=q(t.theme),r=null,c=null,s=null,f=null;function u(){return{necessary:!0,analytics:t.categories.analytics?.enabled??!1,functional:t.categories.functional?.enabled??!1,marketing:o?!1:t.categories.marketing?.enabled??!1}}function d(p){a.write(p),Y(t,p),g(),C(),b()}function y(p=!0){r||(r=J(t.labels,{onAcceptAll:()=>d(oe()),onRejectAll:()=>d(ne()),onPreferences:v}),r.classList.add(`cc-pos-${t.position.banner}`),p||r.classList.add("cc-no-anim"),i.root.appendChild(r))}function g(){r?.remove(),r=null}function b(){c||(c=X(t.labels,v),c.classList.add(`cc-fab-${t.position.button}`),i.root.appendChild(c))}function v(){if(s)return;let p=a.read()?.categories??u(),l=ee(t,p,o,{onAcceptAll:()=>d(oe()),onRejectNonEssential:()=>d(ne()),onSave:m=>d(m),onClose:C});s=l.overlay,i.root.appendChild(s),r&&(r.setAttribute("inert",""),r.setAttribute("aria-hidden","true")),f=te(l.dialog,i.root,C)}function C(){f?.release(),f=null,s?.remove(),s=null,r&&(r.removeAttribute("inert"),r.removeAttribute("aria-hidden"))}a.needsPrompt()?y():b();function x(p){t=P(p),o=t.honorGpc&&K(),a=H(t),i.setTheme(t.theme);let l=!!s;C(),g(),c?.remove(),c=null,a.needsPrompt()?y(!1):b(),l&&v()}let k={destroy(){C(),i.destroy(),delete n[T]},openPreferences:v,getConsent(){return a.read()?.categories??null},update:x};return n[T]=k,k}function O(e={},n=typeof document<"u"?document:void 0){let t=e.cookieName??"cc_consent",o=e.waitForUpdate??500,a=n?E(t,n):null;W(a?a.categories:null,o)}typeof window<"u"&&O(window.CC_BOOTSTRAP||{});var we="cookie-settings",ce={cookieName:"faceoff_consent",consentVersion:1,expiryDays:182,policyUrl:"https://faceoff.world/page/cookie-preferences",honorGpc:!0,categories:{necessary:{enabled:!0,locked:!0,cookies:[{name:"faceoff_consent",provider:"faceoff.world",domain:"faceoff.world",purpose:"Stores your cookie choices",duration:"6 months"},{name:"session",provider:"faceoff.world",domain:"faceoff.world",purpose:"Keeps you signed in",duration:"Session"}]},analytics:{cookies:[{name:"_ga",provider:"Google Analytics",domain:"faceoff.world",purpose:"Distinguishes users",duration:"2 years"},{name:"_ga_*",provider:"Google Analytics",domain:"faceoff.world",purpose:"Persists session state",duration:"2 years"}]},functional:{cookies:[{name:"lang",provider:"faceoff.world",domain:"faceoff.world",purpose:"Remembers your language",duration:"1 year"}]},marketing:{cookies:[{name:"_fbp",provider:"Meta",domain:".faceoff.world",purpose:"Ad delivery & measurement",duration:"3 months"}]}},gtm:{consentMode:!0,dataLayerEvent:"cookie_consent_update"},theme:{"--cc-accent":"#DB2927"}};O({cookieName:ce.cookieName});function re(){let e=ae(ce);window.faceoffConsent=e;let n=document.getElementById(we);n&&n.addEventListener("click",t=>{t.preventDefault(),e.openPreferences()})}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",re):re());})();
