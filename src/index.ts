import { init, type CookieConsentInstance } from "./core";
import { parseDataAttributes } from "./config";

export { init };
export type { CookieConsentInstance };
// Public config surface — consumed by the builder/editor to type its forms.
export type {
  CookieConsentConfig,
  CategoryConfig,
  CookieDef,
  Labels,
  Position,
  BannerPosition,
  ButtonPosition,
} from "./config";
export type { CategoryKey, CategoryState, ConsentRecord, ConsentSignal } from "./shared";

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
