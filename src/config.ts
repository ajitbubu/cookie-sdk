import type { CategoryKey } from "./shared";

export interface CookieDef {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
}

export interface CategoryConfig {
  enabled?: boolean; // default state when no prior consent
  locked?: boolean; // true only for necessary
  cookies: CookieDef[];
}

export interface Labels {
  bannerText: string;
  acceptAll: string;
  rejectAll: string;
  preferences: string;
  modalTitle: string;
  rejectNonEssential: string;
  savePreferences: string;
  reopenButton: string;
  categoryNames: Record<CategoryKey, string>;
  alwaysActive: string;
}

export interface CookieConsentConfig {
  cookieName: string;
  cookieDomain?: string; // share across subdomains; defaults to current host
  consentVersion: number; // bump to force re-prompt
  expiryDays: number;
  categories: Record<CategoryKey, CategoryConfig>;
  gtm: { consentMode: boolean; dataLayerEvent: string };
  labels: Labels;
  theme?: Record<string, string>; // --cc-* variable overrides
  onConsent?: (categories: Record<CategoryKey, boolean>) => void;
}

export const DEFAULT_LABELS: Labels = {
  bannerText:
    "We use cookies to improve your experience. Choose which categories to allow.",
  acceptAll: "Accept All",
  rejectAll: "Reject All",
  preferences: "Preferences",
  modalTitle: "Cookie Preferences",
  rejectNonEssential: "Reject All", // necessary cookies always stay on; "Reject All" matches the banner
  savePreferences: "Save Preferences",
  reopenButton: "Cookie settings",
  categoryNames: {
    necessary: "Strictly Necessary",
    analytics: "Performance / Analytics",
    functional: "Functional",
    marketing: "Marketing",
  },
  alwaysActive: "Always active",
};

const CATEGORY_KEYS: CategoryKey[] = ["necessary", "analytics", "functional", "marketing"];

function defaultCategories(): Record<CategoryKey, CategoryConfig> {
  return {
    necessary: { enabled: true, locked: true, cookies: [] },
    analytics: { enabled: false, cookies: [] },
    functional: { enabled: false, cookies: [] },
    marketing: { enabled: false, cookies: [] },
  };
}

const DEFAULTS = {
  cookieName: "cc_consent",
  consentVersion: 1,
  expiryDays: 182,
  gtm: { consentMode: true, dataLayerEvent: "cookie_consent_update" },
};

/**
 * Merge a user-supplied partial config with defaults. necessary is always forced
 * locked + enabled regardless of input.
 */
export function resolveConfig(input: Partial<CookieConsentConfig>): CookieConsentConfig {
  const categories = { ...defaultCategories(), ...(input.categories || {}) };
  categories.necessary = {
    ...categories.necessary,
    enabled: true,
    locked: true,
  };
  return {
    cookieName: input.cookieName ?? DEFAULTS.cookieName,
    cookieDomain: input.cookieDomain,
    consentVersion: input.consentVersion ?? DEFAULTS.consentVersion,
    expiryDays: input.expiryDays ?? DEFAULTS.expiryDays,
    categories,
    gtm: { ...DEFAULTS.gtm, ...(input.gtm || {}) },
    labels: {
      ...DEFAULT_LABELS,
      ...(input.labels || {}),
      categoryNames: {
        ...DEFAULT_LABELS.categoryNames,
        ...(input.labels?.categoryNames || {}),
      },
    },
    theme: input.theme,
    onConsent: input.onConsent,
  };
}

/**
 * Parse config from a script tag's data- attributes (trivial flags only — cookie
 * tables require the init() object form). Returns a partial config.
 */
export function parseDataAttributes(el: HTMLElement): Partial<CookieConsentConfig> {
  const out: Partial<CookieConsentConfig> = {};
  const name = el.getAttribute("data-cookie-name");
  if (name) out.cookieName = name;
  const domain = el.getAttribute("data-cookie-domain");
  if (domain) out.cookieDomain = domain;
  const version = el.getAttribute("data-consent-version");
  if (version && !Number.isNaN(Number(version))) out.consentVersion = Number(version);
  const expiry = el.getAttribute("data-expiry-days");
  if (expiry && !Number.isNaN(Number(expiry))) out.expiryDays = Number(expiry);
  const consentMode = el.getAttribute("data-consent-mode");
  if (consentMode != null) {
    out.gtm = { consentMode: consentMode !== "false", dataLayerEvent: DEFAULTS.gtm.dataLayerEvent };
  }
  // data-attr form has no cookie definitions; categories default to empty tables.
  out.categories = defaultCategories();
  return out;
}

export { CATEGORY_KEYS };
