import { describe, it, expect, beforeEach } from "vitest";
import { pushDefault, applyConsent, ensureGtag } from "../src/gtm-adapter";
import { resolveConfig } from "../src/config";

type AnyWin = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

beforeEach(() => {
  const w = window as AnyWin;
  delete w.dataLayer;
  delete w.gtag;
});

describe("ensureGtag", () => {
  it("creates dataLayer + gtag shim when absent (chicken-and-egg fix)", () => {
    const w = window as AnyWin;
    const gtag = ensureGtag(w);
    expect(Array.isArray(w.dataLayer)).toBe(true);
    gtag("test", 1);
    expect(w.dataLayer!.length).toBe(1);
  });
});

describe("pushDefault", () => {
  it("pushes all-denied when no prior consent", () => {
    const w = window as AnyWin;
    pushDefault(null, 500);
    const call = w.dataLayer![0] as IArguments;
    expect(call[0]).toBe("consent");
    expect(call[1]).toBe("default");
    const signals = call[2] as Record<string, unknown>;
    expect(signals.analytics_storage).toBe("denied");
    expect(signals.ad_storage).toBe("denied");
    expect(signals.wait_for_update).toBe(500);
  });

  it("pushes stored signals for a returning consented user (no flash)", () => {
    const w = window as AnyWin;
    pushDefault({ necessary: true, analytics: true, functional: false, marketing: false });
    const signals = (w.dataLayer![0] as IArguments)[2] as Record<string, unknown>;
    expect(signals.analytics_storage).toBe("granted");
    expect(signals.ad_storage).toBe("denied");
  });
});

describe("applyConsent", () => {
  it("pushes a consent update + custom dataLayer event + onConsent callback", () => {
    const w = window as AnyWin;
    let cbCats: Record<string, boolean> | null = null;
    const cfg = resolveConfig({ onConsent: (c) => (cbCats = c) });
    applyConsent(cfg, { necessary: true, analytics: true, functional: false, marketing: false });

    const updateCall = (w.dataLayer || []).find(
      (e) => (e as IArguments)[1] === "update",
    ) as IArguments;
    expect(updateCall).toBeTruthy();
    expect((updateCall[2] as Record<string, unknown>).analytics_storage).toBe("granted");

    const eventPush = (w.dataLayer || []).find(
      (e) => (e as { event?: string }).event === "cookie_consent_update",
    );
    expect(eventPush).toBeTruthy();
    expect(cbCats).not.toBeNull();
    expect(cbCats!.analytics).toBe(true);
  });

  it("still fires onConsent when consentMode is disabled (non-GTM path)", () => {
    let fired = false;
    const cfg = resolveConfig({
      gtm: { consentMode: false, dataLayerEvent: "x" },
      onConsent: () => (fired = true),
    });
    applyConsent(cfg, { necessary: true, analytics: false, functional: false, marketing: false });
    expect(fired).toBe(true);
  });
});
