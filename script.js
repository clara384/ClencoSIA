// Data Global
let jurnalUmum = [];
let jurnalPenyesuaian = [];
let bukuBesar = {};
let neracaSaldo = {};
let labaRugi = { pendapatan: 0, biaya: {} };

// Fungsi Login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === "admin" && password === "kelompok9") {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("main-page").style.display = "block";
    return false;
  } else {
    alert("Username atau Password salah!");
    return false;
  }
}

// Fungsi Logout
function logout() {
  document.getElementById("main-page").style.display = "none";
  document.getElementById("login-page").style.display = "block";
}

// Fungsi untuk Menampilkan Halaman
function showPage(page) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(page).style.display = "block";
}

// Format Mata Uang Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
}

// Menambahkan Jurnal Umum
function tambahJurnal() {
  const tanggal = prompt("Masukkan Tanggal (YYYY-MM-DD):");
  const deskripsi = prompt("Masukkan Deskripsi:");
  const akun = prompt("Masukkan Nama Akun:");
  const debit = parseFloat(prompt("Masukkan Debit:"));
  const kredit = parseFloat(prompt("Masukkan Kredit:"));

  jurnalUmum.push({ tanggal, deskripsi, akun, debit, kredit });
  renderJurnalUmum();
  updateBukuBesar();
  renderNeracaSaldo();
  renderLaporanLabaRugi();
}

// Menambahkan Jurnal Penyesuaian
function tambahPenyesuaian() {
  const tanggal = prompt("Masukkan Tanggal (YYYY-MM-DD):");
  const deskripsi = prompt("Masukkan Deskripsi:");
  const akun = prompt("Masukkan Nama Akun:");
  const debit = parseFloat(prompt("Masukkan Debit:"));
  const kredit = parseFloat(prompt("Masukkan Kredit:"));

  jurnalPenyesuaian.push({ tanggal, deskripsi, akun, debit, kredit });
  renderJurnalPenyesuaian();
  updateBukuBesar();
  renderNeracaSaldo();
  renderLaporanLabaRugi();
}

// Menampilkan Jurnal Umum
function renderJurnalUmum() {
  const tabel = document
    .getElementById("tabel-jurnal-umum")
    .getElementsByTagName("tbody")[0];
  tabel.innerHTML = "";
  jurnalUmum.forEach((item, index) => {
    let row = tabel.insertRow();
    row.insertCell(0).innerText = item.tanggal;
    row.insertCell(1).innerText = item.deskripsi;
    row.insertCell(2).innerText = item.akun;
    row.insertCell(3).innerText = formatRupiah(item.debit);
    row.insertCell(4).innerText = formatRupiah(item.kredit);
    let actionsCell = row.insertCell(5);
    actionsCell.innerHTML = `
            <button onclick="editJurnal(${index})">Edit</button>
            <button onclick="hapusJurnal(${index})">Hapus</button>
        `;
  });
}

// Render Jurnal Penyesuaian
function renderJurnalPenyesuaian() {
  const tabel = document
    .getElementById("tabel-jurnal-penyesuaian")
    .getElementsByTagName("tbody")[0];
  tabel.innerHTML = "";
  jurnalPenyesuaian.forEach((item, index) => {
    let row = tabel.insertRow();
    row.insertCell(0).innerText = item.tanggal;
    row.insertCell(1).innerText = item.deskripsi;
    row.insertCell(2).innerText = item.akun;
    row.insertCell(3).innerText = formatRupiah(item.debit);
    row.insertCell(4).innerText = formatRupiah(item.kredit);
    let actionsCell = row.insertCell(5);
    actionsCell.innerHTML = `
            <button onclick="editPenyesuaian(${index})">Edit</button>
            <button onclick="hapusPenyesuaian(${index})">Hapus</button>
        `;
  });
}

// Edit Jurnal Umum
function editJurnal(index) {
  const item = jurnalUmum[index];
  const tanggal = prompt("Masukkan Tanggal (YYYY-MM-DD):", item.tanggal);
  const deskripsi = prompt("Masukkan Deskripsi:", item.deskripsi);
  const akun = prompt("Masukkan Nama Akun:", item.akun);
  const debit = parseFloat(prompt("Masukkan Debit:", item.debit));
  const kredit = parseFloat(prompt("Masukkan Kredit:", item.kredit));

  jurnalUmum[index] = { tanggal, deskripsi, akun, debit, kredit };
  renderJurnalUmum();
  updateBukuBesar();
  renderNeracaSaldo();
  renderLaporanLabaRugi();
}

// Edit Jurnal Penyesuaian
function editPenyesuaian(index) {
  const item = jurnalPenyesuaian[index];
  const tanggal = prompt("Masukkan Tanggal (YYYY-MM-DD):", item.tanggal);
  const deskripsi = prompt("Masukkan Deskripsi:", item.deskripsi);
  const akun = prompt("Masukkan Nama Akun:", item.akun);
  const debit = parseFloat(prompt("Masukkan Debit:", item.debit));
  const kredit = parseFloat(prompt("Masukkan Kredit:", item.kredit));

  jurnalPenyesuaian[index] = { tanggal, deskripsi, akun, debit, kredit };
  renderJurnalPenyesuaian();
  updateBukuBesar();
  renderNeracaSaldo();
  renderLaporanLabaRugi();
}

