"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { ArrowRight, ShieldCheck, Factory, Settings, Ship } from 'lucide-react';

export default function Home() {
  const { locale } = useAppContext();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-brand-navy-950 overflow-hidden">
        {/* Background Image / Pattern Placeholder */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070')] bg-cover bg-center bg-no-repeat grayscale mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-950 via-brand-navy-950/90 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy-800 border border-brand-navy-700 text-brand-gold-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-gold-500 animate-pulse"></span>
              {locale === 'id' ? 'Produsen Pasir Silika Premium' : 'Premium Silica Sand Manufacturer'}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight mb-6">
              {locale === 'id' ? (
                <>Kemurnian Mineral untuk <span className="text-brand-gold-500">Masa Depan Industri</span></>
              ) : (
                <>Mineral Purity for the <span className="text-brand-gold-500">Industrial Future</span></>
              )}
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10 max-w-2xl">
              {locale === 'id' 
                ? 'PT. Cempaga Karya Wijaya memproses pasir silika kemurnian tinggi (SiO2 ≥ 99.3%) untuk industri kaca, surya fotovoltaik, dan pengecoran logam dengan kapasitas 50.000 MT/Bulan.'
                : 'PT. Cempaga Karya Wijaya processes high-purity silica sand (SiO2 ≥ 99.3%) for float glass, solar PV, and foundry industries with a capacity of 50,000 MT/Month.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-brand-gold-500/20">
                {locale === 'id' ? 'Lihat Produk' : 'View Products'}
                <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all">
                {locale === 'id' ? 'Hubungi Sales' : 'Contact Sales'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative z-10 -mt-12 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          
          <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0 first:pt-0">
            <div className="w-12 h-12 bg-brand-blue-50 rounded-xl flex items-center justify-center text-brand-blue-600 mb-4">
              <Factory size={24} />
            </div>
            <h3 className="font-display font-bold text-3xl text-neutral-900 mb-1">50.000</h3>
            <p className="font-sans font-semibold text-brand-gold-600 text-sm uppercase tracking-wider mb-2">MT / {locale === 'id' ? 'Bulan' : 'Month'}</p>
            <p className="text-sm text-neutral-500">
              {locale === 'id' ? 'Kapasitas Produksi' : 'Production Capacity'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <div className="w-12 h-12 bg-brand-blue-50 rounded-xl flex items-center justify-center text-brand-blue-600 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-display font-bold text-3xl text-neutral-900 mb-1">99.3%</h3>
            <p className="font-sans font-semibold text-brand-gold-600 text-sm uppercase tracking-wider mb-2">SiO2 {locale === 'id' ? 'Kemurnian' : 'Purity'}</p>
            <p className="text-sm text-neutral-500">
              {locale === 'id' ? 'Kualitas Kaca Lembaran' : 'Float Glass Grade'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <div className="w-12 h-12 bg-brand-blue-50 rounded-xl flex items-center justify-center text-brand-blue-600 mb-4">
              <Ship size={24} />
            </div>
            <h3 className="font-display font-bold text-3xl text-neutral-900 mb-1">±10 KM</h3>
            <p className="font-sans font-semibold text-brand-gold-600 text-sm uppercase tracking-wider mb-2">
              {locale === 'id' ? 'Ke Pelabuhan' : 'To Seaport'}
            </p>
            <p className="text-sm text-neutral-500">
              {locale === 'id' ? 'Pelabuhan Laut Rembang' : 'Rembang Bulk Port'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <div className="w-12 h-12 bg-brand-blue-50 rounded-xl flex items-center justify-center text-brand-blue-600 mb-4">
              <Settings size={24} />
            </div>
            <h3 className="font-display font-bold text-3xl text-neutral-900 mb-1">9</h3>
            <p className="font-sans font-semibold text-brand-gold-600 text-sm uppercase tracking-wider mb-2">
              {locale === 'id' ? 'Sektor Industri' : 'Industry Sectors'}
            </p>
            <p className="text-sm text-neutral-500">
              {locale === 'id' ? 'Aplikasi Khusus' : 'Specialized Applications'}
            </p>
          </div>

        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-6 leading-tight">
              {locale === 'id' ? 'Pengolahan Mineral Terintegrasi' : 'Integrated Mineral Processing'}
            </h2>
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              {locale === 'id' 
                ? 'Berlokasi strategis di Rembang, Jawa Tengah, pabrik pengolahan kami yang baru dibangun menggabungkan teknologi pencucian, pemurnian, pencampuran, dan pemisahan ukuran yang canggih.'
                : 'Strategically located in Rembang, Central Java, our newly built processing plant incorporates advanced washing, purification, blending, and size separation technologies.'}
            </p>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              {locale === 'id'
                ? 'Kami menghadirkan pasir silika berkualitas premium yang bersumber dari Kalimantan Tengah dan didistribusikan secara efisien melalui jaringan logistik terpadu untuk memenuhi spesifikasi ketat pelanggan.'
                : 'We deliver premium quality silica sand sourced from Central Kalimantan and distributed efficiently through our integrated logistics network to meet strict customer specifications.'}
            </p>
            <Link href="/about" className="inline-flex items-center font-semibold text-brand-blue-600 hover:text-brand-gold-600 transition-colors">
              {locale === 'id' ? 'Pelajari Lebih Lanjut Tentang Kami' : 'Learn More About Us'}
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
             <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070" alt="Plant Operations" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/60 to-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
