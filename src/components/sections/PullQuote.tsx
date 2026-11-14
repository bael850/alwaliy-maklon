import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export default function PullQuote() {
  const { t } = useLanguage();

  return (
    <section className="overflow-hidden bg-forest py-20 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <figure className="relative md:pl-24">
            <span
              aria-hidden="true"
              className="absolute -top-6 left-0 select-none font-heading text-[7rem] font-extrabold leading-none text-gold md:-top-8 md:text-[10rem]"
            >
              &ldquo;
            </span>
            <blockquote className="relative pt-14 font-heading text-3xl font-extrabold leading-[1.15] text-cream sm:text-4xl md:pt-0 md:text-6xl">
              {t.pullQuote.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              <span aria-hidden="true" className="h-px w-12 bg-gold" />
              {t.pullQuote.attribution}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
