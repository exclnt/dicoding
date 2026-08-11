# Architecture & Tech Stack - Diskus

Dokumen ini menjelaskan arsitektur teknis, struktur folder, dan sistem penyimpanan data (state management & persistence) yang digunakan pada proyek **Diskus**.

---

## 1. Stack Teknologi
- **Framework**: React 18+ (Vite)
- **Routing**: `react-router-dom` (v6+) untuk navigasi multi-halaman.
- **Styling**: Vanilla CSS (CSS Variables + CSS Modules/Utility) untuk performa optimal dan kontrol penuh atas estetika premium.
- **Icons**: `lucide-react` untuk ikon-ikon modern yang konsisten.
- **State Management & Persistence**:
  - **Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)**: Digunakan untuk mengelola Global State yang terprediksi perubahannya (Auth state, Active Users, Thread Data).
  - **LocalStorage**: Sebagai database lokal (Mock DB) agar data tidak hilang ketika halaman direfresh.
- **Linter & Quality Control (Kriteria Utama 2)**:
  - **ESLint**: Menggunakan ESLint (berkas konfigurasi sudah ada di root) untuk mematuhi standardisasi *Style Guide*.
  - **React Strict Mode**: Mengaktifkan Strict Mode di file entry (`main.jsx`) untuk menangkap potensi bug sedini mungkin.
- **Arsitektur Pemisahan State & UI (Kriteria Utama 3)**:
  - Seluruh status/pemanggilan REST API dikelola eksklusif melalui Redux Slices & AsyncThunks.
  - Komponen UI hanya bertindak sebagai visual render dan pemicu aksi (`dispatch`).
  - Tidak ada pemanggilan API langsung (`fetch` atau `axios`) dalam React lifecycle (`useEffect` atau *class component lifecycles*).

---

## 2. Struktur Folder (Project Directory Structure)
Berikut adalah struktur folder yang direncanakan untuk proyek ini:

```
diskus/
├── docs/                      # Dokumen perencanaan proyek (PRD, Architecture, dll)
├── public/                    # Aset statis public
├── src/
│   ├── assets/                # Gambar, logo, dan file media lokal
│   ├── components/            # Komponen reusable
│   │   ├── Button.jsx         # Custom button dengan hover effect premium
│   │   ├── Card.jsx           # Kontainer glassmorphism
│   │   ├── Navbar.jsx         # Navigasi utama (sticky & transparent glass)
│   │   ├── ThreadCard.jsx     # Preview thread untuk halaman feed
│   │   ├── CommentSection.jsx # Area komentar
│   │   └── LeaderboardRow.jsx # Baris daftar peringkat leaderboard
│   ├── features/              # Redux Slices (Slices & Thunks)
│   │   ├── auth/              # Fitur Autentikasi (userSlice.js)
│   │   │   └── userSlice.js   # State login, register, logout, score updates
│   │   └── threads/           # Fitur Thread & Komentar (threadSlice.js)
│   │       └── threadSlice.js # State list thread, detail, vote, komentar
│   ├── app/                   # Redux Store Setup
│   │   └── store.js           # Konfigurasi store pusat Redux
│   ├── hooks/                 # Custom React Hooks (useAppDispatch, useAppSelector)
│   ├── pages/                 # Halaman-halaman utama (Routing views)
│   │   ├── Home.jsx           # Feed thread utama
│   │   ├── Login.jsx          # Form login dengan animasi transisi
│   │   ├── Register.jsx       # Form register dengan pilihan avatar
│   │   ├── CreateThread.jsx   # Halaman pembuatan thread baru
│   │   ├── ThreadDetail.jsx   # Halaman isi thread & komentar
│   │   └── Leaderboard.jsx    # Papan peringkat user aktif
│   ├── styles/                # CSS Modular dan Global
│   │   ├── variables.css      # Desain token (Color, Spacing, Shadows)
│   │   └── index.css          # Reset CSS global & utility classes
│   ├── App.jsx                # Komponen utama penampung Router & Provider
│   └── main.jsx               # Entry point aplikasi (terbungkus <React.StrictMode>)
├── package.json
└── vite.config.js
```

## 3. Integrasi & Endpoint Dicoding Forum API (v1)
Aplikasi terintegrasi dengan REST API publik dari Dicoding: `https://forum-api.dicoding.dev/v1`.

### 3.1. Daftar Endpoint API Utama

