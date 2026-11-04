"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  MapPin, Route, Anchor, Compass, 
  ArrowRight, Building2
} from 'lucide-react';
import Link from 'next/link';

export default function LocationPage() {
  const { locale } = useAppContext();

  // 3 Poin Utama Letak Pabrik Pengolahan (Section 2)
  const locationPillars = [
    {
      num: '01',
      icon: Route,
      title_id: 'Akses Jalur Utama',
      title_en: 'Direct Highway Access',
      desc_id: 'Bersebelahan langsung dengan jalan raya nasional empat jalur di dalam Kota Rembang (jalur Pantura).',
      desc_en: 'Directly adjacent to the 4-lane national highway corridor within Rembang City (Pantura route).'
    },
    {
      num: '02',
      icon: Anchor,
      title_id: 'Dekat Pelabuhan',
      title_en: 'Proximity to Seaport',
      desc_id: 'Berjarak sekitar 10 km dari Pelabuhan Rembang.',
      desc_en: 'Located approximately 10 km from Rembang Seaport.'
    },
    {
      num: '03',
      icon: Compass,
      title_id: 'Koridor Industri Utama',
      title_en: 'Primary Industrial Corridor',
      desc_id: 'Berada tepat di antara koridor industri strategis Semarang dan Surabaya.',
      desc_en: 'Positioned right between the strategic industrial manufacturing corridor of Semarang and Surabaya.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Keunggulan Geografis & Logistik' : 'Geographical & Logistics Advantage'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Lokasi Strategis' : 'Strategic Location'}
          </h1>
          <p className="text-neutral-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            {locale === 'id'
              ? 'PT. Cempaga Karya Wijaya memiliki lokasi yang sangat menguntungkan yang memberikan manfaat operasional dan logistik yang signifikan.'
              : 'PT. Cempaga Karya Wijaya benefits from an exceptionally advantageous location delivering significant operational and logistics value.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Letak Pabrik Pengolahan */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-3">
                <MapPin size={14} />
                <span>{locale === 'id' ? 'Letak Pabrik Pengolahan' : 'Processing Plant Location'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900">
                {locale === 'id' ? 'Letak Pabrik Pengolahan' : 'Processing Plant Location'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-500">
              <Building2 size={16} className="text-brand-gold-600" />
              <span>Rembang, Jawa Tengah — Indonesia</span>
            </div>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {locationPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div 
                  key={pillar.num}
                  className="bg-white rounded-2xl p-6 md:p-7 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-brand-blue-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-brand-blue-50 text-brand-navy-950 flex items-center justify-center group-hover:bg-brand-blue-600 group-hover:text-white transition-colors duration-200">
                        <IconComp size={24} />
                      </div>
                      <span className="text-xs font-bold font-mono text-brand-gold-600 bg-brand-gold-50 px-2.5 py-1 rounded-md">
                        {pillar.num}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg md:text-xl text-neutral-900 mb-2 leading-snug group-hover:text-brand-blue-600 transition-colors">
                      {locale === 'id' ? pillar.title_id : pillar.title_en}
                    </h3>

                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {locale === 'id' ? pillar.desc_id : pillar.desc_en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Foto Pabrik & Dua Paragraf Penutup Section 2 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-lg grid lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-72 sm:h-96 lg:h-full relative overflow-hidden bg-neutral-900 min-h-[340px]">
              <img 
                src="/plant.jpeg" 
                alt="Pabrik Pengolahan Silika Rembang" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 bg-brand-navy-950/85 backdrop-blur-sm text-brand-gold-400 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <MapPin size={14} />
                <span>Rembang, Jawa Tengah</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-brand-navy-950/80 backdrop-blur-sm text-white p-3.5 rounded-xl text-xs">
                <span className="font-semibold block mb-0.5">PT. Cempaga Karya Wijaya</span>
                <span className="text-neutral-300">Pabrik Pengolahan Pasir Silika • Tepi Jalan Raya Nasional 4 Lajur</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 space-y-6">
              <div className="space-y-5 text-neutral-700 text-sm md:text-base leading-relaxed border-l-2 border-brand-gold-500/60 pl-5">
                <p>
                  {locale === 'id'
                    ? 'Lokasi strategis ini memungkinkan transportasi bahan baku yang efisien dari Kalimantan Tengah dan sekaligus menyediakan pendistribusian produk pasir silika jadi, yang ekonomis kepada pelanggan di seluruh Jawa dan tujuan ekspor luar negeri.'
                    : 'This strategic location enables efficient raw material transport from Central Kalimantan while providing economical finished silica distribution to customers across Java and export destinations.'}
                </p>
                <p className="font-medium text-brand-navy-950">
                  {locale === 'id'
                    ? 'Jarak yang dekat dengan Pelabuhan Rembang secara signifikan mengurangi biaya transportasi baik untuk bahan baku yang masuk maupun pengiriman ekspor keluar.'
                    : 'The close proximity to Rembang Port significantly reduces transportation costs for both incoming raw feed and outgoing export shipments.'}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-navy-950 hover:bg-brand-navy-900 text-white font-bold rounded-xl text-xs md:text-sm transition-colors shadow"
                >
                  <span>{locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
