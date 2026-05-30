// Shared internal core — compiled into BOTH the main bundle and cc-bootstrap.
// Single source of truth for: the consent cookie schema, reading/parsing it,
// and the category -> Consent Mode v2 signal mapping. (Eng-review Finding 2.)

export type CategoryKey = "necessary" | "analytics" | "functional" | "marketing";

export type CategoryState = Record<CategoryKey, boolean>;

// Bump when the cookie's stored shape changes. A bundle that reads a cookie whose
// schemaVersion it does not recognize MUST fail safe to all-denied rather than
// misparse — this is what makes version skew between separately-cached CDN
// bundles safe. (Eng-review Finding 2.)
export const SCHEMA_VERSION = 1;

export interface ConsentRecord {
  schemaVersion: number;
  version: number; // policy/consent version (re-prompt trigger), from config
  timestamp: string; // ISO 8601, proof-of-consent
  categories: CategoryState;
}

// Google Consent Mode v2 signal names.
export type ConsentSignal =
  | "ad_storage"
  | "ad_user_data"
  | "ad_personalization"
  | "analytics_storage"
  | "functionality_storage"
  | "personalization_storage"
  | "security_storage";

// Category -> signals expansion. Necessary controls no signal: it is always-on
// cookies the site needs; the toggle is locked and emits nothing. (Eng-review
// decision 9 + the design doc mapping table.)
export const SIGNAL_MAP: Record<CategoryKey, ConsentSignal[]> = {
  necessary: [],
  analytics: ["analytics_storage"],
  functional: ["functionality_storage", "personalization_storage"],
  marketing: ["ad_storage", "ad_user_data", "ad_personalization"],
};

export const ALL_SIGNALS: ConsentSignal[] = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
  "functionality_storage",
  "personalization_storage",
];

/**
 * Translate category choices into a Consent Mode v2 signal object.
 * Every gated signal is set to "granted" or "denied". necessary is ignored.
 */
export function categoriesToSignals(
  categories: CategoryState,
): Record<ConsentSignal, "granted" | "denied"> {
  const out = {} as Record<ConsentSignal, "granted" | "denied">;
  for (const sig of ALL_SIGNALS) out[sig] = "denied";
  (Object.keys(SIGNAL_MAP) as CategoryKey[]).forEach((cat) => {
    if (categories[cat]) {
      for (const sig of SIGNAL_MAP[cat]) out[sig] = "granted";
    }
  });
  return out;
}

/** Read the raw cookie value for `name`, or null if absent. */
export function readCookieRaw(name: string, doc: Document = document): string | null {
  const prefix = encodeURIComponent(name) + "=";
  const parts = doc.cookie ? doc.cookie.split("; ") : [];
  for (const part of parts) {
    if (part.indexOf(prefix) === 0) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }
  return null;
}

/**
 * Parse the consent cookie. Returns the record only if it is well-formed AND its
 * schemaVersion matches this build. Any error, malformed JSON, or unknown
 * schemaVersion fails safe to null (caller treats null as "no valid consent" =>
 * all-denied / show banner). (Eng-review CRIT paths.)
 */
export function parseConsent(raw: string | null): ConsentRecord | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null; // malformed JSON -> fail safe
  }
  if (typeof parsed !== "object" || parsed === null) return null;
  const rec = parsed as Partial<ConsentRecord>;
  if (rec.schemaVersion !== SCHEMA_VERSION) return null; // unknown schema -> fail safe
  if (typeof rec.timestamp !== "string" || typeof rec.version !== "number") return null;
  const cats = rec.categories;
  if (typeof cats !== "object" || cats === null) return null;
  const keys: CategoryKey[] = ["necessary", "analytics", "functional", "marketing"];
  for (const k of keys) {
    if (typeof (cats as CategoryState)[k] !== "boolean") return null;
  }
  return {
    schemaVersion: SCHEMA_VERSION,
    version: rec.version,
    timestamp: rec.timestamp,
    categories: { ...(cats as CategoryState), necessary: true }, // necessary is always on
  };
}

/** Convenience: read + parse the consent cookie in one call. */
export function readConsent(name: string, doc: Document = document): ConsentRecord | null {
  return parseConsent(readCookieRaw(name, doc));
}
