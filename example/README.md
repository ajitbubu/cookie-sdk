# Testing the banner locally

A self-contained demo of `cookie-banner-sdk`. It loads the built bundles, shows
the banner, and includes a logging `gtag` stub so you can watch the Google Consent
Mode v2 calls happen in real time.

## Run it

From the repo root:

```bash
# 1. Build the bundles the demo loads (creates dist/)
npm install        # or: bun install
npm run build

# 2. Serve the folder over http:// (file:// won't set cookies reliably)
npx serve .        # or: python3 -m http.server 8000
```

Then open **http://localhost:3000/example/** (or `http://localhost:8000/example/`).

> Serve over `http://`, not `file://` — browsers refuse to store cookies on
> `file://`, so consent wouldn't persist and you couldn't test the return-visit flow.

## What to try

1. **First load** → the banner appears at the bottom with **Accept All / Reject All /
   Preferences** (equal weight on Accept and Reject by design).
2. **Open DevTools console.** You'll see `[gtag] consent default {...}` fire from the
   bootstrap *before* anything else — that's the denied-by-default happening before a
   real GTM would evaluate tags.
3. Click **Preferences** → the modal opens. Expand a category (click the row, watch the
   chevron rotate) to see its cookie table. Toggle Analytics on, **Save Preferences**.
4. Watch the **Consent Mode v2 calls** panel and console show `consent update` with
   `analytics_storage: "granted"`, plus the `cookie_consent_update` dataLayer event.
5. The banner disappears; the **floating cookie button** (bottom-left) remains.
6. **Reload** → no banner, just the button (consent persisted). The console shows the
   bootstrap pushing your *stored* signals as the default — no flash of denied.
7. Click **Reset consent & reload** to clear the cookie and start over.

## Using the SDK on your own site

Two script tags. **Order matters** — the bootstrap must run before your GTM snippet.

```html
<head>
  <!-- (optional) warm the CDN connection -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" />

  <!-- 1. Tell the bootstrap your cookie name, then load it ABOVE GTM. -->
  <script>window.CC_BOOTSTRAP = { cookieName: "cc_consent" };</script>
  <script src="https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cc-bootstrap.global.js"></script>

  <!-- ...your Google Tag Manager snippet here... -->

  <!-- 2. Main bundle — renders the banner/modal. -->
  <script src="https://cdn.jsdelivr.net/npm/cookie-banner-sdk/dist/cookie-consent.global.js"></script>
  <script>
    CookieConsent.init({
      cookieName: "cc_consent",          // MUST match CC_BOOTSTRAP.cookieName
      cookieDomain: ".example.com",      // share across subdomains (omit for current host)
      consentVersion: 1,                 // bump to re-prompt everyone after a policy change
      expiryDays: 182,
      categories: {
        necessary:  { enabled: true, locked: true, cookies: [
          { name: "cc_consent", provider: "Your site", purpose: "Stores consent", duration: "6 months" }
        ] },
        analytics:  { cookies: [
          { name: "_ga", provider: "Google", purpose: "Analytics", duration: "2 years" }
        ] },
        functional: { cookies: [] },
        marketing:  { cookies: [] }
      },
      gtm: { consentMode: true, dataLayerEvent: "cookie_consent_update" },
      labels: { acceptAll: "Accept All" },   // override any UI string (i18n)
      theme:  { "--cc-accent": "#10b981" },  // theming: only --cc-* variables
      onConsent: function (categories) {
        // Fires on every save. Use this if you have NO GTM.
        console.log("user chose", categories);
      }
    });
  </script>
</head>
```

### Self-hosting (recommended for reliability)

Ad blockers sometimes block CDN scripts whose names contain `cookie`/`consent`. To
guarantee the banner loads, copy `dist/cc-bootstrap.global.js` and
`dist/cookie-consent.global.js` to your own origin and point the `src` attributes there.

### No GTM?

If `gtag`/`dataLayer` aren't present, the SDK still renders the UI, stores consent, and
calls your `onConsent(categories)` callback — no errors. Use `onConsent` to gate your
own scripts.

### Programmatic API

`CookieConsent.init(config)` returns an instance:

- `instance.openPreferences()` — open the modal (e.g. from a "Cookie settings" footer link)
- `instance.getConsent()` — returns the current `{ necessary, analytics, functional, marketing }` or `null`
- `instance.destroy()` — remove the widget

## Single-file handoff (e.g. faceoff.world)

When you want to give a site **one JS file + one placeholder id, nothing else**, use
the standalone build. The config is baked in, so the site writes no `init()` and no
config. Open [`faceoff.html`](faceoff.html) to see it in action — it contains exactly
what the site adds and nothing more.

### What you do (once, to produce the file)

1. Edit the `SITE_CONFIG` / `TRIGGER_ID` block at the top of
   [`../src/standalone.ts`](../src/standalone.ts): set the cookie name, the four
   category cookie tables, and the theme accent for the site.
2. Build:
   ```bash
   npm run build
   ```
3. Hand the site the resulting file: **`dist/cookie-consent.standalone.global.js`**
   (rename to whatever you like, e.g. `faceoff-cookie-consent.js`). Host it on your
   CDN or let them self-host it.

### What faceoff.world does (the entire integration)

```html
<head>
  <!-- (A) the one file, ABOVE their GTM snippet -->
  <script src="https://your-cdn/faceoff-cookie-consent.js"></script>
  <!-- ...their GTM container snippet... -->
</head>
<body>
  ...
  <footer>
    <!-- (B) the placeholder id — wires this link to open preferences -->
    <a href="#" id="cookie-settings">Cookie settings</a>
  </footer>
</body>
```

No `init()`, no config, no second script. The file pushes the denied-by-default
Consent Mode signal synchronously (before GTM), shows the banner on first visit,
shows the floating button after a choice, and opens preferences when the
`#cookie-settings` link is clicked. The placeholder is optional — the floating
button works on its own — but it gives faceoff a tidy footer entry point.

### Try the faceoff demo locally

```bash
npm run build
npx serve .
# open http://localhost:3000/example/faceoff.html
```

## Category → Consent Mode v2 signals

| Category | Signals granted when enabled |
|---|---|
| Strictly Necessary | none (always on) |
| Performance / Analytics | `analytics_storage` |
| Functional | `functionality_storage`, `personalization_storage` |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization` |

See the root [README](../README.md) for the full config reference and known limitations
(Safari ITP, what-this-is/isn't).
