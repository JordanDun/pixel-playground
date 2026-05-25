import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import reelCover from "@/assets/reel-cover.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROY Agency — Video Production & Marketing" },
      {
        name: "description",
        content:
          "ROY Agency is a video production and marketing studio crafting cinematic stories, brand films, and campaigns that move people.",
      },
      { property: "og:title", content: "ROY Agency — Video Production & Marketing" },
      {
        property: "og:description",
        content:
          "Cinematic brand films, campaigns, and content. Made by ROY.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const CLIENTS = [
  "NIKE", "A24", "SPOTIFY", "RIMOWA", "AESOP", "NETFLIX",
  "PORSCHE", "VICE", "MONCLER", "DAZED", "SSENSE", "ARC'TERYX",
];

function Home() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const la = d.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(la);
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-2 font-display text-2xl tracking-tight">
          <span className="inline-block size-2 rounded-full bg-primary" />
          ROY
        </a>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.18em] text-muted-foreground md:flex">
          <a href="#work" className="transition-colors hover:text-foreground">Work</a>
          <a href="#about" className="transition-colors hover:text-foreground">Studio</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          Get in touch
        </a>
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-screen flex-col justify-between px-6 pt-32 pb-10 md:px-10">
        <div className="relative grain pointer-events-none absolute inset-0" />

        <div className="relative z-10 flex flex-1 flex-col justify-center">
          <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-primary blink" />
            Now rolling — 2026 reel
          </p>

          <h1 className="font-display text-balance text-[15vw] leading-[0.85] uppercase md:text-[11vw]">
            Stories<br />
            that <span className="italic text-primary">move</span><br />
            people.
          </h1>

          <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
            ROY is a video production &amp; marketing agency.
            We make brand films, campaigns, and the kind of content
            you finish watching.
          </p>
        </div>

        {/* Showreel card */}
        <a
          href="#reel"
          className="relative z-10 mt-10 grid grid-cols-1 items-end gap-6 border-t border-border pt-6 md:grid-cols-[1fr_auto_auto]"
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <PlayIcon />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Watch</p>
              <p className="font-display text-2xl uppercase leading-none">Showreel ’26</p>
            </div>
          </div>
          <div className="hidden h-20 w-px bg-border md:block" />
          <div className="text-right text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <p>02:14</p>
            <p>4K · Dolby</p>
          </div>
        </a>

        {/* Bottom info row */}
        <div className="relative z-10 mt-10 grid grid-cols-2 gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground md:grid-cols-4">
          <div>
            <p className="text-foreground">Los Angeles</p>
            <p>{time} PT</p>
          </div>
          <div>
            <p className="text-foreground">Est. 2021</p>
            <p>Independent studio</p>
          </div>
          <div className="hidden md:block">
            <p className="text-foreground">12 films</p>
            <p>In production</p>
          </div>
          <div className="hidden md:block">
            <p className="text-foreground">Scroll</p>
            <p>↓ to enter</p>
          </div>
        </div>
      </section>

      {/* Reel image */}
      <section id="reel" className="relative px-6 pb-24 md:px-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
          <img
            src={reelCover}
            alt="ROY Agency 2026 showreel cover — cinematic coral light on dark set"
            width={1600}
            height={1024}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <div className="absolute inset-0 flex items-end justify-between p-6 md:p-10">
            <p className="font-display text-3xl uppercase md:text-5xl">
              Your <span className="text-primary">campaign</span>,<br />
              shot like cinema.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:scale-[1.03]"
            >
              Play reel <PlayIcon small />
            </button>
          </div>
        </div>
      </section>

      {/* Client marquee */}
      <section className="relative border-y border-border py-8 overflow-hidden">
        <div className="flex w-max marquee gap-16 px-6 font-display text-3xl uppercase text-muted-foreground md:text-5xl">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="flex items-center gap-16 whitespace-nowrap">
              {c}
              <span className="inline-block size-2 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Get in touch</p>
            <a
              href="mailto:hello@royagency.com"
              className="mt-2 block font-display text-3xl uppercase md:text-5xl hover:text-primary transition-colors"
            >
              hello@<br />royagency.com
            </a>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground space-y-1">
            <p className="text-foreground">Studio</p>
            <p>Los Angeles, CA</p>
            <p>By appointment</p>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground space-y-1">
            <p className="text-foreground">Follow</p>
            <p><a href="#" className="hover:text-foreground">Instagram</a></p>
            <p><a href="#" className="hover:text-foreground">Vimeo</a></p>
            <p><a href="#" className="hover:text-foreground">LinkedIn</a></p>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <p>ROY Agency © {new Date().getFullYear()}</p>
          <p>All rights reserved</p>
        </div>
      </footer>
    </main>
  );
}

function PlayIcon({ small = false }: { small?: boolean }) {
  const s = small ? 10 : 14;
  return (
    <svg width={s} height={s} viewBox="0 0 10 12" fill="currentColor" aria-hidden>
      <path d="M0 0L10 6L0 12V0Z" />
    </svg>
  );
}
