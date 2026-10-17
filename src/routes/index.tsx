import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_STANDARD } from "@/lib/motion";
import { CONTACT, projects, type Project } from "@/data/projects";
import { ClientLogos } from "@/components/ClientLogos";
import { useProjectCovers, useProjectRecords } from "@/lib/project-media";
import { ProjectCover } from "@/components/ProjectCover";
import { CAPABILITIES } from "@/data/capabilities";
import { ProjectFacts } from "@/components/ProjectFacts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IMCICC | Francesco Carpino, freelance sports designer" },
      {
        name: "description",
        content:
          "Francesco Carpino (IMCICC) is a freelance sports designer in Milan, working on art direction, visual systems and content for clubs, competitions and brands.",
      },
      { property: "og:title", content: "IMCICC | Francesco Carpino, freelance sports designer" },
      {
        property: "og:description",
        content:
          "Art direction, visual systems and content for football, cycling and the brands around them.",
      },
      { property: "og:url", content: "https://imcicc.com/" },
    ],
    links: [{ rel: "canonical", href: "https://imcicc.com/" }],
  }),
  component: Index,
});

const HEADLINE = "Sports design for clubs, competitions and the culture around them.";

function Index() {
  const reduced = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-title"
        style={{ paddingTop: "calc(var(--nav-h) + clamp(2.5rem, 7vw, 6.5rem))" }}
      >
        <div className="frame">
          <h1
            id="hero-title"
            className="voice max-w-[14ch] md:max-w-[19ch]"
            style={{
              fontSize: "clamp(3.25rem, min(11.6vw, 21svh), 12.5rem)",
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
                  {i < words.length - 1 ? " " : ""}
                </motion.span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <div className="grid-12 gap-y-8 mt-10 md:mt-14">
            <p className="lead col-span-4 md:col-span-6 lg:col-span-5">
              I'm Francesco Carpino, a freelance sports designer. I work on art direction, visual
              systems and content for clubs, competitions and the brands around them, from the first
              idea to the finished series.
            </p>
            <div className="col-span-4 md:col-span-5 md:col-start-8 lg:col-start-9 lg:col-span-4 flex flex-col gap-5 md:items-start">
              <p className="label flex items-center gap-2.5 !text-chalk">
                <span className="live-dot" aria-hidden /> Available for freelance projects
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#work" className="btn">
                  See selected work
                </a>
                <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost">
                  Email me
                </a>
              </div>
            </div>
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
              aria-label="Poster wall"
            >
              <img
                src="/hero-collage.webp"
                alt="A wall of Francesco's sports posters, including player milestones, Giro d'Italia stage graphics and club visuals."
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="block h-[min(58svh,24rem)] w-auto max-w-none md:h-auto md:w-full md:max-w-full"
              />
            </div>
            <figcaption className="label mt-3">
              A selection of posters from the archive.
              <span className="md:hidden"> Swipe to see more.</span>
            </figcaption>
          </motion.figure>

          <div className="frame" style={{ marginTop: "var(--space-5)" }}>
            <div className="grid-12 gap-y-4">
              <h2 className="label col-span-4 md:col-span-12">Clients and collaborations</h2>
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
              What I do
            </h2>
            <p className="body-copy col-span-4 md:col-span-5 md:col-start-8 md:self-end">
              The thinking matters as much as the making: understanding the brief, choosing a
              direction and turning it into work that holds together.
            </p>
          </div>
          <ul className="grid md:grid-cols-2 gap-x-[var(--gutter)]">
            {CAPABILITIES.map((c) => (
              <li key={c.title} className="rule py-8 md:py-10 grid grid-cols-1 gap-3">
                <h3 className="voice" style={{ fontSize: "var(--step-2)" }}>
                  {c.title}
                </h3>
                <p className="body-copy">{c.description}</p>
                <p className="label">
                  Seen in{" "}
                  {c.seenIn.map((slug, i) => {
                    const p = projects.find((x) => x.slug === slug)!;
                    return (
                      <span key={slug}>
                        <Link to="/work/$slug" params={{ slug }} className="link project-name">
                          {p.title}
                        </Link>
                        {i < c.seenIn.length - 2 ? ", " : i === c.seenIn.length - 2 ? " and " : ""}
                      </span>
                    );
                  })}
                </p>
              </li>
            ))}
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
            Selected work
          </h2>
          <Link to="/work" className="link wdth-label font-medium">
            All {projects.length} projects
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
  return (
    <article className="grid-12 gap-y-6">
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className={`tile block col-span-4 ${layout.media}`}
        aria-label={`${project.title}, view project`}
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
        <p className="body-copy mt-4 max-w-[30em]">{project.summary}</p>
        <ProjectFacts project={project} withClient={false} className="mt-6" />
      </div>
    </article>
  );
}
