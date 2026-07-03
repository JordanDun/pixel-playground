import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import weldingPhoto from "@/assets/welding.jpg";
import reelAsset from "@/assets/Roy-Website-Loop_2.mp4.asset.json";
import { Instagram, Linkedin } from "lucide-react";
import { InstagramPostCard } from "@/components/InstagramPostCard";
import { LogoMarquee } from "@/components/LogoMarquee";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { getRequestOrigin } from "@/lib/origin.functions";


export const Route = createFileRoute("/")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData: origin }) => {
    const title = "Commercial Video Production Columbus, Ohio | ROY Agency";
    const description =
      "Columbus, Ohio video production studio. Cinematic brand films, commercials, social content, and strategy for brands and local businesses.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { property: "og:image", content: `${origin}/og-roy.jpg` },
      ],
      links: [{ rel: "canonical", href: "/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "VideoProductionCompany"],
            name: "ROY Agency",
            description:
              "Full-service creative studio in Columbus, Ohio specializing in video production, social media management, graphic design, animation, and brand strategy.",
            url: origin,
            email: "hello@royagency.com",
            telephone: "+1-614-264-6965",
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
            priceRange: "$$$",
            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Commercial Video Production",
                  description:
                    "Cinematic brand films, commercials, and product spots for broadcast, streaming, and digital.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Social Media Content",
                  description:
                    "Short-form video, cutdowns, and platform strategy for Reels, TikTok, and Shorts.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Brand Strategy & Creative Direction",
                  description:
                    "Positioning, campaign planning, and visual systems that give every asset a shared point of view.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Animation & Motion Graphics",
                  description:
                    "2D and 3D animation, motion graphics, and visual effects for explainer and brand films.",
                },
              },
            ],
            sameAs: [
              "https://instagram.com/royagency",
              "https://www.linkedin.com/company/roy-agency/",
            ],
          }),
        },
      ],
    };
  },
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
  const [viewport, setViewport] = useState({ w: 1280, h: 720 });
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const u = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    u();
    window.addEventListener("resize", u);
    return () => window.removeEventListener("resize", u);
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

  // (fullPage-style snap is handled inside ProjectShowcase via wheel hijack.)

  // Hero headline scales with viewport but is capped so ultrawide monitors
  // don't blow it out past the FG video strip. The strip's initial size
  // uses the same cap so text and strip stay in proportion.
  const rawFontVw = isDesktop ? 12 : 18;
  const cap = isDesktop ? 176 : 112;
  const rawFontPx = viewport.w * (rawFontVw / 100);
  const scale = Math.min(1, cap / Math.max(rawFontPx, 1));
  const heroFontPx = rawFontPx * scale;
  const lineVw = (isDesktop ? 12 * 0.95 : 18 * 0.95) * scale;
  const startWvw = (isDesktop ? 78 : 92) * scale;
  const fgWidth = lerp(startWvw, 100, scaleProgress);
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
            <h1
              className="font-display uppercase text-center leading-[0.95]"
              style={{ fontSize: `${heroFontPx}px` }}
            >
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
                height: `calc(${fgHeightVw}vw + ${fgHeightVh}vh)`,
                borderRadius: `${radius}px`,
              }}
            >
              {videosReady && (
                <video
                  src={reelAsset.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Client logos — scrolling marquee right under the hero */}
      <LogoMarquee />

      {/* Intro / Manifesto — full-screen takeover, EP+Co style */}

      <section
        id="manifesto"
        className="relative flex min-h-screen items-center overflow-hidden border-t border-border px-6 py-28 md:px-10"
      >
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.78) 45%, rgba(10,10,10,0.35) 80%, rgba(10,10,10,0.1) 100%), url('${weldingPhoto}')`,
            backgroundColor: "#0a0a0a",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            {/* Headline: single font family, medium weight, modest size — contrast comes from italic serif accents */}
            <h2 className="font-sans text-4xl font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem]">
              We don't just make content.<br />
              We <span className="font-serif italic font-normal text-primary">build</span> work people actually <span className="font-serif italic font-normal">feel</span>.
            </h2>

            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-foreground/75 md:text-lg">
              We're a Columbus-based creative studio. Strategy, direction,
              production, and post — under one roof — for brands that want
              work their audience actually remembers.
            </p>

            <Link
              to="/services"
              className="mt-10 inline-flex items-center gap-3 font-sans text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <span>Our Approach</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Selected work — full-screen video showcases */}
      <ProjectShowcase id="project-showcase" />


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
          <div className="mt-6 flex items-center justify-center gap-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Link to="/work" className="transition-colors hover:text-foreground">View selected work</Link>
            <span className="text-foreground/30">·</span>
            <Link to="/blog" className="transition-colors hover:text-foreground">Read the journal</Link>
          </div>
        </div>
      </section>

      {/* Instagram — latest posts */}
      <section id="instagram" className="relative border-t border-surface-foreground/10 bg-surface px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-surface-foreground md:text-5xl">
              Want to follow us?
            </h2>
            <div className="mt-8 space-y-4">
              <a
                href="https://instagram.com/royagency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-surface-foreground transition-colors hover:text-social"
              >
                <Instagram className="h-5 w-5 text-social" />
                <span>@royagency</span>
              </a>
              <a
                href="https://www.linkedin.com/company/roy-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-surface-foreground transition-colors hover:text-social"
              >
                <Linkedin className="h-5 w-5 text-social" />
                <span>ROY Agency</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <InstagramPostCard
              imageUrl="https://scontent-ams2-1.cdninstagram.com/v/t51.71878-15/624938559_1611991510143679_6921131479708103921_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=cIJACTWjiucQ7kNvwHt9FaA&_nc_oc=Adoeriwuc_HGQXrzio04VEmnFbpw77j4Pk4d78PmFf-YchrdbVb1MBCyZbxJ0pOR3WF8wwH-ogL_rKCSUV5arNk5&_nc_zt=23&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_gid=Kqt4ZtjrZwgzqwvsGE3XDQ&_nc_ss=7960f&oh=00_Af9sv1l4hc0ynmvzNnSGoNIRFifhlnQtSYLHjK0wZa8Pdw&oe=6A41D64D"
              caption="Some new work hot off the press for Ohio Steel Industries."
              postUrl="https://www.instagram.com/p/DA1L_Z5PA0F/"
            />
            <InstagramPostCard
              imageUrl="https://scontent-ams2-1.cdninstagram.com/v/t51.71878-15/503080450_712486227812382_6342598413478077282_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=HzL2VV_z2Z4Q7kNvwFcHIu6&_nc_oc=AdpW1hcLaT5byACRJJIYnOeoQBU1liLCYh66TW_yPiW1ByI4UHg6Q5FTd9ILDezYv28rApEwJc-VyGVGrqV1fM8L&_nc_zt=23&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_gid=pTdKDWp8bq43YLqjzwsHHg&_nc_ss=7960f&oh=00_Af_3TKe2oVGScF4pVsqvgmkzfo0fbFS1S0Ok9ZpCBz7vZw&oe=6A41F750"
              caption="We're buzzed on flavor. Serving up a crispy :15 second Brewdog spot."
              postUrl="https://www.instagram.com/p/C5mA0ULvkyF/"
            />
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
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
            <a
              href="tel:+16142646965"
              className="mt-1 block font-display text-2xl uppercase transition-colors hover:text-primary md:text-3xl"
            >
              614-264-6965
            </a>
            <a
              href="https://share.google/MC6y9A8g5LH4WfCAI"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              Google Business Profile →
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


