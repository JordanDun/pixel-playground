import * as React from "react";
import { X } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — ROY Agency" },
      {
        name: "description",
        content:
          "Selected projects by ROY Agency. Cinematic brand films, campaigns, and social content for Nike, A24, Spotify, and more.",
      },
      { property: "og:title", content: "Work — ROY Agency" },
      {
        property: "og:description",
        content: "Selected projects by ROY Agency.",
      },
    ],
  }),
  component: WorkPage,
});

const PROJECTS: Array<{
  client: string;
  title: string;
  category: string;
  year: string;
  vimeoId?: string;
}> = [
  {
    client: "PICKUPS PLUS",
    title: "Pickups Plus — Brand Film",
    category: "Brand Film",
    year: "2024",
    vimeoId: "912330431",
  },

  {
    client: "BREWDOG",
    title: "Buzzed on Flavor",
    category: "Brand Film",
    year: "2024",
    vimeoId: "932863528",
  },
  { client: "SPOTIFY", title: "Wrapped — Behind the Scenes", category: "Documentary", year: "2025" },
  { client: "RIMOWA", title: "Never Still — Director's Cut", category: "Brand Film", year: "2025" },
  { client: "AESOP", title: "Seasonal Rituals — Series", category: "Content Series", year: "2024" },
  { client: "NETFLIX", title: "Stranger Things S5 — Promo", category: "Promo", year: "2024" },
  { client: "PORSCHE", title: "911 S/T — Launch Film", category: "Launch Film", year: "2024" },
  { client: "VICE", title: "Noisey — Artist Profiles", category: "Documentary", year: "2024" },
];

function WorkPage() {
  const [activeVimeo, setActiveVimeo] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!activeVimeo) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveVimeo(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeVimeo]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page header */}
      <section className="px-6 pt-32 pb-16 md:px-10">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Selected work
        </p>
        <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Projects<br />
          <span className="text-primary">that perform.</span>
        </h1>
      </section>

      {/* Project grid */}
      <section className="px-6 pb-24 md:px-10">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {PROJECTS.map((project, i) => {
            const hasVideo = Boolean(project.vimeoId);
            const Tag = hasVideo ? "button" : "a";
            const tagProps = hasVideo
              ? {
                  type: "button" as const,
                  onClick: () => setActiveVimeo(project.vimeoId!),
                }
              : { href: "#" };
            return (
              <Tag
                key={i}
                {...(tagProps as React.ComponentProps<"a"> & React.ComponentProps<"button">)}
                className="group relative bg-background p-6 text-left transition-colors hover:bg-accent/30 md:p-10"
              >
                {hasVideo && (
                  <div className="relative mb-6 aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen"
                      title={project.title}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                      <span className="rounded-full bg-white/90 px-5 py-2 text-xs uppercase tracking-[0.2em] text-black opacity-0 transition-opacity group-hover:opacity-100">
                        ▶ Play
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {project.client}
                    </p>
                    <h3 className="mt-2 font-display text-2xl uppercase leading-tight md:text-3xl">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {project.category}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    {hasVideo ? "Watch →" : "View →"}
                  </span>
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* Fullscreen video overlay */}
      {activeVimeo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          onClick={() => setActiveVimeo(null)}
        >
          <button
            type="button"
            onClick={() => setActiveVimeo(null)}
            aria-label="Close video"
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <div
            className="relative h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://player.vimeo.com/video/${activeVimeo}?autoplay=1&title=0&byline=0&portrait=0`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Project video"
            />
          </div>
        </div>
      )}
    </main>
  );
}

