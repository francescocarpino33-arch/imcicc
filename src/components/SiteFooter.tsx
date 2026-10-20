import { useLocation } from "@tanstack/react-router";
import { CONTACT } from "@/data/projects";
import { useCopy } from "@/i18n/lang";
import { CopyEmail } from "@/components/CopyEmail";
import { RevealWords } from "@/components/RevealWords";

export function SiteFooter() {
  const { pathname } = useLocation();
  const year = new Date().getFullYear();
  const t = useCopy().footer;
  // The contact page already is the contact plate; admin/auth don't need it.
  const showPlate = !["/contact", "/admin", "/auth"].includes(pathname);

  return (
    <footer className="relative z-[2]">
      {showPlate && (
        <section aria-labelledby="footer-cta" className="bg-signal text-night">
          <div className="frame grid-12 gap-y-10" style={{ paddingBlock: "var(--space-6)" }}>
            <RevealWords
              id="footer-cta"
              className="voice col-span-4 md:col-span-8"
              style={{ fontSize: "var(--step-4)" }}
              text={t.ctaTitle}
            />
            <div className="col-span-4 md:col-span-4 md:self-end flex flex-col gap-6">
              <p className="text-[1.0625rem] leading-relaxed max-w-[30em]">{t.ctaBody}</p>
              <ol className="grid grid-cols-3 border-t border-night/25">
                {t.steps.map((step, i) => (
                  <li key={step} data-reveal="rise" className="pt-3 pr-3">
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
                  {t.getInTouch}
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
            <p className="body-copy max-w-[26em]">{t.studio}</p>
          </div>
          <div className="col-span-4 md:col-span-3 md:col-start-10">
            <p className="label mb-3">{t.elsewhere}</p>
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
            {t.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
