// Build a single config-baked standalone bundle for one site.
//
// Reads a site config (a { id, label, triggerId, config } object), injects it
// into src/standalone.ts via esbuild `define`, and emits:
//   dist/cookie-consent.<id>.global.js
//
// Usage:
//   node scripts/build-site.mjs <id>            # build sites/<id>.json
//   node scripts/build-site.mjs path/to.json    # build an explicit file
// Also exported as buildSite(site) for the builder server.

import { build } from "tsup";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const ID_RE = /^[a-z0-9][a-z0-9-]{0,40}$/;

/** Validate + normalize a site object. Throws on invalid input. */
export function validateSite(site) {
  if (!site || typeof site !== "object") throw new Error("site must be an object");
  const id = String(site.id || "").trim();
  if (!ID_RE.test(id)) {
    throw new Error(`invalid site id "${site.id}" (use lowercase letters, digits, hyphens)`);
  }
  if (!site.config || typeof site.config !== "object") {
    throw new Error("site.config is required");
  }
  if (!site.config.cookieName) throw new Error("config.cookieName is required");
  const triggerId = String(site.triggerId || "cookie-settings").trim() || "cookie-settings";
  return { id, label: site.label || id, triggerId, config: site.config };
}

/** Build one site bundle. Returns { id, file }. */
export async function buildSite(siteInput) {
  const site = validateSite(siteInput);
  await build({
    entry: { [`cookie-consent.${site.id}`]: "src/standalone.ts" },
    format: ["iife"],
    globalName: "CookieConsent",
    minify: true,
    sourcemap: false,
    dts: false,
    clean: false,
    silent: true,
    outDir: "dist",
    define: {
      __SITE_CONFIG__: JSON.stringify(site.config),
      __TRIGGER_ID__: JSON.stringify(site.triggerId),
    },
  });
  return { id: site.id, file: `dist/cookie-consent.${site.id}.global.js` };
}

/** Load a site config from sites/<id>.json or an explicit path. */
export function loadSite(idOrPath) {
  const path = idOrPath.endsWith(".json")
    ? resolve(ROOT, idOrPath)
    : join(ROOT, "sites", `${idOrPath}.json`);
  if (!existsSync(path)) throw new Error(`site config not found: ${path}`);
  return JSON.parse(readFileSync(path, "utf8"));
}

// CLI entry
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2];
  if (!arg) {
    console.error("usage: node scripts/build-site.mjs <id|path.json>");
    process.exit(1);
  }
  buildSite(loadSite(arg))
    .then(({ id, file }) => console.log(`✓ built ${id} → ${file}`))
    .catch((err) => {
      console.error(`✗ build failed: ${err.message}`);
      process.exit(1);
    });
}
