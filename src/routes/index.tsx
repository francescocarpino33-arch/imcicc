import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_STANDARD } from "@/lib/motion";
import { CONTACT, projectText, projects, type Project } from "@/data/projects";
import { ClientLogos } from "@/components/ClientLogos";
import { useProjectCovers, useProjectRecords } from "@/lib/project-media";
import { ProjectCover } from "@/components/ProjectCover";
import { CAPABILITIES, capabilityText } from "@/data/capabilities";
import { useCopy, useLang } from "@/i18n/lang";
import { headCopy } from "@/i18n/head";
import { ProjectFacts } from "@/components/ProjectFacts";

export const Route = createFileRoute("/")({
  head: ({ match }) => {
    const t = headCopy(match).home;
    return {
      meta: [
        { title: t.title },
        { name: "description", content: t.description },
        { property: "og:title", content: t.title },
        { property: "og:description", content: t.ogDescription },
        { property: "og:url", content: "https://imcicc.com/" },
      ],
      links: [{ rel: "canonical", href: "https://imcicc.com/" }],
    };
  },
  component: Index,
});

function Index() {
  const reduced = useReducedMotion();
  const t = useCopy();
  const lang = useLang();
  const words = t.home.headline.split(" ");

  return (
    <>
      {/* ── Hero: the statement, the person, the way in ───── */}
      <section
        aria-labelledby="hero-title"
        style={{ paddingTop: "calc(var(--nav-h) + clamp(2rem, 5vw, 5rem))" }}
      >
        <div className="frame grid-12 gap-y-8 md:items-end">
          <div className="col-span-4 md:col-span-8">
            <h1
              id="hero-title"
              key={lang}
              className="voice max-w-[15ch]"
              style={{
                fontSize: "clamp(3rem, min(7.6vw, 15svh), 9.25rem)",
                lineHeight: 0.86,
                letterSpacing: "-0.03em",
              }}
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-top pb-[0.06em] -mb-[0.06em]"
                >
                  <motion.span
                    className="inline-block"
                    initial={reduced ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.045, ease: EASE_STANDARD }}
                  >
                    {w}
                    {i < words.length - 1 ? "\u00a0" : ""}
                  </motion.span>
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>

            <p className="lead mt-8 md:mt-12 max-w-[34em] hidden md:block">{t.home.lead}</p>
            <HeroActions className="mt-8 hidden md:flex" />
          </div>

          <motion.figure
            className="col-span-4 md:col-span-4 md:col-start-9"
            initial={reduced ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1, delay: 0.35, ease: EASE_STANDARD }}
          >
            <div className="well aspect-square md:aspect-[4/5]">
              <img
                src="/francesco-portrait.webp"
                srcSet="/imcicc.webp 840w, /francesco-portrait.webp 1200w"
                sizes="(min-width: 768px) 30vw, 100vw"
                alt={t.home.portraitAlt}
                width={1200}
                height={1490}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[50%_28%]"
              />
            </div>
            <figcaption className="label mt-3">{t.home.portraitCaption}</figcaption>
          </motion.figure>

          {/* On phones the introduction follows the portrait */}
          <div className="col-span-4 md:hidden">
            <p className="lead">{t.home.lead}</p>
            <HeroActions className="mt-7 flex" />
          </div>
        </div>

        {/* Real work, shown at full strength */}
        {/* The poster wall, mounted on the orange plate, with the client list beneath it */}
        <div
          className="plate mt-14 md:mt-20"
          style={{ paddingTop: "var(--gutter)", paddingBottom: "var(--space-5)" }}
        >
          <motion.figure
            className="frame"
            initial={reduced ? false : { clipPath: "inset(18% 0% 0% 0%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.55, ease: EASE_STANDARD }}
          >
            {/* On phones the wall becomes a swipeable strip so the posters stay legible. */}
            <div
              className="bg-night overflow-x-auto md:overflow-visible snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              tabIndex={0}
              role="region"
              aria-label={t.home.wallLabel}
            >
              <img
                src="/hero-collage.webp"
                alt={t.home.wallAlt}
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="block h-[min(58svh,24rem)] w-auto max-w-none md:h-auto md:w-full md:max-w-full"
              />
            </div>
            <figcaption className="label mt-3">
              {t.home.wallCaption}
              <span className="md:hidden">{t.home.wallSwipe}</span>
            </figcaption>
          </motion.figure>

          <div className="frame" style={{ marginTop: "var(--space-5)" }}>
            <div className="grid-12 gap-y-4">
              <h2 className="label col-span-4 md:col-span-12">{t.home.clients}</h2>
              <ClientLogos className="col-span-4 md:col-span-12" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Selected work ───────────────────────────────── */}
      <SelectedWork />

      {/* ── Capabilities ─────────────────────────────────── */}
      <section
        aria-labelledby="capabilities-title"
        style={{ paddingBottom: "var(--space-section)" }}
      >
        <div className="frame">
          <div className="grid-12 gap-y-6 mb-12 md:mb-16">
            <h2
              id="capabilities-title"
              className="voice col-span-4 md:col-span-6"
              style={{ fontSize: "var(--step-3)" }}
            >
              {t.home.whatIDo}
            </h2>
            <p className="body-copy col-span-4 md:col-span-5 md:col-start-8 md:self-end">
              {t.home.whatIDoIntro}
            </p>
          </div>
          <ul className="grid md:grid-cols-2 gap-x-[var(--gutter)]">
            {CAPABILITIES.map((c) => {
              const ct = capabilityText(c, lang);
              const names = c.seenIn.map((slug) => projects.find((x) => x.slug === slug)!);
              return (
                <li key={c.title} className="rule py-8 md:py-10 grid grid-cols-1 gap-3">
                  <h3 className="voice" style={{ fontSize: "var(--step-2)" }}>
                    {ct.title}
                  </h3>
                  <p className="body-copy">{ct.description}</p>
                  <p className="label">
                    {t.home.seenIn}{" "}
                    {names.map((p, i) => (
                      <span key={p.slug}>
                        <Link
                          to="/work/$slug"
                          params={{ slug: p.slug }}
                          className="link project-name"
                        >
                          {p.title}
                        </Link>
                        {i < names.length - 2 ? ", " : i === names.length - 2 ? ` ${t.and} ` : ""}
                      </span>
                    ))}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

/* Featured projects in a staggered poster layout. Every cover is a 4:5 frame;
   the rhythm comes from scale and placement, not from mixed crops. */
const LAYOUT = [
  { media: "md:col-span-7", text: "md:col-span-4 md:col-start-9 md:self-end" },
  {
    media: "md:col-span-5 md:col-start-2",
    text: "md:col-span-4 md:col-start-8 md:self-start md:pt-24",
  },
  {
    media: "md:col-span-5 md:col-start-8 md:order-2",
    text: "md:col-span-4 md:col-start-2 md:order-1 md:self-center",
  },
  { media: "md:col-span-6 md:col-start-3", text: "md:col-span-3 md:col-start-10 md:self-end" },
];

function SelectedWork() {
  const t = useCopy();
  const featured = projects.filter((p) => p.featured);
  const records = useProjectRecords();
  const covers = useProjectCovers();
  const pending = records.isPending || (!!records.data && covers.isPending);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      style={{ paddingBlock: "var(--space-section)" }}
    >
      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-20">
          <h2 id="work-title" className="voice" style={{ fontSize: "var(--step-3)" }}>
            {t.home.selectedWork}
          </h2>
          <Link to="/work" className="link wdth-label font-medium">
            {t.home.allProjects(projects.length)}
          </Link>
        </div>

        <div className="flex flex-col" style={{ gap: "clamp(5rem, 11vw, 11rem)" }}>
          {featured.map((p, i) => (
            <FeaturedRow
              key={p.slug}
              project={p}
              layout={LAYOUT[i % LAYOUT.length]}
              cover={covers.data?.[p.slug]}
              pending={pending}
              eager={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedRow({
  project,
  layout,
  cover,
  pending,
  eager,
}: {
  project: Project;
  layout: (typeof LAYOUT)[number];
  cover?: string;
  pending: boolean;
  eager?: boolean;
}) {
  const t = useCopy();
  const text = projectText(project, useLang());
  return (
    <article className="grid-12 gap-y-6">
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className={`tile block col-span-4 ${layout.media}`}
        aria-label={t.viewProject(project.title)}
      >
        <ProjectCover
          project={project}
          src={cover}
          pending={pending}
          ratio={4 / 5}
          eager={eager}
          sizes="(min-width: 768px) 58vw, 100vw"
        />
      </Link>
      <div className={`col-span-4 ${layout.text}`}>
        <Link to="/work/$slug" params={{ slug: project.slug }} className="tile block">
          <h3 className="tile-title voice" style={{ fontSize: "var(--step-3)" }}>
            {project.title}
          </h3>
        </Link>
        <p className="body-copy mt-4 max-w-[30em]">{text.summary}</p>
        <ProjectFacts project={project} withClient={false} className="mt-6" />
      </div>
    </article>
  );
}

function HeroActions({ className = "" }: { className?: string }) {
  const t = useCopy();
  return (
    <div className={`flex-col gap-5 items-start ${className}`}>
      <p className="label flex items-center gap-2.5 !text-chalk">
        <span className="live-dot" aria-hidden /> {t.available}
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="#work" className="btn">
          {t.home.seeWork}
        </a>
        <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost">
          {t.emailMe}
        </a>
      </div>
    </div>
  );
}
