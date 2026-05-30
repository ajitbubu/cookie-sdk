// Styles injected into the shadow root. All theming variables are namespaced
// --cc-* AND reset on :host so host-page :root variables cannot bleed through the
// shadow boundary (CSS custom properties inherit through shadow DOM — eng-review
// theming decision). Only the --cc-* names below are the documented theming API.

export function buildStyles(theme?: Record<string, string>): string {
  const overrides = theme
    ? Object.entries(theme)
        .map(([k, v]) => `${k.startsWith("--cc-") ? k : `--cc-${k}`}: ${v};`)
        .join("\n    ")
    : "";

  return `
  :host {
    /* Reset/define every consumed var so inherited host values can't leak in. */
    --cc-bg: #ffffff;
    --cc-fg: #1a1a1a;
    --cc-muted: #666666;
    --cc-border: #e0e0e0;
    --cc-accent: #2563eb;
    --cc-accent-fg: #ffffff;
    --cc-radius: 8px;
    --cc-font: system-ui, -apple-system, sans-serif;
    --cc-z: 2147483647;
    ${overrides}
    all: initial;
  }
  * { box-sizing: border-box; font-family: var(--cc-font); }
  @keyframes cc-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @keyframes cc-fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes cc-pop-in { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: none; } }
  .cc-banner {
    animation: cc-slide-up 0.28s ease-out;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: var(--cc-z);
    background: var(--cc-bg); color: var(--cc-fg);
    border-top: 1px solid var(--cc-border);
    padding: 16px; display: flex; gap: 12px; align-items: center;
    flex-wrap: wrap; justify-content: space-between;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
  }
  .cc-banner p { margin: 0; flex: 1 1 280px; font-size: 14px; line-height: 1.5; }
  .cc-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  button {
    cursor: pointer; border: 1px solid var(--cc-border); border-radius: var(--cc-radius);
    padding: 11px 18px; min-height: 44px; font-size: 14px; background: var(--cc-bg); color: var(--cc-fg);
  }
  button.cc-primary { background: var(--cc-accent); color: var(--cc-accent-fg); border-color: var(--cc-accent); }
  /* Tertiary: quieter than the two equal-weight primary choices. */
  button.cc-tertiary { border-color: transparent; background: transparent; color: var(--cc-accent); text-decoration: underline; padding-left: 8px; padding-right: 8px; }
  button:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 2px; }
  .cc-fab {
    position: fixed; bottom: 16px; left: 16px; z-index: var(--cc-z);
    width: 44px; height: 44px; border-radius: 50%; font-size: 20px; padding: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
  .cc-overlay {
    animation: cc-fade-in 0.2s ease-out;
    position: fixed; inset: 0; z-index: var(--cc-z);
    background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
  }
  .cc-modal {
    animation: cc-pop-in 0.22s ease-out;
    background: var(--cc-bg); color: var(--cc-fg); border-radius: var(--cc-radius);
    max-width: 560px; width: calc(100% - 32px); max-height: 85vh; overflow: auto; padding: 24px;
  }
  @media (prefers-reduced-motion: reduce) {
    .cc-banner, .cc-overlay, .cc-modal { animation: none; }
    .cc-chevron { transition: none; }
  }
  .cc-modal h2 { margin: 0 0 12px; font-size: 18px; }
  .cc-cat { border: 1px solid var(--cc-border); border-radius: var(--cc-radius); margin: 8px 0; }
  .cc-cat-head { display: flex; align-items: center; justify-content: space-between; padding: 12px; }
  .cc-cat-head button.cc-toggle-expand { border: none; background: none; font-size: 14px; flex: 1; text-align: left; display: flex; align-items: center; gap: 8px; min-height: 0; }
  .cc-chevron { display: inline-block; transition: transform 0.15s ease; color: var(--cc-muted); font-size: 18px; line-height: 1; }
  button.cc-toggle-expand[aria-expanded="true"] .cc-chevron { transform: rotate(90deg); }
  .cc-cat-body { padding: 0 12px 12px; font-size: 13px; color: var(--cc-muted); }
  .cc-cat-body[hidden] { display: none; }
  .cc-cookie { border-top: 1px solid var(--cc-border); padding: 8px 0; }
  .cc-cookie strong { color: var(--cc-fg); }
  .cc-locked { font-size: 12px; color: var(--cc-muted); }
  .cc-modal-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
  `;
}
