import { Link } from "@tanstack/react-router";
import acMilan from "@/assets/clients/trimmed/ac-milan.webp";
import astonVilla from "@/assets/clients/trimmed/aston-villa.webp";
import giro from "@/assets/clients/trimmed/giro.webp";
import firs1 from "@/assets/clients/trimmed/firs1.webp";
import arenteiro from "@/assets/clients/trimmed/arenteiro.webp";
import corgomo from "@/assets/clients/trimmed/corgomo.webp";

/**
 * Client logos, set in one colour so they read as a single row.
 * Heights are tuned per mark so crests and wordmarks look the same size.
 */
const LOGOS = [
  { name: "AC Milan", slug: "ac-milan", src: acMilan, w: 124, h: 200, scale: 1 },
  { name: "Aston Villa", slug: "aston-villa", src: astonVilla, w: 147, h: 200, scale: 1 },
  { name: "Giro d'Italia", slug: "giro-ditalia", src: giro, w: 253, h: 200, scale: 0.95 },
  { name: "FIRS1 Sports", slug: "first", src: firs1, w: 290, h: 70, scale: 0.42 },
  { name: "CD Arenteiro", slug: "arenteiro", src: arenteiro, w: 172, h: 200, scale: 1 },
  { name: "CD Córgomo", slug: "corgomo", src: corgomo, w: 175, h: 200, scale: 1 },
];

export function ClientLogos({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "chalk";
  className?: string;
}) {
  const filter = tone === "ink" ? "brightness(0)" : "brightness(0) invert(1)";
  return (
    <ul className={`flex flex-wrap items-center gap-x-10 gap-y-8 md:gap-x-14 ${className}`}>
      {LOGOS.map((l) => (
        <li key={l.slug}>
          <Link
            to="/work/$slug"
            params={{ slug: l.slug }}
            aria-label={`${l.name}, view project`}
            className="block opacity-90 transition-opacity duration-300 hover:opacity-60"
          >
            <img
              src={l.src}
              alt={l.name}
              width={l.w}
              height={l.h}
              loading="lazy"
              decoding="async"
              className="block w-auto"
              style={{ height: `calc(var(--logo-h) * ${l.scale})`, filter }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
