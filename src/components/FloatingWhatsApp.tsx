import { MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const WA_NUMBER = "6281515264972";

export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.floatingWhatsApp.waMessage)}`;

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatingWhatsApp.ariaLabel}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-forest shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-gold-light md:bottom-6 md:right-6"
    >
      <MessageCircle size={26} strokeWidth={2.25} />
      <span className="sr-only">{t.floatingWhatsApp.ariaLabel}</span>
    </a>
  );
}
