import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { useProjectCovers, useProjectRecords } from "@/lib/project-media";
import { ProjectCover } from "@/components/ProjectCover";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work | IMCICC, Francesco Carpino" },
      {
        name: "description",
        content:
          "Sports design projects for Giro d'Italia, FIRS1 Sports, Aston Villa, CD Arenteiro, CD Córgomo and AC Milan: art direction, visual systems and player storytelling.",
      },
      { property: "og:title", content: "Work | IMCICC, Francesco Carpino" },
      {
        property: "og:description",
        content: "Art direction, visual systems and content for clubs and competitions.",
      },
      { property: "og:url", content: "https://imcicc.com/work" },
    ],
    links: [{ rel: "canonical", href: "https://imcicc.com/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
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
          Work
        </h1>
        <p className="body-copy col-span-4 md:col-span-4 md:col-start-9 md:self-end">
          Six projects across football and cycling, for clubs, a Grand Tour and FIRS1 Sports. Open
          any of them to see the full set of graphics.
        </p>
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
                eager={i < 2}
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <h2 className="tile-title voice mt-5" style={{ fontSize: "var(--step-2)" }}>
                {p.title}
              </h2>
              <p className="label mt-2">
                {p.discipline}, {p.format.toLowerCase()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
