export default function Cta() {
  return (
    <section id="cta" className="border-t border-forest-600/60 px-6 py-20">
      <div className="mx-auto max-w-4xl rounded-3xl bg-honey px-8 py-14 text-center">
        <h2 className="font-display text-3xl font-semibold text-forest md:text-4xl">
          Siap wujudkan produk herbal Anda sendiri?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-forest/80">
          Konsultasikan ide produk Anda secara gratis. Tim kami siap membantu
          dari formulasi hingga produk siap jual.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/6281515264972"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-full bg-forest px-6 py-3 text-sm font-semibold text-honey transition-opacity hover:opacity-90"
          >
            Chat via WhatsApp
          </a>
          <a
            href="mailto:info@alwaliy-sejahtera.com"
            className="focus-ring rounded-full border-2 border-forest px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-honey"
          >
            Kirim Email
          </a>
        </div>
      </div>
    </section>
  );
}
