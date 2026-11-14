import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export default function VisionMission() {
  const { t } = useLanguage();
  const { missions } = t.visionMission;

  return (
    <section id="vision" className="bg-cream py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[4px] bg-forest px-6 py-12 md:px-14 md:py-20">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 right-6 select-none font-heading text-[12rem] font-extrabold leading-none text-gold/10 md:text-[18rem]"
            >
              &ldquo;
            </span>
            <p className="relative text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              {t.visionMission.visionLabel}
            </p>
            <h2 className="relative mt-5 max-w-4xl font-heading text-2xl font-extrabold leading-[1.25] text-cream md:text-4xl">
              {t.visionMission.vision}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-14 text-xs font-semibold uppercase tracking-[0.14em] text-forest/60">
            {t.visionMission.missionLabel}
          </p>
        </Reveal>

        <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {missions.map((m, i) => (
            <li key={m.title}>
              <Reveal delay={(i % 2) * 0.08}>
                <div className="flex gap-5 border-t border-forest/15 pt-6">
                  <span className="font-heading text-3xl font-extrabold leading-none text-gold md:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-forest md:text-xl">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/70 md:text-base">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
