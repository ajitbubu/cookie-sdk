# cookie-banner-sdk

A drop-in cookie consent banner you add to any website with a single script tag.
Banner with **Accept All / Reject All / Preferences**, a preferences modal with four
categories (each expandable to its cookie table), a floating reopen button, and
**Google Consent Mode v2** signaling. Rendered inside Shadow DOM so it looks identical
on every host site. Zero runtime dependencies.

## What this is — and what it isn't

**It is:** a consent UI + Google Consent Mode v2 signaling tool. It collects the user's
choice, stores it in a first-party cookie, and tells Google Tag Manager which storage
signals are granted or denied so your GTM tags gate themselves.

**It is NOT a certified Consent Management Platform (CMP).** Specifically:
- **No server-side proof-of-consent / audit log.** GDPR Art. 7(1) requires you to be
  able to *demonstrate* consent. This SDK does not store consent records server-side.
- **No IAB TCF string.** For ad personalization in the EEA, Google requires a
  Google-certified CMP that emits a TCF string. Consent Mode signals alone are
  necessary but often not sufficient for EEA ad serving — you may need a certified CMP
  on top.
- **It does not purge already-set cookies/tags on revocation.** When a user turns a
  category off, the SDK re-signals `denied`, but clearing cookies already dropped is
  GTM/host responsibility.

If you need full compliance demonstrability, treat this as the UI + signaling layer and
pair it with a CMP/consent-record backend.

## Install

Two script tags. **Order matters.**

```html
<head>
  <!-- (optional) warm the CDN connection before the blocking bootstrap -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" />

  <!-- 1. Bootstrap — MUST be ABOVE the GTM snippet. Sets Consent Mode defaults
          to denied before any tag evaluates. -->
  <script src="https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cc-bootstrap.global.js"></script>

  <!-- ... your Google Tag Manager snippet here ... -->

  <!-- 2. Main bundle — renders the banner/modal. Can load anywhere after. -->
  <script src="https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cookie-consent.global.js"></script>
  <script>
    CookieConsent.init({
      cookieName: "cc_consent",
      cookieDomain: ".example.com",   // share across subdomains; omit for current host
      consentVersion: 1,              // bump to re-prompt everyone
      expiryDays: 182,
      policyUrl: "https://example.com/cookie-policy",  // "Read our Cookie Policy" link
      honorGpc: true,                 // honor the browser Global Privacy Control signal (default true)
      categories: {
        necessary:  { enabled: true, locked: true, cookies: [] },
        analytics:  { cookies: [{ name: "_ga", provider: "Google", domain: "example.com", purpose: "Analytics", duration: "2 years" }] },
        functional: { cookies: [] },
        marketing:  { cookies: [] }
      },
      gtm: { consentMode: true, dataLayerEvent: "cookie_consent_update" },
      labels: { acceptAll: "Accept All" },   // i18n: override any label
      theme: { "--cc-accent": "#10b981" },   // theming: only --cc-* vars
      onConsent: (categories) => { /* fired on every save (use this if you have no GTM) */ }
    });
  </script>
</head>
```

If GTM/`gtag` isn't present, the SDK runs the UI, stores consent, and calls
`onConsent(categories)` — no errors, no GTM required.

### Bootstrap config (optional)

The bootstrap reads `window.CC_BOOTSTRAP` if set (before it loads):

```html
<script>window.CC_BOOTSTRAP = { cookieName: "cc_consent", waitForUpdate: 500 };</script>
<script src=".../cc-bootstrap.global.js"></script>
```

## Preferences modal & Global Privacy Control

The preferences modal is a full CMP-style surface:

- **Category cards** with iOS-style **toggle switches**; Strictly Necessary shows an
  **"Always Active"** badge (locked on, no toggle).
- **View Cookies** drills into a per-category detail view with a **live search box**,
  **Export** (CSV download) and **Print** buttons, and a **Cookie · Provider · Domain ·
  Expiry** table built from your config's `cookies` array (set the `domain` field to
  populate the Domain column).
