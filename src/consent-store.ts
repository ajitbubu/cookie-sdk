import {
  SCHEMA_VERSION,
  readConsent,
  type CategoryState,
  type ConsentRecord,
} from "./shared";
import type { CookieConsentConfig } from "./config";

// In-memory fallback when cookie writes fail (Safari private mode, blocked
// storage). Keyed by cookie name so multiple instances don't collide.
const memoryStore: Record<string, ConsentRecord> = {};

export interface ConsentStore {
  read(): ConsentRecord | null;
  write(categories: CategoryState): ConsentRecord;
  /** True when the banner should be shown (no valid, current consent). */
  needsPrompt(): boolean;
}

function buildRecord(config: CookieConsentConfig, categories: CategoryState, now: string): ConsentRecord {
  return {
    schemaVersion: SCHEMA_VERSION,
    version: config.consentVersion,
    timestamp: now,
    categories: { ...categories, necessary: true },
  };
}

export function createConsentStore(
  config: CookieConsentConfig,
  doc: Document = document,
  clock: () => Date = () => new Date(),
): ConsentStore {
  function read(): ConsentRecord | null {
    return readConsent(config.cookieName, doc) ?? memoryStore[config.cookieName] ?? null;
  }

  function write(categories: CategoryState): ConsentRecord {
    const rec = buildRecord(config, categories, clock().toISOString());
    const value = encodeURIComponent(JSON.stringify(rec));
    const maxAge = config.expiryDays * 24 * 60 * 60;
    let cookie = `${encodeURIComponent(config.cookieName)}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
    if (config.cookieDomain) cookie += `; Domain=${config.cookieDomain}`;
    if (typeof location !== "undefined" && location.protocol === "https:") cookie += "; Secure";
    try {
      doc.cookie = cookie;
      // Verify the write actually landed; some environments silently drop it.
      if (readConsent(config.cookieName, doc) === null) {
        memoryStore[config.cookieName] = rec;
        warnOnce();
      }
    } catch {
      memoryStore[config.cookieName] = rec; // storage denied -> in-memory fallback
      warnOnce();
    }
    return rec;
  }

  function needsPrompt(): boolean {
    const rec = read();
    if (!rec) return true; // absent or fail-safe-denied
    if (rec.version < config.consentVersion) return true; // policy bumped
    // Expiry is enforced by the cookie Max-Age; a present record is within window.
    return false;
  }

  return { read, write, needsPrompt };
}

let warned = false;
function warnOnce() {
  if (!warned && typeof console !== "undefined") {
    warned = true;
    console.warn(
      "[cookie-banner-sdk] cookie write blocked; consent kept in memory for this session only.",
    );
  }
}

// Exposed for tests to reset module state between cases.
export function __resetMemoryStore() {
  for (const k of Object.keys(memoryStore)) delete memoryStore[k];
  warned = false;
}
