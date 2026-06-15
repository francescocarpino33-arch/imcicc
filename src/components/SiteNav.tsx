import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const LINKS = [
  { to: "/work", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between px-6 md:px-10 transition-colors duration-200 ${
        scrolled ? "backdrop-blur-md bg-background/60 border-b border-border" : ""
      }`}
    >
      <div
        className="hidden md:flex items-center gap-8 font-display font-light text-foreground/80"
        style={{ fontSize: "18px", letterSpacing: "0.08em" }}
      >
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="nav-link hover:text-primary-glow"
            activeProps={{ className: "active text-primary-glow" }}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        to="/"
        className="ml-auto md:ml-0 inline-flex items-center hover:opacity-80 transition-opacity glow-hover"
        aria-label="IMCICC home"
      >
        <img
          src="/logo.png"
          alt="IMCICC"
          className="w-auto"
          style={{ maxHeight: "56px", width: "auto", objectFit: "contain" }}
        />
      </Link>
      <button
        onClick={() => setOpen((v) => !v)}
        className="nav-link md:hidden font-display text-sm tracking-wide font-light hover:text-primary-glow ml-4"
        aria-label="Toggle menu"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-20 bg-background/95 backdrop-blur-md border-t border-border px-6 py-8 flex flex-col gap-6 font-display text-base font-light">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="nav-link self-start hover:text-primary-glow"
              activeProps={{ className: "active text-primary-glow" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
