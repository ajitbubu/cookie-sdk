import type { Labels } from "../config";

const SVG_NS = "http://www.w3.org/2000/svg";

// Inline SVG cookie glyph (currentColor so it themes with --cc-fg). Built via
// createElementNS — no innerHTML, consistent across every OS (unlike an emoji).
function cookieIcon(): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "37");
  svg.setAttribute("height", "37");
  svg.setAttribute("fill", "#e02424");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.8");
  svg.setAttribute("aria-hidden", "true");

  const body = document.createElementNS(SVG_NS, "path");
  body.setAttribute(
    "d",
    "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4-4 4 4 0 0 1-4-4 2 2 0 0 0-2-2z",
  );
  svg.appendChild(body);

  // Chocolate chips
  for (const [cx, cy] of [
    [9, 9],
    [14, 12],
    [10, 15],
  ] as const) {
    const chip = document.createElementNS(SVG_NS, "circle");
    chip.setAttribute("cx", String(cx));
    chip.setAttribute("cy", String(cy));
    chip.setAttribute("r", "1");
    chip.setAttribute("fill", "currentColor");
    chip.setAttribute("stroke", "none");
    svg.appendChild(chip);
  }
  return svg;
}

export function createFloatingButton(labels: Labels, onOpen: () => void): HTMLElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "cc-fab";
  btn.setAttribute("aria-label", labels.reopenButton);
  btn.title = labels.reopenButton;
  btn.appendChild(cookieIcon());
  btn.addEventListener("click", onOpen);
  return btn;
}
