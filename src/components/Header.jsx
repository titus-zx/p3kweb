import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/stempel.png" 
              alt="PPPK GKJP Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">GKJ Pamulang</h1>
              <p className="text-sm text-gray-600">Panitia Pemanggilan Pendeta Kedua</p>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6">
            {isHomePage ? (
              <>
                <a href="#timeline" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Alur Pemanggilan
                </a>
                <a href="#committee" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Susunan Panitia
                </a>
                <a href="#candidate" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Profil Calon
                </a>
                <a href="#funding" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Pendanaan
                </a>
              </>
            ) : (
              <>
                <Link to="/#timeline" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Alur Pemanggilan
                </Link>
                <Link to="/#committee" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Susunan Panitia
                </Link>
                <Link to="/#candidate" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Profil Calon
                </Link>
                <Link to="/#funding" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Pendanaan
                </Link>
              </>
            )}
            <Link to="/janji-iman" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Janji Iman
            </Link>
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
              {isHomePage ? (
                <>
                  <a
                    href="#timeline"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
                  >
                    Alur Pemanggilan
                  </a>
                  <a
                    href="#committee"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
                  >
                    Susunan Panitia
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
                </>
              ) : (
                <>
                  <Link
                    to="/#timeline"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
                  >
                    Alur Pemanggilan
                  </Link>
                  <Link
                    to="/#committee"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
                  >
                    Susunan Panitia
                  </Link>
                  <Link
                    to="/#candidate"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
                  >
                    Profil Calon
                  </Link>
                  <Link
                    to="/#funding"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
                  >
                    Pendanaan
                  </Link>
                </>
              )}
              <Link
                to="/janji-iman"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
              >
                Janji Iman
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};