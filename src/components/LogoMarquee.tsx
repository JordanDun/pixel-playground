import { useRef, useState } from "react";
import bigFaceCoffee from "@/assets/logos/big-face-coffee.png";
import cityOfWesterville from "@/assets/logos/city-of-westerville.png";
import completeHealthcare from "@/assets/logos/complete-healthcare.png";
import craftsman from "@/assets/logos/craftsman.png";
import dewalt from "@/assets/logos/dewalt.png";
import garageBeer from "@/assets/logos/garage-beer.png";
import grantImahara from "@/assets/logos/grant-imahara.png";
import greenhouse from "@/assets/logos/greenhouse.png";
import harvestTable from "@/assets/logos/harvest-table.png";
import mountainDew from "@/assets/logos/mountain-dew.png";
import ohioSteel from "@/assets/logos/ohio-steel.png";
import otterbein from "@/assets/logos/otterbein.png";
import pickupsPlus from "@/assets/logos/pickups-plus.png";
import rootInsurance from "@/assets/logos/root-insurance.png";
import statusSolutions from "@/assets/logos/status-solutions.png";
import twentyOnePilots from "@/assets/logos/twenty-one-pilots.png";
import westervilleCitySchools from "@/assets/logos/westerville-city-schools.png";

// `mono: true` renders the mark as a flat white silhouette (works for one-color
// or dark logos). Full-color marks keep their own art so they stay legible.
// `icon: true` bumps the height for square, icon-only marks so they read at the
// same optical size as the wordmarks.
const LOGOS: Array<{ src: string; alt: string; mono?: boolean; icon?: boolean }> = [
  { src: westervilleCitySchools, alt: "Westerville City Schools", mono: true, icon: true },
  { src: cityOfWesterville, alt: "City of Westerville", mono: true, icon: true },
  { src: garageBeer, alt: "Garage Beer", mono: true },
  { src: statusSolutions, alt: "Status Solutions", mono: true },
  { src: completeHealthcare, alt: "Complete Healthcare", mono: true },
  { src: greenhouse, alt: "Greenhouse", mono: true },
  { src: dewalt, alt: "DeWalt" },
  { src: craftsman, alt: "Craftsman" },
  { src: rootInsurance, alt: "Root Insurance", mono: true },
  { src: harvestTable, alt: "Harvest Table Culinary Group", mono: true },
  { src: pickupsPlus, alt: "Pickups Plus Cars" },
  { src: otterbein, alt: "Otterbein University", mono: true },
  { src: ohioSteel, alt: "Ohio Steel Industries", mono: true },
  { src: bigFaceCoffee, alt: "Bigface Coffee", mono: true, icon: true },
  { src: mountainDew, alt: "Mountain Dew" },
  { src: grantImahara, alt: "Grant Imahara STEAM Foundation" },
  { src: twentyOnePilots, alt: "Twenty One Pilots", mono: true },
];

export function LogoMarquee() {
  // Duplicate the list so the -50% translate loop is seamless.
  const track = [...LOGOS, ...LOGOS];
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    setPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section
      aria-label="Selected clients"
      className="relative border-y border-border bg-background py-12 md:py-16"
    >
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          ref={scrollerRef}
          className="no-scrollbar overflow-x-auto overscroll-x-contain touch-pan-x cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            endDrag();
            setPaused(false);
          }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className={`marquee flex w-max items-center gap-20 md:gap-28 ${paused ? "is-paused" : ""}`}
          >
            {track.map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                draggable={false}
                className={`w-auto max-w-[220px] shrink-0 object-contain opacity-80 transition-opacity hover:opacity-100 ${
                  logo.icon ? "h-14 md:h-20" : "h-10 md:h-14"
                }`}
                style={logo.mono ? { filter: "brightness(0) invert(1)" } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

