// cc-bootstrap: the ~1KB synchronous shim. Paste ABOVE the GTM snippet. It creates
// the dataLayer/gtag queue and pushes the Consent Mode v2 default BEFORE GTM
// evaluates any tag. Reads the consent cookie synchronously so returning consented
// users get their stored signals as the default (no flash of denied). Everything
// heavy (UI, modal, a11y) lives in the deferred main bundle. (Eng-review decision 9.)

import { readConsent } from "./shared";
import { pushDefault } from "./gtm-adapter";

interface BootstrapConfig {
  cookieName?: string;
  waitForUpdate?: number;
}

export function runBootstrap(
  cfg: BootstrapConfig = {},
  doc: Document = typeof document !== "undefined" ? document : (undefined as unknown as Document),
): void {
  const cookieName = cfg.cookieName ?? "cc_consent";
  const wait = cfg.waitForUpdate ?? 500;
  const record = doc ? readConsent(cookieName, doc) : null;
  // Valid prior consent -> default to stored signals; otherwise all-denied.
  pushDefault(record ? record.categories : null, wait);
}

// Auto-run when loaded as a script tag, reading optional global config.
if (typeof window !== "undefined") {
  const g = window as unknown as { CC_BOOTSTRAP?: BootstrapConfig };
  runBootstrap(g.CC_BOOTSTRAP || {});
}
