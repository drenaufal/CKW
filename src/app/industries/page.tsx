"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IndustriesPage() {
  const { locale } = useAppContext();

  const industries = [
    {
      title_id: 'Industri Kaca Float & Kaca Lembaran',
      title_en: 'Float & Architectural Flat Glass',
      img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=2070',
      specs: 'SiO2 ≥ 99.3%, Fe2O3 ≤ 0.020%, Mesh 30-100',
      desc_id: 'Memerlukan kemurnian kimia sangat tinggi untuk memastikan transmisi cahaya jernih tanpa distorsi warna kehijauan yang disebabkan oleh residu oksida besi.',
      desc_en: 'Requires ultra-high chemical purity to ensure brilliant light transmission without greenish discoloration caused by iron contamination.'
    },
    {
      title_id: 'Kaca Panel Surya (Photovoltaic PV)',
      title_en: 'Solar Photovoltaic (PV) Cover Glass',
      img: 'https://images.unsplash.com/photo-1509391366360-1200b7b44370?q=80&w=2072',
      specs: 'SiO2 ≥ 99.5%, Fe2O3 ≤ 100 ppm, TiO2 ≤ 0.01%',
      desc_id: 'Bahan baku vital untuk kaca pelindung sel fotovoltaik surya dengan transmisi foton maksimal untuk meningkatkan efisiensi konversi daya modul.',
      desc_en: 'Critical raw feed for photovoltaic protective covers demanding maximum photon transmission to elevate solar module efficiency.'
    },
    {
      title_id: 'Pengecoran Logam & Cetakan Cor (Foundry)',
      title_en: 'Metal Casting & Foundry Sands',
      img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070',
      specs: 'AFS 45-55, Sub-angular grains, Hardness 7 Mohs',
      desc_id: 'Titik lebur tinggi dan permeabilitas optimal untuk cetakan logam besi, baja, dan paduan otomotif untuk mencegah cacat gas pada produk cor.',
      desc_en: 'High refractory threshold and balanced permeability for casting cores in automotive and heavy equipment foundries.'
    },
    {
      title_id: 'Media Filtrasi Air Bersih & Limbah',
      title_en: 'Municipal & Industrial Water Filtration',
      img: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=2070',
      specs: 'ES 0.5-1.2 mm, UC ≤ 1.4, SNI & AWWA B100',
      desc_id: 'Pasir silika berkoefisien keseragaman tinggi untuk menyaring partikel tersuspensi, sedimen, dan lumut pada pengolahan air minum dan limbah industri.',
      desc_en: 'Uniformity-controlled silica grains effectively trapping particulate turbidity in municipal and industrial wastewater facilities.'
    },
    {
      title_id: 'Mortar Kering, Semen Instan & Konstruksi',
      title_en: 'Dry-Mix Mortar, Grouting & Construction',
      img: 'https://images.unsplash.com/photo-1541888087455-236b280327f5?q=80&w=2070',
      specs: 'Kering Kiln ≤ 0.2% moisture, Gradasi Terukur',
      desc_id: 'Agregat kering presisi tinggi untuk mortar perekat bata ringan, skim coat, dan beton mutu tinggi dengan daya lekat optimal.',
      desc_en: 'High-purity dry aggregates ensuring optimal compressive bond strength and workability in pre-blended dry chemical mortar systems.'
    },
    {
      title_id: 'Keramik, Saniter & Granit Ubin',
      title_en: 'Ceramics, Sanitaryware & Porcelain Tiles',
      img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070',
      specs: 'SiO2 ≥ 99.0%, Low LOI, Granulometri Stabil',
      desc_id: 'Komponen bodi keramik dan glasir untuk meningkatkan kekerasan struktural, ketahanan abrasi, dan stabilitas termal saat pembakaran kiln.',
      desc_en: 'Vital component for ceramic bodies and glaze formulation offering thermal shock stability and scratch resistance.'
    },
    {
      title_id: 'Industri Kimia & Natrium Silikat',
      title_en: 'Chemical Industry & Sodium Silicate',
      img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070',
      specs: 'Kereaktifan Tinggi, SiO2 ≥ 99.2%',
      desc_id: 'Bahan baku sintesis waterglass (natrium silikat), silika gel desikan, dan senyawa kimia berbasis silikon.',
      desc_en: 'Essential precursor for sodium silicate (water glass) synthesis, silica gels, and silicone-based chemicals.'
    },
    {
      title_id: 'Lantai Epoksi & Sandblasting',
      title_en: 'Epoxy Flooring & Surface Sandblasting',
      img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=2070',
      specs: 'Kekerasan Tinggi 7 Mohs, Butir Bersih',
      desc_id: 'Digunakan sebagai agregat anti-selip pada pelapis lantai resin epoksi industri dan abrasif sandblasting untuk persiapan permukaan baja.',
      desc_en: 'Used as anti-slip broadcast aggregate for heavy-duty epoxy floors and profile sandblasting for steel structures.'
    },
    {
      title_id: 'Pengeboran Migas (Frac Sand)',
      title_en: 'Oil & Gas Hydraulic Fracturing Sand',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069',
      specs: 'Crush Resistance Tinggi, Sphericity Optimal',
      desc_id: 'Proppant silika dengan ketahanan tekan tinggi untuk menjaga rekahan formasi sumur minyak dan gas tetap terbuka pada tekanan tinggi.',
      desc_en: 'High crush-resistant quartz proppant engineered to prop open hydraulic fractures in oil and gas production wells.'
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Sektor Industri Manufaktur' : 'Manufacturing Industry Sectors'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Industri yang Kami Layani' : 'Industries We Serve'}
          </h1>
          <p className="text-neutral-300 max-w-2xl mx-auto text-sm md:text-base">
            {locale === 'id'
              ? 'Pasir silika PT. Cempaga Karya Wijaya menopang kebutuhan strategis rantai pasok industri nasional dan regional.'
              : 'Our refined quartz products supply strategic supply chains across 9 primary manufacturing sectors.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {industries.map((ind, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={ind.img} 
                  alt={ind.title_en} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-brand-navy-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold text-brand-gold-400">
                  {ind.specs}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-navy-950 mb-2 leading-snug">
                    {locale === 'id' ? ind.title_id : ind.title_en}
                  </h3>
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mb-6">
                    {locale === 'id' ? ind.desc_id : ind.desc_en}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-100">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center text-xs font-bold text-brand-blue-600 hover:text-brand-gold-600 transition-colors"
                  >
                    <span>{locale === 'id' ? 'Konsultasi Spesifikasi Industri' : 'Consult Industry Specs'}</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Corridor Banner */}
        <div className="bg-brand-navy-900 text-white rounded-3xl p-8 md:p-12 border border-brand-navy-800">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-brand-gold-400 font-semibold text-xs uppercase tracking-wider block mb-2">
                {locale === 'id' ? 'Jaringan Pasokan Koridor Pantura' : 'Pantura Industrial Corridor Network'}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
                {locale === 'id' ? 'Konektivitas Cepat: Semarang - Rembang - Surabaya' : 'Rapid Freight: Semarang - Rembang - Surabaya'}
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {locale === 'id'
                  ? 'Lokasi sentral kami di jalur nasional 4 lajur memungkinkan pasokan "Just-in-Time" ke kawasan industri Jawa Tengah & Jawa Timur, serta pengiriman ekspor luar negeri via Pelabuhan Rembang.'
                  : 'Our central facility along the 4-lane national highway corridor provides Just-in-Time delivery to plants across Central & East Java, alongside maritime export dispatch from Rembang Port.'}
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link 
                href="/logistics"
                className="px-6 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-sm transition-colors shadow"
              >
                {locale === 'id' ? 'Pelajari Jaringan Logistik' : 'Explore Logistics Network'}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

