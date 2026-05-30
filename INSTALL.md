# Installation & Usage Guide

`cookie-banner-sdk` is a drop-in cookie consent banner with Google Consent Mode v2
signaling, a CMP-style preferences modal, Shadow-DOM style isolation, and zero runtime
dependencies. This guide covers **every way to install and use it** — plain HTML, a
single handoff file, data-attribute auto-init, npm/bundlers, and every major framework
and CMS.

> Compliance note: this is a consent UI + Consent Mode v2 signaling tool, **not a
> certified CMP**. It has no server-side proof-of-consent log and no IAB TCF string.
> See [README.md](README.md) → "What this is / isn't".

---

## 1. The build artifacts

Run `npm install && npm run build` to produce `dist/`:

| File | Format | Use |
|------|--------|-----|
| `dist/cookie-consent.global.js` | IIFE (browser `<script>`) | Main bundle — renders the banner/modal. Exposes `window.CookieConsent`. |
| `dist/cc-bootstrap.global.js` | IIFE | ~1KB synchronous shim — pushes the Consent Mode default **before GTM**. |
| `dist/cookie-consent.standalone.global.js` | IIFE, config baked in, minified | **Single-file handoff** — one `<script>`, no config on the page. |
| `dist/cookie-consent.js` | ESM | `import` in a bundler (Vite, webpack, Next, etc.). |
| `dist/cookie-consent.cjs` | CommonJS | `require()` in Node/CJS. |
| `dist/cookie-consent.d.ts` | Types | TypeScript definitions. |

On a published npm package these are also reachable via CDN, e.g.
`https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cookie-consent.global.js`.

---

## 2. Which method should I use?

