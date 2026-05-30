import { describe, it, expect } from "vitest";
import {
  parseConsent,
  categoriesToSignals,
  readCookieRaw,
  SCHEMA_VERSION,
  type ConsentRecord,
} from "../src/shared";

const valid: ConsentRecord = {
  schemaVersion: SCHEMA_VERSION,
  version: 1,
  timestamp: "2026-05-29T00:00:00Z",
  categories: { necessary: true, analytics: true, functional: false, marketing: false },
};

describe("parseConsent", () => {
  it("parses a well-formed current-schema record", () => {
    const rec = parseConsent(JSON.stringify(valid));
    expect(rec?.categories.analytics).toBe(true);
    expect(rec?.categories.necessary).toBe(true);
  });

  it("fails safe to null on malformed JSON (CRIT)", () => {
    expect(parseConsent("{not json")).toBeNull();
  });

  it("fails safe to null on unknown schemaVersion (CRIT)", () => {
    const stale = { ...valid, schemaVersion: 99 };
    expect(parseConsent(JSON.stringify(stale))).toBeNull();
  });

  it("fails safe to null when categories are missing/invalid", () => {
    expect(parseConsent(JSON.stringify({ schemaVersion: 1, version: 1, timestamp: "x" }))).toBeNull();
  });

  it("returns null for empty/absent input", () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent("")).toBeNull();
  });

  it("always forces necessary to true even if stored false", () => {
    const tampered = { ...valid, categories: { ...valid.categories, necessary: false } };
    expect(parseConsent(JSON.stringify(tampered))?.categories.necessary).toBe(true);
  });
});

describe("categoriesToSignals", () => {
  it("maps each category to the correct Consent Mode v2 signals", () => {
    const sig = categoriesToSignals({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
    expect(sig.analytics_storage).toBe("granted");
    expect(sig.functionality_storage).toBe("granted");
    expect(sig.personalization_storage).toBe("granted");
    expect(sig.ad_storage).toBe("granted");
    expect(sig.ad_user_data).toBe("granted");
    expect(sig.ad_personalization).toBe("granted");
  });

  it("denies signals for disabled categories; necessary controls none", () => {
    const sig = categoriesToSignals({
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
    expect(sig.analytics_storage).toBe("denied");
    expect(sig.ad_storage).toBe("denied");
    // necessary maps to no signal — nothing is granted by it
    expect(Object.values(sig).every((v) => v === "denied")).toBe(true);
  });
});

describe("readCookieRaw", () => {
  it("reads a value from document.cookie", () => {
    document.cookie = "foo=bar";
    expect(readCookieRaw("foo")).toBe("bar");
  });
  it("returns null when absent", () => {
    expect(readCookieRaw("nope_missing_xyz")).toBeNull();
  });
});
