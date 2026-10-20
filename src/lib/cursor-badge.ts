import { useEffect } from "react";

/**
 * Over a project cover, an orange "View project" label follows the cursor
 * (with a little lag, so it feels attached rather than glued). The label is
 * the cover's own open-bar text, so it is always in the visitor's language
 * and says "Learn more" on the NDA project. Fine pointers only.
 */
export function useCursorBadge() {
  useEffect(() => {
    const fine = () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const badge = document.createElement("div");
    badge.className = "cursor-badge";
    badge.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    badge.appendChild(text);
    badge.insertAdjacentHTML(
      "beforeend",
      '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    );
    document.body.appendChild(badge);

    let x = 0;
    let y = 0;
    let bx = 0;
    let by = 0;
    let active: Element | null = null;
    let frame = 0;

    const tick = () => {
      bx += (x - bx) * 0.22;
      by += (y - by) * 0.22;
      badge.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
      frame = Math.abs(x - bx) + Math.abs(y - by) > 0.3 || active ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !fine()) return;
      x = e.clientX;
      y = e.clientY;
      const media = (e.target as Element | null)?.closest?.(".tile .tile-media") ?? null;
      if (media !== active) {
        active = media;
        if (media) {
          // Only the label's own text: a hover-roll overlay may be inside it too.
          const el = media.closest(".tile")?.querySelector(".tile-open-label");
          const label = el
            ? [...el.childNodes]
                .filter((n) => n.nodeType === Node.TEXT_NODE)
                .map((n) => n.textContent)
                .join("")
            : "";
          if (!label) {
            active = null;
          } else {
            text.textContent = label.trim();
            if (!badge.classList.contains("is-on")) {
              bx = x;
              by = y;
            }
          }
        }
        badge.classList.toggle("is-on", !!active);
        document.documentElement.classList.toggle("badge-on", !!active);
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const hide = () => {
      active = null;
      badge.classList.remove("is-on");
      document.documentElement.classList.remove("badge-on");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("click", hide);
    return () => {
      document.removeEventListener("click", hide);
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("blur", hide);
      badge.remove();
      document.documentElement.classList.remove("badge-on");
    };
  }, []);
}
