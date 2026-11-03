"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Layers, SunMedium, Factory, Grid, Leaf, 
  Building2, Filter, Flame, Cpu, CheckCircle2, 
  Globe
} from 'lucide-react';

export default function IndustriesPage() {
  const { locale } = useAppContext();

  // 9 Sektor Industri (Section 6: Industri yang Kami Layani)
  const industries = [
    {
      num: '01',
      icon: Layers,
      title_id: 'Pembuatan Kaca',
      title_en: 'Glass Manufacturing'
    },
    {
      num: '02',
      icon: SunMedium,
      title_id: 'Panel Surya & Fotovoltaik',
      title_en: 'Solar & Photovoltaics'
    },
    {
      num: '03',
      icon: Factory,
      title_id: 'Pembuatan Semen',
      title_en: 'Cement Manufacturing'
    },
    {
      num: '04',
      icon: Grid,
      title_id: 'Industri Keramik',
      title_en: 'Ceramics Industry'
    },
    {
      num: '05',
      icon: Leaf,
      title_id: 'Industri Pupuk',
      title_en: 'Fertilizer Industry'
    },
    {
      num: '06',
      icon: Building2,
      title_id: 'Bahan Bangunan',
      title_en: 'Building Materials'
    },
    {
      num: '07',
      icon: Filter,
      title_id: 'Mineral Industri',
      title_en: 'Industrial Minerals'
    },
    {
      num: '08',
      icon: Flame,
      title_id: 'Pengecoran',
      title_en: 'Foundry & Metal Casting'
    },
    {
      num: '09',
      icon: Cpu,
      title_id: 'Industri Manufaktur Khusus Lainnya',
      title_en: 'Other Specialized Manufacturing'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Sektor Industri Manufaktur' : 'Manufacturing Industry Sectors'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Industri yang Kami Layani' : 'Industries We Serve'}
          </h1>
          <p className="text-neutral-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            {locale === 'id'
              ? 'Produk pasir silika PT. Cempaga Karya Wijaya mendukung berbagai sektor industri manufaktur strategis.'
              : 'PT. Cempaga Karya Wijaya silica sand products support diverse strategic manufacturing industry sectors.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-3">
                <Factory size={14} />
                <span>{locale === 'id' ? '9 Sektor Industri Utama' : '9 Primary Industrial Sectors'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900">
                {locale === 'id' ? 'Sektor Industri Manufaktur Strategis' : 'Strategic Manufacturing Sectors'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-500">
              <CheckCircle2 size={16} className="text-brand-gold-600" />
              <span>{locale === 'id' ? 'Jangkauan Nasional & Ekspor' : 'Domestic & Export Reach'}</span>
            </div>
          </div>

          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            {locale === 'id'
              ? 'Produk pasir silika PT. Cempaga Karya Wijaya mendukung berbagai sektor industri manufaktur strategis:'
              : 'PT. Cempaga Karya Wijaya silica sand products support diverse strategic manufacturing industry sectors:'}
          </p>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex items-center justify-between sm:hidden text-xs text-neutral-400 mb-3 px-1">
          <span className="inline-flex items-center gap-1 font-semibold text-brand-blue-600">
            <span>← Geser untuk melihat semua industri →</span>
          </span>
          <span className="text-[11px] font-semibold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
            9 Sektor
          </span>
        </div>

        {/* 9 Industry Cards: Mobile Slide & Desktop Grid */}
        <div className="flex overflow-x-auto pb-4 pt-1 snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mb-12">
          {industries.map((ind) => {
            const IconComp = ind.icon;
            return (
              <div 
                key={ind.num}
                className="min-w-[270px] max-w-[320px] sm:min-w-0 sm:max-w-none flex-shrink-0 sm:flex-shrink snap-start bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group hover:border-brand-blue-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-blue-50 text-brand-navy-950 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-600 group-hover:text-white transition-colors duration-200">
                  <IconComp size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold font-mono text-brand-gold-600 mb-1 block">
                    {ind.num}
                  </span>
                  <h3 className="font-display font-bold text-base md:text-lg text-neutral-900 leading-snug group-hover:text-brand-blue-600 transition-colors">
                    {locale === 'id' ? ind.title_id : ind.title_en}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Jangkauan Logistik Strategis (Lebar Penuh) */}
        <div className="bg-brand-navy-950 text-white rounded-3xl p-8 md:p-12 lg:p-14 border border-brand-navy-900 relative overflow-hidden shadow-xl mb-12 w-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 w-full space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-500/20 text-brand-gold-400 text-xs font-semibold">
              <Globe size={15} />
              <span>{locale === 'id' ? 'Jangkauan Logistik Strategis' : 'Strategic Logistics Reach'}</span>
            </div>
            <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-white leading-relaxed md:leading-snug max-w-none">
              {locale === 'id' 
                ? 'Basis pelanggan utama kami tersebar di sepanjang koridor industri antara Semarang dan Surabaya, dengan peluang tambahan untuk pasar ekspor.'
                : 'Our primary customer base is spread along the industrial corridor between Semarang and Surabaya, with additional opportunities for export markets.'}
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
}
