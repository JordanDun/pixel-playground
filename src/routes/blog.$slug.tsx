import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPostBySlug } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — ROY Journal` : "ROY Journal";
    const description = post?.excerpt ?? "Notes from the ROY studio.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post?.slug ?? ""}` },
      ],
      links: post
        ? [{ rel: "canonical", href: `/blog/${post.slug}` }]
        : [],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.date,
                author: { "@type": "Organization", name: "ROY Agency" },
              }),
            },
          ]
        : [],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">404</p>
        <h1 className="mt-3 font-display text-4xl uppercase text-foreground">
          Post not found
        </h1>
        <Link
          to="/blog"
          className="mt-6 inline-block text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          ← Back to Journal
        </Link>
      </div>
    </main>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background px-6 pt-32 pb-24 md:px-10">
      <article className="mx-auto max-w-3xl">
        <Link
          to="/blog"
          className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Journal
        </Link>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-primary">{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mt-4 font-display text-4xl uppercase leading-[1.02] text-foreground md:text-6xl">
          {post.title}
        </h1>

        <div className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {post.body.map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
