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

const CYCLING_WORDS = ["move", "convert", "inspire", "sell", "linger"];

const BG_VIDEO = "https://player.vimeo.com/video/832437367?background=1&autoplay=1&loop=1&muted=1&autopause=0";
const FG_VIDEO = "https://player.vimeo.com/video/912330431?background=1&autoplay=1&loop=1&muted=1&autopause=0";

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

  // Foreground: starts at ~38% width centered, grows to fill viewport
  const startScale = 0.42;
  const scale = startScale + (1 - startScale) * scaleProgress;
  const radius = 12 - 12 * scaleProgress;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 mix-blend-difference">
        <a href="#top" className="flex items-center gap-2 font-display text-2xl tracking-tight text-white">
          <span className="inline-block size-2 rounded-full bg-primary" />
          ROY
        </a>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.18em] text-white/80 md:flex">
          <a href="#reel" className="transition-colors hover:text-white">Work</a>
          <a href="#contact" className="transition-colors hover:text-white">Contact</a>
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          Get in touch
        </a>
      </header>

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
            <iframe
              src={BG_VIDEO}
              title="ROY background reel"
              allow="autoplay; fullscreen; picture-in-picture"
              className="absolute left-1/2 top-1/2 h-[120vh] w-[220vw] -translate-x-1/2 -translate-y-1/2 md:w-[120vw]"
              style={{ border: 0, pointerEvents: "none" }}
            />
            <div className="absolute inset-0 bg-background/55" />
            <div className="grain absolute inset-0" />
          </div>

          {/* Hero text */}
          <div
            className="relative z-10 flex h-full flex-col justify-between px-6 pt-32 pb-10 md:px-10"
            style={{ opacity: 1 - scaleProgress * 1.4 }}
          >
            <div className="flex flex-1 flex-col justify-center">
              <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/70">
                <span className="inline-block size-1.5 rounded-full bg-primary blink" />
                Now rolling — 2026 reel
              </p>

              <h1 className="font-display text-balance text-[15vw] leading-[0.85] uppercase text-white md:text-[11vw]">
                Stories<br />
                that{" "}
                <span className="relative inline-block align-baseline italic text-primary">
                  <span
                    key={wordIndex}
                    className="inline-block animate-[wordIn_0.45s_ease-out]"
                  >
                    {CYCLING_WORDS[wordIndex]}
                  </span>
                </span>
                <br />
                people.
              </h1>

              <p className="mt-8 max-w-xl text-base text-white/70 md:text-lg">
                ROY is a video production &amp; marketing agency.
                We make brand films, campaigns, and the kind of content
                you finish watching.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-xs uppercase tracking-[0.2em] text-white/60 md:grid-cols-4">
              <div>
                <p className="text-white">Los Angeles</p>
                <p>{time} PT</p>
              </div>
              <div>
                <p className="text-white">Est. 2021</p>
                <p>Independent studio</p>
              </div>
              <div className="hidden md:block">
                <p className="text-white">12 films</p>
                <p>In production</p>
              </div>
              <div className="hidden md:block">
                <p className="text-white">Scroll</p>
                <p>↓ to play</p>
              </div>
            </div>
          </div>

          {/* Foreground video — scales with scroll */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            aria-hidden={scaleProgress < 0.95}
          >
            <div
              className="relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              style={{
                width: "100vw",
                height: "100vh",
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                borderRadius: `${radius}px`,
                transition: "border-radius 0.1s linear",
              }}
            >
              <iframe
                src={FG_VIDEO}
                title="ROY foreground reel"
                allow="autoplay; fullscreen; picture-in-picture"
                className="absolute left-1/2 top-1/2 h-[110vh] w-[200vw] -translate-x-1/2 -translate-y-1/2 md:w-[110vw]"
                style={{ border: 0 }}
              />
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
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Get in touch</p>
            <a
              href="mailto:hello@royagency.com"
              className="mt-2 block font-display text-3xl uppercase md:text-5xl hover:text-primary transition-colors"
            >
              hello@<br />royagency.com
            </a>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground space-y-1">
            <p className="text-foreground">Studio</p>
            <p>Los Angeles, CA</p>
            <p>By appointment</p>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground space-y-1">
            <p className="text-foreground">Follow</p>
            <p><a href="#" className="hover:text-foreground">Instagram</a></p>
            <p><a href="#" className="hover:text-foreground">Vimeo</a></p>
            <p><a href="#" className="hover:text-foreground">LinkedIn</a></p>
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
