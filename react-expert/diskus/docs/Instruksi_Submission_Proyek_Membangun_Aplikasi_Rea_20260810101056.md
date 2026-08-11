# Instruksi Submission Proyek: Membangun Aplikasi React dengan Redux | Menjadi React Web Developer Expert | Dicoding Indonesia

Instruksi Submission

Submission

Proyek: Membangun Aplikasi React dengan Redux

* [Pengantar](#pills-pengantar)
* [Kriteria](#pills-kriteria)
* [Instruksi Pengerjaan](#pills-instruksi-pengerjaan)
* [Penilaian](#pills-penilaian)
* [Lainnya](#pills-lainnya)

Sejauh ini Anda telah:

* mengikuti Style Guide dalam menulis kode,
* menggunakan ESLint sebagai JavaScript Linter,
* menggunakan Strict Mode untuk memperbaiki bugs dari hasil sorotannya,
* mengelola state yang terprediksi perubahannya, dan
* membangun aplikasi nyata dengan React dan Redux.

Untuk menguji pemahaman yang Anda miliki, kami melakukan asesmen dengan memberikan tugas kepada Anda, untuk membangun Aplikasi React dengan Redux bertemakan “Aplikasi Forum Diskusi”. Nantinya, Reviewer kami akan memeriksa pekerjaan Anda dan memberikan reviu pada proyek yang dibuat.



### Tujuan Akhir

Buatlah aplikasi React bertemakan “Aplikasi Forum Diskusi” yang memanfaatkan API dari [Dicoding Forum API](https://forum-api.dicoding.dev/v1/). **Kami mengedepankan kreativitas Anda dalam membangun aplikasi**, tetapi pastikan aplikasi yang dibuat memenuhi kriteria yang dijelaskan di bawah ini.



### Kriteria Utama 1: Fungsionalitas Aplikasi

1. Terdapat cara untuk mendaftar akun.
2. Terdapat cara untuk login akun.
3. Menampilkan daftar *thread*.
4. Ketika item thread dipilih, menampilkan detail thread beserta komentar di dalamnya.
5. Pengguna dapat membuat thread.
6. Pengguna dapat membuat komentar di dalam sebuah thread.
7. Menampilkan Loading Indicator ketika memuat data dari API.



**Catatan penting.**

1. Perihal *authorization* dalam mengakses resource threads kami bebaskan. Anda boleh mengharuskan pengguna untuk login ataupun tidak ketika ingin melihat threads. Namun, dalam berinteraksi mengubah data, seperti membuat thread atau komentar, pengguna wajib terotentikasi.
2. Item thread pada halaman daftar thread yang ditampilkan harus mengandung informasi berikut ini.

   * Judul dari thread.
   * Potongan dari body thread (opsional).
   * Waktu pembuatan thread.
   * Jumlah komentar.
   * Informasi pembuat thread:

     * Nama
     * Avatar (opsional)
3. Halaman detail thread harus mengandung informasi berikut ini.

   * Judul dari thread.
   * Body dari thread.
   * Waktu pembuatan thread.
   * Informasi pembuat thread:

     * Nama
     * Avatar
   * Komentar pada thread tersebut. Minimal informasi yang harus ditampilkan adalah:

     * Konten dari komentar.
     * Waktu pembuatan komentar.
     * Informasi pembuat komentar:

       * Nama
       * Avatar (opsional)



### Kriteria Utama 2: Bugs Highlighting

1. Menggunakan ESLint pada source code aplikasi. Indikasinya adalah terdapat berkas konfigurasi ESLint pada proyek.
2. Menerapkan salah satu Code Convention berikut.

   * [Dicoding Academy JavaScript Style Guide](https://github.com/dicodingacademy/javascript-style-guide).
   * [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript).
   * [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html).
   * [StandardJS Style Guide](https://standardjs.com/).
3. Tidak ada indikasi error yang ditampilkan ESLint.
4. Menggunakan React Strict Mode.



### Kriteria Utama 3: Arsitektur Aplikasi

1. Hampir seluruh state aplikasi (terutama yang bersumber dari API) disimpan pada Redux Store. Form input atau controlled component diperbolehkan untuk mengelola state-nya sendiri.
2. Tidak ada pemanggilan REST API yang dilakukan di dalam lifecycle atau efek pada komponen.
3. Memisahkan kode UI dengan State di folder yang terpisah.
4. React component bersifat modular dan reusable.



### Buat Proyekmu Unggul!

Selain kriteria utama yang wajib Anda penuhi, kami beri beberapa saran yang bisa Anda terapkan agar proyek lebih unggul dan mendapat nilai terbaik.

#### Saran 1: Fitur Votes pada Thread dan Komentar

1. Menyediakan tombol yang dapat digunakan untuk votes pada thread dan komentar.
2. Menampilkan indikasi pada tombol bila pengguna sudah mem-vote thread dan komentar. Contohnya, mengubah warna tombol dari abu-abu menjadi merah bila pengguna sudah up-vote/down-vote.
3. Mengedepankan User Experience dengan menerapkan Optimistically Apply Actions.
4. Menampilkan jumlah votes pada thread dan komentar.



#### Saran 2: Menampilkan Leaderboard

1. Terdapat halaman untuk menampilkan leaderboard.
2. Setiap item leaderboard, harus menampilkan informasi berikut ini.

   * Nama pengguna.
   * Avatar pengguna.
   * Score.



#### Saran 3: Filter Daftar Thread Berdasarkan Kategori

1. Terdapat fitur untuk mem-filter item thread yang ditampilkan pada halaman daftar threads.

> \*\*Catatan:\*\* API tidak menyediakan endpoint untuk filter daftar threads, sehingga fitur ini dibangun murni dari sisi Front-End dengan memanipulasi state aplikasi.



