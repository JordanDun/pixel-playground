import * as React from "react";
import { Play, X } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import statusSolutionsPoster from "@/assets/status-solutions-poster.jpg";
import reelCover from "@/assets/reel-cover.jpg";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/work")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData: origin }) => {
    const title = "Video Production Portfolio | Columbus, OH | ROY Agency";
    const description =
      "Selected commercial video work by ROY Agency. Brand films, animations, product spots, and social campaigns for Columbus and national clients.";
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: PROJECTS.map((project, i) => {
        const thumbnail = project.vimeoId
          ? `https://vumbnail.com/${project.vimeoId}.jpg`
          : project.poster
          ? `${origin}${project.poster}`
          : `${origin}/og-roy.jpg`;
        const embedUrl = project.vimeoId
          ? `https://player.vimeo.com/video/${project.vimeoId}`
          : project.driveFileId
          ? `https://drive.google.com/file/d/${project.driveFileId}/preview`
          : undefined;
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "VideoObject",
            name: project.title,
            description: `${project.category} video production by ROY Agency for ${project.client}.`,
            thumbnailUrl: thumbnail,
            embedUrl,
            uploadDate: `${project.year}-01-01`,
            author: { "@type": "Organization", name: "ROY Agency" },
          },
        };
      }),
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/work" },
        { property: "og:image", content: `${origin}/og-roy.jpg` },
      ],
      links: [{ rel: "canonical", href: "/work" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(videoSchema),
        },
      ],
    };
  },
  component: WorkPage,
});

const PROJECTS: Array<{
  client: string;
  title: string;
  category: string;
  year: string;
  vimeoId?: string;
  driveFileId?: string;
  poster?: string;
}> = [
  {
    client: "STATUS SOLUTIONS",
    title: "Status Solutions — Brand History",
    category: "Brand Film",
    year: "2025",
    driveFileId: "1eI1yBCa5xoEBpYhdcGavnPWg3kIryHBa",
    poster: statusSolutionsPoster,
  },
  {
    client: "STATUS SOLUTIONS NETWORK",
    title: "Status Solutions Network — Animated Explainer",
    category: "Animated Explainer",
    year: "2024",
    vimeoId: "912389278",
  },
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
  { client: "DEWALT", title: "Built for the Job", category: "Brand Film", year: "2024", vimeoId: "499841967" },
  { client: "THE BIG BUS PROJECT", title: "The Big Bus Project", category: "Brand Film", year: "2023", vimeoId: "832437367" },
  { client: "OHIO STEEL", title: "Ohio Steel — Web Loop", category: "Web Spot", year: "2025", vimeoId: "1103295539" },
  { client: "CRAFTSMAN", title: "V20 Sprayer — :60 Web Bumper", category: "Web Spot", year: "2022", vimeoId: "691013951" },
];

const FEATURED_VIDEOS: Array<{
  client: string;
  title: string;
  category: string;
  vimeoId?: string;
  poster?: string;
}> = [
  { client: "Client 1", title: "Featured Video 1", category: "Brand Film", poster: reelCover },
  { client: "Client 2", title: "Featured Video 2", category: "Commercial", poster: reelCover },
  { client: "Client 3", title: "Featured Video 3", category: "Social Campaign", poster: reelCover },
  { client: "Client 4", title: "Featured Video 4", category: "Product Spot", poster: reelCover },
  { client: "Client 5", title: "Featured Video 5", category: "Documentary", poster: reelCover },
  { client: "Client 6", title: "Featured Video 6", category: "Brand Film", poster: reelCover },
];

function WorkPage() {
  const [activeVideo, setActiveVideo] = React.useState<{ kind: "vimeo" | "drive"; id: string } | null>(null);

  React.useEffect(() => {
    if (!activeVideo) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveVideo(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeVideo]);


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
            const hasVideo = Boolean(project.vimeoId || project.driveFileId);
            const Tag = hasVideo ? "button" : "a";
            const tagProps = hasVideo
              ? {
                  type: "button" as const,
                  onClick: () =>
                    setActiveVideo(
                      project.vimeoId
                        ? { kind: "vimeo", id: project.vimeoId }
                        : { kind: "drive", id: project.driveFileId! },
                    ),
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
                    <img
                      src={
                        project.poster ??
                        (project.vimeoId ? `https://vumbnail.com/${project.vimeoId}.jpg` : undefined)
                      }
                      alt={`${project.client} ${project.category} video production by ROY Agency in Columbus, Ohio — ${project.title}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black opacity-100 transition-opacity group-hover:opacity-100 md:opacity-0">
                        <Play className="h-5 w-5 fill-current" />
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

      {/* Featured video grid — six best videos */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Best of ROY</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] md:text-6xl">
              Six films.<br />
              <span className="text-primary">One point of view.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_VIDEOS.map((video, i) => {
            const hasVideo = Boolean(video.vimeoId);
            return (
              <button
                key={i}
                type="button"
                disabled={!hasVideo}
                onClick={() => hasVideo && setActiveVideo({ kind: "vimeo", id: video.vimeoId! })}
                className="group relative aspect-video w-full overflow-hidden bg-black text-left focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-default"
              >
                <img
                  src={video.poster ?? `https://vumbnail.com/${video.vimeoId}.jpg`}
                  alt={`${video.client} — ${video.title}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-enabled:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black opacity-100 transition-opacity group-hover:opacity-100 md:opacity-0">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">{video.client}</p>
                  <h3 className="mt-1 font-display text-2xl uppercase leading-tight text-white md:text-3xl">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">{video.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Fullscreen video overlay */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setActiveVideo(null)}
        >
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-lg bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={
                activeVideo.kind === "vimeo"
                  ? `https://player.vimeo.com/video/${activeVideo.id}?autoplay=1&title=0&byline=0&portrait=0`
                  : `https://drive.google.com/file/d/${activeVideo.id}/preview`
              }
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

