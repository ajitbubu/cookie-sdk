import { CATEGORY_KEYS, type CookieConsentConfig, type CookieDef } from "../config";
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

const SVG_NS = "http://www.w3.org/2000/svg";

function svg(paths: string[], opts: { fill?: boolean } = {}): SVGSVGElement {
  const el = document.createElementNS(SVG_NS, "svg");
  el.setAttribute("viewBox", "0 0 24 24");
  el.setAttribute("width", "18");
  el.setAttribute("height", "18");
  el.setAttribute("fill", opts.fill ? "currentColor" : "none");
  el.setAttribute("stroke", opts.fill ? "none" : "currentColor");
  el.setAttribute("stroke-width", "1.8");
  el.setAttribute("stroke-linecap", "round");
  el.setAttribute("stroke-linejoin", "round");
  el.setAttribute("aria-hidden", "true");
  for (const d of paths) {
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", d);
    el.appendChild(p);
  }
  return el;
}

const ICON = {
  gear: () => svg(["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.1-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z"]),
  check: () => svg(["M20 6 9 17l-5-5"]),
  back: () => svg(["M19 12H5", "M12 19l-7-7 7-7"]),
  exportIcon: () => svg(["M12 3v12", "M8 7l4-4 4 4", "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"]),
  print: () => svg(["M6 9V2h12v7", "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", "M6 14h12v8H6z"]),
};

// Lazy-built on first open. createElement + textContent only — config strings
// (cookie name/provider/domain, labels) are never set as HTML (XSS safety).
export function createModal(
  config: CookieConsentConfig,
  initial: CategoryState,
  gpcActive: boolean,
  cb: ModalCallbacks,
): ModalHandle {
  const L = config.labels;
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
  dialog.setAttribute("aria-label", L.modalTitle);

  // ---- Header -------------------------------------------------------------
  const header = document.createElement("div");
  header.className = "cc-modal-header";
  const titleWrap = document.createElement("div");
  titleWrap.className = "cc-title";
  titleWrap.append(ICON.gear(), textEl("h2", L.modalTitle));
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "cc-close";
  closeBtn.setAttribute("aria-label", L.close);
  closeBtn.append(textEl("span", L.close), textEl("span", "✕", "cc-close-x"));
  closeBtn.addEventListener("click", cb.onClose);
  header.append(titleWrap, closeBtn);
  dialog.appendChild(header);

  // ---- Categories panel ---------------------------------------------------
  const catPanel = document.createElement("div");
  catPanel.className = "cc-panel cc-panel-categories";

  if (gpcActive) {
    const notice = document.createElement("p");
    notice.className = "cc-gpc-notice";
    notice.textContent = L.gpcNotice + " ";
    if (config.policyUrl) {
      const link = document.createElement("a");
      link.href = config.policyUrl;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = L.policyLinkText;
      notice.appendChild(link);
    }
    catPanel.appendChild(notice);

    const honored = document.createElement("div");
    honored.className = "cc-gpc-honored";
    honored.setAttribute("role", "status");
    honored.append(ICON.check(), textEl("span", L.gpcHonored));
    catPanel.appendChild(honored);
  } else if (config.policyUrl) {
    const intro = document.createElement("p");
    intro.className = "cc-gpc-notice";
    intro.textContent = L.bannerText + " ";
    const link = document.createElement("a");
    link.href = config.policyUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = L.policyLinkText;
    intro.appendChild(link);
    catPanel.appendChild(intro);
  }

  for (const key of CATEGORY_KEYS) {
    const cat = config.categories[key];
    if (!cat) continue;
    catPanel.appendChild(buildCard(key, cat, config, initial, toggles, viewDetail));
  }
  dialog.appendChild(catPanel);

  // ---- Detail panel (cookie list for one category) ------------------------
  const detailPanel = document.createElement("div");
  detailPanel.className = "cc-panel cc-panel-detail";
  detailPanel.hidden = true;
  dialog.appendChild(detailPanel);

  // ---- Footers ------------------------------------------------------------
  const catFooter = document.createElement("div");
  catFooter.className = "cc-modal-actions";
  catFooter.append(
    actionButton(L.rejectNonEssential, cb.onRejectNonEssential, "cc-secondary"),
    actionButton(L.acceptAll, cb.onAcceptAll, "cc-primary"),
    actionButton(L.savePreferences, () => cb.onSave(readToggles()), "cc-primary"),
  );
  dialog.appendChild(catFooter);

  const detailFooter = document.createElement("div");
  detailFooter.className = "cc-modal-actions";
  detailFooter.hidden = true;
  detailFooter.append(
    actionButton(L.resetToDefault, resetToggles, "cc-secondary"),
    actionButton(L.confirmChoices, () => cb.onSave(readToggles()), "cc-primary"),
  );
  dialog.appendChild(detailFooter);

  // ---- Behavior -----------------------------------------------------------
  function readToggles(): CategoryState {
    return {
      necessary: true,
      analytics: toggles.analytics?.checked ?? false,
      functional: toggles.functional?.checked ?? false,
      marketing: toggles.marketing?.checked ?? false,
    };
  }

  function resetToggles(): void {
    (Object.keys(toggles) as CategoryKey[]).forEach((k) => {
      const t = toggles[k];
      if (t) t.checked = config.categories[k]?.enabled ?? false;
    });
  }

  function showCategories(): void {
    detailPanel.hidden = true;
    detailFooter.hidden = true;
    catPanel.hidden = false;
    catFooter.hidden = false;
  }

  function viewDetail(key: CategoryKey): void {
    detailPanel.replaceChildren(buildDetail(key, config, showCategories));
    catPanel.hidden = true;
    catFooter.hidden = true;
    detailPanel.hidden = false;
    detailFooter.hidden = false;
  }

  overlay.appendChild(dialog);
  return { overlay, dialog };
}

