"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Factory, Gauge, Clock, Users, Zap, Layers, Filter, 
  Warehouse, Truck, FlaskConical, Building2, Coffee, 
  CheckCircle2, ShieldCheck, ArrowRight, Sparkles, MapPin, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function OperationsPage() {
  const { locale } = useAppContext();

  // Key Operational Capacity Metrics (Section 4: Kapasitas Operasional)
  const metrics = [
    {
      icon: Gauge,
      value: '50.000 MT',
      unit: locale === 'id' ? '/ Bulan' : '/ Month',
      title_id: 'Kapasitas Produksi',
      title_en: 'Production Capacity',
      desc_id: 'Kapasitas produksi mencapai 50.000 Metrik Ton (MT) per bulan untuk menjamin pasokan industri secara stabil.',
      desc_en: 'Production capacity reaches 50,000 Metric Tons (MT) per month to ensure stable industrial supply.'
    },
    {
      icon: Clock,
      value: '10 Jam',
      unit: locale === 'id' ? '/ Hari (Standar)' : '/ Day (Standard)',
      title_id: 'Jam Operasi Standar',
      title_en: 'Standard Operating Hours',
      desc_id: 'Jam operasi standar 10 jam per hari, 24 hari kerja per bulan secara efisien dan konsisten.',
      desc_en: 'Standard operation of 10 hours per day, 24 working days per month with optimal throughput.'
    },
    {
      icon: Users,
      value: '30',
      unit: locale === 'id' ? 'Personel' : 'Personnel',
      title_id: 'Tenaga Kerja',
      title_en: 'Workforce',
      desc_id: 'Didukung sekitar 30 personel teknis dan operasional yang terlatih dan tersertifikasi.',
      desc_en: 'Supported by approximately 30 trained and certified technical and operational personnel.'
    },
    {
      icon: Zap,
      value: '24 Jam',
      unit: locale === 'id' ? '/ 3 Shift Nonstop' : '/ 3 Shifts Nonstop',
      title_id: 'Skalabilitas Produksi',
      title_en: 'Production Scalability',
      desc_id: 'Dirancang untuk produksi skala penuh hingga 3 shift per hari (24 jam nonstop) sesuai lonjakan permintaan pasar.',
      desc_en: 'Engineered for full-scale operations up to 3 shifts per day (24-hour nonstop production) upon market demand surges.'
    }
  ];

  // 12 Plant Infrastructure & Facilities (Section 4: Infrastruktur & Fasilitas Pabrik)
  const facilities = [
    {
      num: '01',
      icon: Layers,
      title_id: 'Sistem Pencucian Silika Modern (Modern Silica Washing Plant)',
      title_en: 'Modern Silica Washing Plant'
    },
    {
      num: '02',
      icon: Filter,
      title_id: 'Fasilitas Pemurnian Mineral (Beneficiation Plant)',
      title_en: 'Beneficiation Plant'
    },
    {
      num: '03',
      icon: Factory,
      title_id: 'Peralatan Pencampur (Industrial Blenders)',
      title_en: 'Industrial Blenders'
    },
    {
      num: '04',
      icon: Gauge,
      title_id: 'Peralatan Penyaringan dan Pemisah Ukuran (Screening & Sieving Equipment)',
      title_en: 'Screening & Sieving Equipment'
    },
    {
      num: '05',
      icon: Warehouse,
      title_id: 'Area Penyimpanan Bahan Baku (Raw Material Stockpile Area)',
      title_en: 'Raw Material Stockpile Area'
    },
    {
      num: '06',
      icon: Warehouse,
      title_id: 'Gudang / Area Penyimpanan Produk Jadi (Finished Goods Storage)',
      title_en: 'Finished Goods Storage'
    },
    {
      num: '07',
      icon: Truck,
      title_id: 'Fasilitas Pemuatan Truk (Truck Loading Bays)',
      title_en: 'Truck Loading Bays'
    },
    {
      num: '08',
      icon: Coffee,
      title_id: 'Kantin Karyawan',
      title_en: 'Employee Cafeteria'
    },
    {
      num: '09',
      icon: Sparkles,
      title_id: 'Ruang Ibadah',
      title_en: 'Prayer Room'
    },
    {
      num: '10',
      icon: ShieldCheck,
      title_id: 'Area Istirahat Staf',
      title_en: 'Staff Rest Area'
    },
    {
      num: '11',
      icon: Building2,
      title_id: 'Kantor Administrasi',
      title_en: 'Administrative Office'
    },
    {
      num: '12',
      icon: FlaskConical,
      title_id: 'Fasilitas Pengendalian Mutu (QC Laboratory)',
      title_en: 'Quality Control Laboratory (QC Lab)'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Kapasitas Produksi & Fasilitas' : 'Production Capacity & Facilities'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Kapasitas Operasional & Fasilitas Pabrik' : 'Operational Capacity & Processing Facilities'}
          </h1>
          <p className="text-neutral-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            {locale === 'id'
              ? 'Fasilitas pabrik pengolahan PT. Cempaga Karya Wijaya telah dirancang untuk operasi yang efisien, berkecepatan tinggi, dan dapat ditingkatkan skalanya (scalable).'
              : 'PT. Cempaga Karya Wijaya processing facilities have been engineered for high-efficiency, high-throughput, and scalable operations.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Bagian 1: Kapasitas Operasional */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-3">
                <Gauge size={14} />
                <span>{locale === 'id' ? 'Bagian 1: Kapasitas Operasional' : 'Part 1: Operational Capacity'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900">
                {locale === 'id' ? 'Kapasitas Operasional' : 'Operational Capacity'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-500">
              <MapPin size={16} className="text-brand-gold-600" />
              <span>Rembang, Jawa Tengah — Indonesia</span>
            </div>
          </div>

          {/* Caption / Keterangan Resmi */}
          <div className="space-y-2 mb-8 text-neutral-600 text-sm md:text-base leading-relaxed">
            <p>
              {locale === 'id'
                ? 'Fasilitas ini telah dirancang untuk operasi yang efisien dan dapat diskalakan.'
                : 'This facility has been designed for efficient and scalable operations.'}
            </p>
            <p className="text-neutral-500 text-xs md:text-sm">
              {locale === 'id'
                ? 'Dirancang untuk operasional berkepanjangan dengan sistem otomasi tinggi guna menjaga konsistensi spesifikasi kimia dan fisik setiap ton pasir silika yang diproduksi.'
                : 'Engineered for sustained operations with high-precision automation ensuring strict chemical and physical consistency across every ton produced.'}
            </p>
          </div>

          {/* Mobile Swipe Cue */}
          <div className="flex items-center justify-between sm:hidden text-xs text-neutral-400 mb-3 px-1">
            <span className="inline-flex items-center gap-1 font-semibold text-brand-blue-600">
              <span>← Geser untuk melihat semua metrik →</span>
            </span>
            <span className="text-[11px] font-semibold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
              4 Kartu
            </span>
          </div>

          {/* Metric Cards: Mobile Slide (Horizontal Scroll with Snap) & Desktop Grid */}
          <div className="flex overflow-x-auto pb-4 pt-1 snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mb-8">
            {metrics.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className="min-w-[280px] max-w-[320px] sm:min-w-0 sm:max-w-none flex-shrink-0 sm:flex-shrink snap-start bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center mb-4 group-hover:bg-brand-navy-950 group-hover:text-brand-gold-400 transition-colors">
                      <IconComp size={24} />
                    </div>
                    <div className="mb-2">
                      <span className="font-display font-extrabold text-3xl text-brand-navy-950 block">
                        {item.value}
                      </span>
                      <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-wide">
                        {item.unit}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-neutral-900 mb-2">
                      {locale === 'id' ? item.title_id : item.title_en}
                    </h3>
                  </div>
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed border-t border-neutral-100 pt-3">
                    {locale === 'id' ? item.desc_id : item.desc_en}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Scalability Feature Banner */}
          <div className="bg-gradient-to-r from-brand-navy-950 via-brand-navy-900 to-brand-navy-950 text-white rounded-2xl p-6 md:p-8 border border-brand-navy-800 shadow-md">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold-500/20 text-brand-gold-400 text-xs font-semibold mb-3">
                  <Zap size={14} />
                  <span>{locale === 'id' ? 'Skalabilitas Produksi Fleksibel' : 'Flexible Production Scalability'}</span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2">
                  {locale === 'id' ? 'Kesiapan Operasi Skala Penuh: 3 Shift (24 Jam Nonstop)' : 'Full Scale Continuous Operations: 3 Shifts (24/7 Nonstop)'}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {locale === 'id'
                    ? 'Pabrik dirancang untuk produksi skala penuh hingga 3 shift per hari (24 jam nonstop) sesuai lonjakan permintaan pasar.'
                    : 'Engineered for full-scale operations up to 3 shifts per day (24-hour nonstop production) to accommodate market demand surges.'}
                </p>
              </div>
              <div className="flex md:justify-end">
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5 text-center w-full md:w-auto">
                  <span className="text-xs text-neutral-300 uppercase tracking-wider block mb-1">
                    {locale === 'id' ? 'Mode Siaga Skala Penuh' : 'Full Scale Readiness'}
                  </span>
                  <span className="font-display font-extrabold text-2xl text-brand-gold-400 block">
                    3 Shift / 24 Jam
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold mt-1 inline-flex items-center gap-1">
                    <CheckCircle2 size={12} /> {locale === 'id' ? 'Siap Operasi 100%' : '100% Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian 2: Infrastruktur & Fasilitas Pabrik (Header sama persis & semua poin jadi satu tanpa kategori) */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-3">
                <Building2 size={14} />
                <span>{locale === 'id' ? 'Bagian 2: Infrastruktur & Fasilitas Pabrik' : 'Part 2: Infrastructure & Facilities'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900">
                {locale === 'id' ? 'Infrastruktur & Fasilitas Pabrik' : 'Plant Infrastructure & Facilities'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-500">
              <Factory size={16} className="text-brand-gold-600" />
              <span>{locale === 'id' ? '12 Fasilitas Terintegrasi' : '12 Integrated Facilities'}</span>
            </div>
          </div>

          <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-8">
            {locale === 'id'
              ? 'Fasilitas pengolahan ini telah dikembangkan dengan infrastruktur operasional yang lengkap, termasuk:'
              : 'Our processing facility has been developed with comprehensive operational infrastructure, including:'}
          </p>

          {/* Unified 12 Facilities Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {facilities.map((facility) => {
              const FacIcon = facility.icon;
              return (
                <div 
                  key={facility.num}
                  className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group hover:border-brand-blue-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-navy-950 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-600 group-hover:text-white transition-colors">
                    <FacIcon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-brand-gold-600 mb-1 block">
                      {facility.num}
                    </span>
                    <h4 className="font-display font-bold text-sm md:text-base text-neutral-900 leading-snug">
                      {locale === 'id' ? facility.title_id : facility.title_en}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Upstream Supply Synergy (Kemitraan Pasokan) */}
        {/* <div className="bg-brand-navy-950 text-white rounded-3xl p-8 md:p-12 border border-brand-navy-900 relative overflow-hidden shadow-xl mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-brand-gold-400 font-semibold text-xs uppercase tracking-widest block">
                {locale === 'id' ? 'Sinergi Pasokan Bahan Baku Terjamin' : 'Guaranteed Feedstock Supply Synergy'}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                {locale === 'id' 
                  ? 'Kemitraan Strategis Pasokan Silika Kalimantan Tengah' 
                  : 'Strategic Upstream Central Kalimantan Supply Partnership'}
              </h3>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {locale === 'id'
                  ? 'PT. Cempaga Karya Wijaya memiliki perjanjian pasokan bahan baku jangka panjang dengan PT. Cempaga Surya Timur di Kalimantan Tengah. Sinergi kepemilikan saham ini menjamin ketersediaan bahan baku pasir silika yang aman, andal, dan berkelanjutan untuk mendukung kapasitas penuh pabrik kami.'
                  : 'PT. Cempaga Karya Wijaya maintains a long-term feedstock supply agreement with PT. Cempaga Surya Timur in Central Kalimantan. This shared-ownership synergy guarantees an uninterrupted, secure, and sustainable supply of raw silica to power our plant capacity.'}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Pasokan Jangka Panjang
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Pengiriman Tongkang Terjadwal
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Jaminan Bebas Hambatan Pasokan
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link 
                href="/products" 
                className="px-6 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-center text-sm transition-colors shadow"
              >
                {locale === 'id' ? 'Lihat Spesifikasi Produk' : 'View Product Specs'}
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3.5 bg-brand-navy-900 hover:bg-brand-navy-800 text-white border border-brand-navy-700 font-semibold rounded-xl text-center text-sm transition-colors"
              >
                {locale === 'id' ? 'Jadwalkan Kunjungan Pabrik' : 'Schedule Plant Visit'}
              </Link>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}
