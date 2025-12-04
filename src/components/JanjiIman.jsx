import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, Users, TrendingUp, ArrowLeft, Church, Loader2 } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

export const JanjiImanPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Fetch combined data from single CSV source
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmdFLM2dd1tJrsW8OIZL1s1sFtqnQo653m7B8aB3G44Cw39rIds8mg-D10s-XVyz7wLcoleZ62_R83/pub?gid=1193523379&single=true&output=csv'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const csvText = await response.text();
        const lines = csvText.trim().split('\n');
        
        // Helper function to parse CSV line with quoted values
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
        
        // Helper function to parse Indonesian currency format
        const parseCurrency = (value) => {
          if (!value) return 0;
          const cleanValue = value.replace(/"/g, '').replace(/,/g, '').trim();
          return parseInt(cleanValue) || 0;
        };
        
        // Parse data (CSV without header: nama, komitmen, pembayaran, tipe)
        const parsedData = lines.map((line, index) => {
          const values = parseCSVLine(line);
          
          const name = values[0] || '';
          const amount = parseCurrency(values[1]);
          const paid = parseCurrency(values[2]);
          const type = values[3] || 'online';
          
          return {
            name: name,
            amount: amount,
            paid: paid,
            remaining: amount - paid,
            type: type
          };
        }).filter(item => item.name && item.amount > 0);

        setDonations(parsedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };



  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalDonors = donations.length;
  const totalPaid = donations.reduce((sum, donation) => sum + donation.paid, 0);
  const totalRemaining = totalDonations - totalPaid;

  // Pagination logic
  const totalPages = pageSize === 'all' ? 1 : Math.ceil(donations.length / pageSize);
  const startIndex = pageSize === 'all' ? 0 : (currentPage - 1) * pageSize;
  const endIndex = pageSize === 'all' ? donations.length : startIndex + pageSize;
  const currentDonations = donations.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value) => {
    const newPageSize = value === 'all' ? 'all' : parseInt(value);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

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
          {loading ? (
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
                      {formatCurrency(totalDonations)}
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
                      {formatCurrency(totalPaid)}
                    </div>
                    <p className="text-xs text-gray-500">
                      {((totalPaid / totalDonations) * 100).toFixed(1)}% dari total
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
                      {formatCurrency(totalRemaining)}
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
                      {totalDonors}
                    </div>
                    <p className="text-xs text-gray-500">
                      Jemaat yang berkomitmen
                    </p>
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
                        <p className="text-2xl font-bold text-blue-600">{totalDonors}</p>
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
                        {currentDonations.map((donation, index) => (
                          <tr 
                            key={`${donation.name}-${index}`}
                            className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                          >
                            <td className="py-4 px-6 text-gray-600 font-medium">{startIndex + index + 1}</td>
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
                  {pageSize !== 'all' && totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Menampilkan {startIndex + 1} hingga {Math.min(endIndex, donations.length)} dari {donations.length} entri
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
                          
                          {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            const showPage = 
                              page === 1 || 
                              page === totalPages || 
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
                          
                          {currentPage < totalPages && (
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
                  
                  <p className="mt-6 text-sm text-blue-100">
                    Proses mudah dan cepat, hanya memerlukan beberapa menit
                  </p>
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
