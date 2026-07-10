import { createFileRoute } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/contact")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData: origin }) => {
    const title = "Contact ROY Agency | Columbus Video Production Studio";
    const description =
      "Start a project with ROY Agency. Contact our Columbus, Ohio video production studio for brand films, commercials, and social content.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/contact" },
        { property: "og:image", content: `${origin}/og-roy.jpg` },
      ],
      links: [{ rel: "canonical", href: "/contact" }],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page header */}
      <section className="page-pad pt-32 pb-16">
        <div className="page-wrap">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Get in touch
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
            Let's make<br />
            <span className="text-primary">something.</span>
          </h1>
        </div>
      </section>

      {/* Contact grid */}
      <section className="page-pad pb-24">
        <div className="page-wrap grid gap-16 md:grid-cols-2">

          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
              <a
                href="mailto:jordan@royagency.com"
                className="mt-2 block font-display text-3xl uppercase transition-colors hover:text-primary md:text-4xl"
              >
                hello@royagency.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
              <a
                href="tel:+16142646965"
                className="mt-2 block font-display text-3xl uppercase transition-colors hover:text-primary md:text-4xl"
              >
                614-264-6965
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Google Business Profile</p>
              <a
                href="https://share.google/MC6y9A8g5LH4WfCAI"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm uppercase tracking-[0.1em] transition-colors hover:text-primary"
              >
                View on Google →
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Social</p>
              <div className="mt-2 flex gap-6">
                <a href="https://instagram.com/royagency" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.1em] transition-colors hover:text-primary">Instagram</a>
                <a href="https://www.linkedin.com/company/roy-agency/" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.1em] transition-colors hover:text-primary">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Project type
              </label>
              <input
                type="text"
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Brand film, social campaign, etc."
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Message
              </label>
              <textarea
                rows={4}
                className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-primary px-8 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
