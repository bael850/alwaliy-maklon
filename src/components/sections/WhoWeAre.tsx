import { useEffect, useRef } from "react";
import { Building2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAvailableImages } from "../../lib/useAvailableImages";

gsap.registerPlugin(ScrollTrigger);

const FOUNDED_YEAR = 2014;
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
  // Foto gedung baru tampil kalau file-nya sudah ada di public/images/about.
  // Kalau belum, kolom foto dihilangkan dan teks memakai lebar penuh.
  const { ready, has } = useAvailableImages(["/images/about/gedung"]);
  const showPhoto = ready && has[0];
  const textCol = showPhoto || !ready ? "md:col-span-7" : "md:col-span-12";

  return (
    <section id="who" className="bg-cream py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
          {/* Narasi */}
          <Reveal className={textCol}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              {t.whoWeAre.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-[1.1] text-forest md:text-5xl">
              {t.whoWeAre.heading}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
              {t.whoWeAre.paragraphBefore}
              <strong className="text-forest">
                {t.whoWeAre.paragraphStrong}
              </strong>
              {t.whoWeAre.paragraphAfter}
            </p>
            <a
              href="#workflow"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-gold"
            >
              <span className="underline underline-offset-4">
                {t.whoWeAre.linkText}
              </span>
            </a>
          </Reveal>

          {/* Foto — bingkai emas bergeser di belakang.
              PLACEHOLDER: taruh file di public/images/about/gedung.(webp|jpg|png) */}
          {showPhoto && (
            <Reveal
              delay={0.1}
              className="order-first md:order-none md:col-span-5"
            >
              <div className="relative mr-4 md:mr-0 md:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-full w-full rounded-[4px] border-2 border-gold/60"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-forest/5 md:aspect-[4/5]">
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
            </Reveal>
          )}
        </div>

        {/* Angka kunci */}
        <dl className="mt-14 grid divide-y divide-forest/10 border-t border-forest/15 sm:mt-20 sm:grid-cols-3 sm:gap-8 sm:divide-y-0 sm:pt-10">
          {t.whoWeAre.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex items-center gap-5 py-5 sm:block sm:py-0"
            >
              <dt className="w-[6.5rem] shrink-0 font-heading text-4xl font-extrabold leading-none text-forest sm:w-auto sm:text-5xl md:text-6xl">
                {stat.value === YEARS_TOKEN ? (
                  <CountUp to={years} suffix="+" />
                ) : (
                  stat.value
                )}
              </dt>
              <dd className="max-w-[16rem] text-sm leading-relaxed text-ink/70 sm:mt-3">
                {stat.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
