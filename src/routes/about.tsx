import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT, projects } from "@/data/projects";
import { CAPABILITIES } from "@/data/capabilities";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | IMCICC, Francesco Carpino" },
      {
        name: "description",
        content:
          "Francesco Carpino is an Italian freelance sports designer based in Milan, working as IMCICC with clubs, competitions and brands.",
      },
      { property: "og:title", content: "About | IMCICC, Francesco Carpino" },
      {
        property: "og:description",
        content: "Italian freelance sports designer based in Milan, working as IMCICC.",
      },
      { property: "og:url", content: "https://imcicc.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://imcicc.com/about" }],
  }),
  component: AboutPage,
});

const WAYS_OF_WORKING = [
  { title: "Single Pieces", text: "A key poster, an announcement, a milestone graphic." },
  {
    title: "Ongoing Content",
    text: "Weekly graphics through a season, made to a consistent system.",
  },
  { title: "Series", text: "A set of pieces for a tournament, a race or a campaign." },
];

function AboutPage() {
  return (
    <div
      style={{
        paddingTop: "calc(var(--nav-h) + clamp(2.5rem, 6vw, 5.5rem))",
        paddingBottom: "var(--space-section)",
      }}
    >
      <section className="frame grid-12 gap-y-10" aria-labelledby="about-title">
        <div className="col-span-4 md:col-span-7 lg:col-span-6 md:order-2 md:col-start-6 lg:col-start-7">
          <h1
            id="about-title"
            className="voice"
            style={{ fontSize: "var(--step-4)", lineHeight: 0.86 }}
          >
            About
          </h1>
          <div className="mt-10 flex flex-col gap-5">
            <p className="lead">
              I'm Francesco Carpino, an Italian sports designer based in Milan. I work independently
              under the name IMCICC.
            </p>
            <p className="body-copy">
              Sport and design have always been my two constants, and my work sits where they meet:
              matchday graphics, player-focused content, social series and campaign artwork for
              clubs, competitions and the brands around them.
            </p>
            <p className="body-copy">
              I've been working independently since 2020, with AC Milan, Aston Villa, Giro d'Italia
              and FIRS1 Sports, and with the Galician clubs CD Arenteiro and CD Córgomo.
            </p>
            <p className="body-copy">
              I want every piece to feel like it belongs to its club and its moment: built around
              the player, the stage or the fixture it was made for, rather than around a template.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${CONTACT.email}`} className="btn">
              Email me
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <figure className="col-span-4 md:col-span-4 lg:col-span-5 md:order-1 md:col-start-1">
          <div className="well" style={{ aspectRatio: "840 / 1043" }}>
            <img
              src="/imcicc.webp"
              alt="Portrait of Francesco Carpino"
              width={840}
              height={1043}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="label mt-3">Francesco Carpino, Milan</figcaption>
        </figure>
      </section>

      <section
        className="frame"
        style={{ marginTop: "var(--space-section)" }}
        aria-labelledby="clients-title"
      >
        <div className="grid-12 gap-y-6 mb-10">
          <h2
            id="clients-title"
            className="voice col-span-4 md:col-span-6"
            style={{ fontSize: "var(--step-3)" }}
          >
            Clients and collaborations
          </h2>
        </div>
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="tile grid-12 gap-y-1 items-baseline rule py-5 md:py-6"
              >
                <span
                  className="tile-title voice col-span-4 md:col-span-5"
                  style={{ fontSize: "var(--step-2)" }}
                >
                  {p.client}
                </span>
                <span className="body-copy col-span-4 md:col-span-4 !text-chalk">
                  {p.discipline}
                </span>
                <span className="label col-span-4 md:col-span-3 md:text-right">
                  {p.nda ? "Under NDA, shared privately" : p.format}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="frame grid-12 gap-y-12"
        style={{ marginTop: "var(--space-section)" }}
        aria-labelledby="how-title"
      >
        <div className="col-span-4 md:col-span-5">
          <h2 id="how-title" className="voice" style={{ fontSize: "var(--step-3)" }}>
            How we can work together
          </h2>
          <p className="body-copy mt-6">
            I work with in-house club and competition teams, and with agencies that need a sports
            specialist on a project. Based in Milan, on Central European Time, working remotely with
            clients across Europe.
          </p>
        </div>
        <ul className="col-span-4 md:col-span-6 md:col-start-7">
          {WAYS_OF_WORKING.map((w) => (
            <li
              key={w.title}
              className="rule py-5 grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-x-6 gap-y-1"
            >
              <h3 className="voice" style={{ fontSize: "var(--step-2)", lineHeight: 1 }}>
                {w.title}
              </h3>
              <p className="body-copy">{w.text}</p>
            </li>
          ))}
          <li className="rule pt-5">
            <p className="label">Specialisms: {CAPABILITIES.map((c) => c.title).join(", ")}.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}
