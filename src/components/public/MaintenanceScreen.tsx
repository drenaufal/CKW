"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Wrench, Phone, Mail, Clock, ShieldCheck, 
  MessageCircle, Globe, Lock, ArrowRight, 
  Send, Factory, Truck, CheckCircle2, AlertCircle, Eye
} from 'lucide-react';
import Link from 'next/link';

interface MaintenanceScreenProps {
  onEnablePreview?: () => void;
}

export default function MaintenanceScreen({ onEnablePreview }: MaintenanceScreenProps) {
  const { locale, setLocale, maintenanceConfig, currentUser, toggleMaintenanceMode } = useAppContext();
  const [rfqName, setRfqName] = useState('');
  const [rfqCompany, setRfqCompany] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqGrade, setRfqGrade] = useState('Float Glass Silica (Mesh 30-100)');
  const [rfqVolume, setRfqVolume] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleLocale = () => {
    setLocale(locale === 'id' ? 'en' : 'id');
  };

  const title = locale === 'id' 
    ? (maintenanceConfig.title_id || 'Portal Resmi Sedang Dalam Pemeliharaan Sistem') 
    : (maintenanceConfig.title_en || 'Official Portal Under Scheduled Maintenance');

  const message = locale === 'id'
    ? (maintenanceConfig.message_id || 'Kami sedang melakukan pemeliharaan infrastruktur digital terpadu dan sinkronisasi sistem katalog spesifikasi pasir silika PT. Cempaga Karya Wijaya untuk meningkatkan performa layanan. Untuk sementara, halaman informasi publik dinonaktifkan hingga proses pemeliharaan selesai.')
    : (maintenanceConfig.message_en || 'We are currently conducting scheduled infrastructure upgrades and system catalog optimizations for PT. Cempaga Karya Wijaya corporate portal. Public browsing is temporarily suspended while upgrades are finalized.');

  const handleQuickRfq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqName || !rfqPhone) return;

    const text = encodeURIComponent(
      `Halo Tim Komersial PT. Cempaga Karya Wijaya,\n` +
      `Saya ingin mengajukan permintaan kuotasi mendesak:\n\n` +
      `• Nama: ${rfqName}\n` +
      `• Perusahaan: ${rfqCompany || '-'}\n` +
      `• No. Kontak: ${rfqPhone}\n` +
      `• Grade Silika: ${rfqGrade}\n` +
      `• Kebutuhan Volume: ${rfqVolume || 'Fleksibel'}\n\n` +
      `Mohon info ketersediaan stok & penawaran harga pengiriman.`
    );

    window.open(`https://wa.me/6282315161767?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-navy-950 text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-brand-gold-500 selection:text-brand-navy-950">
      
      {/* Background Ambience / Industrial Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-navy-900/70 via-brand-navy-950 to-black pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-brand-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Admin Notice Bar (Visible only when Admin is logged in) */}
      {currentUser && (
        <div className="relative z-50 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-brand-navy-950 px-4 py-2 text-xs font-bold shadow-lg flex flex-wrap items-center justify-between gap-3 border-b border-amber-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-navy-950 animate-pulse"></span>
            <span>
              <strong>STATUS ADMIN:</strong> Mode Pemeliharaan sedang <strong>AKTIF</strong>. Pengunjung umum hanya dapat melihat halaman penjelasan maintenance ini.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onEnablePreview && (
              <button
                onClick={onEnablePreview}
                className="px-3 py-1 bg-white/90 hover:bg-white text-brand-navy-950 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
              >
                <Eye size={13} />
                <span>Pratinjau Situs Penuh</span>
              </button>
            )}
            <Link 
              href="/admin" 
              className="px-3 py-1 bg-brand-navy-950 text-white hover:bg-brand-navy-900 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
            >
              <span>Panel CMS Admin</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-brand-gold-500 shadow-xl shadow-brand-gold-500/20 shrink-0">
            <img src="/logo.jpeg" alt="Logo PT. Cempaga Karya Wijaya" className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-base md:text-lg tracking-tight">
              PT. CEMPAGA KARYA WIJAYA
            </h1>
            <span className="text-brand-gold-400 text-[10px] md:text-xs font-bold tracking-widest uppercase block">
              Quality in Every Grain &bull; High Purity Industrial Silica
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-900/90 hover:bg-brand-navy-800 border border-brand-navy-700 text-xs font-semibold text-neutral-200 transition-colors shadow-sm"
          >
            <Globe size={14} className="text-brand-gold-400" />
            <span>{locale === 'id' ? 'ID (Bahasa)' : 'EN (English)'}</span>
          </button>

          {/* <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-900/90 hover:bg-brand-navy-800 border border-brand-navy-700 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            title="Akses Admin CMS"
          >
            <Lock size={13} className="text-brand-gold-400" />
            <span className="hidden sm:inline">Admin CMS</span>
          </Link> */}
        </div>
      </header>

      {/* Main Hero & Explanation Content */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center text-center">
        
        {/* Pulsing Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-bold tracking-wider uppercase mb-8 shadow-inner backdrop-blur-md">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span>{locale === 'id' ? 'Pemeliharaan Sistem Terjadwal Sedang Berlangsung' : 'Scheduled System Maintenance In Progress'}</span>
        </div>

        {/* Industrial Graphic Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-brand-navy-900/90 border-2 border-brand-gold-500/40 flex items-center justify-center text-brand-gold-400 shadow-2xl shadow-brand-gold-500/10">
            <Wrench size={46} className="animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-lg bg-brand-gold-500 text-brand-navy-950 font-extrabold text-[11px] shadow-lg">
            CKW 24/7
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-display font-extrabold text-2xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight max-w-3xl">
          {title}
        </h2>

        {/* Comprehensive Explanation */}
        <div className="bg-brand-navy-900/60 border border-brand-navy-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md max-w-3xl mb-10 text-neutral-200 text-sm md:text-base leading-relaxed text-left md:text-center space-y-4">
          <p>{message}</p>
          <p className="text-xs md:text-sm text-neutral-400 border-t border-brand-navy-800 pt-4">
            {locale === 'id' 
              ? 'Seluruh halaman profil perusahaan, katalog produk, dan formulir web umum dinonaktifkan sementara demi menjamin integritas data dan pembaruan sistem. Kami mohon maaf atas ketidaknyamanan Anda.' 
              : 'All public profile pages, product catalogs, and standard web inquiries are temporarily offline to ensure data integrity during maintenance. We apologize for any temporary inconvenience.'}
          </p>
        </div>

        {/* Key Operational Assurance Cards */}
        <div className="grid sm:grid-cols-3 gap-4 w-full max-w-4xl mb-10">
          
          {/* Card 1: Estimated Return */}
          {/* <div className="bg-brand-navy-900/80 border border-brand-navy-800 p-5 rounded-2xl flex items-start gap-3.5 text-left backdrop-blur-sm shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 text-brand-gold-400 flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold block">
                {locale === 'id' ? 'Estimasi Selesai' : 'Estimated Return'}
              </span>
              <span className="text-sm font-bold text-white font-mono">
                {maintenanceConfig.estimatedEnd || '± 1 - 2 Jam'}
              </span>
            </div>
          </div> */}

          {/* Card 2: Plant Processing Status */}
          {/* <div className="bg-brand-navy-900/80 border border-brand-navy-800 p-5 rounded-2xl flex items-start gap-3.5 text-left backdrop-blur-sm shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
              <Factory size={20} />
            </div>
            <div>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold block">
                {locale === 'id' ? 'Operasional Pabrik' : 'Plant Operations'}
              </span>
              <span className="text-sm font-bold text-green-400 flex items-center gap-1">
                <CheckCircle2 size={14} />
                <span>{locale === 'id' ? 'Aktif Normal 50k MT/bln' : 'Normal 50k MT/mo'}</span>
              </span>
            </div>
          </div> */}

          {/* Card 3: Logistics & Barge Dispatch */}
          {/* <div className="bg-brand-navy-900/80 border border-brand-navy-800 p-5 rounded-2xl flex items-start gap-3.5 text-left backdrop-blur-sm shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-blue-400 flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold block">
                {locale === 'id' ? 'Jadwal Pengiriman' : 'Barge & Trucking'}
              </span>
              <span className="text-sm font-bold text-blue-400 flex items-center gap-1">
                <CheckCircle2 size={14} />
                <span>{locale === 'id' ? 'Tongkang Sesuai Kontrak' : 'On Schedule'}</span>
              </span>
            </div>
          </div> */}

        </div>

        {/* Emergency Commercial Desk & Quick RFQ */}
        {/* <div className="w-full max-w-4xl bg-gradient-to-b from-brand-navy-900/90 to-brand-navy-900/60 border border-brand-gold-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl text-left"> */}
          {/* <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-brand-navy-800"> */}
            {/* <div>
              <span className="px-3 py-1 rounded-full bg-brand-gold-500/20 text-brand-gold-400 text-[11px] font-bold tracking-wider uppercase inline-block mb-1">
                {locale === 'id' ? 'Layanan Pasokan Silika Mendesak' : 'Urgent Commercial Sales Desk'}
              </span>
              <h3 className="font-display font-bold text-lg md:text-xl text-white">
                {locale === 'id' ? 'Butuh Pasokan Pasir Silika Segera Selama Maintenance?' : 'Need Immediate Industrial Silica Supply?'}
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                {locale === 'id' 
                  ? 'Tim komersial kami siap melayani pesanan armada tongkang (3.000 - 5.000 MT) maupun truk curah langsung melalui saluran resmi berikut:'
                  : 'Our sales desk remains fully active for direct barge contracts and bulk trucking inquiries:'}
              </p>
            </div> */}

            {/* Direct Instant Action Buttons */}
            {/* <div className="flex flex-wrap gap-2.5 w-full md:w-auto shrink-0">
              <a 
                href="https://wa.me/6282315161767?text=Halo%20PT.%20Cempaga%20Karya%20Wijaya,%20saya%20butuh%20pasokan%20pasir%20silika%20segera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs transition-all shadow-md"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Sales Desk</span>
              </a>

              <a 
                href={`mailto:${maintenanceConfig.contactEmail || 'cempagakaryawijaya@gmail.com'}`} 
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold text-xs transition-all shadow-md"
              >
                <Mail size={16} />
                <span>Email RFQ</span>
              </a>

              <a 
                href={`tel:${maintenanceConfig.contactPhone || '+6282315161767'}`} 
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy-800 hover:bg-brand-navy-700 text-white font-semibold text-xs border border-brand-navy-700 transition-all"
              >
                <Phone size={14} className="text-brand-gold-400" />
                <span>Telepon</span>
              </a>
            </div> */}
          {/* </div> */}

          {/* Quick Fast-Track Inquiry Box */}
          {/* <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-2">
              <Send size={14} className="text-brand-gold-400" />
              <span>{locale === 'id' ? 'Formulir Kilat Permintaan Silika (Fast-Track RFQ)' : 'Fast-Track Silica Request'}</span>
            </h4>

            {submitted ? (
              <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Permintaan Anda telah diteruskan ke WhatsApp Sales Desk kami. Tim kami akan segera menindaklanjuti.</span>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="underline hover:text-white text-xs font-semibold ml-4"
                >
                  Kirim Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickRfq} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                <input 
                  type="text" 
                  required
                  placeholder="Nama Anda *"
                  value={rfqName}
                  onChange={(e) => setRfqName(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-brand-navy-950/80 border border-brand-navy-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold-500"
                />

                <input 
                  type="text" 
                  placeholder="Nama Perusahaan"
                  value={rfqCompany}
                  onChange={(e) => setRfqCompany(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-brand-navy-950/80 border border-brand-navy-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold-500"
                />

                <input 
                  type="tel" 
                  required
                  placeholder="No. WhatsApp / HP *"
                  value={rfqPhone}
                  onChange={(e) => setRfqPhone(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-brand-navy-950/80 border border-brand-navy-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold-500"
                />

                <select
                  value={rfqGrade}
                  onChange={(e) => setRfqGrade(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-brand-navy-950/80 border border-brand-navy-700 text-xs text-white focus:outline-none focus:border-brand-gold-500"
                >
                  <option value="Float Glass Silica (Mesh 30-100)">Kaca Float (Mesh 30-100)</option>
                  <option value="Solar PV Photovoltaic Silica">Solar PV Panel Surya</option>
                  <option value="Container Glass & Botol">Kaca Kemasan & Botol</option>
                  <option value="Silika Pengecoran Logam / Foundry">Pengecoran Logam (Foundry)</option>
                  <option value="Sodium Silicate Raw Material">Bahan Baku Sodium Silikat</option>
                  <option value="Water Filtration & Sandblasting">Filtrasi Air & Sandblasting</option>
                </select>

                <button 
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send size={14} />
                  <span>Kirim RFQ</span>
                </button>
              </form>
            )}
          </div> */}
        {/* </div> */}

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-brand-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div>
          <p className="font-medium text-neutral-300">
            &copy; {new Date().getFullYear()} PT. Cempaga Karya Wijaya. Seluruh Hak Dilindungi.
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Fasilitas Benefisiasi Silika & Stockpile: Rembang, Jawa Tengah, Indonesia.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="text-neutral-400 hover:text-brand-gold-400 transition-colors flex items-center gap-1 font-semibold"
          >
            <span>Login Panel Admin (CMS)</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </footer>

    </div>
  );
}
