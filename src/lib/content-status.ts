/**
 * Saklar konten. true = tampil di live, false = disembunyikan.
 * Ubah ke true hanya kalau isinya sudah final (bukan placeholder).
 * Link navbar otomatis ikut hilang kalau section-nya false.
 */
export const contentStatus = {
  // Sudah final
  hero: true,
  whoWeAre: true,
  whyUs: true,
  visionMission: true,
  productTypes: true,
  workflow: true,
  faq: true,
  cta: true,

  // Masih placeholder -> sembunyikan dulu
  heroMultiSlide: false, // 3 slide masih foto yang sama
  testimonials: false, // "Nama Klien" = testimoni palsu
  companyProfile: false, // /company-profile.pdf belum tentu ada
  team: false, // "Nama Anggota N / Jabatan"
  works: false, // "Nama Produk N / Nama Klien"
  partnerLogos: false, // "Mitra Maklon 1-4"
  facilityCapacity: false, // "Detail akan diperbarui"
  footerCertBadges: false, // nomor BPOM/CPOTB belum diisi

  // Perlu kamu cek dulu kebenarannya
  journeyYears: false, // Halal 2018, CPOTB 2020, "25+ varian"
  certBpom: false,
  certCpotb: false,
  certLegal: false,
  certHalal: false,

  // Sudah ada fotonya dan teks final: ikut aturan cek-foto otomatis
  beyondOffice: true,
  facilityGallery: true,
  clients: true,
} as const;

export type ContentKey = keyof typeof contentStatus;
export const isOn = (key: ContentKey): boolean => contentStatus[key];
