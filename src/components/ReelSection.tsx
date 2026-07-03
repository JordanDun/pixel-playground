import { useEffect, useRef, useState } from "react";
import reelAsset from "@/assets/Roy-Website-Loop_2.mp4.asset.json";

const REEL_VIDEO = reelAsset.url;

export function ReelSection() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    video.play().catch(() => {});
  };

  return (
    <section
      id="reel"
      aria-label="ROY Agency reel"
      className="relative bg-background"
    >
      <div
        className="relative w-full overflow-hidden bg-black cursor-pointer"
        style={{ aspectRatio: "16 / 9" }}
        onClick={handleClick}
      >
        {mounted && (
          <video
            ref={videoRef}
            src={REEL_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            title="ROY Agency reel"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </section>
  );
}
