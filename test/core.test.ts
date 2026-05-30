import { describe, it, expect, beforeEach } from "vitest";
import { init } from "../src/core";
import { __resetMemoryStore } from "../src/consent-store";
import type { CategoryKey } from "../src/shared";

type AnyWin = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; [k: string]: unknown };

function clearCookies() {
  document.cookie.split("; ").forEach((c) => {
    const name = c.split("=")[0];
    if (name) document.cookie = `${name}=; Max-Age=0; Path=/`;
  });
}

function shadow(): ShadowRoot {
  const host = document.querySelector("[data-cookie-consent-root]") as HTMLElement;
  return host.shadowRoot!;
}

function clickByText(root: ParentNode, text: string) {
  const btn = Array.from(root.querySelectorAll("button")).find(
    (b) => b.textContent === text,
  );
  if (!btn) throw new Error(`button "${text}" not found`);
  btn.click();
}

const baseConfig = {
  cookieName: "cc_core",
  consentVersion: 1,
  categories: {
    necessary: { enabled: true, locked: true, cookies: [] },
    analytics: { cookies: [{ name: "_ga", provider: "Google", purpose: "stats", duration: "2y" }] },
    functional: { cookies: [] },
    marketing: { cookies: [] },
  },
} as const;

beforeEach(() => {
  clearCookies();
  __resetMemoryStore();
  const w = window as AnyWin;
  delete w.__cookieConsentInitialized;
  delete w.dataLayer;
  delete w.gtag;
  document.body.innerHTML = "";
});

describe("init — banner vs button", () => {
  it("shows the banner on first visit (no consent)", () => {
    init(baseConfig);
    expect(shadow().querySelector(".cc-banner")).toBeTruthy();
    expect(shadow().querySelector(".cc-fab")).toBeFalsy();
  });

  it("shows only the floating button when valid consent exists", () => {
    init(baseConfig); // first visit -> banner
    clickByText(shadow(), "Accept All"); // consent written
    // re-init in a fresh "page load"
    (window as AnyWin).__cookieConsentInitialized = undefined;
    document.body.innerHTML = "";
    init(baseConfig);
    expect(shadow().querySelector(".cc-banner")).toBeFalsy();
    expect(shadow().querySelector(".cc-fab")).toBeTruthy();
  });
});

describe("banner actions", () => {
  it("Accept All grants every category and pushes a consent update", () => {
    const inst = init(baseConfig);
    clickByText(shadow(), "Accept All");
    expect(inst.getConsent()).toEqual({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
    const update = ((window as AnyWin).dataLayer || []).find(
      (e) => (e as IArguments)[1] === "update",
    );
    expect(update).toBeTruthy();
    expect(shadow().querySelector(".cc-banner")).toBeFalsy();
    expect(shadow().querySelector(".cc-fab")).toBeTruthy();
  });

  it("Reject All keeps only necessary", () => {
    const inst = init(baseConfig);
    clickByText(shadow(), "Reject All");
    expect(inst.getConsent()).toEqual({
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  });

  it("Preferences renders as a button, not a link", () => {
    init(baseConfig);
    const prefs = Array.from(
      shadow().querySelectorAll<HTMLButtonElement>(".cc-banner button"),
    ).find((b) => b.textContent === "Preferences");
    expect(prefs).toBeTruthy();
    expect(prefs!.tagName).toBe("BUTTON");
    // Reads as a bordered button, not the old underlined-link styling.
    expect(prefs!.classList.contains("cc-secondary")).toBe(true);
    expect(prefs!.classList.contains("cc-tertiary")).toBe(false);
  });
});

describe("preferences modal", () => {
  it("opens from the banner; View Cookies drills into the cookie table", () => {
    init(baseConfig);
    clickByText(shadow(), "Preferences");
    expect(shadow().querySelector(".cc-overlay")).toBeTruthy();
    // Cookies live in the detail view now. Open analytics' detail.
    const viewLinks = shadow().querySelectorAll<HTMLButtonElement>(".cc-view-link");
    viewLinks[1].click(); // [0]=necessary, [1]=analytics
    expect(shadow().querySelector(".cc-table")).toBeTruthy();
    expect(shadow().textContent).toContain("_ga"); // rendered as text, never innerHTML
    expect(shadow().textContent).toContain("Back to categories");
  });

  it("Save Preferences persists the toggled categories", () => {
    const inst = init(baseConfig);
    clickByText(shadow(), "Preferences");
    const analyticsToggle = Array.from(
      shadow().querySelectorAll<HTMLInputElement>("input[type=checkbox]"),
    )[0];
    analyticsToggle.checked = true;
    clickByText(shadow(), "Save Preferences");
    const consent = inst.getConsent()!;
    expect(consent.analytics).toBe(true);
    expect(shadow().querySelector(".cc-overlay")).toBeFalsy();
  });

  it("Reject (modal) keeps only necessary", () => {
    const inst = init(baseConfig);
    clickByText(shadow(), "Preferences");
    const overlay = shadow().querySelector(".cc-overlay") as ParentNode;
    clickByText(overlay, "Reject Non-Essential"); // scoped to the modal, not the banner
    expect(inst.getConsent()!.marketing).toBe(false);
  });

  it("locked necessary category shows the 'Always Active' badge, no toggle", () => {
    init(baseConfig);
    clickByText(shadow(), "Preferences");
    expect(shadow().textContent).toContain("Always Active");
    // necessary card has a badge, not a switch
    const badge = shadow().querySelector(".cc-badge");
    expect(badge?.textContent).toBe("Always Active");
  });
});

describe("Global Privacy Control", () => {
  function setGpc(value: boolean | undefined) {
    Object.defineProperty(navigator, "globalPrivacyControl", { value, configurable: true });
  }

  it("shows the Opt-Out Request Honored banner and defaults marketing off", () => {
    setGpc(true);
    init(baseConfig);
    clickByText(shadow(), "Preferences");
    expect(shadow().textContent).toContain("Opt-Out Request Honored");
    // marketing toggle is the last checkbox; should be off under GPC
    const toggles = Array.from(shadow().querySelectorAll<HTMLInputElement>("input[type=checkbox]"));
    expect(toggles[toggles.length - 1].checked).toBe(false);
    setGpc(undefined);
  });

  it("does not show the honored banner when GPC is absent", () => {
    setGpc(undefined);
    init(baseConfig);
    clickByText(shadow(), "Preferences");
    expect(shadow().textContent).not.toContain("Opt-Out Request Honored");
  });
});

describe("idempotency + lifecycle", () => {
  it("re-calling init returns the same instance, no duplicate root", () => {
    const a = init(baseConfig);
    const b = init(baseConfig);
    expect(a).toBe(b);
    expect(document.querySelectorAll("[data-cookie-consent-root]").length).toBe(1);
  });

  it("destroy removes the host and clears the init flag", () => {
    const inst = init(baseConfig);
    inst.destroy();
    expect(document.querySelector("[data-cookie-consent-root]")).toBeFalsy();
    expect((window as AnyWin).__cookieConsentInitialized).toBeUndefined();
  });
});

describe("no-GTM site", () => {
  it("works and fires onConsent without errors when gtag is absent", () => {
    let fired: Record<CategoryKey, boolean> | null = null;
    const inst = init({ ...baseConfig, onConsent: (c) => (fired = c) });
    clickByText(shadow(), "Accept All");
    expect(fired).not.toBeNull();
    expect(inst.getConsent()!.analytics).toBe(true);
  });
});
