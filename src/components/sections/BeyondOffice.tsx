import { useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mosaik tidak simetris. Urutan 1:1 dengan t.beyondOffice.items.
 * PLACEHOLDER — foto di public/images/beyond/foto-1.(webp|jpg|png), dst.
 */
const TILES = [
  "col-span-2 row-span-2 md:col-span-3",
  "md:col-span-3",
  "",
  "",
  "",
  "col-span-2 md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
];

export default function BeyondOffice() {
  const { t } = useLanguage();
  const gridRef = useRef<HTMLUListElement>(null);

  // Reveal bertahap: foto muncul berurutan saat grid masuk viewport.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".beyond-tile",
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 0.6,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: grid, start: "top 80%", once: true },
        },
      );
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <section id="beyond" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            {t.beyondOffice.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-[1.1] text-forest md:text-5xl">
            {t.beyondOffice.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/80 md:text-lg">
            {t.beyondOffice.paragraph}
          </p>
        </Reveal>

        <ul
          ref={gridRef}
          className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-6 md:gap-4"
        >
          {t.beyondOffice.items.map((item, i) => (
            <li
              key={i}
              className={`beyond-tile overflow-hidden rounded-[4px] bg-forest/5 ${TILES[i] ?? ""}`}
            >
              <SmartImage
                basePath={`/images/beyond/foto-${i + 1}`}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <Camera
                      size={32}
                      strokeWidth={1.5}
                      className="text-forest/30"
                    />
                  </div>
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
