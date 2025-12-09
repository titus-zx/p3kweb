import React from 'react';
import { Church, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Church className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">GKJ Pamulang</h3>
                <p className="text-sm text-gray-400">Panitia Pemanggilan Pendeta Kedua GKJ Pamulang</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Melayani dengan kasih dan membawa damai sejahtera.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Jl. Siliwangi No. 7, Pamulang, Tangerang Selatan, Banten
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">(021) 7413873</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">pppkgjp@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Menu</h4>
            <div className="space-y-2">
              <a href="/#timeline" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Alur Pemanggilan
              </a>
              <a href="/#committee" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Susunan Panitia
              </a>
              <a href="/#candidate" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Profil Calon Pendeta
              </a>
              <a href="/#funding" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Pendanaan
              </a>
              <a href="/janji-iman" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Janji Iman
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Panitia Pemanggilan Pendeta Kedua GKJ Pamulang.
          </p>
        </div>
      </div>
    </footer>
  );
};