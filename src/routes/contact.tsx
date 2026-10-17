import { createFileRoute } from "@tanstack/react-router";
import { CONTACT } from "@/data/projects";
import { CopyEmail } from "@/components/CopyEmail";
import { ClientLogos } from "@/components/ClientLogos";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | IMCICC, Francesco Carpino" },
      {
        name: "description",
        content:
          "Start a project with Francesco Carpino (IMCICC), freelance sports designer in Milan. Email, LinkedIn and Instagram.",
      },
      { property: "og:title", content: "Contact | IMCICC, Francesco Carpino" },
      {
        property: "og:description",
        content: "Start a project with Francesco Carpino, freelance sports designer in Milan.",
      },
      { property: "og:url", content: "https://imcicc.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://imcicc.com/contact" }],
  }),
  component: ContactPage,
});

const BRIEF = [
  "Who it's for: the club, competition or brand",
  "What you need: a single piece, ongoing content or a series",
  "When you need it, and how often",
];

function ContactPage() {
  return (
    <section
      aria-labelledby="contact-title"
      className="bg-signal text-night"
      style={{
        paddingTop: "calc(var(--nav-h) + clamp(2.5rem, 6vw, 5.5rem))",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="frame">
        <p className="flex items-center gap-2.5 font-medium wdth-label text-[0.8125rem] mb-8">
          <span className="inline-block h-2 w-2 rounded-full bg-night" aria-hidden /> Available for
          freelance projects
        </p>
        <h1
          id="contact-title"
          className="voice max-w-[13ch]"
          style={{ fontSize: "var(--step-4)", lineHeight: 0.86 }}
        >
          Tell me about your project.
        </h1>

        <div className="grid-12 gap-y-14 mt-14 md:mt-20">
          <div className="col-span-4 md:col-span-7">
            <p className="text-[0.8125rem] font-medium wdth-label mb-3">Email</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="voice block break-all underline decoration-1 underline-offset-[0.12em] decoration-night/40 hover:decoration-night"
              style={{ fontSize: "clamp(1.75rem, 4.2vw, 4.25rem)", lineHeight: 1 }}
            >
              {CONTACT.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className="btn !bg-night !text-chalk hover:!bg-chalk hover:!text-night"
              >
                Email me
              </a>
              <CopyEmail className="btn !bg-transparent !text-night shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_0_0_1px_#000]" />
            </div>
          </div>

          <div className="col-span-4 md:col-span-4 md:col-start-9 flex flex-col gap-10">
            <div>
              <p className="text-[0.8125rem] font-medium wdth-label mb-3">Useful to include</p>
              <ul className="flex flex-col">
                {BRIEF.map((b) => (
                  <li key={b} className="border-t border-night/25 py-3 leading-snug">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.8125rem] font-medium wdth-label mb-3">Elsewhere</p>
              <ul className="flex flex-col">
                <li className="border-t border-night/25 py-3">
                  <a
                    className="underline decoration-1 underline-offset-4 decoration-night/40 hover:decoration-night"
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="border-t border-night/25 py-3">
                  <a
                    className="underline decoration-1 underline-offset-4 decoration-night/40 hover:decoration-night"
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li className="border-t border-night/25 py-3">
                  Milan, Italy (Central European Time)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid-12 gap-y-6 border-t border-night/25 pt-6 mt-16 md:mt-24">
          <h2 className="text-[0.8125rem] font-medium wdth-label col-span-4 md:col-span-3 md:pt-1">
            Clients and collaborations
          </h2>
          <ClientLogos tone="ink" className="col-span-4 md:col-span-9" />
        </div>
      </div>
    </section>
  );
}
