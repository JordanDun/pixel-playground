import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — ROY Agency" },
      {
        name: "description",
        content:
          "Three simple video packages from ROY Agency. One-time business videos, monthly social content, and full commercial production.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Packages — ROY Agency" },
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
    price: "$2,500–$5K",
    cadence: "One time",
    blurb:
      "A professional video of your business — done in two weeks, no film crew experience needed on your end.",
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
    price: "$1,200–$1,500",
    cadence: "Per month",
    blurb:
      "Fresh videos for your social media every single month — without you having to think about it.",
    long: "We show up once a month, film at your business for a few hours, edit everything, and send it over. You get 4–6 short videos ready to post. No planning, no equipment, no editing on your end. Just post them.",
    bullets: [
      "A half-day shoot at your location every month",
      "4–6 short videos (15–45 seconds, vertical format)",
      "Ready to post on Instagram, TikTok, Facebook",
      "Music and captions included",
      "Delivered within 5 business days of shoot",
      "Month-to-month — cancel anytime",
    ],
    fit: "Any local business that needs to stay active online",
  },
  {
    id: "red",
    tag: "Full Production",
    color: "RED",
    name: "The Full Commercial",
    price: "$8K–$20K+",
    cadence: "Per project",
    blurb:
      "A real commercial. The kind you see on TV or in pre-roll ads — fully directed, fully produced.",
    long: "This is for brands that are running serious ad campaigns or need something that looks truly cinematic. We handle everything: concept, script, casting, full crew, and post-production. You show up, give feedback, and approve the final cut.",
    bullets: [
      "Full creative direction — concept to final cut",
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
  },
  {
    label: "Need this every month?",
    quote: "\"I need to stay active on social but never have anything to post.\"",
    arrow: "YELLOW",
    target: "yellow",
  },
  {
    label: "Running a real campaign?",
    quote: "\"I need broadcast-quality production for ads, launch, or brand.\"",
    arrow: "RED",
    target: "red",
  },
];

function PackagesPage() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:px-10 md:pt-40">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Columbus, OH — Video Production
        </p>
        <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Your business.<br />
          <span className="italic text-primary">On camera.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-foreground/70 md:text-lg">
          Most businesses have <span className="text-foreground">no video at all</span> —
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
      </section>

      {/* Intro three-up */}
      <section className="border-y border-border px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 md:grid-cols-3">
          {INTROS.map((i) => (
            <a
              key={i.target}
              href={`#${i.target}`}
              className="group block"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {i.label}
              </p>
              <p className="mt-4 font-display text-2xl leading-tight text-foreground md:text-3xl">
                {i.quote}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-primary transition-transform group-hover:translate-x-1">
                ↓ {i.arrow}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="px-6 py-24 md:px-10 md:py-32">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          What we offer
        </p>
        <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
          Three packages.<br />
          <span className="italic text-primary">Pick one.</span>
        </h2>

        <div className="mt-16 space-y-6 md:space-y-8">
          {PACKAGES.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="group relative scroll-mt-24 border border-border bg-card/40 p-8 transition-colors hover:border-primary md:p-12"
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary">
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
                  <p className="font-display text-3xl text-foreground md:text-4xl">
                    {p.price}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {p.cadence}
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-2xl text-lg text-foreground/80">{p.blurb}</p>
              <p className="mt-4 max-w-2xl text-sm text-foreground/60">{p.long}</p>

              <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto]">
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
                        <span className="text-primary">—</span>
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
                    className="rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Get a quote →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section className="border-y border-border px-6 py-20 md:px-10 md:py-24">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Clients we've shot for
        </p>
        <p className="mt-6 font-display text-3xl leading-snug md:text-5xl">
          Craftsman. DeWalt. Otterbein University. Pickups Plus.{" "}
          <span className="text-foreground/50">
            And local Columbus businesses just like yours.
          </span>
        </p>
      </section>

      {/* Form */}
      <section id="get-started" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Get started
            </p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
              Not sure<br />
              <span className="italic text-primary">which one?</span>
            </h2>
            <p className="mt-8 max-w-md text-base text-foreground/70">
              Fill this out and we'll tell you exactly what we'd recommend — no pressure,
              no commitment. We respond within 24 hours.
            </p>

            <div className="mt-10 space-y-4 text-sm text-foreground/80">
              <p>
                <span className="text-foreground">One-time video for your website or ads?</span>
                <br />
                That's <span className="text-primary">ORANGE</span>. Starting at $2,500.
              </p>
              <p>
                <span className="text-foreground">Need something to post every month?</span>
                <br />
                That's <span className="text-primary">YELLOW</span>. Starting at $1,200/mo.
              </p>
              <p>
                <span className="text-foreground">Running a big campaign or launch?</span>
                <br />
                That's <span className="text-primary">RED</span>. Let's talk scope.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col justify-center border border-border bg-card/40 p-10">
              <span className="text-3xl text-primary">✓</span>
              <h3 className="mt-4 font-display text-3xl uppercase">Got it.</h3>
              <p className="mt-3 text-foreground/70">
                We'll be in touch within 24 hours with a recommendation.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                — The ROY Team
              </p>
            </div>
          ) : (
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              {[
                { label: "Your name *", type: "text", placeholder: "Full name", required: true },
                { label: "Business name *", type: "text", placeholder: "Company", required: true },
                { label: "Email *", type: "email", placeholder: "you@company.com", required: true },
                { label: "Phone", type: "tel", placeholder: "(optional)", required: false },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                    placeholder={f.placeholder}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Type of business *
                </label>
                <select
                  required
                  defaultValue=""
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                >
                  <option value="" disabled>Select your industry</option>
                  {[
                    "Restaurant / Food & Beverage",
                    "Gym / Fitness / Wellness",
                    "Med Spa / Aesthetics / Salon",
                    "Law Firm / Professional Services",
                    "Real Estate",
                    "Contractor / Home Services",
                    "Retail / E-Commerce",
                    "Healthcare / Medical",
                    "Education / Non-Profit",
                    "Brand / Consumer Product",
                    "Other",
                  ].map((o) => (
                    <option key={o} value={o} className="bg-background">
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Which sounds right for you? *
                </label>
                <select
                  required
                  defaultValue=""
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                >
                  <option value="" disabled>Pick one</option>
                  <option className="bg-background">ORANGE — One video for my website or ads ($2,500–$5K)</option>
                  <option className="bg-background">YELLOW — Monthly social content ($1,200–$1,500/mo)</option>
                  <option className="bg-background">RED — Full commercial production ($8K+)</option>
                  <option className="bg-background">I have no idea — just help me</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  In plain English — what do you need? *
                </label>
                <textarea
                  rows={4}
                  required
                  className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="Tell us what you're trying to do..."
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  When are you looking to start?
                </label>
                <select
                  defaultValue=""
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                >
                  <option value="" disabled>Select a timeline</option>
                  <option className="bg-background">ASAP</option>
                  <option className="bg-background">Within 30 days</option>
                  <option className="bg-background">1–3 months out</option>
                  <option className="bg-background">Just exploring</option>
                </select>
              </div>

              <button
                type="submit"
                className="rounded-full bg-primary px-8 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send it over
              </button>

              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                We respond within 24 hrs · No commitment required
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
