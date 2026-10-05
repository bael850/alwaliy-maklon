import { User } from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * PLACEHOLDER — foto tim di public/images/team/member-1.(webp|jpg|png), dst.
 * Urutan 1:1 dengan t.team.members di translations.ts.
 */
const photoBase = (i: number) => `/images/team/member-${i + 1}`;

export default function Team() {
  const { t } = useLanguage();

  return (
    <section id="team" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            {t.team.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-[1.1] text-forest md:text-5xl">
            {t.team.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/80 md:text-lg">
            {t.team.paragraph}
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {t.team.members.map((member, i) => (
            <li key={i}>
              <Reveal delay={(i % 4) * 0.07}>
                <div
                  tabIndex={0}
                  className="group relative aspect-[3/4] overflow-hidden rounded-[4px] bg-forest/5"
                >
                  <SmartImage
                    basePath={photoBase(i)}
                    alt={`${member.name}, ${member.role}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallback={
                      <div className="flex h-full w-full items-center justify-center">
                        <User
                          size={44}
                          strokeWidth={1.5}
                          className="text-forest/30"
                        />
                      </div>
                    }
                  />
                  {/* Nama + peran: selalu terlihat di perangkat sentuh,
                      muncul saat hover/fokus di perangkat dengan kursor. */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 to-transparent p-4 pt-12 text-cream transition-opacity duration-300 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <p className="font-heading text-sm font-bold md:text-base">
                      {member.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gold-light md:text-sm">
                      {member.role}
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
