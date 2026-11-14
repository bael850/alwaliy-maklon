# Al-Waliy Maklon — Landing Page

Landing page B2B untuk layanan maklon madu & herbal CV Al-Waliy Sejahtera
(maklon.alwaliy-sejahtera.com).

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- GSAP + Lenis (smooth scroll & animasi)
- Deploy: static `dist/` via FTP ke subfolder subdomain Hostinger

## Struktur

```
src/
  components/            -> Navbar, Footer, FloatingWhatsApp, SmartImage, Reveal, Lightbox
  components/sections/   -> satu file per section halaman
  i18n/                  -> translations.ts (ID & EN), LanguageContext, LanguageSwitch
  lib/contact.ts         -> nomor WhatsApp (satu-satunya tempat) + helper waLink()
  lib/content-status.ts  -> saklar tampil/sembunyi per bagian (placeholder = false)
  lib/lenis.ts           -> smooth scroll + sinkronisasi GSAP ScrollTrigger
  lib/useAvailableImages.ts -> cek foto ada/tidak (foto belum ada = item tidak tampil)
  App.tsx                -> merangkai semua section
public/                  -> favicon, sitemap.xml, robots.txt (+ images/ & PDF, lihat bawah)
```

## Konten yang belum final

Buka `src/lib/content-status.ts`. Bagian bernilai `false` tidak ditampilkan
(dan link navbar-nya ikut hilang). Ubah ke `true` kalau isinya sudah final.

## Foto & PDF

Folder `public/images/` dan file PDF (mis. `company-profile.pdf`) tidak ikut git
dan tidak ikut zip. Upload manual ke folder subdomain di server. Foto yang belum
ada otomatis tidak ditampilkan. Detail nama file ada di komentar tiap section.

## Development

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + build production ke dist/
npm run preview   # preview hasil build
```

## Deploy (CI/CD)

Push ke branch `main` otomatis menjalankan `.github/workflows/deploy.yml`:
build -> upload isi `dist/` ke Hostinger via FTP.

Secrets yang wajib diisi di GitHub (Settings -> Secrets and variables -> Actions):

| Secret | Isi |
|---|---|
| `FTP_HOST` | Host FTP dari hPanel -> Files -> FTP Accounts |
| `FTP_USERNAME` | Username FTP |
| `FTP_PASSWORD` | Password FTP |

`server-dir` di workflow diarahkan ke root akun FTP (`./`). Sesuaikan kalau akun
FTP bukan khusus untuk folder subdomain `maklon`.
