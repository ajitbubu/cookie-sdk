import { defineConfig } from "tsup";

// Two committed v1 build targets (ESM/npm deferred per eng-review scope):
//   - cookie-consent: the deferred main bundle (UMD + ESM for completeness)
//   - cc-bootstrap:   the ~1KB synchronous shim pasted above the GTM snippet
export default defineConfig([
  {
    entry: { "cookie-consent": "src/index.ts" },
    format: ["esm", "iife"],
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
    entry: { "cookie-consent.standalone": "src/standalone.ts" },
    format: ["iife"],
    minify: true,
    sourcemap: true,
    clean: false,
  },
]);
