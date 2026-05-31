// =============================================================================
// STANDALONE SINGLE-FILE BUILD
// =============================================================================
// This produces ONE self-contained .js file with the site's config baked in.
// The integrator adds a single <script> tag (above their GTM snippet) and,
// optionally, one placeholder element to open the preferences modal — nothing
// else. To build a file for a different site, edit SITE_CONFIG below and rebuild.
//
// What this file does on load:
//   1. Synchronously pushes Consent Mode v2 `default` (denied, or stored signals)
//      — runs before GTM as long as this <script> is placed above the GTM snippet.
//   2. On DOM ready, renders the banner / floating button.
//   3. Wires any element whose id === SITE_CONFIG.triggerId to open preferences.
// =============================================================================

import { init } from "./core";
import { runBootstrap } from "./bootstrap";
import type { CookieConsentConfig } from "./config";

// ----- EDIT THIS BLOCK PER SITE --------------------------------------------
const TRIGGER_ID = "cookie-settings"; // the "cookie placeholder id" you hand the site

const SITE_CONFIG: Partial<CookieConsentConfig> = {
  cookieName: "faceoff_consent",
  consentVersion: 1,
  expiryDays: 182,
  policyUrl: "https://faceoff.world/page/cookie-preferences",
  honorGpc: true,
  categories: {
    necessary: {
      enabled: true,
      locked: true,
      cookies: [
        { name: "faceoff_consent", provider: "faceoff.world", domain: "faceoff.world", purpose: "Stores your cookie choices", duration: "6 months" },
        { name: "session", provider: "faceoff.world", domain: "faceoff.world", purpose: "Keeps you signed in", duration: "Session" },
      ],
    },
    analytics: {
      cookies: [
        { name: "_ga", provider: "Google Analytics", domain: "faceoff.world", purpose: "Distinguishes users", duration: "2 years" },
        { name: "_ga_*", provider: "Google Analytics", domain: "faceoff.world", purpose: "Persists session state", duration: "2 years" },
      ],
    },
    functional: {
      cookies: [
        { name: "lang", provider: "faceoff.world", domain: "faceoff.world", purpose: "Remembers your language", duration: "1 year" },
      ],
    },
    marketing: {
      cookies: [
        { name: "_fbp", provider: "Meta", domain: ".faceoff.world", purpose: "Ad delivery & measurement", duration: "3 months" },
      ],
    },
  },
  gtm: { consentMode: true, dataLayerEvent: "cookie_consent_update" },
  theme: { "--cc-accent": "#DB2927" },
};
// ----- END PER-SITE BLOCK ---------------------------------------------------

// (1) Synchronous consent default — must run before GTM. Because this whole file
// loads where the integrator places the <script> (above GTM), this line executes
// before GTM evaluates tags.
runBootstrap({ cookieName: SITE_CONFIG.cookieName });

// (2) + (3) Render UI and wire the placeholder trigger once the DOM is ready.
function start(): void {
  const instance = init(SITE_CONFIG);
  // Expose for programmatic use if the site wants it.
  (window as unknown as { faceoffConsent?: unknown }).faceoffConsent = instance;
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
