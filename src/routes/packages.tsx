import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages | ROY Agency" },
      {
        name: "description",
        content:
          "Three simple video packages from ROY Agency. One-time business videos, monthly social content, and full commercial production.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Packages | ROY Agency" },
      {
        property: "og:description",
        content: "Three simple video packages. Pick one.",
      },
    ],
  }),
  component: PackagesPage,
});

type Pkg = {
  id: string;
  tag: string;
  color: string;
  hex: string;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  long: string;
  bullets: string[];
  fit: string;
};

const HEX = {
  orange: "#f97316",
  yellow: "#eab308",
  red: "#ef4444",
} as const;

const PACKAGES: Pkg[] = [
  {
    id: "orange",
    tag: "Most Popular",
    color: "ORANGE",
    hex: HEX.orange,
    name: "The Business Video",
    price: "Starting at $4K",
    cadence: "One time",
    blurb:
      "A professional video of your business, done in two weeks, no film crew experience needed on your end.",
    long: "We come to you, film for one day, and hand you a polished video you can put on your website, run as an ad, or post anywhere. You don't need to hire actors, write a script, or know anything about video. That's our job.",
    bullets: [
      "One shoot day at your location",
      "A 60–90 second brand video, fully edited",
      "2–3 social media clips cut from the same footage",
      "Music, color, and your logo added",
      "Delivered in 7–10 business days",
    ],
    fit: "Restaurants · Gyms · Law firms · Med spas · Contractors · Retail",
  },
  {
    id: "yellow",
    tag: "Recurring",
    color: "YELLOW",
    hex: HEX.yellow,
    name: "Social Media on Autopilot",
    price: "$3K–$5K",
    cadence: "Per month",
    blurb:
      "Fresh videos for your social media every single month, without you having to think about it.",
    long: "We show up once a month, film at your business for a few hours, edit everything, and send it over. You get 4–6 short videos ready to post. No planning, no equipment, no editing on your end. Just post them.",
    bullets: [
      "A half-day shoot at your location every month",
      "4–6 short videos (15–45 seconds, vertical format)",
      "Ready to post on Instagram, TikTok, Facebook",
      "Music and captions included",
      "Delivered within 5 business days of shoot",
      "Month-to-month, cancel anytime",
    ],
    fit: "Any local business that needs to stay active online",
  },
  {
    id: "red",
    tag: "Full Production",
    color: "RED",
    hex: HEX.red,
    name: "The Full Commercial",
    price: "$8K–$20K+",
    cadence: "Per project",
    blurb:
      "A real commercial. The kind you see on TV or in pre-roll ads: fully directed, fully produced.",
    long: "This is for brands that are running serious ad campaigns or need something that looks truly cinematic. We handle everything: concept, script, casting, full crew, and post-production. You show up, give feedback, and approve the final cut.",
    bullets: [
      "Full creative direction, concept to final cut",
      "Cinema-grade camera and lighting package",
      "Professional crew (director, DP, gaffer, support)",
      "Hero video + social cut-downs",
      "Color grade, sound mix, licensed music",
      "3–6 week turnaround",
    ],
    fit: "Product launches · Brand campaigns · Regional advertising",
  },
];

const INTROS = [
  {
    label: "Need this once?",
    quote: "\"I need a video for my website or to run as an ad.\"",
    arrow: "ORANGE",
    target: "orange",
    hex: HEX.orange,
  },
  {
    label: "Need this every month?",
    quote: "\"I need to stay active on social but never have anything to post.\"",
    arrow: "YELLOW",
    target: "yellow",
    hex: HEX.yellow,
  },
  {
    label: "Running a real campaign?",
    quote: "\"I need broadcast-quality production for ads, launch, or brand.\"",
    arrow: "RED",
    target: "red",
    hex: HEX.red,
  },
];

function PackagesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="page-pad pt-32 pb-16 md:pt-40">
       <div className="page-wrap">

        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Columbus, OH / Video Production
        </p>
        <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Your business.<br />
          <span className="italic" style={{ color: HEX.orange }}>On camera.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-foreground/70 md:text-lg">
          Most businesses have <span className="text-foreground">no video at all</span>,
          or video that looks like it was shot on a phone. We fix that. Simple packages,
          real results, no film school required to understand them.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#get-started"
            className="rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Find my package
          </a>
          <a
            href="#packages"
            className="rounded-full border border-border px-6 py-3 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            See options
          </a>
        </div>
       </div>
      </section>

      {/* Intro three-up */}
      <section className="border-y border-border bg-card/30 page-pad py-16 md:py-24">
        <div className="page-wrap grid gap-10 md:grid-cols-3">
          {INTROS.map((i) => (
            <a
              key={i.target}
              href={`#${i.target}`}
              className="group block border-l-2 border-border pl-6 transition-colors hover:border-[var(--accent-color)]"
              style={{ ["--accent-color" as string]: i.hex }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {i.label}
              </p>
              <p className="mt-4 font-display text-2xl leading-tight text-foreground md:text-3xl">
                {i.quote}
              </p>
              <p
                className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] transition-transform group-hover:translate-x-1"
                style={{ color: i.hex }}
              >
                ↓ {i.arrow}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="page-pad py-24 md:py-32">
       <div className="page-wrap">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          What we offer
        </p>
        <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
          Three packages.<br />
          <span className="italic" style={{ color: HEX.orange }}>Pick one.</span>
        </h2>

        <div className="mt-16 space-y-6 md:space-y-8">
          {PACKAGES.map((p) => (

            <article
              key={p.id}
              id={p.id}
              className="group relative scroll-mt-24 overflow-hidden border border-border bg-card/40 p-8 transition-colors hover:border-[var(--accent-color)] md:p-12"
              style={{ ["--accent-color" as string]: p.hex }}
            >
              {/* color bar */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: p.hex }}
              />
              {/* soft glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-20 blur-[100px]"
                style={{ background: p.hex }}
              />

              <div className="relative flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.22em]"
                      style={{ color: p.hex }}
                    >
                      {p.color}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      · {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-4xl uppercase leading-[0.95] md:text-6xl">
                    {p.name}
                  </h3>
                </div>
                <div className="text-right">
                  <p
                    className="font-display text-3xl md:text-4xl"
                    style={{ color: p.hex }}
                  >
                    {p.price}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {p.cadence}
                  </p>
                </div>
              </div>

              <p className="relative mt-8 max-w-2xl text-lg text-foreground/80">{p.blurb}</p>
              <p className="relative mt-4 max-w-2xl text-sm text-foreground/60">{p.long}</p>

              <div className="relative mt-10 grid gap-10 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    What you get
                  </p>
                  <ul className="mt-4 space-y-2">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-sm text-foreground/85 md:text-base"
                      >
                        <span style={{ color: p.hex }}>/</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {p.fit}
                  </p>
                </div>
                <div className="flex items-end">
                  <a
                    href="#get-started"
                    className="rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90"
                    style={{ background: p.hex }}
                  >
                    Get a quote →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
       </div>
      </section>

      {/* Clients */}
      <section className="border-y border-border page-pad py-20 md:py-24">
        <div className="page-wrap">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Clients we've shot for
          </p>
          <p className="mt-6 font-display text-3xl leading-snug md:text-5xl">
            Craftsman. DeWalt. Otterbein University. Pickups Plus.{" "}
            <span className="text-foreground/50">
              And local Columbus businesses just like yours.
            </span>
          </p>
        </div>
      </section>

      {/* Form */}
      <section id="get-started" className="scroll-mt-24 page-pad py-24 md:py-32">
        <div className="page-wrap grid gap-16 md:grid-cols-2">
          <div>

            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Get started
            </p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
              Not sure<br />
              <span className="italic" style={{ color: HEX.yellow }}>which one?</span>
            </h2>
            <p className="mt-8 max-w-md text-base text-foreground/70">
              Fill this out and we'll tell you exactly what we'd recommend, no pressure,
              no commitment. We respond within 24 hours.
            </p>

            <div className="mt-10 space-y-4 text-sm text-foreground/80">
              <p>
                <span className="text-foreground">One-time video for your website or ads?</span>
                <br />
                That's <span className="font-semibold" style={{ color: HEX.orange }}>ORANGE</span>. Starting at $4K.
              </p>
              <p>
                <span className="text-foreground">Need something to post every month?</span>
                <br />
                That's <span className="font-semibold" style={{ color: HEX.yellow }}>YELLOW</span>. $3K–$5K/mo.
              </p>
              <p>
                <span className="text-foreground">Running a big campaign or launch?</span>
                <br />
                That's <span className="font-semibold" style={{ color: HEX.red }}>RED</span>. Let's talk scope.
              </p>
            </div>
          </div>

          <PackagesForm />

        </div>
      </section>
    </main>
  );
}
