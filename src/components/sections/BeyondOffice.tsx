import { useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAvailableImages } from "../../lib/useAvailableImages";

gsap.registerPlugin(ScrollTrigger);

/**
 * Kolase editorial 12 kolom. Urutan 1:1 dengan t.beyondOffice.items.
 * PLACEHOLDER — foto di public/images/beyond/foto-1.(webp|jpg|png), dst.
 *
 * - Mobile: grid 6 kolom, foto selang-seling kiri/kanan (lebar 4 kolom).
 * - Desktop: judul masuk ke dalam kolase (di samping foto pertama),
 *   foto lain tersebar dengan lebar & rasio berbeda.
 */
const TILES: { cell: string; aspect: string }[] = [
  {
    cell: "col-span-3 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1",
    aspect: "aspect-[4/5]",
  },
  {
    cell: "col-span-3 lg:col-span-5 lg:col-start-7 lg:row-start-2",
    aspect: "aspect-[3/2]",
  },
  {
    cell: "col-span-3 lg:col-span-3 lg:col-start-2",
    aspect: "aspect-square",
  },
  {
    cell: "col-span-3 lg:col-span-4 lg:col-start-6",
    aspect: "aspect-[3/4]",
  },
  {
    cell: "col-span-3 lg:col-span-3 lg:col-start-10",
    aspect: "aspect-[4/5]",
  },
  {
    cell: "col-span-3 lg:col-span-6 lg:col-start-1",
    aspect: "aspect-[3/2]",
  },
  {
    cell: "col-span-3 lg:col-span-3 lg:col-start-8",
    aspect: "aspect-[3/4]",
  },
  {
    cell: "col-span-3 lg:col-span-2 lg:col-start-11",
    aspect: "aspect-square",
  },
];

// Jarak melayang vertikal (px) tiap foto saat scroll, hanya desktop.
// Beda-beda supaya kolase terasa berlapis, tapi cukup kecil agar
// foto yang bertetangga tidak bertabrakan.
const DRIFT = [0, 30, 20, 40, 60, 20, 50, 70];

const photoBase = (i: number) => `/images/beyond/foto-${i + 1}`;

interface BeyondPhoto {
  alt: string;
  base: string;
}

/**
 * Hanya foto yang sudah ada di public/images/beyond yang tampil, dan
 * posisi kolase mengikuti urutan foto yang ada. Belum ada foto sama sekali
 * = section tidak muncul. Foto ditambah = otomatis muncul.
 */
export default function BeyondOffice() {
  const { t } = useLanguage();
  const all = t.beyondOffice.items;
  const { ready, has } = useAvailableImages(all.map((_, i) => photoBase(i)));
  const photos: BeyondPhoto[] = all
    .map((item, i) => ({ alt: item.alt, base: photoBase(i) }))
    .filter((_, i) => has[i]);

  if (!ready || photos.length === 0) return null;
  return <BeyondCollage photos={photos} />;
}

function BeyondCollage({ photos }: { photos: BeyondPhoto[] }) {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    // Semua ukuran layar: foto terbuka dari bawah + gambar di dalam
    // bingkai bergeser pelan (parallax) mengikuti scroll.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tiles = gsap.utils.toArray<HTMLElement>(".beyond-tile", root);
      tiles.forEach((tile) => {
        gsap.fromTo(
          tile,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: tile, start: "top 88%", once: true },
          },
        );
        const par = tile.querySelector(".beyond-par");
        if (par) {
          gsap.fromTo(
            par,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: tile,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    });

    // Desktop saja: tiap bingkai ikut melayang dengan kecepatan sendiri.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const tiles = gsap.utils.toArray<HTMLElement>(".beyond-tile", root);
        tiles.forEach((tile, i) => {
          const d = DRIFT[i] ?? 0;
          if (!d) return;
          gsap.fromTo(
            tile,
            { y: d },
            {
              y: -d,
              ease: "none",
              scrollTrigger: {
                trigger: tile,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="beyond" className="bg-cream py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          ref={rootRef}
          className="grid grid-cols-6 items-start gap-x-3 gap-y-3 lg:grid-cols-12 lg:[align-items:normal] lg:gap-x-8 lg:gap-y-20"
        >
          {/* Judul ikut jadi bagian kolase */}
          <Reveal className="col-span-6 mb-6 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mb-0 lg:self-start lg:pt-6">
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-gold">
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              {t.beyondOffice.eyebrow}
            </p>
            <h2 className="font-heading text-4xl leading-[1.02] font-extrabold tracking-tight text-forest md:text-6xl xl:text-7xl">
              {t.beyondOffice.heading}
            </h2>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-ink/75 md:text-lg">
              {t.beyondOffice.paragraph}
            </p>
          </Reveal>

          {photos.map((photo, i) => {
            const tile = TILES[i] ?? {
              cell: "col-span-3 lg:col-span-3",
              aspect: "aspect-square",
            };
            return (
              <figure
                key={i}
                className={`beyond-tile group relative overflow-hidden rounded-[4px] bg-forest/5 ${tile.cell} ${tile.aspect} ${i % 2 === 1 ? "max-lg:mt-10" : ""}`}
              >
                {/* Lebih tinggi dari bingkai supaya bisa bergeser (parallax) */}
                <div className="beyond-par absolute inset-x-0 -top-[10%] h-[120%]">
                  <SmartImage
                    basePath={photo.base}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                    fallback={
                      <div className="flex h-full w-full items-center justify-center">
                        <Camera
                          size={32}
                          strokeWidth={1.25}
                          className="text-forest/30"
                        />
                      </div>
                    }
                  />
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
