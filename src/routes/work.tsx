import * as React from "react";
import { X } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
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
      itemListElement: FEATURED_VIDEOS.map((video, i) => {
        const thumbnail = video.vimeoId
          ? `https://vumbnail.com/${video.vimeoId}.jpg`
          : video.poster
          ? `${origin}${video.poster}`
          : `${origin}/og-roy.jpg`;
        const embedUrl = video.vimeoId
          ? `https://player.vimeo.com/video/${video.vimeoId}`
          : video.driveFileId
          ? `https://drive.google.com/file/d/${video.driveFileId}/preview`
          : undefined;
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "VideoObject",
            name: `${video.client} — ${video.title}`,
            description: video.description,
            thumbnailUrl: thumbnail,
            embedUrl,
            uploadDate: "2024-01-01",
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


const FEATURED_VIDEOS: Array<{
  client: string;
  title: string;
  description: string;
  vimeoId?: string;
  vimeoHash?: string;
  driveFileId?: string;
  poster?: string;
}> = [
  {
    client: "Pickups Plus",
    title: "Built for the Haul",
    description: "A brand film celebrating the trucks that get the job done.",
    vimeoId: "912330431",
    poster: "https://i.vimeocdn.com/video/2176478512-00f246f34c0de054b8853bb13d4aa4588e809fa049221227b722c0ffe63cd5db-d_1280x720?region=us",
  },
  {
    client: "Home Chef",
    title: "The Most Important Meal of the Day",
    description: "A warm, appetizing :30 spot that brings the brand's promise to the breakfast table.",
    vimeoId: "1037561887",
    poster: "https://i.vimeocdn.com/video/1964600306-9493e3dddce61abe8b56c7440bfe36d725ef78811001b9b5c21bf6aa596d61f8-d_1280x720?region=us",
  },

  {
    client: "Film Cube",
    title: "Brand Video",
    description: "A sleek, cinematic brand film that introduces Film Cube's product story with crisp visuals and momentum.",
    vimeoId: "1198590759",
    poster: "https://i.vimeocdn.com/video/2165229376-da9076abb80aa9a153230d858cc6e9a32f35b924ce08c82eb8ac6530f4213fcc-d_1280x720?region=us",
  },
  {
    client: "BrewDog",
    title: "Buzzed on Flavor",
    description: "A punchy brand spot pouring personality into every frame.",
    vimeoId: "932863528",
  },
  {
    client: "Status Solutions",
    title: "Network Animated Explainer",
    description: "Motion-driven storytelling that makes a complex safety network feel simple.",
    vimeoId: "912389278",
  },
  {
    client: "The Big Bus Project",
    title: "The Big Bus Project",
    description: "A documentary journey powered by community and purpose.",
    vimeoId: "832437367",
  },
  {
    client: "Root Insurance",
    title: "Dr. Maria Johar",
    description: "A character-driven brand story that puts a real human face on modern insurance.",
    vimeoId: "393184619",
  },
  {
    client: "Craftsman",
    title: "V20 Sprayer",
    description: "A :60 web bumper designed to convert on first watch.",
    vimeoId: "691013951",
  },
  {
    client: "Crawford and Hoying",
    title: "Bracket Builders",
    description: "A people-first profile piece spotlighting the leadership and craft behind Bracket Builders.",
    vimeoId: "912805705",
    vimeoHash: "db56628afb",
    poster: "https://i.vimeocdn.com/video/1798268775-34b629394893c9964782db052183d5c8e488d74f9355e57b1117571d78a5aafb-d_1280x720?region=us",
  },


];

function WorkPage() {
  const [activeVideo, setActiveVideo] = React.useState<{ kind: "vimeo" | "drive"; id: string; hash?: string } | null>(null);

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
    <main className="min-h-screen bg-background text-foreground [&_.font-display]:font-serif [&_.font-display]:font-normal [&_.font-display]:normal-case [&_.font-display]:tracking-tight">
      {/* Page header */}
      <section className="page-pad pt-24 pb-8">
        <div className="page-wrap">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Selected work
          </p>
          <h1 className="font-display mt-4 text-6xl leading-[0.9] md:text-8xl">
            Video Production<br />
            <span className="text-primary italic">that performs.</span>
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Based in Columbus, Ohio, ROY Agency produces commercial video, brand films, and product spots for companies across the Midwest and nationwide. Our work blends cinematic storytelling with performance-driven creative, built to stop the scroll, communicate value, and convert on every platform.
          </p>
        </div>
      </section>

      {/* Featured video grid — hover to reveal name + description */}
      <section className="page-pad pb-24">
        <div className="page-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                      ? { kind: "vimeo", id: video.vimeoId, hash: video.vimeoHash }
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

              </button>
            );
          })}
        </div>
      </section>



      {/* Fullscreen video overlay */}
      {activeVideo && (
        <VideoOverlay activeVideo={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </main>
  );
}

function VideoOverlay({
  activeVideo,
  onClose,
}: {
  activeVideo: { kind: "vimeo" | "drive"; id: string; hash?: string };
  onClose: () => void;
}) {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  // Use the official Vimeo Player SDK to detect video end and close the
  // overlay before Vimeo's "More from <uploader>" end screen appears.
  React.useEffect(() => {
    if (activeVideo.kind !== "vimeo" || !iframeRef.current) return;
    let cancelled = false;
    let player: { destroy: () => Promise<void> } | null = null;

    (async () => {
      const { default: Player } = await import("@vimeo/player");
      if (cancelled || !iframeRef.current) return;
      const p = new Player(iframeRef.current);
      player = p;
      p.on("ended", () => onClose());
    })();

    return () => {
      cancelled = true;
      player?.destroy().catch(() => {});
    };
  }, [activeVideo, onClose]);


  const src =
    activeVideo.kind === "vimeo"
      ? `https://player.vimeo.com/video/${activeVideo.id}?autoplay=1&title=0&byline=0&portrait=0${activeVideo.hash ? `&h=${activeVideo.hash}` : ""}`
      : `https://drive.google.com/file/d/${activeVideo.id}/preview`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
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
          ref={iframeRef}
          src={src}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Project video"
        />
      </div>
    </div>
  );
}

