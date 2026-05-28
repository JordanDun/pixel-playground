import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROY Agency — Video Production & Marketing" },
      {
        name: "description",
        content:
          "ROY Agency is a video production and marketing studio crafting cinematic stories, brand films, and campaigns that move people.",
      },
      { property: "og:title", content: "ROY Agency — Video Production & Marketing" },
      {
        property: "og:description",
        content: "Cinematic brand films, campaigns, and content. Made by ROY.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const CLIENTS = [
  "NIKE", "A24", "SPOTIFY", "RIMOWA", "AESOP", "NETFLIX",
  "PORSCHE", "VICE", "MONCLER", "DAZED", "SSENSE", "ARC'TERYX",
];

const CYCLING_WORDS = ["CREATIVE", "VIDEO", "SOCIAL", "MARKETING", "GRAPHIC", "ANIMATION", "BRAND"];

const BG_VIDEO = "https://player.vimeo.com/video/912330431?background=1&autoplay=1&loop=1&muted=1&autopause=0&quality=540p#t=0,50s";
const FG_VIDEO = "https://player.vimeo.com/video/1103295539?background=1&autoplay=1&loop=1&muted=1&autopause=0&quality=720p";

function Home() {
  const [time, setTime] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  // LA clock
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const la = d.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(la);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // Cycling hero word
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % CYCLING_WORDS.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  // Sticky scroll-scale section
  const stickySectionRef = useRef<HTMLDivElement | null>(null);
  const [scaleProgress, setScaleProgress] = useState(0); // 0 -> 1

  useEffect(() => {
    const handler = () => {
      const el = stickySectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setScaleProgress(total > 0 ? scrolled / total : 0);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  // Foreground: starts as a thin horizontal strip the height of the middle
  // headline word, then expands to fully cover the viewport.
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Lazy-mount heavy Vimeo iframes after the page is interactive so the
  // initial paint (especially on mobile) isn't blocked by two video players.
  const [videosReady, setVideosReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (cancelled) return;
      const ric = (window as any).requestIdleCallback as
        | ((cb: () => void, opts?: { timeout: number }) => number)
        | undefined;
      if (ric) ric(() => !cancelled && setVideosReady(true), { timeout: 1500 });
      else setTimeout(() => !cancelled && setVideosReady(true), 300);
    };
    if (document.readyState === "complete") mount();
    else window.addEventListener("load", mount, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", mount);
    };
  }, []);
  // Headline is 18vw on mobile, 12vw on desktop with line-height 0.95.
  const lineVw = isDesktop ? 12 * 0.95 : 18 * 0.95;
  const startWvw = isDesktop ? 78 : 92; // strip width
  // Width grows from startWvw to 100vw
  const fgWidth = lerp(startWvw, 100, scaleProgress);
  // Height: start = lineVw (sized in vw), end = 100vh.
  // Interpolate both contributions independently for a smooth blend.
  const fgHeightVw = lerp(lineVw, 0, scaleProgress);
  const fgHeightVh = lerp(0, 100, scaleProgress);
  const radius = 6 - 6 * scaleProgress;


  return (
    <main className="relative min-h-screen bg-background text-foreground">


      {/* HERO + sticky scaling reel.
          Total tall section: sticky 100vh inner + extra scroll distance. */}
      <section
        id="top"
        ref={stickySectionRef}
        className="relative"
        style={{ height: "220vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background video */}
          <div className="absolute inset-0">
            {videosReady && (
              <iframe
                src={BG_VIDEO}
                title="ROY background reel"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
                className="absolute left-1/2 top-1/2 h-[120vh] w-[220vw] -translate-x-1/2 -translate-y-1/2 grayscale md:w-[120vw]"
                style={{ border: 0, pointerEvents: "none" }}
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="grain absolute inset-0" />
          </div>

          {/* Hero text — three stacked words; middle one cycles and sits over the FG video strip */}
          <div
            className="relative z-20 flex h-full flex-col items-center justify-center px-6 md:px-10 pointer-events-none"
            style={{ opacity: Math.max(0, 1 - scaleProgress * 1.6) }}
          >
            <h1 className="font-display uppercase text-center leading-[0.95] text-[18vw] md:text-[12vw]">
              <span className="block text-foreground font-light tracking-tight">YOUR</span>
              <span className="block">
                <span
                  key={wordIndex}
                  className="inline-block italic font-bold text-primary animate-[wordIn_0.45s_ease-out]"
                >
                  {CYCLING_WORDS[wordIndex]}
                </span>
              </span>
              <span className="block text-foreground font-light tracking-tight">AGENCY</span>
            </h1>
          {/* Scroll-down arrow — only on hero, fades out as user scrolls */}
          <div
            className="pointer-events-none absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-white mix-blend-difference"
            style={{ opacity: Math.max(0, 1 - scaleProgress * 2) }}
          >
            <svg
              width="14"
              height="9"
              viewBox="0 0 22 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-[bounce_1.4s_ease-in-out_infinite] opacity-90"
            >
              <path d="M1 1l10 11L21 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

        </div>


          {/* Foreground video — 16:9 rectangle that grows to cover viewport.
              Sits BEHIND the hero text (z-15 vs text z-20). */}
          <div
            className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none"
            aria-hidden={scaleProgress < 0.95}
          >
            <div
              className="relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              style={{
                width: `${fgWidth}vw`,
                // Interpolate from 16:9 (sized in vw) to full 100vh
                height: `calc(${fgHeightVw}vw + ${fgHeightVh}vh)`,
                borderRadius: `${radius}px`,
              }}
            >
              {videosReady && (
                <iframe
                  src={FG_VIDEO}
                  title="ROY foreground reel"
                  allow="autoplay; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="absolute left-1/2 top-1/2 h-[110vh] w-[200vw] -translate-x-1/2 -translate-y-1/2 md:w-[110vw]"
                  style={{ border: 0 }}
                />
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Reel section below sticky */}
      <section id="reel" className="relative px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Selected work
          </p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
            Your <span className="text-primary">campaign</span>,<br />
            shot like cinema.
          </h2>
          <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
            From concept to color, ROY produces brand films and performance
            content end-to-end. Strategy, direction, crew, and edit — under one roof.
          </p>
        </div>
      </section>

      {/* Client marquee */}
      <section className="relative border-y border-border py-8 overflow-hidden">
        <div className="flex w-max marquee gap-16 px-6 font-display text-3xl uppercase text-muted-foreground md:text-5xl">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="flex items-center gap-16 whitespace-nowrap">
              {c}
              <span className="inline-block size-2 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative px-6 py-16 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Get in touch</p>
            <a
              href="mailto:jordan@royagency.com"
              className="mt-2 block font-display text-3xl uppercase md:text-5xl hover:text-primary transition-colors"
            >
              hello@<br />royagency.com
            </a>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground space-y-1 md:text-right">
            <p className="text-foreground">Follow</p>
            <p><a href="https://instagram.com/royagency" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Instagram</a></p>
            <p><a href="https://www.linkedin.com/company/roy-agency/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a></p>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <p>ROY Agency © {new Date().getFullYear()}</p>
          <p>All rights reserved</p>
        </div>
      </footer>
    </main>
  );
}
