"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Droplets, Sparkles, Layers, Sliders, Settings2, 
  FlaskConical, Filter, SunMedium, ShieldCheck, Package, 
  ArrowRight, CheckCircle2, FileCheck
} from 'lucide-react';
import Link from 'next/link';

export default function SpecificationsPage() {
  const { locale } = useAppContext();

  // Section 5: Varian Produk (Product Variants)
  const productVariants = [
    {
      num: '01',
      icon: Droplets,
      title_id: 'Pasir Silika yang Dicuci (Washed Silica Sand)',
      title_en: 'Washed Silica Sand',
      desc_id: 'Bebas lumpur dan kotoran organik.',
      desc_en: 'Clay-free and free from organic contaminants.'
    },
    {
      num: '02',
      icon: Sparkles,
      title_id: 'Pasir Silika Murni (Purified Silica Sand)',
      title_en: 'Purified Silica Sand',
      desc_id: 'Kadar SiO2 tinggi dengan oksida pengotor minimal.',
      desc_en: 'High SiO2 content with minimal oxide impurities.'
    },
    {
      num: '03',
      icon: Layers,
      title_id: 'Pasir Silika Bertingkat (Graded Silica Sand)',
      title_en: 'Graded Silica Sand',
      desc_id: 'Fraksi mesh spesifik dan seragam.',
      desc_en: 'Specific and uniform mesh fractions.'
    },
    {
      num: '04',
      icon: Sliders,
      title_id: 'Pasir Silika Campuran (Blended Silica Sand)',
      title_en: 'Blended Silica Sand',
      desc_id: 'Komposisi formula sesuai kebutuhan spesifik industri.',
      desc_en: 'Formula composition tailored to specific industrial needs.'
    },
    {
      num: '05',
      icon: Settings2,
      title_id: 'Produk Ukuran Partikel Sesuai Pesanan (Custom Sized Silica Sand)',
      title_en: 'Custom Sized Silica Sand',
      desc_id: 'Sesuai distribusi ukuran partikel pelanggan.',
      desc_en: 'Tailored to customer particle size distribution.'
    }
  ];

  // Section 5: Parameter Kustomisasi yang Dilayani
  const customizationParams = [
    {
      num: '01',
      icon: FlaskConical,
      title_id: 'Komposisi Kimia',
      title_en: 'Chemical Composition',
      desc_id: 'Kadar SiO2, Fe2O3, Al2O3, TiO2, dan LOI.',
      desc_en: 'Assay levels of SiO2, Fe2O3, Al2O3, TiO2, and LOI.'
    },
    {
      num: '02',
      icon: Filter,
      title_id: 'Distribusi Ukuran Partikel',
      title_en: 'Particle Size Distribution',
      desc_id: 'Mesh 30–100, 40–120, AFS fineness, dll.',
      desc_en: 'Mesh 30–100, 40–120, AFS fineness, etc.'
    },
    {
      num: '03',
      icon: SunMedium,
      title_id: 'Kandungan Kelembapan',
      title_en: 'Moisture Content',
      desc_id: 'Kering oven/kiln (≤ 0.1% - 0.2%) atau lembap alami.',
      desc_en: 'Kiln/oven dried (≤ 0.1% - 0.2%) or semi-wet natural moisture.'
    },
    {
      num: '04',
      icon: ShieldCheck,
      title_id: 'Tingkat Kebersihan',
      title_en: 'Particle Cleanliness',
      desc_id: 'Bebas tanah lempung (clay-free) dan bebas bahan organik.',
      desc_en: 'Clay-free and free from organic contaminants.'
    },
    {
      num: '05',
      icon: Package,
      title_id: 'Persyaratan Pengemasan',
      title_en: 'Packaging Requirements',
      desc_id: 'Jumbo Bag (1.0 - 1.5 MT) dengan/tanpa PE liner, kantong 50 kg, atau curah (bulk truk/tongkang).',
      desc_en: 'Jumbo Bag (1.0 - 1.5 MT) with/without PE liner, 50 kg bags, or bulk (truck/barge).'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Produk & Kustomisasi Spesifikasi' : 'Products & Custom Specifications'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Produk & Kustomisasi Spesifikasi' : 'Products & Tailor-Made Specifications'}
          </h1>
          <p className="text-neutral-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            {locale === 'id'
              ? 'PT. Cempaga Karya Wijaya memasok pasir silika olahan yang disesuaikan secara khusus (tailor-made) dengan kebutuhan teknis industri pelanggan.'
              : 'PT. Cempaga Karya Wijaya supplies processed silica sand custom-tailored to the precise technical requirements of our industrial clients.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Bagian 1: Varian Produk */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-3">
                <FileCheck size={14} />
                <span>{locale === 'id' ? 'Bagian 1: Varian Produk' : 'Part 1: Product Variants'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900">
                {locale === 'id' ? 'Varian Produk' : 'Product Variants'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-500">
              <CheckCircle2 size={16} className="text-brand-gold-600" />
              <span>{locale === 'id' ? '5 Varian Produk' : '5 Product Variants'}</span>
            </div>
          </div>

          {/* Mobile Swipe Cue */}
          <div className="flex items-center justify-between sm:hidden text-xs text-neutral-400 mb-3 px-1">
            <span className="inline-flex items-center gap-1 font-semibold text-brand-blue-600">
              <span>← Geser untuk melihat semua varian →</span>
            </span>
            <span className="text-[11px] font-semibold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
              5 Varian
            </span>
          </div>

          {/* Product Variants: Mobile Slide & Desktop Grid */}
          <div className="flex overflow-x-auto pb-4 pt-1 snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mb-12">
            {productVariants.map((variant) => {
              const IconComp = variant.icon;
              return (
                <div 
                  key={variant.num}
                  className="min-w-[280px] max-w-[320px] sm:min-w-0 sm:max-w-none flex-shrink-0 sm:flex-shrink snap-start bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center group-hover:bg-brand-navy-950 group-hover:text-brand-gold-400 transition-colors">
                        <IconComp size={24} />
                      </div>
                      <span className="text-xs font-bold font-mono text-brand-gold-600 bg-brand-gold-50 px-2.5 py-1 rounded-md">
                        {variant.num}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base md:text-lg text-neutral-900 mb-2 leading-snug">
                      {locale === 'id' ? variant.title_id : variant.title_en}
                    </h3>

                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {locale === 'id' ? variant.desc_id : variant.desc_en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bagian 2: Parameter Kustomisasi yang Dilayani */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-3">
                <Sliders size={14} />
                <span>{locale === 'id' ? 'Bagian 2: Parameter Kustomisasi' : 'Part 2: Customization Parameters'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900">
                {locale === 'id' ? 'Parameter Kustomisasi yang Dilayani' : 'Customization Parameters'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-500">
              <CheckCircle2 size={16} className="text-brand-gold-600" />
              <span>{locale === 'id' ? '5 Parameter Kustomisasi' : '5 Customization Parameters'}</span>
            </div>
          </div>

          {/* Customization Parameters Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {customizationParams.map((param) => {
              const ParamIcon = param.icon;
              return (
                <div 
                  key={param.num}
                  className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-brand-blue-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-navy-950 flex items-center justify-center group-hover:bg-brand-blue-600 group-hover:text-white transition-colors">
                        <ParamIcon size={24} />
                      </div>
                      <span className="text-xs font-bold font-mono text-brand-gold-600 bg-brand-gold-50 px-2.5 py-1 rounded-md">
                        {param.num}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base md:text-lg text-neutral-900 mb-2">
                      {locale === 'id' ? param.title_id : param.title_en}
                    </h3>

                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {locale === 'id' ? param.desc_id : param.desc_en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Card: Hubungi Sales & Minta Sampel */}
        {/* <div className="bg-brand-navy-950 text-white rounded-3xl p-8 md:p-12 border border-brand-navy-900 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-brand-gold-400 font-semibold text-xs uppercase tracking-widest block">
                {locale === 'id' ? 'Konsultasi Spesifikasi Khusus' : 'Custom Specification Consultation'}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                {locale === 'id' 
                  ? 'Butuh Spesifikasi Pasir Silika Khusus untuk Pabrik Anda?' 
                  : 'Require Tailored Silica Specifications for Your Plant?'}
              </h3>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {locale === 'id'
                  ? 'Tim teknis laboratorium dan manajemen operasional kami siap memformulasikan pasir silika dengan komposisi kimia (SiO2, Fe2O3), kurva ayakan mesh, kelembapan, dan kemasan sesuai standar pabrik Anda.'
                  : 'Our laboratory and plant technical team are prepared to formulate silica sand matching your precise chemical compositions (SiO2, Fe2O3), mesh sieve curves, moisture thresholds, and packaging standards.'}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Analisis Sampel Gratis
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Sertifikat Analisis (COA)
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-brand-navy-900 px-3 py-1.5 rounded-lg border border-brand-navy-800">
                  <CheckCircle2 size={14} className="text-brand-gold-400" /> Pasokan Berkelanjutan
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link 
                href="/contact" 
                className="px-6 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-center text-sm transition-colors shadow flex items-center justify-center gap-2"
              >
                <span>{locale === 'id' ? 'Konsultasi Spesifikasi / RFQ' : 'Consult Specifications / RFQ'}</span>
                <ArrowRight size={16} />
              </Link>
              <Link 
                href="/products" 
                className="px-6 py-3.5 bg-brand-navy-900 hover:bg-brand-navy-800 text-white border border-brand-navy-700 font-semibold rounded-xl text-center text-sm transition-colors"
              >
                {locale === 'id' ? 'Lihat Katalog Produk' : 'View Product Catalog'}
              </Link>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}