// --- Card builder ----------------------------------------------------------
function buildCard(
  key: CategoryKey,
  cat: CookieConsentConfig["categories"][CategoryKey],
  config: CookieConsentConfig,
  initial: CategoryState,
  toggles: Partial<Record<CategoryKey, HTMLInputElement>>,
  onView: (key: CategoryKey) => void,
): HTMLElement {
  const L = config.labels;
  const card = document.createElement("div");
  card.className = "cc-card";

  const head = document.createElement("div");
  head.className = "cc-card-head";
  head.appendChild(textEl("h3", L.categoryNames[key]));

  if (cat.locked) {
    const badge = document.createElement("span");
    badge.className = "cc-badge";
    badge.textContent = L.alwaysActive;
    head.appendChild(badge);
  } else {
    head.appendChild(buildSwitch(key, initial[key], L.categoryNames[key], toggles));
  }
  card.appendChild(head);

  const desc = document.createElement("p");
  desc.className = "cc-card-desc";
  desc.textContent = cat.description ?? L.categoryDescriptions[key];
  card.appendChild(desc);

  const view = document.createElement("button");
  view.type = "button";
  view.className = "cc-view-link";
  view.textContent = L.viewCookies;
  view.addEventListener("click", () => onView(key));
  card.appendChild(view);

  return card;
}

function buildSwitch(
  key: CategoryKey,
  checked: boolean,
  label: string,
  toggles: Partial<Record<CategoryKey, HTMLInputElement>>,
): HTMLElement {
  const wrap = document.createElement("label");
  wrap.className = "cc-switch";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  input.setAttribute("aria-label", label);
  const slider = document.createElement("span");
  slider.className = "cc-slider";
  wrap.append(input, slider);
  toggles[key] = input;
  return wrap;
}

