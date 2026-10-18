import { useState } from "react";
import { projectText, type Project } from "@/data/projects";
import { useCopy, useLang } from "@/i18n/lang";

type Props = {
  project: Project;
  /** Signed URL of the project's first image, if it has one. */
  src?: string;
  /** True while we don't yet know whether the project has images. */
  pending?: boolean;
  /** Frame ratio as width / height. */
  ratio: number;
  sizes?: string;
  eager?: boolean;
  /** Let the frame take the artwork's proportions (default). Off for uniform grids. */
  adapt?: boolean;
  /**
   * Show the "open" bar along the bottom of the cover: what clicking does,
   * and how many pieces are inside. Use it wherever the cover is a link.
   */
  openBar?: boolean;
  /** Number of images in the project, shown in the open bar. */
  count?: number;
  className?: string;
};

/**
 * The cover frame for a project.
 *
 * - The frame starts at `ratio` and then takes the artwork's own proportions
 *   (between 3:4 portrait and 16:9 landscape), so covers are never cropped.
 *   Anything more extreme than that range is shown whole inside the frame.
 * - With no images yet, it shows the club's crest on its own colour.
 */
const MIN_RATIO = 0.75;
const MAX_RATIO = 16 / 9;
export function ProjectCover({
  project,
  src,
  pending,
  ratio,
  sizes,
  eager,
  adapt = true,
  openBar = false,
  count,
  className = "",
}: Props) {
  const copy = useCopy();
  const t = copy.project;
  const text = projectText(project, useLang());
  const [frame, setFrame] = useState(ratio);
  const [fit, setFit] = useState<"cover" | "contain">("cover");
  const [loaded, setLoaded] = useState(false);

  const cover = (
    <div className={`tile-media well relative ${className}`} style={{ aspectRatio: String(frame) }}>
      {src ? (
        <img
          src={src}
          alt={`${project.title}: ${text.discipline}`}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          onLoad={(e) => {
            const img = e.currentTarget;
            const r = img.naturalWidth / img.naturalHeight;
            if (adapt) {
              const clamped = Math.min(MAX_RATIO, Math.max(MIN_RATIO, r));
              setFrame(clamped);
              if (Math.abs(Math.log(r / clamped)) > 0.04) setFit("contain");
            } else if (Math.abs(Math.log(r / ratio)) > 0.3) {
              setFit("contain");
            }
            setLoaded(true);
          }}
          className="absolute inset-0 h-full w-full"
          style={{
            objectFit: fit,
            padding: fit === "contain" ? "4%" : undefined,
            opacity: loaded ? 1 : 0,
          }}
        />
      ) : pending ? null : (
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ background: project.fallbackTone }}
        >
          <img
            src={project.fallbackCover}
            alt={t.crest(project.client)}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-contain"
            style={{ transform: `scale(${(project.fallbackScale ?? 1) * 0.82})` }}
          />
        </div>
      )}
      {project.nda && !openBar && (
        <span className="absolute left-3 top-3 bg-night/85 px-2.5 py-1.5 label !text-chalk backdrop-blur">
          {t.underNda}
        </span>
      )}
    </div>
  );

  if (!openBar) return cover;
  return (
    <div>
      {cover}
      <span className="tile-open" aria-hidden>
        <span className="tile-open-label">
          {project.nda ? copy.tile.openNda : copy.tile.open}
          <svg viewBox="0 0 16 16" width="14" height="14" className="tile-open-icon">
            <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <span className="tile-open-meta tabular-nums">
          {project.nda ? copy.tile.nda : count ? copy.tile.images(count) : ""}
        </span>
      </span>
    </div>
  );
}