// Hapus Jurnal Umum
function hapusJurnal(index) {
  jurnalUmum.splice(index, 1);
  renderJurnalUmum();
  updateBukuBesar();
  renderNeracaSaldo();
  renderLaporanLabaRugi();
}

// Hapus Jurnal Penyesuaian
function hapusPenyesuaian(index) {
  jurnalPenyesuaian.splice(index, 1);
  renderJurnalPenyesuaian();
  updateBukuBesar();
  renderNeracaSaldo();
  renderLaporanLabaRugi();
}

// Update Buku Besar
function updateBukuBesar() {
  bukuBesar = {};
  [...jurnalUmum, ...jurnalPenyesuaian].forEach((item) => {
    if (!bukuBesar[item.akun]) {
      bukuBesar[item.akun] = [];
    }
    let saldoAkhir = item.debit - item.kredit;

    // Akun Utang dan Pendapatan memiliki saldo normal kredit
    if (
      item.akun.toLowerCase().includes("utang") ||
      item.akun.toLowerCase().includes("pendapatan")
    ) {
      saldoAkhir = item.kredit - item.debit;
    }

    bukuBesar[item.akun].push({
      tanggal: item.tanggal,
      deskripsi: item.deskripsi,
      debit: item.debit,
      kredit: item.kredit,
      saldoAkhir,
    });
  });
  renderBukuBesar();
}

// Render Buku Besar
function renderBukuBesar() {
  const akunList = document.getElementById("akun-list");
  akunList.innerHTML = "";

  for (const akun in bukuBesar) {
    let table = document.createElement("table");
    let header = table.createTHead();
    header.innerHTML = `<tr><th colspan="5">${akun}</th></tr><tr><th>Tanggal</th><th>Deskripsi</th><th>Debit</th><th>Kredit</th><th>Saldo Akhir</th></tr>`;
    let tbody = table.createTBody();
    let saldoAkhir = 0;

    bukuBesar[akun].forEach((transaksi) => {
      saldoAkhir += transaksi.saldoAkhir;
      let row = tbody.insertRow();
      row.insertCell(0).innerText = transaksi.tanggal;
      row.insertCell(1).innerText = transaksi.deskripsi;
      row.insertCell(2).innerText = formatRupiah(transaksi.debit);
      row.insertCell(3).innerText = formatRupiah(transaksi.kredit);
      row.insertCell(4).innerText = formatRupiah(saldoAkhir);
    });

    akunList.appendChild(table);
  }
}

// Fungsi untuk Menambah Saldo Awal pada Buku Besar
function tambahSaldoAwal(akun) {
  const saldoAwal = parseFloat(prompt(`Masukkan Saldo Awal untuk ${akun}:`));
  if (isNaN(saldoAwal)) {
    alert("Saldo Awal tidak valid.");
    return;
  }
  bukuBesar[akun].unshift({
    tanggal: "Saldo Awal",
    deskripsi: "Saldo Awal",
    debit: saldoAwal,
    kredit: 0,
  });
  renderBukuBesar();
  updateNeracaSaldo();
  renderLaporanLabaRugi();
}

// Render Neraca Saldo
function renderNeracaSaldo() {
  const tabel = document
    .getElementById("tabel-neraca-saldo")
    .getElementsByTagName("tbody")[0];
  tabel.innerHTML = "";
  let totalDebit = 0;
  let totalKredit = 0;

  // Iterasi setiap akun yang ada di Buku Besar
  for (const akun in bukuBesar) {
    let saldoAkhir = bukuBesar[akun].reduce(
      (sum, transaksi) => sum + transaksi.saldoAkhir,
      0
    );

    // Menentukan apakah akun normalnya Debit atau Kredit
    let debit = 0;
    let kredit = 0;

    // Cek apakah akun ini termasuk akun dengan saldo normal Kredit
    // Akun-akun yang bersaldo normal Kredit seperti Pendapatan dan Utang
    if (saldoAkhir > 0) {
      // Jika saldo positif dan akun termasuk jenis akun dengan saldo normal Kredit (misalnya Pendapatan, Utang)
      if (
        akun.includes("Pendapatan") ||
        akun.includes("Utang") ||
        akun.includes("Ekuitas")
      ) {
        kredit = saldoAkhir; // Saldo normal Kredit
        totalKredit += kredit;
      } else {
        debit = saldoAkhir; // Akun lainnya (seperti Kas, Piutang, Biaya) memiliki saldo normal Debit
        totalDebit += debit;
      }
    } else {
      // Untuk saldo negatif, akun tersebut akan ditampilkan di kolom Debit (untuk akun yang normalnya Kredit) atau di kolom Kredit (untuk akun yang normalnya Debit)
      if (
        akun.includes("Pendapatan") ||
        akun.includes("Utang") ||
        akun.includes("Ekuitas")
      ) {
        debit = Math.abs(saldoAkhir); // Jika saldo negatif, akun ini tampil di kolom Debit
        totalDebit += debit;
      } else {
        kredit = Math.abs(saldoAkhir); // Jika saldo negatif, akun ini tampil di kolom Kredit
        totalKredit += kredit;
      }
    }

    let row = tabel.insertRow();
    row.insertCell(0).innerText = akun;
    row.insertCell(1).innerText = formatRupiah(debit);
    row.insertCell(2).innerText = formatRupiah(kredit);
  }

  // Total Debit dan Kredit
  let totalRow = tabel.insertRow();
  totalRow.insertCell(0).innerText = "Total";
  totalRow.insertCell(1).innerText = formatRupiah(totalDebit);
  totalRow.insertCell(2).innerText = formatRupiah(totalKredit);
}

