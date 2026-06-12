# WebGIS – Sistem Distribusi Bansos Berbasis Rumah Ibadah

> Aplikasi pemetaan geospasial (*WebGIS*) interaktif untuk pendataan infrastruktur, profil warga rentan, dan perencanaan distribusi Bantuan Sosial (Bansos) berbasis jangkauan Rumah Ibadah.

Aplikasi ini menggunakan pendekatan **radius spasial 300 meter** untuk secara otomatis mendeteksi apakah seorang warga masuk dalam jangkauan agen distribusi (Rumah Ibadah) atau tidak — membantu pemerintah desa/kelurahan dalam pengambilan keputusan yang akurat dan berbasis data.

---

## 📌 Fitur Utama

| No | Fitur | Tipe Layer | Deskripsi |
|----|-------|-----------|-----------|
| 1 | **Warga & Bansos** | Point | Profil lengkap KK (ekonomi, kesehatan, pendidikan) + riwayat bansos |
| 2 | **Rumah Ibadah** | Point + Buffer | Titik *hub* distribusi bansos; lingkaran jangkauan 300m otomatis |
| 3 | **SPBU** | Point | Ketersediaan BBM & aksesibilitas |
| 4 | **Jalan** | Polyline | Status, kondisi, dan dampak sosial ruas jalan |
| 5 | **Parsil Tanah** | Polygon | Status kepemilikan sertifikat tanah |
| 6 | **Dashboard Analitik** | — | Ringkasan kemiskinan, distribusi bansos, dan rekomendasi kebijakan |

---

## 🗂️ Data yang Dikumpulkan

### 👨‍👩‍👧 Warga & Bansos
Data yang dikumpulkan mencakup 5 dimensi:
- **Data KK:** Nama, NIK, No. KK, jumlah anggota, alamat, tingkat kemiskinan
- **Ekonomi:** Pendapatan, pekerjaan, kondisi rumah, aset, air bersih, listrik
- **Pendidikan:** Tingkat pendidikan, jumlah anak sekolah/putus sekolah, penerima KIP
- **Kesehatan:** Kepesertaan BPJS, jenis penyakit kronis, anggota difabel
- **Riwayat Bansos:** Program (PKH, BPNT, BLT, dll), tahun, dan status penerimaan

### 🕌 Rumah Ibadah
Nama, jenis (Masjid/Gereja/Pura/dll), pengurus, kapasitas jamaah, radius binaan, program sosial aktif, dan alokasi dana sosial per bulan.

### ⛽ SPBU
Nama, jam operasional (24 jam / tidak), jenis BBM, harga, dan aksesibilitas disabilitas.

### 🛣️ Jalan
Nama ruas, status (Nasional/Provinsi/Kabupaten/Desa), kondisi, lebar, tahun perbaikan, dan dampak sosial.

### 🏗️ Parsil Tanah
Nama, NIB, status sertifikat (SHM/HGB/HGU/dll), NJOP, penggunaan lahan, dan status sengketa.

---

## 🏗️ Arsitektur & Struktur Folder

Aplikasi ini dibangun menggunakan arsitektur **modular Vanilla JavaScript** tanpa *build tool* atau *framework*, sehingga bisa langsung dijalankan di browser.

```text
webgis/
├── index.html                  # Halaman utama & markup HTML
├── README.md                   # Dokumentasi proyek ini
├── css/
│   └── style.css               # Seluruh styling & tema UI
└── js/
    ├── app.js                  # Root: Inisialisasi & event binding utama
    ├── config/
    │   └── config.js           # CFG: Kontrak data (warna, label, atribut tiap layer)
    ├── utils/
    │   ├── helpers.js          # H: Utilitas (uid, format angka/jarak/luas, geometri)
    │   ├── store.js            # Store: Baca/tulis LocalStorage
    │   └── toast.js            # Toast: Notifikasi UI (sukses/error/info)
    ├── components/
    │   ├── forms.js            # Forms: Generator HTML form input per layer
    │   ├── popup.js            # Popup: Generator HTML popup Leaflet per layer
    │   ├── card.js             # Card: Generator HTML item daftar di sidebar
    │   └── legend.js           # renderLegend: Fungsi render legenda peta
    └── modules/
        ├── map.js              # renderMap: Render semua marker/layer ke peta
        ├── draw.js             # Draw: Integrasi Leaflet Draw (titik, garis, poligon)
        ├── modal.js            # Modal: Manajemen pop-up form tambah/edit
        ├── sidebar.js          # renderSidebar, updateBadges, highlightCard
        └── dashboard.js        # Dashboard: Kalkulasi analitik & render statistik
```

