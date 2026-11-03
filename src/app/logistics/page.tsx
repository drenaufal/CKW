"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Ship, Truck, Anchor, Factory, MapPin, 
  ShieldCheck, GitMerge, Users, Award, Zap, 
  HeartHandshake, CheckCircle2, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function LogisticsPage() {
  const { locale } = useAppContext();

  // 10 Keunggulan Kompetitif Utama (Section 7)
  const competitiveAdvantages = [
    {
      num: '01',
      icon: Factory,
      title_id: 'Pabrik pengolahan modern yang baru dibangun.',
      title_en: 'Newly constructed, modern processing plant.'
    },
    {
      num: '02',
      icon: MapPin,
      title_id: 'Lokasi strategis tepat di sisi jalan raya nasional 4 lajur.',
      title_en: 'Strategic location directly alongside the 4-lane national highway.'
    },
    {
      num: '03',
      icon: Anchor,
      title_id: 'Hanya berjarak 10 km dari Pelabuhan Rembang.',
      title_en: 'Only 10 km distance from Rembang Seaport.'
    },
    {
      num: '04',
      icon: ShieldCheck,
      title_id: 'Pasokan pasir silika yang andal dalam jangka panjang.',
      title_en: 'Reliable, long-term guaranteed silica sand supply.'
    },
    {
      num: '05',
      icon: GitMerge,
      title_id: 'Kemitraan penambangan dan pengolahan yang terintegrasi.',
      title_en: 'Integrated mining and beneficiation processing partnership.'
    },
    {
      num: '06',
      icon: Users,
      title_id: 'Tim manajemen berpengalaman di industri silika & mineral.',
      title_en: 'Experienced management team in silica and mineral industries.'
    },
    {
      num: '07',
      icon: Award,
      title_id: 'Kualitas produk yang konsisten dan teruji lab.',
      title_en: 'Consistent, laboratory-verified product quality.'
    },
    {
      num: '08',
      icon: Zap,
      title_id: 'Kemampuan produksi fleksibel (hingga 50.000 MT/bulan).',
      title_en: 'Flexible production capability (up to 50,000 MT/month).'
    },
    {
      num: '09',
      icon: Truck,
      title_id: 'Jaringan logistik darat dan laut yang efisien.',
      title_en: 'Efficient multimodal overland and maritime logistics network.'
    },
    {
      num: '10',
      icon: HeartHandshake,
      title_id: 'Komitmen kuat terhadap kepuasan jangka panjang pelanggan.',
      title_en: 'Strong commitment to long-term customer satisfaction.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c50a30?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Logistik, Distribusi & Keunggulan Kompetitif' : 'Logistics, Distribution & Competitive Edge'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Logistik, Distribusi & Keunggulan Kompetitif' : 'Logistics, Distribution & Competitive Advantages'}
          </h1>
          <p className="text-neutral-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            {locale === 'id'
              ? 'Logistik yang efisien merupakan salah satu keunggulan kompetitif utama PT. Cempaga Karya Wijaya.'
              : 'Efficient logistics is one of PT. Cempaga Karya Wijaya\'s primary competitive advantages.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Bagian 1: Manajemen Logistik & Rantai Pasok */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-3">
                <Truck size={14} />
                <span>{locale === 'id' ? 'Bagian 1: Rantai Pasok Terpadu' : 'Part 1: Integrated Supply Chain'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900">
                {locale === 'id' ? 'Manajemen Logistik & Rantai Pasok' : 'Logistics Management & Supply Chain'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-500">
              <CheckCircle2 size={16} className="text-brand-gold-600" />
              <span>{locale === 'id' ? 'Moda Darat & Laut Terkoordinasi' : 'Coordinated Land & Sea Transport'}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Logistik Bahan Baku (Inbound Logistics) */}
            <div className="bg-white rounded-3xl p-7 md:p-9 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue-50 text-brand-navy-950 flex items-center justify-center group-hover:bg-brand-blue-600 group-hover:text-white transition-colors duration-200">
                    <Ship size={28} />
                  </div>
                  <span className="text-xs font-bold font-mono text-brand-gold-600 bg-brand-gold-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {locale === 'id' ? 'Pasokan Hulu (Inbound)' : 'Inbound Supply'}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-brand-navy-950 mb-3">
                  {locale === 'id' ? 'Logistik Bahan Baku' : 'Raw Material Logistics'}
                </h3>

                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  {locale === 'id'
                    ? 'Pasir silika premium diangkut dari Kalimantan Tengah ke Pelabuhan Rembang menggunakan armada tongkang laut berdasarkan kontrak jangka panjang.'
                    : 'Premium silica sand is transported from Central Kalimantan to Rembang Port using ocean barges under long-term supply contracts.'}
                </p>
              </div>

              {/* <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center text-xs font-semibold text-brand-gold-600 gap-2">
                <CheckCircle2 size={15} />
                <span>{locale === 'id' ? 'Jaminan Pasokan Tongkang Berkelanjutan' : 'Continuous Ocean Barge Supply Guarantee'}</span>
              </div> */}
            </div>

            {/* Logistik Produk Jadi (Outbound Logistics) */}
            <div className="bg-white rounded-3xl p-7 md:p-9 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold-50 text-brand-navy-950 flex items-center justify-center group-hover:bg-brand-navy-950 group-hover:text-brand-gold-400 transition-colors duration-200">
                    <Truck size={28} />
                  </div>
                  <span className="text-xs font-bold font-mono text-brand-blue-600 bg-brand-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {locale === 'id' ? 'Distribusi Hilir (Outbound)' : 'Outbound Dispatch'}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-brand-navy-950 mb-4">
                  {locale === 'id' ? 'Logistik Produk Jadi' : 'Finished Goods Logistics'}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100">
                    <div className="w-8 h-8 rounded-lg bg-white text-brand-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm md:text-base text-neutral-900 mb-1">
                        {locale === 'id' ? 'Pengiriman Darat' : 'Inland Trucking'}
                      </h4>
                      <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                        {locale === 'id'
                          ? 'Pengiriman darat via armada truk kapasitas hingga 40 Metrik Ton langsung ke pabrik pelanggan.'
                          : 'Overland delivery via truck fleets with capacities up to 40 Metric Tons directly to customer plants.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100">
                    <div className="w-8 h-8 rounded-lg bg-white text-brand-navy-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Anchor size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm md:text-base text-neutral-900 mb-1">
                        {locale === 'id' ? 'Pengiriman Laut & Ekspor' : 'Maritime & Export Shipping'}
                      </h4>
                      <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                        {locale === 'id'
                          ? 'Pengiriman laut & ekspor dikapalkan langsung via Pelabuhan Rembang, meminimalkan biaya handling darat.'
                          : 'Maritime shipments and exports dispatched directly via Rembang Port, minimizing overland handling costs.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center text-xs font-semibold text-brand-blue-600 gap-2">
                <CheckCircle2 size={15} />
                <span>{locale === 'id' ? 'Akses Pelabuhan Rembang ±10 km' : '±10 km Direct Access to Rembang Seaport'}</span>
              </div> */}
            </div>

          </div>
        </div>

        {/* Bagian 2: 10 Keunggulan Kompetitif Utama */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-3">
                <Award size={14} />
                <span>{locale === 'id' ? 'Bagian 2: Nilai Tambah Strategis' : 'Part 2: Strategic Value'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900">
                {locale === 'id' ? '10 Keunggulan Kompetitif Utama' : '10 Key Competitive Advantages'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-500">
              <CheckCircle2 size={16} className="text-brand-gold-600" />
              <span>{locale === 'id' ? 'Keunggulan Operasional CKW' : 'CKW Operational Advantages'}</span>
            </div>
          </div>

          {/* Mobile Swipe Cue */}
          <div className="flex items-center justify-between sm:hidden text-xs text-neutral-400 mb-3 px-1">
            <span className="inline-flex items-center gap-1 font-semibold text-brand-blue-600">
              <span>← Geser untuk melihat semua keunggulan →</span>
            </span>
            <span className="text-[11px] font-semibold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
              10 Poin
            </span>
          </div>

          {/* 10 Competitive Advantages: Mobile Slide & Desktop Grid */}
          <div className="flex overflow-x-auto pb-4 pt-1 snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mb-12">
            {competitiveAdvantages.map((adv) => {
              const IconComp = adv.icon;
              return (
                <div 
                  key={adv.num}
                  className="min-w-[280px] max-w-[340px] sm:min-w-0 sm:max-w-none flex-shrink-0 sm:flex-shrink snap-start bg-white rounded-2xl p-5 md:p-6 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-4 md:gap-5 group hover:border-brand-blue-300"
                >
                  <div className="w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-brand-blue-50 text-brand-navy-950 flex items-center justify-center shrink-0 group-hover:bg-brand-blue-600 group-hover:text-white transition-colors duration-200">
                    <IconComp size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold font-mono text-brand-gold-600 mb-1 block">
                      {adv.num}
                    </span>
                    <h3 className="font-display font-bold text-sm md:text-base text-neutral-900 leading-snug group-hover:text-brand-blue-600 transition-colors">
                      {locale === 'id' ? adv.title_id : adv.title_en}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section CTA Konsultasi Logistik & Pengiriman */}
        {/* <div className="bg-brand-navy-950 text-white rounded-3xl p-8 md:p-12 lg:p-14 border border-brand-navy-900 relative overflow-hidden shadow-xl mb-12 w-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-500/20 text-brand-gold-400 text-xs font-semibold">
                <Truck size={14} />
                <span>{locale === 'id' ? 'Layanan Distribusi & Rantai Pasok' : 'Distribution & Supply Chain Service'}</span>
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                {locale === 'id' 
                  ? 'Siap Mendukung Distribusi Pasokan Pasir Silika ke Pabrik Anda' 
                  : 'Ready to Power Reliable Silica Sand Deliveries to Your Plant'}
              </h3>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {locale === 'id'
                  ? 'Dengan keunggulan armada truk darat hingga 40 MT dan kedekatan hanya 10 km dari Pelabuhan Rembang, kami siap melayani kontrak pengiriman FOB, CIF, maupun Franco pabrik dengan jadwal terjamin.'
                  : 'Leveraging overland trucking fleets up to 40 MT and direct 10 km proximity to Rembang Port, we handle FOB, CIF, and Franco destination contracts with guaranteed schedules.'}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Pengiriman Truk 40 MT
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Tongkang Curah Laut & Ekspor
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Dekat Jalur Pantura 4 Lajur
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link 
                href="/contact" 
                className="px-6 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-center text-sm transition-colors shadow flex items-center justify-center gap-2"
              >
                <span>{locale === 'id' ? 'Konsultasi Jadwal Pengiriman' : 'Consult Dispatch Schedule'}</span>
                <ArrowRight size={16} />
              </Link>
              <Link 
                href="/operations" 
                className="px-6 py-3.5 bg-brand-navy-900 hover:bg-brand-navy-800 text-white border border-brand-navy-700 font-semibold rounded-xl text-center text-sm transition-colors"
              >
                {locale === 'id' ? 'Lihat Fasilitas & Kapasitas' : 'View Plant Facilities'}
              </Link>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}
