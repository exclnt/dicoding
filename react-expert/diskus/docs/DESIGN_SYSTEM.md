# Design System - Diskus

Dokumen ini mendefinisikan pedoman visual, warna, tipografi, dan gaya desain premium yang akan diterapkan pada platform **Diskus**.

---

## 1. Konsep & Estetika Visual
Aplikasi ini mengusung tema **"Futuristic Cyber Nebula"** yang mengombinasikan warna gelap mendalam, aksen neon (ungu & biru), efek **Glassmorphism (Frosted Glass)**, serta transisi animasi mikro yang halus untuk menciptakan kesan premium dan mewah.

---

## 2. Palet Warna (Color Palette)

### 2.1. Dark Mode (Default & Utama)
| Nama Token | Nilai HEX / HSL | Deskripsi |
| :--- | :--- | :--- |
| `--bg-space-dark` | `#0b0d19` / `hsl(232, 38%, 7%)` | Latar belakang aplikasi utama |
| `--bg-card-glass` | `rgba(20, 24, 46, 0.6)` | Latar belakang kartu/komponen frosted glass |
| `--border-glass` | `rgba(255, 255, 255, 0.08)` | Border luar efek kaca |
| `--primary-neon` | `#8b5cf6` / `hsl(263, 90%, 65%)` | Ungu neon untuk tombol utama & aksen aktif |
| `--secondary-neon`| `#06b6d4` / `hsl(189, 94%, 43%)` | Biru/Cyan neon untuk status, link, & upvote |
| `--accent-gold` | `#f59e0b` / `hsl(38, 92%, 50%)` | Emas untuk peringkat 1 leaderboard |
| `--text-primary` | `#f3f4f6` / `hsl(220, 14%, 96%)` | Warna teks utama |
| `--text-muted` | `#9ca3af` / `hsl(220, 9%, 65%)` | Warna teks redup/keterangan |

---

## 3. Tipografi
- **Font Utama**: **Outfit** atau **Inter** (diambil dari Google Fonts).
- **Hirarki Ukuran Font**:
  - `h1` (Judul Halaman): `2.25rem` (36px), Bold, tracking tight.
  - `h2` (Judul Thread Detail): `1.5rem` (24px), Semi-Bold.
  - `h3` (Judul Card): `1.125rem` (18px), Medium/Semi-Bold.
  - `body` (Konten/Komentar): `1rem` (16px), Regular, leading relaxed (`line-height: 1.6`).
  - `caption` (Meta-info): `0.875rem` (14px), Light/Regular.

---

## 4. Efek Glassmorphism (Frosted Glass Specification)
Setiap card atau container utama wajib menggunakan CSS class `.glass-card` dengan aturan styling berikut:
```css
.glass-card {
  background: rgba(20, 24, 46, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  border-color: rgba(139, 92, 246, 0.3); /* Neon glow on hover */
  transform: translateY(-2px);
  box-shadow: 0 12px 40px 0 rgba(139, 92, 246, 0.15);
}
```

---

## 5. Micro-Animations & Interaksi
- **Hover Button**: Efek scale sedikit (`scale(1.03)`) dengan transisi warna latar belakang menggunakan durasi `0.2s ease-in-out`.
- **Upvote Button**: Animasi pantulan (bounce/scale jump) ketika tombol di-click sebagai respon balik visual yang memuaskan.
- **Form Input Glow**: Ketika input text aktif (focus), berikan border glow neon ungu:
  ```css
  input:focus {
    outline: none;
    border-color: var(--primary-neon);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.4);
  }
  ```

---

## 6. Layout & Responsivitas
- **Grid / Flexbox**: Menggunakan Flexbox untuk komponen baris dan Grid untuk penataan list.
- **Max Width**: Kontainer halaman utama maksimal `1200px` dengan padding kiri-kanan `1.5rem` (`24px`).
- **Breakpoints**:
  - Mobile: `< 640px` (Navbar ringkas, layout satu kolom penuh).
  - Tablet: `640px` s.d. `1024px` (Dua kolom: feed di kiri, leaderboard/sidebar di kanan jika ada).
  - Desktop: `> 1024px` (Sidebar filter + Feed utama + Leaderboard panel).
