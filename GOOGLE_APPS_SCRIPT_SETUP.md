# Panduan Integrasi Google Spreadsheet & Google Apps Script (RSVP & Buku Tamu)

Dokumen ini menjelaskan langkah-langkah mudah untuk menghubungkan formulir RSVP dan Buku Tamu di website undangan pernikahan digital ini ke **Google Spreadsheet** menggunakan **Google Apps Script Web App**.

---

## Langkah 1: Buat Google Spreadsheet Baru

1. Buka [Google Sheets](https://sheets.google.com).
2. Buat Spreadsheet baru dan beri nama, misalnya: `Pernikahan Isabella & Alexander - RSVP`.
3. Di lembar kerja pertama (Sheet1), buat **Header Kolom** pada baris pertama (Baris 1):
   - Kolom A: `Timestamp`
   - Kolom B: `Nama`
   - Kolom C: `Kehadiran`
   - Kolom D: `Jumlah Tamu`
   - Kolom E: `Ucapan & Doa`

---

## Langkah 2: Buat Google Apps Script

1. Di dalam Google Spreadsheet Anda, klik menu **Extensions (Ekstensi)** > **Apps Script**.
2. Hapus seluruh isi kode bawaan, lalu salin dan tempelkan kode berikut ke dalam file `Code.gs`:

```javascript
/**
 * Google Apps Script Web App - Handlers for Wedding RSVP & Guestbook
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = new Date();
    var name = data.name || "Tamu Undangan";
    var attendance = data.attendance || "Hadir";
    var count = data.count || 1;
    var wishes = data.wishes || "-";

    // Append row to Google Spreadsheet
    sheet.appendRow([timestamp, name, attendance, count, wishes]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "RSVP & Ucapan berhasil disimpan."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var wishesList = [];

    // Skip row 1 (headers)
    for (var i = rows.length - 1; i >= 1; i--) {
      var row = rows[i];
      if (row[1]) { // If name exists
        var timeFormatted = row[0] ? Utilities.formatDate(new Date(row[0]), "Asia/Jakarta", "dd MMM yyyy HH:mm") : "";
        wishesList.push({
          name: row[1],
          attendance: row[2],
          count: row[3],
          wishes: row[4],
          timestamp: timeFormatted
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify(wishesList))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Simpan proyek skrip dengan menekan `Ctrl + S` atau tombol ikon Disket.

---

## Langkah 3: Deploy Skrip sebagai Web App

1. Di pojok kanan atas editor Apps Script, klik tombol **Deploy** > **New deployment**.
2. Pada opsi **Select type** (ikon roda gigi), pilih **Web app**.
3. Isi konfigurasi sebagai berikut:
   - **Description**: `RSVP Wedding Web App v1`
   - **Execute as**: `Me (email_anda@gmail.com)` *(Sangat Penting!)*
   - **Who has access**: `Anyone` *(Sangat Penting agar tamu dapat mengisi tanpa login Google)*
4. Klik **Deploy**.
5. Izinkan akses (*Authorize access*) bila diminta oleh Google. Pilih akun Anda, klik *Advanced* > *Go to (Untitled project) (unsafe)*, lalu klik *Allow*.
6. Setelah sukses, Anda akan mendapatkan **Web App URL** (berakhiran `/exec`), misalnya:
   `https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXX/exec`
7. Salin URL tersebut.

---

## Langkah 4: Hubungkan ke Website Undangan

1. Buka file `data/config.js` di dalam folder proyek website undangan Anda.
2. Cari variabel `GAS_URL`, lalu tempelkan Web App URL yang telah Anda salin:

```javascript
const CONFIG = {
    GAS_URL: "https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXX/exec",
    // ...
};
```

3. Simpan file `data/config.js`.

---

## Pengujian Integrasi

1. Buka `index.html` di browser.
2. Buka undangan, gulir ke bagian **RSVP & Ucapan**.
3. Isi nama, konfirmasi kehadiran, jumlah tamu, dan ucapan, lalu klik **Kirim Konfirmasi RSVP**.
4. Periksa Google Spreadsheet Anda — data baru akan langsung muncul di baris terbaru!
5. Ucapan baru juga akan tampil di bagian **Buku Tamu & Doa Restu**!
