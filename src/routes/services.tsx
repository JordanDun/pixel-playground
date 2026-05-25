import { createFileRoute } from "@tanstack/react-router";

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

      {/* Services list */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl divide-y divide-border">
          {SERVICES.map((service, i) => (
            <div key={i} className="py-10 md:py-14">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <h3 className="font-display text-3xl uppercase md:text-4xl">
                  {service.title}
                </h3>
                <p className="max-w-md text-base text-muted-foreground md:text-lg">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
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
