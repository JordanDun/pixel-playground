import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ROY Agency" },
      {
        name: "description",
        content:
          "Get in touch with ROY Agency. Start a project, request a deck, or just say hello.",
      },
      { property: "og:title", content: "Contact — ROY Agency" },
      {
        property: "og:description",
        content: "Get in touch with ROY Agency.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page header */}
      <section className="px-6 pt-32 pb-16 md:px-10">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Get in touch
        </p>
        <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Let's make<br />
          <span className="text-primary">something.</span>
        </h1>
      </section>

      {/* Contact grid */}
      <section className="px-6 pb-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
              <a
                href="mailto:hello@royagency.com"
                className="mt-2 block font-display text-3xl uppercase transition-colors hover:text-primary md:text-4xl"
              >
                hello@royagency.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Studio</p>
              <p className="mt-2 text-base text-muted-foreground">
                Los Angeles, CA<br />
                By appointment
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Social</p>
              <div className="mt-2 flex gap-6">
                <a href="https://instagram.com/royagency" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.1em] transition-colors hover:text-primary">Instagram</a>
                <a href="#" className="text-sm uppercase tracking-[0.1em] transition-colors hover:text-primary">Vimeo</a>
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
