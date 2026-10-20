import { createFileRoute } from "@tanstack/react-router";
import { RevealWords } from "@/components/RevealWords";
import { CONTACT } from "@/data/projects";
import { CopyEmail } from "@/components/CopyEmail";
import { ClientLogos } from "@/components/ClientLogos";
import { useCopy } from "@/i18n/lang";
import { headCopy } from "@/i18n/head";

export const Route = createFileRoute("/contact")({
  head: ({ match }) => {
    const t = headCopy(match).contact;
    return {
      meta: [
        { title: t.title },
        { name: "description", content: t.description },
        { property: "og:title", content: t.title },
        { property: "og:description", content: t.ogDescription },
        { property: "og:url", content: "https://imcicc.com/contact" },
      ],
      links: [{ rel: "canonical", href: "https://imcicc.com/contact" }],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const copy = useCopy();
  const t = copy.contact;
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
          <span className="inline-block h-2 w-2 rounded-full bg-night" aria-hidden />{" "}
          {copy.available}
        </p>
        <RevealWords
          as="h1"
          on="load"
          id="contact-title"
          className="voice max-w-[13ch]"
          style={{ fontSize: "var(--step-4)", lineHeight: 0.86 }}
          text={t.heading}
        />

        <div className="grid-12 gap-y-14 mt-14 md:mt-20">
          <div className="col-span-4 md:col-span-7">
            <p className="text-[0.8125rem] font-medium wdth-label mb-3">{t.email}</p>
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
                {copy.emailMe}
              </a>
              <CopyEmail className="btn !bg-transparent !text-night shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_0_0_1px_#000]" />
            </div>
          </div>

          <div className="col-span-4 md:col-span-4 md:col-start-9 flex flex-col gap-10">
            <div>
              <p className="text-[0.8125rem] font-medium wdth-label mb-3">{t.usefulTitle}</p>
              <ul className="flex flex-col">
                {t.useful.map((b) => (
                  <li key={b} className="border-t border-night/25 py-3 leading-snug">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.8125rem] font-medium wdth-label mb-3">{t.elsewhere}</p>
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
                <li className="border-t border-night/25 py-3">{t.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid-12 gap-y-4 mt-16 md:mt-24">
          <h2 className="text-[0.8125rem] font-medium wdth-label col-span-4 md:col-span-12">
            {t.clients}
          </h2>
          <ClientLogos className="col-span-4 md:col-span-12" />
        </div>
      </div>
    </section>
  );
}
