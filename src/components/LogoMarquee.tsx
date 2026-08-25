import bigFaceCoffee from "@/assets/logos/big-face-coffee.png.asset.json";
import completeHealthcare from "@/assets/logos/complete-healthcare.png.asset.json";
import craftsman from "@/assets/logos/craftsman.png.asset.json";
import dewalt from "@/assets/logos/dewalt.png.asset.json";
import garageBeer from "@/assets/logos/garage-beer.png.asset.json";
import grantImahara from "@/assets/logos/grant-imahara.png.asset.json";
import greenhouse from "@/assets/logos/greenhouse.png.asset.json";
import harvestTable from "@/assets/logos/harvest-table.png.asset.json";
import mountainDew from "@/assets/logos/mountain-dew.png.asset.json";
import ohioSteel from "@/assets/logos/ohio-steel.png.asset.json";
import otterbein from "@/assets/logos/otterbein.png.asset.json";
import pickupsPlus from "@/assets/logos/pickups-plus.png.asset.json";
import rootInsurance from "@/assets/logos/root-insurance.png.asset.json";
import statusSolutions from "@/assets/logos/status-solutions.png.asset.json";
import twentyOnePilots from "@/assets/logos/twenty-one-pilots.png.asset.json";
import westervilleCitySchools from "@/assets/logos/westerville-city-schools.png.asset.json";

// `mono: true` renders the mark as a flat white silhouette (works for one-color
// or dark logos). Full-color marks keep their own art so they stay legible.
// `icon: true` bumps the height for square, icon-only marks so they read at the
// same optical size as the wordmarks.
const LOGOS: Array<{ src: string; alt: string; mono?: boolean; icon?: boolean }> = [
  { src: westervilleCitySchools.url, alt: "Westerville City Schools", mono: true, icon: true },
  { src: garageBeer.url, alt: "Garage Beer", mono: true },
  { src: statusSolutions.url, alt: "Status Solutions", mono: true },
  { src: completeHealthcare.url, alt: "Complete Healthcare", mono: true },
  { src: greenhouse.url, alt: "Greenhouse", mono: true },
  { src: dewalt.url, alt: "DeWalt" },
  { src: craftsman.url, alt: "Craftsman" },
  { src: rootInsurance.url, alt: "Root Insurance", mono: true },
  { src: harvestTable.url, alt: "Harvest Table Culinary Group", mono: true },
  { src: pickupsPlus.url, alt: "Pickups Plus Cars" },
  { src: otterbein.url, alt: "Otterbein University", mono: true },
  { src: ohioSteel.url, alt: "Ohio Steel Industries", mono: true },
  { src: bigFaceCoffee.url, alt: "Bigface Coffee", mono: true, icon: true },
  { src: mountainDew.url, alt: "Mountain Dew" },
  { src: grantImahara.url, alt: "Grant Imahara STEAM Foundation" },
  { src: twentyOnePilots.url, alt: "Twenty One Pilots", mono: true },
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
              className={`w-auto max-w-[220px] shrink-0 object-contain opacity-80 transition-opacity hover:opacity-100 ${
                logo.icon ? "h-14 md:h-20" : "h-10 md:h-14"
              }`}
              style={logo.mono ? { filter: "brightness(0) invert(1)" } : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
