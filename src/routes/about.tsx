import { createFileRoute, Link } from "@tanstack/react-router";
import { RevealWords } from "@/components/RevealWords";
import { CONTACT, projectText, projects } from "@/data/projects";
import { CAPABILITIES, capabilityText } from "@/data/capabilities";
import { useCopy, useLang } from "@/i18n/lang";
import { headCopy } from "@/i18n/head";

export const Route = createFileRoute("/about")({
  head: ({ match }) => {
    const t = headCopy(match).about;
    return {
      meta: [
        { title: t.title },
        { name: "description", content: t.description },
        { property: "og:title", content: t.title },
        { property: "og:description", content: t.ogDescription },
        { property: "og:url", content: "https://imcicc.com/about" },
      ],
      links: [{ rel: "canonical", href: "https://imcicc.com/about" }],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const copy = useCopy();
  const t = copy.about;
  const lang = useLang();
  return (
    <div
      style={{
        paddingTop: "calc(var(--nav-h) + clamp(2.5rem, 6vw, 5.5rem))",
        paddingBottom: "var(--space-section)",
      }}
    >
      <section className="frame grid-12 gap-y-10" aria-labelledby="about-title">
        <div className="col-span-4 md:col-span-7 lg:col-span-6 md:order-2 md:col-start-6 lg:col-start-7">
          <RevealWords
            as="h1"
            on="load"
            id="about-title"
            className="voice"
            style={{ fontSize: "var(--step-4)", lineHeight: 0.86 }}
            text={t.heading}
          />
          <div className="mt-10 flex flex-col gap-5">
            <p className="lead">{t.lead}</p>
            {t.body.map((para) => (
              <p key={para} className="body-copy">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${CONTACT.email}`} className="btn">
              {copy.emailMe}
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
          <div className="well portrait-zoom" style={{ aspectRatio: "840 / 1043" }}>
            <img
              src="/imcicc.webp"
              srcSet="/imcicc.webp 840w, /francesco-portrait.webp 1200w"
              sizes="(min-width: 768px) 40vw, 100vw"
              alt={t.portraitAlt}
              width={840}
              height={1043}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
        </figure>
      </section>

      <section
        className="frame"
        style={{ marginTop: "var(--space-section)" }}
        aria-labelledby="clients-title"
      >
        <div className="grid-12 gap-y-6 mb-10">
          <RevealWords
            id="clients-title"
            className="voice col-span-4 md:col-span-6"
            style={{ fontSize: "var(--step-3)" }}
            text={t.clients}
          />
        </div>
        <ul>
          {projects.map((p) => (
            <li key={p.slug} data-reveal="rise">
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
                  {projectText(p, lang).discipline}
                </span>
                <span className="label col-span-4 md:col-span-3 md:text-right">
                  {p.nda ? t.ndaRow : projectText(p, lang).format}
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
          <RevealWords
            id="how-title"
            className="voice"
            style={{ fontSize: "var(--step-3)" }}
            text={t.howTitle}
          />
          <p className="body-copy mt-6">{t.howBody}</p>
        </div>
        <ul className="col-span-4 md:col-span-6 md:col-start-7">
          {t.ways.map((w) => (
            <li
              key={w.title}
              data-reveal="rise"
              className="rule py-5 grid grid-cols-1 sm:grid-cols-[13rem_1fr] gap-x-6 gap-y-1"
            >
              <h3 className="voice" style={{ fontSize: "var(--step-2)", lineHeight: 1 }}>
                {w.title}
              </h3>
              <p className="body-copy">{w.text}</p>
            </li>
          ))}
          <li className="rule pt-5">
            <p className="label">
              {t.specialisms}: {CAPABILITIES.map((c) => capabilityText(c, lang).title).join(", ")}.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
