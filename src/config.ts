import type { CategoryKey } from "./shared";

export interface CookieDef {
  name: string;
  provider?: string;
  domain?: string;
  purpose?: string;
  duration?: string;
}

export interface CategoryConfig {
  enabled?: boolean; // default state when no prior consent
  locked?: boolean; // true only for necessary
  description?: string; // shown on the category card + detail view
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
  alwaysActive: string;
  close: string;
  viewCookies: string;
  backToCategories: string;
  searchPlaceholder: string;
  exportLabel: string;
  printLabel: string;
  resetToDefault: string;
  confirmChoices: string;
  policyLinkText: string;
  gpcNotice: string;
  gpcHonored: string;
  noCookies: string;
  notAvailable: string;
  columns: { name: string; provider: string; domain: string; expiry: string };
  categoryNames: Record<CategoryKey, string>;
  categoryDescriptions: Record<CategoryKey, string>;
}

export type BannerPosition = "bottom" | "top";
export type ButtonPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right";

export interface Position {
  banner: BannerPosition; // default "bottom"
  button: ButtonPosition; // floating cookie button corner, default "bottom-left"
}

export interface CookieConsentConfig {
  cookieName: string;
  cookieDomain?: string; // share across subdomains; defaults to current host
  consentVersion: number; // bump to force re-prompt
  expiryDays: number;
  policyUrl?: string; // "Read our Cookie Policy" link target
  honorGpc: boolean; // honor Global Privacy Control signal
  position: Position; // banner edge + floating-button corner
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
  rejectNonEssential: "Reject Non-Essential",
  savePreferences: "Save Preferences",
  reopenButton: "Cookie settings",
  alwaysActive: "Always Active",
  close: "Close",
  viewCookies: "View Cookies",
  backToCategories: "Back to categories",
  searchPlaceholder: "Search cookies...",
  exportLabel: "Export",
  printLabel: "Print",
  resetToDefault: "Reset to Default",
  confirmChoices: "Confirm Choices",
  policyLinkText: "Read our Cookie Policy",
  gpcNotice:
    "Your browser sent a Global Privacy Control (GPC) signal, so we have defaulted marketing and ad-targeting cookies to off. Strictly necessary cookies remain active to keep the site working. You may still review and enable optional analytics or functional cookies below, or leave them disabled — your choice is saved and can be changed at any time.",
  gpcHonored: "Opt-Out Request Honored",
  noCookies: "No cookies in this category.",
  notAvailable: "N/A",
  columns: { name: "Cookie", provider: "Provider", domain: "Domain", expiry: "Expiry" },
  categoryNames: {
    necessary: "Strictly Necessary Cookies",
    analytics: "Performance / Analytics",
    functional: "Functional Cookies",
    marketing: "Marketing Cookies",
  },
  categoryDescriptions: {
    necessary:
      "These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences.",
    analytics:
      "These cookies allow us to count visits and traffic sources so we can measure and improve site performance.",
    functional:
      "These cookies enable enhanced functionality and personalisation.",
    marketing:
      "These cookies are used to build a profile of your interests and show relevant ads. Covers sale or sharing of personal data where applicable.",
  },
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
  honorGpc: true,
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
  // Accept a partial position ({ banner } or { button } alone) and fill defaults.
  const pos = (input.position ?? {}) as Partial<Position>;
  return {
    cookieName: input.cookieName ?? DEFAULTS.cookieName,
    cookieDomain: input.cookieDomain,
    consentVersion: input.consentVersion ?? DEFAULTS.consentVersion,
    expiryDays: input.expiryDays ?? DEFAULTS.expiryDays,
    policyUrl: input.policyUrl,
    honorGpc: input.honorGpc ?? DEFAULTS.honorGpc,
    position: { banner: pos.banner ?? "bottom", button: pos.button ?? "bottom-left" },
    categories,
    gtm: { ...DEFAULTS.gtm, ...(input.gtm || {}) },
    labels: {
      ...DEFAULT_LABELS,
      ...(input.labels || {}),
      columns: { ...DEFAULT_LABELS.columns, ...(input.labels?.columns || {}) },
      categoryNames: {
        ...DEFAULT_LABELS.categoryNames,
        ...(input.labels?.categoryNames || {}),
      },
      categoryDescriptions: {
        ...DEFAULT_LABELS.categoryDescriptions,
        ...(input.labels?.categoryDescriptions || {}),
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
  const policy = el.getAttribute("data-policy-url");
  if (policy) out.policyUrl = policy;
  const consentMode = el.getAttribute("data-consent-mode");
  if (consentMode != null) {
    out.gtm = { consentMode: consentMode !== "false", dataLayerEvent: DEFAULTS.gtm.dataLayerEvent };
  }
  const bannerPos = el.getAttribute("data-banner-position");
  const buttonPos = el.getAttribute("data-button-position");
  if (bannerPos === "top" || bannerPos === "bottom" || buttonPos) {
    out.position = {} as Position;
    if (bannerPos === "top" || bannerPos === "bottom") out.position.banner = bannerPos;
    if (
      buttonPos === "bottom-left" || buttonPos === "bottom-right" ||
      buttonPos === "top-left" || buttonPos === "top-right"
    ) {
      out.position.button = buttonPos;
    }
  }
  // data-attr form has no cookie definitions; categories default to empty tables.
  out.categories = defaultCategories();
  return out;
}

export { CATEGORY_KEYS };
