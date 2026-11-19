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
      title_id: 'Pemanfaatan Sumber Daya yang Efisien',
      title_en: 'Efficient utilization of natural resources.',
      desc_id: 'Pemanfaatan sumber daya alam secara bijak, bertanggung jawab, dan efisien.',
      desc_en: 'Efficient utilization of natural resources.'
    },
    {
      icon: Droplets,
      title_id: 'Pengelolaan Air yang Bertanggung Jawab',
      title_en: 'Responsible water management during washing processes.',
      desc_id: 'Pengelolaan air tertutup dan bertanggung jawab selama proses pencucian silika.',
      desc_en: 'Responsible water management during washing processes.'
    },
    {
      icon: Wind,
      title_id: 'Pengendalian Debu Operasional',
      title_en: 'Dust control throughout plant operations.',
      desc_id: 'Sistem penanganan dan pengendalian debu di seluruh area operasional pabrik.',
      desc_en: 'Dust control throughout plant operations.'
    },
    {
      icon: Recycle,
      title_id: 'Pengelolaan & Daur Ulang Limbah',
      title_en: 'Proper waste management and recycling where possible.',
      desc_id: 'Pengelolaan limbah yang tepat serta daur ulang material jika memungkinkan.',
      desc_en: 'Proper waste management and recycling where possible.'
    },
    {
      icon: FileCheck2,
      title_id: 'Kepatuhan Regulasi Lingkungan',
      title_en: 'Compliance with applicable Indonesian environmental regulations.',
      desc_id: 'Kepatuhan penuh terhadap undang-undang dan peraturan lingkungan hidup Indonesia yang berlaku.',
      desc_en: 'Compliance with applicable Indonesian environmental regulations.'
    },
    {
      icon: ShieldCheck,
      title_id: 'Lingkungan Kerja Bersih & Aman',
      title_en: 'Maintaining a clean, safe, and environmentally responsible workplace.',
      desc_id: 'Menjaga area tempat kerja tetap bersih, aman, dan bertanggung jawab terhadap lingkungan.',
      desc_en: 'Maintaining a clean, safe, and environmentally responsible workplace.'
    },
    {
      icon: Sparkles,
      title_id: 'Penyempurnaan Metode Pengolahan Ramah Lingkungan',
      title_en: 'Continuous improvement of environmentally friendly processing methods.',
      desc_id: 'Peningkatan berkelanjutan pada metode pemrosesan yang ramah lingkungan.',
      desc_en: 'Continuous improvement of environmentally friendly processing methods.'
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
                  ? 'PT. Cempaga Karya Wijaya adalah perusahaan pengolahan pasir silika modern yang didirikan untuk memenuhi permintaan yang terus meningkat akan pasir silika berkualitas premium di seluruh Indonesia dan pasar internasional.'
                  : 'PT. Cempaga Karya Wijaya is a modern silica sand processing company established to serve the growing demand for premium quality silica sand throughout Indonesia and international markets.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Berlokasi strategis di Rembang, Jawa Tengah, pabrik pengolahan kami yang baru dibangun menggabungkan teknologi pencucian, pemurnian, pencampuran, dan pemisahan ukuran yang canggih dengan jaringan logistik yang efisien untuk menghasilkan produk pasir silika berkualitas tinggi bagi berbagai aplikasi industri.'
                  : 'Located strategically in Rembang, Central Java, our newly constructed processing plant combines advanced washing, purification, blending, and sizing technology with an efficient logistics network to deliver high-quality silica sand products for various industrial applications.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Pabrik kami didirikan oleh tim manajemen berpengalaman dengan keahlian luas di bidang penambangan silika, pengolahan mineral, pemasaran domestik, dan ekspor internasional. Kombinasi pengetahuan teknis dan pengalaman operasional ini memungkinkan kami untuk secara konsisten memasok produk yang memenuhi persyaratan kualitas dari industri yang menuntut.'
                  : 'Our plant has been established by an experienced management team with extensive expertise in silica mining, mineral processing, domestic marketing, and international exports. This combination of technical knowledge and operational experience enables us to consistently supply products that meet the quality requirements of demanding industries.'}
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
                  : 'To become Indonesia’s leading producer and supplier of premium quality processed silica sand, recognized for excellence, innovation, sustainability, and reliable service in both domestic and international markets.'}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
                  <Target size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  {locale === 'id' ? 'Misi Perusahaan' : 'Mission'}
                </h3>
              </div>
              <ul className="space-y-3.5">
                {[
                  {
                    id: 'Menghasilkan produk pasir silika berkualitas tinggi yang secara konsisten memenuhi spesifikasi pelanggan.',
                    en: 'To produce high-quality silica sand products that consistently meet customer specifications.'
                  },
                  {
                    id: 'Membangun kemitraan jangka panjang melalui pasokan yang andal, jaminan kualitas, dan layanan profesional.',
                    en: 'To establish long-term partnerships through reliable supply, quality assurance, and professional service.'
                  },
                  {
                    id: 'Terus meningkatkan teknologi pengolahan dan efisiensi operasional.',
                    en: 'To continuously improve processing technology and operational efficiency.'
                  },
                  {
                    id: 'Menciptakan nilai berkelanjutan bagi pelanggan, pemegang saham, karyawan, dan masyarakat sekitar.',
                    en: 'To create sustainable value for customers, shareholders, employees, and local communities.'
                  },
                  {
                    id: 'Mendukung perkembangan industri Indonesia dengan menyediakan produk pasir silika kelas dunia.',
                    en: 'To support Indonesia’s industrial development by providing world-class silica sand products.'
                  },
                  {
                    id: 'Memperluas keberadaan kami di pasar ekspor regional dan global.',
                    en: 'To expand our presence in regional and global export markets.'
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
                desc_en: 'We conduct business honestly, ethically, and transparently.'
              },
              {
                title_id: 'Kualitas',
                title_en: 'Quality',
                desc_id: 'Berkomitmen menghadirkan produk yang secara konsisten memenuhi atau melampaui harapan pelanggan.',
                desc_en: 'We are committed to delivering products that consistently meet or exceed customer expectations.'
              },
              {
                title_id: 'Keamanan (K3)',
                title_en: 'Safety',
                desc_id: 'Memprioritaskan keselamatan dan kesejahteraan karyawan, kontraktor, dan pengunjung di area operasional.',
                desc_en: 'We prioritize the safety and wellbeing of our employees, contractors, and visitors.'
              },
              {
                title_id: 'Keandalan',
                title_en: 'Reliability',
                desc_id: 'Menyediakan pasokan stabil yang dapat diandalkan dan memastikan pengiriman tepat waktu untuk setiap pelanggan.',
                desc_en: 'We strive to provide dependable supply and timely delivery for every customer.'
              },
              {
                title_id: 'Kerja Sama',
                title_en: 'Teamwork',
                desc_id: 'Percaya bahwa kolaborasi erat dan sikap saling menghormati menciptakan kesuksesan yang berkelanjutan.',
                desc_en: 'We believe collaboration and mutual respect create lasting success.'
              },
              {
                title_id: 'Peningkatan Berkelanjutan',
                title_en: 'Continuous Improvement',
                desc_id: 'Terus berinvestasi dalam teknologi pengolahan modern, pengembangan SDM, dan keunggulan operasional.',
                desc_en: 'We continually invest in technology, people, and operational excellence.'
              },
              {
                title_id: 'Fokus Pelanggan',
                title_en: 'Customer Focus',
                desc_id: 'Kepuasan pelanggan adalah inti dari semua aktivitas bisnis yang kami lakukan.',
                desc_en: 'Customer satisfaction is at the center of everything we do.'
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
            <p className="mt-6 text-neutral-600 text-sm md:text-base leading-relaxed italic bg-emerald-50/50 border border-emerald-200/50 p-4 rounded-xl">
              {locale === 'id'
                ? 'Kami percaya bahwa operasi yang berkelanjutan sangat penting bagi keberhasilan bisnis jangka panjang dan pengelolaan sumber daya alam yang bertanggung jawab.'
                : 'We believe that sustainable operations are essential for long-term business success and responsible stewardship of natural resources.'}
            </p>
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
                  {locale === 'id' ? 'Komitmen' : 'Commitment'}
                </h3>
              </div>

              <div className="space-y-4 text-neutral-200 text-sm md:text-base leading-relaxed border-l-2 border-brand-gold-500/60 pl-6">
                <p>
                  {locale === 'id'
                    ? 'Di PT. Cempaga Karya Wijaya, kami berdedikasi untuk menjadi mitra tepercaya bagi industri yang membutuhkan pasir silika premium. Melalui teknologi pemrosesan modern, logistik strategis, manajemen berpengalaman, dan komitmen teguh terhadap kualitas, kami siap mendukung pertumbuhan berkelanjutan sektor manufaktur Indonesia sekaligus memperluas kehadiran kami di pasar internasional.'
                    : 'At PT. Cempaga Karya Wijaya, we are dedicated to becoming a trusted partner for industries requiring premium silica sand. Through modern processing technology, strategic logistics, experienced management, and an unwavering commitment to quality, we are ready to support the continued growth of Indonesia’s manufacturing sector while expanding our presence in international markets.'}
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