// --- Detail (cookie list) builder ------------------------------------------
function buildDetail(
  key: CategoryKey,
  config: CookieConsentConfig,
  onBack: () => void,
): HTMLElement {
  const L = config.labels;
  const cat = config.categories[key];
  const wrap = document.createElement("div");

  const back = document.createElement("button");
  back.type = "button";
  back.className = "cc-back";
  back.append(ICON.back(), textEl("span", L.backToCategories));
  back.addEventListener("click", onBack);
  wrap.appendChild(back);

  wrap.appendChild(textEl("h3", L.categoryNames[key], "cc-detail-title"));
  wrap.appendChild(textEl("p", cat.description ?? L.categoryDescriptions[key], "cc-detail-desc"));

  // Toolbar: search + export + print
  const toolbar = document.createElement("div");
  toolbar.className = "cc-toolbar";
  const search = document.createElement("input");
  search.type = "search";
  search.className = "cc-search";
  search.placeholder = L.searchPlaceholder;
  search.setAttribute("aria-label", L.searchPlaceholder);
  const exportBtn = iconButton(L.exportLabel, ICON.exportIcon(), () => exportCsv(key, config));
  const printBtn = iconButton(L.printLabel, ICON.print(), () => printCookies(key, config));
  toolbar.append(search, exportBtn, printBtn);
  wrap.appendChild(toolbar);

  // Table
  const table = document.createElement("table");
  table.className = "cc-table";
  const thead = document.createElement("thead");
  const hr = document.createElement("tr");
  [L.columns.name, L.columns.provider, L.columns.domain, L.columns.expiry].forEach((h) =>
    hr.appendChild(textEl("th", h)),
  );
  thead.appendChild(hr);
  const tbody = document.createElement("tbody");

  function render(filter: string) {
    tbody.replaceChildren();
    const q = filter.trim().toLowerCase();
    const rows = cat.cookies.filter(
      (c) =>
        !q ||
        [c.name, c.provider, c.domain, c.purpose].some((v) => (v || "").toLowerCase().includes(q)),
    );
    if (rows.length === 0) {
      const tr = document.createElement("tr");
      const td = textEl("td", config.labels.noCookies);
      td.setAttribute("colspan", "4");
      td.className = "cc-empty-row";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }
    for (const c of rows) {
      const tr = document.createElement("tr");
      tr.append(
        textEl("td", c.name, "cc-cell-name"),
        textEl("td", c.provider || L.notAvailable),
        textEl("td", c.domain || L.notAvailable),
        textEl("td", c.duration || L.notAvailable),
      );
      tbody.appendChild(tr);
    }
  }
  render("");
  search.addEventListener("input", () => render(search.value));

  table.append(thead, tbody);
  const scroll = document.createElement("div");
  scroll.className = "cc-table-scroll";
  scroll.appendChild(table);
  wrap.appendChild(scroll);
  return wrap;
}

// --- Export / Print --------------------------------------------------------
function rowsCsv(key: CategoryKey, config: CookieConsentConfig): string {
  const L = config.labels;
  const head = [L.columns.name, L.columns.provider, L.columns.domain, L.columns.expiry, "Purpose"];
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [head.map(esc).join(",")];
  for (const c of config.categories[key].cookies) {
    lines.push(
      [c.name, c.provider || L.notAvailable, c.domain || L.notAvailable, c.duration || L.notAvailable, c.purpose || L.notAvailable]
        .map(esc)
        .join(","),
    );
  }
  return lines.join("\n");
}

function exportCsv(key: CategoryKey, config: CookieConsentConfig): void {
  try {
    const blob = new Blob([rowsCsv(key, config)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cookies-${key}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    /* download not supported in this environment */
  }
}

function printCookies(key: CategoryKey, config: CookieConsentConfig): void {
  const L = config.labels;
  const win = window.open("", "_blank", "width=720,height=600");
  if (!win) return;
  const doc = win.document;
  doc.title = `${L.categoryNames[key]} — cookies`;
  const h = doc.createElement("h2");
  h.textContent = L.categoryNames[key];
  const table = doc.createElement("table");
  table.setAttribute("border", "1");
  table.style.borderCollapse = "collapse";
  const thead = doc.createElement("thead");
  const hr = doc.createElement("tr");
  [L.columns.name, L.columns.provider, L.columns.domain, L.columns.expiry].forEach((t) => {
    const th = doc.createElement("th");
    th.textContent = t;
    th.style.padding = "6px 10px";
    hr.appendChild(th);
  });
  thead.appendChild(hr);
  const tbody = doc.createElement("tbody");
  for (const c of config.categories[key].cookies) {
    const tr = doc.createElement("tr");
    [c.name, c.provider || L.notAvailable, c.domain || L.notAvailable, c.duration || L.notAvailable].forEach((v) => {
      const td = doc.createElement("td");
      td.textContent = v;
      td.style.padding = "6px 10px";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
  table.append(thead, tbody);
  doc.body.append(h, table);
  win.focus();
  win.print();
}

// --- Small DOM helpers -----------------------------------------------------
function textEl(tag: string, text: string, className?: string): HTMLElement {
  const el = document.createElement(tag);
  el.textContent = text;
  if (className) el.className = className;
  return el;
}

function actionButton(label: string, onClick: () => void, cls?: string): HTMLButtonElement {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = label;
  if (cls) b.className = cls;
  b.addEventListener("click", onClick);
  return b;
}

function iconButton(label: string, icon: SVGElement, onClick: () => void): HTMLButtonElement {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "cc-icon-btn";
  b.append(icon, textEl("span", label));
  b.addEventListener("click", onClick);
  return b;
}

export type { CookieDef };
