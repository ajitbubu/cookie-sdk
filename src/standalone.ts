// =============================================================================
// STANDALONE SINGLE-FILE BUILD
// =============================================================================
// This produces ONE self-contained .js file with a site's config baked in.
// The integrator adds a single <script> tag (above their GTM snippet) and,
// optionally, one placeholder element to open the preferences modal — nothing
// else.
//
// The per-site config is NOT hard-coded here. It is injected at build time from
// a JSON file under sites/ via esbuild `define` (see scripts/build-site.mjs and
// the builder UI). The `__SITE_CONFIG__` / `__TRIGGER_ID__` tokens below are
// replaced with literal values during the build. The fallback values keep this
// module type-safe and runnable when no define is supplied (e.g. the default
// `cookie-consent.standalone.global.js` from `npm run build`).
//
// What this file does on load:
//   1. Synchronously pushes Consent Mode v2 `default` (denied, or stored signals)
//      — runs before GTM as long as this <script> is placed above the GTM snippet.
//   2. On DOM ready, renders the banner / floating button.
//   3. Wires any element whose id === TRIGGER_ID to open preferences.
// =============================================================================

import { init } from "./core";
import { runBootstrap } from "./bootstrap";
import type { CookieConsentConfig } from "./config";

// Build-time injected tokens. esbuild's `define` replaces these identifiers with
// JSON literals. `typeof` guards keep the module safe if no define is provided.
declare const __SITE_CONFIG__: Partial<CookieConsentConfig>;
declare const __TRIGGER_ID__: string;

const TRIGGER_ID: string =
  typeof __TRIGGER_ID__ !== "undefined" ? __TRIGGER_ID__ : "cookie-settings";

const SITE_CONFIG: Partial<CookieConsentConfig> =
  typeof __SITE_CONFIG__ !== "undefined"
    ? __SITE_CONFIG__
    : {
        cookieName: "cc_consent",
        consentVersion: 1,
        expiryDays: 182,
        honorGpc: true,
        gtm: { consentMode: true, dataLayerEvent: "cookie_consent_update" },
        theme: { "--cc-accent": "#DB2927" },
      };

// (1) Synchronous consent default — must run before GTM. Because this whole file
// loads where the integrator places the <script> (above GTM), this line executes
// before GTM evaluates tags.
runBootstrap({ cookieName: SITE_CONFIG.cookieName });

// (2) + (3) Render UI and wire the placeholder trigger once the DOM is ready.
function start(): void {
  const instance = init(SITE_CONFIG);
  // Expose for programmatic use if the site wants it. `faceoffConsent` is kept
  // as a legacy alias for the original faceoff.world integration.
  const w = window as unknown as { cookieConsent?: unknown; faceoffConsent?: unknown };
  w.cookieConsent = instance;
  w.faceoffConsent = instance;
  const trigger = document.getElementById(TRIGGER_ID);
  if (trigger) {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      instance.openPreferences();
    });
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
}
