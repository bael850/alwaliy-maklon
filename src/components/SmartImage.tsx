import { useEffect, useState, type ReactNode } from "react";

const EXTENSIONS = ["webp", "jpg", "png"] as const;

interface SmartImageProps {
  /**
   * Path TANPA ekstensi, relatif ke folder `public/`.
   * Contoh: "/images/certifications/halal-mui"
   * → komponen ini otomatis coba .webp, lalu .jpg, lalu .png secara berurutan.
   * Taruh file asetnya di public/images/... dengan salah satu dari 3 ekstensi
   * itu (nama file harus sama persis, cuma ekstensi yang beda), gak perlu
   * ubah kode apa pun.
   */
  basePath: string;
  alt: string;
  className?: string;
  /** Ditampilkan kalau ketiga ekstensi gak ada satupun filenya (mis. ikon placeholder). */
  fallback?: ReactNode;
}

export default function SmartImage({
  basePath,
  alt,
  className,
  fallback,
}: SmartImageProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  // Reset state kalau basePath-nya berubah (mis. dipakai ulang di list/map
  // dengan item berbeda-beda).
  useEffect(() => {
    setExtIndex(0);
    setFailed(false);
  }, [basePath]);

  if (failed) return <>{fallback}</>;

  return (
    <img
      src={`${basePath}.${EXTENSIONS[extIndex]}`}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => {
        setExtIndex((i) => {
          if (i < EXTENSIONS.length - 1) return i + 1;
          setFailed(true);
          return i;
        });
      }}
    />
  );
}
