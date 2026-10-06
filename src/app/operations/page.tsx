"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Cog, Shield, RefreshCw, CheckCircle2, Waves, Flame, Layers } from 'lucide-react';
import Link from 'next/link';

export default function OperationsPage() {
  const { locale } = useAppContext();

  const stages = [
    {
      num: '01',
      title_id: 'Sourcing Mineral Hulu',
      title_en: 'Upstream Mineral Sourcing',
      desc_id: 'Bahan baku pasir silika berkadar alami tinggi dikirim dari konsesi pertambangan Kalimantan Tengah melalui armada tongkang laut ke Pelabuhan Rembang.',
      desc_en: 'Raw high-grade silica feedstocks are transported from certified Central Kalimantan concessions via 300ft ocean barges directly to Rembang Port.'
    },
    {
      num: '02',
      title_id: 'Pencampuran & Homogenisasi Mekanis',
      title_en: 'Mechanical Blending & Homogenization',
      desc_id: 'Pencampuran terkalibrasi antara pasir silika Kalimantan dan cadangan lokal Rembang untuk menstabilkan distribusi ukuran partikel dan kadar SiO2.',
      desc_en: 'Calibrated blending of Kalimantan quartz with selected local Rembang reserves to stabilize particle size distributions and silica concentration.'
    },
    {
      num: '03',
      title_id: 'Pencucian Hidro Bertekanan Tinggi',
      title_en: 'High-Pressure Hydro-Washing',
      desc_id: 'Multi-stage hydro-cyclone washing untuk memisahkan lumpur, debu mikro, dan partikel pengotor larut air dengan air sirkulasi ramah lingkungan.',
      desc_en: 'Multi-stage hydro-cyclone scrubbing to remove fines, organic residues, and soluble contaminants using closed-loop recycled water.'
    },
    {
      num: '04',
      title_id: 'Attrition Scrubbing & De-Sliming',
      title_en: 'Attrition Scrubbing & De-Sliming',
      desc_id: 'Gesekan antar-butir berkecepatan tinggi dalam sel penggosok untuk melepaskan lapisan oksida besi (iron oxide coating) dan lempung yang menempel.',
      desc_en: 'Intense grain-on-grain attrition inside high-shear cells to strip stubborn iron oxide surface coatings and slimes from quartz grains.'
    },
    {
      num: '05',
      title_id: 'Pemisahan Magnetik Basah (WHIMS)',
      title_en: 'Wet High-Intensity Magnetic Separation',
      desc_id: 'Separator magnetik berkekuatan medan tinggi (hingga >10.000 Gauss) untuk mereduksi mineral paramagnetik seperti ilmenit dan hematit hingga Fe2O3 ≤ 120 ppm.',
      desc_en: 'High-gradient wet magnetic separators (>10,000 Gauss) extracting paramagnetic impurities (hematite, ilmenite) to suppress Fe2O3 below 120 ppm.'
    },
    {
      num: '06',
      title_id: 'Pengeringan Kiln Terfluidisasi',
      title_en: 'Fluidized Bed & Rotary Kiln Drying',
      desc_id: 'Pengeringan termal presisi dengan burner hemat energi untuk menghasilkan produk pasir silika kering dengan kadar kelembapan konstan ≤ 0.2%.',
      desc_en: 'High-efficiency thermal drying systems producing uniform dry silica product with moisture content strictly maintained at or below 0.2%.'
    },
    {
      num: '07',
      title_id: 'Pengayakan Multi-Dek & Bagging Otomatis',
      title_en: 'Multi-Deck Vibratory Grading & Bagging',
      desc_id: 'Pemisahan fraksi ukuran presisi menggunakan saringan vibrasi multi-dek (ASTM screens) dan pengemasan otomatis ke dalam Jumbo Bag 1.0 - 1.5 MT.',
      desc_en: 'Precision size fraction classification using multi-deck vibratory screens followed by automated packing into 1.0 - 1.5 MT Jumbo Bags or bulk dispatch.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Standar Benefisiasi Industri' : 'Industrial Beneficiation Standards'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Operasi, Fasilitas & Teknologi' : 'Operations, Facilities & Beneficiation'}
          </h1>
          <p className="text-neutral-300 max-w-2xl mx-auto text-sm md:text-base">
            {locale === 'id'
              ? 'Pabrik pengolahan silika modern terintegrasi berkapasitas 50.000 MT/Bulan dengan kontrol mutu laboratorium bersertifikasi.'
              : 'Integrated modern mineral processing plant with 50,000 MT/Month capacity backed by rigorous laboratory quality assurance.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Plant Overview */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900 mb-6">
              {locale === 'id' ? 'Infrastruktur Pabrik Modern' : 'State-of-the-Art Processing Plant'}
            </h2>
            <div className="space-y-4 text-neutral-600 text-sm md:text-base leading-relaxed mb-8">
              <p>
                {locale === 'id'
                  ? 'Fasilitas pemrosesan PT. Cempaga Karya Wijaya di Rembang dirancang untuk operasional berkepanjangan dengan sistem otomasi tinggi guna menjaga konsistensi spesifikasi kimia dan fisik setiap ton pasir silika yang diproduksi.'
                  : 'PT. Cempaga Karya Wijaya processing facilities in Rembang are engineered for high-availability production with advanced automation, ensuring strict chemical and physical consistency across every metric ton.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Kemitraan pasokan jangka panjang dengan PT. Cempaga Surya Timur di Kalimantan Tengah menjamin ketersediaan bahan baku silika berkualitas premium secara berkesinambungan tanpa hambatan pasokan.'
                  : 'Our upstream supply partnership with PT. Cempaga Surya Timur in Central Kalimantan guarantees perpetual raw feed availability without interruption.'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-neutral-200 bg-white">
                <span className="font-display font-bold text-2xl text-brand-blue-600 block mb-1">50.000 MT</span>
                <span className="text-xs text-neutral-500 font-medium">{locale === 'id' ? 'Kapasitas Operasional Bulanan' : 'Monthly Plant Capacity'}</span>
              </div>
              <div className="p-4 rounded-xl border border-neutral-200 bg-white">
                <span className="font-display font-bold text-2xl text-brand-gold-600 block mb-1">24 Jam / 3 Shift</span>
                <span className="text-xs text-neutral-500 font-medium">{locale === 'id' ? 'Kesiapan Operasi Penuh' : 'Full Scale Continuous Shifts'}</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">
            <img 
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070" 
              alt="Industrial Plant View" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="px-2.5 py-1 bg-brand-gold-500 text-brand-navy-950 font-bold text-xs rounded-md uppercase tracking-wider mb-2 inline-block">
                  Fasilitas Rembang
                </span>
                <p className="text-sm font-medium text-neutral-200">
                  {locale === 'id' ? 'Unit Pencucian, Pemurnian Magnetik & Pengeringan Kiln' : 'Washing, Magnetic Refining & Kiln Drying Units'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Stage Process */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-blue-600 font-semibold text-xs uppercase tracking-widest block mb-2">
              {locale === 'id' ? 'Tahapan Pemurnian' : 'Beneficiation Workflow'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              {locale === 'id' ? '7 Tahap Proses Pengolahan Pasir Silika' : 'The 7-Stage Beneficiation Process'}
            </h2>
            <p className="text-neutral-600 text-sm md:text-base">
              {locale === 'id'
                ? 'Dari bahan mentah alamiah hingga pasir kuarsa berderajat tinggi dengan toleransi kimia ultra-ketat.'
                : 'Transforming raw mined sand into high-purity quartz engineered for high-performance industrial applications.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage) => (
              <div 
                key={stage.num} 
                className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-extrabold text-3xl text-brand-gold-500 group-hover:scale-105 transition-transform">
                      {stage.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                      <Cog size={18} />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-navy-950 mb-3">
                    {locale === 'id' ? stage.title_id : stage.title_en}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {locale === 'id' ? stage.desc_id : stage.desc_en}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-brand-blue-600">
                  <CheckCircle2 size={14} className="mr-1.5" />
                  <span>ASTM / Standard Compliance</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Lab & Assurance */}
        <div className="bg-brand-navy-950 text-white rounded-3xl p-8 md:p-12 border border-brand-navy-900 relative overflow-hidden">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-brand-gold-400 font-semibold text-xs uppercase tracking-widest block">
                {locale === 'id' ? 'Laboratorium & Pengujian Mutu' : 'Quality Assurance Laboratory'}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                {locale === 'id' ? 'Sertifikasi Analisis (COA) di Setiap Batch Pengiriman' : 'Certificate of Analysis (COA) Accompanying Every Dispatch'}
              </h3>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {locale === 'id'
                  ? 'Laboratorium pengujian on-site kami dilengkapi dengan spektrometri XRF, sieve shakers ASTM C-136, dan alat analisa kelembapan digital untuk memastikan spesifikasi kimia (SiO2, Fe2O3, Al2O3) dan fisik (AFS Fineness) terverifikasi sebelum pengiriman.'
                  : 'Our on-site QA laboratory is equipped with XRF Spectrometry, automated ASTM C-136 sieve shakers, and digital moisture analyzers to certify both chemical and physical tolerances prior to dispatch.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link href="/products" className="px-6 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-center text-sm transition-colors">
                {locale === 'id' ? 'Lihat Spesifikasi Produk' : 'View Product Specs'}
              </Link>
              <Link href="/contact" className="px-6 py-3.5 bg-brand-navy-900 hover:bg-brand-navy-800 text-white border border-brand-navy-700 font-semibold rounded-xl text-center text-sm transition-colors">
                {locale === 'id' ? 'Minta Uji Sampel' : 'Request Trial Sample'}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

