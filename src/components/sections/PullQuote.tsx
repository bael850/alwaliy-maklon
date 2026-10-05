import { useLanguage } from "../../i18n/LanguageContext";

export default function PullQuote() {
  const { t } = useLanguage();

  return (
    <section className="overflow-hidden bg-forest py-20 md:py-28">
      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <p className="relative font-heading text-2xl italic leading-snug text-cream md:text-3xl">
          "{t.pullQuote.quote}"
        </p>

        <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-gold">
          {t.pullQuote.attribution}
        </p>
      </div>
    </section>
  );
}
