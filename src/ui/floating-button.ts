import type { Labels } from "../config";

export function createFloatingButton(labels: Labels, onOpen: () => void): HTMLElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "cc-fab";
  btn.setAttribute("aria-label", labels.reopenButton);
  btn.title = labels.reopenButton;
  btn.textContent = "🍪"; // cookie emoji, set as text (never innerHTML)
  btn.addEventListener("click", onOpen);
  return btn;
}
