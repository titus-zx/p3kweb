import React from 'react';
import { Heart, Users, Target } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pemanggilan Pendeta Kedua
            <span className="block text-blue-600 mt-2">GKJ Pamulang</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Kami dengan sukacita mengundang seluruh jemaat untuk terlibat dalam proses pemanggilan pendeta kedua. 
            Mari bersama-sama mendukung pelayanan dan pertumbuhan GKJ Pamulang.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pelayanan Jemaat</h3>
              <p className="text-sm text-gray-600">Meningkatkan kualitas pelayanan pastoral kepada jemaat</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pertumbuhan Gereja</h3>
              <p className="text-sm text-gray-600">Mendukung pengembangan dan pertumbuhan jemaat</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visi Misi Bersama</h3>
              <p className="text-sm text-gray-600">Mewujudkan visi dan misi gereja bersama-sama</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};