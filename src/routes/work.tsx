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
  description: string;
  vimeoId?: string;
  driveFileId?: string;
  poster?: string;
}> = [
  {
    client: "Status Solutions",
    title: "Brand History",
    description: "A cinematic look at two decades of life-safety innovation.",
    driveFileId: "1eI1yBCa5xoEBpYhdcGavnPWg3kIryHBa",
    poster: statusSolutionsPoster,
  },
  {
    client: "Pickups Plus",
    title: "Built for the Haul",
    description: "A brand film celebrating the trucks that get the job done.",
    vimeoId: "912330431",
  },
  {
    client: "BrewDog",
    title: "Buzzed on Flavor",
    description: "A punchy brand spot pouring personality into every frame.",
    vimeoId: "932863528",
  },
  {
    client: "DeWalt",
    title: "Built for the Job",
    description: "Product storytelling that swings as hard as the tools.",
    vimeoId: "499841967",
  },
  {
    client: "The Big Bus Project",
    title: "The Big Bus Project",
    description: "A documentary journey powered by community and purpose.",
    vimeoId: "832437367",
  },
  {
    client: "Craftsman",
    title: "V20 Sprayer",
    description: "A :60 web bumper designed to convert on first watch.",
    vimeoId: "691013951",
  },
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

      {/* Featured video grid — hover to reveal name + description */}
      <section className="px-6 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_VIDEOS.map((video, i) => {
            const hasVideo = Boolean(video.vimeoId || video.driveFileId);
            return (
              <button
                key={i}
                type="button"
                disabled={!hasVideo}
                onClick={() =>
                  hasVideo &&
                  setActiveVideo(
                    video.vimeoId
                      ? { kind: "vimeo", id: video.vimeoId }
                      : { kind: "drive", id: video.driveFileId! },
                  )
                }
                className="group relative aspect-video w-full overflow-hidden bg-black text-left focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-default"
              >
                <img
                  src={video.poster ?? (video.vimeoId ? `https://vumbnail.com/${video.vimeoId}.jpg` : undefined)}
                  alt={`${video.client} — ${video.title}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay with name + description */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">
                    {video.client}
                  </p>
                  <h3
                    className="mt-2 text-2xl leading-tight text-white md:text-3xl"
                    style={{ fontFamily: '"Tiempos Headline", Georgia, serif', fontWeight: 500, letterSpacing: "-0.01em" }}
                  >
                    {video.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-snug text-white/80">
                    {video.description}
                  </p>
                </div>

                {hasVideo && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </div>
                )}
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

