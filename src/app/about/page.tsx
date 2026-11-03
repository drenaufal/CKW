"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  CheckCircle2, Target, Eye, ShieldCheck, MapPin,
  Droplets, Wind, Leaf, FileCheck2, Recycle, Quote, ArrowRight, Sparkles, Handshake
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { locale } = useAppContext();

  const environmentalPillars = [
    {
      icon: Leaf,
      title_id: 'Efisiensi Sumber Daya',
      title_en: 'Resource Efficiency',
      desc_id: 'Pemanfaatan sumber daya alam secara bijak dan efisien.',
      desc_en: 'Wise and efficient utilization of natural resources.'
    },
    {
      icon: Droplets,
      title_id: 'Sirkulasi & Pengelolaan Air',
      title_en: 'Water Circulation & Management',
      desc_id: 'Pengelolaan air tertutup dan bertanggung jawab selama proses pencucian silika.',
      desc_en: 'Closed-loop and responsible water management during the silica washing process.'
    },
    {
      icon: Wind,
      title_id: 'Pengendalian Debu',
      title_en: 'Dust Control',
      desc_id: 'Sistem penanganan debu (dust suppression) di seluruh area pabrik.',
      desc_en: 'Dust handling and suppression systems throughout the entire plant area.'
    },
    {
      icon: Recycle,
      title_id: 'Pengelolaan Limbah',
      title_en: 'Waste Management',
      desc_id: 'Pembuangan limbah teratur serta daur ulang material jika memungkinkan.',
      desc_en: 'Orderly waste disposal and material recycling wherever possible.'
    },
    {
      icon: FileCheck2,
      title_id: 'Kepatuhan Regulasi',
      title_en: 'Regulatory Compliance',
      desc_id: 'Kepatuhan penuh terhadap undang-undang dan peraturan lingkungan hidup Republik Indonesia.',
      desc_en: 'Full compliance with environmental laws and regulations of the Republic of Indonesia.'
    },
    {
      icon: ShieldCheck,
      title_id: 'Kesehatan & Keselamatan Lingkungan Kerja',
      title_en: 'Workplace Environmental Health & Safety',
      desc_id: 'Menjaga area kerja tetap bersih, aman, dan ramah lingkungan.',
      desc_en: 'Maintaining the work area to be clean, safe, and environmentally friendly.'
    },
    {
      icon: Sparkles,
      title_id: 'Teknologi Ramah Lingkungan',
      title_en: 'Eco-Friendly Technology',
      desc_id: 'Terus menerapkan inovasi pengolahan yang meminimalkan jejak karbon.',
      desc_en: 'Continuously adopting processing innovations that minimize the carbon footprint.'
    }
  ];

  return (
    <div className="w-full">
      {/* Page Header / Breadcrumb Hero */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
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
              <img src="/plant.jpeg" alt="Plant Processing" className="rounded-2xl h-56 md:h-64 object-cover w-full shadow-lg" />
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
              <img src="/silika.jpeg" alt="Silica Mineral" className="rounded-2xl h-56 md:h-64 object-cover w-full shadow-lg" />
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

        {/* Core Values (Section 9) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-sans font-semibold text-brand-gold-600 tracking-widest uppercase text-xs mb-2 block">
              {locale === 'id' ? 'Etika Kerja & Budaya' : 'Work Ethics & Culture'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-3">
              {locale === 'id' ? 'Nilai-Nilai Inti (Core Values)' : 'Our Core Values'}
            </h2>
            <p className="text-neutral-600 text-sm md:text-base">
              {locale === 'id'
                ? 'PT. Cempaga Karya Wijaya berpegang teguh pada 7 nilai inti organisasi:'
                : 'PT. Cempaga Karya Wijaya firmly adheres to 7 organizational core values:'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                title_id: 'Integritas',
                title_en: 'Integrity',
                desc_id: 'Menjalankan bisnis dengan jujur, beretika, dan transparan.',
                desc_en: 'Conducting business honestly, ethically, and transparently.'
              },
              {
                title_id: 'Kualitas',
                title_en: 'Quality',
                desc_id: 'Berkomitmen menghadirkan produk yang secara konsisten memenuhi atau melampaui harapan pelanggan.',
                desc_en: 'Committed to delivering products that consistently meet or exceed customer expectations.'
              },
              {
                title_id: 'Keamanan (K3)',
                title_en: 'Safety (OHS)',
                desc_id: 'Memprioritaskan keselamatan dan kesejahteraan karyawan, kontraktor, dan pengunjung di area operasional.',
                desc_en: 'Prioritizing the safety and well-being of employees, contractors, and visitors across operational areas.'
              },
              {
                title_id: 'Keandalan',
                title_en: 'Reliability',
                desc_id: 'Menyediakan pasokan stabil yang dapat diandalkan dan memastikan pengiriman tepat waktu untuk setiap pelanggan.',
                desc_en: 'Providing a stable, dependable supply and ensuring punctual delivery for every customer.'
              },
              {
                title_id: 'Kerja Sama',
                title_en: 'Teamwork',
                desc_id: 'Percaya bahwa kolaborasi erat dan sikap saling menghormati menciptakan kesuksesan yang berkelanjutan.',
                desc_en: 'Believing that close collaboration and mutual respect create sustainable success.'
              },
              {
                title_id: 'Peningkatan Berkelanjutan',
                title_en: 'Continuous Improvement',
                desc_id: 'Terus berinvestasi dalam teknologi pengolahan modern, pengembangan SDM, dan keunggulan operasional.',
                desc_en: 'Continuously investing in modern processing technology, human resource development, and operational excellence.'
              },
              {
                title_id: 'Fokus Pelanggan',
                title_en: 'Customer Focus',
                desc_id: 'Kepuasan pelanggan adalah inti dari semua aktivitas bisnis yang kami lakukan.',
                desc_en: 'Customer satisfaction is at the core of all our business activities.'
              }
            ].map((val, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="font-display font-bold text-lg text-brand-navy-950 mb-2">
                    {locale === 'id' ? val.title_id : val.title_en}
                  </h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {locale === 'id' ? val.desc_id : val.desc_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Lingkungan, Keberlanjutan & Komitmen (Section 10) */}
        <div className="bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-3xl p-8 md:p-14 border border-neutral-200/80 shadow-sm mb-12">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
              <Leaf size={14} className="text-emerald-600" />
              <span>{locale === 'id' ? 'Keberlanjutan & Lingkungan Hidup' : 'Sustainability & Environmental Stewardship'}</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-neutral-900 mb-4 tracking-tight">
              {locale === 'id' ? 'Lingkungan, Keberlanjutan & Komitmen' : 'Environment, Sustainability & Commitment'}
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
              {locale === 'id'
                ? 'PT. Cempaga Karya Wijaya berkomitmen terhadap pengelolaan lingkungan yang bertanggung jawab dan operasional industri yang berkelanjutan.'
                : 'PT. Cempaga Karya Wijaya is committed to responsible environmental management and sustainable industrial operations.'}
            </p>
          </div>

          {/* 7 Environmental Pillars List (Full Width Stacked) */}
          <div className="mb-14">
            <h3 className="font-display font-bold text-lg md:text-xl text-brand-navy-950 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
              {locale === 'id' ? 'Komitmen Lingkungan Hidup' : 'Environmental Commitment'}
            </h3>
            <div className="flex flex-col gap-4">
              {environmentalPillars.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="w-full bg-white rounded-2xl p-6 md:p-7 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center gap-5 md:gap-6 group"
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 shrink-0">
                        <IconComponent size={24} />
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md md:hidden">
                        Pilar 0{idx + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="hidden md:inline-block text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-md shrink-0">
                          0{idx + 1}
                        </span>
                        <h4 className="font-display font-bold text-base md:text-lg text-neutral-900 leading-snug">
                          {locale === 'id' ? item.title_id : item.title_en}
                        </h4>
                      </div>
                      <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                        {locale === 'id' ? item.desc_id : item.desc_en}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Partnership Commitment Card */}
          <div className="bg-brand-navy-950 text-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-lg border border-brand-navy-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center">
                  <Handshake size={22} />
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white">
                  {locale === 'id' ? 'Komitmen Kemitraan' : 'Partnership Commitment'}
                </h3>
              </div>

              <div className="space-y-4 text-neutral-200 text-sm md:text-base leading-relaxed border-l-2 border-brand-gold-500/60 pl-6">
                <p>
                  {locale === 'id'
                    ? 'PT. Cempaga Karya Wijaya berdedikasi menjadi mitra strategis terpercaya bagi industri manufaktur yang membutuhkan pasokan pasir silika premium. Melalui perpaduan teknologi pengolahan modern, logistik strategis, manajemen berpengalaman, dan komitmen mutu tanpa kompromi, kami siap mendukung daya saing industri nasional dan internasional.'
                    : 'PT. Cempaga Karya Wijaya is dedicated to being a trusted strategic partner for manufacturing industries requiring premium silica sand supplies. Through a combination of modern processing technology, strategic logistics, seasoned management, and an uncompromising commitment to quality, we are ready to support the competitiveness of national and international industries.'}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="font-display font-semibold text-white block">PT. Cempaga Karya Wijaya</span>
                  <span className="text-xs text-neutral-400">{locale === 'id' ? 'Manajemen & Dewan Direksi' : 'Board of Directors & Executive Management'}</span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-sm transition-colors shadow"
                >
                  <span>{locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
