import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { BLOG_POSTS } from "@/lib/blog-posts";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Get the full body of a ROY Agency blog post by slug.",
  inputSchema: {
    slug: z.string().min(1).describe("Blog post slug, e.g. from list_blog_posts."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) {
      return {
        content: [{ type: "text", text: `No blog post found for slug: ${slug}` }],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `# ${post.title}\n${post.date} · ${post.category} · ${post.readTime}\n\n${post.body.join("\n\n")}`,
        },
      ],
      structuredContent: { post },
    };
  },
});
