export function Footer() {
  return (
    <footer id="footer" className="w-full bg-ink py-10 text-paper/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <span className="font-display text-base font-semibold text-paper">
            Al-Waliy
          </span>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-stamp">
            Maklon
          </span>
          <p className="mt-1 font-body text-xs text-paper/50">
            Maklon kosmetik &amp; skincare bersertifikat.
          </p>
        </div>
        <p className="font-body text-xs text-paper/50">
          © {new Date().getFullYear()} Al-Waliy Sejahtera. Seluruh hak cipta
          dilindungi.
        </p>
      </div>
    </footer>
  );
}
