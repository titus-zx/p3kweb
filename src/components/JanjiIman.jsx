import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, Users, TrendingUp, ArrowLeft, Church, Loader2 } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

// Helper functions moved outside component to prevent recreation
const parseCSVLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
};

const parseCurrency = (value) => {
  if (!value) return 0;
  const cleanValue = value.replace(/"/g, '').replace(/,/g, '').trim();
  return parseInt(cleanValue) || 0;
};

const parseCSVData = (csvText) => {
  const lines = csvText.trim().split('\n');
  return lines.map((line) => {
    const values = parseCSVLine(line);
    const name = values[0] || '';
    const amount = parseCurrency(values[1]);
    const paid = parseCurrency(values[2]);
    const type = values[3] || 'online';
    
    return {
      name,
      amount,
      paid,
      remaining: amount - paid,
      type
    };
  }).filter(item => item.name && item.amount > 0);
};

export const JanjiImanPage = () => {
  const [donations, setDonations] = useState([]);
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');

  // Initial data fetch
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const baseUrl = 'https://script.google.com/macros/s/AKfycbzrgQRjQ8M-Mrbj-uZGMh8DVymmTFPA7a8affa9-xnuPjy5D7dyECYkmUly5WJas2cS/exec';
        const response = await fetch(baseUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const csvText = await response.text();
        const parsedData = parseCSVData(csvText);
        setAllDonations(parsedData);
        setDonations(parsedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Backend search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      
      const fetchFilteredDonations = async () => {
        if (!searchInput.trim()) {
          setDonations(allDonations);
          return;
        }

        try {
          setLoading(true);
          const baseUrl = 'https://script.google.com/macros/s/AKfycbzrgQRjQ8M-Mrbj-uZGMh8DVymmTFPA7a8affa9-xnuPjy5D7dyECYkmUly5WJas2cS/exec';
          const url = `${baseUrl}?col1=${encodeURIComponent(searchInput)}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          const csvText = await response.text();
          const parsedData = parseCSVData(csvText);
          setDonations(parsedData);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      
      fetchFilteredDonations();
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchInput, allDonations]);

  // Memoize formatters to prevent recreation
  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }, []);

  // Memoize statistics calculations
  const statistics = useMemo(() => {
    const totalDonations = allDonations.reduce((sum, donation) => sum + donation.amount, 0);
    const totalPaid = allDonations.reduce((sum, donation) => sum + donation.paid, 0);
    return {
      totalDonations,
      totalDonors: allDonations.length,
      totalPaid,
      totalRemaining: totalDonations - totalPaid
    };
  }, [allDonations]);

  // Memoize pagination logic
  const paginationData = useMemo(() => {
    const totalPages = pageSize === 'all' ? 1 : Math.ceil(donations.length / pageSize);
    const startIndex = pageSize === 'all' ? 0 : (currentPage - 1) * pageSize;
    const endIndex = pageSize === 'all' ? donations.length : startIndex + pageSize;
    const currentDonations = donations.slice(startIndex, endIndex);
    
    return { totalPages, startIndex, endIndex, currentDonations };
  }, [donations, currentPage, pageSize]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((value) => {
    const newPageSize = value === 'all' ? 'all' : parseInt(value);
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-100 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Beranda
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                <Church className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">Janji Iman</h1>
                <p className="text-xl text-blue-100">
                  Persembahan untuk Pemanggilan Pendeta Kedua
                </p>
              </div>
            </div>
            
            {/* <p className="text-lg text-blue-50 max-w-3xl">
              "Setiap orang harus memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan sukacita." - 2 Korintus 9:7
            </p> */}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading && !searchInput && allDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Memuat Data Janji Iman</h3>
              <p className="text-gray-600">Mohon tunggu sebentar...</p>
              <div className="mt-8 w-full max-w-md">
                <div className="grid grid-cols-1 gap-4">
                  <Skeleton className="h-32 rounded-xl" />
                  <Skeleton className="h-32 rounded-xl" />
                  <Skeleton className="h-64 rounded-xl" />
                </div>
              </div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Gagal memuat data: {error}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <Card className="bg-white shadow-xl border-t-4 border-t-blue-500 hover:shadow-2xl transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Komitmen</CardTitle>
                    <Heart className="h-6 w-6 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatCurrency(statistics.totalDonations)}
                    </div>
                    <p className="text-xs text-gray-500">
                      Total komitmen persembahan Janji Iman
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-xl border-t-4 border-t-green-500 hover:shadow-2xl transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Sudah Dibayarkan</CardTitle>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {formatCurrency(statistics.totalPaid)}
                    </div>
                    <p className="text-xs text-gray-500">
                      {((statistics.totalPaid / statistics.totalDonations) * 100).toFixed(1)}% dari total
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-xl border-t-4 border-t-orange-500 hover:shadow-2xl transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Belum Dibayarkan</CardTitle>
                    <Heart className="h-6 w-6 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {formatCurrency(statistics.totalRemaining)}
                    </div>
                    <p className="text-xs text-gray-500">
                      Yang perlu dibayarkan
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-xl border-t-4 border-t-purple-500 hover:shadow-2xl transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Jumlah Donatur</CardTitle>
                    <Users className="h-6 w-6 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {statistics.totalDonors}
                    </div>
                    <p className="text-xs text-gray-500">
                      Jemaat yang berkomitmen
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Search Filter */}
              <div className="mb-8">
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-6">
                    <div className="relative">
                      <label htmlFor="searchName" className="block text-sm font-medium text-gray-700 mb-2">
                        Cari berdasarkan Nama
                      </label>
                      <div className="relative">
                        <input
                          id="searchName"
                          type="text"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          placeholder="Ketik nama untuk mencari... (otomatis mencari setelah berhenti mengetik)"
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {loading && searchInput && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                          </div>
                        )}
                      </div>
                      {searchInput && (
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {loading ? (
                              <span className="text-blue-600">Mencari data dari server...</span>
                            ) : (
                              <span>
                                Hasil pencarian untuk: <span className="font-semibold text-gray-900">"{searchInput}"</span>
                                {' '}({donations.length} data ditemukan)
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => setSearchInput('')}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                          >
                            Hapus pencarian
                          </button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Donations List */}
              <Card className="bg-white shadow-2xl">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">Daftar Komitmen Janji Iman</CardTitle>
                      <CardDescription className="mt-1">
                        Data terbaru dari sistem pendataan janji iman
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
                          Tampilkan:
                        </label>
                        <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                          <SelectTrigger id="pageSize" className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="all">Semua</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-500">entri per halaman</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Entri</p>
                        <p className="text-2xl font-bold text-blue-600">{statistics.totalDonors}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 w-16">No</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 w-48">Nama Jemaat</th>
                          <th className="text-right py-4 px-6 font-semibold text-gray-700 w-32">Komitmen</th>
                          <th className="text-right py-4 px-6 font-semibold text-gray-700 w-32">Dibayarkan</th>
                          <th className="text-right py-4 px-6 font-semibold text-gray-700 w-32">Sisa</th>
                          <th className="text-center py-4 px-6 font-semibold text-gray-700 w-24">Tipe</th>
                          <th className="text-center py-4 px-6 font-semibold text-gray-700 w-24">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginationData.currentDonations.map((donation, index) => (
                          <tr 
                            key={`${donation.name}-${index}`}
                            className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                          >
                            <td className="py-4 px-6 text-gray-600 font-medium">{paginationData.startIndex + index + 1}</td>
                            <td className="py-4 px-6 font-semibold text-gray-900 truncate" title={donation.name}>{donation.name}</td>
                            <td className="py-4 px-6 text-right font-bold text-blue-600">
                              {formatCurrency(donation.amount)}
                            </td>
                            <td className="py-4 px-6 text-right font-bold text-green-600">
                              {formatCurrency(donation.paid)}
                            </td>
                            <td className="py-4 px-6 text-right font-bold text-orange-600">
                              {formatCurrency(donation.remaining)}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                donation.type === 'kartu' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {donation.type === 'kartu' ? 'Kartu' : 'Online'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              {donation.paid >= donation.amount ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                  ✓ Lunas
                                </span>
                              ) : donation.paid > 0 ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                  Sebagian
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                  Belum
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination Controls */}
                  {pageSize !== 'all' && paginationData.totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Menampilkan {paginationData.startIndex + 1} hingga {Math.min(paginationData.endIndex, donations.length)} dari {donations.length} entri
                      </div>
                      
                      <Pagination className="mx-0">
                        <PaginationContent>
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationPrevious 
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="cursor-pointer"
                              />
                            </PaginationItem>
                          )}
                          
                          {[...Array(paginationData.totalPages)].map((_, i) => {
                            const page = i + 1;
                            const showPage = 
                              page === 1 || 
                              page === paginationData.totalPages || 
                              (page >= currentPage - 1 && page <= currentPage + 1);
                            
                            if (!showPage && page === currentPage - 2) {
                              return (
                                <PaginationItem key={`ellipsis-start`}>
                                  <span className="flex h-9 w-9 items-center justify-center text-sm text-gray-500">...</span>
                                </PaginationItem>
                              );
                            }
                            
                            if (!showPage && page === currentPage + 2) {
                              return (
                                <PaginationItem key={`ellipsis-end`}>
                                  <span className="flex h-9 w-9 items-center justify-center text-sm text-gray-500">...</span>
                                </PaginationItem>
                              );
                            }
                            
                            if (!showPage) return null;
                            
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => handlePageChange(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                          
                          {currentPage < paginationData.totalPages && (
                            <PaginationItem>
                              <PaginationNext 
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="cursor-pointer"
                              />
                            </PaginationItem>
                          )}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                  
                  {pageSize === 'all' && (
                    <div className="flex items-center justify-center px-6 py-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Menampilkan semua {donations.length} entri
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Info Section */}
              <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Terima Kasih atas Komitmen Anda
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Setiap persembahan janji iman yang diberikan adalah bentuk dukungan nyata untuk proses pemanggilan pendeta kedua di GKJ Pamulang. 
                  Komitmen Anda sangat berarti bagi perkembangan pelayanan gereja kita. Tuhan Yesus memberkati setiap pemberian dengan sukacita.
                </p>
              </div>

              {/* Call to Action Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="mb-6">
                    <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-3xl font-bold mb-4">
                      Mari Bersama Membangun Pelayanan
                    </h3>
                    <p className="text-lg text-blue-100 leading-relaxed mb-2">
                      Jika Anda belum berpartisipasi dalam janji iman untuk pemanggilan pendeta kedua, kami mengundang Anda untuk turut serta dalam karya pelayanan yang mulia ini.
                    </p>
                    <p className="text-blue-50 leading-relaxed">
                      Setiap komitmen, besar atau kecil, adalah wujud iman dan kasih kita kepada Tuhan serta dedikasi untuk pertumbuhan jemaat GKJ Pamulang.
                    </p>
                  </div>
                  
                  {/* <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <p className="text-sm text-blue-50 italic mb-3">
                      "Janganlah tiap-tiap orang hanya memperhatikan kepentingannya sendiri, tetapi kepentingan orang lain juga."
                    </p>
                    <p className="text-xs text-blue-200">
                      — Filipi 2:4
                    </p>
                  </div> */}

                  <a
                    href="https://janjiiman.gkj-pamulang.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
                  >
                    <Church className="w-6 h-6" />
                    Daftar Sekarang
                  </a>
                  
                  <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <p className="text-sm font-semibold text-white mb-4">
                      Untuk informasi lebih lanjut, silakan menghubungi PIC di wilayah berikut ini:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm text-blue-50">
                      <div>
                        <p className="font-semibold text-white mb-2">PIC Wilayah PP1:</p>
                        <p>• Ibu Kristini</p>
                        <p>• Ibu Merry Christiana</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-2">PIC Wilayah PP2:</p>
                        <p>• Ibu Maria Stefanus</p>
                        <p>• Bpk. Samuel Yogasara</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-2">PIC Wilayah Serpong:</p>
                        <p>• Bpk. Sayoga Supriantoro</p>
                        <p>• Bpk. Titus Adi Prasetyo</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-2">PIC Wilayah Reni Jaya:</p>
                        <p>• Bpk. Andreas Bambang</p>
                        <p>• Ibu Finny Yunita</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-2">PIC Wilayah Bukit Indah:</p>
                        <p>• Bpk. Andrianto Nataladi</p>
                        <p>• Ibu Trami Trijogo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
