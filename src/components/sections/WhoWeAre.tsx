import { useEffect, useRef } from "react";
import { ArrowRight, Building2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAvailableImages } from "../../lib/useAvailableImages";

gsap.registerPlugin(ScrollTrigger);

const FOUNDED_YEAR = 2011;
/** Penanda di translations: nilai ini diganti angka tahun berjalan (count-up). */
const YEARS_TOKEN = "{years}";

/** Angka yang menghitung naik dari 0 sekali saat masuk viewport. */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = (v: number) => {
      el.textContent = `${Math.round(v)}${suffix}`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(to);
      return;
    }
    const state = { v: 0 };
    render(0);
    const ctx = gsap.context(() => {
      gsap.to(state, {
        v: to,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => render(state.v),
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    return () => ctx.revert();
  }, [to, suffix]);

  return <span ref={ref} aria-label={`${to}${suffix}`} />;
}

export default function WhoWeAre() {
  const { t } = useLanguage();
  const years = new Date().getFullYear() - FOUNDED_YEAR;
  // Foto gedung tampil sebagai banner di bawah kalau file-nya ada di
  // public/images/about/gedung.(webp|avif|jpg|png). Karena letaknya paling
  // bawah, konten di atasnya tidak bergeser saat pengecekan foto selesai.
  const { ready, has } = useAvailableImages(["/images/about/gedung"]);
  const showPhoto = ready && has[0];

  return (
    <section id="who" className="bg-cream py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Judul besar selebar kolom */}
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {t.whoWeAre.eyebrow}
          </p>
          <h2 className="max-w-4xl font-heading text-3xl font-extrabold leading-[1.08] text-forest sm:text-4xl md:text-6xl">
            {t.whoWeAre.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          {/* Narasi */}
          <Reveal className="md:col-span-5">
            <p className="text-base leading-relaxed text-ink/80 md:text-lg">
              {t.whoWeAre.paragraphBefore}
              <strong className="text-forest">
                {t.whoWeAre.paragraphStrong}
              </strong>
              {t.whoWeAre.paragraphAfter}
            </p>
            <a
              href="#workflow"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-forest transition-colors hover:text-gold"
            >
              <span className="underline underline-offset-4">
                {t.whoWeAre.linkText}
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>

          {/* Angka kunci — daftar baris bergaris tipis, angka besar di kiri */}
          <dl className="border-t border-forest/20 md:col-span-7">
            {t.whoWeAre.stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                className="grid grid-cols-[6.5rem_1fr] items-center gap-5 border-b border-forest/15 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-8"
              >
                <dt className="font-heading text-4xl font-extrabold leading-none text-forest sm:text-5xl md:text-6xl">
                  {stat.value === YEARS_TOKEN ? (
                    <CountUp to={years} suffix="+" />
                  ) : (
                    stat.value
                  )}
                </dt>
                <dd className="max-w-sm text-sm leading-relaxed text-ink/70 md:text-base">
                  {stat.label}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Foto — bingkai emas bergeser di belakang. Hanya tampil kalau ada. */}
        {showPhoto && (
          <Reveal className="mt-14 md:mt-24">
            <div className="relative mr-3 md:mr-4">
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full rounded-[4px] border-2 border-gold/60 md:-bottom-4 md:-right-4"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-forest/5 md:aspect-[21/9]">
                <SmartImage
                  basePath="/images/about/gedung"
                  alt={t.whoWeAre.photoLabel}
                  className="h-full w-full object-cover"
                  fallback={
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
                      <Building2
                        size={40}
                        strokeWidth={1.5}
                        className="text-forest/30"
                      />
                      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-forest/40">
                        {t.whoWeAre.photoLabel}
                      </span>
                    </div>
                  }
                />
              </div>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-forest/50">
              {t.whoWeAre.photoLabel}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
