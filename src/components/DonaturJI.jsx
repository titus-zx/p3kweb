import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Users, ArrowLeft, Church, Loader2, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

const DONATUR_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmdFLM2dd1tJrsW8OIZL1s1sFtqnQo653m7B8aB3G44Cw39rIds8mg-D10s-XVyz7wLcoleZ62_R83/pub?gid=1754405709&single=true&output=csv';

// Helper function to parse CSV line
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

// Parse CSV data
const parseCSVData = (csvText) => {
  const lines = csvText.trim().split('\n');
  
  // Skip header row
  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    return {
      name: values[0] || '',
      wilayah: values[1] || '',
      status: values[2] || ''
    };
  }).filter(item => item.name);
};

export const DonaturJIPage = () => {
  const [donatur, setDonatur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonatur = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${DONATUR_CSV_URL}&t=${Date.now()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const csvText = await response.text();
        const parsedData = parseCSVData(csvText);
        setDonatur(parsedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonatur();
  }, []);

  // Group data by wilayah
  const groupedByWilayah = useMemo(() => {
    const groups = {};
    donatur.forEach(item => {
      if (!groups[item.wilayah]) {
        groups[item.wilayah] = [];
      }
      groups[item.wilayah].push(item);
    });
    return groups;
  }, [donatur]);

  // Get list of wilayah sorted alphabetically
  const wilayahList = useMemo(() => {
    return Object.keys(groupedByWilayah).sort();
  }, [groupedByWilayah]);

  // Statistics
  const statistics = useMemo(() => {
    const total = donatur.length;
    const lunas = donatur.filter(d => d.status === 'LUNAS').length;
    const belum = donatur.filter(d => d.status === 'BELUM').length;
    return { total, lunas, belum };
  }, [donatur]);

  // Statistics per wilayah
  const wilayahStats = useMemo(() => {
    const stats = {};
    wilayahList.forEach(wilayah => {
      const items = groupedByWilayah[wilayah];
      stats[wilayah] = {
        total: items.length,
        lunas: items.filter(d => d.status === 'LUNAS').length,
        belum: items.filter(d => d.status === 'BELUM').length
      };
    });
    return stats;
  }, [wilayahList, groupedByWilayah]);

  // Render donatur list
  const renderDonaturList = (items) => (
    <div className="divide-y divide-gray-100">
      {items.map((item, index) => (
        <div 
          key={`${item.name}-${index}`}
          className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm w-8">{index + 1}.</span>
            <span className="font-medium text-gray-900">{item.name}</span>
          </div>
          <Badge 
            variant={item.status === 'LUNAS' ? 'default' : 'secondary'}
            className={item.status === 'LUNAS' 
              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
              : 'bg-orange-100 text-orange-800 hover:bg-orange-100'
            }
          >
            {item.status === 'LUNAS' ? (
              <CheckCircle2 className="w-3 h-3 mr-1" />
            ) : (
              <Clock className="w-3 h-3 mr-1" />
            )}
            {item.status}
          </Badge>
        </div>
      ))}
    </div>
  );

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
                <h1 className="text-5xl font-bold mb-2">Donatur Janji Iman</h1>
                <p className="text-xl text-blue-100">
                  Daftar Donatur Persembahan Janji Iman
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Memuat Data Donatur</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white shadow-xl border-t-4 border-t-blue-500 hover:shadow-2xl transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Donatur</CardTitle>
                    <Users className="h-6 w-6 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {statistics.total}
                    </div>
                    <p className="text-xs text-gray-500">
                      Jumlah donatur terdaftar
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-xl border-t-4 border-t-green-500 hover:shadow-2xl transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Sudah Lunas</CardTitle>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {statistics.lunas}
                    </div>
                    <p className="text-xs text-gray-500">
                      {((statistics.lunas / statistics.total) * 100).toFixed(1)}% dari total donatur
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-xl border-t-4 border-t-orange-500 hover:shadow-2xl transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Belum Lunas</CardTitle>
                    <Clock className="h-6 w-6 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {statistics.belum}
                    </div>
                    <p className="text-xs text-gray-500">
                      {((statistics.belum / statistics.total) * 100).toFixed(1)}% dari total donatur
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Donatur List - Desktop View (Tabs) */}
              <div className="hidden md:block">
                <Card className="bg-white shadow-2xl">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-2xl">Daftar Donatur per Wilayah</CardTitle>
                    <CardDescription className="mt-1">
                      Data donatur dikelompokkan berdasarkan wilayah
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs defaultValue={wilayahList[0]} className="w-full">
                      <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-gray-100 p-2 rounded-lg mb-6">
                        {wilayahList.map(wilayah => (
                          <TabsTrigger 
                            key={wilayah} 
                            value={wilayah}
                            className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                          >
                            <MapPin className="w-4 h-4" />
                            {wilayah}
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-200 data-[state=active]:bg-blue-500">
                              {wilayahStats[wilayah].total}
                            </span>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {wilayahList.map(wilayah => (
                        <TabsContent key={wilayah} value={wilayah}>
                          <div className="mb-4 flex gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span className="text-gray-600">Lunas:</span>
                              <span className="font-semibold text-green-600">{wilayahStats[wilayah].lunas}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-orange-500" />
                              <span className="text-gray-600">Belum:</span>
                              <span className="font-semibold text-orange-600">{wilayahStats[wilayah].belum}</span>
                            </div>
                          </div>
                          <div className="border rounded-lg overflow-hidden">
                            {renderDonaturList(groupedByWilayah[wilayah])}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Donatur List - Mobile View (Accordion) */}
              <div className="md:hidden">
                <Card className="bg-white shadow-2xl">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-xl">Daftar Donatur per Wilayah</CardTitle>
                    <CardDescription className="mt-1">
                      Ketuk wilayah untuk melihat daftar donatur
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full">
                      {wilayahList.map(wilayah => (
                        <AccordionItem key={wilayah} value={wilayah} className="border rounded-lg mb-3 overflow-hidden">
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                            <div className="flex items-center gap-3 text-left">
                              <div className="bg-blue-100 p-2 rounded-lg">
                                <MapPin className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{wilayah}</div>
                                <div className="text-xs text-gray-500 flex gap-3 mt-1">
                                  <span className="text-green-600">
                                    ✓ {wilayahStats[wilayah].lunas} Lunas
                                  </span>
                                  <span className="text-orange-600">
                                    ○ {wilayahStats[wilayah].belum} Belum
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-0">
                            {renderDonaturList(groupedByWilayah[wilayah])}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonaturJIPage;
