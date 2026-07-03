import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const VIMEO_ID = "1103295539";
const BG_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0&quality=720p`;
const PLAY_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&muted=0&autopause=0&quality=1080p`;

export function ReelSection() {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Lazy-mount the iframe after the page is idle so we don't add a third
  // eager Vimeo player to first paint.
  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (cancelled) return;
      const ric = (window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback;
      if (ric) ric(() => !cancelled && setMounted(true), { timeout: 1500 });
      else setTimeout(() => !cancelled && setMounted(true), 300);
    };
    if (document.readyState === "complete") mount();
    else window.addEventListener("load", mount, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", mount);
    };
  }, []);

  const handlePlay = async () => {
    setPlaying(true);
    // Give the iframe one tick to swap src, then fullscreen the stage.
    requestAnimationFrame(() => {
      const el = stageRef.current;
      if (el && el.requestFullscreen) {
        el.requestFullscreen().catch(() => {
          // Fullscreen denied (e.g. iOS Safari) — playback still starts inline.
        });
      }
    });
  };

  return (
    <section
      id="reel"
      aria-label="ROY Agency 2024 reel"
      className="relative bg-background"
    >
      {/* Full-bleed 16:9 stage */}
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden bg-black md:rounded-none"
        style={{ aspectRatio: "16 / 9" }}
      >
        {mounted && (
          <iframe
            key={playing ? "play" : "bg"}
            src={playing ? PLAY_SRC : BG_SRC}
            title="ROY Agency 2024 reel"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className={
              playing
                ? "absolute inset-0 h-full w-full"
                : "absolute left-1/2 top-1/2 h-[110%] w-[220%] -translate-x-1/2 -translate-y-1/2 md:w-[110%]"
            }
            style={{ border: 0, pointerEvents: playing ? "auto" : "none" }}
          />
        )}

        {/* Overlay UI — only when not yet playing */}
        {!playing && (
          <>
            {/* Subtle darkening for legibility */}
            <div className="pointer-events-none absolute inset-0 bg-black/25" />

            {/* Top-left label */}
            <div className="pointer-events-none absolute left-4 top-4 z-10 font-display text-[10px] uppercase tracking-[0.28em] text-white/85 md:left-8 md:top-8 md:text-xs">
              2024 Reel
            </div>

            {/* Top-right meta */}
            <div className="absolute right-4 top-4 z-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-white/70 md:right-8 md:top-8 md:text-xs">
              <span>1:32</span>
            </div>

            {/* Center play button */}
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play 2024 reel with sound"
              className="group absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white hover:text-black md:h-32 md:w-32">
                {/* Pulse ring */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-white/40"
                  style={{ animation: "reelPulse 2.4s ease-out infinite" }}
                />
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 fill-current md:h-10 md:w-10"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="mt-4 block text-center font-display text-[10px] uppercase tracking-[0.28em] text-white/80 md:text-xs">
                Play with sound
              </span>
            </button>
          </>
        )}
      </div>

      {/* Below-video row */}
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
        <p className="max-w-md font-sans text-sm text-foreground/75 md:text-base">
          A look at what came out of the studio this year.
        </p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:text-primary"
        >
          <span>See all work</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <style>{`
        @keyframes reelPulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
