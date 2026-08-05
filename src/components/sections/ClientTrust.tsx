import { Building2, CheckCheck } from "lucide-react";
import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

// Warna dipetik dari palet WA asli tapi diredam dikit biar tetap nyatu
// dengan tema forest/gold/cream di seluruh situs, bukan norak hijau terang.
const WA_GREEN = "#3EA872"; // bubble outgoing / aksen centang
const WA_TEAL_DARK = "#0B3D2E"; // header chat, senada forest

export default function ClientTrust() {
  const { t } = useLanguage();
  const { clients, testimonials } = t.clientTrust;

  return (
    <section className="bg-forest py-20 md:py-28">
      {/* Marquee logo klien — dobel list-nya biar loop-nya mulus (translateX
          -50% pas nyampe titik di mana set kedua persis nyambung sama set
          pertama, jadi gak kerasa "loncat"). Pause pas di-hover biar user
          yang penasaran bisa berhenti baca satu nama tanpa keburu geser. */}
      <style>{`
        @keyframes clientMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: clientMarquee 32s linear infinite;
          will-change: transform;
        }
        .marquee-pause:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Logo strip */}
        <Reveal>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
            {t.clientTrust.trustedByLabel}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="marquee-pause relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track flex w-max items-center gap-6">
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={`${client}-${i}`}
                  aria-hidden={i >= clients.length}
                  className="flex h-16 w-40 shrink-0 items-center justify-center gap-2 rounded-[4px] border border-cream/15 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                >
                  {/* Placeholder ikon — ganti dengan <img src={client.logo} alt={client.name}
                      className="h-full w-full object-contain p-3" /> begitu logo asli siap */}
                  <Building2
                    size={18}
                    strokeWidth={1.75}
                    className="text-cream/60"
                  />
                  <span className="text-xs font-medium text-cream/60">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Testimoni — dibungkus jadi "jendela chat WhatsApp" karena kanal
            komunikasi utama bisnis ini memang WA. Header kontak + bubble
            pesan masuk lengkap dengan nama pengirim, jam, dan centang biru. */}
        <div className="mt-16 border-t border-cream/10 pt-14">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
                {t.clientTrust.testimonialsEyebrow}
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
                {t.clientTrust.testimonialsHeading}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal key={item.name + i} delay={i * 0.1}>
                <div
                  className="flex h-full flex-col overflow-hidden rounded-[10px] border border-cream/15 shadow-lg"
                  role="group"
                  aria-label={`${t.clientTrust.ariaGroupPrefix}${item.name}`}
                >
                  {/* Header ala kontak WhatsApp */}
                  <div
                    className="flex items-center gap-2.5 px-4 py-3"
                    style={{ backgroundColor: WA_TEAL_DARK }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-cream"
                      style={{ backgroundColor: WA_GREEN }}
                      aria-hidden="true"
                    >
                      {item.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-cream">
                        {item.name}
                      </p>
                      <p className="truncate text-[11px] text-cream/55">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Area chat — background bertekstur titik halus meniru
                      wallpaper WA, tanpa perlu file gambar eksternal. */}
                  <div
                    className="flex-1 px-3 py-5"
                    style={{
                      backgroundColor: "#0E241C",
                      backgroundImage:
                        "radial-gradient(rgba(245,240,230,0.05) 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  >
                    <div className="relative max-w-[92%] rounded-lg rounded-tl-none bg-cream/95 px-3 py-2.5 shadow-sm">
                      {/* ekor bubble */}
                      <span
                        className="absolute -left-[7px] top-0 h-0 w-0 border-b-[8px] border-r-[8px] border-b-transparent"
                        style={{ borderRightColor: "rgba(245,240,230,0.95)" }}
                        aria-hidden="true"
                      />
                      <p className="text-[13.5px] leading-relaxed text-forest">
                        {item.quote}
                      </p>
                      <div className="mt-1.5 flex items-center justify-end gap-1">
                        <span className="text-[10.5px] text-forest/45">
                          {item.time}
                        </span>
                        <CheckCheck
                          size={14}
                          strokeWidth={2.25}
                          style={{ color: "#34B7F1" }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
