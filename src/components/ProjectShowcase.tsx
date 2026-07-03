import { useEffect, useRef, useState } from "react";
import pickupsAsset from "@/assets/pickups-plus.mp4.asset.json";
import bigBusAsset from "@/assets/big-bus.mp4.asset.json";
import craftsmanAsset from "@/assets/craftsman.mp4.asset.json";

type Project = {
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  video: string;
  align?: "left" | "right";
};

const PROJECTS: Project[] = [
  {
    eyebrow: "Pickups Plus Cars",
    title: "No Matter What You Drive",
    tagline: "A high-octane :60 web spot for the Pickups Plus brand refresh.",
    body: "A brand refresh built for the shop that treats every truck like it matters — from the daily driver to the weekend build.",
    video: pickupsAsset.url,
    align: "left",
  },
  {
    eyebrow: "The Big Bus Project",
    title: "Opportunity in Motion",
    tagline: "A cinematic film about meeting students where they are.",
    body: "The Big Bus's mission is to increase access to resources, opportunities, and learning by meeting students and families where they are. We built a film that carries that mission with the weight it deserves.",
    video: bigBusAsset.url,
    align: "right",
  },
  {
    eyebrow: "Craftsman",
    title: "For the doer.",
    tagline: "Homeowners don't have time for inferior tools.",
    body: "Craftsman is known for superior quality and rigorous testing — but what does that actually mean for the person doing the work? That was the question our campaign set out to answer.",
    video: craftsmanAsset.url,
    align: "left",
  },
];

function ProjectPanel({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setVisible(e.isIntersecting);
          const v = videoRef.current;
          if (!v) continue;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const alignRight = project.align === "right";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={project.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gradient scrim for legibility */}
      <div
        className={`absolute inset-0 ${
          alignRight
            ? "bg-gradient-to-l from-black/85 via-black/40 to-transparent"
            : "bg-gradient-to-r from-black/85 via-black/40 to-transparent"
        }`}
      />
      <div className="grain absolute inset-0 opacity-40" />

      <div
        className={`relative z-10 flex h-full w-full flex-col justify-end px-6 pb-16 md:px-16 md:pb-24 ${
          alignRight ? "md:items-end md:text-right" : "md:items-start"
        }`}
      >
        <div
          className={`max-w-2xl transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-white/70">
            {project.eyebrow}
          </p>
          <h2 className="mt-5 font-display uppercase leading-[0.92] text-white text-5xl md:text-7xl lg:text-8xl">
            {project.title}
          </h2>
          <p className="mt-6 font-serif italic text-xl leading-snug text-white/90 md:text-2xl">
            {project.tagline}
          </p>
          <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-white/75 md:text-base">
            {project.body}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProjectShowcase() {
  return (
    <div className="relative">
      {PROJECTS.map((p) => (
        <ProjectPanel key={p.title} project={p} />
      ))}
    </div>
  );
}