| Kategori | Fitur / Aksi | HTTP Method | Endpoint Path | Autentikasi | Request Body / Payload |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | Registrasi User | `POST` | `/register` | Tidak | `{ "name": "...", "email": "...", "password": "..." }` |
| **Auth** | Login | `POST` | `/login` | Tidak | `{ "email": "...", "password": "..." }` |
| **Users** | Daftar Semua User | `GET` | `/users` | Tidak | *None* |
| **Users** | Profil Saya | `GET` | `/users/me` | **Ya (Bearer)** | *None* |
| **Threads**| Buat Thread | `POST` | `/threads` | **Ya (Bearer)** | `{ "title": "...", "body": "...", "category": "..." }` |
| **Threads**| Daftar Semua Thread| `GET` | `/threads` | Tidak | *None* |
| **Threads**| Detail Thread | `GET` | `/threads/{threadId}`| Tidak | *None* |
| **Comments**| Buat Komentar | `POST` | `/threads/{threadId}/comments` | **Ya (Bearer)** | `{ "content": "..." }` |
| **Votes** | Upvote Thread | `POST` | `/threads/{threadId}/up-vote` | **Ya (Bearer)** | *None* |
| **Votes** | Downvote Thread | `POST` | `/threads/{threadId}/down-vote` | **Ya (Bearer)** | *None* |
| **Votes** | Netralkan Vote Thread| `POST`| `/threads/{threadId}/neutral-vote`| **Ya (Bearer)**| *None* |
| **Votes** | Upvote Komentar | `POST` | `/threads/{threadId}/comments/{commentId}/up-vote`| **Ya (Bearer)**| *None* |
| **Votes** | Downvote Komentar | `POST`| `/threads/{threadId}/comments/{commentId}/down-vote`| **Ya (Bearer)**| *None* |
| **Votes** | Netralkan Vote Komentar| `POST`| `/threads/{threadId}/comments/{commentId}/neutral-vote`| **Ya (Bearer)**| *None* |
| **Leader** | Ambil Leaderboard | `GET` | `/leaderboards` | Tidak | *None* |

### 3.2. Struktur Respons Payload Utama
Contoh respons sukses dari API:
- **Login Response (`POST /login`)**:
  ```json
  {
    "status": "success",
    "message": "ok",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Thread List Response (`GET /threads`)**:
  ```json
  {
    "status": "success",
    "message": "ok",
    "data": {
      "threads": [
        {
          "id": "thread-1",
          "title": "Thread Title",
          "body": "Thread Body",
          "category": "General",
          "createdAt": "2026-08-10T10:00:00.000Z",
          "ownerId": "user-1",
          "upVotesBy": ["user-2"],
          "downVotesBy": [],
          "totalComments": 5
        }
      ]
    }
  }
  ```
- **Leaderboard Response (`GET /leaderboards`)**:
  ```json
  {
    "status": "success",
    "message": "ok",
    "data": {
      "leaderboards": [
        {
          "user": {
            "id": "user-1",
            "name": "Eko Developer",
            "email": "eko@example.com",
            "avatar": "https://generated-avatar-url..."
          },
          "score": 100
        }
      ]
    }
  }
  ```

---

## 4. Mekanisme State Flow (Data Flow dengan Redux & AsyncThunks)
1. **Pemuatan Awal (Initial Load)**: Saat aplikasi dibuka, Redux Store diinisialisasi. Token JWT yang disimpan di `localStorage` diperiksa. Jika ada, profile user diambil melalui `dispatch(asyncGetOwnProfile())`.
2. **Autentikasi**: State `currentUser` dikelola di dalam `userSlice` (`auth` feature). Aksi register dan login dilakukan menggunakan **AsyncThunk** untuk memanggil API `/register` dan `/login` secara asinkron.
3. **Manajemen Thread & Komentar**: Dikelola oleh `threadSlice`. Thunk async seperti `asyncFetchThreads` atau `asyncCreateThread` bertanggung jawab atas operasi jaringan, sementara reducer murni mengelola data `threads`, `detailThread`, dan status *loading/error*.
4. **Leaderboard Keaktifan**: Halaman Leaderboard akan melakukan *dispatch* `asyncFetchLeaderboards` ketika dimuat untuk mengambil peringkat keaktifan real-time dari API `/leaderboards` dan menampilkannya langsung tanpa manipulasi skor manual di frontend.
5. **State Persist**: Token auth disimpan di `localStorage` untuk memulihkan sesi login saat reload halaman. Data forum tidak perlu disimpan di `localStorage` karena dapat langsung di-fetch dari API.
