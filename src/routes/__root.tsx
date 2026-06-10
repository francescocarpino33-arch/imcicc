import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-6">404</p>
        <h1 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tight">
          Off<br /><span className="text-primary">pitch.</span>
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">The page you're looking for has been substituted.</p>
        <Link
          to="/"
          className="inline-block mt-10 font-display text-sm uppercase tracking-[0.2em] font-medium border-b border-primary pb-2 hover:text-primary transition-colors"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-6">System Error</p>
        <h1 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-primary px-6 py-3 font-display text-sm uppercase tracking-[0.2em] font-medium text-primary-foreground hover:brightness-110 transition-all"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border px-6 py-3 font-display text-sm uppercase tracking-[0.2em] font-medium hover:border-primary hover:text-primary transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IMCICC - Sports Visual Designer" },
      { name: "description", content: "Visual Designer specialised in the sports industry." },
      { name: "author", content: "IMCICC" },
      { property: "og:site_name", content: "IMCICC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "IMCICC - Sports Visual Designer" },
      { name: "twitter:title", content: "IMCICC - Sports Visual Designer" },
      { property: "og:description", content: "Visual Designer specialised in the sports industry." },
      { name: "twitter:description", content: "Visual Designer specialised in the sports industry." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/be0e1ac3-c2bd-42ef-8dae-50946ef420d4/id-preview-542e0a9e--4a44dc4f-05b8-4eb3-a18a-e866f81ce8f2.lovable.app-1781083677340.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/be0e1ac3-c2bd-42ef-8dae-50946ef420d4/id-preview-542e0a9e--4a44dc4f-05b8-4eb3-a18a-e866f81ce8f2.lovable.app-1781083677340.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@200;300;400;500&family=Barlow:wght@300;400;500&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground grain">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      <main className="relative z-[2]">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
