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
import royLogo from "@/assets/roy-logo-color.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
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
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
      { title: "ROY Agency" },
      { name: "description", content: "Video production & marketing agency." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&display=swap",
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
      <body>
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
      {/* Shared header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" aria-label="ROY home" className="flex items-center">
          <img src={royLogo} alt="ROY" className="h-8 w-auto md:h-10" />
        </Link>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.18em] text-white/80 md:flex mix-blend-difference">
          <Link to="/work" activeProps={{ className: "text-white" }} className="transition-colors hover:text-white">Work</Link>
          <Link to="/services" activeProps={{ className: "text-white" }} className="transition-colors hover:text-white">Services</Link>
          <Link to="/about" activeProps={{ className: "text-white" }} className="transition-colors hover:text-white">About</Link>
          <Link to="/blog" activeProps={{ className: "text-white" }} className="transition-colors hover:text-white">Journal</Link>
          <Link to="/contact" activeProps={{ className: "text-white" }} className="transition-colors hover:text-white">Contact</Link>
        </nav>
        <div className="w-10 md:w-20" aria-hidden />
      </header>

      {/* Bottom-left location / credit */}
      <div className="pointer-events-none fixed bottom-5 left-6 z-50 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/80 mix-blend-difference md:left-10">
        <span className="text-primary">COLUMBUS</span>
        <span className="text-white/40">|</span>
        <span>OHIO</span>
        <span className="text-white/60">ROY © All Rights Reserved</span>
      </div>

      {/* Bottom-right Get in touch */}
      <Link
        to="/contact"
        className="fixed bottom-4 right-6 z-50 rounded-full bg-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-black shadow-lg transition-colors hover:bg-primary hover:text-primary-foreground md:right-10"
      >
        Get in touch
      </Link>
      <Outlet />
    </QueryClientProvider>
  );
}
