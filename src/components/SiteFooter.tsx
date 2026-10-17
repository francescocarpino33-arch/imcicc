import { useLocation } from "@tanstack/react-router";
import { CONTACT } from "@/data/projects";
import { CopyEmail } from "@/components/CopyEmail";

export function SiteFooter() {
  const { pathname } = useLocation();
  const year = new Date().getFullYear();
  // The contact page already is the contact plate; admin/auth don't need it.
  const showPlate = !["/contact", "/admin", "/auth"].includes(pathname);

  return (
    <footer className="relative z-[2]">
      {showPlate && (
        <section aria-labelledby="footer-cta" className="bg-signal text-night">
          <div className="frame grid-12 gap-y-10" style={{ paddingBlock: "var(--space-6)" }}>
            <h2
              id="footer-cta"
              className="voice col-span-4 md:col-span-8"
              style={{ fontSize: "var(--step-4)" }}
            >
              Every project starts with a conversation.
            </h2>
            <div className="col-span-4 md:col-span-4 md:self-end flex flex-col gap-6">
              <p className="text-[1.0625rem] leading-relaxed max-w-[30em]">
                First I get to know your goals and the people you're speaking to. Then I set a
                visual direction and build it into a system, so every piece feels part of the same
                story.
              </p>
              <ol className="grid grid-cols-3 border-t border-night/25">
                {["Brief", "Direction", "System"].map((step, i) => (
                  <li key={step} className="pt-3 pr-3">
                    <span className="block text-[0.8125rem] font-medium wdth-label tabular-nums text-night/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="voice block mt-1" style={{ fontSize: "var(--step-2)" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="btn !bg-night !text-chalk hover:!bg-chalk hover:!text-night"
                >
                  Get in touch
                </a>
                <CopyEmail className="btn !bg-transparent !text-night shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_0_0_1px_#000]" />
              </div>
            </div>
          </div>
        </section>
      )}

      <div
        className="frame"
        style={{ paddingTop: "var(--space-5)", paddingBottom: "var(--space-4)" }}
      >
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-5">
            <img
              src="/logo-mark.webp"
              alt="IMCICC"
              width={62}
              height={36}
              className="h-9 w-auto mb-5"
              loading="lazy"
            />
            <p className="body-copy max-w-[26em]">
              IMCICC is the studio name of Francesco Carpino, a freelance sports designer based in
              Milan, Italy.
            </p>
          </div>
          <div className="col-span-4 md:col-span-3 md:col-start-10">
            <p className="label mb-3">Elsewhere</p>
            <ul className="flex flex-col gap-1.5">
              <li>
                <a className="link" href={`mailto:${CONTACT.email}`}>
                  Email
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-5 rule flex flex-wrap justify-between gap-4 label">
          <span>© {year} IMCICC, Francesco Carpino</span>
          <a href="#main" className="link">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
