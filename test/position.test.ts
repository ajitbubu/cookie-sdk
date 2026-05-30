import { describe, it, expect, beforeEach } from "vitest";
import { init } from "../src/core";
import { resolveConfig } from "../src/config";
import { buildStyles } from "../src/ui/styles";
import { __resetMemoryStore } from "../src/consent-store";

type AnyWin = Window & { [k: string]: unknown };

function shadow(): ShadowRoot {
  const host = document.querySelector("[data-cookie-consent-root]") as HTMLElement;
  return host.shadowRoot!;
}
function clickByText(root: ParentNode, text: string) {
  const btn = Array.from(root.querySelectorAll("button")).find((b) => b.textContent === text);
  if (!btn) throw new Error(`button "${text}" not found`);
  btn.click();
}

const base = {
  cookieName: "cc_pos",
  categories: {
    necessary: { enabled: true, locked: true, cookies: [] },
    analytics: { cookies: [] },
    functional: { cookies: [] },
    marketing: { cookies: [] },
  },
} as const;

beforeEach(() => {
  document.cookie.split("; ").forEach((c) => {
    const n = c.split("=")[0];
    if (n) document.cookie = `${n}=; Max-Age=0; Path=/`;
  });
  __resetMemoryStore();
  (window as AnyWin).__cookieConsentInitialized = undefined;
  document.body.innerHTML = "";
});

describe("position config (T1)", () => {
  it("defaults to bottom banner + bottom-left button", () => {
    const c = resolveConfig(base);
    expect(c.position).toEqual({ banner: "bottom", button: "bottom-left" });
  });

  it("accepts a partial position and fills the rest", () => {
    const c = resolveConfig({ ...base, position: { banner: "top" } as never });
    expect(c.position).toEqual({ banner: "top", button: "bottom-left" });
  });

  it("applies the banner position class on first visit", () => {
    init({ ...base, position: { banner: "top", button: "top-right" } });
    const banner = shadow().querySelector(".cc-banner")!;
    expect(banner.classList.contains("cc-pos-top")).toBe(true);
  });

  it("applies the fab corner class after consent", () => {
    init({ ...base, position: { banner: "bottom", button: "top-right" } });
    clickByText(shadow(), "Accept All"); // -> fab shown
    const fab = shadow().querySelector(".cc-fab")!;
    expect(fab.classList.contains("cc-fab-top-right")).toBe(true);
  });
});

describe("theme vars (T2)", () => {
  it("defines font-size + heading vars on :host", () => {
    const css = buildStyles();
    expect(css).toContain("--cc-font-size:");
    expect(css).toContain("--cc-heading-color:");
    expect(css).toContain("--cc-heading-size:");
  });

  it("emits namespaced overrides for theme keys", () => {
    const css = buildStyles({ "--cc-font-size": "18px", "heading-color": "#f00" });
    expect(css).toContain("--cc-font-size: 18px;");
    // bare keys get the --cc- prefix added
    expect(css).toContain("--cc-heading-color: #f00;");
  });
});