//Render Laporan Laba Rugi
function renderLaporanLabaRugi() {
  const laporanTabel = document
    .getElementById("tabel-laba-rugi")
    .getElementsByTagName("tbody")[0];
  laporanTabel.innerHTML = "";

  labaRugi.pendapatan = 0;
  labaRugi.totalBiaya = 0;
  labaRugi.biaya = {};

  // Menyusun pendapatan dan biaya
  for (const akun in bukuBesar) {
    let saldoAkhir = bukuBesar[akun].reduce(
      (sum, transaksi) => sum + transaksi.saldoAkhir,
      0
    );

    if (akun.includes("Pendapatan")) {
      labaRugi.pendapatan += saldoAkhir;
    } else if (akun.includes("Biaya")) {
      labaRugi.biaya[akun] = saldoAkhir;
      labaRugi.totalBiaya += saldoAkhir;
    }
  }

  // Tampilkan Pendapatan
  let row = laporanTabel.insertRow();
  row.insertCell(0).innerText = "Pendapatan";
  row.insertCell(1).innerText = formatRupiah(labaRugi.pendapatan);

  // Tampilkan Biaya Terperinci
  for (const akun in labaRugi.biaya) {
    row = laporanTabel.insertRow();
    row.insertCell(0).innerText = akun;
    row.insertCell(1).innerText = formatRupiah(labaRugi.biaya[akun]);
  }

  // Tampilkan Total Biaya
  row = laporanTabel.insertRow();
  row.insertCell(0).innerText = "Total Biaya";
  row.insertCell(1).innerText = formatRupiah(labaRugi.totalBiaya);

  // Tampilkan Laba/Rugi
  let labaRugiBersih = labaRugi.pendapatan - labaRugi.totalBiaya;
  row = laporanTabel.insertRow();
  row.insertCell(0).innerText = "Laba (Rugi)";
  row.insertCell(1).innerText = formatRupiah(labaRugiBersih);
}

// Download PDF Laporan
function downloadPDF() {
  const { jsPDF } = window.jspdf; // Pastikan library jsPDF sudah di-include
  const doc = new jsPDF();

  let y = 10; // Posisi awal pada vertikal

  // Judul Laporan
  doc.text("Laporan Laba Rugi", 10, y);
  y += 10;

  // Menampilkan Pendapatan
  let totalPendapatan = 0;
  for (let akun in bukuBesar) {
    bukuBesar[akun].forEach((item) => {
      if (item.akun.includes("Pendapatan")) {
        totalPendapatan += item.kredit; // Pendapatan terhitung dari kredit
      }
    });
  }
  doc.text("Pendapatan: " + formatRupiah(totalPendapatan), 10, y);
  y += 10;

  // Menampilkan Biaya Terperinci
  let totalBiaya = 0;
  let biayaList = [];

  for (let akun in bukuBesar) {
    bukuBesar[akun].forEach((item) => {
      if (item.akun.includes("Biaya")) {
        biayaList.push({ akun: item.akun, jumlah: item.debit });
        totalBiaya += item.debit; // Biaya terhitung dari debit
      }
    });
  }

  // Menampilkan Biaya Terperinci
  doc.text("Biaya:", 10, y);
  y += 10;

  biayaList.forEach((biaya) => {
    doc.text(biaya.akun + ": " + formatRupiah(biaya.jumlah), 10, y);
    y += 10;
  });

  // Menampilkan Total Biaya
  doc.text("Total Biaya: " + formatRupiah(totalBiaya), 10, y);
  y += 10;

  // Menghitung Laba/Rugi
  let labaRugi = totalPendapatan - totalBiaya;
  doc.text("Laba (Rugi): " + formatRupiah(labaRugi), 10, y);
  y += 10;

  // Menyimpan file PDF
  doc.save("laporan-laba-rugi.pdf");
}
