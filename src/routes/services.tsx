import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";
import { getRequestOrigin } from "@/lib/origin.functions";
import interviewBtsAsset from "@/assets/interview-bts.jpg.asset.json";
import breachAsset from "@/assets/twenty-one-pilots-breach.jpg.asset.json";
import reelAsset from "@/assets/Roy-Website-Loop_2.mp4.asset.json";

export const Route = createFileRoute("/services")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData: origin }) => {
    const title = "Video Production & Social Content Services | ROY Agency Columbus";
    const description =
      "End-to-end video production, social media content, and creative strategy services for brands in Columbus, Ohio and beyond.";
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "ROY Agency",
      description,
      url: origin,
      areaServed: [
        { "@type": "City", name: "Columbus" },
        { "@type": "City", name: "Westerville" },
        { "@type": "City", name: "Dublin" },
        { "@type": "State", name: "Ohio" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Creative services",
        itemListElement: SECTIONS.map((section) => ({
          "@type": "OfferCatalog",
          name: section.name,
          itemListElement: section.pills.map((pill) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: pill.title,
              description: pill.description,
            },
          })),
        })),
      },
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/services" },
        { property: "og:image", content: `${origin}/og-roy.jpg` },
      ],
      links: [{ rel: "canonical", href: "/services" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(serviceSchema),
        },
      ],
    };
  },
  component: ServicesPage,
});

type VimeoVideo = {
  type: "vimeo";
  id: string;
  hash?: string;
  start?: number;
  end?: number;
};

type DirectVideo = {
  type: "video";
  url: string;
};

