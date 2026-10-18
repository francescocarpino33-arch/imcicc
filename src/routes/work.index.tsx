import { createFileRoute, Link } from "@tanstack/react-router";
import { projectText, projects } from "@/data/projects";
import { useCopy, useLang } from "@/i18n/lang";
import { headCopy } from "@/i18n/head";
import { useProjectCovers, useProjectRecords } from "@/lib/project-media";
import { ProjectCover } from "@/components/ProjectCover";

export const Route = createFileRoute("/work/")({
  head: ({ match }) => {
    const t = headCopy(match).work;
    return {
      meta: [
        { title: t.title },
        { name: "description", content: t.description },
        { property: "og:title", content: t.title },
        { property: "og:description", content: t.ogDescription },
        { property: "og:url", content: "https://imcicc.com/work" },
      ],
      links: [{ rel: "canonical", href: "https://imcicc.com/work" }],
    };
  },
  component: WorkPage,
});

function WorkPage() {
  const t = useCopy().work;
  const lang = useLang();
  const records = useProjectRecords();
  const covers = useProjectCovers();
  const pending = records.isPending || (!!records.data && covers.isPending);

  return (
    <div
      style={{
        paddingTop: "calc(var(--nav-h) + clamp(2.5rem, 6vw, 5.5rem))",
        paddingBottom: "var(--space-section)",
      }}
    >
      <header className="frame grid-12 gap-y-8 mb-16 md:mb-24">
        <h1
          className="voice col-span-4 md:col-span-7"
          style={{ fontSize: "var(--step-4)", lineHeight: 0.86 }}
        >
          {t.heading}
        </h1>
        <p className="body-copy col-span-4 md:col-span-4 md:col-start-9 md:self-end">{t.intro}</p>
      </header>

      <ul
        className="frame grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start"
        style={{ columnGap: "var(--gutter)", rowGap: "clamp(3.5rem, 6vw, 6rem)" }}
      >
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link to="/work/$slug" params={{ slug: p.slug }} className="tile block">
              <ProjectCover
                project={p}
                src={covers.data?.[p.slug]}
                pending={pending}
                ratio={4 / 5}
                adapt={false}
                openBar
                count={records.data?.[p.slug]?.images.length}
                eager={i < 2}
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <h2 className="tile-title voice mt-5" style={{ fontSize: "var(--step-2)" }}>
                {p.title}
              </h2>
              <p className="label mt-2">
                {projectText(p, lang).discipline}, {projectText(p, lang).format.toLowerCase()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
