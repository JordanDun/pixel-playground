import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_services",
  title: "List ROY services",
  description: "List ROY Agency's video production and marketing service offerings.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: [
          "ROY Agency services:",
          "- Brand Films & Commercials",
          "- Social Content & Reels",
          "- Video Production (full-service)",
          "- Marketing & Creative Strategy",
          "Based in Columbus, Ohio. Contact: hello@royagency.com",
        ].join("\n"),
      },
    ],
  }),
});
