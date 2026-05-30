import { buildStyles } from "./styles";

export interface ShadowHost {
  host: HTMLElement;
  root: ShadowRoot;
  destroy(): void;
}

// Create a single host element with an open shadow root and injected styles.
// Open mode so tests/integrators can inspect; styles are isolated regardless.
export function createShadowHost(theme?: Record<string, string>): ShadowHost {
  const host = document.createElement("div");
  host.setAttribute("data-cookie-consent-root", "");
  const root = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = buildStyles(theme);
  root.appendChild(style);
  document.body.appendChild(host);
  return {
    host,
    root,
    destroy() {
      host.remove();
    },
  };
}
