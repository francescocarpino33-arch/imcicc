import { useEffect } from "react";

/**
 * Hover "roll" for link and button labels (pattern from the motion reference:
 * the label slides up and an identical copy rises from below, letter by letter
 * on text links, as one piece on buttons).
 *
 * Why it is built this way: the design at rest must not change at all. So the
 * real text is never split or wrapped. Only while a pointer is over a label
 * (or it has keyboard focus) is an aria-hidden overlay built on top of it, one
 * masked box per glyph at the exact position the browser laid that glyph out,
 * kerning included. The real glyphs are made transparent with
 * -webkit-text-fill-color (underlines, icons and colours are untouched), the
 * overlay rolls, and on leave it rolls back and is removed.
 *
 * One delegated listener on the document handles every label on the site.
 * Touch screens and reduced-motion users never see it.
 */

type Mode = "chars" | "word";

/** What rolls, and how. The first selector that matches the hovered element wins. */
const TARGETS: { trigger: string; label?: string; mode: Mode }[] = [
  { trigger: ".tile", label: ".tile-open-label", mode: "word" },
  { trigger: ".btn", mode: "word" },
  { trigger: ".nav-link", mode: "chars" },
  { trigger: ".link", mode: "chars" },
];
const TRIGGER_SELECTOR = TARGETS.map((t) => t.trigger).join(",");

const DURATION = 520; // ms, matches .roll-glyph transition in styles.css
const STAGGER = 18; // ms between letters

const FONT_PROPS = [
  "font-family",
  "font-size",
  "font-weight",
  "font-stretch",
  "font-style",
  "font-variant-numeric",
  "font-feature-settings",
  "font-variation-settings",
  "letter-spacing",
  "text-transform",
] as const;

type Roll = { host: HTMLElement; layer: HTMLElement; timer: number; count: number };
const rolls = new WeakMap<HTMLElement, Roll>();

const allowed = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resolve(
  el: Element | null,
): { trigger: HTMLElement; host: HTMLElement; mode: Mode } | null {
  const trigger = el?.closest<HTMLElement>(TRIGGER_SELECTOR);
  if (!trigger || trigger.closest("[data-no-roll]")) return null;
  for (const t of TARGETS) {
    if (!trigger.matches(t.trigger)) continue;
    const host = t.label ? trigger.querySelector<HTMLElement>(t.label) : trigger;
    if (!host) return null;
    return { trigger, host, mode: t.mode };
  }
  return null;
}

function build(host: HTMLElement, mode: Mode): Roll | null {
  const origin = host.getBoundingClientRect();
  if (!origin.width) return null;
  const ox = origin.left + host.clientLeft;
  const oy = origin.top + host.clientTop;

  const layer = document.createElement("span");
  layer.className = "roll-layer";
  layer.setAttribute("aria-hidden", "true");

  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let count = 0;
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const str = node.data;
    const parent = node.parentElement;
    if (!parent || !str.trim() || parent.closest("svg")) continue;
    const cs = getComputedStyle(parent);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    let font = "";
    for (const p of FONT_PROPS) font += `${p}:${cs.getPropertyValue(p)};`;
    // Opacity set on an inner span (e.g. the image count on a button) is carried over.
    let opacity = 1;
    for (let e: HTMLElement | null = parent; e && e !== host; e = e.parentElement) {
      opacity *= Number(getComputedStyle(e).opacity);
    }

    // Pieces: whole runs for buttons (one line only), single characters for links.
    const pieces: [number, number][] = [];
    range.selectNodeContents(node);
    if (mode === "word" && range.getClientRects().length === 1) {
      pieces.push([0, str.length]);
    } else {
      let i = 0;
      for (const ch of str) {
        pieces.push([i, i + ch.length]);
        i += ch.length;
      }
    }

    for (const [a, b] of pieces) {
      const text = str.slice(a, b);
      if (!text.trim()) continue;
      range.setStart(node, a);
      range.setEnd(node, b);
      const r = range.getBoundingClientRect();
      if (!r.width) continue;
      const box = document.createElement("span");
      box.className = "roll-box";
      box.style.cssText = `${font}left:${r.left - ox}px;top:${r.top - oy}px;height:${r.height}px;line-height:${r.height}px;opacity:${opacity};--i:${count}`;
      const glyph = document.createElement("span");
      glyph.className = "roll-glyph";
      glyph.textContent = text;
      glyph.dataset.copy = text;
      box.appendChild(glyph);
      layer.appendChild(box);
      count++;
    }
  }
  if (!count) return null;
  host.appendChild(layer);
  host.classList.add("roll-host");
  // Paint the start position before rolling.
  void layer.offsetWidth;
  return { host, layer, timer: 0, count };
}

function teardown(roll: Roll) {
  window.clearTimeout(roll.timer);
  roll.layer.remove();
  roll.host.classList.remove("roll-host", "roll-up");
  rolls.delete(roll.host);
}

function enter(host: HTMLElement, mode: Mode) {
  let roll = rolls.get(host);
  if (roll) {
    window.clearTimeout(roll.timer);
  } else {
    roll = build(host, mode) ?? undefined;
    if (!roll) return;
    rolls.set(host, roll);
  }
  host.classList.add("roll-up");
}

function leave(host: HTMLElement) {
  const roll = rolls.get(host);
  if (!roll) return;
  host.classList.remove("roll-up");
  window.clearTimeout(roll.timer);
  roll.timer = window.setTimeout(() => teardown(roll), DURATION + roll.count * STAGGER + 40);
}

export function useHoverRoll() {
  useEffect(() => {
    let current: HTMLElement | null = null;

    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !allowed()) return;
      const hit = resolve(e.target as Element);
      if (hit?.host === current) return;
      if (current) leave(current);
      current = hit?.host ?? null;
      if (hit) enter(hit.host, hit.mode);
    };
    const onOut = (e: PointerEvent) => {
      if (!current) return;
      const next = resolve(e.relatedTarget as Element | null);
      if (next?.host === current) return;
      leave(current);
      current = null;
    };
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!allowed() || !el.matches?.(":focus-visible")) return;
      const hit = resolve(el);
      if (hit) enter(hit.host, hit.mode);
    };
    const onFocusOut = (e: FocusEvent) => {
      const hit = resolve(e.target as Element);
      if (hit && hit.host !== current) leave(hit.host);
    };
    // A click can change the label (e.g. "Copy email" → "Copied"): drop the overlay at once.
    const onClick = (e: MouseEvent) => {
      const hit = resolve(e.target as Element);
      const roll = hit && rolls.get(hit.host);
      if (roll) teardown(roll);
      if (hit?.host === current) current = null;
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("click", onClick, true);
    };
  }, []);
}
