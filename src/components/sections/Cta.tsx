import { MapPin, MessageCircle, Globe, FileDown } from "lucide-react";
import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";
import { waLink, WA_DISPLAY } from "../../lib/contact";
import { isOn } from "../../lib/content-status";

const COMPANY_PROFILE_HREF = "/company-profile.pdf";

export default function Cta() {
  const { t } = useLanguage();
  const waHref = waLink(t.cta.waMessage);

  const contacts = [
    {
      Icon: MapPin,
      label: t.cta.lokasiLabel,
      node: <span className="text-cream">{t.cta.lokasiValue}</span>,
    },
    {
      Icon: MessageCircle,
      label: t.cta.whatsappLabel,
      node: (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cream transition-colors hover:text-gold-light"
        >
          {WA_DISPLAY}
        </a>
      ),
    },
    {
      Icon: Globe,
      label: t.cta.websiteLabel,
      node: (
        <a
          href="https://alwaliy-sejahtera.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cream transition-colors hover:text-gold-light"
        >
          alwaliy-sejahtera.com
        </a>
      ),
    },
  ];

  return (
    <section id="contact" className="bg-forest py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-7">
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              {t.cta.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-[1.08] text-cream sm:text-4xl md:text-6xl">
              {t.cta.heading}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80 md:text-lg">
              {t.cta.paragraph}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-gold px-7 py-4 text-sm font-semibold text-forest transition-colors hover:bg-gold-light"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                {t.cta.waButtonLabel}
              </a>
              {isOn("companyProfile") && (
                <a
                  href={COMPANY_PROFILE_HREF}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-cream/30 px-7 py-4 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/5"
                >
                  <FileDown size={18} strokeWidth={2.25} />
                  {t.cta.downloadButtonLabel}
                </a>
              )}
            </div>
          </Reveal>

          {/* Info kontak: daftar bergaris, tanpa kartu */}
          <Reveal delay={0.1} className="md:col-span-5 md:pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/55">
              {t.cta.keepContactLabel}
            </p>
            <dl className="mt-4 border-t-2 border-gold">
              {contacts.map(({ Icon, label, node }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 border-b border-cream/15 py-5"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-gold"
                  />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                      {label}
                    </dt>
                    <dd className="mt-1">{node}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
