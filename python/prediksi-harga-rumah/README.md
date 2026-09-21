# Prediksi Harga Rumah

Proyek ini merupakan aplikasi machine learning untuk memprediksi harga rumah berdasarkan fitur-fitur properti seperti luas bangunan, jumlah kamar, lokasi, kualitas bangunan, dan variabel lain yang relevan. Model yang digunakan adalah Gradient Boosting Regressor yang telah dilatih sebelumnya dan disimpan dalam format `.joblib`.

## Deskripsi

Aplikasi ini dibuat untuk menilai estimasi harga jual rumah dengan pendekatan prediksi berbasis data. Data yang digunakan berasal dari dataset rumah yang umum digunakan pada tugas machine learning regresi, dengan proses preprocessing dan pemodelan dilakukan sebelum model dipublikasikan melalui API sederhana.

## Fitur

- Prediksi harga rumah berbasis fitur properti
- Model machine learning tersimpan dan siap digunakan
- Endpoint API sederhana untuk melakukan prediksi
- Data training dan data uji tersedia dalam folder `data/`

## Teknologi yang Digunakan

- Python
- Flask
- scikit-learn
- joblib
- Pandas
- NumPy

## Struktur Proyek

```text
prediksi-harga-rumah/
├── data/
│   ├── train.csv
│   ├── test.csv
│   ├── sample_submission.csv
│   └── data_description.txt
├── model/
│   └── gbr_model.joblib
├── .gitignore
├── data.json
├── testing_deploy.py
├── workflow.ipynb
├── README.md
└── .ipynb_checkpoints/
```

## Persyaratan

Pastikan perangkat Anda sudah memiliki:

- Python 3.9 atau versi yang lebih baru
- pip
- Virtual environment (opsional, tetapi disarankan)

## Instalasi

1. Buka terminal atau command prompt.
2. Masuk ke direktori proyek.
3. Instal dependency yang diperlukan:

```bash
pip install flask joblib scikit-learn pandas numpy
```

## Cara Menjalankan Aplikasi

Jalankan file server berikut:

```bash
python testing_deploy.py
```

Aplikasi akan berjalan secara lokal dengan server Flask.

## Endpoint API

### URL

```text
POST /predict
```

### Request Body

```json
{
  "data": [
    [
      0.0258814198,
      -0.917637181,
      0.798581973,
      0.00465818252,
      -0.19086268,
      -0.523676539,
      0.544502437,
      0.398055532,
      -0.701765886,
      1.84842886,
      0,
      -0.799528238,
      1.40061034,
      1.30453595,
      -0.743485947,
      0,
      0.175076143,
      1.15778146,
      0,
      0.787362373,
      -0.789877652,
      0.29473673,
      0,
      -0.235844028,
      -0.944263321,
      0.49935326,
      0.273711363,
      0.533168369,
      0.790365549,
      -0.315583095,
      0,
      0,
      0,
      0,
      0,
      0.251894504,
      -1.35256152,
      2,
      1,
      0,
      3,
      0,
      4,
      0,
      3,
      2,
      0,
      0,
      2,
      0,
      0,
      7,
      9,
      1,
      3,
      1,
      2,
      2,
      2,
      1,
      2,
      0,
      0,
      0,
      1,
      2,
      2,
      4,
      2,
      0,
      1,
      2,
      3,
      2,
      8,
      3
    ]
  ]
}
```

### Response Contoh

```json
{
  "prediction": [
    200000000
  ]
}
```

Nilai prediksi yang dikembalikan berupa angka estimasi harga rumah dalam satuan yang sesuai dengan dataset yang digunakan.

## Catatan

- File `data.json` berfungsi sebagai contoh data input untuk pengujian model.
- Model yang digunakan sudah dilatih dan disimpan dalam folder `model/`.
- Jika Anda ingin memperbarui model, silakan lakukan training ulang dan simpan hasilnya ke `model/gbr_model.joblib`.

