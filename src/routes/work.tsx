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

const PROJECTS = [
  { client: "NIKE", title: "Air Max Day — Global Campaign", category: "Campaign", year: "2026" },
  { client: "A24", title: "Midnight Hour — Teaser", category: "Film", year: "2025" },
  { client: "SPOTIFY", title: "Wrapped — Behind the Scenes", category: "Documentary", year: "2025" },
  { client: "RIMOWA", title: "Never Still — Director's Cut", category: "Brand Film", year: "2025" },
  { client: "AESOP", title: "Seasonal Rituals — Series", category: "Content Series", year: "2024" },
  { client: "NETFLIX", title: "Stranger Things S5 — Promo", category: "Promo", year: "2024" },
  { client: "PORSCHE", title: "911 S/T — Launch Film", category: "Launch Film", year: "2024" },
  { client: "VICE", title: "Noisey — Artist Profiles", category: "Documentary", year: "2024" },
];

function WorkPage() {
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
          {PROJECTS.map((project, i) => (
            <a
              key={i}
              href="#"
              className="group relative bg-background p-6 transition-colors hover:bg-accent/30 md:p-10"
            >
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
                  View →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
