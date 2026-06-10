# Rencana Penggabungan (Merge) & Pembaruan Fitur

## Tujuan
1. **Penggabungan Folder:** Menghapus folder `webgis` yang lama (karena sudah usang) dan mengubah nama folder `webgis02` menjadi `webgis`. Hal ini dilakukan agar proyek menjadi satu kesatuan (tidak terpisah-pisah) dan tetap mempertahankan kode versi terbaru yang ada di `webgis02`.
2. **Penggabungan Fitur Warga & Bansos:** Menggabungkan layer "Warga Miskin" dan "Rumah Bansos" menjadi satu layer tunggal **"Pendataan Warga & Bansos"** (`warga`). Tujuannya adalah menyederhanakan proses pendataan warga sekitar sekaligus menandai warga mana saja yang menerima bansos, tanpa harus membuat titik/layer yang terpisah.
3. **Fungsi Rumah Ibadah:** Tetap menggunakan Rumah Ibadah sebagai "Hub" (radius 300m) untuk mendistribusikan bansos kepada warga yang terdata di sekitarnya.

> [!WARNING]
> **User Review Required**
> Proses ini akan **menghapus folder `webgis` lama** dan mengganti nama `webgis02` menjadi `webgis`. Harap pastikan tidak ada kode penting di `webgis` lama yang belum dipindahkan. Silakan setujui rencana ini untuk mulai mengeksekusi!

---

## Proposed Changes

### 1. Konsolidasi Folder
- Menghapus folder `webgis` lama.
- Me-rename folder `webgis02` menjadi `webgis`.

### 2. Penggabungan Layer "Warga" dan "Bansos" di `webgis/app.js`

#### [MODIFY] `app.js`
- **Konfigurasi Layer (`CFG`)**:
  - Menghapus konfigurasi `CFG.bansos`.
  - Memperbarui `CFG.warga` dengan ikon, warna, dan status penerimaan gabungan.
- **Form UI (`Forms.warga`)**:
  - Mengadopsi sistem multi-tab yang sebelumnya kita buat untuk bansos (Data KK, Ekonomi, Pendidikan, Kesehatan, Riwayat Bansos) ke dalam form `warga`.
- **Popup & Card (`Popup.warga` & `Card.warga`)**:
  - Memperbarui informasi popup dan card agar menampilkan status jangkauan (radius) dan riwayat bansos warga.
- **Render Map (`renderMap`)**:
  - Menghapus logic render khusus `bansos`.
  - Mengimplementasikan kalkulasi radius `rumahIbadah` langsung ke marker `warga` (menandai warga mana yang masuk jangkauan 300m).
- **Dashboard Analitik (`Dashboard.render`)**:
  - Memperbarui tab "Ringkasan" dan "Distribusi" agar membaca data gabungan dari database `warga`.

### 3. Pembersihan di `webgis/index.html`
#### [MODIFY] `index.html`
- Menghapus tab navigasi (nav-pill) untuk "Rumah Bansos", menyisakan 5 tab (SPBU, Jalan, Parsil, Warga & Bansos, Rumah Ibadah).

---

## Verification Plan

### Manual Verification
1. Verifikasi struktur folder hanya tersisa 1 direktori utama (`webgis`).
2. Buka `webgis/index.html` di browser.
3. Klik tab "Warga & Bansos" dan coba tambahkan data. Form multi-tab harus muncul lengkap.
4. Aktifkan tab "Rumah Ibadah" dan periksa apakah lingkaran radius 300m tergambar dan Warga di sekitarnya mendapatkan tanda terjangkau.
5. Periksa Dashboard Analitik, pastikan data warga dan distribusi bansos terbaca dengan benar.
