import { describe, it, expect } from "vitest";
import { resolveConfig, parseDataAttributes, DEFAULT_LABELS } from "../src/config";

describe("resolveConfig", () => {
  it("applies defaults when given an empty object", () => {
    const c = resolveConfig({});
    expect(c.cookieName).toBe("cc_consent");
    expect(c.expiryDays).toBe(182);
    expect(c.gtm.consentMode).toBe(true);
    expect(c.labels.acceptAll).toBe(DEFAULT_LABELS.acceptAll);
  });

  it("forces necessary to locked + enabled regardless of input", () => {
    const c = resolveConfig({
      categories: {
        necessary: { enabled: false, locked: false, cookies: [] },
        analytics: { cookies: [] },
        functional: { cookies: [] },
        marketing: { cookies: [] },
      },
    });
    expect(c.categories.necessary.locked).toBe(true);
    expect(c.categories.necessary.enabled).toBe(true);
  });

  it("merges label overrides over defaults", () => {
    const c = resolveConfig({ labels: { acceptAll: "Yes" } as never });
    expect(c.labels.acceptAll).toBe("Yes");
    expect(c.labels.rejectAll).toBe(DEFAULT_LABELS.rejectAll); // untouched default
  });
});

describe("parseDataAttributes", () => {
  it("reads trivial flags from a script element", () => {
    const el = document.createElement("script");
    el.setAttribute("data-cookie-name", "my_cc");
    el.setAttribute("data-expiry-days", "90");
    el.setAttribute("data-consent-mode", "false");
    const cfg = parseDataAttributes(el);
    expect(cfg.cookieName).toBe("my_cc");
    expect(cfg.expiryDays).toBe(90);
    expect(cfg.gtm?.consentMode).toBe(false);
  });

  it("ignores non-numeric expiry", () => {
    const el = document.createElement("script");
    el.setAttribute("data-expiry-days", "abc");
    expect(parseDataAttributes(el).expiryDays).toBeUndefined();
  });
});
