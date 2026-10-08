import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImageWebp from "../../assets/hero.webp";
import heroImagePng from "../../assets/hero.png";
import { useLanguage } from "../../i18n/LanguageContext";

const WA_NUMBER = "6282110689827";
const waHref = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

gsap.registerPlugin(ScrollTrigger);

/** Durasi tiap slide (ms) — sekaligus durasi progress bar. */
const SLIDE_DURATION = 6500;
/** Jarak geser minimum (px) supaya swipe dihitung pindah slide. */
const SWIPE_THRESHOLD = 50;

/**
 * Gambar tiap slide. URUTAN HARUS 1:1 dengan t.hero.slides di translations.
 * TODO: ganti `webp`/`png` dengan foto asli per slide (taruh di src/assets,
 * lalu import di atas). Sementara semua pakai hero bawaan dengan
 * object-position berbeda supaya transisinya tetap kelihatan.
 */
const SLIDE_IMAGES = [
  { webp: heroImageWebp, png: heroImagePng, position: "center center" },
  { webp: heroImageWebp, png: heroImagePng, position: "20% center" },
  { webp: heroImageWebp, png: heroImagePng, position: "80% center" },
];

export default function Hero() {
  const { t } = useLanguage();
  const slides = t.hero.slides;
  const total = slides.length;

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const paused = userPaused || hovered || focused || tabHidden;
  const autoplay = !reducedMotion && !userPaused;

  const goTo = useCallback(
    (index: number) => setActive(((index % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Preload gambar slide pertama (LCP).
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = SLIDE_IMAGES[0].webp;
    link.type = "image/webp";
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Pantau reduced-motion & tab tersembunyi (hemat CPU, jangan ganti slide
  // di tab yang nggak dilihat).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReducedMotion(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);

    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Animasi masuk awal — cuma sekali saat halaman dibuka.
  useEffect(() => {
    const el = contentRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from(el.children, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.14,
        delay: 0.2,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Parallax — background digeser lebih lambat dari scroll. Wrapper di-scale
  // 116% lewat CSS supaya nggak ada celah di tepi saat digeser.
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) {
      next();
    } else {
      prev();
    }
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-roledescription="carousel"
      aria-label={t.hero.carouselAria}
      className="relative flex min-h-[100svh] items-end overflow-hidden md:min-h-dvh"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      {/* Background — semua slide ditumpuk, yang aktif opacity 1 (crossfade).
          Gambar non-aktif tetap lazy supaya nggak berebut bandwidth dengan LCP. */}
      <div ref={bgRef} className="absolute inset-0 h-[116%] w-full">
        {SLIDE_IMAGES.map((img, i) => (
          <picture
            key={i}
            className={[
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
              i === active ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            <source srcSet={img.webp} type="image/webp" />
            <img
              src={img.png}
              alt={i === active ? t.hero.imageAlt : ""}
              style={{ objectPosition: img.position }}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
            />
          </picture>
        ))}
      </div>

      <style>{`
        @keyframes heroProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* Overlay gradient — kontras teks konsisten di atas foto apa pun. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 md:from-black/85 md:via-black/45 md:to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-16 sm:pt-24 md:px-8 md:pb-32 md:pt-40">
        <div ref={contentRef}>
          {/* Teks slide ditumpuk di satu sel grid supaya tinggi blok = slide
              terpanjang (layout nggak loncat saat ganti slide). */}
          <div
            className="grid"
            aria-live={autoplay && !paused ? "off" : "polite"}
          >
            {slides.map((slide, i) => {
              const isActive = i === active;
              const Heading = i === 0 ? "h1" : "h2";
              return (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${total}`}
                  aria-hidden={!isActive}
                  className={[
                    "col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-out",
                    isActive
                      ? "translate-y-0 opacity-100 delay-300"
                      : "pointer-events-none translate-y-3 opacity-0",
                  ].join(" ")}
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light [text-shadow:0_1px_4px_rgba(0,0,0,0.6)] md:text-sm">
                    {slide.eyebrow}
                  </p>
                  <Heading className="max-w-3xl font-heading text-[2rem] font-extrabold leading-[1.1] text-cream [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] min-[400px]:text-4xl md:text-6xl">
                    {slide.heading}
                  </Heading>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
                    {slide.paragraph}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={waHref(t.hero.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-cream bg-cream/10 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur-[2px] transition-colors hover:bg-cream hover:text-forest active:bg-cream active:text-forest sm:bg-transparent sm:backdrop-blur-none"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a
              href="#what"
              className="inline-flex items-center justify-center gap-2 py-2 text-sm font-semibold text-cream/90 underline underline-offset-4 transition-colors hover:text-gold-light sm:justify-start sm:py-0"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Kontrol slider — progress bar per slide (klik untuk loncat),
          counter, prev/next, dan tombol pause (WCAG 2.2.2). */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:gap-6 md:px-8 md:pb-10">
          <div className="flex flex-1 items-center gap-2">
            {slides.map((_, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${t.hero.goToSlideAria} ${i + 1}`}
                  aria-current={isActive}
                  className="group relative h-6 flex-1 md:max-w-[120px]"
                >
                  <span className="absolute inset-x-0 top-1/2 block h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-cream/25 transition-[height] duration-200 group-hover:h-[5px]">
                    <span
                      key={isActive ? `run-${active}` : `idle-${i}`}
                      className="block h-full origin-left rounded-full bg-gold"
                      style={
                        isActive && autoplay
                          ? {
                              animation: `heroProgress ${SLIDE_DURATION}ms linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }
                          : {
                              transform: `scaleX(${isActive || isDone ? 1 : 0})`,
                            }
                      }
                      onAnimationEnd={isActive && autoplay ? next : undefined}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 text-cream">
            <button
              type="button"
              onClick={prev}
              aria-label={t.hero.prevAria}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] transition-colors hover:bg-cream/15 active:bg-cream/20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? t.hero.playAria : t.hero.pauseAria}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] transition-colors hover:bg-cream/15 active:bg-cream/20"
            >
              {userPaused || reducedMotion ? (
                <Play size={18} />
              ) : (
                <Pause size={18} />
              )}
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t.hero.nextAria}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] transition-colors hover:bg-cream/15 active:bg-cream/20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
