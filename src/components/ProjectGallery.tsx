import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCopy } from "@/i18n/lang";

type Props = {
  images: string[];
  title: string;
};

type Row =
  | { kind: "full"; items: number[] }
  | { kind: "pair"; items: number[] }
  | { kind: "single"; items: number[]; side: "left" | "right" };

const LANDSCAPE = 1.25;

/**
 * Lays the artwork out in the order set in /admin, uncropped:
 * landscape pieces get a full row, portrait and square pieces pair up,
 * and a portrait left on its own sits beside its caption.
 * Proportions are learned as each image loads; until then a piece is
 * treated as portrait, the most common format for this work.
 */
export function ProjectGallery({ images, title }: Props) {
  const t = useCopy().project;
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [open, setOpen] = useState<number | null>(null);

  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    let pending: number | null = null;
    let singles = 0;
    const flushSingle = () => {
      if (pending === null) return;
      out.push({ kind: "single", items: [pending], side: singles++ % 2 ? "right" : "left" });
      pending = null;
    };
    images.forEach((_, i) => {
      const r = ratios[i] ?? 0.8;
      if (r >= LANDSCAPE) {
        flushSingle();
        out.push({ kind: "full", items: [i] });
      } else if (pending === null) {
        pending = i;
      } else {
        out.push({ kind: "pair", items: [pending, i] });
        pending = null;
      }
    });
    flushSingle();
    return out;
  }, [images, ratios]);

  const total = images.length;
  const caption = (i: number) =>
    `${String(i + 1).padStart(2, "0")} ${t.of} ${String(total).padStart(2, "0")}`;

  const figure = (i: number, extra = "") => (
    <figure key={i} className={extra}>
      <button
        type="button"
        onClick={() => setOpen(i)}
        className="group block w-full cursor-zoom-in well"
        aria-label={t.viewFull(title, i + 1, total)}
      >
        <img
          src={images[i]}
          alt={t.imageAlt(title, i + 1, total)}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          onLoad={(e) => {
            const img = e.currentTarget;
            const r = img.naturalWidth / img.naturalHeight;
            setRatios((prev) => (prev[i] === r ? prev : { ...prev, [i]: r }));
          }}
          className="block w-full h-auto transition-opacity duration-500 group-hover:opacity-90"
        />
      </button>
      <figcaption className="label mt-2.5 tabular-nums">{caption(i)}</figcaption>
    </figure>
  );

  return (
    <>
      <div className="flex flex-col" style={{ gap: "clamp(2.5rem, 6vw, 6rem)" }}>
        {rows.map((row, k) => {
          if (row.kind === "full") {
            return <div key={k}>{figure(row.items[0])}</div>;
          }
          if (row.kind === "pair") {
            return (
              <div
                key={k}
                className="grid grid-cols-1 md:grid-cols-2 items-start"
                style={{ gap: "var(--gutter)" }}
              >
                {row.items.map((i) => figure(i))}
              </div>
            );
          }
          // A portrait on its own: offset left or right so the column keeps its rhythm.
          const i = row.items[0];
          return (
            <div key={k} className="grid-12">
              {figure(
                i,
                `col-span-4 md:col-span-6 ${row.side === "right" ? "md:col-start-6" : "md:col-start-2"}`,
              )}
            </div>
          );
        })}
      </div>

      <Lightbox images={images} title={title} index={open} onIndex={setOpen} />
    </>
  );
}

function Lightbox({
  images,
  title,
  index,
  onIndex,
}: {
  images: string[];
  title: string;
  index: number | null;
  onIndex: (i: number | null) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const total = images.length;
  const t = useCopy().project;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + total) % total);
    },
    [index, total, onIndex],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <dialog
      ref={ref}
      onClose={() => onIndex(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onIndex(null);
      }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-night/95 p-0 text-chalk backdrop:bg-night/80"
      aria-label={t.fullView(title)}
    >
      {index !== null && (
        <div className="flex h-full flex-col">
          <div
            className="frame flex items-center justify-between"
            style={{ height: "var(--nav-h)" }}
          >
            <p className="label tabular-nums !text-chalk">
              {title}{" "}
              <span className="text-concrete">
                {index + 1} {t.of} {total}
              </span>
            </p>
            <button type="button" onClick={() => onIndex(null)} className="btn btn-ghost !min-h-10">
              {t.close}
            </button>
          </div>
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-[var(--gutter)] pb-[var(--gutter)]"
            onClick={(e) => {
              if (e.target === e.currentTarget) onIndex(null);
            }}
          >
            <img
              key={index}
              src={images[index]}
              alt={t.imageAlt(title, index + 1, total)}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {total > 1 && (
            <div className="frame flex justify-between pb-5">
              <button type="button" onClick={() => step(-1)} className="btn btn-ghost !min-h-10">
                {t.previous}
              </button>
              <button type="button" onClick={() => step(1)} className="btn btn-ghost !min-h-10">
                {t.nextImage}
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
