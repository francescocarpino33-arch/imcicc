import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, MotionConfig } from "framer-motion";

import appCss from "../styles.css?url";
import archivoLatin from "@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { entranceTransition, pageEnter } from "@/lib/motion";
import { MOTION_BOOT, useRevealObserver } from "@/lib/reveal";
import { useHoverRoll } from "@/lib/hover-roll";
import { useHeadlineRoll } from "@/lib/headline-roll";
import { useCursorBadge } from "@/lib/cursor-badge";
import { CONTACT } from "@/data/projects";
import { detectLang, useCopy, useLang } from "@/i18n/lang";
import { headCopy, langOf } from "@/i18n/head";

function NotFoundComponent() {
  const t = useCopy().notFound;
  return (
    <section
      className="frame flex min-h-[80svh] flex-col justify-end"
      style={{ paddingTop: "calc(var(--nav-h) + 4rem)", paddingBottom: "var(--space-6)" }}
    >
      <p className="label mb-6">{t.label}</p>
      <h1 className="voice max-w-[12ch]" style={{ fontSize: "var(--step-4)" }}>
        {t.title}
      </h1>
      <p className="body-copy mt-6">{t.body}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/work" className="btn">
          {t.seeWork}
        </Link>
        <Link to="/" className="btn btn-ghost">
          {t.home}
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const t = useCopy().error;

  return (
    <section
      className="frame flex min-h-[80svh] flex-col justify-end"
      style={{ paddingTop: "calc(var(--nav-h) + 4rem)", paddingBottom: "var(--space-6)" }}
    >
      <p className="label mb-6">{t.label}</p>
      <h1 className="voice max-w-[14ch]" style={{ fontSize: "var(--step-4)" }}>
        {t.title}
      </h1>
      <p className="body-copy mt-6">
        {t.before}
        <a className="link !text-chalk" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
        {t.after}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="btn"
        >
          {t.retry}
        </button>
        <a href="/" className="btn btn-ghost">
          {t.home}
        </a>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: () => ({ lang: detectLang() }),
  head: ({ match }) => {
    const t = headCopy(match).home;
    const it = langOf(match.context) === "it";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { title: t.title },
        { name: "description", content: t.description },
        { name: "author", content: "Francesco Carpino" },
        { name: "theme-color", content: "#000000" },
        { name: "color-scheme", content: "dark" },
        { property: "og:site_name", content: "IMCICC" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: it ? "it_IT" : "en_GB" },
        { property: "og:locale:alternate", content: it ? "en_GB" : "it_IT" },
        { property: "og:url", content: "https://imcicc.com" },
        { property: "og:title", content: t.title },
        { property: "og:description", content: t.ogDescription },
        { property: "og:image", content: "https://imcicc.com/og-image-2026.jpg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "Posters by Francesco Carpino on IMCICC orange, with his name and the title Sports Designer.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: t.title },
        { name: "twitter:description", content: t.ogDescription },
        { name: "twitter:image", content: "https://imcicc.com/og-image-2026.jpg" },
      ],
      links: [
        {
          rel: "preload",
          href: archivoLatin,
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Francesco Carpino",
            alternateName: "IMCICC",
            jobTitle: "Freelance sports designer",
            url: "https://imcicc.com",
            email: `mailto:${CONTACT.email}`,
            address: { "@type": "PostalAddress", addressLocality: "Milan", addressCountry: "IT" },
            sameAs: [CONTACT.linkedin, CONTACT.instagram],
          }),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const lang = useLang();
  return (
    // The boot script adds classes to <html> before hydration.
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // Key on the page actually rendered, not the URL: the URL changes as soon as a
  // link is clicked, while the old page keeps rendering until the new one has loaded.
  const pageKey = useRouterState({
    select: (s) => s.matches[s.matches.length - 1]?.pathname ?? s.location.pathname,
  });
  useRevealObserver();
  useHoverRoll();
  useHeadlineRoll();
  useCursorBadge();
  // No fade on the first page a visitor lands on; every page after that fades in.
  const navigated = useRef(false);
  useEffect(() => {
    navigated.current = true;
  }, []);
  // Entrances that start as a new page appears wait for the orange curtain to
  // lift; reveals further down the page (started later, on scroll) don't.
  const firstKey = useRef(pageKey);
  useEffect(() => {
    if (pageKey === firstKey.current) return;
    const root = document.documentElement;
    root.style.setProperty("--page-delay", "0.4s");
    const id = window.setTimeout(() => root.style.removeProperty("--page-delay"), 800);
    return () => window.clearTimeout(id);
  }, [pageKey]);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user" transition={entranceTransition}>
        <SiteNav />
        <main id="main" tabIndex={-1} className="relative z-[2] outline-none">
          {/* The new page fades in over the old one's departure. There is no exit
              animation: an exiting <Outlet /> re-mounts the old page and replays its
              entrance during the fade-out. */}
          <motion.div
            key={pageKey}
            variants={pageEnter}
            initial={navigated.current ? "initial" : false}
            animate="animate"
          >
            <Outlet />
          </motion.div>
        </main>
        {/* Page change: an orange plate lifts off the new page (motion-ok only). */}
        {navigated.current && (
          <div key={`curtain-${pageKey}`} className="page-curtain" aria-hidden />
        )}
        <SiteFooter />
      </MotionConfig>
    </QueryClientProvider>
  );
}
