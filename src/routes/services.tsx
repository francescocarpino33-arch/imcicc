import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

const SERVICES = [
  {
    n: "01",
    title: "Art Direction",
    description:
      "End-to-end creative leadership across campaigns, brand systems and editorial output.",
    deliverables: ["Campaign concepts", "Photography direction", "Creative guidelines"],
  },
  {
    n: "02",
    title: "Brand Identity",
    description:
      "Crests, wordmarks and typographic systems built to survive the matchday cycle.",
    deliverables: ["Visual identity", "Typography systems", "Brand guidelines"],
  },
  {
    n: "03",
    title: "Campaign & Editorial",
    description:
      "Print, OOH and social-first campaign assets engineered for scale across channels.",
    deliverables: ["Editorial design", "Social systems", "Print & OOH"],
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — IMCICC" },
      { name: "description", content: "Art direction, brand identity and editorial design for sports, culture and lifestyle brands." },
      { property: "og:title", content: "Services — IMCICC" },
      { property: "og:description", content: "Three disciplines, one studio. Built for the matchday cycle." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const reduced = useReducedMotion();
  return (
    <div className="pt-40 pb-32 px-6 md:px-12">
      <section className="max-w-5xl mb-32 md:mb-40">
        <h1
          className="font-display font-black uppercase tracking-tight leading-[0.85]"
          style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
        >
          Services<span className="text-primary">.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          Three disciplines, one studio — focused on clubs, federations and lifestyle
          brands that need a visual posture as confident as their ambition.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-px bg-border border border-border">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.n}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-background p-10 md:p-12 flex flex-col gap-8"
          >
            <span className="font-display text-xs uppercase tracking-[0.25em] font-medium text-muted-foreground">
              {s.n}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
              {s.title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{s.description}</p>
            <ul className="mt-auto pt-8 border-t border-border space-y-3 font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3">
                  <span className="size-1 bg-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </section>

      <section className="mt-32 md:mt-40 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-border pt-16">
        <h2
          className="font-display font-black uppercase tracking-tight leading-[0.85] max-w-3xl"
          style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)" }}
        >
          Have a brief?<br />
          <span className="text-primary">Let&rsquo;s talk.</span>
        </h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-5 font-display text-sm uppercase tracking-[0.2em] font-medium hover:brightness-110 transition-all"
        >
          Start a brief <span aria-hidden>→</span>
        </Link>
      </section>
    </div>
  );
}