- **Global Privacy Control (GPC):** when `honorGpc` is on (default) and the browser
  sends a GPC signal (`navigator.globalPrivacyControl === true`), the modal shows a
  notice paragraph plus a green **"Opt-Out Request Honored"** banner, and marketing /
  ad-targeting defaults to off — GPC is a recognized opt-out under CCPA/CPRA.
- **`policyUrl`** renders a "Read our Cookie Policy" link in the modal intro.

Every label (including the GPC notice, column headers, and per-category descriptions)
is overridable via the `labels` config for i18n. See [example/faceoff.html](example/faceoff.html)
for a live demo of the modal and the View Cookies detail view.

## Single-file integration (hand a site one JS file)

When you want to give a website **one JavaScript file and nothing else** — no
`init()` call, no config for them to write — use the standalone build. The config
is baked into the file at build time, so the site adds exactly two things:

1. **One `<script>` tag** in the `<head>`, above their GTM snippet.
2. **One placeholder element** with `id="cookie-settings"` (a footer link) to reopen
   preferences. (Optional — the floating cookie button appears automatically.)

That's the entire integration:

```html
<head>
  <!-- The one file you give them. Place it ABOVE the GTM snippet. -->
  <script src="https://your-cdn/cookie-consent.standalone.global.js"></script>
  <!-- ...their GTM snippet here... -->
</head>
<body>
  ...
  <footer>
    <a href="#" id="cookie-settings">Cookie settings</a>  <!-- the placeholder id -->
  </footer>
</body>
```

The standalone file self-executes: it pushes the Consent Mode v2 `default`
synchronously (before GTM), renders the banner on DOM-ready, and wires any element
with `id="cookie-settings"` to open the preferences modal.

**To produce the file for a specific site:** edit the `SITE_CONFIG` and `TRIGGER_ID`
block at the top of [`src/standalone.ts`](src/standalone.ts) (cookie name, categories,
cookie tables, theme), then build:

```bash
npm run build
# hand them: dist/cookie-consent.standalone.global.js
```

A complete working example for faceoff.world is in
[`example/faceoff.html`](example/faceoff.html) — one script tag + one footer link,
nothing else. See [`example/README.md`](example/README.md) for the faceoff handoff steps.

Trade-off: a single self-contained file (~15KB) placed above GTM blocks rendering
slightly more than the tiny 1KB bootstrap of the two-file setup. That's the cost of
the one-file simplicity; for most sites it's negligible.

## Category → Consent Mode v2 signals

| Category | Signals |
|---|---|
| Strictly Necessary | none (always-on, locked toggle) |
| Performance / Analytics | `analytics_storage` |
| Functional | `functionality_storage`, `personalization_storage` |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization` |

## Known limitations

- **Safari / Firefox re-prompt sooner.** Safari ITP caps JavaScript-set cookies at ~7
  days, so a notable share of users will be re-prompted weekly regardless of
  `expiryDays`. The only full fix is a server-set `HttpOnly` cookie, which needs a
  backend and is out of scope for a client-only SDK.
- **Ad blockers may block the script.** Filter lists target `cookie`/`consent`
  filenames. If a CDN-hosted consent script is blocked, the banner won't appear. To
  guarantee load, **self-host** both bundles from your own origin (copy the files from
  `dist/` and serve them yourself) instead of using the CDN.
- **Pre-consent pageviews run cookieless.** By design, until the user opts in, Consent
  Mode signals are `denied` — Google still sends cookieless modeling pings. This is the
  compliant steady state, not a bug.

## Development

```bash
bun install      # or npm install
npm test         # vitest unit/integration suite (happy-dom)
npm run typecheck
npm run build    # tsup -> dist/ (main bundle + bootstrap)
npm run lint
```

## License

MIT
