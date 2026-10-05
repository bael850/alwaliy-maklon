import { useState, type CSSProperties } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  Factory,
  Scale,
  FileText,
  Maximize2,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import Lightbox, { type LightboxItem } from "../Lightbox";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAvailableImages } from "../../lib/useAvailableImages";

interface CertMeta {
  id: string;
  icon: LucideIcon;
  /**
   * PLACEHOLDER — path TANPA ekstensi ke public/images/certifications/<nama>.
   * Taruh file di public/images/certifications/<nama>.webp (atau .jpg / .png,
   * bebas salah satu) — otomatis kedeteksi, gak perlu ubah kode ini.
   */
  imageBase: string;
}

// URUTAN HARUS 1:1 dengan t.certifications.certs di translations.ts.
const CERT_META: CertMeta[] = [
  {
    id: "halal-mui",
    icon: BadgeCheck,
    imageBase: "/images/certifications/halal-mui",
  },
  { id: "bpom", icon: ShieldCheck, imageBase: "/images/certifications/bpom" },
  { id: "cpotb", icon: Factory, imageBase: "/images/certifications/cpotb" },
  {
    id: "legalitas",
    icon: Scale,
    imageBase: "/images/certifications/legalitas",
  },
];

/**
 * Hanya sertifikat yang dokumennya sudah ada di public/images/certifications
 * yang tampil. Belum ada dokumen sama sekali = section tidak muncul.
 * Dokumen ditambah = otomatis muncul, tanpa ubah kode.
 */
export default function Certifications() {
  const { ready, has } = useAvailableImages(CERT_META.map((m) => m.imageBase));
  const metas = CERT_META.filter((_, i) => has[i]);
  // Index asli ke t.certifications.certs (urutan 1:1 dengan CERT_META)
  const textIdx = CERT_META.map((_, i) => i).filter((i) => has[i]);

  if (!ready || metas.length === 0) return null;
  return <CertificationsStage metas={metas} textIdx={textIdx} />;
}

function CertificationsStage({
  metas,
  textIdx,
}: {
  metas: CertMeta[];
  textIdx: number[];
}) {
  const { t } = useLanguage();
  const certs = textIdx.map((i) => t.certifications.certs[i]);
  const total = certs.length;

  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const current = certs[active];
  const CurrentIcon = metas[active].icon;

  const lightboxItems: LightboxItem[] = certs.map((cert, i) => ({
    id: metas[i].id,
    imageBase: metas[i].imageBase,
    title: cert.title,
    description: cert.desc,
    fit: "contain",
    fallback: <FileText size={56} strokeWidth={1.5} />,
  }));

  return (
    <section
      id="certifications"
      className="overflow-hidden bg-forest py-20 md:py-28"
    >
      <style>{`
        .cert-card {
          transform-origin: 0% 100%;
          transform:
            translateX(calc(var(--pos) * var(--dx)))
            translateY(calc(var(--pos) * var(--dy)))
            rotate(calc(var(--pos) * var(--rot)))
            scale(calc(1 - var(--pos) * 0.04));
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, filter 0.5s ease;
        }
        .cert-swap { animation: certSwap 0.5s ease-out; }
        @keyframes certSwap { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .cert-card { transition: none; }
          .cert-swap { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-10">
          {/* Kiri: judul + detail sertifikat aktif + pemilih */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
                {t.certifications.eyebrow}
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
                {t.certifications.heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/70 md:text-base">
                {t.certifications.paragraph}
              </p>
            </Reveal>

            {/* Detail — key=active supaya animasi masuk ulang tiap ganti */}
            <div
              key={metas[active].id}
              className="cert-swap mt-8 rounded-[4px] border border-cream/15 bg-cream/5 p-5 md:p-6"
              aria-live="polite"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-forest">
                  <CurrentIcon size={22} strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold leading-tight text-cream">
                    {current.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-gold-light/90">
                    {current.issuer}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-cream/75">
                {current.desc}
              </p>
              <p className="mt-4 border-t border-cream/10 pt-3 text-xs leading-relaxed text-cream/50">
                {current.note}
              </p>
              <button
                type="button"
                onClick={() => setLightboxIndex(active)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
              >
                <Maximize2 size={15} />
                {t.certifications.viewDocument}
              </button>
            </div>

            {/* Pemilih (juga jalur keyboard/aksesibilitas ke tiap kartu) */}
            <div className="mt-5 flex flex-wrap gap-2">
              {certs.map((cert, i) => (
                <button
                  key={metas[i].id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={[
                    "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    i === active
                      ? "border-gold bg-gold text-forest"
                      : "border-cream/25 text-cream/70 hover:border-gold hover:text-gold",
                  ].join(" ")}
                >
                  {cert.title}
                </button>
              ))}
            </div>
          </div>

          {/* Kanan: tumpukan kartu — melebar saat hover, klik kartu belakang
              = bawa ke depan, klik kartu depan = buka dokumen. */}
          <Reveal delay={0.1} className="md:col-span-7">
            <div
              className="group relative mx-auto w-[calc(var(--cw)_+_110px)] max-w-full [--cw:min(62vw,250px)] md:ml-auto md:mr-0 md:w-[calc(var(--cw)_+_190px)] md:[--cw:290px]"
              style={{ height: "calc(var(--cw) * 1.333 + 56px)" }}
            >
              {certs.map((cert, i) => {
                const pos = (i - active + total) % total;
                const isFront = pos === 0;
                const Icon = metas[i].icon;

                return (
                  <button
                    key={metas[i].id}
                    type="button"
                    onClick={() =>
                      isFront ? setLightboxIndex(i) : setActive(i)
                    }
                    aria-label={`${
                      isFront
                        ? t.certifications.viewDocument
                        : t.certifications.viewDetailAriaPrefix
                    } ${cert.title}`}
                    className="cert-card absolute left-0 top-8 block aspect-[3/4] w-[var(--cw)] overflow-hidden rounded-[6px] border-2 border-gold/80 bg-cream text-left shadow-2xl shadow-black/50 [--dx:26px] [--dy:-9px] [--rot:2.5deg] group-hover:[--dx:52px] group-hover:[--dy:-14px] group-hover:[--rot:4deg]"
                    style={
                      {
                        "--pos": pos,
                        zIndex: total - pos,
                        opacity: 1 - pos * 0.12,
                        filter: `brightness(${1 - pos * 0.12})`,
                      } as CSSProperties
                    }
                  >
                    <div className="flex h-full flex-col p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-gold">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                      </div>

                      <div className="my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[4px] border border-forest/10 bg-white">
                        <SmartImage
                          basePath={metas[i].imageBase}
                          alt=""
                          className="h-full w-full object-contain p-2"
                          fallback={
                            <FileText
                              size={44}
                              strokeWidth={1.25}
                              className="text-forest/25"
                            />
                          }
                        />
                      </div>

                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                        {cert.ringText}
                      </p>
                      <p className="mt-1 font-heading text-base font-extrabold leading-tight text-forest">
                        {cert.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        labels={{
          close: t.certifications.closeAria,
          prev: t.certifications.prevAria,
          next: t.certifications.nextAria,
        }}
      />
    </section>
  );
}
