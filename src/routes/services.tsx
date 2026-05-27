import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ROY Agency" },
      {
        name: "description",
        content:
          "Social, Strategy, and Video Production services. End-to-end process built for modern brands.",
      },
      { property: "og:title", content: "Services — ROY Agency" },
      {
        property: "og:description",
        content: "Social, Strategy, and Video Production services.",
      },
    ],
  }),
  component: ServicesPage,
});

type Pill = { title: string; description: string };
type Section = {
  name: string;
  tagline: string;
  pills: Pill[];
};

const SECTIONS: Section[] = [
  {
    name: "Video Production",
    tagline: "Cinematic craft for every screen and story.",
    pills: [
      {
        title: "Animation",
        description:
          "2D and 3D animation, motion graphics, and visual effects that bring concepts to life frame by frame.",
      },
      {
        title: "Event Capture",
        description:
          "Multi-camera coverage of live events, conferences, and activations with same-day turnaround options.",
      },
      {
        title: "Brand Film",
        description:
          "Cinematic brand stories that distill identity, values, and vision into memorable long-form content.",
      },
      {
        title: "Interview & Testimonial",
        description:
          "Polished talking-head and documentary-style interviews that put your people and customers front and center.",
      },
      {
        title: "Internal Video",
        description:
          "Training, town halls, and company culture pieces designed for internal comms and employee engagement.",
      },
      {
        title: "Product Demo",
        description:
          "Clean, dynamic product showcases that highlight features, benefits, and use cases for web and sales.",
      },
      {
        title: "Commercial",
        description:
          "High-impact :15 to :60 spots built for broadcast, streaming, and digital pre-roll.",
      },
    ],
  },
  {
    name: "Social",
    tagline: "Platform-native content that earns attention.",
    pills: [
      {
        title: "Content Strategy",
        description:
          "Channel-by-channel planning, content pillars, and posting cadence built around how your audience actually scrolls.",
      },
      {
        title: "Short-Form Production",
        description:
          "Vertical-first shoots designed for Reels, TikTok, and Shorts — fast, high-volume, on-brand.",
      },
      {
        title: "Cutdowns & Adaptations",
        description:
          "Reframe and recut hero assets into platform-perfect variants without losing the story.",
      },
      {
        title: "Community & Always-On",
        description:
          "Monthly content engines that keep your feed alive between launches.",
      },
    ],
  },
  {
    name: "Strategy",
    tagline: "The thinking that makes the work work.",
    pills: [
      {
        title: "Brand Positioning",
        description:
          "Sharpen who you are, who you're for, and why anyone should care.",
      },
      {
        title: "Creative Direction",
        description:
          "Concepts, references, and visual systems that give every asset a shared point of view.",
      },
      {
        title: "Campaign Planning",
        description:
          "Big-idea development plus the rollout plan — channels, beats, and KPIs mapped end to end.",
      },
      {
        title: "Performance & Insights",
        description:
          "Distribution guidance and post-launch reads so the next round is sharper than the last.",
      },
    ],
  },
];

function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page header */}
      <section className="px-6 pt-32 pb-16 md:px-10">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          What we do
        </p>
        <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Services<br />
          <span className="text-primary">end to end.</span>
        </h1>
      </section>

      {/* Three section boxes */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {SECTIONS.map((section, idx) => (
            <ServiceBox key={section.name} section={section} index={idx} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display text-3xl uppercase md:text-5xl">
            Ready to <span className="text-primary">roll?</span>
          </h2>
          <a
            href="/contact"
            className="rounded-full border border-foreground px-6 py-3 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-foreground hover:text-background"
          >
            Start a project
          </a>
        </div>
      </section>
    </main>
  );
}

function ServiceBox({ section, index }: { section: Section; index: number }) {
  const [openIndex, setOpenIndex] = React.useState<number>(0);
  const active = section.pills[openIndex];

  return (
    <div className="rounded-3xl border border-border bg-card/40 p-6 md:p-10">
      {/* Header */}
      <p className="text-xs uppercase tracking-[0.24em] text-primary">
        0{index + 1} / 0{SECTIONS.length}
      </p>
      <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] md:text-5xl">
        {section.name}
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        {section.tagline}
      </p>

      {/* Two-column: pills left, 9:16 example + description right */}
      <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Pills stacked vertically */}
        <div className="flex flex-col gap-2">
          {section.pills.map((pill, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={pill.title}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-pressed={isOpen}
                className={`inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-all ${
                  isOpen
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background/60 text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <span>{pill.title}</span>
                {isOpen ? (
                  <X className="h-3.5 w-3.5" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side: 9:16 example + description */}
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <div className="relative w-full max-w-[260px] shrink-0 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/30 via-background to-background shadow-lg">
            <div className="aspect-[9/16] w-full">
              <div
                key={active.title}
                className="flex h-full w-full flex-col justify-between p-5"
                style={{
                  background: `linear-gradient(140deg, hsl(var(--primary) / 0.35) 0%, transparent 55%), radial-gradient(circle at 70% 80%, hsl(var(--primary) / 0.25), transparent 60%)`,
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
                  Example
                </p>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    {section.name}
                  </p>
                  <p className="mt-1 font-display text-xl uppercase leading-tight">
                    {active.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">
              0{openIndex + 1} — {section.name}
            </p>
            <h3 className="mt-3 font-display text-2xl uppercase leading-tight md:text-3xl">
              {active.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {active.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
