import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { init } from "../src/index";

function reset() {
  (window as unknown as Record<string, unknown>).__cookieConsentInitialized = undefined;
  document.querySelectorAll("[data-cookie-consent-root]").forEach((n) => n.remove());
  document.cookie = "cc_consent=; Max-Age=0; Path=/";
}

let warnSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  reset();
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  warnSpy.mockRestore();
  reset();
});

const warned = (sub: string) =>
  warnSpy.mock.calls.some((c) => String(c[0]).includes(sub));

describe("DX init() warnings (#2)", () => {
  it("warns when no optional categories are configured", () => {
    init({});
    expect(warned("no optional cookie categories")).toBe(true);
  });

  it("warns on an unrecognized theme variable", () => {
    init({
      categories: { analytics: { cookies: [{ name: "_ga" }] } } as never,
      theme: { "--cc-bogus": "#fff" },
    });
    expect(warned('theme key "--cc-bogus"')).toBe(true);
  });

  it("does NOT warn about categories when optional cookies are provided", () => {
    init({ categories: { analytics: { cookies: [{ name: "_ga" }] } } as never });
    expect(warned("no optional cookie categories")).toBe(false);
  });

  it("warns on double init()", () => {
    const a = init({ categories: { analytics: { cookies: [{ name: "_ga" }] } } as never });
    const b = init({ categories: { analytics: { cookies: [{ name: "_ga" }] } } as never });
    expect(a).toBe(b);
    expect(warned("called more than once")).toBe(true);
  });
});
