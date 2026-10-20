import { Fragment, useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";

/**
 * Headline whose words rise one after another out of their own mask.
 *
 * - `on="load"`: plays as soon as the element appears (page titles), pure CSS,
 *   so it also runs before the app has hydrated.
 * - `on="scroll"`: plays when the heading enters the viewport (section titles).
 *
 * The heading is split into words only while it waits or moves. Once the last
 * word has landed (or straight away when motion is off) it goes back to plain
 * text, so at rest it is exactly the original heading, kerning and all.
 * All motion styles live under `html.motion-ok` in styles.css.
 */
type Props = {
  as?: ElementType;
  text: string;
  on?: "load" | "scroll";
  /** Delay before the first word, in seconds. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export function RevealWords({
  as: Tag = "h2",
  text,
  on = "scroll",
  delay = 0,
  className = "",
  style,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [settled, setSettled] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || settled) return;
    if (!document.documentElement.classList.contains("motion-ok")) {
      setSettled(true);
      return;
    }
    const all = el.querySelectorAll<HTMLElement>(".rw");
    const last = all[all.length - 1];
    if (!last) return;
    // A load reveal may already have finished before the app hydrated.
    if (el.hasAttribute("data-in") && last.getAnimations().length === 0) {
      setSettled(true);
      return;
    }
    const onEnd = (e: AnimationEvent) => {
      if (e.target === last && e.animationName === "rw-rise") setSettled(true);
    };
    el.addEventListener("animationend", onEnd);
    return () => el.removeEventListener("animationend", onEnd);
  }, [settled]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={{ ...style, ["--rw-delay" as string]: `${delay}s` }}
      data-reveal="words"
      data-in={on === "load" ? "" : undefined}
    >
      {settled
        ? text
        : words.map((w, i) => (
            <Fragment key={i}>
              <span className="rw-mask">
                <span className="rw" style={{ ["--i" as string]: i }}>
                  {w}
                </span>
              </span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
    </Tag>
  );
}