type Pill = {
  title: string;
  description: string;
  video?: VimeoVideo | DirectVideo;
  image?: string;
  orientation?: "landscape" | "portrait";
  deliverables?: string[];
};

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
        title: "Brand Film",
        description:
          "Cinematic brand stories that distill identity, values, and vision into memorable long-form content.",
        video: { type: "vimeo", id: "797804844", hash: "165e5b0b31" },
      },
      {
        title: "Commercial",
        description:
          "High-impact :15 to :60 spots built for broadcast, streaming, and digital pre-roll.",
        video: { type: "vimeo", id: "1037561887" },
      },
      {
        title: "Animation",
        description:
          "2D and 3D animation, motion graphics, and visual effects that bring concepts to life frame by frame.",
        video: { type: "vimeo", id: "912389278", start: 18, end: 27 },
      },
      {
        title: "Internal Video",
        description:
          "Training, town halls, and company culture pieces designed for internal comms and employee engagement.",
        video: { type: "vimeo", id: "912803711", hash: "19113b2f8b" },
      },
      {
        title: "Interview & Testimonial",
        description:
          "Polished talking-head and documentary-style interviews that put your people and customers front and center.",
        image: interviewBtsAsset.url,
      },
      {
        title: "Sales & Training Video",
        description:
          "Clear, on-brand videos that help your team sell better and ramp new hires faster.",
      },
      {
        title: "Product Demo",
        description:
          "Clean, dynamic product showcases that highlight features, benefits, and use cases for web and sales.",
      },
      {
        title: "Event Capture",
        description:
          "Multi-camera coverage of live events, conferences, and activations.",
      },
      {
        title: "Photography",
        description:
          "Editorial, lifestyle, and product photography captured alongside — or independent of — our video shoots.",
        image: breachAsset.url,
      },
    ],
  },
  {
    name: "Social",
    tagline: "Platform-native content that earns attention.",
    pills: [
      {
        title: "Short-Form Production",
        description:
          "Vertical-first shoots designed for Reels, TikTok, and Shorts — fast, high-volume, on-brand.",
        video: { type: "vimeo", id: "1207390737", hash: "7732c8f34e" },
        orientation: "portrait",
      },
      {
        title: "Cutdowns & Adaptations",
        description:
          "Reframe and recut hero assets into platform-perfect variants without losing the story.",
        video: { type: "vimeo", id: "1207390737", hash: "7732c8f34e" },
        orientation: "portrait",
      },
      {
        title: "Content Strategy",
        description:
          "Channel-by-channel planning, content pillars, and posting cadence built around how your audience actually scrolls.",
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
    <main className="relative min-h-screen bg-background text-foreground [&_.font-display]:font-serif [&_.font-display]:font-normal [&_.font-display]:normal-case [&_.font-display]:tracking-tight">
      {/* Background video (grayscale, subtly present but not distracting) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
        <video
          src={reelAsset.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-30 [filter:grayscale(100%)_contrast(1.05)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/85" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Page header */}
      <section className="relative z-10 px-6 pt-32 pb-16 md:px-16">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          What we do
        </p>
        <h1 className="mt-4 font-display text-6xl leading-[0.9] md:text-8xl">
          Services<br />
          <span className="text-primary italic">end to end.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Based in Columbus, Ohio, we serve local businesses and national brands with end-to-end video, social, and creative strategy.
        </p>
      </section>

      {/* Three section boxes */}
      <section className="relative z-10 px-4 pb-24 md:px-8">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10">
          {SECTIONS.map((section, idx) => (
            <ServiceBox key={section.name} section={section} index={idx} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-border/60 px-6 py-16 md:px-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display text-3xl md:text-5xl">
            Ready to <span className="text-primary italic">roll?</span>
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
    <div className="rounded-3xl border border-primary bg-card p-6 pr-0 pt-6 pb-6 md:p-12 md:pr-0 md:pt-12 md:pb-12 lg:p-14 lg:pr-0 lg:pt-14 lg:pb-14">
      {/* Header */}
      <p className="text-xs uppercase tracking-[0.24em] text-primary">
        0{index + 1} / 0{SECTIONS.length}
      </p>
      <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] md:text-6xl">
        {section.name}
      </h2>
      <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
        {section.tagline}
      </p>

      {/* Two-column: pills (with inline description) left, full media right */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14">
        {/* Left: pills stacked vertically; selected expands with description inside */}
        <div className="flex flex-col gap-3">
          {section.pills.map((pill, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={pill.title}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-pressed={isOpen}
                className={`group w-full self-start overflow-hidden rounded-3xl border text-left transition-all ${
                  isOpen
                    ? "border-border bg-card px-5 py-4"
                    : "border-border bg-background/60 px-5 py-3 hover:border-primary"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-foreground">
                    {pill.title}
                  </span>
                  {isOpen ? (
                    <X className="h-3.5 w-3.5 shrink-0 text-primary" />
                  ) : (
                    <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                </div>
                {isOpen && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pill.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: full-width active media, no preview neighbors */}
        <div className="min-w-0">
          <ExampleCard
            key={active.title}
            pill={active}
            section={section.name}
          />
        </div>
      </div>
    </div>
  );
}

function ExampleCard({
  pill,
  section,
}: {
  pill: Pill;
  section: string;
}) {
  const isPortrait = pill.orientation === "portrait";
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-card">
      {pill.video ? (
        isPortrait ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-full aspect-[9/16] overflow-hidden">
              <VideoPlayer video={pill.video} />
            </div>
          </div>
        ) : (
          <VideoPlayer video={pill.video} />
        )
      ) : pill.image ? (
        <img
          src={pill.image}
          alt={`${pill.title} — ${section}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col justify-between p-6"
          style={{
            background: `linear-gradient(140deg, hsl(var(--primary) / 0.35) 0%, transparent 55%), radial-gradient(circle at 70% 80%, hsl(var(--primary) / 0.25), transparent 60%), hsl(var(--card))`,
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
            Example
          </p>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {section}
            </p>
            <p className="mt-1 font-display text-2xl uppercase leading-tight md:text-3xl">
              {pill.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


function VideoPlayer({ video }: { video: VimeoVideo | DirectVideo }) {
  if (video.type === "vimeo") {
    return (
      <VimeoClip
        id={video.id}
        hash={video.hash}
        start={video.start ?? 0}
        end={video.end}
      />
    );
  }
  return <VideoClip url={video.url} />;
}

function VimeoClip({
  id,
  hash,
  start,
  end,
}: {
  id: string;
  hash?: string;
  start: number;
  end?: number;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let player: import("@vimeo/player").default | null = null;
    let cancelled = false;
    (async () => {
      const { default: Player } = await import("@vimeo/player");
      if (cancelled || !containerRef.current) return;
      player = new Player(containerRef.current, {
        url: hash
          ? `https://player.vimeo.com/video/${id}?h=${hash}`
          : `https://player.vimeo.com/video/${id}`,
        background: true,
        autoplay: true,
        loop: end === undefined,
        muted: true,
        controls: false,
        responsive: true,
      });
      await player.ready();
      if (start > 0) {
        await player.setCurrentTime(start);
      }
      await player.play().catch(() => {});
      if (end !== undefined) {
        player.on("timeupdate", (data: { seconds: number }) => {
          if (data.seconds >= end) {
            player?.setCurrentTime(start);
          }
        });
      }
    })();
    return () => {
      cancelled = true;
      player?.destroy().catch(() => {});
    };
  }, [id, hash, start, end]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="absolute inset-0 h-full w-full [&>iframe]:h-full [&>iframe]:w-full"
      />
    </div>
  );
}

function VideoClip({ url }: { url: string }) {
  const [errored, setErrored] = React.useState(false);

  if (errored) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full w-full flex-col items-center justify-center gap-3 bg-card p-4 text-center transition-colors hover:bg-primary/10"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 transition-colors group-hover:border-foreground/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-0.5"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          View example
        </span>
      </a>
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      onError={() => setErrored(true)}
      className="h-full w-full object-cover"
    >
      <source src={url} />
    </video>
  );
}
