import { describe, it, expect, beforeEach } from "vitest";
import { runBootstrap } from "../src/bootstrap";
import { SCHEMA_VERSION } from "../src/shared";

type AnyWin = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

function clearCookies() {
  document.cookie.split("; ").forEach((c) => {
    const name = c.split("=")[0];
    if (name) document.cookie = `${name}=; Max-Age=0; Path=/`;
  });
}

beforeEach(() => {
  clearCookies();
  const w = window as AnyWin;
  delete w.dataLayer;
  delete w.gtag;
});

describe("runBootstrap", () => {
  it("pushes all-denied default when no consent cookie exists", () => {
    runBootstrap({ cookieName: "cc_boot" });
    const call = (window as AnyWin).dataLayer![0] as IArguments;
    expect(call[1]).toBe("default");
    expect((call[2] as Record<string, unknown>).analytics_storage).toBe("denied");
  });

  it("pushes stored signals when a valid consent cookie exists (no flash)", () => {
    const rec = {
      schemaVersion: SCHEMA_VERSION,
      version: 1,
      timestamp: "2026-05-29T00:00:00Z",
      categories: { necessary: true, analytics: true, functional: false, marketing: false },
    };
    document.cookie = `cc_boot=${encodeURIComponent(JSON.stringify(rec))}`;
    runBootstrap({ cookieName: "cc_boot" });
    const signals = ((window as AnyWin).dataLayer![0] as IArguments)[2] as Record<string, unknown>;
    expect(signals.analytics_storage).toBe("granted");
    expect(signals.ad_storage).toBe("denied");
  });

  it("creates the dataLayer/gtag queue even before GTM loads", () => {
    runBootstrap({ cookieName: "cc_boot" });
    expect(Array.isArray((window as AnyWin).dataLayer)).toBe(true);
    expect(typeof (window as AnyWin).gtag).toBe("function");
  });
});
