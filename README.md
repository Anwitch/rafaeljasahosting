# WebGIS – Sistem Pemetaan Praktikum SIG

> Portal Aplikasi pemetaan geospasial (*WebGIS*) interaktif terintegrasi MySQL dan PHP untuk Praktikum Sistem Informasi Geografis (SIG).

Proyek ini telah dikembangkan secara bertahap dari pemetaan titik sederhana hingga sistem distribusi bansos berbasis jangkauan rumah ibadah dengan analitik terpadu.

---

## 🗂️ Struktur Direktori Proyek

Proyek ini dibagi menjadi 3 tahap pembelajaran (pertemuan):

*   **`pertemuan_1/`**: Fokus pada pengenalan LeafletJS dan digitasi **Point (Titik)** untuk mendata lokasi, fasilitas, dan detail operasional Stasiun Bahan Bakar Umum (SPBU).
*   **`pertemuan_2/`**: Pengembangan lanjutan dengan menambahkan fitur **Polyline (Garis)** untuk memetakan infrastruktur ruas jalan, serta **Polygon (Area/Poligon)** untuk memetakan parsil tanah lengkap dengan status kepemilikannya.
*   **`pertemuan_3/`**: Implementasi sistem distribusi Bansos secara utuh menggunakan radius spasial (Buffer 300m) di sekitar Rumah Ibadah, digabungkan dengan **Dashboard Analitik** interaktif.
*   **`api/`**: Backend REST API menggunakan PHP (PDO) untuk menghubungkan aplikasi dengan database MySQL.
*   **`database.sql`**: File *dump* skema struktur tabel MySQL.
*   **`index.html`**: *Landing Page* utama untuk memudahkan akses dan navigasi ke setiap pertemuan.

---

## 🏗️ Arsitektur & Teknologi

Aplikasi ini tidak lagi menggunakan `localStorage` peramban, melainkan sudah memigrasikan penyimpanannya ke arsitektur *Client-Server*:

1.  **Frontend**: HTML5, Vanilla JavaScript (ES6+), Vanilla CSS.
2.  **Mapping Library**: [Leaflet.js](https://leafletjs.com/) & [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw).
3.  **Backend API**: PHP 8+ dengan PDO.
4.  **Database**: MySQL / MariaDB (via XAMPP).

Semua data geospasial (titik, garis, poligon) disimpan di MySQL secara fleksibel dalam kolom berformat `JSON`.

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

Karena aplikasi ini sekarang menggunakan **PHP dan MySQL**, Anda tidak bisa langsung membuka file HTML-nya. Ikuti langkah berikut menggunakan **XAMPP**:

### 1. Persiapan Database
1. Buka aplikasi **XAMPP Control Panel**.
2. Pastikan modul **Apache** dan **MySQL** telah berjalan (*Start*).
3. Buka [http://localhost/phpmyadmin](http://localhost/phpmyadmin) di *browser* Anda.
4. Buat *database* baru dengan nama: **`webgis_bansos`**.
5. Pilih tab **Import**, masukkan file `database.sql` yang ada di direktori utama, lalu klik **Go**.

### 2. Menjalankan Aplikasi
Pilih salah satu dari 2 cara berikut:

**Cara A: Memindahkan Folder (Rekomendasi XAMPP)**
1. Pindahkan atau *copy* seluruh folder proyek ini ke dalam folder instalasi XAMPP: `C:\xampp\htdocs\`.
2. Ubah nama foldernya menjadi sesuatu yang mudah, misal `webgis-project`.
3. Buka browser dan akses URL: **`http://localhost/webgis-project`**

**Cara B: Menggunakan PHP Built-in Server (Tanpa Pindah Folder)**
1. Buka Terminal/Command Prompt di dalam folder proyek ini.
2. Jalankan perintah:
   ```bash
   php -S localhost:8000
   ```
3. Buka browser dan akses URL: **`http://localhost:8000`**

---

## 🗺️ Panduan Modifikasi & Pengembangan

| Jika Anda Ingin... | File yang Harus Diedit |
|--------------------|------------------------|
| Mengubah detail database / *password* MySQL | `api/db.php` |
| Mengubah logika simpan/hapus/ambil data | `api/index.php` |
| Mengubah warna marker/ikon/label layer | `js/config/config.js` *(di dalam folder pertemuan)* |
| Menambah/mengubah form isian data atribut | `js/components/forms.js` *(di dalam folder pertemuan)* |
| Mengubah integrasi API URL (jalur lokal) | `js/utils/store.js` *(di dalam folder pertemuan)* |
| Mengubah *user interface* UI utama | `css/style.css` *(di dalam folder pertemuan)* |

---

## 📄 Lisensi

Proyek ini dikembangkan oleh **Rafael Gerhard Panjaitan** untuk keperluan akademik.
Bebas digunakan dan dimodifikasi untuk keperluan pembelajaran dan non-komersial.
