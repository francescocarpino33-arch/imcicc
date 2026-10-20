import { useEffect } from "react";

/**
 * Interactive headlines: the word under the pointer rolls letter by letter and
 * comes back in IMCICC orange (chalk on the orange plate, or where the title
 * is already orange). Moving across a headline sends a wave through it.
 *
 * Same principle as hover-roll.ts: the real text is never split. While a word
 * is hovered, an aria-hidden overlay is built over that word only: a mask in
 * the background colour that hides the real glyphs, and one masked box per
 * letter at the exact position the browser laid it out. On leave the word
 * rolls back and the overlay is removed, so at rest the page is untouched.
 *
 * Fine pointers only; nothing happens on touch screens or with reduced motion.
 */

const HEADLINES = "h1.voice, h2.voice, h3.voice, .tile-title";
const DURATION = 560; // ms, matches .hl-glyph transition in styles.css
const STAGGER = 24;
const FONT_PROPS = [
  "font-family",
  "font-size",
  "font-weight",
  "font-stretch",
  "font-style",
  "letter-spacing",
  "text-transform",
] as const;
// \s also matches the non-breaking spaces used in the hero headline.
const BOUNDARY = /\s/;

type Word = {
  key: string;
  host: HTMLElement;
  layer: HTMLElement;
  rect: DOMRect;
  count: number;
  timer: number;
};

const allowed = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function caretAt(x: number, y: number): { node: Node; offset: number } | null {
  const doc = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
  };
  if (doc.caretPositionFromPoint) {
    const p = doc.caretPositionFromPoint(x, y);
    return p ? { node: p.offsetNode, offset: p.offset } : null;
  }
  const r = document.caretRangeFromPoint?.(x, y);
  return r ? { node: r.startContainer, offset: r.startOffset } : null;
}

function background(el: HTMLElement): string {
  for (let e: HTMLElement | null = el; e; e = e.parentElement) {
    const bg = getComputedStyle(e).backgroundColor;
    if (bg && bg !== "transparent" && !/rgba\(.*,\s*0\)$/.test(bg)) return bg;
  }
  return "#000";
}

/** The word under the pointer, if the pointer is really on it (not in a gap). */
function wordAt(x: number, y: number, host: HTMLElement) {
  const caret = caretAt(x, y);
  if (!caret || caret.node.nodeType !== Node.TEXT_NODE || !host.contains(caret.node)) return null;
  const node = caret.node as Text;
  const str = node.data;
  let a = Math.min(caret.offset, str.length);
  let b = a;
  // The caret can sit just after the last letter: step back into the word.
  if (a > 0 && (a === str.length || BOUNDARY.test(str[a])) && !BOUNDARY.test(str[a - 1])) {
    a--;
    b--;
  }
  if (!str[a] || BOUNDARY.test(str[a])) return null;
  while (a > 0 && !BOUNDARY.test(str[a - 1])) a--;
  while (b < str.length && !BOUNDARY.test(str[b])) b++;
  const range = document.createRange();
  range.setStart(node, a);
  range.setEnd(node, b);
  const rects = range.getClientRects();
  const pad = 2;
  for (const r of rects) {
    if (x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad) {
      return { node, a, b, range };
    }
  }
  return null;
}

let uid = 0;
const ids = new WeakMap<Node, number>();
const idOf = (n: Node) => {
  if (!ids.has(n)) ids.set(n, ++uid);
  return ids.get(n)!;
};

let measure: CanvasRenderingContext2D | null = null;

/**
 * The ink of a word, vertically: from the top of its tallest letter to the
 * bottom of its lowest one, relative to the top of the text's line box. Big
 * titles are set with tight leading, so the browser's text box would overlap
 * the lines above and below; the overlay must cover the letters and nothing else.
 */
function inkBounds(text: string, cs: CSSStyleDeclaration) {
  measure ??= document.createElement("canvas").getContext("2d");
  const size = parseFloat(cs.fontSize);
  if (!measure) return { top: 0, height: size * 1.2 };
  measure.font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
  const stretch = parseFloat(cs.fontStretch);
  measure.fontStretch = stretch < 80 ? "condensed" : stretch > 110 ? "expanded" : "normal";
  const m = measure.measureText(text);
  const pad = size * 0.025;
  const top = m.fontBoundingBoxAscent - m.actualBoundingBoxAscent - pad;
  const height = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + pad * 2;
  return { top, height };
}

