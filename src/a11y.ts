// Shadow-DOM-aware focus trap (zero-dep, eng-review Finding 5). Inside a shadow
// root, document.activeElement returns the host, so we query tabbables within the
// shadowRoot and read shadowRoot.activeElement. Handles Tab/Shift-Tab wrap, ESC,
// and restores focus to the trigger on release.

const TABBABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface FocusTrap {
  release(): void;
}

export function createFocusTrap(
  container: HTMLElement,
  root: ShadowRoot,
  onEscape: () => void,
): FocusTrap {
  const previouslyFocused = root.activeElement as HTMLElement | null;

  function tabbables(): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(TABBABLE)).filter(
      (el) => el.offsetParent !== null || el === root.activeElement,
    );
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onEscape();
      return;
    }
    if (e.key !== "Tab") return;
    const items = tabbables();
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = root.activeElement as HTMLElement | null;
    if (e.shiftKey && (active === first || !container.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  container.addEventListener("keydown", onKeydown);
  // Move focus into the trap.
  const items = tabbables();
  if (items.length > 0) items[0].focus();

  return {
    release() {
      container.removeEventListener("keydown", onKeydown);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    },
  };
}
