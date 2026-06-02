import { defineConfig } from "tsup";
import { readFileSync } from "node:fs";

// Default per-site config baked into the generic standalone/faceoff bundles that
// `npm run build` emits. Named per-site bundles are produced by the config-driven
// builder instead — see scripts/build-site.mjs and `npm run build:sites`.
const faceoff = JSON.parse(
  readFileSync(new URL("./sites/faceoff.json", import.meta.url), "utf8"),
);
const SITE_DEFINE = {
  __SITE_CONFIG__: JSON.stringify(faceoff.config),
  __TRIGGER_ID__: JSON.stringify(faceoff.triggerId ?? "cookie-settings"),
};

// Build targets:
//   - cookie-consent: main bundle (IIFE/UMD + ESM + CJS for npm)
//   - cc-bootstrap:   the ~1KB synchronous shim pasted above the GTM snippet
//   - cookie-consent.standalone / .faceoff: config-baked single-file builds,
//     carrying the faceoff defaults. Per-site bundles come from `build:sites`.
export default defineConfig([
  {
    entry: { "cookie-consent": "src/index.ts" },
    format: ["esm", "iife", "cjs"],
    globalName: "CookieConsent",
    dts: true,
    minify: true,
    sourcemap: true,
    clean: true,
  },
  {
    entry: { "cc-bootstrap": "src/bootstrap.ts" },
    format: ["iife"],
    minify: true,
    sourcemap: true,
    clean: false,
  },
  {
    // Single-file, config-baked build for handing to a site (e.g. faceoff.world).
    // Self-executing: pushes consent default synchronously, then renders on DOM-ready.
    // sourcemap: false so the handed-over file is fully self-contained — no dangling
    // //# sourceMappingURL comment that would 404 when shipped without the .map.
    entry: { "cookie-consent.standalone": "src/standalone.ts" },
    format: ["iife"],
    globalName: "CookieConsent",
    minify: true,
    sourcemap: false,
    clean: false,
    define: SITE_DEFINE,
  },
  {
    // faceoff.world hand-off bundle: identical to the standalone build above,
    // emitted under its own filename so the site can pin cookie-consent.faceoff.global.js.
    entry: { "cookie-consent.faceoff": "src/standalone.ts" },
    format: ["iife"],
    globalName: "CookieConsent",
    minify: true,
    sourcemap: false,
    clean: false,
    define: SITE_DEFINE,
  },
]);
