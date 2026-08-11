# Product Requirement Document (PRD) - Diskus (Dicoding Submission Alignment)

## 1. Pendahuluan
**Diskus** adalah platform diskusi berbasis web yang dibangun untuk memenuhi kriteria submission kelas **Menjadi React Web Developer Expert** di Dicoding. Aplikasi berintegrasi secara penuh dengan **Dicoding Forum API (v1)** (`https://forum-api.dicoding.dev/v1`) dan dirancang menggunakan **React, Redux Toolkit, React Strict Mode,** serta dipastikan lulus dari pemeriksaan linter **ESLint**.

---

## 2. Tujuan Proyek
- Membangun aplikasi Forum Diskusi yang terintegrasi penuh dengan backend Dicoding Forum API.
- Mengelola state asinkron secara terprediksi menggunakan Redux Store.
- Menyajikan visual antarmuka premium ("Futuristic Cyber Nebula") dengan performa tinggi dan bebas bug linter.

---

## 3. Fitur Utama & Kriteria Fungsionalitas (Sesuai Kriteria Submission)

### 3.1. Autentikasi & Manajemen Pengguna (Kriteria Utama 1.1 & 1.2)
- **Registrasi**: Halaman pendaftaran akun baru (`POST /register`) dengan field `name`, `email`, dan `password` (minimal 6 karakter).
- **Login**: Halaman masuk akun (`POST /login`) untuk mendapatkan JWT Access Token.
- **Session Persistence**: JWT disimpan secara aman di `localStorage` untuk menjaga sesi login.

### 3.2. Penayangan Thread (Kriteria Utama 1.3 & Kriteria Asosiasi)
- **Halaman Daftar Thread (Home Feed)**:
  - Menampilkan daftar thread dari API (`GET /threads`).
  - Setiap item thread wajib memuat informasi:
    - Judul thread.
    - Potongan isi (body) thread.
    - Waktu pembuatan thread (diformat secara ramah pembaca).
    - Jumlah komentar.
    - Nama & Avatar pembuat thread.
- **Filter Kategori (Saran 3)**: Fitur untuk mem-filter item thread berdasarkan kategori di halaman utama, diolah murni di sisi front-end.

### 3.3. Detail Thread & Komentar (Kriteria Utama 1.4 & 1.6)
- **Halaman Detail Thread** (`GET /threads/{threadId}`):
  - Menampilkan Judul, Body lengkap, Waktu pembuatan, serta Nama & Avatar pembuat thread.
  - Menampilkan daftar komentar yang memuat: Konten komentar, Waktu pembuatan komentar, serta Nama & Avatar pembuat komentar.
- **Membuat Komentar**: Kolom komentar di halaman detail thread (`POST /threads/{threadId}/comments`) yang hanya bisa diakses oleh pengguna yang sudah terotentikasi.

### 3.4. Membuat Thread Baru (Kriteria Utama 1.5)
- Halaman form pembuatan thread (`POST /threads`) dengan field `title`, `body`, dan `category`. Akses wajib terotentikasi.

### 3.5. Indikator Loading (Kriteria Utama 1.7)
- Menampilkan komponen **Loading Indicator** (misalnya menggunakan React Redux Loading Bar atau animasi loading kustom) di bagian atas halaman saat memuat data dari API untuk memberikan feedback visual yang baik ke pengguna.

### 3.6. Sistem Voting (Saran 1 - Upvote / Downvote / Neutral)
- Menyediakan tombol voting pada thread dan komentar (`POST /threads/{threadId}/up-vote`, dll).
- Memberikan feedback visual yang jelas jika user telah mem-vote item (misal mengubah warna tombol dari abu-abu menjadi ungu/biru neon).
- Menerapkan **Optimistic Update (Optimistically Apply Actions)** pada Redux store agar antarmuka merespons secara instan sebelum respons server selesai.
- Menampilkan jumlah total vote secara real-time.

### 3.7. Leaderboard (Saran 2)
- Halaman khusus menampilkan daftar klasemen keaktifan user (`GET /leaderboards`).
- Setiap item menampilkan Nama pengguna, Avatar, dan Skor keaktifan.

---

## 4. Kriteria Teknis & Kepatuhan (Kriteria Utama 2 & 3)
- **State Redux**: Seluruh global state yang bersumber dari API disimpan di Redux Store. Form input lokal dikelola dengan local component state (`useState`).
- **Pemisahan Logika & UI**: Kode state (slices, actions, thunks) diletakkan terpisah dari kode komponen UI.
- **React Strict Mode & ESLint**:
  - Aplikasi dibungkus dengan `<React.StrictMode>`.
  - Wajib lulus pemeriksaan aturan linter ESLint tanpa adanya error/warning yang menghalangi build produksi.
  - Tidak ada pemanggilan REST API langsung di dalam lifecycle atau `useEffect` komponen; semua pemanggilan API wajib melalui Redux Thunk.


