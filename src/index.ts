import { init, type CookieConsentInstance } from "./core";
import { parseDataAttributes, type CookieConsentConfig } from "./config";

export { init };
export type { CookieConsentConfig, CookieConsentInstance };
export type { CategoryKey, CategoryState, ConsentRecord } from "./shared";

// Auto-init from a script tag carrying `data-auto-init`. Mutually exclusive with
// a manual init() call — if both are used, init() wins and warns. (Eng-review:
// config paths kept as designed.)
function autoInit(): void {
  if (typeof document === "undefined") return;
  const el = document.currentScript as HTMLElement | null
    ?? document.querySelector("script[data-auto-init]");
  if (el && el.hasAttribute("data-auto-init")) {
    init(parseDataAttributes(el));
  }
}

if (typeof window !== "undefined") {
  // Expose a global for the UMD/script-tag consumer.
  (window as unknown as { CookieConsent?: unknown }).CookieConsent = { init };
  autoInit();
}
