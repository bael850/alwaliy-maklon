// Kamus terjemahan terpusat. Tiap section komponen dapet namespace-nya
// sendiri (t.hero, t.whyUs, dst), biar gampang ditemuin & di-maintain.
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
    slides: [
      {
        eyebrow: "Produksi Bersertifikat Halal MUI & BPOM",
        heading: "Wujudkan Brand Herbal & Madu Anda Sendiri",
        paragraph:
          "Jasa maklon herbal dan madu dari produsen yang sudah berjalan sejak 2014. Formulasi, kemasan, sampai legalitas kami bantu, tanpa Anda perlu membangun pabrik sendiri.",
      },
      {
        eyebrow: "Private Label & Pengembangan Produk",
        heading: "Dari Ide Sampai Siap Dijual",
        paragraph:
          "Punya ide produk? Kami bantu dari formula, desain kemasan, sampai izin edar, supaya Anda bisa fokus membangun brand.",
      },
      {
        eyebrow: "Contract Manufacturing Skala Besar",
        heading: "Kualitas Konsisten di Setiap Batch",
        paragraph:
          "Fasilitas bersertifikat dengan kontrol mutu di setiap tahap, siap memproduksi dari ratusan sampai ribuan unit.",
      },
    ],
    carouselAria: "Banner utama",
    goToSlideAria: "Ke slide",
    prevAria: "Slide sebelumnya",
    nextAria: "Slide berikutnya",
    pauseAria: "Jeda slideshow",
    playAria: "Putar slideshow",
    ctaPrimary: "Konsultasi Gratis",
    ctaSecondary: "Lihat Layanan",
    imageAlt: "Proses produksi herbal Al-Waliy",
    waMessage:
      "Assalamualaikum, saya mau konsultasi soal layanan maklon Al-Waliy...",
  },
  whoWeAre: {
    eyebrow: "Siapa Kami",
    heading: "Produsen Herbal Berpengalaman, Kini Terbuka untuk Brand Anda",
    paragraphBefore:
      "CV Al-Waliy Sejahtera memproduksi madu herbal dan sari kurma premium sejak 2014. Kami melayani konsumen akhir, reseller, dan mitra maklon di seluruh Indonesia, dan kini membuka layanan ",
    paragraphStrong: "maklon",
    paragraphAfter:
      ", memproduksi herbal sesuai formulasi dan kebutuhan brand Anda, dengan standar kualitas yang sama seperti produk kami sendiri.",
    linkText: "Lihat cara kerja sama kami",
    photoLabel: "Gedung Produksi",
    stats: [
      {
        value: "{years}",
        label:
          "Tahun berpengalaman memproduksi madu herbal dan sari kurma, sejak 2014.",
      },
      {
        value: "CPOTB",
        label: "Fasilitas produksi berstandar CPOTB di Bekasi.",
      },
      {
        value: "Halal",
        label: "Tersertifikasi Halal MUI & BPJPH, terdaftar BPOM.",
      },
    ],
  },
  journey: {
    eyebrow: "Perjalanan Kami",
    heading: "Dari Awal Berdiri Sampai Dipercaya Banyak Brand",
    paragraph:
      "Geser untuk melihat perjalanan Al-Waliy dari tahun ke tahun. Klik foto untuk baca ceritanya.",
    items: [
      {
        year: "2014",
        title: "Al-Waliy Berdiri",
        desc: "Kami mulai memproduksi madu herbal dan sari kurma premium di Bekasi.",
      },
      {
        year: "2018",
        title: "Sertifikasi Halal MUI",
        desc: "Mendapatkan sertifikasi Halal MUI, pengakuan resmi atas komitmen kami terhadap standar produk untuk konsumen Muslim Indonesia.",
      },
      {
        year: "2020",
        title: "Standar CPOTB",
        desc: "Memenuhi standar Cara Pembuatan Obat Tradisional yang Baik, memperkuat sistem produksi dan kontrol kualitas.",
      },
      {
        year: "2021",
        title: "Distribusi Nasional",
        desc: "Jangkauan distribusi meluas ke seluruh Indonesia melalui berbagai platform penjualan, online maupun offline.",
      },
      {
        year: "2026",
        title: "Marketplace Online",
        desc: "Meluncurkan platform marketplace Al-Waliy Sejahtera dengan lebih dari 25 varian produk herbal.",
      },
    ],
    dragHint: "Geser untuk melihat",
    prevAria: "Sebelumnya",
    nextAria: "Berikutnya",
    closeAria: "Tutup",
    openAriaPrefix: "Buka cerita ",
  },
  whatWeDo: {
    eyebrow: "Yang Kami Kerjakan",
    heading: "Produk yang Sudah Kami Buat, untuk Klien dan Brand Sendiri",
    paragraph:
      "Sebagian kami buat untuk brand klien, sebagian lagi produk Al-Waliy sendiri. Pilih salah satu, lalu klik produknya untuk melihat lebih dekat.",
    filters: {
      all: "Semua",
      client: "Untuk Klien",
      own: "Produk Kami",
    },
    filterAria: "Filter produk",
    forClient: "Untuk",
    ownProduct: "Produk Al-Waliy",
    clientBadge: "Klien",
    ownBadge: "Al-Waliy",
    viewAriaPrefix: "Lihat ",
    closeAria: "Tutup",
    prevAria: "Sebelumnya",
    nextAria: "Berikutnya",
    items: [
      { name: "Nama Produk 1", client: "Nama Klien" },
      { name: "Nama Produk 2", client: "Nama Klien" },
      { name: "Nama Produk 3", client: "Nama Klien" },
      { name: "Nama Produk 4", client: "Nama Klien" },
      { name: "Nama Produk 5", client: "Nama Klien" },
      { name: "Nama Produk 6", client: "Nama Klien" },
      { name: "Nama Produk 7", client: "Nama Klien" },
      { name: "Nama Produk 8", client: "Nama Klien" },
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
        title: "Cair / Sirup",
        desc: "Sari kurma, sirup herbal, hingga cuka alami dalam kemasan botol.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Mengapa Al-Waliy",
    heading: "Tiga Hal yang Kami Pegang",
    paragraph: "Kenapa brand Anda aman bersama kami.",
    pillars: [
      {
        word: "Quality",
        desc: "Diproduksi di fasilitas berstandar CPOTB, bersertifikat Halal MUI & BPJPH, dan terdaftar BPOM. Standarnya sama dengan produk Al-Waliy sendiri.",
      },
      {
        word: "Service",
        desc: "Kami tidak berhenti di produksi. Formulasi, desain kemasan, sampai urusan Halal, BPOM, dan hak merek kami dampingi, supaya Anda bisa fokus ke brand.",
      },
      {
        word: "Experience",
        desc: "Lebih dari sepuluh tahun kami memproduksi madu herbal dan sari kurma. Pengalaman bekerja sama pun kami rancang serius, dari konsultasi pertama sampai website yang sedang Anda buka ini.",
      },
    ],
  },
  workflow: {
    eyebrow: "Alur Kerja Sama",
    heading: "Dari A sampai Z, Tiga Jalur Kerja Sama",
    paragraph:
      "Pilih jalur yang sesuai kondisi Anda, lalu scroll untuk melihat tiap tahapnya.",
    tabsAria: "Jalur kerja sama",
    ctaLabel: "Mulai Konsultasi",
    tracks: [
      {
        name: "Private Label",
        blurb:
          "Punya brand, belum punya formula. Pakai formula siap kami, lalu beri merek Anda.",
        steps: [
          {
            title: "Konsultasi",
            desc: "Diskusi target pasar dan jenis produk yang Anda inginkan.",
          },
          {
            title: "Pilih Formula",
            desc: "Pilih dari formulasi yang sudah kami kuasai, lalu sesuaikan varian atau kemasannya.",
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
            title: "Produksi & Siap Dipasarkan",
            desc: "Produksi di fasilitas berstandar CPOTB, lalu produk jadi, dikemas rapi, dan siap Anda pasarkan.",
          },
        ],
      },
      {
        name: "Product Development",
        blurb:
          "Punya ide, belum punya formula. Kami kembangkan produknya dari nol bersama Anda.",
        steps: [
          {
            title: "Konsultasi Konsep",
            desc: "Diskusi ide produk, target pasar, dan kebutuhan formulasi Anda.",
          },
          {
            title: "Riset & Formulasi",
            desc: "Formula baru dirancang sesuai konsep dan karakter brand Anda.",
          },
          {
            title: "Sampel & Penyempurnaan",
            desc: "Sampel dibuat dan direvisi bersama sampai sesuai konsep.",
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
      {
        name: "Contract Manufacturing",
        blurb:
          "Punya formula sendiri. Kami produksikan sesuai spesifikasi Anda.",
        steps: [
          {
            title: "Konsultasi & Spesifikasi",
            desc: "Anda membawa formula dan spesifikasi, kami pelajari kebutuhan produksinya.",
          },
          {
            title: "Pengecekan Kelayakan",
            desc: "Formula dan spesifikasi dicek terhadap kapabilitas dan standar fasilitas kami.",
          },
          {
            title: "Pembuatan Sampel",
            desc: "Sampel dibuat dan disesuaikan sampai sama dengan spesifikasi Anda.",
          },
          {
            title: "Perjanjian Kerja Sama",
            desc: "Kesepakatan volume produksi, harga, dan jadwal kerja dituangkan tertulis.",
          },
          {
            title: "Produksi Massal",
            desc: "Produksi dijalankan di fasilitas berstandar CPOTB sesuai jumlah yang disepakati.",
          },
          {
            title: "Siap Dikirim",
            desc: "Produk jadi, dikemas sesuai spesifikasi, dan siap dikirim ke Anda.",
          },
        ],
      },
    ],
  },
  facilityGallery: {
    eyebrow: "Fasilitas Kami",
    heading: "Lihat Langsung Tempat Produk Anda Dibuat",
    paragraph:
      "Geser untuk melihat semua fasilitas, lalu klik foto untuk detail dan spesifikasinya.",
    closeAria: "Tutup",
    items: [
      {
        category: "Fasilitas",
        title: "Gedung Produksi",
        description:
          "Bangunan produksi milik sendiri di Bekasi, dirancang mengikuti alur produksi satu arah sesuai standar CPOTB, dari penerimaan bahan baku sampai gudang produk jadi.",
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
          "Mesin pengisian untuk menuang produk cair atau madu ke dalam kemasan secara presisi dan higienis, menjaga takaran tiap unit tetap konsisten.",
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
  certifications: {
    eyebrow: "Legalitas & Standar",
    heading: "Bukan Cuma Klaim, Ada Dokumennya",
    paragraph:
      "Semua sertifikat ini dokumen resmi yang bisa diverifikasi. Klik kartunya untuk lihat detail.",
    viewDetailAriaPrefix: "Lihat detail ",
    closeAria: "Tutup",
    viewDocument: "Lihat dokumen",
    prevAria: "Sertifikat sebelumnya",
    nextAria: "Sertifikat berikutnya",
    certs: [
      {
        title: "Halal MUI / BPJPH",
        issuer: "Majelis Ulama Indonesia / BPJPH",
        desc: "Sertifikasi halal resmi dari Majelis Ulama Indonesia dan Badan Penyelenggara Jaminan Produk Halal.",
        note: "No. Sertifikat 01121250821020. Masa berlaku belum tercantum di dokumen yang ada, akan kami perbarui.",
        ringText: "SERTIFIKAT HALAL RESMI",
      },
      {
        title: "Terdaftar BPOM",
        issuer: "Badan Pengawas Obat dan Makanan RI",
        desc: "Produk melalui evaluasi dan terdaftar di Badan Pengawas Obat dan Makanan Republik Indonesia.",
        note: "[ISI] Nomor registrasi BPOM.",
        ringText: "TERDAFTAR & DIAWASI",
      },
      {
        title: "Standar CPOTB",
        issuer: "Cara Pembuatan Obat Tradisional yang Baik",
        desc: "Memenuhi Cara Pembuatan Obat Tradisional yang Baik, standar produksi obat tradisional di Indonesia.",
        note: "[ISI] Nomor dan masa berlaku sertifikat CPOTB.",
        ringText: "STANDAR PRODUKSI RESMI",
      },
      {
        title: "Badan Hukum Resmi",
        issuer: "CV Al-Waliy Sejahtera",
        desc: "CV Al-Waliy Sejahtera terdaftar sebagai badan hukum resmi dengan legalitas usaha lengkap.",
        note: "[ISI] Nomor dan keterangan legalitas usaha.",
        ringText: "BADAN HUKUM TERDAFTAR",
      },
    ],
  },
  clientTrust: {
    trustedByLabel: "Dipercaya Brand-Brand Ini",
    testimonialsEyebrow: "Kata Mitra Kami",
    testimonialsHeading:
      "Cerita dari Brand yang Sudah Bekerja Sama dengan Kami",
    ariaGroupPrefix: "Testimoni dari ",
    clients: [
      "Mitra Maklon 1",
      "Mitra Maklon 2",
      "Mitra Maklon 3",
      "Mitra Maklon 4",
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
  visionMission: {
    visionLabel: "Visi",
    vision:
      "Menjadi produsen obat tradisional yang memberikan manfaat nyata bagi kesehatan masyarakat, dengan standar produksi yang dapat dipertanggungjawabkan.",
    missionLabel: "Misi",
    selectAriaPrefix: "Tampilkan misi: ",
    missions: [
      {
        title: "Nilai Islam dan etika bisnis",
        desc: "Menjalankan usaha berlandaskan nilai-nilai Islam dan etika bisnis yang bertanggung jawab.",
      },
      {
        title: "Halal, thayyib, sesuai regulasi",
        desc: "Memproduksi obat tradisional sesuai prinsip halal, thayyib, dan standar regulasi yang berlaku.",
      },
      {
        title: "Produk herbal yang terjangkau",
        desc: "Meningkatkan aksesibilitas produk herbal berkualitas bagi seluruh lapisan masyarakat.",
      },
      {
        title: "Edukasi dan ekonomi lokal",
        desc: "Berkontribusi pada edukasi kesehatan dan pemberdayaan ekonomi lokal.",
      },
    ],
  },
  team: {
    eyebrow: "Tim Kami",
    heading: "Orang-Orang di Balik Setiap Batch",
    paragraph:
      "Tim yang menangani formulasi, produksi, kontrol mutu, sampai pendampingan klien.",
    members: [
      { name: "Nama Anggota 1", role: "Jabatan" },
      { name: "Nama Anggota 2", role: "Jabatan" },
      { name: "Nama Anggota 3", role: "Jabatan" },
      { name: "Nama Anggota 4", role: "Jabatan" },
      { name: "Nama Anggota 5", role: "Jabatan" },
      { name: "Nama Anggota 6", role: "Jabatan" },
      { name: "Nama Anggota 7", role: "Jabatan" },
      { name: "Nama Anggota 8", role: "Jabatan" },
    ],
  },
  beyondOffice: {
    eyebrow: "Di Luar Kantor",
    heading: "Di Luar Ruang Produksi",
    paragraph:
      "Kekompakan tim tidak cuma dibangun di ruang produksi, tapi juga lewat kegiatan bareng di luar kantor.",
    items: [
      { alt: "Kegiatan tim di luar kantor 1" },
      { alt: "Kegiatan tim di luar kantor 2" },
      { alt: "Kegiatan tim di luar kantor 3" },
      { alt: "Kegiatan tim di luar kantor 4" },
      { alt: "Kegiatan tim di luar kantor 5" },
      { alt: "Kegiatan tim di luar kantor 6" },
      { alt: "Kegiatan tim di luar kantor 7" },
      { alt: "Kegiatan tim di luar kantor 8" },
    ],
  },
  pullQuote: {
    quote: "Sekarang giliran brand Anda yang tampil.",
    attribution: "CV Al-Waliy Sejahtera, sejak 2014",
  },
  faq: {
    eyebrow: "Pertanyaan Umum",
    heading: "Masih Ada yang Ingin Ditanyakan?",
    badgeLetter: "T",
    faqs: [
      {
        q: "Berapa minimal order untuk layanan maklon?",
        a: "Minimal order kami fleksibel, menyesuaikan jenis produk (kapsul, cair, atau madu) dan kerumitan formulanya. Brand baru yang mau mulai kecil pun bisa. Saat konsultasi, tim kami hitungkan MOQ (Minimum Order Quantity) yang paling efisien untuk Anda.",
      },
      {
        q: "Apakah saya perlu formulasi sendiri?",
        a: "Tidak wajib. Anda bisa membawa formula sendiri, atau kami bantu kembangkan formula baru sesuai konsep produk Anda.",
      },
      {
        q: "Apakah legalitas produk (BPOM/Halal) diurus oleh Al-Waliy?",
        a: "Ya. Registrasi BPOM dan sertifikasi Halal untuk produk yang diproduksi di fasilitas kami ikut kami bantu urus.",
      },
      {
        q: "Berapa lama proses dari konsultasi sampai produk jadi?",
        a: "Tergantung kerumitan formula dan proses legalitas, biasanya beberapa minggu sampai beberapa bulan. Jadwal detailnya kita bahas saat konsultasi awal.",
      },
      {
        q: "Bagaimana skema pembayaran untuk maklon?",
        a: "Skemanya fleksibel mengikuti skala kerja sama, biasanya bertahap: DP di awal, pelunasan setelah produksi. Detailnya kita bahas saat konsultasi.",
      },
      {
        q: "Apakah kemasan dan desain juga disediakan?",
        a: "Ya. Kami menyediakan dukungan desain kemasan dan branding, jadi produk Anda siap dipasarkan dengan identitas yang jelas.",
      },
    ],
  },
  cta: {
    eyebrow: "Hubungi Kami",
    heading: "Siap Punya Produk Herbal dengan Brand Sendiri?",
    paragraph:
      "Tanya dulu saja. Kami bantu mulai dari info produk, formulasi, sampai rencana produksi maklon.",
    waButtonLabel: "Konsultasi Gratis via WhatsApp",
    downloadButtonLabel: "Unduh Company Profile",
    keepContactLabel: "Simpan Kontak Ini",
    lokasiLabel: "Lokasi",
    lokasiValue: "Sumberjaya, Tambun Selatan, Kab. Bekasi 17510",
    whatsappLabel: "WhatsApp",
    websiteLabel: "Website Utama",
    waMessage:
      "Assalamualaikum, saya mau tanya terkait layanan maklon Al-Waliy...",
  },
  companyProfileDownload: {
    heading: "Mau Lihat Profil Lengkap Kami?",
    paragraph:
      "Unduh company profile dalam bentuk PDF: profil perusahaan, legalitas, dan jenis layanan maklon.",
    buttonLabel: "Unduh Company Profile",
  },
  navbar: {
    navLinks: [
      { label: "Siapa Kami", href: "#who" },
      { label: "Layanan Kami", href: "#products" },
      { label: "Klien Kami", href: "#clients" },
      { label: "Hubungi Kami", href: "#contact" },
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
      "CV Al-Waliy Sejahtera, produsen herbal terpercaya sejak 2014, kini membuka layanan maklon untuk brand Anda.",
    layananHeading: "Layanan",
    layananLinks: [
      { label: "Madu Herbal", href: "#products" },
      { label: "Kapsul & Tablet", href: "#products" },
      { label: "Cair / Sirup", href: "#products" },
    ],
    perusahaanHeading: "Perusahaan",
    perusahaanLinks: [
      { label: "Profil Kami", href: "#who" },
      { label: "Alur Kerja Sama", href: "#workflow" },
      { label: "Sertifikasi", href: "#certifications" },
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
    slides: [
      {
        eyebrow: "Halal MUI & BPOM Certified Production",
        heading: "Bring Your Own Herbal & Honey Brand to Life",
        paragraph:
          "White-label (maklon) herbal and honey production from an experienced manufacturer since 2014, from formulation and packaging to legal registration, without needing to build your own factory.",
      },
      {
        eyebrow: "Private Label & Product Development",
        heading: "From Idea to Ready-to-Sell",
        paragraph:
          "Have a product concept? Our team helps develop the formula, design the packaging, and register the distribution permits, so you can focus on building your brand.",
      },
      {
        eyebrow: "Large-Scale Contract Manufacturing",
        heading: "Consistent Quality in Every Batch",
        paragraph:
          "Certified production facilities with layered quality control, ready to meet your production needs from hundreds to thousands of units.",
      },
    ],
    carouselAria: "Main banner",
    goToSlideAria: "Go to slide",
    prevAria: "Previous slide",
    nextAria: "Next slide",
    pauseAria: "Pause slideshow",
    playAria: "Play slideshow",
    ctaPrimary: "Free Consultation",
    ctaSecondary: "See Services",
    imageAlt: "Al-Waliy herbal production process",
    waMessage:
      "Hello, I'd like to consult about Al-Waliy's white-label (maklon) manufacturing service...",
  },
  whoWeAre: {
    eyebrow: "Who We Are",
    heading: "An Experienced Herbal Producer, Now Open to Your Brand",
    paragraphBefore:
      "CV Al-Waliy Sejahtera has produced herbal honey and premium date syrup since 2014. We serve end consumers, resellers, and maklon partners across Indonesia, and now offer ",
    paragraphStrong: "maklon",
    paragraphAfter:
      " (white-label) manufacturing, producing herbal products to your formulation and brand needs, to the same quality standards as our own products.",
    linkText: "See how we work together",
    photoLabel: "Production Building",
    stats: [
      {
        value: "{years}",
        label:
          "Years of experience producing herbal honey and date syrup, since 2014.",
      },
      {
        value: "CPOTB",
        label: "CPOTB-standard production facility in Bekasi.",
      },
      {
        value: "Halal",
        label: "Halal MUI & BPJPH certified, BPOM registered.",
      },
    ],
  },
  journey: {
    eyebrow: "Our Journey",
    heading: "From Day One to Trusted by Many Brands",
    paragraph:
      "Drag to see how Al-Waliy has grown over the years. Click a photo to read its story.",
    items: [
      {
        year: "2014",
        title: "Al-Waliy Is Founded",
        desc: "We began producing herbal honey and premium date syrup in Bekasi.",
      },
      {
        year: "2018",
        title: "Halal MUI Certification",
        desc: "Earned Halal MUI certification, the official recognition of our commitment to product standards for Indonesian Muslim consumers.",
      },
      {
        year: "2020",
        title: "CPOTB Standard",
        desc: "Met the Good Traditional Medicine Manufacturing Practice (CPOTB) standard, strengthening our production system and quality control.",
      },
      {
        year: "2021",
        title: "Nationwide Distribution",
        desc: "Distribution reached all of Indonesia through various sales platforms, online and offline.",
      },
      {
        year: "2026",
        title: "Online Marketplace",
        desc: "Launched the Al-Waliy Sejahtera marketplace with more than 25 herbal product variants.",
      },
    ],
    dragHint: "Drag to explore",
    prevAria: "Previous",
    nextAria: "Next",
    closeAria: "Close",
    openAriaPrefix: "Open story ",
  },
  whatWeDo: {
    eyebrow: "What We Do",
    heading: "Products We've Made, for Clients and for Ourselves",
    paragraph:
      "Some we make for client brands, others are Al-Waliy's own. Pick one, then click a product to see it up close.",
    filters: {
      all: "All",
      client: "Client Work",
      own: "Our Products",
    },
    filterAria: "Filter work",
    forClient: "For",
    ownProduct: "Al-Waliy product",
    clientBadge: "Client",
    ownBadge: "Al-Waliy",
    viewAriaPrefix: "View ",
    closeAria: "Close",
    prevAria: "Previous",
    nextAria: "Next",
    items: [
      { name: "Product Name 1", client: "Client Name" },
      { name: "Product Name 2", client: "Client Name" },
      { name: "Product Name 3", client: "Client Name" },
      { name: "Product Name 4", client: "Client Name" },
      { name: "Product Name 5", client: "Client Name" },
      { name: "Product Name 6", client: "Client Name" },
      { name: "Product Name 7", client: "Client Name" },
      { name: "Product Name 8", client: "Client Name" },
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
        title: "Liquid / Syrup",
        desc: "Date syrup, herbal syrup, and natural vinegar in bottled packaging.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Why Al-Waliy",
    heading: "Three Things We Take Seriously",
    paragraph: "Why your brand is in good hands.",
    pillars: [
      {
        word: "Quality",
        desc: "Produced in a CPOTB-standard facility, Halal MUI & BPJPH certified and BPOM registered. The same standard we hold our own products to.",
      },
      {
        word: "Service",
        desc: "More than production. We support you from formulation and packaging design through Halal, BPOM, and trademark registration, so you can focus on building your brand.",
      },
      {
        word: "Experience",
        desc: "We've produced herbal honey and date syrup for over a decade, and we put the same care into working with us, from the first consultation to the website you're on right now.",
      },
    ],
  },
  workflow: {
    eyebrow: "Our Workflow",
    heading: "From A to Z, Three Ways to Work Together",
    paragraph:
      "Choose the path that fits your situation, then scroll to see each stage.",
    tabsAria: "Partnership paths",
    ctaLabel: "Start a Consultation",
    tracks: [
      {
        name: "Private Label",
        blurb:
          "You have a brand but no formula. Use our ready formulas and put your name on them.",
        steps: [
          {
            title: "Consultation",
            desc: "Discuss your target market and the type of product you want.",
          },
          {
            title: "Choose a Formula",
            desc: "Pick from the formulations we already master, then tailor the variant or packaging.",
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
            desc: "BPOM/Halal registration plus packaging design and brand identity.",
          },
          {
            title: "Production & Ready to Market",
            desc: "Produced in a CPOTB-standard facility, then finished, neatly packed, and ready for you to market.",
          },
        ],
      },
      {
        name: "Product Development",
        blurb:
          "You have an idea but no formula. We develop the product with you from scratch.",
        steps: [
          {
            title: "Concept Consultation",
            desc: "Discuss your product idea, target market, and formulation needs.",
          },
          {
            title: "Research & Formulation",
            desc: "A new formula is designed around your concept and brand character.",
          },
          {
            title: "Samples & Refinement",
            desc: "Samples are made and revised together until they match your concept.",
          },
          {
            title: "Partnership Agreement",
            desc: "Production volume, pricing, and work schedule are put in writing.",
          },
          {
            title: "Registration & Design",
            desc: "BPOM/Halal registration plus packaging design and brand identity.",
          },
          {
            title: "Mass Production",
            desc: "Production runs in a CPOTB-standard facility at the agreed quantity.",
          },
          {
            title: "Ready to Market",
            desc: "Finished, neatly packed, and ready for you to market under your own brand.",
          },
        ],
      },
      {
        name: "Contract Manufacturing",
        blurb:
          "You have your own formula. We produce it to your specifications.",
        steps: [
          {
            title: "Consultation & Specs",
            desc: "You bring the formula and specifications, we study the production requirements.",
          },
          {
            title: "Feasibility Check",
            desc: "The formula and specs are checked against our capabilities and facility standards.",
          },
          {
            title: "Sample Development",
            desc: "Samples are made and adjusted until they match your specifications.",
          },
          {
            title: "Partnership Agreement",
            desc: "Production volume, pricing, and work schedule are put in writing.",
          },
          {
            title: "Mass Production",
            desc: "Production runs in a CPOTB-standard facility at the agreed quantity.",
          },
          {
            title: "Ready to Ship",
            desc: "Finished, packed to spec, and ready to be delivered to you.",
          },
        ],
      },
    ],
  },
  facilityGallery: {
    eyebrow: "Our Facility",
    heading: "See Where Your Product Is Actually Made",
    paragraph:
      "Drag to see all our facilities, then click a photo for details and specs.",
    closeAria: "Close",
    items: [
      {
        category: "Facility",
        title: "Production Building",
        description:
          "Our own production building in Bekasi, designed around a one-way production flow per CPOTB standards, from raw material intake to finished-goods storage.",
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
          "A filling machine that dispenses liquid or honey products into packaging precisely and hygienically, keeping each unit's measure consistent.",
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
  certifications: {
    eyebrow: "Legal Compliance & Standards",
    heading: "More Than a Claim, We Have the Papers",
    paragraph:
      "Every certificate is an official document you can verify. Click a card to see the details.",
    viewDetailAriaPrefix: "View details for ",
    closeAria: "Close",
    viewDocument: "View document",
    prevAria: "Previous certificate",
    nextAria: "Next certificate",
    certs: [
      {
        title: "Halal MUI / BPJPH",
        issuer: "Indonesian Ulema Council / BPJPH",
        desc: "Official halal certification from the Indonesian Ulema Council and the Halal Product Assurance Organizing Body.",
        note: "Certificate No. 01121250821020. The validity period isn't listed on the document we have, and we'll update it once available.",
        ringText: "OFFICIAL HALAL CERTIFICATE",
      },
      {
        title: "BPOM Registered",
        issuer: "Indonesian Food and Drug Authority (BPOM)",
        desc: "Product has passed evaluation and is registered with Indonesia's Food and Drug Authority (BPOM).",
        note: "[FILL IN] BPOM registration number.",
        ringText: "REGISTERED & SUPERVISED",
      },
      {
        title: "CPOTB Standard",
        issuer: "Good Traditional Medicine Manufacturing Practice",
        desc: "Meets Good Traditional Medicine Manufacturing Practice (CPOTB), Indonesia's production standard for traditional medicine.",
        note: "[FILL IN] CPOTB certificate number and validity.",
        ringText: "OFFICIAL PRODUCTION STANDARD",
      },
      {
        title: "Registered Legal Entity",
        issuer: "CV Al-Waliy Sejahtera",
        desc: "CV Al-Waliy Sejahtera is registered as an official legal entity with complete business legality.",
        note: "[FILL IN] Business legal document details.",
        ringText: "REGISTERED LEGAL ENTITY",
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
    ],
    testimonials: [
      {
        quote:
          "The process was clear from the start, formulation through legal registration finished faster than we expected.",
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
  visionMission: {
    visionLabel: "Vision",
    vision:
      "To be a traditional medicine producer that brings real benefit to public health, with production standards we can stand behind.",
    missionLabel: "Mission",
    selectAriaPrefix: "Show mission: ",
    missions: [
      {
        title: "Islamic values and business ethics",
        desc: "Running our business on Islamic values and responsible business ethics.",
      },
      {
        title: "Halal, thayyib, and compliant",
        desc: "Producing traditional medicine in line with halal and thayyib principles and prevailing regulations.",
      },
      {
        title: "Accessible herbal products",
        desc: "Making quality herbal products more accessible to every part of society.",
      },
      {
        title: "Education and local economy",
        desc: "Contributing to health education and the empowerment of the local economy.",
      },
    ],
  },
  team: {
    eyebrow: "Our Team",
    heading: "The People Behind Every Batch",
    paragraph:
      "The team behind formulation, production, quality control, and client support.",
    members: [
      { name: "Team Member 1", role: "Position" },
      { name: "Team Member 2", role: "Position" },
      { name: "Team Member 3", role: "Position" },
      { name: "Team Member 4", role: "Position" },
      { name: "Team Member 5", role: "Position" },
      { name: "Team Member 6", role: "Position" },
      { name: "Team Member 7", role: "Position" },
      { name: "Team Member 8", role: "Position" },
    ],
  },
  beyondOffice: {
    eyebrow: "Beyond the Office",
    heading: "Beyond the Production Floor",
    paragraph:
      "Our team bonds on the production floor, and outside the office too.",
    items: [
      { alt: "Team activity outside the office 1" },
      { alt: "Team activity outside the office 2" },
      { alt: "Team activity outside the office 3" },
      { alt: "Team activity outside the office 4" },
      { alt: "Team activity outside the office 5" },
      { alt: "Team activity outside the office 6" },
      { alt: "Team activity outside the office 7" },
      { alt: "Team activity outside the office 8" },
    ],
  },
  pullQuote: {
    quote: "Now, it's your brand's turn to emerge.",
    attribution: "CV Al-Waliy Sejahtera, since 2014",
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    heading: "Still Have Questions?",
    badgeLetter: "Q",
    faqs: [
      {
        q: "What's the minimum order for the maklon service?",
        a: "Our minimum order is flexible and depends on the product type (capsules, liquid, or honey) and how complex the formula is. New brands starting small are welcome. During consultation, we'll work out the most efficient MOQ (Minimum Order Quantity) for you.",
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
        a: "Our payment scheme is flexible and adjusted to the scale of the partnership, typically in stages: a down payment upfront and the balance after production. Full details are discussed during consultation.",
      },
      {
        q: "Is packaging and design also provided?",
        a: "Yes, we provide packaging design and branding support as part of the service, so your product is market-ready with a clear brand identity.",
      },
    ],
  },
  cta: {
    eyebrow: "Contact Us",
    heading: "Ready to Launch Your Own Herbal Brand?",
    paragraph:
      "Ask us anything. We can help with product info, formulation, and planning your maklon production.",
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
    heading: "Want the Full Profile?",
    paragraph:
      "Download our company profile as a PDF: company overview, legal documents, and the types of maklon services we offer.",
    buttonLabel: "Download Company Profile",
  },
  navbar: {
    navLinks: [
      { label: "Who We Are", href: "#who" },
      { label: "What We Do", href: "#products" },
      { label: "Our Clients", href: "#clients" },
      { label: "Contact Us", href: "#contact" },
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
      "CV Al-Waliy Sejahtera, a trusted herbal manufacturer since 2014, now open for white-label (maklon) partnerships with your brand.",
    layananHeading: "Services",
    layananLinks: [
      { label: "Herbal Honey", href: "#products" },
      { label: "Capsules & Tablets", href: "#products" },
      { label: "Liquid / Syrup", href: "#products" },
    ],
    perusahaanHeading: "Company",
    perusahaanLinks: [
      { label: "Our Profile", href: "#who" },
      { label: "Partnership Process", href: "#workflow" },
      { label: "Certifications", href: "#certifications" },
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
