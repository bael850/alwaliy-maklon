import {
  ArrowUpRight,
  Container,
  Droplets,
  Pill,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";
import { waLink } from "../../lib/contact";

const ICONS: LucideIcon[] = [Container, Pill, Droplets];

export default function ProductTypes() {
  const { t } = useLanguage();
  const { types } = t.productTypes;

  return (
    <section id="products" className="bg-cream py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <span aria-hidden="true" className="rule-grow h-px w-10 bg-gold" />
            {t.productTypes.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-[1.1] text-forest md:text-5xl">
            {t.productTypes.heading}
          </h2>
        </Reveal>

        <ul className="mt-12 md:mt-16">
          {types.map((type, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li
                key={type.title}
                className="last:border-b last:border-forest/15"
              >
                <Reveal delay={i * 0.08}>
                  <a
                    href={waLink(t.productTypes.waMessagePrefix + type.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative grid items-center gap-4 py-8 transition-colors hover:bg-forest md:grid-cols-12 md:gap-8 md:px-6 md:py-10"
                  >
                    <span
                      aria-hidden="true"
                      className="rule-grow absolute inset-x-0 top-0 h-px bg-forest/15"
                    />
                    <span className="font-heading text-sm font-bold tabular-nums text-gold md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-4 md:col-span-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-gold transition-colors group-hover:bg-gold group-hover:text-forest">
                        <Icon size={20} />
                      </span>
                      <h3 className="font-heading text-xl font-extrabold text-forest transition-colors group-hover:text-cream md:text-2xl">
                        {type.title}
                      </h3>
                    </div>
                    <p className="text-[15px] leading-relaxed text-ink/70 transition-colors group-hover:text-cream/80 md:col-span-5 md:text-base">
                      {type.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors group-hover:text-gold-light md:col-span-2 md:justify-end">
                      {t.productTypes.ctaLabel}
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
