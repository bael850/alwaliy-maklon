import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import heroImageWebp from "../../assets/hero.webp";
import heroImagePng from "../../assets/hero.png";
import { useLanguage } from "../../i18n/LanguageContext";

const WA_NUMBER = "6281515264972";
const waHref = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export default function Hero() {
  const { t } = useLanguage();
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preload gambar Hero — pakai heroImageWebp yang udah di-resolve Vite,
    // jadi otomatis akurat meski nama file di-hash pas production build.
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = heroImageWebp;
    link.type = "image/webp";
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const els = [
      eyebrowRef.current,
      headingRef.current,
      paraRef.current,
      ctaRef.current,
    ];

    if (prefersReducedMotion) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(els, { opacity: 0, y: 24 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.2,
    });

    // Catatan: background gambar sengaja dibuat statis (tanpa efek zoom/Ken
    // Burns) — cuma teks & CTA yang punya animasi masuk di atas.
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden md:min-h-dvh"
    >
      {/* Background image — statis, WebP utama (lebih ringan), fallback PNG
          buat browser lama. Ini elemen LCP (yang pertama dilihat user), jadi
          eager + fetchPriority high. */}
      <picture>
        <source srcSet={heroImageWebp} type="image/webp" />
        <img
          src={heroImagePng}
          alt={t.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      {/* Overlay gradient — gelap di bawah & kiri (tempat teks berada) biar kontras
          konsisten di atas foto apa pun, tipis di kanan-atas biar navbar tetap terasa ringan */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 md:from-black/85 md:via-black/45 md:to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-16 sm:pt-24 md:px-8 md:pb-24 md:pt-40">
        <p
          ref={eyebrowRef}
          className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-gold-light [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]"
        >
          {t.hero.eyebrow}
        </p>

        <h1
          ref={headingRef}
          className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] text-cream [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] md:text-6xl"
        >
          {t.hero.heading}
        </h1>

        <p
          ref={paraRef}
          className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg"
        >
          {t.hero.paragraph}
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={waHref(t.hero.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[4px] border-[1.5px] border-cream px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest"
          >
            {t.hero.ctaPrimary}
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href="#layanan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream/90 underline underline-offset-4 transition-colors hover:text-gold-light"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
