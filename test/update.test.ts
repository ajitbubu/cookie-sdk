import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { init } from "../src/index";

function reset() {
  (window as unknown as Record<string, unknown>).__cookieConsentInitialized = undefined;
  document.querySelectorAll("[data-cookie-consent-root]").forEach((n) => n.remove());
  document.cookie = "cc_consent=; Max-Age=0; Path=/";
}
beforeEach(reset);
afterEach(reset);

const cfg = (text: string) => ({
  categories: { analytics: { cookies: [{ name: "_ga" }] } } as never,
  labels: { bannerText: text } as never,
});

describe("instance.update()", () => {
  it("re-renders new labels without remounting the shadow host", () => {
    const inst = init(cfg("AAA"));
    const host1 = document.querySelector("[data-cookie-consent-root]");
    inst.update(cfg("BBB"));
    const host2 = document.querySelector("[data-cookie-consent-root]");
    expect(host1).toBe(host2); // same host element — no remount/flicker
    const text = host2!.shadowRoot!.textContent ?? "";
    expect(text).toContain("BBB");
    expect(text).not.toContain("AAA");
  });

  it("re-themes live by rewriting the injected styles", () => {
    const inst = init({ ...cfg("x"), theme: { "--cc-accent": "#111111" } });
    const root = document.querySelector("[data-cookie-consent-root]")!.shadowRoot!;
    expect(root.querySelector("style")!.textContent).toContain("#111111");
    inst.update({ ...cfg("x"), theme: { "--cc-accent": "#abcdef" } });
    expect(root.querySelector("style")!.textContent).toContain("#abcdef");
    expect(root.querySelector("style")!.textContent).not.toContain("#111111");
  });

  it("rebuilt banner carries the no-animation class on update", () => {
    const inst = init(cfg("x"));
    inst.update(cfg("y"));
    const banner = document.querySelector("[data-cookie-consent-root]")!.shadowRoot!.querySelector(".cc-banner");
    expect(banner?.classList.contains("cc-no-anim")).toBe(true);
  });
});
