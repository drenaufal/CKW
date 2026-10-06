"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { locale } = useAppContext();

  return (
    <footer className="bg-brand-navy-950 pt-16 pb-8 border-t-4 border-brand-gold-500 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-brand-gold-500 overflow-hidden shrink-0">
                <img src="/logo.jpeg" alt="CKW Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base leading-tight">
                  PT. CEMPAGA KARYA WIJAYA
                </h3>
                <span className="text-brand-gold-500 text-xs font-semibold tracking-wider uppercase block">
                  Quality in Every Grain
                </span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {locale === 'id' 
                ? 'Perusahaan pengolahan pasir silika modern yang didirikan untuk memenuhi permintaan akan pasir silika berkualitas premium (SiO2 ≥ 99.3%, Fe2O3 ultra-rendah) di seluruh Indonesia dan pasar internasional.'
                : 'Modern silica sand processing enterprise established to satisfy high demand for premium quality silica sand (SiO2 ≥ 99.3%, ultra-low Fe2O3) across Indonesia and international markets.'}
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-brand-navy-900 border border-brand-navy-800 rounded-full text-xs font-mono text-brand-gold-400">
                Rembang Hub • Pantura Corridor
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-brand-gold-500"></span>
              {locale === 'id' ? 'Navigasi Portal' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label_id: 'Tentang Perusahaan', label_en: 'About Company' },
                { href: '/operations', label_id: 'Operasi & 7-Tahap Benefisiasi', label_en: 'Operations & 7 Stages' },
                { href: '/products', label_id: 'Katalog Pasir Silika', label_en: 'Silica Products Catalog' },
                { href: '/industries', label_id: '9 Sektor Industri', label_en: '9 Industry Sectors' },
                { href: '/logistics', label_id: 'Logistik & Jetty Pelabuhan', label_en: 'Logistics & Seaport Jetty' },
                { href: '/contact', label_id: 'Formulir Permintaan Penawaran (RFQ)', label_en: 'Commercial RFQ Inquiries' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-brand-gold-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-navy-800 group-hover:bg-brand-gold-500 transition-colors"></span>
                    {locale === 'id' ? link.label_id : link.label_en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-brand-gold-500"></span>
              {locale === 'id' ? 'Kontak & Pabrik' : 'Contact & Plant'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin size={18} className="text-brand-gold-500 shrink-0 mt-0.5" />
                <span>Karangharjo, Tegalmulyo, Kragan, Rembang, Jawa Tengah (±10 km ke Pelabuhan Rembang)</span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <Phone size={18} className="text-brand-gold-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="tel:+625364230046" className="hover:text-brand-gold-400 transition-colors">+62 536 4230046 (Office)</a>
                  <a href="tel:+6282315161767" className="hover:text-brand-gold-400 transition-colors">+62 823 1516 1767 (Direct/WA)</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Mail size={18} className="text-brand-gold-500 shrink-0" />
                <a href="mailto:cempagakaryawijaya@gmail.com" className="hover:text-brand-gold-400 transition-colors">cempagakaryawijaya@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Globe size={18} className="text-brand-gold-500 shrink-0" />
                <a href="https://www.cempagakaryawijaya.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold-400 transition-colors">www.cempagakaryawijaya.com</a>
              </li>
            </ul>
          </div>

          {/* Commercial CTA & Zoho Bridge */}
          {/* <div>
            <div className="bg-brand-navy-900 rounded-2xl p-6 border border-brand-navy-800">
              <h4 className="font-display font-bold text-white text-base mb-3">
                {locale === 'id' ? 'Butuh Pasokan Skala Besar?' : 'Need Bulk Supply?'}
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                {locale === 'id' 
                  ? 'Kapasitas produksi 50.000 MT/Bulan dengan jaminan pasokan jangka panjang & integrasi otomatis Zoho Mail.' 
                  : '50,000 MT/Month capacity with long-term guaranteed supply & automated Zoho Mail integration.'}
              </p>
              <Link href="/contact" className="flex items-center justify-center gap-1.5 w-full text-center px-4 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl transition-colors text-xs uppercase tracking-wider">
                <span>{locale === 'id' ? 'Minta Penawaran (RFQ)' : 'Request RFQ Quote'}</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div> */}

        </div>

        <div className="pt-8 border-t border-brand-navy-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} PT. Cempaga Karya Wijaya. {locale === 'id' ? 'Seluruh Hak Cipta Dilindungi.' : 'All Rights Reserved.'}
          </p>
          <div className="flex items-center gap-4">
            <span>IUP Operasi Produksi</span>
            <span>•</span>
            <span>Rembang, Central Java</span>
            <span>•</span>
            {/* <Link href="/admin" className="text-brand-gold-500 hover:underline">CMS Dashboard</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

