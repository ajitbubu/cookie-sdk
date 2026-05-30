import { categoriesToSignals, ALL_SIGNALS, type CategoryState } from "./shared";
import type { CookieConsentConfig } from "./config";

type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function getWin(): Win | undefined {
  return typeof window !== "undefined" ? (window as Win) : undefined;
}

/**
 * Ensure window.dataLayer and a gtag shim exist. Safe to call before GTM loads —
 * GTM picks up the queued calls when it initializes. Used by the bootstrap so the
 * "no-op if gtag absent" guard NEVER suppresses the consent default. (Eng-review
 * Finding 2 / decision 9 — chicken-and-egg fix.)
 */
export function ensureGtag(win: Win): (...args: unknown[]) => void {
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag() {
      // Canonical gtag shim: push the arguments object, exactly as Google's snippet does.
      win.dataLayer!.push(arguments);
    };
  }
  return win.gtag;
}

/**
 * Push the Consent Mode v2 default. Called by the bootstrap before GTM. If
 * `granted` categories are provided (returning consented user), they are honored
 * so the user is NOT flashed denied-then-granted. Otherwise all gated signals are
 * denied. (Eng-review decision 9.)
 */
export function pushDefault(categories: CategoryState | null, waitMs = 500, win = getWin()): void {
  if (!win) return;
  const gtag = ensureGtag(win);
  const signals = categories
    ? categoriesToSignals(categories)
    : ALL_SIGNALS.reduce(
        (acc, s) => ((acc[s] = "denied"), acc),
        {} as Record<string, "granted" | "denied">,
      );
  gtag("consent", "default", { ...signals, wait_for_update: waitMs });
}

/**
 * Push a Consent Mode v2 update after a user choice, plus the optional custom
 * dataLayer event, plus the onConsent callback for non-GTM integrators.
 */
export function applyConsent(config: CookieConsentConfig, categories: CategoryState): void {
  const win = getWin();
  if (config.gtm.consentMode && win) {
    const gtag = ensureGtag(win);
    gtag("consent", "update", categoriesToSignals(categories));
  }
  // Custom dataLayer event: this is the ONLY thing guarded on dataLayer presence.
  if (config.gtm.consentMode && win && Array.isArray(win.dataLayer)) {
    win.dataLayer.push({ event: config.gtm.dataLayerEvent, consent: { ...categories } });
  }
  // Non-GTM integrators react here.
  if (typeof config.onConsent === "function") {
    config.onConsent({ ...categories });
  }
}
