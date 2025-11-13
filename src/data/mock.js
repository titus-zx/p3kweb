// Mock data for GKJ Pamulang Pastor Calling Website

// Import timeline content from separate file for better maintainability and easier markdown editing
import { timelineDescriptions } from './timelineDescriptions';

export const candidateData = {
  name: "Faisha Sudarlin, M.Th.",
  photo: "/api/placeholder/300/400",
  education: [
    "S1 Seni Musik Gerejawi (S.Sn) - STT Abdiel Semarang",
    "S2 Teologi (M.Th.) - STT Jakarta"
  ],
  experience: [
    "Tenaga Pelayan Gerejawi di GKJ Pamulang",
    "Anggota Tim Inti Nyanyian Gereja di Yayasan Musik Gereja Indonesia"
  ],
  bio: "Sdr. Faisha Sudarlin yang akrab dengan panggilan mas Fa memulai tugas sebagai tenaga pelayan gerejawi di GKJ Pamulang sejak tanggal 10 Juni 2018, setelah itu diangkat sebagai karyawan tetap di GKJ Pamulang per 1 September 2020. Saat ini yang bersangkutan juga menjadi majelis gereja dengan jabatan Penatua membawahi bidang Kesaksian dan Pelayanan.\n\nDi awal pelayanannya, mas Fa menjalankan tugas-tugas gerejawi antara lain: melatih musik bagi pemandu/pengiring lagu pujian; melatih paduan suara untuk beberapa kategorial seperti: Adiyuswa, KPR, dan jemaat dewasa/wilayah; termasuk bertugas sebagai pemandu/pengiring lagu pujian.\n\nDalam perkembangannya, Mas Fa juga menjalankan tugas gerejawi lainnya, yakni sebagai pembawa firman baik dalam ibadah minggu atapun ibadah lainnya.\n\nDengan memperhatikan hasil jajak pendapat dengan jemaat terhadap pencalonan mas Fa sebagai pendeta GKJ Pamulang, maka berdasarkan Keputusan No.: KEP-05/MG/GKJP/III/2025, tanggal 25 Maret 2025, Majelis telah memutuskan Sdr. Pnt. Faisha Sudarlin, MTh. Sebagai calon tunggal untuk calon Pendeta kedua GKJ Pamulang.",
  cv: ""
};

export const timelineData = [
  {
    date: "Nov 2024",
    title: "Pembentukan Panitia",
    description: timelineDescriptions.pembentukan,
    color: "green"
  },
  {
    date: "Feb 2025",
    title: "Jajak Pendapat",
    description: timelineDescriptions.jajak,
    color: "green"
  },
  {
    date: "Apr 2025",
    title: "Pemanggilan",
    description: timelineDescriptions.pemanggilan,
    color: "green"
  },
  {
    date: "Jun 2025 - Agst 2025",
    title: "Asesmen dan Masa Orientasi",
    description: timelineDescriptions.asesmen,
    color: "green"
  },
  {
    date: "Sep 2025",
    title: "Proses Pemilihan",
    description: timelineDescriptions.pemilihan,
    color: "green"
  },
  {
    date: "Des 2025 - Mei 2026",
    title: "Pendampingan dan Pembimbingan",
    description: timelineDescriptions.pendampingan,
    color: "red",
    current: true
  },
  {
    date: "Juli 2026",
    title: "Ujian Premtoar",
    description: timelineDescriptions.ujian,
    color: "orange"
  },
  {
    date: "Agst 2026 - Jun 2027",
    title: "Masa Vikariat",
    description: timelineDescriptions.vikariat,
    color: "orange"
  },
  {
    date: "Juli 2027",
    title: "Pentahbisan Pendeta Kedua",
    description: timelineDescriptions.pentahbisan,
    color: "orange"
  }
];

export const fundingCosts = [
  { name: "Asesmen & Masa Pengenalan", amount: 13350000 },
  { name: "Pemilihan Calon Pendeta", amount: 9500000 },
  { name: "Pembimbingan dan Pendampingan", amount: 45384000 },
  { name: "Ujian Calon Pendeta", amount: 55030000 },
  { name: "Pentahbisan Pendeta", amount: 62975000 },
  { name: "Kebutuhan Tim", amount: 17050000 },
  { name: "Biaya Tidak Terduga", amount: 18711000 }
];

export const fundingIncome = [
  { name: "Janji Iman", amount: 120000000 },
  { name: "Penjualan Makanan", amount: 15000000 },
  { name: "Lelang", amount: 45000000 },
  { name: "Donatur", amount: 30000000 },
  { name: "Ucapan Pentahbisan", amount: 12000000 }
];

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const getTotalCosts = () => {
  return fundingCosts.reduce((sum, item) => sum + item.amount, 0);
};

export const getTotalIncome = () => {
  return fundingIncome.reduce((sum, item) => sum + item.amount, 0);
};