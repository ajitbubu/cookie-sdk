import type { Labels } from "../config";

export interface BannerCallbacks {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onPreferences: () => void;
}

// Built with createElement + textContent only — never innerHTML (eng-review
// Finding 4: config/i18n strings may come from a CMS).
export function createBanner(labels: Labels, cb: BannerCallbacks): HTMLElement {
  const banner = document.createElement("div");
  banner.className = "cc-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", labels.modalTitle);
  banner.setAttribute("aria-live", "polite");

  const text = document.createElement("p");
  text.textContent = labels.bannerText;
  banner.appendChild(text);

  const actions = document.createElement("div");
  actions.className = "cc-actions";

  // Equal visual weight for Accept and Reject (consent fairness — neither is
  // easier to click than the other). Preferences is a secondary button —
  // bordered, lower emphasis than the filled primaries, but a button, not a link.
  const prefs = button(labels.preferences, cb.onPreferences, "cc-secondary");
  const reject = button(labels.rejectAll, cb.onRejectAll, "cc-primary");
  const accept = button(labels.acceptAll, cb.onAcceptAll, "cc-primary");

  actions.append(prefs, reject, accept);
  banner.appendChild(actions);
  return banner;
}

function button(label: string, onClick: () => void, cls?: string): HTMLButtonElement {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = label;
  if (cls) b.className = cls;
  b.addEventListener("click", onClick);
  return b;
}
