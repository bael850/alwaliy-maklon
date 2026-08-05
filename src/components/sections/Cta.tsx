import { MapPin, MessageCircle, Globe, FileDown, Scissors } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const WA_NUMBER = "6281515264972";

/**
 * PLACEHOLDER — arahkan href ke file PDF asli begitu company profile jadi.
 * Taruh file di folder `public/` (mis. public/company-profile.pdf) supaya
 * bisa diakses langsung lewat "/company-profile.pdf" tanpa perlu import.
 */
const COMPANY_PROFILE_HREF = "/company-profile.pdf";

export default function Cta() {
  const { t } = useLanguage();
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    t.cta.waMessage,
  )}`;

  return (
    <section className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              {t.cta.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
              {t.cta.heading}
            </h2>
            <p className="mt-4 max-w-md text-cream/80">{t.cta.paragraph}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] bg-gold px-7 py-3.5 text-sm font-semibold text-forest transition-colors hover:bg-gold-light"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                {t.cta.waButtonLabel}
              </a>
              <a
                href={COMPANY_PROFILE_HREF}
                download
                className="inline-flex items-center gap-2 rounded-[4px] border-[1.5px] border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/5"
              >
                <FileDown size={18} strokeWidth={2.25} />
                {t.cta.downloadButtonLabel}
              </a>
            </div>
          </div>

          {/* Kartu kontak bergaya "kupon" — garis gunting putus-putus di
              atas seolah bisa dipotong & disimpan, sesuai fungsi panel ini
              (info kontak yang mau diinget/disimpan pengunjung). Beda dari
              motif nota/kwitansi yang sudah dipakai di MaklonComparison. */}
          <div className="rounded-[4px] border border-cream/15 bg-forest-light/30 p-6 md:p-8">
            <div className="mb-5 flex items-center gap-2 border-b border-dashed border-cream/25 pb-4 text-cream/45">
              <Scissors size={13} strokeWidth={2} className="shrink-0" />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em]">
                {t.cta.keepContactLabel}
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-gold"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                    {t.cta.lokasiLabel}
                  </p>
                  <p className="text-cream">{t.cta.lokasiValue}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle
                  size={20}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-gold"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                    {t.cta.whatsappLabel}
                  </p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream hover:text-gold-light"
                  >
                    +62 815-1526-4972
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe
                  size={20}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-gold"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                    {t.cta.websiteLabel}
                  </p>
                  <a
                    href="https://alwaliy-sejahtera.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream hover:text-gold-light"
                  >
                    alwaliy-sejahtera.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
