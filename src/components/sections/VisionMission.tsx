import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export default function VisionMission() {
  const { t } = useLanguage();
  const { missions } = t.visionMission;

  return (
    <section id="vision" className="bg-forest py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Visi — satu kalimat besar selebar kolom */}
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {t.visionMission.visionLabel}
          </p>
          <h2 className="max-w-5xl font-heading text-[1.65rem] font-extrabold leading-[1.2] text-cream sm:text-3xl md:text-5xl md:leading-[1.15]">
            {t.visionMission.vision}
          </h2>
        </Reveal>

        {/* Misi — empat kolom sejajar di desktop, garis emas di atas tiap item */}
        <Reveal delay={0.1}>
          <p className="mt-16 text-xs font-semibold uppercase tracking-[0.14em] text-cream/60 md:mt-28">
            {t.visionMission.missionLabel}
          </p>
        </Reveal>

        <ol className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {missions.map((m, i) => (
            <li key={m.title}>
              <Reveal delay={i * 0.08}>
                <div className="border-t-2 border-gold pt-5">
                  <span className="font-heading text-sm font-bold tabular-nums text-gold-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-cream md:text-xl">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-cream/75">
                    {m.desc}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
