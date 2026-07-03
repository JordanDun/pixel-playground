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
      className="project-panel relative h-screen w-full overflow-hidden bg-black"
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
      {/* Vignette + bottom scrim for legibility, close to royagency.com treatment */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
      <div className="grain absolute inset-0 opacity-40" />

      <div
        className={`relative z-10 flex h-full w-full flex-col justify-end px-6 pb-14 md:px-14 md:pb-16 ${
          alignRight ? "md:items-end md:text-right" : "md:items-start"
        }`}
      >
        <div
          className={`max-w-xl transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/70">
            {project.eyebrow}
          </p>
          <h2 className="mt-3 font-display uppercase leading-[0.95] text-white text-3xl md:text-4xl lg:text-5xl">
            {project.title}
          </h2>
          <p className="mt-4 font-serif italic text-base leading-snug text-white/85 md:text-lg">
            {project.tagline}
          </p>
          <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/70">
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
