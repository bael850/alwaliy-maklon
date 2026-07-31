import { BadgeCheck, ShieldCheck, Factory, Clock } from "lucide-react";
import Reveal from "../Reveal";

const BADGES = [
  { icon: BadgeCheck, label: "Halal MUI" },
  { icon: ShieldCheck, label: "Terdaftar BPOM" },
  { icon: Factory, label: "Standar CPOTB" },
  { icon: Clock, label: "Berpengalaman Sejak 2014" },
];

const ARABIC_QUOTE =
  "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يُعْجِبُهُ الْحَلْوَاءُ وَالْعَسَلُ";

export default function TrustBadgeStrip() {
  return (
    <div className="border-y border-forest/10 bg-forest py-8">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p
            dir="rtl"
            className="text-center font-heading text-base text-gold-light md:text-lg"
          >
            {ARABIC_QUOTE}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BADGES.map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-cream/90"
              >
                <badge.icon size={16} strokeWidth={2.5} className="text-gold" />
                {badge.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
