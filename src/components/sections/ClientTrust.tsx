import { useEffect, useRef, useState } from "react";
import { Building2, CheckCheck } from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";
import { translations } from "../../i18n/translations";
import { useAvailableImages } from "../../lib/useAvailableImages";

const WA_GREEN = "#3EA872"; // bubble outgoing / aksen centang
const WA_TEAL_DARK = "#0B3D2E"; // header chat, senada forest

function slugifyClientName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Susun isi satu baris marquee: baris kedua diputar setengah list supaya
 *  urutannya beda dari baris pertama, lalu diulang sampai cukup lebar. */
interface Client {
  name: string;
  slug: string;
}

// Nama file logo selalu diambil dari daftar Indonesia (urutan sama dengan
// bahasa lain), jadi logo tetap muncul saat bahasa diganti.
const LOGO_SLUGS = translations.id.clientTrust.clients.map(slugifyClientName);

function buildRow(clients: Client[], offset: boolean): Client[] {
  const n = clients.length;
  const start = offset ? Math.floor(n / 2) : 0;
  const rotated = [...clients.slice(start), ...clients.slice(0, start)];
  const repeat = Math.max(1, Math.ceil(8 / n));
  return Array.from({ length: repeat }, () => rotated).flat();
}

function WhatsAppBubble({ quote, time }: { quote: string; time: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"idle" | "typing" | "sent">("idle");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setStage("sent");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setStage("typing");
        const timer = setTimeout(() => setStage("sent"), 550);
        return () => clearTimeout(timer);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative max-w-[92%]">
      {stage !== "sent" ? (
        <div
          className="inline-flex items-center gap-1 rounded-lg rounded-tl-none bg-cream/95 px-3.5 py-3 shadow-sm transition-opacity duration-200"
          style={{ opacity: stage === "typing" ? 1 : 0 }}
          aria-hidden="true"
        >
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-forest/40" />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-forest/40" />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-forest/40" />
        </div>
      ) : (
        <div className="bubble-pop-in relative rounded-lg rounded-tl-none bg-cream/95 px-3 py-2.5 shadow-sm">
          {/* ekor bubble */}
          <span
            className="absolute -left-[7px] top-0 h-0 w-0 border-b-[8px] border-r-[8px] border-b-transparent"
            style={{ borderRightColor: "rgba(245,240,230,0.95)" }}
            aria-hidden="true"
          />
          <p className="text-[13.5px] leading-relaxed text-forest">{quote}</p>
          <div className="mt-1.5 flex items-center justify-end gap-1">
            <span className="text-[10.5px] text-forest/45">{time}</span>
            <CheckCheck
              size={14}
              strokeWidth={2.25}
              style={{ color: "#34B7F1" }}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientTrust() {
  const { t } = useLanguage();
  const { testimonials } = t.clientTrust;
  const allClients: Client[] = t.clientTrust.clients.map((name, i) => ({
    name,
    slug: LOGO_SLUGS[i] ?? slugifyClientName(name),
  }));
  // Hanya logo yang file-nya sudah ada di public/images/clients yang tampil.
  // Belum ada logo sama sekali = blok logo tidak muncul (testimoni tetap).
  const { ready, has } = useAvailableImages(
    allClients.map((c) => `/images/clients/${c.slug}`),
  );
  const clients = allClients.filter((_, i) => has[i]);
  const showLogos = ready && clients.length > 0;
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Hemat CPU: marquee dijeda selama tidak terlihat di layar.
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle("is-offscreen", !entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [showLogos]);

  return (
    <section id="clients" className="bg-cream py-20 md:py-28">
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
          animation: clientMarquee 36s linear infinite;
          will-change: transform;
        }
        .marquee-track-reverse {
          animation-direction: reverse;
        }
        .marquee-pause:hover .marquee-track,
        .marquee-pause:focus-within .marquee-track,
        .marquee-pause.is-offscreen .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }

        /* Typing indicator — 3 titik naik-turun bergantian, klasik chat app */
        .typing-dot {
          animation: typingBounce 1.1s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-3px); opacity: 1; }
        }

        /* Bubble pesan pop-in — kecil ke pas, bukan cuma muncul rata */
        .bubble-pop-in {
          animation: bubblePopIn 0.28s cubic-bezier(0.33, 1.4, 0.6, 1) both;
        }
        @keyframes bubblePopIn {
          from { opacity: 0; transform: scale(0.85) translateY(4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .typing-dot { animation: none; }
          .bubble-pop-in { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Logo mitra — dua baris marquee berlawanan arah. Logo abu-abu,
            berwarna saat di-hover; kedua baris berhenti saat di-hover. */}
        {showLogos && (
          <>
            <Reveal>
              <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                {t.clientTrust.trustedByLabel}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <div
                ref={marqueeRef}
                className="marquee-pause flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
              >
                {[false, true].map((reverse) => {
                  const items = buildRow(clients, reverse);
                  return (
                    <div
                      key={String(reverse)}
                      className="relative overflow-hidden"
                    >
                      <div
                        className={`marquee-track flex w-max items-center gap-8 ${reverse ? "marquee-track-reverse" : ""}`}
                      >
                        {[...items, ...items].map((client, i) => (
                          <div
                            key={`${client.slug}-${i}`}
                            aria-hidden={i >= items.length || reverse}
                            className="flex h-20 w-48 shrink-0 items-center justify-center gap-2 grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100 md:h-24 md:w-56"
                          >
                            <SmartImage
                              basePath={`/images/clients/${client.slug}`}
                              alt={client.name}
                              className="h-full w-full object-contain"
                              fallback={
                                <>
                                  <Building2
                                    size={22}
                                    strokeWidth={1.75}
                                    className="text-forest/60"
                                  />
                                  <span className="text-sm font-medium text-forest/70">
                                    {client.name}
                                  </span>
                                </>
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </>
        )}

        {/* Testimoni — dibungkus jadi "jendela chat WhatsApp" karena kanal
            komunikasi utama bisnis ini memang WA. Header kontak + bubble
            pesan masuk lengkap dengan nama pengirim, jam, dan centang biru. */}
        <div
          className={showLogos ? "mt-16 border-t border-forest/15 pt-14" : ""}
        >
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                {t.clientTrust.testimonialsEyebrow}
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
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
                    <WhatsAppBubble quote={item.quote} time={item.time} />
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
