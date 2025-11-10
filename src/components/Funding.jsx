import React from 'react';
import { fundingCosts, fundingIncome, formatCurrency, getTotalCosts, getTotalIncome } from '../data/mock';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF', '#F1F5F9'];
const INCOME_COLORS = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'];

export const Funding = () => {
  const totalCosts = getTotalCosts();
  const totalIncome = getTotalIncome();
  const balance = totalIncome - totalCosts;

  const costsChartData = fundingCosts.map(item => ({
    name: item.name,
    value: item.amount
  }));

  const incomeChartData = fundingIncome.map(item => ({
    name: item.name,
    amount: item.amount
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
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                Total Penerimaan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
              <p className="text-sm text-gray-600 mt-2">{fundingIncome.length} sumber penerimaan</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <DollarSign className="w-5 h-5" />
                Saldo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {formatCurrency(balance)}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {balance >= 0 ? 'Anggaran seimbang' : 'Kekurangan dana'}
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
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {incomeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]} />
                    ))}
                  </Bar>
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
                    </tr>
                  </thead>
                  <tbody>
                    {fundingIncome.map((income, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 text-gray-700">{income.name}</td>
                        <td className="py-3 px-2 text-right font-semibold text-gray-900">
                          {formatCurrency(income.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 font-bold">
                      <td className="py-3 px-2 text-gray-900">Total</td>
                      <td className="py-3 px-2 text-right text-green-600">{formatCurrency(totalIncome)}</td>
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