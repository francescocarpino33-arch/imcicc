import { Link } from "@tanstack/react-router";
import { useCopy } from "@/i18n/lang";
import acMilan from "@/assets/clients/trimmed/ac-milan.webp";
import astonVilla from "@/assets/clients/trimmed/aston-villa.webp";
import giro from "@/assets/clients/trimmed/giro.webp";
import firs1 from "@/assets/clients/trimmed/firs1.webp";
import arenteiro from "@/assets/clients/trimmed/arenteiro.webp";
import corgomo from "@/assets/clients/trimmed/corgomo.webp";

/**
 * Client logos as a board: one cell per client on a hairline grid, the mark
 * centred and the name underneath, so the row reads as a list of clients
 * rather than loose icons. Marks are set in one colour; heights are tuned per
 * mark so crests and wordmarks look the same size.
 */
const LOGOS = [
  { name: "AC Milan", slug: "ac-milan", src: acMilan, w: 124, h: 200, scale: 1 },
  { name: "Aston Villa", slug: "aston-villa", src: astonVilla, w: 147, h: 200, scale: 1 },
  { name: "Giro d'Italia", slug: "giro-ditalia", src: giro, w: 253, h: 200, scale: 0.92 },
  { name: "FIRS1 Sports", slug: "first", src: firs1, w: 290, h: 70, scale: 0.4 },
  { name: "CD Arenteiro", slug: "arenteiro", src: arenteiro, w: 172, h: 200, scale: 1 },
  { name: "CD Córgomo", slug: "corgomo", src: corgomo, w: 175, h: 200, scale: 1 },
];

export function ClientLogos({ className = "" }: { className?: string }) {
  const t = useCopy();
  return (
    <ul
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-night/25 border border-night/25 ${className}`}
    >
      {LOGOS.map((l) => (
        <li key={l.slug} className="bg-signal">
          <Link
            to="/work/$slug"
            params={{ slug: l.slug }}
            aria-label={t.viewProject(l.name)}
            className="group flex h-full flex-col justify-between gap-6 p-4 md:p-5 transition-colors duration-300 hover:bg-night"
            style={{ minHeight: "clamp(9.5rem, 13vw, 12.5rem)" }}
          >
            <span className="flex flex-1 items-center justify-center">
              <img
                src={l.src}
                alt=""
                width={l.w}
                height={l.h}
                loading="lazy"
                decoding="async"
                className="block w-auto max-w-full [filter:brightness(0)] transition-[filter] duration-300 group-hover:[filter:brightness(0)_invert(1)]"
                style={{ height: `calc(var(--logo-h) * ${l.scale})` }}
              />
            </span>
            <span className="text-[0.8125rem] font-medium wdth-label leading-tight text-night transition-colors duration-300 group-hover:text-chalk">
              {l.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
