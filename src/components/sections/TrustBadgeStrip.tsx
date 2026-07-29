const BADGES = [
  "Halal MUI",
  "Terdaftar BPOM",
  "Standar CPOTB",
  "Berpengalaman Sejak 2014",
];

const ARABIC_QUOTE =
  "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يُعْجِبُهُ الْحَلْوَاءُ وَالْعَسَلُ";

// Diulang 2x biar animasi marquee-nya seamless loop
const ITEMS = [...BADGES, ARABIC_QUOTE, ...BADGES, ARABIC_QUOTE];

export default function TrustBadgeStrip() {
  return (
    <div className="overflow-hidden border-y border-forest/10 bg-forest py-4">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className={
              item === ARABIC_QUOTE
                ? "font-heading text-base text-gold-light"
                : "text-sm font-semibold uppercase tracking-[0.1em] text-cream/90"
            }
            dir={item === ARABIC_QUOTE ? "rtl" : undefined}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
