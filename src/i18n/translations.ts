// Kamus terjemahan terpusat. Tiap section komponen dapet namespace-nya
// sendiri (t.hero, t.whyUs, dst) — biar gampang ditemuin & di-maintain.
// Array (reasons, steps, faqs, dst) SENGAJA diduplikasi penuh per bahasa
// (bukan cuma per-field), soalnya urutannya harus tetap 1:1 sama array
// ikon/non-teks yang ada di masing-masing komponen (di-zip pakai index).

export type Lang = "id" | "en";

const id = {
  common: {
    switchLanguageAria: "Ganti bahasa ke Inggris",
    skipToContent: "Lewati ke konten utama",
  },
  hero: {
    eyebrow: "Produksi Bersertifikat Halal MUI & BPOM",
    heading: "Wujudkan Brand Herbal & Madu Anda Sendiri",
    paragraph:
      "Jasa maklon produksi herbal dan madu dari produsen berpengalaman sejak 2014 — dari formulasi, kemasan, hingga legalitas, tanpa Anda perlu membangun pabrik sendiri.",
    ctaPrimary: "Konsultasi Gratis",
    ctaSecondary: "Lihat Layanan",
    imageAlt: "Proses produksi herbal Al-Waliy",
    waMessage:
      "Assalamualaikum, saya mau konsultasi soal layanan maklon Al-Waliy...",
  },
  aboutMaklon: {
    eyebrow: "Profil Kami",
    heading: "Produsen Herbal Berpengalaman, Kini Terbuka untuk Brand Anda",
    paragraphBefore:
      "CV Al-Waliy Sejahtera memproduksi madu herbal dan sari kurma premium sejak 2014. Selain melayani konsumen akhir lewat marketplace kami sendiri, kami juga membuka layanan ",
    paragraphStrong: "maklon",
    paragraphAfter:
      " — memproduksi herbal sesuai formulasi dan kebutuhan brand Anda, dengan standar kualitas yang sama seperti produk kami sendiri.",
    linkText: "Lihat cara kerja sama kami",
    photoLabel: "Gedung Produksi",
    facts: [
      {
        title: "Berdiri Sejak 2014",
        desc: "Memproduksi madu herbal & sari kurma di fasilitas berstandar CPOTB, Bekasi.",
      },
      {
        title: "Legalitas Terverifikasi",
        desc: "Sertifikasi Halal MUI & BPJPH yang dapat diverifikasi publik, terdaftar BPOM.",
      },
      {
        title: "Dipercaya Banyak Mitra",
        desc: "Melayani konsumen akhir, reseller, dan mitra maklon di seluruh Indonesia.",
      },
    ],
  },
  productTypes: {
    eyebrow: "Layanan Kami",
    heading: "Jenis Produk yang Bisa Kami Produksi",
    numberPrefix: "No.",
    ctaLabel: "Konsultasikan",
    waMessagePrefix: "Assalamualaikum, saya mau konsultasi soal maklon produk ",
    types: [
      {
        title: "Madu Herbal",
        desc: "Madu murni dikombinasikan dengan ekstrak herbal sesuai formulasi brand Anda.",
      },
      {
        title: "Kapsul & Tablet",
        desc: "Suplemen herbal dalam bentuk kapsul atau tablet, praktis dan mudah dikonsumsi.",
      },
      {
        title: "Serbuk",
        desc: "Jamu atau minuman herbal serbuk, siap seduh dengan berbagai varian rasa.",
      },
      {
        title: "Cair / Sirup",
        desc: "Sari kurma, sirup herbal, hingga cuka alami dalam kemasan botol.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Jaminan Kami",
    heading: "Kenapa Pilih Al-Waliy sebagai Mitra Maklon",
    paragraph:
      "Bukan cuma soal produksi — kami pegang tanggung jawab dari legalitas sampai brand Anda siap dipasarkan.",
    sheetTitle: "Lembar Jaminan Mutu",
    photoAlt: "Dokumentasi pemeriksaan mutu produksi",
    reasons: [
      {
        title: "Legalitas Lengkap",
        desc: "Bantu pengurusan Halal MUI, BPOM, dan hak merek untuk produk Anda.",
      },
      {
        title: "Formulasi Fleksibel",
        desc: "Serbuk, kapsul, cair, hingga madu — disesuaikan dengan konsep brand Anda.",
      },
      {
        title: "Standar CPOTB",
        desc: "Diproduksi di fasilitas yang memenuhi Cara Pembuatan Obat Tradisional yang Baik.",
      },
      {
        title: "Desain & Kemasan",
        desc: "Dukungan desain kemasan dan branding, bukan cuma urusan produksi.",
      },
    ],
  },
  workflow: {
    eyebrow: "Alur Kerja Sama",
    heading: "Enam Tahap, dari Ide sampai Produk Jadi",
    paragraph:
      "Scroll untuk lihat tiap tahap — kartu ini menandai posisi Anda di keseluruhan proses.",
    photoAlt: "Tim produksi Al-Waliy bekerja",
    stepLabel: "Tahap",
    steps: [
      {
        title: "Konsultasi",
        desc: "Diskusi konsep produk, target pasar, dan kebutuhan formulasi Anda.",
      },
      {
        title: "Pembuatan Sampel",
        desc: "Sampel produk dibuat dan disempurnakan sampai sesuai konsep.",
      },
      {
        title: "Perjanjian Kerja Sama",
        desc: "Kesepakatan volume produksi, harga, dan jadwal kerja dituangkan tertulis.",
      },
      {
        title: "Registrasi & Desain",
        desc: "Pengurusan BPOM/Halal serta desain kemasan dan identitas merek.",
      },
      {
        title: "Produksi Massal",
        desc: "Produksi dijalankan di fasilitas berstandar CPOTB sesuai jumlah yang disepakati.",
      },
      {
        title: "Siap Dipasarkan",
        desc: "Produk jadi, dikemas rapi, dan siap Anda pasarkan dengan brand sendiri.",
      },
    ],
  },
  facilityGallery: {
    eyebrow: "Fasilitas Kami",
    heading: "Lihat Langsung Tempat Produk Anda Dibuat",
    paragraph:
      "Scroll atau geser (klik-tahan-tarik) untuk lihat semua fasilitas — klik tiap foto untuk detail dan spesifikasinya.",
    closeAria: "Tutup",
    items: [
      {
        category: "Fasilitas",
        title: "Gedung Produksi",
        description:
          "Bangunan produksi milik sendiri di Bekasi, dirancang mengikuti alur produksi satu arah sesuai standar CPOTB — dari penerimaan bahan baku sampai gudang produk jadi.",
        specs: [
          { label: "Lokasi", value: "Tambun Selatan, Bekasi" },
          { label: "Standar", value: "CPOTB" },
        ],
      },
      {
        category: "Peralatan",
        title: "Mesin Mixing",
        description:
          "Mesin pencampur untuk mengolah dan menghomogenkan bahan baku herbal maupun madu sebelum masuk tahap pengisian, memastikan komposisi tiap batch konsisten.",
        specs: [
          { label: "Kapasitas", value: "Detail akan diperbarui" },
          { label: "Fungsi", value: "Homogenisasi bahan baku" },
          { label: "Perawatan", value: "Terjadwal & terdokumentasi" },
        ],
      },
      {
        category: "Peralatan",
        title: "Mesin Filling",
        description:
          "Mesin pengisian untuk menuang produk cair, madu, maupun serbuk ke dalam kemasan secara presisi dan higienis, menjaga takaran tiap unit tetap konsisten.",
        specs: [
          { label: "Kapasitas", value: "Detail akan diperbarui" },
          { label: "Fungsi", value: "Pengisian ke kemasan" },
          { label: "Perawatan", value: "Terjadwal & terdokumentasi" },
        ],
      },
      {
        category: "Ruang Produksi",
        title: "Ruang Penuangan (Filling)",
        description:
          "Ruang khusus untuk proses penuangan produk cair dan madu ke dalam kemasan, dijaga kebersihan dan suhunya sesuai standar CPOTB.",
        specs: [
          { label: "Standar", value: "CPOTB" },
          { label: "Kebersihan", value: "Terpantau berkala" },
        ],
      },
      {
        category: "Ruang Produksi",
        title: "Ruang Pengemasan",
        description:
          "Ruang tempat produk jadi dikemas dan diberi label sebelum masuk tahap penyimpanan dan distribusi ke mitra.",
        specs: [
          { label: "Standar", value: "CPOTB" },
          { label: "Pengecekan", value: "Quality control per batch" },
        ],
      },
      {
        category: "Standar Kerja",
        title: "Pakaian & APD Produksi",
        description:
          "Seluruh staf produksi menggunakan pakaian dan alat pelindung diri (APD) sesuai standar higienitas produksi herbal.",
        specs: [
          {
            label: "Kelengkapan",
            value: "Masker, sarung tangan, penutup kepala",
          },
        ],
      },
      {
        category: "Kemasan",
        title: "Stiker & Label Kemasan",
        description:
          "Label kemasan mencantumkan informasi produk, legalitas (BPOM/Halal), dan identitas brand sesuai kebutuhan mitra maklon.",
        specs: [
          { label: "Kustomisasi", value: "Sesuai identitas brand mitra" },
        ],
      },
    ],
  },
  maklonComparison: {
    eyebrow: "Maklon vs Bangun Pabrik Sendiri",
    heading: "Kenapa Banyak Brand Memilih Maklon",
    colMaklonLabel: "Maklon Al-Waliy",
    badgeRekomendasi: "Rekomendasi",
    colSendiriLabel: "Bangun Pabrik Sendiri",
    rows: [
      {
        aspect: "Modal Awal",
        maklon: "Rendah — tanpa perlu bangun pabrik",
        sendiri: "Sangat tinggi — bangunan, alat, perizinan",
      },
      {
        aspect: "Waktu ke Pasar",
        maklon: "Lebih cepat, hitungan minggu-bulan",
        sendiri: "Bisa 1-2 tahun sebelum siap produksi",
      },
      {
        aspect: "Pengurusan Legalitas",
        maklon: "Dibantu tim berpengalaman",
        sendiri: "Diurus sendiri dari nol",
      },
      {
        aspect: "Risiko Operasional",
        maklon: "Ditanggung fasilitas produksi",
        sendiri: "Ditanggung sepenuhnya oleh brand",
      },
      {
        aspect: "Skalabilitas",
        maklon: "Fleksibel sesuai permintaan pasar",
        sendiri: "Terbatas kapasitas mesin sendiri",
      },
    ],
    caseStudiesEyebrow: "Studi Kasus",
    caseStudiesHeading: "Contoh Hasil Kerja Sama Maklon",
    detailMenyusul: "Detail menyusul",
    caseStudies: [
      {
        category: "Madu Herbal",
        title: "Dari Konsep ke Produk Siap Jual",
        summary:
          "Brand baru memulai dari formulasi awal hingga siap dipasarkan dengan kemasan dan legalitas lengkap.",
      },
      {
        category: "Kapsul Suplemen",
        title: "Reformulasi untuk Perluasan Pasar",
        summary:
          "Membantu brand existing menyesuaikan formulasi produk agar memenuhi standar BPOM untuk kategori baru.",
      },
      {
        category: "Serbuk Minuman Herbal",
        title: "Kemasan & Branding dari Nol",
        summary:
          "Mendampingi brand tanpa pengalaman produksi sebelumnya, dari ide produk sampai siap jual.",
      },
    ],
  },
  certifications: {
    eyebrow: "Legalitas & Standar",
    heading: "Bukan Sekadar Klaim — Ini Jaminan Tertulis",
    paragraph:
      "Tiap sertifikat adalah dokumen resmi yang bisa diverifikasi — ketuk stempelnya untuk lihat detail.",
    viewDetailAriaPrefix: "Lihat detail ",
    closeAria: "Tutup",
    certs: [
      {
        title: "Halal MUI / BPJPH",
        issuer: "Majelis Ulama Indonesia / BPJPH",
        desc: "Sertifikasi halal resmi dari Majelis Ulama Indonesia dan Badan Penyelenggara Jaminan Produk Halal.",
        note: "Nomor sertifikat & masa berlaku akan ditampilkan di sini setelah scan dokumen tersedia.",
        ringText: "• SERTIFIKAT HALAL RESMI",
      },
      {
        title: "Terdaftar BPOM",
        issuer: "Badan Pengawas Obat dan Makanan RI",
        desc: "Produk melalui evaluasi dan terdaftar di Badan Pengawas Obat dan Makanan Republik Indonesia.",
        note: "Nomor registrasi BPOM akan ditampilkan di sini setelah scan dokumen tersedia.",
        ringText: "• TERDAFTAR & DIAWASI",
      },
      {
        title: "Standar CPOTB",
        issuer: "Cara Pembuatan Obat Tradisional yang Baik",
        desc: "Memenuhi Cara Pembuatan Obat Tradisional yang Baik — standar produksi herbal tertinggi di Indonesia.",
        note: "Detail sertifikasi fasilitas akan ditampilkan di sini setelah scan dokumen tersedia.",
        ringText: "• STANDAR PRODUKSI RESMI",
      },
      {
        title: "Badan Hukum Resmi",
        issuer: "CV Al-Waliy Sejahtera",
        desc: "CV Al-Waliy Sejahtera terdaftar sebagai badan hukum resmi dengan legalitas usaha lengkap.",
        note: "Dokumen legalitas usaha akan ditampilkan di sini setelah scan dokumen tersedia.",
        ringText: "• BADAN HUKUM TERDAFTAR",
      },
    ],
  },
  clientTrust: {
    trustedByLabel: "Sudah Dipercaya Brand-Brand Berikut",
    testimonialsEyebrow: "Kata Mitra Kami",
    testimonialsHeading: "Pengalaman Brand yang Sudah Bermitra",
    ariaGroupPrefix: "Testimoni dari ",
    clients: [
      "Mitra Maklon 1",
      "Mitra Maklon 2",
      "Mitra Maklon 3",
      "Mitra Maklon 4",
      "Mitra Maklon 5",
      "Mitra Maklon 6",
    ],
    testimonials: [
      {
        quote:
          "Prosesnya jelas dari awal, mulai dari formulasi sampai legalitas selesai lebih cepat dari perkiraan kami.",
        name: "Nama Klien",
        role: "Founder, Brand Herbal (Placeholder)",
        time: "09.14",
      },
      {
        quote:
          "Support desain kemasan sangat membantu karena tim kami tidak perlu cari vendor terpisah.",
        name: "Nama Klien",
        role: "Owner, Brand Madu (Placeholder)",
        time: "14.02",
      },
      {
        quote:
          "Komunikasinya responsif, dan hasil produksinya konsisten setiap batch.",
        name: "Nama Klien",
        role: "Marketing Manager, Brand Suplemen (Placeholder)",
        time: "20.47",
      },
    ],
  },
  pullQuote: {
    quote:
      "Alam menyediakan, kami meracik — kini giliran brand Anda yang memasarkan.",
    attribution: "CV Al-Waliy Sejahtera — sejak 2014",
  },
  faq: {
    eyebrow: "Pertanyaan Umum",
    heading: "Masih Ada yang Ingin Ditanyakan?",
    badgeLetter: "T",
    faqs: [
      {
        q: "Berapa minimal order untuk layanan maklon?",
        a: "Minimal order kami sengaja fleksibel, disesuaikan jenis produk (serbuk, kapsul, cair, atau madu) dan kompleksitas formulasi — cocok baik untuk brand baru yang mau mulai skala kecil maupun yang sudah siap produksi lebih besar. Tim kami akan hitungkan MOQ paling efisien untuk Anda saat konsultasi.",
      },
      {
        q: "Apakah saya perlu formulasi sendiri?",
        a: "Tidak wajib. Anda bisa datang dengan formulasi sendiri, atau berdiskusi dengan tim kami untuk mengembangkan formulasi baru sesuai konsep produk yang Anda inginkan.",
      },
      {
        q: "Apakah legalitas produk (BPOM/Halal) diurus oleh Al-Waliy?",
        a: "Ya, kami membantu proses registrasi BPOM dan sertifikasi Halal MUI untuk produk yang diproduksi di fasilitas kami, sebagai bagian dari layanan maklon.",
      },
      {
        q: "Berapa lama proses dari konsultasi sampai produk jadi?",
        a: "Estimasi waktu tergantung kompleksitas formulasi dan proses legalitas, umumnya berkisar beberapa minggu hingga beberapa bulan. Timeline detail akan dibahas saat konsultasi awal.",
      },
      {
        q: "Bagaimana skema pembayaran untuk maklon?",
        a: "Skema pembayaran kami fleksibel dan disesuaikan dengan skala kerja sama, umumnya menggunakan sistem bertahap (DP di awal, pelunasan setelah produksi) agar lebih ringan bagi Anda. Detail lengkap akan dibahas saat konsultasi.",
      },
      {
        q: "Apakah kemasan dan desain juga disediakan?",
        a: "Ya, kami menyediakan dukungan desain kemasan dan branding sebagai bagian dari layanan, sehingga produk Anda siap dipasarkan dengan identitas merek yang jelas.",
      },
    ],
  },
  cta: {
    eyebrow: "Hubungi Kami",
    heading: "Siap Wujudkan Produk Herbal dengan Brand Anda Sendiri?",
    paragraph:
      "Tim kami siap membantu — dari informasi produk, formulasi, hingga konsultasi produksi maklon sesuai kebutuhan brand Anda.",
    waButtonLabel: "Konsultasi Gratis via WhatsApp",
    downloadButtonLabel: "Download Company Profile",
    keepContactLabel: "Simpan Kontak Ini",
    lokasiLabel: "Lokasi",
    lokasiValue: "Sumberjaya, Tambun Selatan, Kab. Bekasi 17510",
    whatsappLabel: "WhatsApp",
    websiteLabel: "Website Utama",
    waMessage:
      "Assalamualaikum, saya mau tanya terkait layanan maklon Al-Waliy...",
  },
  companyProfileDownload: {
    heading: "Butuh Materi untuk Presentasi Internal?",
    paragraph:
      "Unduh company profile kami dalam format PDF — lengkap dengan profil perusahaan, legalitas, dan jenis layanan maklon.",
    buttonLabel: "Download Company Profile",
  },
  navbar: {
    navLinks: [
      { label: "Tentang", href: "#tentang" },
      { label: "Layanan", href: "#layanan" },
      { label: "Proses", href: "#proses" },
      { label: "Sertifikasi", href: "#sertifikasi" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Konsultasi Gratis",
    openMenuAria: "Buka menu",
    closeMenuAria: "Tutup menu",
    waMessage:
      "Assalamualaikum, saya mau tanya terkait layanan maklon Al-Waliy...",
  },
  floatingWhatsApp: {
    ariaLabel: "Chat via WhatsApp",
    waMessage:
      "Assalamualaikum, saya mau tanya terkait layanan maklon Al-Waliy...",
  },
  footer: {
    tagline:
      "CV Al-Waliy Sejahtera — produsen herbal terpercaya sejak 2014, kini membuka layanan maklon untuk brand Anda.",
    layananHeading: "Layanan",
    layananLinks: [
      { label: "Madu Herbal", href: "#layanan" },
      { label: "Kapsul & Tablet", href: "#layanan" },
      { label: "Serbuk", href: "#layanan" },
      { label: "Cair / Sirup", href: "#layanan" },
    ],
    perusahaanHeading: "Perusahaan",
    perusahaanLinks: [
      { label: "Profil Kami", href: "#tentang" },
      { label: "Alur Kerja Sama", href: "#proses" },
      { label: "Sertifikasi", href: "#sertifikasi" },
      { label: "Toko Retail Al-Waliy", href: "https://alwaliy-sejahtera.com" },
    ],
    bantuanHeading: "Bantuan",
    bantuanLinks: [
      { label: "FAQ", href: "#faq" },
      {
        label: "Kebijakan Privasi",
        href: "https://alwaliy-sejahtera.com/privacy-policy",
      },
      {
        label: "Syarat & Ketentuan",
        href: "https://alwaliy-sejahtera.com/terms-conditions",
      },
    ],
    lokasiHeading: "Lokasi Kami",
    alamatLengkap: "Sumberjaya, Tambun Selatan, Kab. Bekasi 17510",
    copyright: "© 2026 CV Al-Waliy Sejahtera. All rights reserved.",
  },
};

const en: typeof id = {
  common: {
    switchLanguageAria: "Switch language to Indonesian",
    skipToContent: "Skip to main content",
  },
  hero: {
    eyebrow: "Halal MUI & BPOM Certified Production",
    heading: "Bring Your Own Herbal & Honey Brand to Life",
    paragraph:
      "White-label (maklon) herbal and honey production from an experienced manufacturer since 2014 — from formulation and packaging to legal registration, without needing to build your own factory.",
    ctaPrimary: "Free Consultation",
    ctaSecondary: "See Services",
    imageAlt: "Al-Waliy herbal production process",
    waMessage:
      "Hello, I'd like to consult about Al-Waliy's white-label (maklon) manufacturing service...",
  },
  aboutMaklon: {
    eyebrow: "Our Profile",
    heading: "An Experienced Herbal Manufacturer, Now Open to Your Brand",
    paragraphBefore:
      "CV Al-Waliy Sejahtera has produced premium herbal honey and date syrup since 2014. Besides serving end consumers through our own marketplace, we also offer ",
    paragraphStrong: "white-label (maklon)",
    paragraphAfter:
      " services — producing herbal products to your brand's formulation and needs, with the same quality standards as our own products.",
    linkText: "See how we work together",
    photoLabel: "Production Facility",
    facts: [
      {
        title: "Established in 2014",
        desc: "Producing herbal honey & date syrup at a CPOTB-standard facility in Bekasi.",
      },
      {
        title: "Verified Legal Compliance",
        desc: "Publicly verifiable Halal MUI & BPJPH certification, registered with BPOM.",
      },
      {
        title: "Trusted by Many Partners",
        desc: "Serving end consumers, resellers, and white-label partners across Indonesia.",
      },
    ],
  },
  productTypes: {
    eyebrow: "Our Services",
    heading: "Types of Products We Can Manufacture",
    numberPrefix: "No.",
    ctaLabel: "Consult Now",
    waMessagePrefix:
      "Hello, I'd like to consult about white-label production for ",
    types: [
      {
        title: "Herbal Honey",
        desc: "Pure honey combined with herbal extracts to your brand's formulation.",
      },
      {
        title: "Capsules & Tablets",
        desc: "Herbal supplements in capsule or tablet form, practical and easy to consume.",
      },
      {
        title: "Powder",
        desc: "Herbal jamu or drink powder, ready-to-brew in various flavors.",
      },
      {
        title: "Liquid / Syrup",
        desc: "Date syrup, herbal syrup, and natural vinegar in bottled packaging.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Our Guarantee",
    heading: "Why Choose Al-Waliy as Your Manufacturing Partner",
    paragraph:
      "It's not just about production — we take responsibility from legal registration through to getting your brand market-ready.",
    sheetTitle: "Quality Assurance Sheet",
    photoAlt: "Production quality inspection documentation",
    reasons: [
      {
        title: "Complete Legal Compliance",
        desc: "We help arrange Halal MUI, BPOM registration, and trademark rights for your product.",
      },
      {
        title: "Flexible Formulation",
        desc: "Powder, capsules, liquid, or honey — tailored to your brand's concept.",
      },
      {
        title: "CPOTB Standard",
        desc: "Produced at a facility that meets Good Traditional Medicine Manufacturing Practice standards.",
      },
      {
        title: "Design & Packaging",
        desc: "Packaging design and branding support, not just production.",
      },
    ],
  },
  workflow: {
    eyebrow: "Partnership Workflow",
    heading: "Six Stages, From Idea to Finished Product",
    paragraph:
      "Scroll to see each stage — this card marks your position in the overall process.",
    photoAlt: "Al-Waliy production team at work",
    stepLabel: "Stage",
    steps: [
      {
        title: "Consultation",
        desc: "Discuss your product concept, target market, and formulation needs.",
      },
      {
        title: "Sample Development",
        desc: "Product samples are made and refined until they match your concept.",
      },
      {
        title: "Partnership Agreement",
        desc: "Production volume, pricing, and work schedule are put in writing.",
      },
      {
        title: "Registration & Design",
        desc: "BPOM/Halal registration along with packaging design and brand identity.",
      },
      {
        title: "Mass Production",
        desc: "Production runs at a CPOTB-standard facility according to the agreed volume.",
      },
      {
        title: "Ready to Market",
        desc: "Finished, neatly packaged product ready for you to market under your own brand.",
      },
    ],
  },
  facilityGallery: {
    eyebrow: "Our Facility",
    heading: "See Where Your Product Is Actually Made",
    paragraph:
      "Scroll or drag (click-hold-drag) to see all facilities — click each photo for details and specifications.",
    closeAria: "Close",
    items: [
      {
        category: "Facility",
        title: "Production Building",
        description:
          "Our own production building in Bekasi, designed around a one-way production flow per CPOTB standards — from raw material intake to finished-goods storage.",
        specs: [
          { label: "Location", value: "Tambun Selatan, Bekasi" },
          { label: "Standard", value: "CPOTB" },
        ],
      },
      {
        category: "Equipment",
        title: "Mixing Machine",
        description:
          "A mixer used to process and homogenize herbal or honey raw materials before the filling stage, keeping each batch's composition consistent.",
        specs: [
          { label: "Capacity", value: "Details to be updated" },
          { label: "Function", value: "Raw material homogenization" },
          { label: "Maintenance", value: "Scheduled & documented" },
        ],
      },
      {
        category: "Equipment",
        title: "Filling Machine",
        description:
          "A filling machine that dispenses liquid, honey, or powder products into packaging precisely and hygienically, keeping each unit's measure consistent.",
        specs: [
          { label: "Capacity", value: "Details to be updated" },
          { label: "Function", value: "Filling into packaging" },
          { label: "Maintenance", value: "Scheduled & documented" },
        ],
      },
      {
        category: "Production Room",
        title: "Filling Room",
        description:
          "A dedicated room for filling liquid and honey products into packaging, kept clean and temperature-controlled per CPOTB standards.",
        specs: [
          { label: "Standard", value: "CPOTB" },
          { label: "Cleanliness", value: "Monitored regularly" },
        ],
      },
      {
        category: "Production Room",
        title: "Packaging Room",
        description:
          "The room where finished products are packaged and labeled before moving into storage and distribution to partners.",
        specs: [
          { label: "Standard", value: "CPOTB" },
          { label: "Inspection", value: "Quality control per batch" },
        ],
      },
      {
        category: "Work Standards",
        title: "Production Attire & PPE",
        description:
          "All production staff wear clothing and personal protective equipment (PPE) that meet herbal production hygiene standards.",
        specs: [{ label: "Includes", value: "Mask, gloves, head cover" }],
      },
      {
        category: "Packaging",
        title: "Stickers & Packaging Labels",
        description:
          "Packaging labels include product information, legal compliance (BPOM/Halal), and brand identity per each maklon partner's needs.",
        specs: [
          { label: "Customization", value: "Matches partner brand identity" },
        ],
      },
    ],
  },
  maklonComparison: {
    eyebrow: "Maklon vs Building Your Own Factory",
    heading: "Why Many Brands Choose White-Label Manufacturing",
    colMaklonLabel: "Al-Waliy Maklon",
    badgeRekomendasi: "Recommended",
    colSendiriLabel: "Building Your Own Factory",
    rows: [
      {
        aspect: "Initial Capital",
        maklon: "Low — no need to build a factory",
        sendiri: "Very high — building, equipment, licensing",
      },
      {
        aspect: "Time to Market",
        maklon: "Faster, a matter of weeks to months",
        sendiri: "Can take 1–2 years before production-ready",
      },
      {
        aspect: "Legal Handling",
        maklon: "Assisted by an experienced team",
        sendiri: "Handled entirely on your own",
      },
      {
        aspect: "Operational Risk",
        maklon: "Borne by the production facility",
        sendiri: "Borne entirely by the brand",
      },
      {
        aspect: "Scalability",
        maklon: "Flexible according to market demand",
        sendiri: "Limited to your own machine capacity",
      },
    ],
    caseStudiesEyebrow: "Case Studies",
    caseStudiesHeading: "Examples of Maklon Partnership Results",
    detailMenyusul: "Details coming soon",
    caseStudies: [
      {
        category: "Herbal Honey",
        title: "From Concept to Market-Ready Product",
        summary:
          "A new brand went from initial formulation to being market-ready with complete packaging and legal registration.",
      },
      {
        category: "Supplement Capsules",
        title: "Reformulation for Market Expansion",
        summary:
          "Helped an existing brand adjust its product formulation to meet BPOM standards for a new category.",
      },
      {
        category: "Herbal Drink Powder",
        title: "Packaging & Branding from Scratch",
        summary:
          "Guided a brand with no prior production experience, from product idea to market-ready.",
      },
    ],
  },
  certifications: {
    eyebrow: "Legal Compliance & Standards",
    heading: "Not Just a Claim — This Is a Written Guarantee",
    paragraph:
      "Each certificate is an official, verifiable document — tap the seal to see the details.",
    viewDetailAriaPrefix: "View details for ",
    closeAria: "Close",
    certs: [
      {
        title: "Halal MUI / BPJPH",
        issuer: "Indonesian Ulema Council / BPJPH",
        desc: "Official halal certification from the Indonesian Ulema Council and the Halal Product Assurance Organizing Body.",
        note: "Certificate number & validity period will be shown here once the document scan is available.",
        ringText: "• OFFICIAL HALAL CERTIFICATE",
      },
      {
        title: "BPOM Registered",
        issuer: "Indonesian Food and Drug Authority (BPOM)",
        desc: "Product has passed evaluation and is registered with Indonesia's Food and Drug Authority (BPOM).",
        note: "BPOM registration number will be shown here once the document scan is available.",
        ringText: "• REGISTERED & SUPERVISED",
      },
      {
        title: "CPOTB Standard",
        issuer: "Good Traditional Medicine Manufacturing Practice",
        desc: "Meets Good Traditional Medicine Manufacturing Practice (CPOTB) — Indonesia's highest herbal production standard.",
        note: "Facility certification details will be shown here once the document scan is available.",
        ringText: "• OFFICIAL PRODUCTION STANDARD",
      },
      {
        title: "Registered Legal Entity",
        issuer: "CV Al-Waliy Sejahtera",
        desc: "CV Al-Waliy Sejahtera is registered as an official legal entity with complete business legality.",
        note: "Business legal documents will be shown here once the document scan is available.",
        ringText: "• REGISTERED LEGAL ENTITY",
      },
    ],
  },
  clientTrust: {
    trustedByLabel: "Trusted by These Brands",
    testimonialsEyebrow: "What Our Partners Say",
    testimonialsHeading: "Experiences from Brands We've Partnered With",
    ariaGroupPrefix: "Testimonial from ",
    clients: [
      "Maklon Partner 1",
      "Maklon Partner 2",
      "Maklon Partner 3",
      "Maklon Partner 4",
      "Maklon Partner 5",
      "Maklon Partner 6",
    ],
    testimonials: [
      {
        quote:
          "The process was clear from the start — formulation through legal registration finished faster than we expected.",
        name: "Client Name",
        role: "Founder, Herbal Brand (Placeholder)",
        time: "09:14",
      },
      {
        quote:
          "Packaging design support was a big help since our team didn't need to find a separate vendor.",
        name: "Client Name",
        role: "Owner, Honey Brand (Placeholder)",
        time: "14:02",
      },
      {
        quote:
          "Communication was responsive, and production quality stayed consistent every batch.",
        name: "Client Name",
        role: "Marketing Manager, Supplement Brand (Placeholder)",
        time: "20:47",
      },
    ],
  },
  pullQuote: {
    quote: "Nature provides, we craft — now it's your brand's turn to sell.",
    attribution: "CV Al-Waliy Sejahtera — since 2014",
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    heading: "Still Have Questions?",
    badgeLetter: "Q",
    faqs: [
      {
        q: "What's the minimum order for the maklon service?",
        a: "Our minimum order is intentionally flexible, depending on the product type (powder, capsules, liquid, or honey) and formulation complexity — suitable for new brands starting small as well as those ready for larger production. Our team will calculate the most efficient MOQ for you during consultation.",
      },
      {
        q: "Do I need my own formulation?",
        a: "Not necessarily. You can come with your own formulation, or work with our team to develop a new one that matches the product concept you want.",
      },
      {
        q: "Does Al-Waliy handle product legal registration (BPOM/Halal)?",
        a: "Yes, we help with the BPOM registration process and Halal MUI certification for products manufactured at our facility, as part of the maklon service.",
      },
      {
        q: "How long does the process take, from consultation to finished product?",
        a: "Timing depends on formulation complexity and the legal registration process, generally ranging from a few weeks to a few months. A detailed timeline is discussed during the initial consultation.",
      },
      {
        q: "What's the payment scheme for maklon?",
        a: "Our payment scheme is flexible and adjusted to the scale of the partnership, typically using a staged system (down payment upfront, balance after production) to make it lighter for you. Full details are discussed during consultation.",
      },
      {
        q: "Is packaging and design also provided?",
        a: "Yes, we provide packaging design and branding support as part of the service, so your product is market-ready with a clear brand identity.",
      },
    ],
  },
  cta: {
    eyebrow: "Contact Us",
    heading: "Ready to Bring Your Own Herbal Brand to Life?",
    paragraph:
      "Our team is ready to help — from product information and formulation to maklon production consultation tailored to your brand's needs.",
    waButtonLabel: "Free Consultation via WhatsApp",
    downloadButtonLabel: "Download Company Profile",
    keepContactLabel: "Save This Contact",
    lokasiLabel: "Location",
    lokasiValue: "Sumberjaya, Tambun Selatan, Bekasi Regency 17510",
    whatsappLabel: "WhatsApp",
    websiteLabel: "Main Website",
    waMessage:
      "Hello, I'd like to ask about Al-Waliy's maklon manufacturing service...",
  },
  companyProfileDownload: {
    heading: "Need Material for an Internal Presentation?",
    paragraph:
      "Download our company profile in PDF format — complete with company profile, legal information, and types of maklon services.",
    buttonLabel: "Download Company Profile",
  },
  navbar: {
    navLinks: [
      { label: "About", href: "#tentang" },
      { label: "Services", href: "#layanan" },
      { label: "Process", href: "#proses" },
      { label: "Certifications", href: "#sertifikasi" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Free Consultation",
    openMenuAria: "Open menu",
    closeMenuAria: "Close menu",
    waMessage:
      "Hello, I'd like to ask about Al-Waliy's maklon manufacturing service...",
  },
  floatingWhatsApp: {
    ariaLabel: "Chat via WhatsApp",
    waMessage:
      "Hello, I'd like to ask about Al-Waliy's maklon manufacturing service...",
  },
  footer: {
    tagline:
      "CV Al-Waliy Sejahtera — a trusted herbal manufacturer since 2014, now open for white-label (maklon) partnerships with your brand.",
    layananHeading: "Services",
    layananLinks: [
      { label: "Herbal Honey", href: "#layanan" },
      { label: "Capsules & Tablets", href: "#layanan" },
      { label: "Powder", href: "#layanan" },
      { label: "Liquid / Syrup", href: "#layanan" },
    ],
    perusahaanHeading: "Company",
    perusahaanLinks: [
      { label: "Our Profile", href: "#tentang" },
      { label: "Partnership Process", href: "#proses" },
      { label: "Certifications", href: "#sertifikasi" },
      { label: "Al-Waliy Retail Store", href: "https://alwaliy-sejahtera.com" },
    ],
    bantuanHeading: "Support",
    bantuanLinks: [
      { label: "FAQ", href: "#faq" },
      {
        label: "Privacy Policy",
        href: "https://alwaliy-sejahtera.com/privacy-policy",
      },
      {
        label: "Terms & Conditions",
        href: "https://alwaliy-sejahtera.com/terms-conditions",
      },
    ],
    lokasiHeading: "Our Location",
    alamatLengkap: "Sumberjaya, Tambun Selatan, Bekasi Regency 17510",
    copyright: "© 2026 CV Al-Waliy Sejahtera. All rights reserved.",
  },
};

export const translations: Record<Lang, typeof id> = { id, en };
export type Translations = typeof id;