---

## 💾 Penyimpanan Data (LocalStorage)

Semua data tersimpan di *LocalStorage* browser Anda menggunakan key berikut:

| Layer | LocalStorage Key |
|-------|-----------------|
| SPBU | `wg2_spbu` |
| Jalan | `wg2_jalan` |
| Parsil Tanah | `wg2_parsil` |
| Warga & Bansos | `wg2_warga` |
| Rumah Ibadah | `wg2_ri` |

> **Catatan Penting:** Data tersimpan di browser lokal Anda. Untuk memindahkan data ke perangkat lain, gunakan fitur *Export/Import* browser atau salin nilai dari DevTools > Application > LocalStorage.

---

## 🚀 Cara Menjalankan

Tidak perlu instalasi apapun! Cukup:

1. Unduh atau *clone* repositori ini:
   ```bash
   git clone <url-repo>
   ```
2. Buka folder `webgis/`.
3. Klik dua kali pada **`index.html`** untuk membukanya langsung di browser.
4. Aplikasi siap digunakan. ✅

> Direkomendasikan menggunakan **Google Chrome** atau **Mozilla Firefox** versi terbaru.
> Anda juga bisa menggunakan ekstensi **Live Server** di VSCode untuk pengalaman pengembangan yang lebih baik.

---

## 🗺️ Panduan Penggunaan

### Menambah Data Baru
1. Pilih layer yang ingin diisi melalui **navigasi tab** di bagian atas (SPBU, Jalan, Parsil, Warga, Rumah Ibadah).
2. Klik tombol **`+ Tambah`** di sidebar kiri.
3. **Klik pada peta** untuk menandai lokasi (untuk Point), atau **gambar garis/poligon** (untuk Jalan/Parsil).
4. Isi formulir atribut yang muncul, lalu klik **Simpan Data**.

### Mengedit atau Menghapus Data
- Klik marker/layer di peta → Popup muncul → Klik **Edit** atau **Hapus**.
- Atau klik kartu di sidebar → gunakan tombol **Edit** / **Hapus** / **Zoom**.

### Melihat Dashboard Analitik
- Klik tombol **📊 Dashboard Analitik** di topbar kanan.
- Tab **Ringkasan Utama**: Statistik jumlah KK, distribusi kemiskinan, status jalan.
- Tab **Distribusi Bansos**: Peta panas jangkauan Rumah Ibadah, beban distribusi per *hub*.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| HTML5 & CSS3 | — | Struktur & tampilan UI |
| Vanilla JavaScript | ES6+ | Logika aplikasi & state management |
| [Leaflet.js](https://leafletjs.com/) | 1.9.4 | Render peta interaktif |
| [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw) | 1.0.4 | Digitasi titik, garis, dan poligon |
| [DM Sans & DM Mono](https://fonts.google.com/) | — | Tipografi UI |
| LocalStorage API | — | Basis data *client-side* |
| OpenStreetMap | — | Tile peta dasar |

---

## 🔧 Panduan Modifikasi Kode

| Ingin mengubah... | Buka file... |
|-------------------|--------------|
| Warna marker atau label layer | [`js/config/config.js`](js/config/config.js) |
| Isian form input | [`js/components/forms.js`](js/components/forms.js) |
| Tampilan popup peta | [`js/components/popup.js`](js/components/popup.js) |
| Tampilan kartu di sidebar | [`js/components/card.js`](js/components/card.js) |
| Logika & tampilan dashboard | [`js/modules/dashboard.js`](js/modules/dashboard.js) |
| Cara layer dirender di peta | [`js/modules/map.js`](js/modules/map.js) |
| Tema / warna UI global | [`css/style.css`](css/style.css) |

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik mata kuliah **Sistem Informasi Geografis (SIG)**. Bebas digunakan dan dimodifikasi untuk keperluan non-komersial.

---

*Dikembangkan dengan ❤️ untuk mendukung pemerataan distribusi Bantuan Sosial berbasis data geospasial.*
