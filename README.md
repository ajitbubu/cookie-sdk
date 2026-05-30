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
      categories: {
        necessary:  { enabled: true, locked: true, cookies: [] },
        analytics:  { cookies: [{ name: "_ga", provider: "Google", purpose: "Analytics", duration: "2y" }] },
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
