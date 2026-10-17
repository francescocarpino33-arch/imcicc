import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/data/projects";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
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
        Skip to content
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
            aria-label="IMCICC, home"
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
              <span className="block label">Sports designer, Milan</span>
            </span>
          </Link>

          <nav
            aria-label="Main"
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
            <a href={`mailto:${CONTACT.email}`} className="btn !min-h-10 !px-4">
              Start a project
            </a>
          </nav>

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
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 bg-night transition-[opacity,visibility] duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!open}
      >
        <nav
          aria-label="Mobile"
          className="frame flex h-full flex-col justify-between"
          style={{ paddingTop: "calc(var(--nav-h) + 2rem)", paddingBottom: "2rem" }}
        >
          <ul className="flex flex-col gap-1">
            {[{ to: "/", label: "Home" }, ...LINKS].map((l) => (
              <li key={l.to}>
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
          <div className="flex flex-col gap-4">
            <p className="label flex items-center gap-2.5">
              <span className="live-dot" aria-hidden /> Available for freelance projects
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              tabIndex={open ? 0 : -1}
              className="btn justify-center"
            >
              Start a project
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
