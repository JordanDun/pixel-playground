import { defineTool } from "@lovable.dev/mcp-js";
import { BLOG_POSTS } from "@/lib/blog-posts";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description: "List ROY Agency blog posts with slug, title, date, category, and excerpt.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: BLOG_POSTS.map(
          (p) => `- ${p.slug} | ${p.date} | ${p.category} | ${p.title}\n  ${p.excerpt}`,
        ).join("\n"),
      },
    ],
    structuredContent: {
      posts: BLOG_POSTS.map(({ slug, title, date, category, excerpt, readTime }) => ({
        slug,
        title,
        date,
        category,
        excerpt,
        readTime,
      })),
    },
  }),
});
