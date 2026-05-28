import * as React from "react";
import { Instagram, Linkedin } from "lucide-react";
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
      { rel: "preconnect", href: "https://player.vimeo.com" },
      { rel: "preconnect", href: "https://i.vimeocdn.com" },
      { rel: "preconnect", href: "https://f.vimeocdn.com" },
      { rel: "dns-prefetch", href: "https://vod-progressive.akamaized.net" },
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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [pastHero, setPastHero] = React.useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  // Fade fixed chrome (logo + bottom credit) once we scroll past the hero so
  // they don't collide with content below. Only on the home page — interior
  // pages always show the logo so users can navigate back.
  React.useEffect(() => {
    if (!isHome) {
      setPastHero(false);
      return;
    }
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Lock body scroll while overlay is open
  React.useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Close on Escape
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navLinks = [
    { to: "/work", label: "Work" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ] as const;

  // On the home page the header sits over the video hero, so bars stay white.
  // On interior pages the header has a solid background so bars use the
  // foreground color for contrast.
  const barColor = menuOpen || isHome ? "bg-white" : "bg-foreground";

  return (
    <QueryClientProvider client={queryClient}>
      {/* Shared header — translucent over the hero, solid on interior pages */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-4 transition-colors duration-300 md:px-10 ${
          isHome || menuOpen
            ? "bg-transparent"
            : "border-b border-border bg-background/90 backdrop-blur-sm"
        }`}
      >
        <Link
          to="/"
          aria-label="ROY home"
          className={`flex items-center transition-opacity duration-300 ${
            pastHero && !menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <img src={royLogo} alt="ROY" className="h-8 w-auto md:h-10" />
        </Link>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
        >
          <span
            className={`block h-[2px] w-7 ${barColor} transition-transform duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-7 ${barColor} transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-7 ${barColor} transition-transform duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[55] bg-black/95 backdrop-blur-md transition-all duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Soft accent glow */}
        <div className="pointer-events-none absolute -right-32 top-1/3 h-[60vh] w-[60vh] rounded-full bg-primary/20 blur-[120px]" />

        <nav className="flex h-full flex-col items-end justify-center gap-3 px-8 pr-8 sm:gap-4 md:gap-6 md:pr-20">
          {navLinks.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              activeProps={{ className: "text-primary" }}
              style={{
                transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms",
              }}
              className={`group relative font-display text-[14vw] font-bold uppercase leading-[0.95] tracking-tight text-white transition-all duration-500 hover:text-primary md:text-[7vw] ${
                menuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <span className="italic">{l.label}</span>
            </Link>
          ))}

        {/* Footer info inside overlay */}
        <div
          className={`mt-10 flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.22em] text-white/50 transition-all duration-500 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? `${120 + navLinks.length * 60}ms` : "0ms" }}
        >
          <span>Columbus · Ohio</span>
          <a
            href="mailto:jordan@royagency.com"
            className="text-white/80 transition-colors hover:text-primary"
          >
            hello@royagency.com
          </a>
          <a
            href="https://instagram.com/royagency"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 transition-colors hover:text-primary"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.linkedin.com/company/roy-agency/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
        </nav>
      </div>

      {/* Bottom-left location / credit */}
      <div
        className={`pointer-events-none fixed z-50 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] transition-opacity duration-300 md:text-[11px] ${
          isHome
            ? `bottom-16 left-6 md:bottom-5 md:left-10 mix-blend-difference text-white/80 ${
                pastHero && !menuOpen ? "opacity-0" : "opacity-100"
              }`
            : "bottom-0 left-0 right-0 border-t border-border bg-background/90 px-6 py-3 text-foreground/70 opacity-100 backdrop-blur-sm md:px-10"
        }`}
      >
        <span className={isHome ? "text-primary" : "text-primary"}>COLUMBUS</span>
        <span className={isHome ? "text-white/40" : "text-muted-foreground"}>|</span>
        <span>OHIO</span>
        <span className={`hidden sm:inline ${isHome ? "text-white/60" : "text-muted-foreground"}`}>
          ROY © All Rights Reserved
        </span>
      </div>

      {/* Bottom-right Get in touch */}
      <Link
        to="/contact"
        className={`fixed bottom-4 right-6 z-50 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] shadow-lg transition-all duration-300 md:right-10 ${
          isHome
            ? `bg-white text-black hover:bg-primary hover:text-primary-foreground ${
                pastHero && !menuOpen ? "opacity-0" : "opacity-100"
              }`
            : "border border-border bg-foreground text-background opacity-100 hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        Get in touch
      </Link>
      <Outlet />
    </QueryClientProvider>
  );
}
