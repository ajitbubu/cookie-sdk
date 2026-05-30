import { describe, it, expect, beforeEach } from "vitest";
import { createConsentStore, __resetMemoryStore } from "../src/consent-store";
import { resolveConfig } from "../src/config";

function clearCookies() {
  document.cookie.split("; ").forEach((c) => {
    const name = c.split("=")[0];
    if (name) document.cookie = `${name}=; Max-Age=0; Path=/`;
  });
}

const cfg = resolveConfig({ cookieName: "cc_test", consentVersion: 2 });

beforeEach(() => {
  clearCookies();
  __resetMemoryStore();
});

describe("consent-store", () => {
  it("writes and reads back a consent record", () => {
    const store = createConsentStore(cfg);
    store.write({ necessary: true, analytics: true, functional: false, marketing: false });
    const rec = store.read();
    expect(rec?.categories.analytics).toBe(true);
    expect(rec?.version).toBe(2);
    expect(rec?.timestamp).toBeTypeOf("string");
  });

  it("needsPrompt is true when no cookie exists", () => {
    const store = createConsentStore(cfg);
    expect(store.needsPrompt()).toBe(true);
  });

  it("needsPrompt is false after a current-version write", () => {
    const store = createConsentStore(cfg);
    store.write({ necessary: true, analytics: false, functional: false, marketing: false });
    expect(store.needsPrompt()).toBe(false);
  });

  it("needsPrompt is true when stored version is older than config (re-prompt)", () => {
    createConsentStore(resolveConfig({ cookieName: "cc_test", consentVersion: 1 })).write({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
    const newer = createConsentStore(resolveConfig({ cookieName: "cc_test", consentVersion: 5 }));
    expect(newer.needsPrompt()).toBe(true);
  });

  it("falls back to in-memory when cookie write is blocked", () => {
    // Simulate a document whose cookie setter silently drops writes.
    const fakeDoc = { get cookie() { return ""; }, set cookie(_v: string) { /* dropped */ } } as unknown as Document;
    const store = createConsentStore(cfg, fakeDoc);
    store.write({ necessary: true, analytics: true, functional: false, marketing: false });
    expect(store.read()?.categories.analytics).toBe(true); // served from memory
  });
});
