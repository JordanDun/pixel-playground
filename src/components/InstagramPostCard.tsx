import { Instagram } from "lucide-react";

export function InstagramPostCard({
  imageUrl,
  caption,
  postUrl,
}: {
  imageUrl: string;
  caption: string;
  postUrl: string;
}) {
  return (
    <a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={caption}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex items-start gap-3">
        <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-social" />
        <p className="text-sm leading-relaxed text-surface-foreground/80">{caption}</p>
      </div>
    </a>
  );
}
