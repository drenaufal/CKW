"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { CheckCircle2, Target, Eye, ShieldCheck, MapPin, Award, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { locale } = useAppContext();

  return (
    <div className="w-full">
      {/* Page Header / Breadcrumb Hero */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Profil & Landasan Perusahaan' : 'Corporate Identity & Values'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Tentang PT. Cempaga Karya Wijaya' : 'About PT. Cempaga Karya Wijaya'}
          </h1>
          <p className="text-neutral-300 max-w-2xl mx-auto text-sm md:text-base">
            {locale === 'id'
              ? 'Menghubungkan standar pengolahan mineral internasional dengan potensi sumber daya pasir silika Indonesia.'
              : 'Bridging international mineral processing standards with Indonesian natural silica resources.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-600 text-xs font-semibold mb-4">
              <MapPin size={14} />
              <span>Rembang, Jawa Tengah</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900 mb-6 leading-tight">
              {locale === 'id' ? 'Gambaran Umum Perusahaan' : 'Company Overview'}
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed text-sm md:text-base">
              <p>
                {locale === 'id' 
                  ? 'PT. Cempaga Karya Wijaya (CKW) adalah perusahaan pengolahan pasir silika modern yang didirikan untuk memenuhi permintaan yang terus meningkat akan pasir silika berkualitas premium di seluruh Indonesia dan pasar internasional.'
                  : 'PT. Cempaga Karya Wijaya (CKW) is a modern silica sand processing enterprise established to satisfy the growing domestic and global demand for premium-grade industrial silica sand.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Berlokasi strategis di Rembang, Jawa Tengah, pabrik pengolahan kami menggabungkan teknologi pencucian hidrolik bertekanan tinggi, pemurnian magnetik basah (WHIMS), pencampuran homogen, dan pemisahan ukuran canggih dengan jaringan logistik efisien.'
                  : 'Strategically situated in Rembang, Central Java, our processing plant integrates high-pressure hydraulic washing, wet high-intensity magnetic separation (WHIMS), mechanical homogenization, and precision grading screens.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Pabrik kami dikelola oleh tim manajemen berpengalaman dengan keahlian luas di bidang penambangan silika, pemrosesan mineral, pengujian mutu laboratorium ASTM, dan ekspor internasional.'
                  : 'Our plant is operated by seasoned industry veterans with deep expertise in silica geology, mineral beneficiation, ASTM testing protocols, and bulk maritime logistics.'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1578330722394-b258529e71ec?q=80&w=2070" alt="Plant Processing" className="rounded-2xl h-56 md:h-64 object-cover w-full shadow-lg" />
              <div className="bg-brand-navy-900 text-white p-5 rounded-2xl">
                <span className="font-display font-bold text-2xl text-brand-gold-400 block">50.000 MT</span>
                <span className="text-xs text-neutral-300">{locale === 'id' ? 'Kapasitas Produksi Bulanan' : 'Monthly Production Capacity'}</span>
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="bg-brand-gold-500 text-brand-navy-950 p-5 rounded-2xl">
                <span className="font-display font-bold text-2xl block">≥ 99.3%</span>
                <span className="text-xs font-semibold">{locale === 'id' ? 'Kemurnian SiO2 Kaca Float' : 'SiO2 Float Glass Purity'}</span>
              </div>
              <img src="https://images.unsplash.com/photo-1615214040995-1f953dd6a5cc?q=80&w=2070" alt="Silica Mineral" className="rounded-2xl h-56 md:h-64 object-cover w-full shadow-lg" />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="bg-brand-navy-950 text-white rounded-3xl p-8 md:p-14 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-gold-500 text-brand-navy-950 rounded-xl flex items-center justify-center font-bold">
                  <Eye size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  {locale === 'id' ? 'Visi Perusahaan' : 'Corporate Vision'}
                </h3>
              </div>
              <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal bg-brand-navy-900/60 p-6 rounded-2xl border border-brand-navy-800">
                {locale === 'id'
                  ? 'Menjadi produsen dan pemasok pasir silika olahan berkualitas premium terkemuka di Indonesia, yang dikenal karena keunggulan, inovasi, keberlanjutan, dan layanan yang andal di pasar domestik maupun internasional.'
                  : 'To become the premier producer and supplier of high-purity processed silica sand in Indonesia, renowned for technical excellence, continuous innovation, sustainability, and dependable commercial partnerships worldwide.'}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
                  <Target size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  {locale === 'id' ? 'Misi Strategis' : 'Strategic Missions'}
                </h3>
              </div>
              <ul className="space-y-3.5">
                {[
                  {
                    id: 'Menghasilkan produk pasir silika berkualitas tinggi yang secara konsisten memenuhi spesifikasi ketat pelanggan industri.',
                    en: 'Produce high-purity silica products consistently matching demanding industrial client specifications.'
                  },
                  {
                    id: 'Membangun kemitraan jangka panjang melalui pasokan yang andal, jaminan mutu teruji, dan layanan profesional.',
                    en: 'Establish sustainable long-term partnerships backed by reliable supply, QA protocols, and responsive service.'
                  },
                  {
                    id: 'Terus meningkatkan teknologi pengolahan mineral dan efisiensi operasional pabrik yang ramah lingkungan.',
                    en: 'Continuously advance beneficiation technologies, water recycling, and operational efficiency.'
                  },
                  {
                    id: 'Menciptakan nilai berkelanjutan bagi pelanggan, mitra pemegang saham, karyawan, dan masyarakat sekitar.',
                    en: 'Create lasting value for industrial clients, shareholders, workforce, and host communities.'
                  },
                  {
                    id: 'Mendukung pertumbuhan industri hilir nasional dan ekspansi pasar ekspor regional.',
                    en: 'Support Indonesian downstream industrialization and regional ASEAN export growth.'
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-gold-400 shrink-0 mt-1" />
                    <span className="text-neutral-300 text-sm leading-relaxed">{locale === 'id' ? item.id : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-sans font-semibold text-brand-gold-600 tracking-widest uppercase text-xs mb-2 block">
              {locale === 'id' ? 'Etika Kerja & Budaya' : 'Work Ethics & Culture'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900">
              {locale === 'id' ? 'Nilai-Nilai Inti Kami' : 'Our Core Corporate Values'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title_id: 'Integritas', title_en: 'Integrity', desc_id: 'Kami menjalankan bisnis dengan jujur, beretika, dan transparan dalam setiap kesepakatan komersial.', desc_en: 'We conduct business honestly, ethically, and transparently across every commercial agreement.' },
              { title_id: 'Kualitas Prima', title_en: 'Uncompromised Quality', desc_id: 'Komitmen mutlak untuk menghadirkan produk yang secara konsisten melampaui harapan dan toleransi teknis.', desc_en: 'Unwavering dedication to delivering products that consistently beat technical tolerance benchmarks.' },
              { title_id: 'Keamanan (K3)', title_en: 'Safety & Welfare', desc_id: 'Memprioritaskan keselamatan kerja dan kesejahteraan karyawan, kontraktor, serta lingkungan pabrik.', desc_en: 'Prioritizing workplace occupational health and environmental safety for all plant operators.' },
              { title_id: 'Keandalan Pasokan', title_en: 'Supply Reliability', desc_id: 'Menyediakan pasokan yang terjamin dan pengiriman tepat waktu dengan armada darat dan laut.', desc_en: 'Guaranteeing continuous supply and punctual delivery schedules via maritime and trucking channels.' },
              { title_id: 'Kolaborasi & Kemitraan', title_en: 'Partnership & Synergy', desc_id: 'Sinergi timbal balik yang saling menguntungkan demi kesuksesan operasional jangka panjang.', desc_en: 'Mutual respect and strategic cooperation to build enduring, fruitful client relationships.' },
              { title_id: 'Fokus Pelanggan', title_en: 'Customer Centricity', desc_id: 'Kepuasan dan kebutuhan spesifik mitra industri adalah inti dari setiap inovasi proses kami.', desc_en: 'Industrial buyer satisfaction and custom spec formulation lie at the center of our operations.' }
            ].map((val, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center font-bold mb-4">
                  {idx + 1}
                </div>
                <h4 className="font-display font-bold text-lg text-brand-navy-950 mb-2">{locale === 'id' ? val.title_id : val.title_en}</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">{locale === 'id' ? val.desc_id : val.desc_en}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Commitment */}
        <div className="bg-neutral-100 rounded-3xl p-8 md:p-12 border border-neutral-200">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-green-700 font-semibold text-xs uppercase tracking-wider block mb-2">
                {locale === 'id' ? 'Komitmen Lingkungan & Keberlanjutan' : 'ESG & Environmental Responsibility'}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
                {locale === 'id' ? 'Pengelolaan Bertanggung Jawab & Zero Waste' : 'Responsible Processing & Closed-Loop Recycling'}
              </h3>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
                {locale === 'id'
                  ? 'Kami menerapkan sistem sirkulasi air tertutup (closed-loop water recycling) hingga ≥ 90% pada proses pencucian, pengontrol debu modern, dan pembuangan limbah terkelola sesuai regulasi lingkungan hidup Indonesia.'
                  : 'We implement ≥ 90% closed-loop process water recycling, advanced dust suppression scrubbers, and strict compliance with Indonesian environmental regulatory standards.'}
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link href="/contact" className="px-6 py-3.5 bg-brand-navy-950 hover:bg-brand-navy-900 text-white font-semibold rounded-xl text-sm transition-colors shadow">
                {locale === 'id' ? 'Hubungi Kantor Operasional' : 'Contact Operations Office'}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

