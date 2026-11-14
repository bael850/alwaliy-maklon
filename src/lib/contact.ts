/**
 * Satu-satunya tempat nomor WA & helper link WhatsApp.
 * Semua komponen (Navbar, Hero, Cta, Footer, ProductTypes, FloatingWhatsApp)
 * nanti import dari sini, jangan tulis ulang nomornya.
 */
export const WA_NUMBER = "6282110689827";
export const WA_DISPLAY = "+62 821-1068-9827";

export function waLink(message?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
