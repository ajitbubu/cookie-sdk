"use strict";var R=Object.defineProperty;var ne=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.prototype.hasOwnProperty;var ce=(e,o)=>{for(var t in o)R(e,t,{get:o[t],enumerable:!0})},ie=(e,o,t,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of ae(o))!re.call(e,a)&&a!==t&&R(e,a,{get:()=>o[a],enumerable:!(n=ne(o,a))||n.enumerable});return e};var se=e=>ie(R({},"__esModule",{value:!0}),e);var Ee={};ce(Ee,{init:()=>T});module.exports=se(Ee);var N={bannerText:"We use cookies to improve your experience. Choose which categories to allow.",acceptAll:"Accept All",rejectAll:"Reject All",preferences:"Preferences",modalTitle:"Cookie Preferences",rejectNonEssential:"Reject Non-Essential",savePreferences:"Save Preferences",reopenButton:"Cookie settings",alwaysActive:"Always Active",close:"Close",viewCookies:"View Cookies",backToCategories:"Back to categories",searchPlaceholder:"Search cookies...",exportLabel:"Export",printLabel:"Print",resetToDefault:"Reset to Default",confirmChoices:"Confirm Choices",policyLinkText:"Read our Cookie Policy",gpcNotice:"Your browser sent a Global Privacy Control (GPC) signal, so we have defaulted marketing and ad-targeting cookies to off. Strictly necessary cookies remain active to keep the site working. You may still review and enable optional analytics or functional cookies below, or leave them disabled \u2014 your choice is saved and can be changed at any time.",gpcHonored:"Opt-Out Request Honored",noCookies:"No cookies in this category.",notAvailable:"N/A",columns:{name:"Cookie",provider:"Provider",domain:"Domain",expiry:"Expiry"},categoryNames:{necessary:"Strictly Necessary Cookies",analytics:"Performance / Analytics",functional:"Functional Cookies",marketing:"Marketing Cookies"},categoryDescriptions:{necessary:"These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences.",analytics:"These cookies allow us to count visits and traffic sources so we can measure and improve site performance.",functional:"These cookies enable enhanced functionality and personalisation.",marketing:"These cookies are used to build a profile of your interests and show relevant ads. Covers sale or sharing of personal data where applicable."}},M=["necessary","analytics","functional","marketing"];function j(){return{necessary:{enabled:!0,locked:!0,cookies:[]},analytics:{enabled:!1,cookies:[]},functional:{enabled:!1,cookies:[]},marketing:{enabled:!1,cookies:[]}}}var w={cookieName:"cc_consent",consentVersion:1,expiryDays:182,honorGpc:!0,gtm:{consentMode:!0,dataLayerEvent:"cookie_consent_update"}};function z(e){let o={...j(),...e.categories||{}};return o.necessary={...o.necessary,enabled:!0,locked:!0},{cookieName:e.cookieName??w.cookieName,cookieDomain:e.cookieDomain,consentVersion:e.consentVersion??w.consentVersion,expiryDays:e.expiryDays??w.expiryDays,policyUrl:e.policyUrl,honorGpc:e.honorGpc??w.honorGpc,categories:o,gtm:{...w.gtm,...e.gtm||{}},labels:{...N,...e.labels||{},columns:{...N.columns,...e.labels?.columns||{}},categoryNames:{...N.categoryNames,...e.labels?.categoryNames||{}},categoryDescriptions:{...N.categoryDescriptions,...e.labels?.categoryDescriptions||{}}},theme:e.theme,onConsent:e.onConsent}}function K(e){let o={},t=e.getAttribute("data-cookie-name");t&&(o.cookieName=t);let n=e.getAttribute("data-cookie-domain");n&&(o.cookieDomain=n);let a=e.getAttribute("data-consent-version");a&&!Number.isNaN(Number(a))&&(o.consentVersion=Number(a));let i=e.getAttribute("data-expiry-days");i&&!Number.isNaN(Number(i))&&(o.expiryDays=Number(i));let r=e.getAttribute("data-policy-url");r&&(o.policyUrl=r);let c=e.getAttribute("data-consent-mode");return c!=null&&(o.gtm={consentMode:c!=="false",dataLayerEvent:w.gtm.dataLayerEvent}),o.categories=j(),o}var B={necessary:[],analytics:["analytics_storage"],functional:["functionality_storage","personalization_storage"],marketing:["ad_storage","ad_user_data","ad_personalization"]},I=["ad_storage","ad_user_data","ad_personalization","analytics_storage","functionality_storage","personalization_storage"];function V(e){let o={};for(let t of I)o[t]="denied";return Object.keys(B).forEach(t=>{if(e[t])for(let n of B[t])o[n]="granted"}),o}function le(e,o=document){let t=encodeURIComponent(e)+"=",n=o.cookie?o.cookie.split("; "):[];for(let a of n)if(a.indexOf(t)===0)return decodeURIComponent(a.slice(t.length));return null}function de(e){if(!e)return null;let o;try{o=JSON.parse(e)}catch{return null}if(typeof o!="object"||o===null)return null;let t=o;if(t.schemaVersion!==1||typeof t.timestamp!="string"||typeof t.version!="number")return null;let n=t.categories;if(typeof n!="object"||n===null)return null;let a=["necessary","analytics","functional","marketing"];for(let i of a)if(typeof n[i]!="boolean")return null;return{schemaVersion:1,version:t.version,timestamp:t.timestamp,categories:{...n,necessary:!0}}}function _(e,o=document){return de(le(e,o))}var D={};function ue(e,o,t){return{schemaVersion:1,version:e.consentVersion,timestamp:t,categories:{...o,necessary:!0}}}function F(e,o=document,t=()=>new Date){function n(){return _(e.cookieName,o)??D[e.cookieName]??null}function a(r){let c=ue(e,r,t().toISOString()),s=encodeURIComponent(JSON.stringify(c)),m=e.expiryDays*24*60*60,p=`${encodeURIComponent(e.cookieName)}=${s}; Max-Age=${m}; Path=/; SameSite=Lax`;e.cookieDomain&&(p+=`; Domain=${e.cookieDomain}`),typeof location<"u"&&location.protocol==="https:"&&(p+="; Secure");try{o.cookie=p,_(e.cookieName,o)===null&&(D[e.cookieName]=c,O())}catch{D[e.cookieName]=c,O()}return c}function i(){let r=n();return!r||r.version<e.consentVersion}return{read:n,write:a,needsPrompt:i}}var G=!1;function O(){!G&&typeof console<"u"&&(G=!0,console.warn("[cookie-banner-sdk] cookie write blocked; consent kept in memory for this session only."))}function me(){return typeof window<"u"?window:void 0}function ge(e){return e.dataLayer=e.dataLayer||[],e.gtag||(e.gtag=function(){e.dataLayer.push(arguments)}),e.gtag}function U(e,o){let t=me();e.gtm.consentMode&&t&&ge(t)("consent","update",V(o)),e.gtm.consentMode&&t&&Array.isArray(t.dataLayer)&&t.dataLayer.push({event:e.gtm.dataLayerEvent,consent:{...o}}),typeof e.onConsent=="function"&&e.onConsent({...o})}function Y(e){return`
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
    --cc-z: 2147483647;
    ${e?Object.entries(e).map(([t,n])=>`${t.startsWith("--cc-")?t:`--cc-${t}`}: ${n};`).join(`
    `):""}
    all: initial;
  }
  * { box-sizing: border-box; font-family: var(--cc-font); }
  /* [hidden] must beat class rules that set display (e.g. .cc-modal-actions{display:flex}). */
  [hidden] { display: none !important; }
  @keyframes cc-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
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
  .cc-banner p { margin: 0; flex: 1 1 280px; font-size: 14px; line-height: 1.5; }
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
    position: fixed; bottom: 16px; left: 16px; z-index: var(--cc-z);
    width: 46px; height: 46px; border-radius: 50%; padding: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--cc-bg); color: var(--cc-fg);
    box-shadow: 0 2px 10px rgba(0,0,0,0.18);
  }

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
  .cc-title h2 { margin: 0; font-size: 19px; font-weight: 600; }
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
  .cc-card-head h3 { margin: 0; font-size: 15.5px; font-weight: 600; }
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
  `}function $(e){let o=document.createElement("div");o.setAttribute("data-cookie-consent-root","");let t=o.attachShadow({mode:"open"}),n=document.createElement("style");return n.textContent=Y(e),t.appendChild(n),document.body.appendChild(o),{host:o,root:t,destroy(){o.remove()}}}function W(e,o){let t=document.createElement("div");t.className="cc-banner",t.setAttribute("role","dialog"),t.setAttribute("aria-label",e.modalTitle),t.setAttribute("aria-live","polite");let n=document.createElement("p");n.textContent=e.bannerText,t.appendChild(n);let a=document.createElement("div");a.className="cc-actions";let i=H(e.preferences,o.onPreferences,"cc-secondary"),r=H(e.rejectAll,o.onRejectAll,"cc-primary"),c=H(e.acceptAll,o.onAcceptAll,"cc-primary");return a.append(i,r,c),t.appendChild(a),t}function H(e,o,t){let n=document.createElement("button");return n.type="button",n.textContent=e,t&&(n.className=t),n.addEventListener("click",o),n}var P="http://www.w3.org/2000/svg";function fe(){let e=document.createElementNS(P,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","22"),e.setAttribute("height","22"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.8"),e.setAttribute("aria-hidden","true");let o=document.createElementNS(P,"path");o.setAttribute("d","M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4-4 4 4 0 0 1-4-4 2 2 0 0 0-2-2z"),e.appendChild(o);for(let[t,n]of[[9,9],[14,12],[10,15]]){let a=document.createElementNS(P,"circle");a.setAttribute("cx",String(t)),a.setAttribute("cy",String(n)),a.setAttribute("r","1"),a.setAttribute("fill","currentColor"),a.setAttribute("stroke","none"),e.appendChild(a)}return e}function q(e,o){let t=document.createElement("button");return t.type="button",t.className="cc-fab",t.setAttribute("aria-label",e.reopenButton),t.title=e.reopenButton,t.appendChild(fe()),t.addEventListener("click",o),t}var J="http://www.w3.org/2000/svg";function E(e,o={}){let t=document.createElementNS(J,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","18"),t.setAttribute("height","18"),t.setAttribute("fill",o.fill?"currentColor":"none"),t.setAttribute("stroke",o.fill?"none":"currentColor"),t.setAttribute("stroke-width","1.8"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.setAttribute("aria-hidden","true");for(let n of e){let a=document.createElementNS(J,"path");a.setAttribute("d",n),t.appendChild(a)}return t}var S={gear:()=>E(["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.1-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z"]),check:()=>E(["M20 6 9 17l-5-5"]),back:()=>E(["M19 12H5","M12 19l-7-7 7-7"]),exportIcon:()=>E(["M12 3v12","M8 7l4-4 4 4","M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"]),print:()=>E(["M6 9V2h12v7","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 14h12v8H6z"])};function Q(e,o,t,n){let a=e.labels,i={},r=document.createElement("div");r.className="cc-overlay",r.addEventListener("click",u=>{u.target===r&&n.onClose()});let c=document.createElement("div");c.className="cc-modal",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),c.setAttribute("aria-label",a.modalTitle);let s=document.createElement("div");s.className="cc-modal-header";let m=document.createElement("div");m.className="cc-title",m.append(S.gear(),y("h2",a.modalTitle));let p=document.createElement("button");p.type="button",p.className="cc-close",p.setAttribute("aria-label",a.close),p.append(y("span","\u2715","cc-close-x")),p.addEventListener("click",n.onClose),s.append(m,p),c.appendChild(s);let l=document.createElement("div");if(l.className="cc-panel cc-panel-categories",t){let u=document.createElement("p");if(u.className="cc-gpc-notice",u.textContent=a.gpcNotice+" ",e.policyUrl){let b=document.createElement("a");b.href=e.policyUrl,b.target="_blank",b.rel="noopener",b.textContent=a.policyLinkText,u.appendChild(b)}l.appendChild(u);let d=document.createElement("div");d.className="cc-gpc-honored",d.setAttribute("role","status"),d.append(S.check(),y("span",a.gpcHonored)),l.appendChild(d)}else if(e.policyUrl){let u=document.createElement("p");u.className="cc-gpc-notice",u.textContent=a.bannerText+" ";let d=document.createElement("a");d.href=e.policyUrl,d.target="_blank",d.rel="noopener",d.textContent=a.policyLinkText,u.appendChild(d),l.appendChild(u)}for(let u of M){let d=e.categories[u];d&&l.appendChild(be(u,d,e,o,i,x))}c.appendChild(l);let h=document.createElement("div");h.className="cc-panel cc-panel-detail",h.hidden=!0,c.appendChild(h);let g=document.createElement("div");g.className="cc-modal-actions",g.append(A(a.rejectNonEssential,n.onRejectNonEssential,"cc-secondary"),A(a.acceptAll,n.onAcceptAll,"cc-primary"),A(a.savePreferences,()=>n.onSave(v()),"cc-primary")),c.appendChild(g);let f=document.createElement("div");f.className="cc-modal-actions",f.hidden=!0,f.append(A(a.resetToDefault,C,"cc-secondary"),A(a.confirmChoices,()=>n.onSave(v()),"cc-primary")),c.appendChild(f);function v(){return{necessary:!0,analytics:i.analytics?.checked??!1,functional:i.functional?.checked??!1,marketing:i.marketing?.checked??!1}}function C(){Object.keys(i).forEach(u=>{let d=i[u];d&&(d.checked=e.categories[u]?.enabled??!1)})}function k(){h.hidden=!0,f.hidden=!0,l.hidden=!1,g.hidden=!1}function x(u){h.replaceChildren(he(u,e,k)),l.hidden=!0,g.hidden=!0,h.hidden=!1,f.hidden=!1}return r.appendChild(c),{overlay:r,dialog:c}}function be(e,o,t,n,a,i){let r=t.labels,c=document.createElement("div");c.className="cc-card";let s=document.createElement("div");if(s.className="cc-card-head",s.appendChild(y("h3",r.categoryNames[e])),o.locked){let l=document.createElement("span");l.className="cc-badge",l.textContent=r.alwaysActive,s.appendChild(l)}else s.appendChild(ye(e,n[e],r.categoryNames[e],a));c.appendChild(s);let m=document.createElement("p");m.className="cc-card-desc",m.textContent=o.description??r.categoryDescriptions[e],c.appendChild(m);let p=document.createElement("button");return p.type="button",p.className="cc-view-link",p.textContent=r.viewCookies,p.addEventListener("click",()=>i(e)),c.appendChild(p),c}function ye(e,o,t,n){let a=document.createElement("label");a.className="cc-switch";let i=document.createElement("input");i.type="checkbox",i.checked=o,i.setAttribute("aria-label",t);let r=document.createElement("span");return r.className="cc-slider",a.append(i,r),n[e]=i,a}function he(e,o,t){let n=o.labels,a=o.categories[e],i=document.createElement("div"),r=document.createElement("button");r.type="button",r.className="cc-back",r.append(S.back(),y("span",n.backToCategories)),r.addEventListener("click",t),i.appendChild(r),i.appendChild(y("h3",n.categoryNames[e],"cc-detail-title")),i.appendChild(y("p",a.description??n.categoryDescriptions[e],"cc-detail-desc"));let c=document.createElement("div");c.className="cc-toolbar";let s=document.createElement("input");s.type="search",s.className="cc-search",s.placeholder=n.searchPlaceholder,s.setAttribute("aria-label",n.searchPlaceholder);let m=X(n.exportLabel,S.exportIcon(),()=>ve(e,o)),p=X(n.printLabel,S.print(),()=>xe(e,o));c.append(s,m,p),i.appendChild(c);let l=document.createElement("table");l.className="cc-table";let h=document.createElement("thead"),g=document.createElement("tr");[n.columns.name,n.columns.provider,n.columns.domain,n.columns.expiry].forEach(k=>g.appendChild(y("th",k))),h.appendChild(g);let f=document.createElement("tbody");function v(k){f.replaceChildren();let x=k.trim().toLowerCase(),u=a.cookies.filter(d=>!x||[d.name,d.provider,d.domain,d.purpose].some(b=>(b||"").toLowerCase().includes(x)));if(u.length===0){let d=document.createElement("tr"),b=y("td",o.labels.noCookies);b.setAttribute("colspan","4"),b.className="cc-empty-row",d.appendChild(b),f.appendChild(d);return}for(let d of u){let b=document.createElement("tr");b.append(y("td",d.name,"cc-cell-name"),y("td",d.provider||n.notAvailable),y("td",d.domain||n.notAvailable),y("td",d.duration||n.notAvailable)),f.appendChild(b)}}v(""),s.addEventListener("input",()=>v(s.value)),l.append(h,f);let C=document.createElement("div");return C.className="cc-table-scroll",C.appendChild(l),i.appendChild(C),i}function Ce(e,o){let t=o.labels,n=[t.columns.name,t.columns.provider,t.columns.domain,t.columns.expiry,"Purpose"],a=r=>`"${String(r).replace(/"/g,'""')}"`,i=[n.map(a).join(",")];for(let r of o.categories[e].cookies)i.push([r.name,r.provider||t.notAvailable,r.domain||t.notAvailable,r.duration||t.notAvailable,r.purpose||t.notAvailable].map(a).join(","));return i.join(`
`)}function ve(e,o){try{let t=new Blob([Ce(e,o)],{type:"text/csv;charset=utf-8"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`cookies-${e}.csv`,a.click(),URL.revokeObjectURL(n)}catch{}}function xe(e,o){let t=o.labels,n=window.open("","_blank","width=720,height=600");if(!n)return;let a=n.document;a.title=`${t.categoryNames[e]} \u2014 cookies`;let i=a.createElement("h2");i.textContent=t.categoryNames[e];let r=a.createElement("table");r.setAttribute("border","1"),r.style.borderCollapse="collapse";let c=a.createElement("thead"),s=a.createElement("tr");[t.columns.name,t.columns.provider,t.columns.domain,t.columns.expiry].forEach(p=>{let l=a.createElement("th");l.textContent=p,l.style.padding="6px 10px",s.appendChild(l)}),c.appendChild(s);let m=a.createElement("tbody");for(let p of o.categories[e].cookies){let l=a.createElement("tr");[p.name,p.provider||t.notAvailable,p.domain||t.notAvailable,p.duration||t.notAvailable].forEach(h=>{let g=a.createElement("td");g.textContent=h,g.style.padding="6px 10px",l.appendChild(g)}),m.appendChild(l)}r.append(c,m),a.body.append(i,r),n.focus(),n.print()}function y(e,o,t){let n=document.createElement(e);return n.textContent=o,t&&(n.className=t),n}function A(e,o,t){let n=document.createElement("button");return n.type="button",n.textContent=e,t&&(n.className=t),n.addEventListener("click",o),n}function X(e,o,t){let n=document.createElement("button");return n.type="button",n.className="cc-icon-btn",n.append(o,y("span",e)),n.addEventListener("click",t),n}var ke='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Z(e,o,t){let n=o.activeElement;function a(){return Array.from(e.querySelectorAll(ke)).filter(c=>c.offsetParent!==null||c===o.activeElement)}function i(c){if(c.key==="Escape"){c.preventDefault(),t();return}if(c.key!=="Tab")return;let s=a();if(s.length===0){c.preventDefault();return}let m=s[0],p=s[s.length-1],l=o.activeElement;c.shiftKey&&(l===m||!e.contains(l))?(c.preventDefault(),p.focus()):!c.shiftKey&&l===p&&(c.preventDefault(),m.focus())}e.addEventListener("keydown",i);let r=a();return r.length>0&&r[0].focus(),{release(){e.removeEventListener("keydown",i),n&&typeof n.focus=="function"&&n.focus()}}}function ee(e=typeof navigator<"u"?navigator:void 0){return e?e.globalPrivacyControl===!0:!1}var L="__cookieConsentInitialized";function te(){return{necessary:!0,analytics:!0,functional:!0,marketing:!0}}function oe(){return{necessary:!0,analytics:!1,functional:!1,marketing:!1}}function T(e){let o=window;if(o[L])return o[L];let t=z(e),n=t.honorGpc&&ee(),a=F(t),i=$(t.theme),r=null,c=null,s=null,m=null;function p(){return{necessary:!0,analytics:t.categories.analytics?.enabled??!1,functional:t.categories.functional?.enabled??!1,marketing:n?!1:t.categories.marketing?.enabled??!1}}function l(x){a.write(x),U(t,x),g(),C(),f()}function h(){r||(r=W(t.labels,{onAcceptAll:()=>l(te()),onRejectAll:()=>l(oe()),onPreferences:v}),i.root.appendChild(r))}function g(){r?.remove(),r=null}function f(){c||(c=q(t.labels,v),i.root.appendChild(c))}function v(){if(s)return;let x=a.read()?.categories??p(),u=Q(t,x,n,{onAcceptAll:()=>l(te()),onRejectNonEssential:()=>l(oe()),onSave:d=>l(d),onClose:C});s=u.overlay,i.root.appendChild(s),r&&(r.setAttribute("inert",""),r.setAttribute("aria-hidden","true")),m=Z(u.dialog,i.root,C)}function C(){m?.release(),m=null,s?.remove(),s=null,r&&(r.removeAttribute("inert"),r.removeAttribute("aria-hidden"))}a.needsPrompt()?h():f();let k={destroy(){C(),i.destroy(),delete o[L]},openPreferences:v,getConsent(){return a.read()?.categories??null}};return o[L]=k,k}function we(){if(typeof document>"u")return;let e=document.currentScript??document.querySelector("script[data-auto-init]");e&&e.hasAttribute("data-auto-init")&&T(K(e))}typeof window<"u"&&(window.CookieConsent={init:T},we());0&&(module.exports={init});
//# sourceMappingURL=cookie-consent.cjs.map