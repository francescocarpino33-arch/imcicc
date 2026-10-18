import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_STANDARD } from "@/lib/motion";
import { CONTACT, getAdjacentProjects, getProject, projectText, projects } from "@/data/projects";
import { useCopy, useLang } from "@/i18n/lang";
import { langOf } from "@/i18n/head";
import { useProjectCovers, useProjectDetail, useProjectRecords } from "@/lib/project-media";
import { ProjectFacts } from "@/components/ProjectFacts";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectCover } from "@/components/ProjectCover";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, match }) => {
    const p = getProject(params.slug);
    if (!p) return {};
    const text = projectText(p, langOf(match.context));
    const title = `${p.title}: ${text.discipline} | IMCICC`;
    const url = `https://imcicc.com/work/${p.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: text.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: text.summary },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: text.summary },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const { record, images, loading, failed } = useProjectDetail(project.slug);
  const reduced = useReducedMotion();
  const { next } = getAdjacentProjects(project.slug);
  const position = projects.findIndex((p) => p.slug === project.slug) + 1;
  const t = useCopy().project;
  const lang = useLang();
  const text = projectText(project, lang);
  // Intros written in /admin are in one language; the Italian page uses the Italian summary.
  const intro = lang === "it" ? text.summary : record?.intro?.trim() || text.summary;

  return (
    <article style={{ paddingTop: "calc(var(--nav-h) + clamp(2rem, 5vw, 4.5rem))" }}>
      <header className="frame">
        <nav aria-label="Breadcrumb" className="label mb-8 md:mb-12">
          <Link to="/work" className="link">
            {t.breadcrumb}
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="!text-chalk" aria-current="page">
            {project.title}
          </span>
        </nav>

        <motion.h1
          className="voice project-name"
          style={{ fontSize: "var(--step-4)", lineHeight: 0.86, letterSpacing: "-0.03em" }}
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_STANDARD }}
        >
          {project.title}
        </motion.h1>

        <div className="grid-12 gap-y-10 mt-10 md:mt-14">
          <div className="col-span-4 md:col-span-6 lg:col-span-6">
            <p className="lead">{intro}</p>
            {project.nda && <p className="body-copy mt-5">{t.ndaNote}</p>}
          </div>
          <ProjectFacts
            project={project}
            role={record?.role}
            year={record?.year}
            className="col-span-4 md:col-span-5 md:col-start-8 self-start"
          />
        </div>
      </header>

      <section aria-label={t.imagesLabel} className="frame" style={{ marginTop: "var(--space-6)" }}>
        {loading ? (
          <GallerySkeleton />
        ) : images.length > 0 ? (
          <ProjectGallery images={images} title={project.title} />
        ) : project.nda ? (
          <NdaNotice title={project.title} />
        ) : (
          <EmptyNotice failed={failed} />
        )}
      </section>

      <NextProject slug={next.slug} position={position} />
    </article>
  );
}

function GallerySkeleton() {
  const t = useCopy().project;
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2"
      style={{ gap: "var(--gutter)" }}
      aria-busy="true"
      aria-label={t.loading}
    >
      {[0, 1].map((i) => (
        <div key={i} className="well animate-pulse" style={{ aspectRatio: "4 / 5" }} />
      ))}
    </div>
  );
}

function NdaNotice({ title }: { title: string }) {
  const t = useCopy().project;
  const subject = encodeURIComponent(t.ndaSubject(title));
  return (
    <div
      className="well grid-12 gap-y-8"
      style={{ padding: "clamp(2rem, 6vw, 5.5rem) var(--gutter)" }}
    >
      <h2 className="voice col-span-4 md:col-span-6" style={{ fontSize: "var(--step-3)" }}>
        {t.ndaTitle}
      </h2>
      <div className="col-span-4 md:col-span-5 md:col-start-8 flex flex-col gap-6">
        <p className="body-copy">{t.ndaBody(title)}</p>
        <div className="flex flex-wrap gap-3">
          <a className="btn" href={`mailto:${CONTACT.email}?subject=${subject}`}>
            {t.ndaCta}
          </a>
          <Link to="/work" className="btn btn-ghost">
            {t.otherWork}
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyNotice({ failed }: { failed: boolean }) {
  const t = useCopy().project;
  return (
    <div
      className="well flex flex-col items-start gap-5"
      style={{ padding: "clamp(2rem, 6vw, 5rem) var(--gutter)" }}
    >
      <p className="lead">{failed ? t.emptyFailed : t.emptyPending}</p>
      <Link to="/work" className="btn btn-ghost">
        {t.otherWork}
      </Link>
    </div>
  );
}

function NextProject({ slug, position }: { slug: string; position: number }) {
  const next = getProject(slug)!;
  const records = useProjectRecords();
  const covers = useProjectCovers();
  const t = useCopy().project;
  const text = projectText(next, useLang());

  return (
    <nav
      aria-label={t.nextLabel}
      className="frame"
      style={{ paddingBlock: "var(--space-section)" }}
    >
      <Link to="/work/$slug" params={{ slug }} className="tile grid-12 gap-y-6 rule pt-8 items-end">
        <div className="col-span-4 md:col-span-7">
          <p className="label mb-4 tabular-nums">
            {t.next(position === projects.length ? 1 : position + 1, projects.length)}
          </p>
          <p className="tile-title voice" style={{ fontSize: "var(--step-4)", lineHeight: 0.86 }}>
            {next.title}
          </p>
          <p className="body-copy mt-5">{text.summary}</p>
        </div>
        <div className="col-span-2 md:col-span-3 md:col-start-10">
          <ProjectCover
            project={next}
            src={covers.data?.[slug]}
            pending={records.isPending || (!!records.data && covers.isPending)}
            ratio={4 / 5}
            adapt={false}
            openBar
            count={records.data?.[slug]?.images.length}
            sizes="25vw"
          />
        </div>
      </Link>
    </nav>
  );
}
