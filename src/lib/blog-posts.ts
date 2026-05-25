export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-makes-a-brand-video-actually-convert",
    title: "What Makes A Brand Video Actually Convert",
    excerpt:
      "Production value gets the click. Story keeps the viewer. Here's the framework we use on every ROY brand film.",
    date: "May 10, 2026",
    readTime: "6 min read",
    category: "Strategy",
    body: [
      "Most brand videos fail not because of bad production, but because they lead with the brand instead of the viewer. We start every project by asking: what does the viewer want to feel in the first three seconds?",
      "The answer dictates everything — pacing, color, music, the opening frame. When that hook lands, the rest of the film has permission to sell.",
      "Below we break down three recent ROY projects and the single creative decision that made each one convert.",
    ],
  },
  {
    slug: "short-form-vs-long-form-in-2026",
    title: "Short-Form vs Long-Form Video In 2026",
    excerpt:
      "Vertical clips are not replacing the hero film. They're feeding it. Here's how we plan both from a single shoot.",
    date: "April 22, 2026",
    readTime: "5 min read",
    category: "Production",
    body: [
      "The smartest brands we work with stopped treating TikTok and YouTube as separate budgets. One production day, shot with both formats in mind, can produce a hero film and 40+ vertical cutdowns.",
      "The trick is in pre-production: we storyboard the hero, then reverse-engineer the vertical beats from it before the camera rolls.",
    ],
  },
  {
    slug: "inside-a-roy-production-day",
    title: "Inside A ROY Production Day",
    excerpt:
      "From 5am call time to the final wrap. A behind-the-scenes look at how we run a commercial shoot.",
    date: "March 30, 2026",
    readTime: "8 min read",
    category: "Behind The Scenes",
    body: [
      "A production day is 80% logistics and 20% magic. The magic only happens because the logistics are airtight.",
      "Here's the hour-by-hour breakdown of our last shoot in downtown LA — including the moment everything almost fell apart at golden hour.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
