# Al-Waliy Maklon — Landing Page

Landing page B2B untuk layanan maklon kosmetik & skincare Al-Waliy Sejahtera.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- GSAP + Lenis (smooth scroll & scroll-triggered animation)
- Deploy: static `dist/` via FTP ke subfolder subdomain Hostinger

## Struktur

```
src/
  components/sections/   -> satu file per section halaman
  lib/lenis.ts            -> setup smooth scroll + sinkronisasi GSAP ScrollTrigger
  App.tsx                 -> merangkai semua section
```

## Development

```bash
npm install
npm run dev       # dev server
npm run build     # build production ke dist/
npm run preview   # preview hasil build
```

## Deploy (CI/CD)

Push ke branch `main` otomatis trigger `.github/workflows/deploy.yml`:
build -> upload isi `dist/` ke Hostinger via FTP.

Wajib diisi dulu di GitHub repo Settings -> Secrets and variables -> Actions:

| Secret | Isi |
|---|---|
| `FTP_HOST` | Host FTP dari hPanel -> Files -> FTP Accounts |
| `FTP_USERNAME` | Username FTP |
| `FTP_PASSWORD` | Password FTP |

`server-dir` di workflow diarahkan ke root akun FTP (`./`) — sesuaikan kalau
akun FTP-nya bukan khusus untuk folder subdomain `maklon`, misal ganti jadi
`./domains/maklon.alwaliy-sejahtera.com/public_html/`.
