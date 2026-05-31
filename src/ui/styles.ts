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
    --cc-fg: #111827;
    --cc-muted: #6b7280;
    --cc-border: #e5e7eb;
    --cc-surface: #f9fafb;
    --cc-accent: #2563eb;
    --cc-accent-fg: #ffffff;
    --cc-success: #16a34a;
    --cc-success-bg: #f0fdf4;
    --cc-success-border: #bbf7d0;
    --cc-radius: 10px;
    --cc-font: system-ui, -apple-system, sans-serif;
    --cc-font-size: 14px;
    --cc-heading-color: var(--cc-fg);
    --cc-heading-size: 19px;
    --cc-z: 2147483647;
    ${overrides}
    all: initial;
  }
  * { box-sizing: border-box; font-family: var(--cc-font); }
  /* [hidden] must beat class rules that set display (e.g. .cc-modal-actions{display:flex}). */
  [hidden] { display: none !important; }
  /* Suppress entrance animation on update() re-renders (live editing). */
  .cc-no-anim { animation: none !important; }
  @keyframes cc-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @keyframes cc-slide-down { from { transform: translateY(-100%); } to { transform: translateY(0); } }
  @keyframes cc-fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes cc-pop-in { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: none; } }

  /* ---- Banner ---- */
  .cc-banner {
    animation: cc-slide-up 0.28s ease-out;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: var(--cc-z);
    background: var(--cc-bg); color: var(--cc-fg);
    border-top: 1px solid var(--cc-border);
    padding: 16px; display: flex; gap: 12px; align-items: center;
    flex-wrap: wrap; justify-content: space-between;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
  }
  /* Position modifier: top vs default bottom. */
  .cc-banner.cc-pos-top {
    bottom: auto; top: 0;
    border-top: none; border-bottom: 1px solid var(--cc-border);
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    animation: cc-slide-down 0.28s ease-out;
  }
  .cc-banner p { margin: 0; flex: 1 1 280px; font-size: var(--cc-font-size); line-height: 1.5; }
  .cc-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  /* ---- Buttons ---- */
  button {
    cursor: pointer; border: 1px solid var(--cc-border); border-radius: var(--cc-radius);
    padding: 11px 18px; min-height: 44px; font-size: 14px; font-weight: 500;
    background: var(--cc-bg); color: var(--cc-fg); transition: background 0.12s, border-color 0.12s;
  }
  button.cc-primary { background: var(--cc-accent); color: var(--cc-accent-fg); border-color: var(--cc-accent); }
  button.cc-primary:hover { filter: brightness(0.94); }
  button.cc-secondary { background: var(--cc-bg); color: var(--cc-accent); border-color: var(--cc-accent); }
  button.cc-secondary:hover { background: var(--cc-surface); }
  button.cc-tertiary { border-color: transparent; background: transparent; color: var(--cc-accent); text-decoration: underline; padding-left: 8px; padding-right: 8px; }
  button:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 2px; }

  /* ---- Floating button ---- */
  .cc-fab {
    position: fixed; z-index: var(--cc-z);
    width: 46px; height: 46px; border-radius: 50%; padding: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--cc-bg); color: var(--cc-fg);
    box-shadow: 0 2px 10px rgba(0,0,0,0.18);
  }
  /* Corner placement (default bottom-left). */
  .cc-fab.cc-fab-bottom-left  { bottom: 16px; left: 16px; }
  .cc-fab.cc-fab-bottom-right { bottom: 16px; right: 16px; }
  .cc-fab.cc-fab-top-left     { top: 16px; left: 16px; }
  .cc-fab.cc-fab-top-right    { top: 16px; right: 16px; }

  /* ---- Modal shell ---- */
  .cc-overlay {
    animation: cc-fade-in 0.2s ease-out;
    position: fixed; inset: 0; z-index: var(--cc-z);
    background: rgba(17,24,39,0.55); display: flex; align-items: center; justify-content: center;
    padding: 16px;
  }
  .cc-modal {
    animation: cc-pop-in 0.22s ease-out;
    background: var(--cc-bg); color: var(--cc-fg); border-radius: 14px;
    max-width: 600px; width: 100%; max-height: 88vh; overflow: auto;
    padding: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.28);
  }
  .cc-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .cc-title { display: flex; align-items: center; gap: 10px; color: var(--cc-fg); }
  .cc-title h2 { margin: 0; font-size: var(--cc-heading-size); font-weight: 600; color: var(--cc-heading-color); }
  .cc-close { display: flex; align-items: center; justify-content: center; border: none; background: none; color: var(--cc-muted); width: 44px; height: 44px; padding: 0; min-height: 0; border-radius: var(--cc-radius); }
  .cc-close:hover { color: var(--cc-fg); background: var(--cc-surface); }
  .cc-close-x { font-size: 16px; }

  /* ---- GPC notice + honored banner ---- */
  .cc-gpc-notice { margin: 0 0 14px; font-size: 13.5px; line-height: 1.6; color: var(--cc-muted); }
  .cc-gpc-notice a { color: var(--cc-accent); }
  .cc-gpc-honored {
    display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
    padding: 12px 14px; border: 1px solid var(--cc-success-border);
    background: var(--cc-success-bg); border-radius: var(--cc-radius);
    color: var(--cc-success); font-weight: 600; font-size: 14px;
  }

  /* ---- Category cards ---- */
  .cc-card { border: 1px solid var(--cc-border); border-radius: var(--cc-radius); padding: 16px; margin-bottom: 14px; background: var(--cc-surface); }
  .cc-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
  .cc-card-head h3 { margin: 0; font-size: 15.5px; font-weight: 600; color: var(--cc-heading-color); }
  .cc-card-desc { margin: 0 0 10px; font-size: 13.5px; line-height: 1.55; color: var(--cc-muted); }
  .cc-badge { font-size: 12px; font-weight: 600; color: var(--cc-success); background: var(--cc-success-bg); border: 1px solid var(--cc-success-border); padding: 4px 10px; border-radius: 999px; white-space: nowrap; }
  .cc-view-link { border: none; background: none; color: var(--cc-accent); padding: 0; min-height: 0; font-size: 13.5px; font-weight: 500; }
  .cc-view-link:hover { text-decoration: underline; }

  /* ---- Toggle switch ---- */
  .cc-switch { position: relative; display: inline-block; width: 44px; height: 26px; flex: none; }
  .cc-switch input { position: absolute; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
  .cc-slider { position: absolute; inset: 0; background: #cbd5e1; border-radius: 999px; transition: background 0.15s; }
  .cc-slider::before { content: ""; position: absolute; height: 20px; width: 20px; left: 3px; top: 3px; background: #fff; border-radius: 50%; transition: transform 0.15s; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
  .cc-switch input:checked + .cc-slider { background: var(--cc-accent); }
  .cc-switch input:checked + .cc-slider::before { transform: translateX(18px); }
  .cc-switch input:focus-visible + .cc-slider { outline: 2px solid var(--cc-accent); outline-offset: 2px; }

  /* ---- Detail view ---- */
  .cc-back { display: flex; align-items: center; gap: 8px; border: none; background: none; color: var(--cc-fg); padding: 0; min-height: 0; font-size: 14px; font-weight: 500; margin-bottom: 16px; }
  .cc-back:hover { color: var(--cc-accent); }
  .cc-detail-title { margin: 0 0 8px; font-size: 17px; font-weight: 600; }
  .cc-detail-desc { margin: 0 0 16px; font-size: 13.5px; line-height: 1.6; color: var(--cc-muted); }
  .cc-toolbar { display: flex; gap: 8px; margin-bottom: 14px; }
  .cc-search { flex: 1; min-width: 0; min-height: 44px; padding: 10px 14px; border: 1px solid var(--cc-border); border-radius: var(--cc-radius); font-size: 14px; background: var(--cc-bg); color: var(--cc-fg); }
  .cc-search:focus-visible { outline: 2px solid var(--cc-accent); outline-offset: 1px; }
  .cc-icon-btn { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
  .cc-icon-btn:hover { background: var(--cc-surface); }

  /* ---- Cookie table ---- */
  .cc-table-scroll { border: 1px solid var(--cc-border); border-radius: var(--cc-radius); overflow: auto; }
  .cc-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .cc-table th { text-align: left; padding: 12px 14px; color: var(--cc-muted); font-weight: 600; border-bottom: 1px solid var(--cc-border); white-space: nowrap; background: var(--cc-bg); }
  .cc-table td { padding: 12px 14px; border-bottom: 1px solid var(--cc-border); color: var(--cc-muted); }
  .cc-table tbody tr:nth-child(even) { background: var(--cc-surface); }
  .cc-table tbody tr:last-child td { border-bottom: none; }
  .cc-cell-name { color: var(--cc-fg); font-weight: 500; }
  .cc-empty-row { text-align: center; color: var(--cc-muted); padding: 20px; }

  /* ---- Footer actions ---- */
  .cc-modal-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
  .cc-modal-actions button { flex: 1 1 auto; }

  @media (prefers-reduced-motion: reduce) {
    .cc-banner, .cc-overlay, .cc-modal { animation: none; }
    .cc-slider, .cc-slider::before, button { transition: none; }
  }
  @media (max-width: 480px) {
    .cc-modal { padding: 18px; }
    .cc-toolbar { flex-wrap: wrap; }
  }
  `;
}
