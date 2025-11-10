// Mock data for GKJ Pamulang Pastor Calling Website

export const candidateData = {
  name: "Faisha Sudarlin, M.Th.",
  photo: "/api/placeholder/300/400",
  education: [
    "S1 Teologi - Sekolah Tinggi Teologi Jakarta",
    "S2 Teologi (M.Th.) - Universitas Kristen Duta Wacana"
  ],
  experience: [
    "Pendeta di GKJ Wonosari (2018-2023)",
    "Asisten Pendeta di GKJ Salatiga (2015-2018)"
  ],
  bio: "Faisha Sudarlin, M.Th. adalah calon pendeta yang berpengalaman dalam pelayanan jemaat selama lebih dari 8 tahun. Beliau memiliki passion dalam pengembangan jemaat dan pembinaan warga gereja.",
  cv: ""
};

export const timelineData = [
  {
    date: "Nov 2024",
    title: "Pembentukan Panitia",
    description: "Pembentukan tim panitia pemanggilan pendeta",
    color: "green"
  },
  {
    date: "Feb 2025",
    title: "Jajak Pendapat",
    description: "Melakukan jajak pendapat kepada jemaat",
    color: "green"
  },
  {
    date: "Apr 2025",
    title: "Pemanggilan",
    description: "Proses pemanggilan calon pendeta",
    color: "green"
  },
  {
    date: "Jun 2025 - Agst 2025",
    title: "Asesmen dan Masa Orientasi",
    description: "Periode asesmen dan pengenalan lingkungan gereja",
    color: "red",
    current: true
  },
  {
    date: "Sep 2025",
    title: "Proses Pemilihan",
    description: "Pemilihan calon pendeta oleh jemaat",
    color: "orange"
  },
  {
    date: "Des 2025 - Mei 2026",
    title: "Pendampingan dan Pembimbingan",
    description: "Masa pendampingan dan pembimbingan calon pendeta",
    color: "orange"
  },
  {
    date: "Juli 2026",
    title: "Ujian Premtoar",
    description: "Ujian pra-pentahbisan",
    color: "orange"
  },
  {
    date: "Agst 2026 - Jun 2027",
    title: "Masa Vikariat",
    description: "Masa vikariat calon pendeta",
    color: "orange"
  },
  {
    date: "Juli 2027",
    title: "Pentahbisan Pendeta Kedua",
    description: "Upacara pentahbisan pendeta",
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