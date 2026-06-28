import statusSolutions from "@/assets/logos/status-solutions.png.asset.json";
import craftsman from "@/assets/logos/craftsman.png.asset.json";
import twentyOnePilots from "@/assets/logos/twenty-one-pilots.png.asset.json";
import rootInsurance from "@/assets/logos/root-insurance.png.asset.json";

const LOGOS = [
  { src: statusSolutions.url, alt: "Status Solutions" },
  { src: craftsman.url, alt: "Craftsman" },
  { src: twentyOnePilots.url, alt: "Twenty One Pilots" },
  { src: rootInsurance.url, alt: "Root Insurance" },
];

export function LogoMarquee() {
  // Duplicate the list so the -50% translate loop is seamless.
  const track = [...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="Selected clients"
      className="relative border-y border-border bg-background py-12 md:py-16"
    >
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee flex w-max items-center gap-20 md:gap-28">
          {track.map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-10 w-auto shrink-0 object-contain opacity-80 transition-opacity hover:opacity-100 md:h-14"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
