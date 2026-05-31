import { resolveConfig, CATEGORY_KEYS, type CookieConsentConfig } from "./config";
import { createConsentStore, type ConsentStore } from "./consent-store";
import { applyConsent } from "./gtm-adapter";
import { createShadowHost, type ShadowHost } from "./ui/shadow-root";
import { createBanner } from "./ui/banner";
import { createFloatingButton } from "./ui/floating-button";
import { createModal } from "./ui/modal";
import { createFocusTrap, type FocusTrap } from "./a11y";
import { isGpcActive } from "./gpc";
import type { CategoryState } from "./shared";

const INIT_FLAG = "__cookieConsentInitialized";

export interface CookieConsentInstance {
  destroy(): void;
  openPreferences(): void;
  getConsent(): CategoryState | null;
}

// Theme variables the SDK actually consumes. A theme key outside this set (after
// --cc- normalization) is almost always a typo — warn so it's not silently ignored.
const KNOWN_THEME_VARS = new Set([
  "--cc-bg", "--cc-fg", "--cc-muted", "--cc-border", "--cc-surface",
  "--cc-accent", "--cc-accent-fg", "--cc-success", "--cc-success-bg",
  "--cc-success-border", "--cc-radius", "--cc-font", "--cc-font-size",
  "--cc-heading-color", "--cc-heading-size", "--cc-z",
]);

function warn(msg: string): void {
  // eslint-disable-next-line no-console
  console.warn(`[cookie-banner-sdk] ${msg} See https://github.com/ajitbubu/cookie-sdk#configuration`);
}

// DX: surface the common paste/config mistakes loudly-but-non-fatally so an
// integrator who mis-pastes gets a clear pointer instead of a silently-wrong banner.
function warnMisconfig(
  input: Partial<CookieConsentConfig>,
  config: CookieConsentConfig,
): void {
  // 1. No optional categories defined → the preferences modal will be near-empty.
  const optional = (["analytics", "functional", "marketing"] as const).filter(
    (k) => (config.categories[k]?.cookies?.length ?? 0) > 0,
  );
  if (!input.categories || optional.length === 0) {
    warn(
      "no optional cookie categories are configured — the preferences modal will only show 'Strictly Necessary'. Pass `categories` with the cookies your site sets.",
    );
  }
  // 2. Unknown theme variables (typos) — normalize like buildStyles does.
  for (const key of Object.keys(config.theme ?? {})) {
    const norm = key.startsWith("--cc-") ? key : `--cc-${key.replace(/^--/, "")}`;
    if (!KNOWN_THEME_VARS.has(norm)) {
      warn(`theme key "${key}" is not a recognized --cc-* variable and will have no effect.`);
    }
  }
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
    warn(
      "init() called more than once — ignoring this call and returning the existing instance. Call destroy() first if you mean to re-initialize.",
    );
    return w[INIT_FLAG] as CookieConsentInstance;
  }

  const config = resolveConfig(input);
  warnMisconfig(input, config);
  const gpcActive = config.honorGpc && isGpcActive();
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
      // GPC is a "do not sell/share" opt-out: force marketing off as the default.
      marketing: gpcActive ? false : (config.categories.marketing?.enabled ?? false),
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
    banner.classList.add(`cc-pos-${config.position.banner}`);
    shadow.root.appendChild(banner);
  }
  function closeBanner() {
    banner?.remove();
    banner = null;
  }

  function showFab() {
    if (fab) return;
    fab = createFloatingButton(config.labels, openPreferences);
    fab.classList.add(`cc-fab-${config.position.button}`);
    shadow.root.appendChild(fab);
  }

  function openPreferences() {
    if (modalOverlay) return; // already open
    const current = store.read()?.categories ?? defaultCategories();
    const modal = createModal(config, current, gpcActive, {
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
