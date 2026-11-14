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
    <section id="products" className="bg-cream py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {t.productTypes.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-[1.08] text-forest sm:text-4xl md:text-6xl">
            {t.productTypes.heading}
          </h2>
        </Reveal>

        {/* Tiga kolom dipisah garis tipis, tanpa kartu. Seluruh kolom bisa
            diklik ke WhatsApp dan menyala hijau saat disentuh/di-hover. */}
        <ul className="mt-12 grid border-t-2 border-forest md:mt-20 md:grid-cols-3 md:divide-x md:divide-forest/15">
          {types.map((type, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li
                key={type.title}
                className="border-b border-forest/15 md:border-b-0"
              >
                <Reveal delay={i * 0.08} className="h-full">
                  <a
                    href={waLink(t.productTypes.waMessagePrefix + type.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col px-1 py-8 transition-colors duration-300 hover:bg-forest active:bg-forest md:min-h-[22rem] md:px-8 md:py-10"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-heading text-sm font-bold tabular-nums text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        size={28}
                        strokeWidth={1.5}
                        className="text-forest transition-colors group-hover:text-gold"
                      />
                    </div>
                    <h3 className="mt-8 font-heading text-2xl font-extrabold leading-tight text-forest transition-colors group-hover:text-cream md:mt-16 md:text-3xl">
                      {type.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink/70 transition-colors group-hover:text-cream/80 md:text-base">
                      {type.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors group-hover:text-gold-light md:mt-auto md:pt-8">
                      {t.productTypes.ctaLabel}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
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