| Your situation | Use | Section |
|----------------|-----|---------|
| Plain HTML site, you control the `<head>` | Two-script + `init()` | [3](#3-method-a--two-script-recommended) |
| You hand the site **one file + an id**, nothing else | Standalone single file | [4](#4-method-b--single-file-handoff) |
| Simple site, no JS config, just attributes | Data-attribute auto-init | [5](#5-method-c--data-attribute-auto-init) |
| React / Next / Vue / Angular / bundler app | npm + `import` | [6](#6-method-d--npm--bundlers--frameworks) |
| WordPress / Shopify / Webflow / GTM-injected | CMS / platform | [7](#7-cms--platform-installs) |

All methods share the same config and behavior — only the delivery differs.

---

## 3. Method A — Two-script (recommended)

Best control. Two scripts: the tiny bootstrap (above GTM) and the main bundle.

```html
<head>
  <!-- (optional) warm the CDN connection before the blocking bootstrap -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" />

  <!-- 1. Bootstrap — MUST be ABOVE the GTM snippet. Sets Consent Mode defaults to
          denied before any tag evaluates. -->
  <script>window.CC_BOOTSTRAP = { cookieName: "cc_consent" };</script>
  <script src="https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cc-bootstrap.global.js"></script>

  <!-- ...your Google Tag Manager snippet here... -->

  <!-- 2. Main bundle — renders the banner/modal. Can load anywhere after. -->
  <script src="https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cookie-consent.global.js"></script>
  <script>
    CookieConsent.init({
      cookieName: "cc_consent",          // MUST match CC_BOOTSTRAP.cookieName
      cookieDomain: ".example.com",      // share across subdomains; omit for current host
      consentVersion: 1,                 // bump to re-prompt everyone after a policy change
      expiryDays: 182,
      policyUrl: "https://example.com/cookie-policy",
      honorGpc: true,
      categories: {
        necessary:  { enabled: true, locked: true, cookies: [
          { name: "cc_consent", provider: "Your site", domain: "example.com", purpose: "Stores consent", duration: "6 months" }
        ] },
        analytics:  { cookies: [
          { name: "_ga", provider: "Google", domain: "example.com", purpose: "Analytics", duration: "2 years" }
        ] },
        functional: { cookies: [] },
        marketing:  { cookies: [] }
      },
      gtm: { consentMode: true, dataLayerEvent: "cookie_consent_update" },
      theme: { "--cc-accent": "#2563eb" },
      onConsent: (categories) => { /* runs on every save; use if you have no GTM */ }
    });
  </script>
</head>
```

The `CC_BOOTSTRAP.cookieName` **must equal** `init({ cookieName })` so the bootstrap
reads the same cookie the main bundle writes.

---

## 4. Method B — Single-file handoff

When you give a site **one JavaScript file and one placeholder id, nothing else**. The
config is baked into the file (see [`src/standalone.ts`](src/standalone.ts)).

**You (once):** edit `SITE_CONFIG` / `TRIGGER_ID` at the top of `src/standalone.ts`,
then `npm run build`, and hand over `dist/cookie-consent.standalone.global.js`.

**The site adds exactly this:**

```html
<head>
  <!-- (A) the one file, ABOVE their GTM snippet -->
  <script src="https://your-cdn/cookie-consent.standalone.global.js"></script>
  <!-- ...their GTM snippet... -->
</head>
<body>
  <footer>
    <!-- (B) the placeholder id — opens preferences when clicked (optional) -->
    <a href="#" id="cookie-settings">Cookie settings</a>
  </footer>
</body>
```

No `init()`, no config, no second script. The file self-executes: pushes the denied
default synchronously, renders the banner on first visit, shows the floating button
after a choice, and wires `#cookie-settings` to open preferences. Full walkthrough:
[`example/README.md`](example/README.md). Live demo: [`example/faceoff.html`](example/faceoff.html).

---

## 5. Method C — Data-attribute auto-init

No JavaScript config block — configure trivial options on the script tag. (Cookie
tables still require `init()`, so use this only when you don't need per-cookie detail.)

```html
<head>
  <script>window.CC_BOOTSTRAP = { cookieName: "cc_consent" };</script>
  <script src="https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cc-bootstrap.global.js"></script>
  <!-- ...GTM... -->
  <script
    src="https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cookie-consent.global.js"
    data-auto-init
    data-cookie-name="cc_consent"
    data-cookie-domain=".example.com"
    data-consent-version="1"
    data-expiry-days="182"
    data-policy-url="https://example.com/cookie-policy"
    data-consent-mode="true"></script>
</head>
```

Supported attributes: `data-auto-init` (required to trigger), `data-cookie-name`,
`data-cookie-domain`, `data-consent-version`, `data-expiry-days`, `data-policy-url`,
`data-consent-mode`. `data-auto-init` and a manual `init()` are mutually exclusive —
if both are present, `init()` wins and a console warning is logged.

---

## 6. Method D — npm + bundlers / frameworks

Install:

```bash
npm install cookie-banner-sdk
```

`import` (ESM/TypeScript), `require` (CJS), and types all resolve. The SDK is
**client-only** — never call `init()` during server-side rendering.

### Plain ESM / Vite / webpack

```ts
import { init } from "cookie-banner-sdk";

const consent = init({
  cookieName: "cc_consent",
  policyUrl: "/cookie-policy",
  categories: {
    necessary:  { enabled: true, locked: true, cookies: [] },
    analytics:  { cookies: [{ name: "_ga", provider: "Google", domain: location.hostname, purpose: "Analytics", duration: "2 years" }] },
    functional: { cookies: [] },
    marketing:  { cookies: [] },
  },
  onConsent: (c) => console.log("consent:", c),
});
```

> Bundler note: the bootstrap (denied-default-before-GTM) is a separate concern. In a
> bundled app where GTM is also loaded by your app, either import and call the bootstrap
> equivalent first, or keep the tiny `cc-bootstrap.global.js` as a plain `<script>` in
> your HTML `<head>` above GTM. The npm `init()` handles the UI + `consent update`.

### React

```tsx
import { useEffect, useRef } from "react";
import { init, type CookieConsentInstance } from "cookie-banner-sdk";

export function CookieConsent() {
  const ref = useRef<CookieConsentInstance | null>(null);
  useEffect(() => {
    ref.current = init({
      cookieName: "cc_consent",
      categories: {
        necessary:  { enabled: true, locked: true, cookies: [] },
        analytics:  { cookies: [] },
        functional: { cookies: [] },
        marketing:  { cookies: [] },
      },
    });
    return () => ref.current?.destroy();
  }, []);
  return null; // the SDK renders itself into document.body via Shadow DOM
}
```

Render `<CookieConsent />` once near the app root. To open preferences from a footer
link: `ref.current?.openPreferences()` (lift the ref or expose via context).

### Next.js (App Router)

```tsx
// app/cookie-consent.tsx
"use client";
import { useEffect } from "react";
import { init } from "cookie-banner-sdk";

export default function CookieConsent() {
  useEffect(() => { init({ cookieName: "cc_consent", categories: { /* ... */ } as any }); }, []);
  return null;
}
```

```tsx
// app/layout.tsx — render the client component inside <body>
import CookieConsent from "./cookie-consent";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html><body>{children}<CookieConsent /></body></html>);
}
```

The `"use client"` directive keeps it out of SSR. For the denied-before-GTM guarantee,
add `cc-bootstrap.global.js` via `next/script` with `strategy="beforeInteractive"`
above your GTM script.

### Vue 3 / Nuxt

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { init, type CookieConsentInstance } from "cookie-banner-sdk";
let cc: CookieConsentInstance | undefined;
onMounted(() => { cc = init({ cookieName: "cc_consent", categories: { /* ... */ } as any }); });
onUnmounted(() => cc?.destroy());
</script>
<template><!-- nothing; SDK renders itself --></template>
```

In Nuxt, wrap the `init()` call in `if (process.client)` or use `<ClientOnly>` — it must
not run during SSR.

### Angular

```ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { init, type CookieConsentInstance } from "cookie-banner-sdk";

@Component({ selector: "app-cookie-consent", template: "" })
export class CookieConsentComponent implements OnInit, OnDestroy {
  private cc?: CookieConsentInstance;
  ngOnInit() { this.cc = init({ cookieName: "cc_consent", categories: { /* ... */ } as any }); }
  ngOnDestroy() { this.cc?.destroy(); }
}
```

---

## 7. CMS / platform installs

**WordPress** — add the two scripts (Method A) to your theme's `header.php` above the
GTM snippet, or use a "header scripts" plugin (e.g. WPCode, Insert Headers and Footers).
Put the bootstrap first, then GTM, then the main bundle + `init()`.

**Shopify** — `Online Store → Themes → Edit code → theme.liquid`. Paste the bootstrap
in `<head>` above any GTM/analytics, and the main bundle + `init()` lower in `<head>`.

**Webflow** — `Project Settings → Custom Code → Head Code`. Same order: bootstrap,
GTM, main bundle + `init()`.

**Squarespace / Wix** — use the site-wide header code injection; same script order.

**Inject via GTM itself** — not recommended for the bootstrap (GTM can't gate itself
before it loads), but the main UI bundle can be injected by a Custom HTML tag firing on
"Consent Initialization" if you can't edit the theme. The bootstrap should still be a
hardcoded `<head>` script for the denied-default guarantee.

---

## 8. Self-hosting (recommended for reliability)

Ad blockers sometimes block CDN scripts whose filenames contain `cookie`/`consent`. To
guarantee the banner loads, copy the built files to your own origin and point `src`
there:

```
dist/cc-bootstrap.global.js        → https://your-site.com/assets/cc-bootstrap.js
dist/cookie-consent.global.js      → https://your-site.com/assets/cookie-consent.js
```

Self-hosting also removes the third-party CDN as a single point of failure.

---

## 9. Google Tag Manager — Consent Mode v2

The SDK signals consent; **GTM gates the tags.** Wiring:

1. **Bootstrap** pushes `gtag('consent','default', { ...denied, wait_for_update:500 })`
   before GTM evaluates tags. Returning consented users get their stored signals (no
   flash of denied).
2. On a user choice, the main bundle pushes
   `gtag('consent','update', { analytics_storage:'granted', ... })` plus a
   `cookie_consent_update` dataLayer event.
3. In GTM, set your tags to respect consent: enable **Consent Mode** in GTM, and under
   each tag's **Consent Settings** require the matching signal (Google tags read
   Consent Mode automatically; for custom tags, add an "Additional consent required"
   check or trigger off the `cookie_consent_update` event).

Category → Consent Mode v2 signal mapping:

| Category | Signals granted when enabled |
|----------|------------------------------|
| Strictly Necessary | none (always on) |
| Performance / Analytics | `analytics_storage` |
| Functional | `functionality_storage`, `personalization_storage` |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization` |

---

## 10. Using it WITHOUT Google Tag Manager

If `gtag`/`dataLayer` aren't present, the SDK still renders the UI, stores consent, and
calls your `onConsent(categories)` callback — no errors. Gate your own scripts there:

```js
init({
  cookieName: "cc_consent",
  gtm: { consentMode: false, dataLayerEvent: "cookie_consent_update" },
  categories: { /* ... */ },
  onConsent: (c) => {
    if (c.analytics) loadAnalytics();   // your own loader
    if (c.marketing) loadAdPixels();
  },
});
```

`onConsent` fires on every save (banner Accept/Reject and modal Save/Confirm).

---

## 11. Configuration reference

```ts
init({
  cookieName: string,            // cookie that stores consent (default "cc_consent")
  cookieDomain?: string,         // e.g. ".example.com" for subdomain sharing; default = current host
  consentVersion: number,        // bump to force a re-prompt (default 1)
  expiryDays: number,            // consent lifetime (default 182 ≈ 6 months)
  policyUrl?: string,            // "Read our Cookie Policy" link target
  honorGpc?: boolean,            // honor Global Privacy Control (default true)

  categories: {
    necessary:  { enabled: true, locked: true, description?: string, cookies: CookieDef[] },
    analytics:  { enabled?: boolean, description?: string, cookies: CookieDef[] },
    functional: { enabled?: boolean, description?: string, cookies: CookieDef[] },
    marketing:  { enabled?: boolean, description?: string, cookies: CookieDef[] },
  },

  gtm: { consentMode: boolean, dataLayerEvent: string },   // default { true, "cookie_consent_update" }
  labels?: Partial<Labels>,      // override ANY UI string (see §13 i18n)
  theme?: Record<string, string>,// "--cc-*" variable overrides (see §12)
  onConsent?: (categories: { necessary, analytics, functional, marketing }) => void,
});

// CookieDef — shown in the View Cookies table:
type CookieDef = {
  name: string;        // e.g. "_ga"
  provider?: string;   // e.g. "Google"  (shows "N/A" if omitted)
  domain?: string;     // e.g. "example.com"  (Domain column)
  purpose?: string;    // searchable + exported
  duration?: string;   // e.g. "2 years"  (Expiry column)
};
```

`necessary` is always forced `enabled: true, locked: true` regardless of input.

---

## 12. Theming

Override any `--cc-*` CSS variable via `theme`. They're scoped inside the Shadow DOM
and reset on `:host`, so host-page styles can't leak in.

```js
theme: {
  "--cc-accent": "#10b981",      // primary button / links / toggle-on
  "--cc-bg": "#ffffff",
  "--cc-fg": "#111827",
  "--cc-muted": "#6b7280",
  "--cc-border": "#e5e7eb",
  "--cc-surface": "#f9fafb",     // card background
  "--cc-radius": "10px",
  "--cc-font": "Inter, system-ui, sans-serif",
  "--cc-success": "#16a34a",     // "Always Active" badge + GPC banner
  "--cc-z": "2147483647",        // stacking; raise if something overlaps
}
```

---

## 13. Internationalization (labels)

Every string is overridable via `labels`, including category names/descriptions and the
GPC notice:

```js
labels: {
  acceptAll: "Tout accepter",
  rejectAll: "Tout refuser",
  preferences: "Préférences",
  savePreferences: "Enregistrer",
  rejectNonEssential: "Refuser le non-essentiel",
  modalTitle: "Préférences de cookies",
  viewCookies: "Voir les cookies",
  backToCategories: "Retour aux catégories",
  alwaysActive: "Toujours actif",
  categoryNames: { necessary: "Strictement nécessaires", analytics: "Analytique", functional: "Fonctionnels", marketing: "Marketing" },
  categoryDescriptions: { /* ... */ },
  columns: { name: "Cookie", provider: "Fournisseur", domain: "Domaine", expiry: "Expiration" },
  // ...and more — see the Labels type in dist/cookie-consent.d.ts
}
```

---

## 14. Global Privacy Control (GPC)

When `honorGpc` is on (default) and the browser sends a GPC signal
(`navigator.globalPrivacyControl === true`), the modal shows a notice plus a green
**"Opt-Out Request Honored"** banner, and marketing / ad-targeting defaults to off. GPC
is a recognized opt-out under CCPA/CPRA. To test locally, enable GPC in your browser
(Firefox setting, or extensions like DuckDuckGo / Privacy Badger).

---

## 15. Programmatic API

`init(config)` returns an instance:

```js
const cc = CookieConsent.init({ /* ... */ });

cc.openPreferences();   // open the modal (wire to a footer "Cookie settings" link)
cc.getConsent();        // → { necessary, analytics, functional, marketing } | null
cc.destroy();           // remove the widget entirely
```

Re-calling `init()` returns the same instance (idempotent — safe for SPA re-renders).

---

## 16. Verify it works

1. Load the page in a fresh/incognito window → the banner appears.
2. Open DevTools console → you should see `consent default` with denied signals fire
   **before** any GTM tag.
3. Click **Accept All** → console shows `consent update` with granted signals; the
   banner disappears and the floating button (bottom-left) remains.
4. Reload → no banner, just the button; the console shows your stored signals pushed as
   the default (no flash).
5. Click the floating button (or your `#cookie-settings` link) → modal opens; **View
   Cookies** drills into the table; **Save Preferences** persists toggles.

A ready-made test harness with a live consent panel is in
[`example/index.html`](example/index.html) — run `npm run build && npx serve .` and open
`http://localhost:3000/example/`.

---

## 17. Troubleshooting

| Symptom | Cause / fix |
|---------|-------------|
| Banner never appears | JS error or the script was blocked (ad blocker). Self-host (§8); check the console. |
| Tags fire before consent | Bootstrap is missing or placed **below** GTM. It must be above the GTM snippet, not `async`/`defer`. |
| Returning users re-prompted constantly | `consentVersion` changed, or Safari ITP capped the cookie at 7 days (expected on Safari/Firefox). |
| Banner looks broken on the site | Should not happen (Shadow DOM isolates styles). If it does, raise `--cc-z`; file an issue with the host CSS. |
| `require()` fails | Use the published package or `dist/cookie-consent.cjs`; for browsers use the `.global.js` IIFE, not the CJS file. |
| Modal opens but cookie tables are empty | The `cookies: []` array for that category is empty — populate it in config. |
| 404 for a `.map` file | Only the standalone build omits its sourcemap; the main/bootstrap builds ship `.map` files — deploy them, or ignore the 404. |

---

## 18. Known limitations

- **Not a certified CMP**: no server-side proof-of-consent log, no IAB TCF string. EEA
  ad personalization may require a certified CMP on top.
- **Safari/Firefox**: ITP caps JS-set cookies at ~7 days, so those users re-prompt sooner.
  A server-set `HttpOnly` cookie is the only full fix (out of scope for a client SDK).
- **Revocation**: turning a category off re-signals `denied` but does not purge
  already-set cookies — that's GTM/host responsibility.

---

## 19. Re-prompting & versioning

The banner re-appears when: the consent cookie is **absent**, OR its stored `version`
is **less than** your current `consentVersion`, OR it is **past `expiryDays`**. To force
everyone to re-consent after a policy change, bump `consentVersion`.
