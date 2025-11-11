import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/stempel.png" 
              alt="PPPK GKJP Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">GKJ Pamulang</h1>
              <p className="text-sm text-gray-600">Panitia Pemanggilan Pendeta Kedua</p>
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
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <a
                href="#timeline"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
              >
                Alur Pemanggilan
              </a>
              <a
                href="#candidate"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
              >
                Profil Calon
              </a>
              <a
                href="#funding"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
              >
                Pendanaan
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};