import { useEffect } from "react";

/**
 * Scroll reveals, restrained: only elements marked `data-reveal` (section
 * headings and project covers) and only once each.
 *
 * Hidden states exist only under `html.motion-ok`, a class set by an inline
 * script in <head> when the visitor has not asked for reduced motion. If the
 * app never starts, that script removes the class again after a few seconds,
 * so content can never stay hidden. Everything that animates leaves no style
 * behind when it ends: at rest the page is exactly the static design.
 */
export const MOTION_BOOT = `(function(){var d=document.documentElement;try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-ok');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion-ok')},4000)}catch(e){}})();`;

const STAGGER_MS = 90;

export function useRevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    if (!root.classList.contains("motion-ok") || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Elements that arrive together (a row of covers) follow each other.
        let k = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty("--reveal-delay", `${k++ * STAGGER_MS}ms`);
          el.setAttribute("data-in", "");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = (scope: ParentNode) => {
      scope
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])")
        .forEach((el) => io.observe(el));
    };
    scan(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches("[data-reveal]:not([data-in])")) io.observe(n);
          scan(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
