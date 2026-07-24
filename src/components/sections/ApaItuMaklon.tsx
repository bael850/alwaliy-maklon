import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BRAND_OWNS = [
  "Konsep, nama, dan identitas brand",
  "Target pasar dan strategi marketing",
  "Kanal penjualan dan distribusi",
  "Harga jual dan positioning produk",
];

const AL_WALIY_OWNS = [
  "Riset dan pengembangan formula",
  "Produksi sesuai standar GMP",
  "Pengurusan halal, BPOM, dan CoA",
  "Quality control tiap batch produksi",
];

export function ApaItuMaklon() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-aim="heading"]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      gsap.from('[data-aim="column"]', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: '[data-aim="columns"]', start: "top 80%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="apa-itu-maklon"
      className="border-b border-hairline py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div data-aim="heading" className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            Apa itu Maklon?
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            Satu kesepakatan kerja, dua peran yang jelas.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink/70 md:text-lg">
            Maklon adalah kerja sama produksi: Anda membawa ide dan brand, kami
            yang mewujudkannya jadi produk jadi berkualitas — lengkap dengan
            izin edarnya. Gak perlu bangun pabrik sendiri atau mengurus
            sertifikasi dari nol.
          </p>
        </div>

        <div
          data-aim="columns"
          className="mt-14 grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline md:grid-cols-2"
        >
          <div data-aim="column" className="bg-paper p-8 md:p-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink/50">
              Pihak Pertama — Anda
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              Yang Anda pegang
            </h3>
            <ul className="mt-6 space-y-4">
              {BRAND_OWNS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-ink/40" />
                  <span className="font-body text-sm text-ink/80 md:text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-aim="column" className="bg-forest p-8 text-paper md:p-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-paper/60">
              Pihak Kedua — Al-Waliy
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold">
              Yang kami pegang
            </h3>
            <ul className="mt-6 space-y-4">
              {AL_WALIY_OWNS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-stamp" />
                  <span className="font-body text-sm text-paper/90 md:text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
