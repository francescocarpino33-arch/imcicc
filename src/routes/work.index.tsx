import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { DURATION, EASE_STANDARD, STAGGER, fadeUp, fadeUpContainer } from "@/lib/motion";
import { projects } from "@/data/projects";

const FILTERS = ["all", "Sports", "Campaign", "Branding", "Editorial", "Social"] as const;

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Projects — IMCICC" },
      { name: "description", content: "Selected projects: AC Milan, Aston Villa, Giro d'Italia, FIRS1, CD Arenteiro, CD Córgomo and more." },
      { property: "og:title", content: "Projects — IMCICC" },
      { property: "og:description", content: "Editorial archive of sports campaigns, brand systems and art direction." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const reduced = useReducedMotion();

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter as string))),
    [filter],
  );

  return (
    <div className="pt-40 pb-32 px-6 md:px-12">
      <motion.section
        className="mb-24 md:mb-32 max-w-5xl"
        initial={reduced ? "show" : "hidden"}
        animate="show"
        variants={fadeUpContainer}
      >
        <motion.h1
          variants={fadeUp}
          className="font-display font-light tracking-[-0.03em] leading-[0.85]"
          style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
        >
          brands I<br /><span className="text-glow">worked with.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-10 max-w-2xl text-lg md:text-xl text-primary-glow/70 leading-relaxed">
          Visuals from the projects.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative cursor-pointer font-display text-sm tracking-[0.2em] font-light pb-2 transition-colors transition-standard ${
                  active ? "text-primary-glow border-b border-primary-glow" : "text-primary-glow/50 hover:text-primary-glow"
                }`}
              >
                {f}
              </button>
            );
          })}
        </motion.div>
      </motion.section>

      <section className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-24">
        {filtered.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduced ? 0 : DURATION.entrance, delay: reduced ? 0 : (i % 2) * STAGGER, ease: EASE_STANDARD }}
          >
            <Link to="/work/$slug" params={{ slug: p.slug }} className="project-card group block">
              <div className="project-card-media relative overflow-hidden aspect-[4/5]">
                <div
                  className="absolute inset-0"
                  style={p.coverScale ? { transform: `scale(${p.coverScale})` } : undefined}
                >
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                  <h3 className="font-display text-2xl md:text-3xl font-light tracking-[-0.02em] group-hover:text-primary-glow transition-colors transition-standard">
                    {p.title}
                  </h3>
                  <p className="font-display text-xs text-primary-glow/60 tracking-[0.25em] mt-3">
                    {p.category}
                  </p>
                </div>
                <span className="font-display text-xs text-primary-glow/60 tracking-[0.25em] mt-2 shrink-0">
                  {p.year}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}