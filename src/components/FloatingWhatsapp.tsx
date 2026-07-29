import { MessageCircle } from "lucide-react";

const WA_NUMBER = "6281515264972";
const WA_MESSAGE =
  "Assalamualaikum, saya mau tanya terkait layanan makloon Al-Waliy...";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function FloatingWhatsApp() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-forest shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-gold-light md:bottom-6 md:right-6"
    >
      <MessageCircle size={26} strokeWidth={2.25} />
      <span className="sr-only">Chat via WhatsAppp</span>
    </a>
  );
}
