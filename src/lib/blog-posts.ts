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
    slug: "questions-to-ask-video-production-company-columbus",
    title: "5 Questions to Ask Before Hiring a Video Production Company in Columbus",
    excerpt:
      "The right production partner shapes your budget, timeline, and final film. Here are five questions we recommend asking before you sign.",
    date: "June 30, 2026",
    readTime: "5 min read",
    category: "Strategy",
    body: [
      "Every video project is a small production. Before you hire a Columbus video production company, you should know how they think about scope, budget, and the final deliverables. The answers will tell you whether you are getting a vendor or a creative partner.",
      "1. Can I see work in my category? A portfolio full of polished brand films is great, but look for projects that match your industry and format. If you need a restaurant video, ask for restaurant work. If you need a commercial, ask for commercials. Relevant experience means fewer surprises on set.",
      "2. What does the price actually include? Some quotes cover only filming; others include editing, music licensing, color correction, and revisions. Ask for a clear deliverables list so you know what you are paying for and what might cost extra.",
      "3. How long is the turnaround? A simple interview can be edited in a week. A full commercial with multiple locations and reviews may need four to six weeks. Match the timeline to your launch date, not the other way around.",
      "4. Who is on the crew? A one-person shoot is different from a team with a director, cinematographer, and sound. The crew size should match the complexity of your story, and you should know who is showing up and why.",
      "5. What happens after delivery? Ask about file formats, social cutdowns, and whether you own the raw footage. The best partners set you up to reuse the work across your website, ads, and social channels for months.",
      "If you are planning a video project in Columbus, these questions will help you compare production companies on the factors that actually matter. And if you want to talk through your project with us, we are happy to answer all five.",
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
