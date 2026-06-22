import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { DURATION, EASE_STANDARD, STAGGER, fadeUp, fadeUpContainer } from "@/lib/motion";
import { projects, type Project } from "@/data/projects";
import logoAcMilan from "@/assets/clients/ac-milan.png";
import logoAstonVilla from "@/assets/clients/aston-villa.png";
import logoGiro from "@/assets/clients/giro.png";
import logoFirs1 from "@/assets/clients/firs1.png";
import logoArenteiro from "@/assets/clients/arenteiro.png";
import logoCorgomo from "@/assets/clients/corgomo.png";
import heroBg from "@/assets/hero-bg.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IMCICC — Sports Design, Art Direction & Visual Storytelling" },
      { name: "description", content: "Portfolio of IMCICC — art direction, campaign visuals and brand systems for AC Milan, Aston Villa, Giro d'Italia and beyond." },
      { property: "og:title", content: "IMCICC — Visual Sports Design" },
      { property: "og:description", content: "High-impact visual identities and campaigns for sports, culture and lifestyle brands." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const CLIENTS: { name: string; logo?: string }[] = [
  { name: "ac milan", logo: logoAcMilan },
  { name: "aston villa", logo: logoAstonVilla },
  { name: "giro d'italia", logo: logoGiro },
  { name: "firs1", logo: logoFirs1 },
  { name: "arenteiro", logo: logoArenteiro },
  { name: "còrgomo", logo: logoCorgomo },
];

const CLIENT_SLUGS: Record<string, string> = {
  "ac milan": "ac-milan",
  "aston villa": "aston-villa",
  "giro d'italia": "giro-ditalia",
  "firs1": "first",
  "arenteiro": "arenteiro",
  "còrgomo": "corgomo",
};

function Index() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const collageParallax = useTransform(scrollY, [0, 700], [0, -30]);
  return (
    <>
      {/* Hero — poster */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
        {/* Background image with brand-tinted overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none hero-bg-kenburns"
          style={{
            backgroundImage: `url(${heroBg.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.45,
            filter: "saturate(0.75) contrast(1.05)",
            zIndex: 0,
          }}
        />
        {/* Collage texture — sits above base bg, below all gradient overlays */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/hero-collage.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 1,
            filter: "saturate(1.2) contrast(1.1)",
            maskImage:
              "radial-gradient(ellipse 88% 82% at 50% 45%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 68%, transparent 92%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 88% 82% at 50% 45%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 68%, transparent 92%)",
            zIndex: 0,
            y: reduced ? 0 : collageParallax,
          }}
        />
        {/* Orange gradient tint overlays — above collage, so brand color washes over it */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 35%, rgba(193,74,24,0.55) 0%, rgba(107,31,8,0.78) 40%, rgba(26,10,5,0.95) 80%), linear-gradient(180deg, rgba(26,10,5,0.35) 0%, rgba(26,10,5,0.85) 100%)",
            zIndex: 0,
          }}
        />
        {/* Editorial vignette — soft ember edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,0) 55%, rgba(26,10,5,0.55) 80%, rgba(10,4,2,0.95) 100%)",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,4,2,0.6) 0%, rgba(10,4,2,0) 18%, rgba(10,4,2,0) 78%, rgba(10,4,2,0.85) 100%)",
            zIndex: 0,
          }}
        />

        {/* FOREGROUND */}
        <div className="relative z-10 h-full">
          {/* Headline */}
          <div style={{ paddingTop: 160, paddingLeft: 48, paddingRight: 48 }}>
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : DURATION.hero, ease: EASE_STANDARD }}
              className="font-display hero-headline"
              style={{
                fontSize: "clamp(6vw, 8vw, 110px)",
                fontWeight: 300,
                lineHeight: 0.95,
                color: "#f5a623",
                display: "block",
              }}
            >
              Creating Authenticity
            </motion.span>
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : DURATION.hero, delay: reduced ? 0 : 0.15, ease: EASE_STANDARD }}
              className="font-display hero-headline text-glow"
              style={{
                fontSize: "clamp(6vw, 8vw, 110px)",
                fontWeight: 300,
                lineHeight: 0.95,
                display: "block",
                textAlign: "right",
                marginTop: 8,
              }}
            >
              For Sports Culture.
            </motion.span>

            {/* Descriptors — right-anchored, below the glowing line */}
            <motion.div
              initial={reduced ? "show" : "hidden"}
              animate="show"
              variants={fadeUpContainer}
              transition={{ delayChildren: reduced ? 0 : 0.5 }}
              style={{ marginTop: 56, textAlign: "right" }}
            >
              <motion.p
                variants={fadeUp}
                className="hero-descriptor"
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  color: "rgba(245,166,35,0.75)",
                  letterSpacing: "0.06em",
                  lineHeight: 2.2,
                  textTransform: "lowercase",
                }}
              >
                based in italy. ▶
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="hero-descriptor"
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  color: "rgba(245,166,35,0.75)",
                  letterSpacing: "0.06em",
                  lineHeight: 2.2,
                  textTransform: "lowercase",
                }}
              >
                specialised in sport visual design. ▶
              </motion.p>
            </motion.div>
          </div>

          {/* Clients & collaborations — bottom */}
          <motion.div
            initial={reduced ? "show" : "hidden"}
            animate="show"
            variants={fadeUpContainer}
            transition={{ delayChildren: reduced ? 0 : 0.8 }}
            style={{ position: "absolute", bottom: 48, left: 48, right: 48 }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 12,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "lowercase",
                marginBottom: 20,
              }}
            >
              clients & collaborations:
            </motion.p>
            <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
              {CLIENTS.map(({ name, logo }) => (
                <motion.div key={name} variants={fadeUp} style={{ display: "inline-flex" }}>
                  <Link
                    to="/work/$slug"
                    params={{ slug: CLIENT_SLUGS[name] }}
                    className="brand-logo-link"
                    aria-label={name}
                  >
                    <img
                      src={logo}
                      alt={name}
                      loading="lazy"
                      className="brand-logo-img"
                      style={{ maxHeight: 44, maxWidth: 100, objectFit: "contain" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section
        className="relative z-[2] px-6 md:px-12 border-t border-border bg-background/70"
        style={{ paddingTop: "var(--space-section)", paddingBottom: "var(--space-section)" }}
      >
        <motion.div
          className="flex items-end justify-between gap-6 mb-20 md:mb-28"
          initial={reduced ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUpContainer}
        >
          <div>
            <motion.p
              className="font-display text-xs md:text-sm tracking-[0.25em] text-primary-glow/70 mb-6"
              variants={fadeUp}
            >
              Featured projects
            </motion.p>
            <motion.h2
              className="font-display font-light tracking-[-0.03em] leading-[0.85] text-foreground"
              style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
              variants={fadeUp}
            >
              Projects
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} className="hidden md:inline-flex">
            <Link
              to="/work"
              className="nav-link group inline-flex items-center gap-3 font-display text-sm tracking-[0.2em] font-light text-primary-glow hover:text-primary-glow"
            >
              All projects
              <span className="transition-transform transition-standard group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-24 md:gap-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: reduced ? 0 : DURATION.entrance, delay: reduced ? 0 : (index % 2) * STAGGER, ease: EASE_STANDARD }}
    >
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="project-card group block"
      >
        <div className="project-card-media relative aspect-[4/5] overflow-hidden">
          <div
            className="absolute inset-0"
            style={project.coverScale ? { transform: `scale(${project.coverScale})` } : undefined}
          >
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-[1.03]"
            />
          </div>
        </div>
        <div className="mt-8 flex items-start justify-between gap-6">
          <div className="flex-1">
            <p className="font-display text-xs tracking-[0.25em] text-primary-glow/70 mb-4">
              {project.category}
            </p>
            <h3
              className="font-display font-light tracking-[-0.03em] leading-[0.9] text-foreground group-hover:text-primary-glow transition-colors transition-standard"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              {project.title}
            </h3>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
              {project.tagline}
            </p>
            <p className="mt-5 font-display text-xs tracking-[0.25em] text-primary-glow/80 group-hover:text-primary-glow transition-colors transition-standard">
              View project →
            </p>
          </div>
          <span className="font-display text-2xl text-foreground group-hover:text-primary-glow group-hover:translate-x-1 transition-[color,transform] transition-standard shrink-0 pt-1">
            →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
