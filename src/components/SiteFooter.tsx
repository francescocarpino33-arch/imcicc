export function SiteFooter() {
  return (
    <footer
      className="relative z-[2] px-6 md:px-12 border-t border-border bg-background/50 backdrop-blur-sm"
      style={{ paddingTop: "5rem", paddingBottom: "3rem" }}
    >
      <div className="flex flex-col md:flex-row justify-between gap-6 font-display text-xs tracking-[0.25em] text-primary-glow/60">
        <span>© 2026 IMCICC</span>
        <div className="flex flex-wrap gap-6 md:gap-10">
          <a href="mailto:francesco.carpino33@gmail.com" className="glow-hover hover:text-primary-glow">Email</a>
          <a href="https://www.instagram.com/imcicc/" className="glow-hover hover:text-primary-glow">Instagram</a>
          <a href="https://www.linkedin.com/in/francesco-carpino-b4852a1a4/" className="glow-hover hover:text-primary-glow">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
