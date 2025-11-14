import React, { useState, useEffect } from 'react';
import { fundingCosts, fundingIncome, formatCurrency, getTotalCosts, getTotalIncome } from '../data/mock';
import { fetchFundingIncomeData, validateFundingData } from '../services/googleSheetsService';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, DollarSign, Wallet, RefreshCw } from 'lucide-react';

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF', '#F1F5F9'];
export const Funding = () => {
  const [liveIncomeData, setLiveIncomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  // Use live data if available, fallback to mock data
  const currentIncomeData = liveIncomeData || fundingIncome;

  const totalCosts = getTotalCosts();
  const totalIncome = currentIncomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalRealisasi = currentIncomeData.reduce((sum, item) => sum + item.realisasi, 0);
  const actualBalance = totalRealisasi - totalCosts;

  const loadFundingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchFundingIncomeData();
      
      if (!data) {
        throw new Error('Could not fetch data from Google Sheets');
      } else if (!validateFundingData(data)) {
        throw new Error('Invalid data format received');
      } else if (data.length === 0) {
        throw new Error('No income data available');
      } else {
        setLiveIncomeData(data);
        setLastUpdated(new Date());
        console.log('Successfully loaded live funding data');
      }
    } catch (err) {
      console.error('Failed to load funding data:', err);
      setError(err.message);
      // Keep using mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFundingData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadFundingData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const costsChartData = fundingCosts.map(item => ({
    name: item.name,
    value: item.amount
  }));

  const incomeChartData = currentIncomeData.map(item => ({
    name: item.name.length > 15 ? 
      item.name.split(' ').reduce((acc, word, i) => 
        i > 0 && i % 2 === 0 ? acc + '\n' + word : acc + (i > 0 ? ' ' : '') + word, ''
      ) : item.name,
    fullName: item.name,
    target: item.amount,
    realisasi: item.realisasi
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-blue-600 font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="funding" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pendanaan Pemanggilan Pendeta
          </h2>
          <p className="text-lg text-gray-600">Transparansi anggaran dan sumber pendanaan</p>
          
          {/* Data Status */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            {loading && (
              <span className="text-blue-600 flex items-center gap-1" role="status" aria-live="polite">
                <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span className="sr-only">Status: Loading live data</span>
                Loading live data...
              </span>
            )}
            
            {!loading && lastUpdated && (
              <span className="text-green-600 flex items-center gap-1" role="status" aria-live="polite">
                <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
                <span className="sr-only">Status: Live data</span>
                Live data • Updated: {lastUpdated.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} {lastUpdated.toLocaleTimeString('en-GB', { hour12: false })}
              </span>
            )}
            
            {!loading && error && !liveIncomeData && (
              <span className="text-amber-600 flex items-center gap-1" role="status" aria-live="polite">
                <div className="w-2 h-2 bg-amber-500 rounded-full" aria-hidden="true"></div>
                <span className="sr-only">Status: Using fallback data</span>
                Using fallback data • {error}
              </span>
            )}
            
            {!loading && !liveIncomeData && !error && (
              <span className="text-gray-500" role="status" aria-live="polite">
                <span className="sr-only">Status: Using static data</span>
                Using static data
              </span>
            )}
          </div>

          {/* Refresh Button */}
          <button
            onClick={loadFundingData}
            disabled={loading}
            className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              loading 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 inline mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-red-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <TrendingDown className="w-5 h-5" />
                Total Biaya
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(totalCosts)}</p>
              <p className="text-sm text-gray-600 mt-2">{fundingCosts.length} kategori pengeluaran</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <TrendingUp className="w-5 h-5" />
                Target Penerimaan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
              <p className="text-sm text-gray-600 mt-2">{currentIncomeData.length} sumber penerimaan</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <DollarSign className="w-5 h-5" />
                Realisasi Penerimaan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">{formatCurrency(totalRealisasi)}</p>
              <p className="text-sm text-gray-600 mt-2">
                {totalIncome > 0 ? ((totalRealisasi / totalIncome) * 100).toFixed(1) : '0.0'}% dari target
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Wallet className="w-5 h-5" />
                Saldo Aktual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${actualBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {actualBalance >= 0 ? formatCurrency(actualBalance) : `(${formatCurrency(Math.abs(actualBalance))})`}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {actualBalance >= 0 ? 'Realisasi positif' : 'Masih kekurangan'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Costs Pie Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Distribusi Biaya</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={costsChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costsChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Income Bar Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sumber Penerimaan</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={incomeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={120} 
                    tick={{ fontSize: 10, lineHeight: 1.2 }}
                    interval={0}
                    tickLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(label) => {
                      const item = incomeChartData.find(d => d.name === label);
                      return item?.fullName || label;
                    }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Bar dataKey="target" fill="#10B981" name="Target" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="realisasi" fill="#F59E0B" name="Realisasi" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Costs Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Rincian Biaya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Kategori</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundingCosts.map((cost, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 text-gray-700">{cost.name}</td>
                        <td className="py-3 px-2 text-right font-semibold text-gray-900">
                          {formatCurrency(cost.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 font-bold">
                      <td className="py-3 px-2 text-gray-900">Total</td>
                      <td className="py-3 px-2 text-right text-red-600">{formatCurrency(totalCosts)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Income Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Rincian Penerimaan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Sumber</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Target</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Realisasi</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentIncomeData.map((income, index) => {
                      const progress = (income.realisasi / income.amount * 100).toFixed(1);
                      return (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-2 text-gray-700">{income.name}</td>
                          <td className="py-3 px-2 text-right font-semibold text-gray-900">
                            {formatCurrency(income.amount)}
                          </td>
                          <td className="py-3 px-2 text-right font-semibold text-orange-600">
                            {formatCurrency(income.realisasi)}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className={`text-sm font-medium px-2 py-1 rounded flex items-center gap-1 ${
                              progress >= 80 ? 'bg-green-100 text-green-700' :
                              progress >= 50 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {progress >= 80 ? '✓' : progress >= 50 ? '◐' : '!'} {progress}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-gray-300 font-bold">
                      <td className="py-3 px-2 text-gray-900">Total</td>
                      <td className="py-3 px-2 text-right text-green-600">{formatCurrency(totalIncome)}</td>
                      <td className="py-3 px-2 text-right text-orange-600">
                        {formatCurrency(currentIncomeData.reduce((sum, item) => sum + item.realisasi, 0))}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className="text-sm font-medium px-2 py-1 rounded bg-blue-100 text-blue-700">
                          {totalIncome > 0 ? ((currentIncomeData.reduce((sum, item) => sum + item.realisasi, 0) / totalIncome) * 100).toFixed(1) : '0.0'}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};