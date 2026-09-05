import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
        { property: "og:url", content: "https://royagency.com/contact" },
        { property: "og:image", content: "https://royagency.com/og-roy.jpg" },
      ],
      links: [{ rel: "canonical", href: "https://royagency.com/contact" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: title,
            description,
            url: "https://royagency.com/contact",
            mainEntity: {
              "@type": ["LocalBusiness", "VideoProductionCompany"],
              name: "ROY Agency",
              description:
                "Full-service creative studio in Columbus, Ohio specializing in video production, social media management, graphic design, animation, and brand strategy.",
              url: "https://royagency.com",
              email: "hello@royagency.com",
              telephone: "+1-614-264-6965",
              image: "https://royagency.com/og-roy.jpg",
              priceRange: "$$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Columbus",
                addressRegion: "OH",
                addressCountry: "US",
              },
              areaServed: [
                { "@type": "City", name: "Columbus" },
                { "@type": "City", name: "Westerville" },
                { "@type": "City", name: "Dublin" },
                { "@type": "State", name: "Ohio" },
              ],
              sameAs: [
                "https://instagram.com/royagency",
                "https://www.linkedin.com/company/roy-agency/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "hello@royagency.com",
                telephone: "+1-614-264-6965",
                areaServed: "US",
                availableLanguage: "English",
              },
            },
          }),
        },
      ],
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
                href="mailto:hello@royagency.com"
                className="mt-2 block font-display text-3xl uppercase transition-colors hover:text-primary md:text-4xl"
              >
                hello@royagency.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
              <PhoneNumber className="mt-2 block font-display text-3xl uppercase transition-colors hover:text-primary md:text-4xl" />
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
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

const fieldClass =
  "mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary";
const labelClass = "block text-xs uppercase tracking-[0.2em] text-muted-foreground";

const PHONE_DISPLAY = "614-264-6965";

/** True only on touch devices, where a tel: link actually places a call. */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isTouch;
}

function PhoneNumber({
  className,
  as = "span",
}: {
  className?: string;
  as?: "span" | "strong";
}) {
  const isTouch = useIsTouchDevice();
  const Tag = as;
  if (isTouch) {
    return (
      <a href={`tel:+16142646965`} className={className}>
        {PHONE_DISPLAY}
      </a>
    );
  }
  return <Tag className={className}>{PHONE_DISPLAY}</Tag>;
}

function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || !data.success) {
        setError(data.error ?? "");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-3xl uppercase md:text-4xl">Got it.</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your message is with us. Someone from the team will be back to you within one
          business day. If it can't wait, call 614-264-6965.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Honeypot: hidden from people, tempting to bots */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={values.company}
          onChange={set("company")}
        />
      </div>

      <div>
        <label className={labelClass}>Name</label>
        <input
          type="text"
          name="name"
          maxLength={100}
          required
          value={values.name}
          onChange={set("name")}
          className={fieldClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          name="email"
          maxLength={255}
          required
          value={values.email}
          onChange={set("email")}
          className={fieldClass}
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label className={labelClass}>Project type</label>
        <input
          type="text"
          name="projectType"
          maxLength={100}
          value={values.projectType}
          onChange={set("projectType")}
          className={fieldClass}
          placeholder="Brand film, social campaign, etc."
        />
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          rows={4}
          name="message"
          maxLength={5000}
          required
          value={values.message}
          onChange={set("message")}
          className={`${fieldClass} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-primary">
          {error ? `${error} ` : "That didn't send. "}
          Email{" "}
          <a href="mailto:jordan@royagency.com" className="underline">
            jordan@royagency.com
          </a>{" "}
          directly and we'll pick it up there.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-primary px-8 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
