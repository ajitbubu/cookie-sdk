# cookie-banner-sdk

Drop-in cookie-consent banner SDK with **Google Consent Mode v2** signaling.
Shadow-DOM isolated, zero runtime deps, TypeScript (strict). Published as
`@ajitbubu/cookie-banner-sdk`. Repo: https://github.com/ajitbubu/cookie-sdk

## Commands

- `npm run build` — tsup, emits all bundles to `dist/`
- `npm test` — vitest (happy-dom), `npm run test:watch` to watch
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — eslint over `src`
- `npx serve .` — serve the repo; demo pages live in `example/`
- `npm run build:sites` — build a config-baked bundle for every `sites/*.json`
- `npm run builder` — local builder UI at http://localhost:5174 (form → Build → download)

## Per-site builder (multi-site config)

Each site gets its own self-contained standalone bundle with its config (policy
URL, cookie name, accent, cookie tables) **baked in at build time** — no runtime
config. Pieces:

- `sites/<id>.json` — one file per site: `{ id, label, triggerId, config }` where
  `config` is a `Partial<CookieConsentConfig>`. Current sites: faceoff, varindia,
  mybrandbook, spoindia.
- `src/standalone.ts` — reads build-time tokens `__SITE_CONFIG__` / `__TRIGGER_ID__`
  (esbuild `define`), with safe fallbacks so it still compiles/runs undefined.
- `scripts/build-site.mjs` — `buildSite(site)` / CLI: injects one site's JSON via
  `define`, emits `dist/cookie-consent.<id>.global.js`. `scripts/build-sites.mjs`
  loops all `sites/*.json`.
- `scripts/builder-server.mjs` + `builder/index.html` — the form UI. API:
  `GET /api/sites`, `POST /api/save` (writes `sites/<id>.json`), `POST /api/build`
  (saves + builds + returns `/dist/...` download URL), `GET /dist/<file>`.

To add a site: open the builder, fill the form, click **Build** (writes
`sites/<id>.json` and emits the bundle), or hand-edit a `sites/*.json` and run
`npm run build:sites`. `npm run build` still emits the generic
`cookie-consent.standalone.global.js` + `.faceoff.global.js` from `sites/faceoff.json`.

## Important: `dist/` is committed

`dist/` is git-tracked (not ignored). **Any change to `src/` requires
`npm run build` and committing the regenerated `dist/*` in the same change** —
the demo pages and CDN consumers load the built artifacts, not the source.

## Architecture

- `src/index.ts` — entry: exports `init`, sets `window.CookieConsent`, auto-inits
  from `<script data-auto-init>`.
- `src/core.ts` — orchestrator. `init(config)` returns the instance API:
  `openPreferences()`, `getConsent()`, `update(config)`, `destroy()`.
  Idempotent — a second `init()` warns and returns the existing instance.
- `src/config.ts` — `CookieConsentConfig` interface, `DEFAULT_LABELS`
  (incl. `bannerText`), `resolveConfig`, `parseDataAttributes` (data-* flags).
  `necessary` category is always forced locked + enabled.
- `src/consent-store.ts` — cookie read/write + consent record/versioning.
- `src/gtm-adapter.ts` / `src/bootstrap.ts` — Consent Mode v2 `default`/`update`
  pushes to `dataLayer`; bootstrap runs *before* GTM. Self-creates
  `dataLayer`/`gtag` if absent (works with no GTM on the page).
- `src/gpc.ts` — honors Global Privacy Control signal.
- `src/a11y.ts` — focus trap / a11y helpers.
- `src/ui/` — `shadow-root.ts` (mount), `styles.ts`, `banner.ts`, `modal.ts`,
  `floating-button.ts`.
- `src/standalone.ts` — single-file build with baked `SITE_CONFIG` + `TRIGGER_ID`;
  auto-init on DOMContentLoaded, wires `#<triggerId>` to open preferences.

## CSS isolation (do not regress)

Styles mount via **`adoptedStyleSheets`** (constructable stylesheet) with an
injected `<style>` fallback — see `src/ui/shadow-root.ts`. This keeps the widget
styled under a strict CSP (no `style-src 'unsafe-inline'` needed). `setTheme`
updates whichever mechanism is active. All UI lives in a `mode:"open"` Shadow DOM
with `:host { all: initial }` + namespaced `--cc-*` vars, so host-page CSS can't
leak in or out. Accent color is `--cc-accent` (currently `#DB2927`).

## Bundles (`dist/`)

- `cookie-consent.js` / `.cjs` — ESM / CJS lib
- `cookie-consent.global.js` — UMD/global (`window.CookieConsent`)
- `cc-bootstrap.global.js` — pre-GTM Consent Mode bootstrap
- `cookie-consent.standalone.global.js` — single-file, baked config
- `cookie-consent.faceoff.global.js` — faceoff.world variant

## Conventions / gotchas

- Tests use happy-dom v15 (supports constructable stylesheets). When asserting
  on shadow CSS, read `adoptedStyleSheets` cssRules, not a `<style>` node.
- Keep `.claude/`, `example/test.html`, and lockfiles out of feature commits.
- The standalone bootstrap + init both emit `consent default` (harmless, idempotent).

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool.

- Bugs/errors → /investigate
- QA/testing site behavior → /qa or /qa-only
- Code review/diff check → /review
- Visual polish → /design-review
- Ship/deploy/PR → /ship or /land-and-deploy
