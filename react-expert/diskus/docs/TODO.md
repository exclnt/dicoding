# Project Implementation Checklist (TODO List) - Diskus

Dokumen ini berisi daftar tugas terperinci untuk membangun aplikasi **Diskus**. Proyek dibagi menjadi 6 fase utama yang dapat dieksekusi secara berurutan.

---

## 🏁 Fase 1: Setup Proyek & Pustaka Dependensi
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Instalasi Paket Dependensi**:
  - `react-router-dom` (untuk navigasi)
  - `lucide-react` (untuk ikon modern)
  - `@reduxjs/toolkit` (untuk state management terprediksi)
  - `react-redux` (React bindings untuk Redux)
  - `react-redux-loading-bar` (Indikator Loading untuk Redux - Kriteria Utama 1.7)
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Desain Token & Global CSS**:
  - Membuat [variables.css](file:///C:/Users/ekor4/Projek/react/diskus/src/styles/variables.css) yang berisi seluruh design token (warna neon, gradasi, font, glassmorphism style).
  - Mengonfigurasi ulang [index.css](file:///C:/Users/ekor4/Projek/react/diskus/src/index.css) untuk mengimpor variabel CSS dan me-reset gaya global web.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Setup Router & Struktur Dasar**:
  - Mengonfigurasi React Router di [App.jsx](file:///C:/Users/ekor4/Projek/react/diskus/src/App.jsx).
  - Membuat placeholder untuk seluruh halaman di folder `src/pages`.

---

## 🔐 Fase 2: Autentikasi, Setup Redux & Integrasi API User
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Setup Redux Store**:
  - Membuat Redux Store di `src/app/store.js` dan mendaftarkan `loadingBarReducer`.
  - Membungkus `<App />` dengan `<Provider store={store}>` dan `<React.StrictMode>` (Kriteria Utama 2.4) di `src/main.jsx`.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Membuat Auth / User Slice dengan AsyncThunk**:
  - Membuat `src/features/auth/userSlice.js`.
  - Mengimplementasikan AsyncThunk `asyncRegisterUser` untuk memanggil `POST /register`.
  - Mengimplementasikan AsyncThunk `asyncLoginUser` untuk memanggil `POST /login` dan menyimpan token JWT di `localStorage`.
  - Mengimplementasikan AsyncThunk `asyncGetOwnProfile` untuk memanggil `GET /users/me` (menggunakan Bearer token).
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Membuat Halaman Login & Register**:
  - Mendesain UI form login & register yang premium, futuristik, dan memiliki feedback error/loading yang jelas.
  - Menggunakan `useDispatch` untuk memicu aksi login/register, dan `useSelector` untuk membaca status autentikasi.

---

## 📝 Fase 3: Pengelolaan & Penayangan Thread (API /threads)
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Membuat Thread Slice dengan AsyncThunk**:
  - Membuat `src/features/threads/threadSlice.js`.
  - Mengimplementasikan AsyncThunk `asyncFetchThreads` untuk mengambil seluruh thread dari `GET /threads`.
  - Mengimplementasikan AsyncThunk `asyncCreateThread` untuk mengirim data thread baru ke `POST /threads`.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Membuat Halaman Home (Feed Thread)**:
  - Mengambil daftar thread secara real-time dari API.
  - Implementasi penyaringan (filter) berdasarkan kategori/tag thread yang didapatkan dari respons API.
  - Implementasi fitur pencarian dan pengurutan thread.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Membuat Komponen Reusable & Indikator Loading**:
  - Menampilkan `<LoadingBar />` dari `react-redux-loading-bar` di bagian paling atas aplikasi (Navbar/Header).
  - [Navbar.jsx](file:///C:/Users/ekor4/Projek/react/diskus/src/components/Navbar.jsx) dengan gaya frosted glass yang transparan, sticky, dan menampilkan avatar/nama pengguna yang sedang login.
  - [ThreadCard.jsx](file:///C:/Users/ekor4/Projek/react/diskus/src/components/ThreadCard.jsx) untuk menampilkan ringkasan thread secara artistik.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Membuat Halaman Buat Thread**:
  - Form input dengan validasi konten, kategori, dan judul.
  - Melakukan `dispatch(asyncCreateThread(...))` setelah submit dan mengalihkan navigasi kembali ke halaman utama jika berhasil.

---

## 💬 Fase 4: Fitur Interaksi (Voting & Komentar)
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Sistem Voting Thread & Komentar dengan Optimistic Update (Saran 1)**:
  - Mengimplementasikan AsyncThunk di `threadSlice.js` untuk:
    - Upvote Thread (`POST /threads/{threadId}/up-vote`)
    - Downvote Thread (`POST /threads/{threadId}/down-vote`)
    - Neutral Vote Thread (`POST /threads/{threadId}/neutral-vote`)
  - Mengimplementasikan logika **Optimistic Update** pada reducers di `threadSlice.js` agar total vote dan status tombol upvote/downvote segera berubah di UI sesaat setelah tombol diklik, sebelum respons API selesai.
  - Menghubungkan tombol voting di komponen kartu dan detail thread ke aksi Redux tersebut.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Detail Thread & Kolom Komentar**:
  - Membuat halaman detail thread lengkap beserta daftar komentarnya.
  - Membuat form tambah komentar dengan validasi input.
  - Mengimplementasikan AsyncThunk `asyncAddComment` untuk mengirim komentar ke `POST /threads/{threadId}/comments`.

---

## 🏆 Fase 5: Leaderboard Keaktifan & Halaman Profil
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Integrasi API Leaderboard (Saran 2)**:
  - Mengimplementasikan AsyncThunk `asyncFetchLeaderboards` di dalam user/leaderboard slice untuk memanggil `GET /leaderboards`.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Membuat Halaman Leaderboard**:
  - Menampilkan daftar peringkat pengguna teraktif berdasarkan data asli yang dikalkulasi backend Dicoding (Nama, Avatar, Score).
  - Desain UI papan peringkat yang premium, bersih, dengan efek bersinar untuk peringkat 3 besar.
- [x] (Selesai pada 10 Agustus 2026, 10:54) **Membuat Halaman Profil User**:
  - Menampilkan informasi profil pengguna saat ini, total skor dari leaderboard, dan kumpulan thread yang relevan.

---

## ✨ Fase 6: Polish UI, ESLint Linter Check & Uji Coba
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Pemeriksaan Linter ESLint (Kriteria Utama 2.1 - 2.3)**:
  - Menjalankan perintah `npx eslint .` untuk memeriksa error.
  - Memperbaiki seluruh bugs/error hasil sorotan linter hingga tidak ada error linter yang tersisa.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Micro-animations & Transisi**:
  - Menambahkan transisi halaman yang mulus.
  - Hover effects dengan glow ungu/cyan pada tombol utama.
- [x] (Selesai pada 10 Agustus 2026, 10:27) **Review Responsivitas & SEO**:
  - Menguji performa layout di layar handphone dan desktop.
  - Menambahkan meta title dan deskripsi yang dinamis saat berpindah halaman.
  - Memastikan struktur tag HTML (`<header>`, `<main>`, `<section>`, `<h1>`) tersusun secara logis.
