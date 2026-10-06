"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Menu, X, ChevronRight, Phone, Mail, Globe } from 'lucide-react';

export default function Navbar() {
  const { locale, setLocale } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleLocale = () => {
    setLocale(locale === 'id' ? 'en' : 'id');
  };

  const navLinks = [
    { href: '/', label_id: 'Beranda', label_en: 'Home' },
    { href: '/about', label_id: 'Tentang Kami', label_en: 'About Us' },
    { href: '/operations', label_id: 'Operasi & Fasilitas', label_en: 'Operations' },
    { href: '/products', label_id: 'Katalog Produk', label_en: 'Products' },
    { href: '/industries', label_id: 'Industri', label_en: 'Industries' },
    { href: '/logistics', label_id: 'Logistik', label_en: 'Logistics' },
    { href: '/contact', label_id: 'Kontak & RFQ', label_en: 'Contact & RFQ' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-[74px] md:h-[82px] lg:h-[90px] bg-brand-navy-950 border-b border-brand-navy-900/90 shadow-lg transition-all">
        <div className="max-w-7xl mx-auto h-full px-4 md:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -ml-2 text-white hover:bg-brand-navy-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-full flex items-center justify-center p-1 border-2 border-brand-gold-500 overflow-hidden shrink-0">
                <img src="/logo.jpeg" alt="CKW Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-base md:text-lg tracking-tight group-hover:text-brand-gold-400 transition-colors">
                  PT. CEMPAGA KARYA WIJAYA
                </span>
                <span className="font-sans text-brand-gold-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                  Quality in Every Grain
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center gap-6 text-sm text-neutral-200">
              <a href="tel:+625364230046" className="flex items-center gap-2 hover:text-brand-gold-400 transition-colors">
                <Phone size={16} className="text-brand-gold-500" />
                <span>+62 536 4230046</span>
              </a>
              <a href="mailto:cempagakaryawijaya@gmail.com" className="flex items-center gap-2 hover:text-brand-gold-400 transition-colors">
                <Mail size={16} className="text-brand-gold-500" />
                <span>Email Sales</span>
              </a>
            </div>
            
            <div className="w-px h-6 bg-brand-navy-800 hidden lg:block"></div>
            
            <button 
              onClick={toggleLocale}
              className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm font-semibold text-white bg-brand-navy-800 hover:bg-brand-navy-900 rounded-lg border border-brand-navy-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
              title="Ganti Bahasa / Change Language"
            >
              <Globe size={15} className="text-brand-gold-500" />
              <span>{locale === 'id' ? 'ID' : 'EN'}</span>
            </button>

            {/* <Link
              href="/admin"
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-bold text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 rounded-lg transition-colors shadow-sm"
            >
              CMS
            </Link> */}
          </div>
        </div>
      </header>

      {/* Collapsible Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-brand-navy-950 border-r border-brand-navy-900/90 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} top-[74px] md:top-[82px] lg:top-[90px]`}
      >
        <div className="flex flex-col h-full overflow-y-auto py-6 px-4">
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-brand-navy-800 border-l-4 border-brand-gold-500 text-white shadow-inner' 
                      : 'text-neutral-300 hover:bg-brand-navy-900 hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  <span className="font-sans font-medium text-[15px]">
                    {locale === 'id' ? link.label_id : link.label_en}
                  </span>
                  {isActive && <ChevronRight size={18} className="text-brand-gold-500" />}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-brand-navy-900 space-y-3">
            {/* <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-500 rounded-xl transition-colors"
            >
              {locale === 'id' ? 'Minta Penawaran (RFQ)' : 'Request Quote (RFQ)'}
            </Link> */}
            {/* <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-brand-navy-950 bg-brand-gold-500 hover:bg-brand-gold-400 rounded-xl transition-colors"
            >
              {locale === 'id' ? 'Akses Admin CMS' : 'Admin CMS Access'}
            </Link> */}
          </div>
        </div>
      </div>

      {/* Overlay for mobile & desktop backdrop when drawer is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-navy-950/60 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

