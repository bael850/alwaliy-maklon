export default function Footer() {
  return (
    <footer className="border-t border-forest-600/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-lg font-semibold text-parchment">
            CV Al-Waliy Sejahtera
          </div>
          <p className="mt-1 max-w-sm text-sm text-parchment-muted">
            Jl. Santri, Perum Kavling Paramita Sembada No. 7 RT.004/037,
            Sumberjaya, Kecamatan Tambun Selatan, Bekasi.
          </p>
        </div>
        <div className="text-sm text-parchment-muted">
          <div>0815-1526-4972</div>
          <div>info@alwaliy-sejahtera.com</div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-parchment-muted/70">
        © {new Date().getFullYear()} CV Al-Waliy Sejahtera. Seluruh hak cipta
        dilindungi.
      </p>
    </footer>
  );
}
