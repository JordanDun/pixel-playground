import { createFileRoute } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/data-ethics")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData: origin }) => {
    const title = "Data Ethics | ROY Agency";
    const description =
      "ROY Agency's code of ethical data practices: plain-language policies, first-party data, low commitment strategies, values-aligned metrics, and honest partnerships.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/data-ethics" },
        { property: "og:image", content: `${origin}/og-roy.jpg` },
      ],
      links: [{ rel: "canonical", href: "/data-ethics" }],
    };
  },
  component: DataEthicsPage,
});

const principles = [
  {
    num: "01",
    title: "Make data policies easy to read and understand",
    body: "Policies that are written by lawyers can only be understood by lawyers. We use creativity, common language and visual storytelling techniques to turn complex, jargon-filled policies into clear, simple guidelines for both ROY policies and our clients.",
  },
  {
    num: "02",
    title: "Build brand autonomy through first-party data collection",
    body: "Data collected beyond your walls is data you can't control. Ethically captured first-party data reduces reliance on potential bad actors. We advise brands to invest in owned properties and optimized user experiences that result in stronger, 1-1 relationships with consumers.",
  },
  {
    num: "03",
    title: "Implement low commitment / high reward consumer data strategies",
    body: "To build data, we must build trust. Data collection should focus on creating more value for the customer, not just collecting more information for brands. We only ask for the minimal amount of data necessary to improve a consumer's direct experience with the brand.",
  },
  {
    num: "04",
    title: "Align platform success metrics with brand values",
    body: "Technology can be good or bad or good and bad but it is never neutral. While still being informed by engagement and conversion metrics, we establish a new definition of success for the platforms and technologies we create, one that honors human nature, grows responsibly, and helps us live in alignment with our brand's deepest values.",
  },
  {
    num: "05",
    title: "Ensure ethical partnerships",
    body: "We admittedly can't do it all, so we'll work to keep our data partners honest, too. We will only work with data partners who are leaders in people-first, privacy compliant data. We'll also conduct quarterly data audits to investigate how consumer data is being collected, stored, and used and will terminate any partnerships not acting in accordance with GDPR and CCPA standards.",
  },
];

function DataEthicsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="page-pad pt-32 pb-12">
        <div className="page-wrap">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Our Code</p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-7xl">
            Data Ethics<br />
            <span className="text-primary">at ROY</span>
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            This code summarizes our shared commitment to the advancement of ethical data practices
            and the actions that guide our work. To that end, we will:
          </p>
        </div>
      </section>

      <section className="page-pad pb-32">
        <div className="page-wrap max-w-4xl space-y-12">
          {principles.map((p) => (
            <section key={p.num} className="border-t border-border pt-8">
              <p className="text-xs uppercase tracking-[0.24em] text-primary">{p.num}.</p>
              <h2 className="mt-3 font-display text-2xl uppercase tracking-tight md:text-3xl">
                {p.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {p.body}
              </p>
            </section>
          ))}

          <section className="border-t border-border pt-8">
            <h2 className="font-display text-2xl uppercase tracking-tight md:text-3xl">
              Questions
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>Want to talk through how this applies to your brand? Reach out any time.</p>
              <p className="space-x-4">
                <a
                  href="mailto:jordan@royagency.com"
                  className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                >
                  hello@royagency.com
                </a>
                <a
                  href="tel:+16142646965"
                  className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                >
                  614-264-6965
                </a>
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                ROY Agency LLC · Columbus, Ohio
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
