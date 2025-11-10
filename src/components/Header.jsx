import React from 'react';
import { Church } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Church className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GKJ Pamulang</h1>
              <p className="text-sm text-gray-600">Panitia Pemanggilan Pendeta</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#timeline" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Alur Pemanggilan
            </a>
            <a href="#candidate" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Profil Calon
            </a>
            <a href="#funding" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Pendanaan
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};