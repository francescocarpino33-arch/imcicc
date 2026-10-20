import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/data/projects";
import { useCopy } from "@/i18n/lang";
import { LangSwitch } from "@/components/LangSwitch";

export function SiteNav() {
  const t = useCopy();
  const LINKS = [
    { to: "/work", label: t.nav.work },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ] as const;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  // The contact page is the orange plate; at the top of it the bar switches to dark ink.
  const onSignal = location.pathname === "/contact" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-chalk focus:px-4 focus:py-2 focus:text-night"
      >
        {t.nav.skip}
      </a>
      <header
        data-tone={onSignal ? "signal" : undefined}
        className={`site-nav fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
          scrolled || open ? "bg-night/90 backdrop-blur-md border-line" : "border-transparent"
        }`}
      >
        <div className="frame flex items-center justify-between" style={{ height: "var(--nav-h)" }}>
          <Link
            to="/"
            aria-label={t.nav.homeLabel}
            className="inline-flex items-center gap-3 shrink-0"
          >
            <img
              src="/logo-mark.webp"
              alt=""
              width={62}
              height={36}
              className="h-8 w-auto md:h-9"
            />
            <span className="hidden sm:block leading-tight">
              <span className="block text-[0.9375rem] font-semibold wdth-voice tracking-[-0.01em]">
                Francesco Carpino
              </span>
              <span className="block label">{t.nav.role}</span>
            </span>
          </Link>

          <nav
            aria-label={t.nav.mainLabel}
            className="hidden md:flex items-center gap-9 text-[0.9375rem] wdth-label font-medium"
          >
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav-link"
                activeProps={{ className: "active", "aria-current": "page" }}
              >
                {l.label}
              </Link>
            ))}
            <LangSwitch />
            <a href={`mailto:${CONTACT.email}`} className="btn !min-h-10 !px-4">
              {t.nav.cta}
            </a>
          </nav>

          <LangSwitch className="md:hidden ml-auto mr-5" />

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center gap-2 h-11 px-1 wdth-label text-[0.9375rem] font-medium cursor-pointer"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span aria-hidden className="relative block w-5 h-3">
              <span
                className={`absolute left-0 right-0 h-px bg-chalk transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 right-0 h-px bg-chalk transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 bg-night transition-[opacity,visibility] duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!open}
        data-open={open ? "" : undefined}
      >
        <nav
          aria-label={t.nav.mobileLabel}
          className="frame flex h-full flex-col justify-between"
          style={{ paddingTop: "calc(var(--nav-h) + 2rem)", paddingBottom: "2rem" }}
        >
          <ul className="flex flex-col gap-1">
            {[{ to: "/", label: t.nav.home }, ...LINKS].map((l, i) => (
              <li key={l.to} className="menu-item" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  to={l.to}
                  tabIndex={open ? 0 : -1}
                  className="voice block py-1 nav-link"
                  style={{ fontSize: "clamp(3.25rem, 16vw, 5rem)" }}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "active", "aria-current": "page" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-foot flex flex-col gap-4">
            <p className="label flex items-center gap-2.5">
              <span className="live-dot" aria-hidden /> {t.available}
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              tabIndex={open ? 0 : -1}
              className="btn justify-center"
            >
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
