import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROY Agency — Video, Social & Creative Studio in Columbus, OH" },
      {
        name: "description",
        content:
          "Columbus, Ohio creative studio. Video, social media, design, and the strategy behind it — for local brands and national campaigns.",
      },
      { property: "og:title", content: "ROY Agency — Creative Studio in Columbus, OH" },
      {
        property: "og:description",
        content:
          "Full-service creative studio in Columbus, Ohio. Video, social, design, and strategy under one roof.",
      },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "ROY Agency",
          description:
            "Full-service creative studio in Columbus, Ohio specializing in video production, social media management, graphic design, animation, and brand strategy.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Columbus",
            addressRegion: "OH",
            addressCountry: "US",
          },
          areaServed: [
            { "@type": "City", name: "Columbus" },
            { "@type": "City", name: "Westerville" },
            { "@type": "City", name: "Dublin" },
            { "@type": "State", name: "Ohio" },
          ],
          email: "hello@royagency.com",
          url: "https://royagency.com",
          sameAs: [
            "https://instagram.com/royagency",
            "https://www.linkedin.com/company/roy-agency/",
          ],
        }),
      },
    ],
  }),
  component: Home,
});


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
            <div className="absolute inset-0 bg-background/75" />
            <div className="grain absolute inset-0" />
          </div>

          {/* Hero text — three stacked words; middle one cycles and sits over the FG video strip */}
          <div
            className="relative z-20 flex h-full flex-col items-center justify-center px-6 md:px-10 pointer-events-none"
            style={{ opacity: Math.max(0, 1 - scaleProgress * 1.6) }}
          >
            <h1 className="font-display uppercase text-center leading-[0.95] text-[18vw] md:text-[12vw]">
              <span className="block text-white font-light tracking-tight">YOUR</span>
              <span className="block">
                <span
                  key={wordIndex}
                  className="inline-block italic font-bold text-primary animate-[wordIn_0.45s_ease-out]"
                >
                  {CYCLING_WORDS[wordIndex]}
                </span>
              </span>
              <span className="block text-white font-light tracking-tight">AGENCY</span>
            </h1>
            <p
              className="pointer-events-none absolute left-1/2 bottom-16 z-20 w-[92vw] max-w-none -translate-x-1/2 whitespace-nowrap px-6 text-center text-[2.4vw] uppercase tracking-[0.22em] text-white/75 md:bottom-20 md:text-[0.95vw]"
              style={{ opacity: Math.max(0, 1 - scaleProgress * 2.2) }}
            >
              Full-service creative studio in Columbus, Ohio · Video · Social · Design · Strategy
            </p>
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

      {/* Intro to the work */}
      {/* Intro / Manifesto — full-screen takeover */}
      {/*
        Background image: replace BG_IMAGE_URL below with the uploaded photo's
        URL once the user attaches it (will be /__l5e/assets-v1/... after upload).
      */}
      <section
        id="manifesto"
        className="relative flex min-h-screen items-center overflow-hidden border-t border-border px-6 py-28 md:px-10"
      >
        {/* Background photo placeholder */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%), url('BG_IMAGE_URL')",
            backgroundColor: "#0a0a0a",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            What we do
          </p>
          <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] md:text-8xl">
            We <em className="font-normal not-italic text-primary italic">build</em> the<br />
            work people<br />
            actually <em className="font-normal italic">feel</em>.
          </h2>
          <p className="mt-10 max-w-xl text-base text-muted-foreground md:text-lg">
            We're a Columbus-based creative studio. Strategy, direction, production,
            and post — under one roof — for brands that want work their audience
            actually remembers.
          </p>
          <a
            href="#services"
            className="mt-10 inline-block border border-foreground px-8 py-4 font-display text-sm uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
          >
            See our approach →
          </a>
        </div>
      </section>








      {/* Services grid */}
      <section id="services" className="relative border-t border-border px-6 py-28 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Capabilities
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
                Everything a brand<br />
                actually <span style={{ color: "#eab308" }}>needs</span>.
              </h2>
            </div>
          </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: "01",
                title: "Brand Strategy",
                body: "Positioning, messaging, naming. The thinking that makes the rest of the work land.",
                color: "#f97316",
              },
              {
                n: "02",
                title: "Social & Content",
                body: "Monthly content calendars, channel management, community, short-form video. We run the feed — not just film for it.",
                color: "#eab308",
              },
              {
                n: "03",
                title: "Video & Film",
                body: "Brand films, commercials, documentary, social cutdowns. Concept through final color.",
                color: "#ef4444",
              },
              {
                n: "04",
                title: "Design & Identity",
                body: "Logo systems, packaging, print, web. Built to live everywhere your brand shows up.",
                color: "#f97316",
              },
              {
                n: "05",
                title: "Animation & Motion",
                body: "2D and 3D animation, explainers, motion graphics, title design. The work that makes static feel alive.",
                color: "#eab308",
              },
              {
                n: "06",
                title: "Photography & Paid",
                body: "Campaign stills shot alongside motion, plus the paid media to put it in front of the right people.",
                color: "#ef4444",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="group relative bg-background p-8 transition-colors hover:bg-card md:p-10"
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-display text-sm uppercase tracking-[0.2em]"
                    style={{ color: s.color }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="h-px w-12 transition-all group-hover:w-20"
                    style={{ background: s.color }}
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl uppercase md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground md:text-base">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Process */}
      <section id="process" className="relative border-t border-border px-6 py-28 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                How we work
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-6xl">
                One team.<br />
                <span style={{ color: "#ef4444" }}>Start</span> to ship.
              </h2>
              <p className="mt-6 text-muted-foreground">
                No middlemen, no handoffs between three agencies. The people
                who pitch the idea are the people who make it.
              </p>
            </div>
            <ol className="md:col-span-8 space-y-px bg-border">
              {[
                { n: "01", t: "Discover", b: "We learn the brand, the audience, and the goal. Real workshops, not a questionnaire." },
                { n: "02", t: "Strategize", b: "Positioning and creative platform. The one thing we're going to say, and why it matters." },
                { n: "03", t: "Create", b: "Concepts, scripts, boards, design. We show fewer, sharper options instead of a deck of mediocrity." },
                { n: "04", t: "Produce", b: "Shoots, edits, design systems, builds. In-house crew so the vision survives execution." },
                { n: "05", t: "Launch & Learn", b: "We push it live, run the paid, watch the data, and iterate. Work isn't done at delivery." },
              ].map((p) => (
                <li
                  key={p.n}
                  className="flex gap-6 bg-background p-6 md:gap-10 md:p-8"
                >
                  <span className="font-display text-2xl text-muted-foreground md:text-3xl">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl uppercase md:text-2xl">
                      {p.t}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base">
                      {p.b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-t border-border px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { k: "12+", v: "Years in the game" },
            { k: "300+", v: "Campaigns shipped" },
            { k: "40+", v: "Brands served" },
            { k: "1", v: "Roof we work under" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-display text-5xl md:text-7xl">{s.k}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* CTA */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-5xl uppercase leading-[0.95] md:text-8xl">
            Got something<br />
            to <span style={{ color: "#eab308" }}>launch</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            Tell us what you're working on. We'll come back within 48 hours
            with a real point of view — not a sales deck.
          </p>
          <a
            href="mailto:hello@royagency.com"
            className="mt-10 inline-block border border-foreground px-8 py-4 font-display text-sm uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
          >
            Start a project →
          </a>
        </div>
      </section>

      {/* Instagram — latest posts */}
      <section id="instagram" className="relative border-t border-border px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Latest from the feed
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] md:text-6xl">
              Want to <span style={{ color: "#f97316" }}>follow</span> us?
            </h2>
            <p className="mt-6 text-muted-foreground">
              Behind-the-scenes, new work, and the occasional dog on set.
            </p>
            <div className="mt-8 space-y-3 text-sm uppercase tracking-[0.2em]">
              <a
                href="https://instagram.com/royagency"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary transition-colors"
              >
                @royagency · Instagram →
              </a>
              <a
                href="https://www.linkedin.com/company/roy-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                ROY Agency · LinkedIn →
              </a>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <a
                key={i}
                href="https://instagram.com/royagency"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden bg-muted/30 border border-dashed border-border flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Instagram post {i}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                  Placeholder caption — recent Instagram post copy will appear here once the feed is connected.
                </p>
              </a>
            ))}
          </div>
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


