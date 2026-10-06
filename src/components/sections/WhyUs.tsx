import { useState } from "react";
import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

/** Pilar ke-3 (Experience) jadi yang menyala secara default dan paling besar. */
const EXPERIENCE_INDEX = 2;

export default function WhyUs() {
  const { t } = useLanguage();
  const pillars = t.whyUs.pillars;
  const [active, setActive] = useState(EXPERIENCE_INDEX);

  return (
    <section id="why" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              {t.whyUs.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-5xl">
              {t.whyUs.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
              {t.whyUs.paragraph}
            </p>
          </div>
        </Reveal>

        {/* Tiga kata raksasa: hover / fokus / tap menyalakan satu kata dan
            membuka penjelasannya; kata lain jadi outline. */}
        <ul className="border-b border-forest/15">
          {pillars.map((pillar, i) => {
            const isActive = i === active;
            const isExperience = i === EXPERIENCE_INDEX;
            const panelId = `why-panel-${i}`;

            return (
              <li key={pillar.word}>
                <Reveal delay={i * 0.1}>
                  <div
                    className="grid items-center gap-x-10 border-t border-forest/15 py-6 md:grid-cols-12 md:py-9"
                    onMouseEnter={() => setActive(i)}
                  >
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="flex items-baseline gap-4 text-left md:col-span-7 md:gap-6"
                    >
                      <span
                        className={[
                          "font-heading font-extrabold leading-[0.95] tracking-tight transition-colors duration-500",
                          "text-[clamp(2.75rem,12vw,4.5rem)] md:text-7xl lg:text-8xl",
                          isExperience
                            ? "text-[clamp(2.5rem,12vw,4.5rem)] lg:text-[6.5rem]"
                            : "",
                          isActive
                            ? "text-forest [-webkit-text-stroke:1.5px_transparent]"
                            : "text-transparent [-webkit-text-stroke:1.5px_rgba(27,67,50,0.35)]",
                        ].join(" ")}
                      >
                        {pillar.word}
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-label={pillar.word}
                      className={[
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-out md:col-span-5",
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "min-h-0 overflow-hidden",
                          isActive ? "visible" : "invisible",
                        ].join(" ")}
                      >
                        <p className="pt-3 text-base leading-relaxed text-ink/80 md:pt-0 md:text-lg">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
