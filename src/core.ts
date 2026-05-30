import { resolveConfig, CATEGORY_KEYS, type CookieConsentConfig } from "./config";
import { createConsentStore, type ConsentStore } from "./consent-store";
import { applyConsent } from "./gtm-adapter";
import { createShadowHost, type ShadowHost } from "./ui/shadow-root";
import { createBanner } from "./ui/banner";
import { createFloatingButton } from "./ui/floating-button";
import { createModal } from "./ui/modal";
import { createFocusTrap, type FocusTrap } from "./a11y";
import type { CategoryState } from "./shared";

const INIT_FLAG = "__cookieConsentInitialized";

export interface CookieConsentInstance {
  destroy(): void;
  openPreferences(): void;
  getConsent(): CategoryState | null;
}

function allTrue(): CategoryState {
  return { necessary: true, analytics: true, functional: true, marketing: true };
}
function essentialOnly(): CategoryState {
  return { necessary: true, analytics: false, functional: false, marketing: false };
}

export function init(input: Partial<CookieConsentConfig>): CookieConsentInstance {
  // SPA / double-include guard (eng-review decision: __initialized).
  const w = window as unknown as Record<string, unknown>;
  if (w[INIT_FLAG]) {
    return w[INIT_FLAG] as CookieConsentInstance;
  }

  const config = resolveConfig(input);
  const store: ConsentStore = createConsentStore(config);
  const shadow: ShadowHost = createShadowHost(config.theme);

  let banner: HTMLElement | null = null;
  let fab: HTMLElement | null = null;
  let modalOverlay: HTMLElement | null = null;
  let trap: FocusTrap | null = null;

  function defaultCategories(): CategoryState {
    return {
      necessary: true,
      analytics: config.categories.analytics?.enabled ?? false,
      functional: config.categories.functional?.enabled ?? false,
      marketing: config.categories.marketing?.enabled ?? false,
    };
  }

  function commit(categories: CategoryState) {
    store.write(categories);
    applyConsent(config, categories);
    closeBanner();
    closeModal();
    showFab();
  }

  function showBanner() {
    if (banner) return;
    banner = createBanner(config.labels, {
      onAcceptAll: () => commit(allTrue()),
      onRejectAll: () => commit(essentialOnly()),
      onPreferences: openPreferences,
    });
    shadow.root.appendChild(banner);
  }
  function closeBanner() {
    banner?.remove();
    banner = null;
  }

  function showFab() {
    if (fab) return;
    fab = createFloatingButton(config.labels, openPreferences);
    shadow.root.appendChild(fab);
  }

  function openPreferences() {
    if (modalOverlay) return; // already open
    const current = store.read()?.categories ?? defaultCategories();
    const modal = createModal(config, current, {
      onAcceptAll: () => commit(allTrue()),
      onRejectNonEssential: () => commit(essentialOnly()),
      onSave: (cats) => commit(cats),
      onClose: closeModal,
    });
    modalOverlay = modal.overlay;
    shadow.root.appendChild(modalOverlay);
    // Hide the backdrop banner from AT/keyboard while the modal is up.
    if (banner) {
      banner.setAttribute("inert", "");
      banner.setAttribute("aria-hidden", "true");
    }
    trap = createFocusTrap(modal.dialog, shadow.root, closeModal);
  }
  function closeModal() {
    trap?.release();
    trap = null;
    modalOverlay?.remove();
    modalOverlay = null;
    if (banner) {
      banner.removeAttribute("inert");
      banner.removeAttribute("aria-hidden");
    }
  }

  // Decide banner vs button on load (eng-review: re-prompt precedence in needsPrompt).
  if (store.needsPrompt()) {
    showBanner();
  } else {
    showFab();
  }

  const instance: CookieConsentInstance = {
    destroy() {
      closeModal();
      shadow.destroy();
      delete w[INIT_FLAG];
    },
    openPreferences,
    getConsent() {
      return store.read()?.categories ?? null;
    },
  };
  w[INIT_FLAG] = instance;
  return instance;
}

export { CATEGORY_KEYS };
