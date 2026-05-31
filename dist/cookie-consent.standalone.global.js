"use strict";(()=>{var L={bannerText:"We use cookies to improve your experience. Choose which categories to allow.",acceptAll:"Accept All",rejectAll:"Reject All",preferences:"Preferences",modalTitle:"Cookie Preferences",rejectNonEssential:"Reject Non-Essential",savePreferences:"Save Preferences",reopenButton:"Cookie settings",alwaysActive:"Always Active",close:"Close",viewCookies:"View Cookies",backToCategories:"Back to categories",searchPlaceholder:"Search cookies...",exportLabel:"Export",printLabel:"Print",resetToDefault:"Reset to Default",confirmChoices:"Confirm Choices",policyLinkText:"Read our Cookie Policy",gpcNotice:"Your browser sent a Global Privacy Control (GPC) signal, so we have defaulted marketing and ad-targeting cookies to off. Strictly necessary cookies remain active to keep the site working. You may still review and enable optional analytics or functional cookies below, or leave them disabled \u2014 your choice is saved and can be changed at any time.",gpcHonored:"Opt-Out Request Honored",noCookies:"No cookies in this category.",notAvailable:"N/A",columns:{name:"Cookie",provider:"Provider",domain:"Domain",expiry:"Expiry"},categoryNames:{necessary:"Strictly Necessary Cookies",analytics:"Performance / Analytics",functional:"Functional Cookies",marketing:"Marketing Cookies"},categoryDescriptions:{necessary:"These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences.",analytics:"These cookies allow us to count visits and traffic sources so we can measure and improve site performance.",functional:"These cookies enable enhanced functionality and personalisation.",marketing:"These cookies are used to build a profile of your interests and show relevant ads. Covers sale or sharing of personal data where applicable."}},R=["necessary","analytics","functional","marketing"];function ie(){return{necessary:{enabled:!0,locked:!0,cookies:[]},analytics:{enabled:!1,cookies:[]},functional:{enabled:!1,cookies:[]},marketing:{enabled:!1,cookies:[]}}}var w={cookieName:"cc_consent",consentVersion:1,expiryDays:182,honorGpc:!0,gtm:{consentMode:!0,dataLayerEvent:"cookie_consent_update"}};function j(e){let n={...ie(),...e.categories||{}};n.necessary={...n.necessary,enabled:!0,locked:!0};let t=e.position??{};return{cookieName:e.cookieName??w.cookieName,cookieDomain:e.cookieDomain,consentVersion:e.consentVersion??w.consentVersion,expiryDays:e.expiryDays??w.expiryDays,policyUrl:e.policyUrl,honorGpc:e.honorGpc??w.honorGpc,position:{banner:t.banner??"bottom",button:t.button??"bottom-left"},categories:n,gtm:{...w.gtm,...e.gtm||{}},labels:{...L,...e.labels||{},columns:{...L.columns,...e.labels?.columns||{}},categoryNames:{...L.categoryNames,...e.labels?.categoryNames||{}},categoryDescriptions:{...L.categoryDescriptions,...e.labels?.categoryDescriptions||{}}},theme:e.theme,onConsent:e.onConsent}}var K={necessary:[],analytics:["analytics_storage"],functional:["functionality_storage","personalization_storage"],marketing:["ad_storage","ad_user_data","ad_personalization"]},M=["ad_storage","ad_user_data","ad_personalization","analytics_storage","functionality_storage","personalization_storage"];function _(e){let n={};for(let t of M)n[t]="denied";return Object.keys(K).forEach(t=>{if(e[t])for(let o of K[t])n[o]="granted"}),n}function se(e,n=document){let t=encodeURIComponent(e)+"=",o=n.cookie?n.cookie.split("; "):[];for(let a of o)if(a.indexOf(t)===0)return decodeURIComponent(a.slice(t.length));return null}function le(e){if(!e)return null;let n;try{n=JSON.parse(e)}catch{return null}if(typeof n!="object"||n===null)return null;let t=n;if(t.schemaVersion!==1||typeof t.timestamp!="string"||typeof t.version!="number")return null;let o=t.categories;if(typeof o!="object"||o===null)return null;let a=["necessary","analytics","functional","marketing"];for(let i of a)if(typeof o[i]!="boolean")return null;return{schemaVersion:1,version:t.version,timestamp:t.timestamp,categories:{...o,necessary:!0}}}function E(e,n=document){return le(se(e,n))}var P={};function pe(e,n,t){return{schemaVersion:1,version:e.consentVersion,timestamp:t,categories:{...n,necessary:!0}}}function O(e,n=document,t=()=>new Date){function o(){return E(e.cookieName,n)??P[e.cookieName]??null}function a(r){let c=pe(e,r,t().toISOString()),s=encodeURIComponent(JSON.stringify(c)),f=e.expiryDays*24*60*60,p=`${encodeURIComponent(e.cookieName)}=${s}; Max-Age=${f}; Path=/; SameSite=Lax`;e.cookieDomain&&(p+=`; Domain=${e.cookieDomain}`),typeof location<"u"&&location.protocol==="https:"&&(p+="; Secure");try{n.cookie=p,E(e.cookieName,n)===null&&(P[e.cookieName]=c,I())}catch{P[e.cookieName]=c,I()}return c}function i(){let r=o();return!r||r.version<e.consentVersion}return{read:o,write:a,needsPrompt:i}}var G=!1;function I(){!G&&typeof console<"u"&&(G=!0,console.warn("[cookie-banner-sdk] cookie write blocked; consent kept in memory for this session only."))}function V(){return typeof window<"u"?window:void 0}function F(e){return e.dataLayer=e.dataLayer||[],e.gtag||(e.gtag=function(){e.dataLayer.push(arguments)}),e.gtag}function U(e,n=500,t=V()){if(!t)return;let o=F(t),a=e?_(e):M.reduce((i,r)=>(i[r]="denied",i),{});o("consent","default",{...a,wait_for_update:n})}function $(e,n){let t=V();e.gtm.consentMode&&t&&F(t)("consent","update",_(n)),e.gtm.consentMode&&t&&Array.isArray(t.dataLayer)&&t.dataLayer.push({event:e.gtm.dataLayerEvent,consent:{...n}}),typeof e.onConsent=="function"&&e.onConsent({...n})}function Y(e){return`
  :host {
    /* Reset/define every consumed var so inherited host values can't leak in. */
    --cc-bg: #ffffff;
    --cc-fg: #111827;
    --cc-muted: #6b7280;
    --cc-border: #e5e7eb;
    --cc-surface: #f9fafb;
    --cc-accent: #2563eb;
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
    background: var(--cc-bg); color: var(--cc-fg); transition: background 0.12s, border-color 0.12s;
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
  `}function W(e){let n=document.createElement("div");n.setAttribute("data-cookie-consent-root","");let t=n.attachShadow({mode:"open"}),o=document.createElement("style");return o.textContent=Y(e),t.appendChild(o),document.body.appendChild(n),{host:n,root:t,destroy(){n.remove()}}}function q(e,n){let t=document.createElement("div");t.className="cc-banner",t.setAttribute("role","dialog"),t.setAttribute("aria-label",e.modalTitle),t.setAttribute("aria-live","polite");let o=document.createElement("p");o.textContent=e.bannerText,t.appendChild(o);let a=document.createElement("div");a.className="cc-actions";let i=D(e.preferences,n.onPreferences,"cc-secondary"),r=D(e.rejectAll,n.onRejectAll,"cc-primary"),c=D(e.acceptAll,n.onAcceptAll,"cc-primary");return a.append(i,r,c),t.appendChild(a),t}function D(e,n,t){let o=document.createElement("button");return o.type="button",o.textContent=e,t&&(o.className=t),o.addEventListener("click",n),o}var H="http://www.w3.org/2000/svg";function ue(){let e=document.createElementNS(H,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","22"),e.setAttribute("height","22"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.8"),e.setAttribute("aria-hidden","true");let n=document.createElementNS(H,"path");n.setAttribute("d","M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4-4 4 4 0 0 1-4-4 2 2 0 0 0-2-2z"),e.appendChild(n);for(let[t,o]of[[9,9],[14,12],[10,15]]){let a=document.createElementNS(H,"circle");a.setAttribute("cx",String(t)),a.setAttribute("cy",String(o)),a.setAttribute("r","1"),a.setAttribute("fill","currentColor"),a.setAttribute("stroke","none"),e.appendChild(a)}return e}function J(e,n){let t=document.createElement("button");return t.type="button",t.className="cc-fab",t.setAttribute("aria-label",e.reopenButton),t.title=e.reopenButton,t.appendChild(ue()),t.addEventListener("click",n),t}var X="http://www.w3.org/2000/svg";function A(e,n={}){let t=document.createElementNS(X,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","18"),t.setAttribute("height","18"),t.setAttribute("fill",n.fill?"currentColor":"none"),t.setAttribute("stroke",n.fill?"none":"currentColor"),t.setAttribute("stroke-width","1.8"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.setAttribute("aria-hidden","true");for(let o of e){let a=document.createElementNS(X,"path");a.setAttribute("d",o),t.appendChild(a)}return t}var N={gear:()=>A(["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.1-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z"]),check:()=>A(["M20 6 9 17l-5-5"]),back:()=>A(["M19 12H5","M12 19l-7-7 7-7"]),exportIcon:()=>A(["M12 3v12","M8 7l4-4 4 4","M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"]),print:()=>A(["M6 9V2h12v7","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 14h12v8H6z"])};function Z(e,n,t,o){let a=e.labels,i={},r=document.createElement("div");r.className="cc-overlay",r.addEventListener("click",u=>{u.target===r&&o.onClose()});let c=document.createElement("div");c.className="cc-modal",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),c.setAttribute("aria-label",a.modalTitle);let s=document.createElement("div");s.className="cc-modal-header";let f=document.createElement("div");f.className="cc-title",f.append(N.gear(),y("h2",a.modalTitle));let p=document.createElement("button");p.type="button",p.className="cc-close",p.setAttribute("aria-label",a.close),p.append(y("span","\u2715","cc-close-x")),p.addEventListener("click",o.onClose),s.append(f,p),c.appendChild(s);let l=document.createElement("div");if(l.className="cc-panel cc-panel-categories",t){let u=document.createElement("p");if(u.className="cc-gpc-notice",u.textContent=a.gpcNotice+" ",e.policyUrl){let b=document.createElement("a");b.href=e.policyUrl,b.target="_blank",b.rel="noopener",b.textContent=a.policyLinkText,u.appendChild(b)}l.appendChild(u);let d=document.createElement("div");d.className="cc-gpc-honored",d.setAttribute("role","status"),d.append(N.check(),y("span",a.gpcHonored)),l.appendChild(d)}else if(e.policyUrl){let u=document.createElement("p");u.className="cc-gpc-notice",u.textContent=a.bannerText+" ";let d=document.createElement("a");d.href=e.policyUrl,d.target="_blank",d.rel="noopener",d.textContent=a.policyLinkText,u.appendChild(d),l.appendChild(u)}for(let u of R){let d=e.categories[u];d&&l.appendChild(fe(u,d,e,n,i,x))}c.appendChild(l);let h=document.createElement("div");h.className="cc-panel cc-panel-detail",h.hidden=!0,c.appendChild(h);let m=document.createElement("div");m.className="cc-modal-actions",m.append(S(a.rejectNonEssential,o.onRejectNonEssential,"cc-secondary"),S(a.acceptAll,o.onAcceptAll,"cc-primary"),S(a.savePreferences,()=>o.onSave(v()),"cc-primary")),c.appendChild(m);let g=document.createElement("div");g.className="cc-modal-actions",g.hidden=!0,g.append(S(a.resetToDefault,C,"cc-secondary"),S(a.confirmChoices,()=>o.onSave(v()),"cc-primary")),c.appendChild(g);function v(){return{necessary:!0,analytics:i.analytics?.checked??!1,functional:i.functional?.checked??!1,marketing:i.marketing?.checked??!1}}function C(){Object.keys(i).forEach(u=>{let d=i[u];d&&(d.checked=e.categories[u]?.enabled??!1)})}function k(){h.hidden=!0,g.hidden=!0,l.hidden=!1,m.hidden=!1}function x(u){h.replaceChildren(ge(u,e,k)),l.hidden=!0,m.hidden=!0,h.hidden=!1,g.hidden=!1}return r.appendChild(c),{overlay:r,dialog:c}}function fe(e,n,t,o,a,i){let r=t.labels,c=document.createElement("div");c.className="cc-card";let s=document.createElement("div");if(s.className="cc-card-head",s.appendChild(y("h3",r.categoryNames[e])),n.locked){let l=document.createElement("span");l.className="cc-badge",l.textContent=r.alwaysActive,s.appendChild(l)}else s.appendChild(me(e,o[e],r.categoryNames[e],a));c.appendChild(s);let f=document.createElement("p");f.className="cc-card-desc",f.textContent=n.description??r.categoryDescriptions[e],c.appendChild(f);let p=document.createElement("button");return p.type="button",p.className="cc-view-link",p.textContent=r.viewCookies,p.addEventListener("click",()=>i(e)),c.appendChild(p),c}function me(e,n,t,o){let a=document.createElement("label");a.className="cc-switch";let i=document.createElement("input");i.type="checkbox",i.checked=n,i.setAttribute("aria-label",t);let r=document.createElement("span");return r.className="cc-slider",a.append(i,r),o[e]=i,a}function ge(e,n,t){let o=n.labels,a=n.categories[e],i=document.createElement("div"),r=document.createElement("button");r.type="button",r.className="cc-back",r.append(N.back(),y("span",o.backToCategories)),r.addEventListener("click",t),i.appendChild(r),i.appendChild(y("h3",o.categoryNames[e],"cc-detail-title")),i.appendChild(y("p",a.description??o.categoryDescriptions[e],"cc-detail-desc"));let c=document.createElement("div");c.className="cc-toolbar";let s=document.createElement("input");s.type="search",s.className="cc-search",s.placeholder=o.searchPlaceholder,s.setAttribute("aria-label",o.searchPlaceholder);let f=Q(o.exportLabel,N.exportIcon(),()=>ye(e,n)),p=Q(o.printLabel,N.print(),()=>he(e,n));c.append(s,f,p),i.appendChild(c);let l=document.createElement("table");l.className="cc-table";let h=document.createElement("thead"),m=document.createElement("tr");[o.columns.name,o.columns.provider,o.columns.domain,o.columns.expiry].forEach(k=>m.appendChild(y("th",k))),h.appendChild(m);let g=document.createElement("tbody");function v(k){g.replaceChildren();let x=k.trim().toLowerCase(),u=a.cookies.filter(d=>!x||[d.name,d.provider,d.domain,d.purpose].some(b=>(b||"").toLowerCase().includes(x)));if(u.length===0){let d=document.createElement("tr"),b=y("td",n.labels.noCookies);b.setAttribute("colspan","4"),b.className="cc-empty-row",d.appendChild(b),g.appendChild(d);return}for(let d of u){let b=document.createElement("tr");b.append(y("td",d.name,"cc-cell-name"),y("td",d.provider||o.notAvailable),y("td",d.domain||o.notAvailable),y("td",d.duration||o.notAvailable)),g.appendChild(b)}}v(""),s.addEventListener("input",()=>v(s.value)),l.append(h,g);let C=document.createElement("div");return C.className="cc-table-scroll",C.appendChild(l),i.appendChild(C),i}function be(e,n){let t=n.labels,o=[t.columns.name,t.columns.provider,t.columns.domain,t.columns.expiry,"Purpose"],a=r=>`"${String(r).replace(/"/g,'""')}"`,i=[o.map(a).join(",")];for(let r of n.categories[e].cookies)i.push([r.name,r.provider||t.notAvailable,r.domain||t.notAvailable,r.duration||t.notAvailable,r.purpose||t.notAvailable].map(a).join(","));return i.join(`
`)}function ye(e,n){try{let t=new Blob([be(e,n)],{type:"text/csv;charset=utf-8"}),o=URL.createObjectURL(t),a=document.createElement("a");a.href=o,a.download=`cookies-${e}.csv`,a.click(),URL.revokeObjectURL(o)}catch{}}function he(e,n){let t=n.labels,o=window.open("","_blank","width=720,height=600");if(!o)return;let a=o.document;a.title=`${t.categoryNames[e]} \u2014 cookies`;let i=a.createElement("h2");i.textContent=t.categoryNames[e];let r=a.createElement("table");r.setAttribute("border","1"),r.style.borderCollapse="collapse";let c=a.createElement("thead"),s=a.createElement("tr");[t.columns.name,t.columns.provider,t.columns.domain,t.columns.expiry].forEach(p=>{let l=a.createElement("th");l.textContent=p,l.style.padding="6px 10px",s.appendChild(l)}),c.appendChild(s);let f=a.createElement("tbody");for(let p of n.categories[e].cookies){let l=a.createElement("tr");[p.name,p.provider||t.notAvailable,p.domain||t.notAvailable,p.duration||t.notAvailable].forEach(h=>{let m=a.createElement("td");m.textContent=h,m.style.padding="6px 10px",l.appendChild(m)}),f.appendChild(l)}r.append(c,f),a.body.append(i,r),o.focus(),o.print()}function y(e,n,t){let o=document.createElement(e);return o.textContent=n,t&&(o.className=t),o}function S(e,n,t){let o=document.createElement("button");return o.type="button",o.textContent=e,t&&(o.className=t),o.addEventListener("click",n),o}function Q(e,n,t){let o=document.createElement("button");return o.type="button",o.className="cc-icon-btn",o.append(n,y("span",e)),o.addEventListener("click",t),o}var Ce='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function ee(e,n,t){let o=n.activeElement;function a(){return Array.from(e.querySelectorAll(Ce)).filter(c=>c.offsetParent!==null||c===n.activeElement)}function i(c){if(c.key==="Escape"){c.preventDefault(),t();return}if(c.key!=="Tab")return;let s=a();if(s.length===0){c.preventDefault();return}let f=s[0],p=s[s.length-1],l=n.activeElement;c.shiftKey&&(l===f||!e.contains(l))?(c.preventDefault(),p.focus()):!c.shiftKey&&l===p&&(c.preventDefault(),f.focus())}e.addEventListener("keydown",i);let r=a();return r.length>0&&r[0].focus(),{release(){e.removeEventListener("keydown",i),o&&typeof o.focus=="function"&&o.focus()}}}function te(e=typeof navigator<"u"?navigator:void 0){return e?e.globalPrivacyControl===!0:!1}var T="__cookieConsentInitialized",ve=new Set(["--cc-bg","--cc-fg","--cc-muted","--cc-border","--cc-surface","--cc-accent","--cc-accent-fg","--cc-success","--cc-success-bg","--cc-success-border","--cc-radius","--cc-font","--cc-font-size","--cc-heading-color","--cc-heading-size","--cc-z"]);function z(e){console.warn(`[cookie-banner-sdk] ${e} See https://github.com/ajitbubu/cookie-sdk#configuration`)}function xe(e,n){let t=["analytics","functional","marketing"].filter(o=>(n.categories[o]?.cookies?.length??0)>0);(!e.categories||t.length===0)&&z("no optional cookie categories are configured \u2014 the preferences modal will only show 'Strictly Necessary'. Pass `categories` with the cookies your site sets.");for(let o of Object.keys(n.theme??{})){let a=o.startsWith("--cc-")?o:`--cc-${o.replace(/^--/,"")}`;ve.has(a)||z(`theme key "${o}" is not a recognized --cc-* variable and will have no effect.`)}}function oe(){return{necessary:!0,analytics:!0,functional:!0,marketing:!0}}function ne(){return{necessary:!0,analytics:!1,functional:!1,marketing:!1}}function ae(e){let n=window;if(n[T])return z("init() called more than once \u2014 ignoring this call and returning the existing instance. Call destroy() first if you mean to re-initialize."),n[T];let t=j(e);xe(e,t);let o=t.honorGpc&&te(),a=O(t),i=W(t.theme),r=null,c=null,s=null,f=null;function p(){return{necessary:!0,analytics:t.categories.analytics?.enabled??!1,functional:t.categories.functional?.enabled??!1,marketing:o?!1:t.categories.marketing?.enabled??!1}}function l(x){a.write(x),$(t,x),m(),C(),g()}function h(){r||(r=q(t.labels,{onAcceptAll:()=>l(oe()),onRejectAll:()=>l(ne()),onPreferences:v}),r.classList.add(`cc-pos-${t.position.banner}`),i.root.appendChild(r))}function m(){r?.remove(),r=null}function g(){c||(c=J(t.labels,v),c.classList.add(`cc-fab-${t.position.button}`),i.root.appendChild(c))}function v(){if(s)return;let x=a.read()?.categories??p(),u=Z(t,x,o,{onAcceptAll:()=>l(oe()),onRejectNonEssential:()=>l(ne()),onSave:d=>l(d),onClose:C});s=u.overlay,i.root.appendChild(s),r&&(r.setAttribute("inert",""),r.setAttribute("aria-hidden","true")),f=ee(u.dialog,i.root,C)}function C(){f?.release(),f=null,s?.remove(),s=null,r&&(r.removeAttribute("inert"),r.removeAttribute("aria-hidden"))}a.needsPrompt()?h():g();let k={destroy(){C(),i.destroy(),delete n[T]},openPreferences:v,getConsent(){return a.read()?.categories??null}};return n[T]=k,k}function B(e={},n=typeof document<"u"?document:void 0){let t=e.cookieName??"cc_consent",o=e.waitForUpdate??500,a=n?E(t,n):null;U(a?a.categories:null,o)}typeof window<"u"&&B(window.CC_BOOTSTRAP||{});var ke="cookie-settings",ce={cookieName:"faceoff_consent",consentVersion:1,expiryDays:182,policyUrl:"https://faceoff.world/cookie-policy",honorGpc:!0,categories:{necessary:{enabled:!0,locked:!0,cookies:[{name:"faceoff_consent",provider:"faceoff.world",domain:"faceoff.world",purpose:"Stores your cookie choices",duration:"6 months"},{name:"session",provider:"faceoff.world",domain:"faceoff.world",purpose:"Keeps you signed in",duration:"Session"}]},analytics:{cookies:[{name:"_ga",provider:"Google Analytics",domain:"faceoff.world",purpose:"Distinguishes users",duration:"2 years"},{name:"_ga_*",provider:"Google Analytics",domain:"faceoff.world",purpose:"Persists session state",duration:"2 years"}]},functional:{cookies:[{name:"lang",provider:"faceoff.world",domain:"faceoff.world",purpose:"Remembers your language",duration:"1 year"}]},marketing:{cookies:[{name:"_fbp",provider:"Meta",domain:".faceoff.world",purpose:"Ad delivery & measurement",duration:"3 months"}]}},gtm:{consentMode:!0,dataLayerEvent:"cookie_consent_update"},theme:{"--cc-accent":"#2563eb"}};B({cookieName:ce.cookieName});function re(){let e=ae(ce);window.faceoffConsent=e;let n=document.getElementById(ke);n&&n.addEventListener("click",t=>{t.preventDefault(),e.openPreferences()})}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",re):re());})();
