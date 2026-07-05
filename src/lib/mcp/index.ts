import { defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import listBlogPostsTool from "./tools/list-blog-posts";
import getBlogPostTool from "./tools/get-blog-post";

export default defineMcp({
  name: "roy-agency-mcp",
  title: "ROY Agency MCP",
  version: "0.1.0",
  instructions:
    "Tools for ROY Agency, a Columbus, Ohio video production and marketing agency. Use list_services for offerings, list_blog_posts to browse blog content, and get_blog_post to read a specific post.",
  tools: [listServicesTool, listBlogPostsTool, getBlogPostTool],
});
