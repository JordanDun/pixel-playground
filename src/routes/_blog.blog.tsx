import { createFileRoute, Link } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const Route = createFileRoute("/_blog/blog")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData: origin }) => {
    const title = "Journal — Video Production & Creative Strategy | ROY Agency";
    const description =
      "Notes on video production, brand strategy, and creative direction from the ROY Agency team in Columbus, Ohio.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/blog" },
        { property: "og:image", content: `${origin}/og-roy.jpg` },
      ],
      links: [{ rel: "canonical", href: "/blog" }],
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main className="min-h-screen bg-background px-6 pt-32 pb-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Journal</p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] text-foreground md:text-7xl">
          Notes from the studio.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground">
          Field notes on video, brand strategy, and what we're learning on set.
        </p>

        <div className="mt-16 divide-y divide-border border-t border-border">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group block py-8 transition-colors hover:bg-muted/40"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-primary">{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-foreground transition-colors group-hover:text-primary md:text-4xl">
                {post.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
