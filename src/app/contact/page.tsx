"use client";

import React, { useState, FormEvent, Suspense } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ContactFormContent() {
  const { locale, products, addInquiry } = useAppContext();
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get('product') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'Indonesia',
    productName: initialProduct || (products[0]?.slug || ''),
    quantity: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');

  const activeProducts = products.filter(p => p.status === 'published');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Find clean product name
      const matched = activeProducts.find(p => p.slug === formData.productName);
      const cleanProductName = matched ? (locale === 'id' ? matched.name_id : matched.name_en) : formData.productName;

      // Call global context handler (also records audit log and mock Zoho webhook sync)
      const code = await addInquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        productName: cleanProductName,
        quantity: formData.quantity,
        message: formData.message,
      });

      // Also dispatch to Next.js API route /api/inquiry
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, productName: cleanProductName, inquiryCode: code })
      }).catch(err => console.warn('API sync background', err));

      setInquiryCode(code);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
      
      {/* Contact Info Sidebar */}
      <div className="lg:col-span-1 space-y-8">
        <div>
          <span className="text-brand-gold-600 font-semibold text-xs uppercase tracking-widest block mb-2">
            {locale === 'id' ? 'Layanan Penjualan & Dukungan' : 'Commercial Desk & Sales'}
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
            {locale === 'id' ? 'Kontak Komersial' : 'Direct Inquiry Desk'}
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed mb-6">
            {locale === 'id' 
              ? 'Konsultasikan kebutuhan pasir silika, spesifikasi mesh, jadwal pengiriman, atau permintaan Certificate of Analysis (COA) dengan sales engineer kami.'
              : 'Consult your silica specifications, required particle sizes, delivery timetables, or sample assay certificates directly with our sales desk.'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200">
            <div className="w-10 h-10 bg-brand-navy-50 rounded-xl flex items-center justify-center text-brand-navy-950 shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <h4 className="font-sans font-bold text-neutral-900 text-sm mb-1">{locale === 'id' ? 'Telepon Kantor' : 'Office Line'}</h4>
              <p className="text-neutral-600 text-xs"><a href="tel:+625364230046" className="hover:text-brand-blue-600">+62 536 4230046</a></p>
              <p className="text-neutral-600 text-xs"><a href="tel:+6282315161767" className="hover:text-brand-blue-600">+62 823 1516 1767</a></p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200">
            <div className="w-10 h-10 bg-brand-navy-50 rounded-xl flex items-center justify-center text-brand-navy-950 shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <h4 className="font-sans font-bold text-neutral-900 text-sm mb-1">Email Komersial</h4>
              <p className="text-neutral-600 text-xs"><a href="mailto:cempagakaryawijaya@gmail.com" className="hover:text-brand-blue-600">cempagakaryawijaya@gmail.com</a></p>
              <p className="text-neutral-400 text-[11px] mt-0.5">Zoho Mail Real-Time Sync</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200">
            <div className="w-10 h-10 bg-brand-navy-50 rounded-xl flex items-center justify-center text-brand-navy-950 shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <h4 className="font-sans font-bold text-neutral-900 text-sm mb-1">{locale === 'id' ? 'Alamat Pabrik & Fasilitas' : 'Processing Plant Address'}</h4>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Karangharjo, Tegalmulyo, Kragan, <br/>
                Kabupaten Rembang, Jawa Tengah 59295
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <a 
            href="https://wa.me/6282315161767?text=Halo%20PT.%20Cempaga%20Karya%20Wijaya,%20saya%20ingin%20konsultasi%20pasir%20silika" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-all shadow-md text-sm"
          >
            <MessageCircle size={18} />
            <span>{locale === 'id' ? 'WhatsApp Sales Langsung' : 'Direct WhatsApp Sales Chat'}</span>
          </a>
        </div>
      </div>

      {/* RFQ Form Card */}
      {/* <div className="lg:col-span-2">
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-neutral-200 shadow-xl shadow-brand-navy-950/5 relative">
          
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={44} />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 mb-2">
                {locale === 'id' ? 'Permintaan RFQ Berhasil Dikirim!' : 'Commercial RFQ Successfully Received!'}
              </h3>
              <p className="text-neutral-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                {locale === 'id' 
                  ? 'Data permintaan Anda telah dicatat ke sistem dan diteruskan via Zoho Mail ke sales desk kami. Tim teknis akan menindaklanjuti dalam waktu ≤ 24 jam.' 
                  : 'Your request has been logged and dispatched via Zoho Mail to our commercial desk. A sales engineer will respond within 24 hours.'}
              </p>
              
              <div className="bg-neutral-50 rounded-2xl p-6 inline-block mb-8 border border-neutral-200 max-w-sm w-full">
                <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider block mb-1">
                  {locale === 'id' ? 'Kode Pelacakan Resmi RFQ' : 'Official RFQ Tracking Code'}
                </span>
                <span className="font-mono font-extrabold text-xl md:text-2xl text-brand-navy-950 tracking-wider block">
                  {inquiryCode}
                </span>
              </div>

              <div>
                <button 
                  onClick={() => setIsSuccess(false)} 
                  className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl text-xs transition-colors"
                >
                  {locale === 'id' ? 'Kirim Permintaan Baru' : 'Submit Another RFQ'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-neutral-100 pb-4 mb-6">
                <h3 className="font-display font-bold text-2xl text-brand-navy-950">
                  {locale === 'id' ? 'Formulir Permintaan Penawaran (RFQ)' : 'Request for Quotation (RFQ) Form'}
                </h3>
                <p className="text-neutral-500 text-xs mt-1">
                  {locale === 'id' ? 'Isi data kebutuhan pasir silika Anda untuk menerima penawaran harga resmi dan lembar COA.' : 'Complete the form to receive official commercial pricing and certified laboratory assay sheets.'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    {locale === 'id' ? 'Nama Lengkap *' : 'Full Name *'}
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Budi Santoso"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none transition-all text-sm bg-neutral-50/50" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    {locale === 'id' ? 'Nama Perusahaan / PT *' : 'Company Name *'}
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. PT. Industri Kaca Nasional"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none transition-all text-sm bg-neutral-50/50" 
                    value={formData.company} 
                    onChange={e => setFormData({...formData, company: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    {locale === 'id' ? 'Alamat Email Perusahaan *' : 'Corporate Email *'}
                  </label>
                  <input 
                    required 
                    type="email" 
                    placeholder="procurement@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none transition-all text-sm bg-neutral-50/50" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    {locale === 'id' ? 'Nomor Telepon / WhatsApp *' : 'Phone / WhatsApp *'}
                  </label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+62 812..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none transition-all text-sm bg-neutral-50/50" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    {locale === 'id' ? 'Pilihan Grade Pasir Silika *' : 'Target Silica Grade *'}
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none transition-all bg-white text-sm" 
                    value={formData.productName} 
                    onChange={e => setFormData({...formData, productName: e.target.value})}
                  >
                    {activeProducts.map(p => (
                      <option key={p.slug} value={p.slug}>
                        {locale === 'id' ? p.name_id : p.name_en}
                      </option>
                    ))}
                    <option value="custom">Custom Particle Size / Other Specification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    {locale === 'id' ? 'Estimasi Kebutuhan (MT / Bulan) *' : 'Volume (MT / Month) *'}
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. 1.000 MT / Bulan"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none transition-all text-sm bg-neutral-50/50" 
                    value={formData.quantity} 
                    onChange={e => setFormData({...formData, quantity: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  {locale === 'id' ? 'Pesan & Spesifikasi Teknis Khusus' : 'Technical Specifications & Delivery Requirements'}
                </label>
                <textarea 
                  rows={4} 
                  placeholder={locale === 'id' ? 'Sebutkan toleransi Fe2O3, mesh size khusus, lokasi pengiriman (Franco/FOB), atau permintaan sampel trial...' : 'Specify target Fe2O3 tolerances, custom mesh, destination port, or trial sample dispatch...'}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none transition-all resize-none text-sm bg-neutral-50/50" 
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Clock size={15} className="text-brand-gold-600" />
                  <span>Respon rata-rata ≤ 24 jam kerja</span>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy-950 hover:bg-brand-navy-900 text-white font-bold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>{locale === 'id' ? 'Kirim Permintaan (RFQ)' : 'Submit Official RFQ'}</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div> */}
    </div>
  );
}

export default function ContactPage() {
  const { locale } = useAppContext();

  return (
    <div className="w-full bg-neutral-50">
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Hubungi Tim Komersial' : 'Commercial Sales & RFQ'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Kontak & Permintaan Penawaran' : 'Contact & Commercial RFQ'}
          </h1>
          <p className="text-neutral-300 max-w-2xl mx-auto text-sm md:text-base">
            {locale === 'id'
              ? 'Dapatkan penawaran harga kompetitif, spesifikasi teknis ASTM, dan koordinasi sampel uji coba.'
              : 'Secure competitive volume quotations, ASTM specification sheets, and trial batch dispatch.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <Suspense fallback={<div className="text-center py-12 text-neutral-500">Memuat formulir...</div>}>
          <ContactFormContent />
        </Suspense>
      </div>
    </div>
  );
}