function build(host: HTMLElement, node: Text, a: number, b: number, range: Range): Word | null {
  const rects = range.getClientRects();
  if (rects.length !== 1) return null; // a word broken across lines: leave it alone
  const word = rects[0];
  const origin = host.getBoundingClientRect();
  const ox = origin.left + host.clientLeft;
  const oy = origin.top + host.clientTop;
  const parent = node.parentElement!;
  const cs = getComputedStyle(parent);
  let font = "";
  for (const p of FONT_PROPS) font += `${p}:${cs.getPropertyValue(p)};`;

  const onPlate = !!host.closest(".plate, .bg-signal");
  const isOrange = cs.color.replace(/\s/g, "") === "rgb(255,106,26)";
  const accent = onPlate || isOrange ? "var(--chalk)" : "var(--signal)";

  // The overlay covers only the ink of the word; letters travel just past it.
  const ink = inkBounds(node.data.slice(a, b), cs);
  const travel = ink.height + 2;

  const layer = document.createElement("span");
  layer.className = "hl-layer";
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = `left:${word.left - ox}px;top:${word.top - oy + ink.top}px;width:${word.width}px;height:${ink.height}px;background:${background(host)};--hl-accent:${accent};--hl-travel:${travel}px;color:${cs.color}`;

  const r = document.createRange();
  let count = 0;
  let i = a;
  for (const ch of node.data.slice(a, b)) {
    r.setStart(node, i);
    r.setEnd(node, i + ch.length);
    i += ch.length;
    const cr = r.getBoundingClientRect();
    if (!cr.width) continue;
    const box = document.createElement("span");
    box.className = "hl-box";
    box.style.cssText = `${font}left:${cr.left - word.left}px;top:0;width:${cr.width}px;height:${ink.height}px;--i:${count++}`;
    const glyph = document.createElement("span");
    glyph.className = "hl-glyph";
    glyph.style.cssText = `top:${cr.top - word.top - ink.top}px;height:${cr.height}px;line-height:${cr.height}px`;
    glyph.textContent = ch;
    glyph.dataset.copy = ch;
    box.appendChild(glyph);
    layer.appendChild(box);
  }
  if (!count) return null;
  host.classList.add("hl-host");
  host.appendChild(layer);
  void layer.offsetWidth;
  return { key: `${idOf(node)}:${a}`, host, layer, rect: word, count, timer: 0 };
}

export function useHeadlineRoll() {
  useEffect(() => {
    const words = new Map<string, Word>();
    let current: Word | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const leave = (w: Word) => {
      w.layer.classList.remove("is-up");
      window.clearTimeout(w.timer);
      w.timer = window.setTimeout(
        () => {
          w.layer.remove();
          words.delete(w.key);
          if (![...words.values()].some((o) => o.host === w.host))
            w.host.classList.remove("hl-host");
        },
        DURATION + w.count * STAGGER + 60,
      );
    };

    const update = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const host = (e.target as Element | null)?.closest?.<HTMLElement>(HEADLINES) ?? null;
      // Not while a headline is still making its entrance.
      const hit =
        host && !host.getAnimations({ subtree: true }).some((an) => an instanceof CSSAnimation)
          ? wordAt(e.clientX, e.clientY, host)
          : null;
      const key = hit ? `${idOf(hit.node)}:${hit.a}` : null;
      if (current && current.key === key) return;
      if (current) leave(current);
      current = null;
      if (!hit || !host) return;
      let w = words.get(key!);
      if (w) {
        window.clearTimeout(w.timer);
      } else {
        w = build(host, hit.node, hit.a, hit.b, hit.range) ?? undefined;
        if (!w) return;
        words.set(w.key, w);
      }
      w.layer.classList.add("is-up");
      current = w;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !allowed()) return;
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onOut = (e: PointerEvent) => {
      if (!current) return;
      const to = e.relatedTarget as Element | null;
      if (to?.closest?.(HEADLINES) === current.host) return;
      leave(current);
      current = null;
    };
    // Scrolling moves the text away from the pointer: let the word go.
    const onScroll = () => {
      if (current) leave(current);
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("scroll", onScroll);
      for (const w of words.values()) w.layer.remove();
      document.querySelectorAll(".hl-host").forEach((h) => h.classList.remove("hl-host"));
    };
  }, []);
}
