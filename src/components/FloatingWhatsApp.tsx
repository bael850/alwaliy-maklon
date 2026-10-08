import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const WA_NUMBER = "6282110689827";

/**
 * Di HP tombol ini disembunyikan selama hero (sudah punya CTA sendiri, dan
 * tombolnya menimpa kontrol slider) dan selama section kontak terlihat
 * (CTA-nya sudah ada di situ). Di desktop selalu tampil seperti biasa.
 */
export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.floatingWhatsApp.waMessage)}`;

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");
    const state = { hero: true, contact: false };
    const apply = () => setShow(!state.hero && !state.contact);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) state.hero = e.intersectionRatio > 0.35;
          if (e.target === contact) state.contact = e.intersectionRatio > 0.25;
        }
        apply();
      },
      { threshold: [0, 0.25, 0.35, 0.5, 1] },
    );
    if (hero) io.observe(hero);
    else state.hero = false;
    if (contact) io.observe(contact);
    apply();
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatingWhatsApp.ariaLabel}
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        right: "max(1.25rem, env(safe-area-inset-right))",
      }}
      className={[
        "fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-forest shadow-lg shadow-black/20 transition-[transform,opacity] duration-300 hover:scale-105 hover:bg-gold-light md:!bottom-6 md:!right-6",
        show
          ? "translate-y-0 opacity-100"
          : "max-md:pointer-events-none max-md:translate-y-4 max-md:opacity-0",
      ].join(" ")}
    >
      <MessageCircle size={26} strokeWidth={2.25} />
      <span className="sr-only">{t.floatingWhatsApp.ariaLabel}</span>
    </a>
  );
}
