import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ROY Agency" },
      {
        name: "description",
        content:
          "End-to-end video production and marketing services. Strategy, production, post-production, and distribution.",
      },
      { property: "og:title", content: "Services — ROY Agency" },
      {
        property: "og:description",
        content: "End-to-end video production and marketing services.",
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    title: "Creative Direction",
    description:
      "Concept development, storyboarding, and visual strategy that aligns your brand with your audience.",
  },
  {
    title: "Production",
    description:
      "Full-service crews, locations, casting, and equipment. From single-day shoots to multi-city campaigns.",
  },
  {
    title: "Post-Production",
    description:
      "Edit, color, sound design, VFX, and finishing. Deliverables optimized for every platform and format.",
  },
  {
    title: "Social Content",
    description:
      "High-volume, platform-native content. Short-form, cutdowns, and adaptations that stop the scroll.",
  },
  {
    title: "Brand Films",
    description:
      "Cinematic storytelling that elevates your brand. Documentary, narrative, and anthem films.",
  },
  {
    title: "Campaign Strategy",
    description:
      "Distribution planning, media buying guidance, and performance tracking to maximize your investment.",
  },
];

function ServicesPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page header */}
      <section className="px-6 pt-32 pb-16 md:px-10">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          What we do
        </p>
        <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Services<br />
          <span className="text-primary">end to end.</span>
        </h1>
      </section>

      {/* Interactive services box */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card/40 p-6 md:p-12">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* Pills column */}
            <div className="flex flex-col items-start gap-3">
              {SERVICES.map((service, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="w-full">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className={`group inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm uppercase tracking-[0.14em] transition-all ${
                        isOpen
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background/60 text-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      <span>{service.title}</span>
                      {isOpen ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "mt-3 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="max-w-md rounded-2xl border border-border bg-background/70 p-5">
                          <h3 className="font-display text-lg uppercase">
                            {service.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual / detail column */}
            <div className="relative hidden min-h-[420px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-background to-background md:block">
              <div className="absolute inset-0 flex items-center justify-center p-10">
                {openIndex !== null ? (
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-primary">
                      0{openIndex + 1} / 0{SERVICES.length}
                    </p>
                    <h3 className="mt-4 font-display text-4xl uppercase leading-[0.95] md:text-5xl">
                      {SERVICES[openIndex].title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground md:text-base">
                      {SERVICES[openIndex].description}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Select a service
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display text-3xl uppercase md:text-5xl">
            Ready to <span className="text-primary">roll?</span>
          </h2>
          <a
            href="/contact"
            className="rounded-full border border-foreground px-6 py-3 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-foreground hover:text-background"
          >
            Start a project
          </a>
        </div>
      </section>
    </main>
  );
}
