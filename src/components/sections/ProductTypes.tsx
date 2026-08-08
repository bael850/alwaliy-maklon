import { type CSSProperties } from "react";
import {
  Pill,
  FlaskConical,
  Droplets,
  Container,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const WA_NUMBER = "6285713896599";

interface ProductTypeText {
  title: string;
  desc: string;
}

const PRODUCT_ICONS: LucideIcon[] = [Container, Pill, FlaskConical, Droplets];

// Tiap label digantung dengan sudit sedikit beda-beda — kayak label kertas
// asli yang digantung tangan di rak apotek/jamu, bukan hasil cetak simetris.
const TAG_ROTATIONS = [-3, 2, -2, 4];

function ProductTag({
  type,
  icon: Icon,
  index,
  numberPrefix,
  ctaLabel,
  waHref,
}: {
  type: ProductTypeText;
  icon: LucideIcon;
  index: number;
  numberPrefix: string;
  ctaLabel: string;
  waHref: string;
}) {
  const rot = TAG_ROTATIONS[index % TAG_ROTATIONS.length];

  return (
    <div className="group flex flex-col items-center">
      {/* Benang gantungan — nyambung dari rail ke lubang label */}
      <div aria-hidden="true" className="h-9 w-px bg-forest/25" />

      <div
        style={{ "--rot": `${rot}deg` } as CSSProperties}
        className="tag-card relative w-[13.5rem] origin-top rotate-[var(--rot)] rounded-[4px] border border-forest/12 bg-white p-5 shadow-[0_8px_20px_rgba(27,67,50,0.09)] group-hover:shadow-[0_12px_28px_rgba(27,67,50,0.14)]"
      >
        {/* Lubang label — bulatan kecil kayak lubang gantungan tag asli */}
        <div
          aria-hidden="true"
          className="absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-forest/20 bg-cream"
        />

        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
          {numberPrefix} {String(index + 1).padStart(2, "0")}
        </p>

        <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-forest/5 text-forest">
          <Icon size={18} strokeWidth={2} />
        </div>

        <h3 className="mt-3 font-heading text-base font-bold text-forest">
          {type.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-ink/70">{type.desc}</p>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-xs font-semibold text-forest underline underline-offset-4 hover:text-gold"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

export default function ProductTypes() {
  const { t } = useLanguage();

  return (
    <section id="layanan" className="overflow-hidden bg-cream py-20 md:py-28">
      {/* Animasi "berayun" pas hover — sudut awal (--rot) tetap jadi titik
          istirahat, cuma dikasih goyangan singkat lalu balik lagi. Dihormati
          prefers-reduced-motion biar gak maksa gerak buat yang sensitif. */}
      <style>{`
        .tag-card {
          transition: transform 0.35s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.3s ease;
          will-change: transform;
        }
        @keyframes tagSway {
          0%   { transform: rotate(var(--rot)); }
          25%  { transform: rotate(calc(var(--rot) + 5deg)); }
          55%  { transform: rotate(calc(var(--rot) - 3deg)); }
          80%  { transform: rotate(calc(var(--rot) + 1.5deg)); }
          100% { transform: rotate(var(--rot)); }
        }
        .group:hover .tag-card {
          animation: tagSway 0.7s cubic-bezier(0.33, 1, 0.68, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .tag-card { transition: box-shadow 0.3s ease; }
          .group:hover .tag-card { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            {t.productTypes.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
            {t.productTypes.heading}
          </h2>
        </div>

        {/* Rail gantungan — tempat semua label "digantung", cuma keliatan
            desktop biar mobile tetap bersih & tumpuk vertikal wajar. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 hidden h-px bg-forest/15 md:block"
          />
          <div className="relative flex flex-wrap items-start justify-center gap-x-6 gap-y-9 md:gap-x-10 md:gap-y-14">
            {t.productTypes.types.map((type, i) => (
              <ProductTag
                key={type.title}
                type={type}
                icon={PRODUCT_ICONS[i % PRODUCT_ICONS.length]}
                index={i}
                numberPrefix={t.productTypes.numberPrefix}
                ctaLabel={t.productTypes.ctaLabel}
                waHref={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  t.productTypes.waMessagePrefix + type.title,
                )}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
