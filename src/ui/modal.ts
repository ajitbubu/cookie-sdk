import { CATEGORY_KEYS, type CookieConsentConfig } from "../config";
import type { CategoryKey, CategoryState } from "../shared";

export interface ModalCallbacks {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onSave: (categories: CategoryState) => void;
  onClose: () => void;
}

export interface ModalHandle {
  overlay: HTMLElement;
  dialog: HTMLElement;
}

// Lazy-built on first open (eng-review Finding 7). createElement + textContent
// only — config strings (cookie name/provider/purpose, labels) are never set as
// HTML (eng-review Finding 4).
export function createModal(
  config: CookieConsentConfig,
  initial: CategoryState,
  cb: ModalCallbacks,
): ModalHandle {
  const toggles: Partial<Record<CategoryKey, HTMLInputElement>> = {};

  const overlay = document.createElement("div");
  overlay.className = "cc-overlay";
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cb.onClose();
  });

  const dialog = document.createElement("div");
  dialog.className = "cc-modal";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", config.labels.modalTitle);

  const title = document.createElement("h2");
  title.textContent = config.labels.modalTitle;
  dialog.appendChild(title);

  for (const key of CATEGORY_KEYS) {
    const cat = config.categories[key];
    if (!cat) continue;
    const wrap = document.createElement("div");
    wrap.className = "cc-cat";

    const head = document.createElement("div");
    head.className = "cc-cat-head";

    const body = document.createElement("div");
    body.className = "cc-cat-body";
    body.hidden = true;

    // Expand/collapse trigger
    const expand = document.createElement("button");
    expand.type = "button";
    expand.className = "cc-toggle-expand";
    expand.textContent = config.labels.categoryNames[key];
    expand.setAttribute("aria-expanded", "false");
    expand.addEventListener("click", () => {
      const open = body.hidden;
      body.hidden = !open;
      expand.setAttribute("aria-expanded", String(open));
    });
    head.appendChild(expand);

    // Toggle (locked + checked for necessary)
    if (cat.locked) {
      const lockLabel = document.createElement("span");
      lockLabel.className = "cc-locked";
      lockLabel.textContent = config.labels.alwaysActive;
      head.appendChild(lockLabel);
    } else {
      const cb2 = document.createElement("input");
      cb2.type = "checkbox";
      cb2.checked = initial[key];
      cb2.setAttribute("aria-label", config.labels.categoryNames[key]);
      toggles[key] = cb2;
      head.appendChild(cb2);
    }

    wrap.appendChild(head);

    // Cookie table
    for (const c of cat.cookies) {
      const row = document.createElement("div");
      row.className = "cc-cookie";
      const name = document.createElement("strong");
      name.textContent = c.name;
      const meta = document.createElement("div");
      meta.textContent = `${c.provider} · ${c.purpose} · ${c.duration}`;
      row.append(name, meta);
      body.appendChild(row);
    }
    if (cat.cookies.length === 0) {
      const empty = document.createElement("div");
      empty.className = "cc-cookie";
      empty.textContent = "No cookies listed.";
      body.appendChild(empty);
    }

    wrap.appendChild(body);
    dialog.appendChild(wrap);
  }

  function readToggles(): CategoryState {
    return {
      necessary: true,
      analytics: toggles.analytics?.checked ?? false,
      functional: toggles.functional?.checked ?? false,
      marketing: toggles.marketing?.checked ?? false,
    };
  }

  const actions = document.createElement("div");
  actions.className = "cc-modal-actions";
  actions.append(
    actionButton(config.labels.rejectNonEssential, cb.onRejectNonEssential),
    actionButton(config.labels.savePreferences, () => cb.onSave(readToggles())),
    actionButton(config.labels.acceptAll, cb.onAcceptAll, "cc-primary"),
  );
  dialog.appendChild(actions);

  overlay.appendChild(dialog);
  return { overlay, dialog };
}

function actionButton(label: string, onClick: () => void, cls?: string): HTMLButtonElement {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = label;
  if (cls) b.className = cls;
  b.addEventListener("click", onClick);
  return b;
}
