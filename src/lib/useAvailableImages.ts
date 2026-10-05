import { useEffect, useState } from "react";

/**
 * Cek apakah file foto benar-benar ada di public/ (urutan ekstensi sama
 * seperti SmartImage: webp, avif, jpg, png).
 *
 * Aturan yang dipakai semua section:
 * - Foto belum ada  -> itemnya TIDAK ditampilkan (bukan placeholder, bukan kosong)
 * - Foto sudah ada  -> otomatis muncul, tanpa ubah kode
 *
 * Hasil di-cache per path, jadi aman dipanggil dari banyak komponen dan
 * tidak mengecek ulang saat komponen dipasang ulang.
 */
const EXTENSIONS = ["webp", "avif", "jpg", "png"] as const;

const pending = new Map<string, Promise<boolean>>();
const known = new Map<string, boolean>();

export function imageExists(base: string): Promise<boolean> {
  let p = pending.get(base);
  if (!p) {
    p = new Promise<boolean>((resolve) => {
      let i = 0;
      const tryNext = () => {
        if (i >= EXTENSIONS.length) return resolve(false);
        const img = new Image();
        img.onload = () => resolve(img.naturalWidth > 0);
        img.onerror = () => {
          i += 1;
          tryNext();
        };
        img.src = `${base}.${EXTENSIONS[i]}`;
      };
      tryNext();
    }).then((ok) => {
      known.set(base, ok);
      return ok;
    });
    pending.set(base, p);
  }
  return p;
}

/**
 * @returns ready = semua path sudah selesai dicek.
 *          has[i] = true hanya kalau foto ke-i terkonfirmasi ada.
 * Render item hanya kalau has[i] true; tampilkan/sembunyikan section
 * penuh dengan ready + jumlah has yang true.
 */
export function useAvailableImages(bases: string[]): {
  ready: boolean;
  has: boolean[];
} {
  const [, bump] = useState(0);
  const key = bases.join("|");

  useEffect(() => {
    let alive = true;
    Promise.all(bases.map(imageExists)).then(() => {
      if (alive) bump((n) => n + 1);
    });
    return () => {
      alive = false;
    };
    // bases dipantau lewat key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return {
    ready: bases.every((b) => known.has(b)),
    has: bases.map((b) => known.get(b) === true),
  };
}
