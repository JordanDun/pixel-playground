import { createFileRoute } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/about")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData: origin }) => {
    const title = "About ROY Agency — Columbus Video Production Studio";
    const description =
      "Learn about ROY Agency, a Columbus, Ohio video production and creative studio built for brands that demand memorable work.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/about" },
        { property: "og:image", content: `${origin}/og-roy.jpg` },
      ],
      links: [{ rel: "canonical", href: "/about" }],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page header */}
      <section className="page-pad pt-32 pb-16">
        <div className="page-wrap">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            About us
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
            Built for<br />
            <span className="text-primary">brands that</span><br />
            demand more.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="page-pad pb-24">
        <div className="page-wrap">
          <div className="mx-auto max-w-3xl space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              ROY Agency was founded on a simple belief: the best marketing doesn't feel like marketing.
              It feels like a story you want to watch again. Based in Columbus, Ohio, we bring together directors,
              cinematographers, strategists, and editors under one roof to make work that moves people — and moves product.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              We produce everything from cinematic brand films to high-volume social
              campaigns. Our clients are global brands, ambitious startups, and cultural
              institutions who trust us to translate their vision into something unmistakable.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border page-pad py-16">
        <div className="page-wrap">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "150+", label: "Projects delivered" },
              { value: "12", label: "Years in production" },
              { value: "40+", label: "Brand partners" },
              { value: "8", label: "Industry awards" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-display text-5xl text-primary md:text-6xl">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Studio */}
      <section className="page-pad py-24">
        <div className="page-wrap">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-4xl uppercase md:text-6xl">
              Built on craft.<br />
              <span className="text-primary">Global reach.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Our core team is tight-knit, but our network spans the world. Need a crew in London,
              Tokyo, or São Paulo? We've got it covered. We combine the intimacy of a boutique studio
              with the infrastructure of a global production company.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
