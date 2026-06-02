"use strict";var CookieConsent=(()=>{var g={cookieName:"varindia_consent",consentVersion:1,expiryDays:182,policyUrl:"https://varindia.com/news/privacy-policy",honorGpc:!0,labels:{bannerText:"Privacy is our priority. We do not sell or otherwise share personal information for money or anything of value. We use strictly necessary cookies to enable site functionality and improve the performance of our website. We also store cookies to personalize the website content and to serve more relevant content to you. For more information, please visit our Privacy Policy or Cookie Policy."},theme:{"--cc-accent":"#DB2927"},gtm:{consentMode:!0,dataLayerEvent:"cookie_consent_update"},categories:{necessary:{enabled:!0,locked:!0,cookies:[{name:"varindia_consent",provider:"varindia.com",domain:"varindia.com",purpose:"Stores your cookie choices",duration:"6 months"},{name:"session",provider:"varindia.com",domain:"varindia.com",purpose:"Keeps you signed in",duration:"Session"}]},analytics:{cookies:[{name:"_ga",provider:"Google Analytics",domain:"varindia.com",purpose:"Distinguishes users",duration:"2 years"},{name:"_ga_*",provider:"Google Analytics",domain:"varindia.com",purpose:"Persists session state",duration:"2 years"}]},functional:{cookies:[{name:"lang",provider:"varindia.com",domain:"varindia.com",purpose:"Remembers your language",duration:"1 year"}]},marketing:{cookies:[{name:"_fbp",provider:"Meta",domain:".varindia.com",purpose:"Ad delivery & measurement",duration:"3 months"}]}}};var _={bannerText:"Privacy is our priority. We do not sell or otherwise share personal information for money or anything of value. We use strictly necessary cookies to enable site functionality and improve the performance of our website. We also store cookies to personalize the website content and to serve more relevant content to you. For more information, please visit our Privacy Policy or Cookie Policy.",acceptAll:"Accept All",rejectAll:"Reject All",preferences:"Preferences",modalTitle:"Cookie Preferences",rejectNonEssential:"Reject Non-Essential",savePreferences:"Save Preferences",reopenButton:"Cookie settings",alwaysActive:"Always Active",close:"Close",viewCookies:"View Cookies",backToCategories:"Back to categories",searchPlaceholder:"Search cookies...",exportLabel:"Export",printLabel:"Print",resetToDefault:"Reset to Default",confirmChoices:"Confirm Choices",policyLinkText:"Read our Cookie Policy",gpcNotice:"Your browser sent a Global Privacy Control (GPC) signal, so we have defaulted marketing and ad-targeting cookies to off. Strictly necessary cookies remain active to keep the site working. You may still review and enable optional analytics or functional cookies below, or leave them disabled \u2014 your choice is saved and can be changed at any time.",gpcHonored:"Opt-Out Request Honored",noCookies:"No cookies in this category.",notAvailable:"N/A",columns:{name:"Cookie",provider:"Provider",domain:"Domain",expiry:"Expiry"},categoryNames:{necessary:"Strictly Necessary Cookies",analytics:"Performance / Analytics",functional:"Functional Cookies",marketing:"Marketing Cookies"},categoryDescriptions:{necessary:"These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences.",analytics:"These cookies allow us to count visits and traffic sources so we can measure and improve site performance.",functional:"These cookies enable enhanced functionality and personalisation.",marketing:"These cookies are used to build a profile of your interests and show relevant ads. Covers sale or sharing of personal data where applicable."}},R=["necessary","analytics","functional","marketing"];function le(){return{necessary:{enabled:!0,locked:!0,cookies:[]},analytics:{enabled:!1,cookies:[]},functional:{enabled:!1,cookies:[]},marketing:{enabled:!1,cookies:[]}}}var E={cookieName:"cc_consent",consentVersion:1,expiryDays:182,honorGpc:!0,gtm:{consentMode:!0,dataLayerEvent:"cookie_consent_update"}};function P(e){let n={...le(),...e.categories||{}};n.necessary={...n.necessary,enabled:!0,locked:!0};let t=e.position??{};return{cookieName:e.cookieName??E.cookieName,cookieDomain:e.cookieDomain,consentVersion:e.consentVersion??E.consentVersion,expiryDays:e.expiryDays??E.expiryDays,policyUrl:e.policyUrl,honorGpc:e.honorGpc??E.honorGpc,position:{banner:t.banner??"bottom",button:t.button??"bottom-left"},categories:n,gtm:{...E.gtm,...e.gtm||{}},labels:{..._,...e.labels||{},columns:{..._.columns,...e.labels?.columns||{}},categoryNames:{..._.categoryNames,...e.labels?.categoryNames||{}},categoryDescriptions:{..._.categoryDescriptions,...e.labels?.categoryDescriptions||{}}},theme:e.theme,onConsent:e.onConsent}}var V={necessary:[],analytics:["analytics_storage"],functional:["functionality_storage","personalization_storage"],marketing:["ad_storage","ad_user_data","ad_personalization"]},M=["ad_storage","ad_user_data","ad_personalization","analytics_storage","functionality_storage","personalization_storage"];function D(e){let n={};for(let t of M)n[t]="denied";return Object.keys(V).forEach(t=>{if(e[t])for(let o of V[t])n[o]="granted"}),n}function de(e,n=document){let t=encodeURIComponent(e)+"=",o=n.cookie?n.cookie.split("; "):[];for(let a of o)if(a.indexOf(t)===0)return decodeURIComponent(a.slice(t.length));return null}function pe(e){if(!e)return null;let n;try{n=JSON.parse(e)}catch{return null}if(typeof n!="object"||n===null)return null;let t=n;if(t.schemaVersion!==1||typeof t.timestamp!="string"||typeof t.version!="number")return null;let o=t.categories;if(typeof o!="object"||o===null)return null;let a=["necessary","analytics","functional","marketing"];for(let i of a)if(typeof o[i]!="boolean")return null;return{schemaVersion:1,version:t.version,timestamp:t.timestamp,categories:{...o,necessary:!0}}}function S(e,n=document){return pe(de(e,n))}var H={};function me(e,n,t){return{schemaVersion:1,version:e.consentVersion,timestamp:t,categories:{...n,necessary:!0}}}function z(e,n=document,t=()=>new Date){function o(){return S(e.cookieName,n)??H[e.cookieName]??null}function a(r){let c=me(e,r,t().toISOString()),s=encodeURIComponent(JSON.stringify(c)),m=e.expiryDays*24*60*60,u=`${encodeURIComponent(e.cookieName)}=${s}; Max-Age=${m}; Path=/; SameSite=Lax`;e.cookieDomain&&(u+=`; Domain=${e.cookieDomain}`),typeof location<"u"&&location.protocol==="https:"&&(u+="; Secure");try{n.cookie=u,S(e.cookieName,n)===null&&(H[e.cookieName]=c,U())}catch{H[e.cookieName]=c,U()}return c}function i(){let r=o();return!r||r.version<e.consentVersion}return{read:o,write:a,needsPrompt:i}}var F=!1;function U(){!F&&typeof console<"u"&&(F=!0,console.warn("[cookie-banner-sdk] cookie write blocked; consent kept in memory for this session only."))}function W(){return typeof window<"u"?window:void 0}function $(e){return e.dataLayer=e.dataLayer||[],e.gtag||(e.gtag=function(){e.dataLayer.push(arguments)}),e.gtag}function Y(e,n=500,t=W()){if(!t)return;let o=$(t),a=e?D(e):M.reduce((i,r)=>(i[r]="denied",i),{});o("consent","default",{...a,wait_for_update:n})}function q(e,n){let t=W();e.gtm.consentMode&&t&&$(t)("consent","update",D(n)),e.gtm.consentMode&&t&&Array.isArray(t.dataLayer)&&t.dataLayer.push({event:e.gtm.dataLayerEvent,consent:{...n}}),typeof e.onConsent=="function"&&e.onConsent({...n})}function B(e){return`
  :host {
    /* Reset/define every consumed var so inherited host values can't leak in. */
    --cc-bg: #ffffff;
    --cc-fg: #111827;
    --cc-muted: #6b7280;
    --cc-border: #e5e7eb;
    --cc-surface: #f9fafb;
    --cc-accent: #e02424;
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
  `}function J(e){let n=document.createElement("div");n.setAttribute("data-cookie-consent-root","");let t=n.attachShadow({mode:"open"}),o=B(e),a=fe(t,o),i=null;return a||(i=document.createElement("style"),i.textContent=o,t.appendChild(i)),document.body.appendChild(n),{host:n,root:t,setTheme(r){let c=B(r);a?a.replaceSync(c):i&&(i.textContent=c)},destroy(){n.remove()}}}function fe(e,n){try{if(typeof CSSStyleSheet>"u"||typeof CSSStyleSheet.prototype.replaceSync!="function"||!("adoptedStyleSheets"in e))return null;let t=new CSSStyleSheet;return t.replaceSync(n),e.adoptedStyleSheets=[...e.adoptedStyleSheets,t],t}catch{return null}}function X(e,n){let t=document.createElement("div");t.className="cc-banner",t.setAttribute("role","dialog"),t.setAttribute("aria-label",e.modalTitle),t.setAttribute("aria-live","polite");let o=document.createElement("p");o.textContent=e.bannerText,t.appendChild(o);let a=document.createElement("div");a.className="cc-actions";let i=G(e.preferences,n.onPreferences,"cc-secondary"),r=G(e.rejectAll,n.onRejectAll,"cc-primary"),c=G(e.acceptAll,n.onAcceptAll,"cc-primary");return a.append(i,r,c),t.appendChild(a),t}function G(e,n,t){let o=document.createElement("button");return o.type="button",o.textContent=e,t&&(o.className=t),o.addEventListener("click",n),o}var I="http://www.w3.org/2000/svg";function ge(){let e=document.createElementNS(I,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","37"),e.setAttribute("height","37"),e.setAttribute("fill","#e02424"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.8"),e.setAttribute("aria-hidden","true");let n=document.createElementNS(I,"path");n.setAttribute("d","M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4-4 4 4 0 0 1-4-4 2 2 0 0 0-2-2z"),e.appendChild(n);for(let[t,o]of[[9,9],[14,12],[10,15]]){let a=document.createElementNS(I,"circle");a.setAttribute("cx",String(t)),a.setAttribute("cy",String(o)),a.setAttribute("r","1"),a.setAttribute("fill","currentColor"),a.setAttribute("stroke","none"),e.appendChild(a)}return e}function Q(e,n){let t=document.createElement("button");return t.type="button",t.className="cc-fab",t.setAttribute("aria-label",e.reopenButton),t.title=e.reopenButton,t.appendChild(ge()),t.addEventListener("click",n),t}var Z="http://www.w3.org/2000/svg";function A(e,n={}){let t=document.createElementNS(Z,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","18"),t.setAttribute("height","18"),t.setAttribute("fill",n.fill?"currentColor":"none"),t.setAttribute("stroke",n.fill?"none":"currentColor"),t.setAttribute("stroke-width","1.8"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.setAttribute("aria-hidden","true");for(let o of e){let a=document.createElementNS(Z,"path");a.setAttribute("d",o),t.appendChild(a)}return t}var L={gear:()=>A(["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.1-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z"]),check:()=>A(["M20 6 9 17l-5-5"]),back:()=>A(["M19 12H5","M12 19l-7-7 7-7"]),exportIcon:()=>A(["M12 3v12","M8 7l4-4 4 4","M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"]),print:()=>A(["M6 9V2h12v7","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 14h12v8H6z"])};function te(e,n,t,o){let a=e.labels,i={},r=document.createElement("div");r.className="cc-overlay",r.addEventListener("click",p=>{p.target===r&&o.onClose()});let c=document.createElement("div");c.className="cc-modal",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),c.setAttribute("aria-label",a.modalTitle);let s=document.createElement("div");s.className="cc-modal-header";let m=document.createElement("div");m.className="cc-title",m.append(L.gear(),C("h2",a.modalTitle));let u=document.createElement("button");u.type="button",u.className="cc-close",u.setAttribute("aria-label",a.close),u.append(C("span","\u2715","cc-close-x")),u.addEventListener("click",o.onClose),s.append(m,u),c.appendChild(s);let d=document.createElement("div");if(d.className="cc-panel cc-panel-categories",t){let p=document.createElement("p");if(p.className="cc-gpc-notice",p.textContent=a.gpcNotice+" ",e.policyUrl){let f=document.createElement("a");f.href=e.policyUrl,f.target="_blank",f.rel="noopener",f.textContent=a.policyLinkText,p.appendChild(f)}d.appendChild(p);let l=document.createElement("div");l.className="cc-gpc-honored",l.setAttribute("role","status"),l.append(L.check(),C("span",a.gpcHonored)),d.appendChild(l)}else if(e.policyUrl){let p=document.createElement("p");p.className="cc-gpc-notice",p.textContent=a.bannerText+" ";let l=document.createElement("a");l.href=e.policyUrl,l.target="_blank",l.rel="noopener",l.textContent=a.policyLinkText,p.appendChild(l),d.appendChild(p)}for(let p of R){let l=e.categories[p];l&&d.appendChild(be(p,l,e,n,i,w))}c.appendChild(d);let h=document.createElement("div");h.className="cc-panel cc-panel-detail",h.hidden=!0,c.appendChild(h);let b=document.createElement("div");b.className="cc-modal-actions",b.append(N(a.rejectNonEssential,o.onRejectNonEssential,"cc-secondary"),N(a.acceptAll,o.onAcceptAll,"cc-primary"),N(a.savePreferences,()=>o.onSave(x()),"cc-primary")),c.appendChild(b);let y=document.createElement("div");y.className="cc-modal-actions",y.hidden=!0,y.append(N(a.resetToDefault,v,"cc-secondary"),N(a.confirmChoices,()=>o.onSave(x()),"cc-primary")),c.appendChild(y);function x(){return{necessary:!0,analytics:i.analytics?.checked??!1,functional:i.functional?.checked??!1,marketing:i.marketing?.checked??!1}}function v(){Object.keys(i).forEach(p=>{let l=i[p];l&&(l.checked=e.categories[p]?.enabled??!1)})}function k(){h.hidden=!0,y.hidden=!0,d.hidden=!1,b.hidden=!1}function w(p){h.replaceChildren(he(p,e,k)),d.hidden=!0,b.hidden=!0,h.hidden=!1,y.hidden=!1}return r.appendChild(c),{overlay:r,dialog:c}}function be(e,n,t,o,a,i){let r=t.labels,c=document.createElement("div");c.className="cc-card";let s=document.createElement("div");if(s.className="cc-card-head",s.appendChild(C("h3",r.categoryNames[e])),n.locked){let d=document.createElement("span");d.className="cc-badge",d.textContent=r.alwaysActive,s.appendChild(d)}else s.appendChild(ye(e,o[e],r.categoryNames[e],a));c.appendChild(s);let m=document.createElement("p");m.className="cc-card-desc",m.textContent=n.description??r.categoryDescriptions[e],c.appendChild(m);let u=document.createElement("button");return u.type="button",u.className="cc-view-link",u.textContent=r.viewCookies,u.addEventListener("click",()=>i(e)),c.appendChild(u),c}function ye(e,n,t,o){let a=document.createElement("label");a.className="cc-switch";let i=document.createElement("input");i.type="checkbox",i.checked=n,i.setAttribute("aria-label",t);let r=document.createElement("span");return r.className="cc-slider",a.append(i,r),o[e]=i,a}function he(e,n,t){let o=n.labels,a=n.categories[e],i=document.createElement("div"),r=document.createElement("button");r.type="button",r.className="cc-back",r.append(L.back(),C("span",o.backToCategories)),r.addEventListener("click",t),i.appendChild(r),i.appendChild(C("h3",o.categoryNames[e],"cc-detail-title")),i.appendChild(C("p",a.description??o.categoryDescriptions[e],"cc-detail-desc"));let c=document.createElement("div");c.className="cc-toolbar";let s=document.createElement("input");s.type="search",s.className="cc-search",s.placeholder=o.searchPlaceholder,s.setAttribute("aria-label",o.searchPlaceholder);let m=ee(o.exportLabel,L.exportIcon(),()=>ve(e,n)),u=ee(o.printLabel,L.print(),()=>xe(e,n));c.append(s,m,u),i.appendChild(c);let d=document.createElement("table");d.className="cc-table";let h=document.createElement("thead"),b=document.createElement("tr");[o.columns.name,o.columns.provider,o.columns.domain,o.columns.expiry].forEach(k=>b.appendChild(C("th",k))),h.appendChild(b);let y=document.createElement("tbody");function x(k){y.replaceChildren();let w=k.trim().toLowerCase(),p=a.cookies.filter(l=>!w||[l.name,l.provider,l.domain,l.purpose].some(f=>(f||"").toLowerCase().includes(w)));if(p.length===0){let l=document.createElement("tr"),f=C("td",n.labels.noCookies);f.setAttribute("colspan","4"),f.className="cc-empty-row",l.appendChild(f),y.appendChild(l);return}for(let l of p){let f=document.createElement("tr");f.append(C("td",l.name,"cc-cell-name"),C("td",l.provider||o.notAvailable),C("td",l.domain||o.notAvailable),C("td",l.duration||o.notAvailable)),y.appendChild(f)}}x(""),s.addEventListener("input",()=>x(s.value)),d.append(h,y);let v=document.createElement("div");return v.className="cc-table-scroll",v.appendChild(d),i.appendChild(v),i}function Ce(e,n){let t=n.labels,o=[t.columns.name,t.columns.provider,t.columns.domain,t.columns.expiry,"Purpose"],a=r=>`"${String(r).replace(/"/g,'""')}"`,i=[o.map(a).join(",")];for(let r of n.categories[e].cookies)i.push([r.name,r.provider||t.notAvailable,r.domain||t.notAvailable,r.duration||t.notAvailable,r.purpose||t.notAvailable].map(a).join(","));return i.join(`
`)}function ve(e,n){try{let t=new Blob([Ce(e,n)],{type:"text/csv;charset=utf-8"}),o=URL.createObjectURL(t),a=document.createElement("a");a.href=o,a.download=`cookies-${e}.csv`,a.click(),URL.revokeObjectURL(o)}catch{}}function xe(e,n){let t=n.labels,o=window.open("","_blank","width=720,height=600");if(!o)return;let a=o.document;a.title=`${t.categoryNames[e]} \u2014 cookies`;let i=a.createElement("h2");i.textContent=t.categoryNames[e];let r=a.createElement("table");r.setAttribute("border","1"),r.style.borderCollapse="collapse";let c=a.createElement("thead"),s=a.createElement("tr");[t.columns.name,t.columns.provider,t.columns.domain,t.columns.expiry].forEach(u=>{let d=a.createElement("th");d.textContent=u,d.style.padding="6px 10px",s.appendChild(d)}),c.appendChild(s);let m=a.createElement("tbody");for(let u of n.categories[e].cookies){let d=a.createElement("tr");[u.name,u.provider||t.notAvailable,u.domain||t.notAvailable,u.duration||t.notAvailable].forEach(h=>{let b=a.createElement("td");b.textContent=h,b.style.padding="6px 10px",d.appendChild(b)}),m.appendChild(d)}r.append(c,m),a.body.append(i,r),o.focus(),o.print()}function C(e,n,t){let o=document.createElement(e);return o.textContent=n,t&&(o.className=t),o}function N(e,n,t){let o=document.createElement("button");return o.type="button",o.textContent=e,t&&(o.className=t),o.addEventListener("click",n),o}function ee(e,n,t){let o=document.createElement("button");return o.type="button",o.className="cc-icon-btn",o.append(n,C("span",e)),o.addEventListener("click",t),o}var ke='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function oe(e,n,t){let o=n.activeElement;function a(){return Array.from(e.querySelectorAll(ke)).filter(c=>c.offsetParent!==null||c===n.activeElement)}function i(c){if(c.key==="Escape"){c.preventDefault(),t();return}if(c.key!=="Tab")return;let s=a();if(s.length===0){c.preventDefault();return}let m=s[0],u=s[s.length-1],d=n.activeElement;c.shiftKey&&(d===m||!e.contains(d))?(c.preventDefault(),u.focus()):!c.shiftKey&&d===u&&(c.preventDefault(),m.focus())}e.addEventListener("keydown",i);let r=a();return r.length>0&&r[0].focus(),{release(){e.removeEventListener("keydown",i),o&&typeof o.focus=="function"&&o.focus()}}}function j(e=typeof navigator<"u"?navigator:void 0){return e?e.globalPrivacyControl===!0:!1}var T="__cookieConsentInitialized",we=new Set(["--cc-bg","--cc-fg","--cc-muted","--cc-border","--cc-surface","--cc-accent","--cc-accent-fg","--cc-success","--cc-success-bg","--cc-success-border","--cc-radius","--cc-font","--cc-font-size","--cc-heading-color","--cc-heading-size","--cc-z"]);function K(e){console.warn(`[cookie-banner-sdk] ${e} See https://github.com/ajitbubu/cookie-sdk#configuration`)}function Ee(e,n){let t=["analytics","functional","marketing"].filter(o=>(n.categories[o]?.cookies?.length??0)>0);(!e.categories||t.length===0)&&K("no optional cookie categories are configured \u2014 the preferences modal will only show 'Strictly Necessary'. Pass `categories` with the cookies your site sets.");for(let o of Object.keys(n.theme??{})){let a=o.startsWith("--cc-")?o:`--cc-${o.replace(/^--/,"")}`;we.has(a)||K(`theme key "${o}" is not a recognized --cc-* variable and will have no effect.`)}}function ne(){return{necessary:!0,analytics:!0,functional:!0,marketing:!0}}function ae(){return{necessary:!0,analytics:!1,functional:!1,marketing:!1}}function re(e){let n=window;if(n[T])return K("init() called more than once \u2014 ignoring this call and returning the existing instance. Call destroy() first if you mean to re-initialize."),n[T];let t=P(e);Ee(e,t);let o=t.honorGpc&&j(),a=z(t),i=J(t.theme),r=null,c=null,s=null,m=null;function u(){return{necessary:!0,analytics:t.categories.analytics?.enabled??!1,functional:t.categories.functional?.enabled??!1,marketing:o?!1:t.categories.marketing?.enabled??!1}}function d(p){a.write(p),q(t,p),b(),v(),y()}function h(p=!0){r||(r=X(t.labels,{onAcceptAll:()=>d(ne()),onRejectAll:()=>d(ae()),onPreferences:x}),r.classList.add(`cc-pos-${t.position.banner}`),p||r.classList.add("cc-no-anim"),i.root.appendChild(r))}function b(){r?.remove(),r=null}function y(){c||(c=Q(t.labels,x),c.classList.add(`cc-fab-${t.position.button}`),i.root.appendChild(c))}function x(){if(s)return;let p=a.read()?.categories??u(),l=te(t,p,o,{onAcceptAll:()=>d(ne()),onRejectNonEssential:()=>d(ae()),onSave:f=>d(f),onClose:v});s=l.overlay,i.root.appendChild(s),r&&(r.setAttribute("inert",""),r.setAttribute("aria-hidden","true")),m=oe(l.dialog,i.root,v)}function v(){m?.release(),m=null,s?.remove(),s=null,r&&(r.removeAttribute("inert"),r.removeAttribute("aria-hidden"))}a.needsPrompt()?h():y();function k(p){t=P(p),o=t.honorGpc&&j(),a=z(t),i.setTheme(t.theme);let l=!!s;v(),b(),c?.remove(),c=null,a.needsPrompt()?h(!1):y(),l&&x()}let w={destroy(){v(),i.destroy(),delete n[T]},openPreferences:x,getConsent(){return a.read()?.categories??null},update:k};return n[T]=w,w}function O(e={},n=typeof document<"u"?document:void 0){let t=e.cookieName??"cc_consent",o=e.waitForUpdate??500,a=n?S(t,n):null;Y(a?a.categories:null,o)}typeof window<"u"&&O(window.CC_BOOTSTRAP||{});var Se="cookie-settings",ie=typeof g<"u"?g:{cookieName:"cc_consent",consentVersion:1,expiryDays:182,honorGpc:!0,gtm:{consentMode:!0,dataLayerEvent:"cookie_consent_update"},theme:{"--cc-accent":"#DB2927"}};O({cookieName:ie.cookieName});function ce(){let e=re(ie),n=window;n.cookieConsent=e,n.faceoffConsent=e;let t=document.getElementById(Se);t&&t.addEventListener("click",o=>{o.preventDefault(),e.openPreferences()})}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ce):ce());})();
