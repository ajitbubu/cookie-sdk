import { buildStyles } from "./styles";

export interface ShadowHost {
  host: HTMLElement;
  root: ShadowRoot;
  setTheme(theme?: Record<string, string>): void;
  destroy(): void;
}

// Create a single host element with an open shadow root and isolated styles.
// Open mode so tests/integrators can inspect; styles are isolated regardless.
//
// Styles are applied via a constructable stylesheet (adoptedStyleSheets) when
// the browser supports it. That path is NOT governed by CSP `style-src
// 'unsafe-inline'`, so the widget renders on pages with a strict
// Content-Security-Policy. Browsers without support fall back to an injected
// <style> element (same shadow isolation, but subject to style-src).
export function createShadowHost(theme?: Record<string, string>): ShadowHost {
  const host = document.createElement("div");
  host.setAttribute("data-cookie-consent-root", "");
  const root = host.attachShadow({ mode: "open" });

  const css = buildStyles(theme);
  const sheet = adoptSheet(root, css);
  let styleEl: HTMLStyleElement | null = null;
  if (!sheet) {
    styleEl = document.createElement("style");
    styleEl.textContent = css;
    root.appendChild(styleEl);
  }

  document.body.appendChild(host);

  return {
    host,
    root,
    // Live theme swap — rewrite styles in place so update() can re-theme
    // without tearing down and remounting the host (no flicker).
    setTheme(next?: Record<string, string>) {
      const nextCss = buildStyles(next);
      if (sheet) sheet.replaceSync(nextCss);
      else if (styleEl) styleEl.textContent = nextCss;
    },
    destroy() {
      host.remove();
    },
  };
}

// Apply CSS via a constructable stylesheet when supported, returning the sheet
// so setTheme() can update it in place; returns null to signal the <style>
// fallback. Constructable sheets are exempt from CSP `style-src 'unsafe-inline'`,
// which is what lets the widget render under a strict Content-Security-Policy.
function adoptSheet(root: ShadowRoot, css: string): CSSStyleSheet | null {
  try {
    if (
      typeof CSSStyleSheet === "undefined" ||
      typeof CSSStyleSheet.prototype.replaceSync !== "function" ||
      !("adoptedStyleSheets" in root)
    ) {
      return null;
    }
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
    return sheet;
  } catch {
    return null;
  }
}
