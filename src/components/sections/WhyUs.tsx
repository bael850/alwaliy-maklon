import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export default function WhyUs() {
  const { t } = useLanguage();
  const pillars = t.whyUs.pillars;

  return (
    <section id="why" className="bg-cream py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          {/* Judul — menempel di sisi kiri saat daftar di kanan di-scroll (desktop) */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Reveal>
                <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                  <span aria-hidden="true" className="h-px w-10 bg-gold" />
                  {t.whyUs.eyebrow}
                </p>
                <h2 className="font-heading text-3xl font-extrabold leading-[1.08] text-forest sm:text-4xl md:text-5xl">
                  {t.whyUs.heading}
                </h2>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/70">
                  {t.whyUs.paragraph}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Tiga pilar — semua penjelasan selalu terbaca, tanpa hover/tap */}
          <ol className="border-t border-forest/20 md:col-span-7">
            {pillars.map((pillar, i) => (
              <li key={pillar.word} className="border-b border-forest/15">
                <Reveal delay={i * 0.08}>
                  <div className="group grid grid-cols-[2.5rem_1fr] gap-x-4 py-8 sm:grid-cols-[4rem_1fr] md:py-12">
                    <span className="pt-2 font-heading text-sm font-bold tabular-nums text-gold md:pt-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-4xl font-extrabold leading-none tracking-tight text-forest transition-transform duration-500 group-hover:translate-x-1.5 sm:text-5xl md:text-6xl">
                        {pillar.word}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-5 block h-[2px] w-10 bg-gold transition-[width] duration-500 group-hover:w-24"
                      />
                      <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/75 md:text-lg">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
