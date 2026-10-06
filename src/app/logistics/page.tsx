"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Truck, Anchor, Compass, ShieldCheck, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LogisticsPage() {
  const { locale } = useAppContext();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c50a30?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Infrastruktur & Jalur Distribusi' : 'Supply Chain & Bulk Freight'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Logistik & Distribusi Multimoda' : 'Multimodal Logistics & Supply Chain'}
          </h1>
          <p className="text-neutral-300 max-w-2xl mx-auto text-sm md:text-base">
            {locale === 'id'
              ? 'Hanya ±10 km dari Pelabuhan Rembang dan bersebelahan dengan Jalan Raya Nasional Pantura 4 lajur.'
              : 'Located ±10 km from Rembang Bulk Seaport and adjacent to the 4-lane Java Pantura National Highway.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Logistics Differentiators */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center mb-4">
              <Anchor size={24} />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy-950 mb-2">
              {locale === 'id' ? 'Dermaga Curah Pelabuhan Rembang' : 'Rembang Bulk Seaport Jetty'}
            </h3>
            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
              {locale === 'id'
                ? 'Dermaga laut dalam mampu melayani tongkang 300ft (kapasitas 5.000 - 7.500 DWT) dengan laju muat conveyor cepat.'
                : 'Deep-water berth accommodating 300ft barges (5,000 - 7,500 DWT capacity) with high-speed conveyor loading.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-brand-gold-50 text-brand-gold-600 flex items-center justify-center mb-4">
              <Truck size={24} />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy-950 mb-2">
              {locale === 'id' ? 'Armada Truk Darat Pantura' : 'Inland Heavy Trucking Fleet'}
            </h3>
            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
              {locale === 'id'
                ? 'Pengiriman langsung ke pabrik pelanggan (Franco) menggunakan dump truck 20 - 40 MT terintegrasi timbangan jembatan digital.'
                : 'Direct factory delivery (Franco destination) utilizing 20 - 40 MT dump trucks and on-site certified weighbridges.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-4">
              <Compass size={24} />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy-950 mb-2">
              {locale === 'id' ? 'Dukungan Berbagai Incoterms' : 'Flexible Incoterms Compliance'}
            </h3>
            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
              {locale === 'id'
                ? 'Melayani kontrak pengiriman FOB Pelabuhan Rembang, CIF pelabuhan tujuan pembeli domestik & ekspor, maupun Franco Pabrik.'
                : 'Supporting FOB Rembang Port, CIF destination ports across Indonesia/ASEAN, and Franco plant-gate delivery.'}
            </p>
          </div>
        </div>

        {/* Inbound & Outbound Detailed Breakdown */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
            <img 
              src="https://images.unsplash.com/photo-1596703577717-d2cdeec27e36?q=80&w=2072" 
              alt="Barge Transport" 
              className="w-full h-80 object-cover" 
            />
            <div className="absolute top-4 left-4 bg-brand-navy-950/90 text-brand-gold-400 px-3 py-1 rounded-lg text-xs font-bold">
              Inbound Feed: Kalimantan Tengah ➔ Rembang
            </div>
          </div>
          <div>
            <span className="text-brand-blue-600 font-semibold text-xs uppercase tracking-widest block mb-2">
              {locale === 'id' ? 'Rantai Pasok Hulu' : 'Upstream Raw Feed Supply'}
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
              {locale === 'id' ? 'Transportasi Bahan Baku Efisien' : 'Direct Upstream Sea Freight'}
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
              {locale === 'id'
                ? 'Pasir silika kualitas prima diangkut secara kontinyu dari konsesi penambangan di Kalimantan Tengah melintasi Laut Jawa ke Pelabuhan Rembang berdasarkan perjanjian pasokan jangka panjang eksklusif.'
                : 'High-grade raw silica is transported continuously from mining concessions in Central Kalimantan across the Java Sea to Rembang Port under an exclusive long-term supply agreement.'}
            </p>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-brand-gold-500 shrink-0 mt-0.5" />
                <span>{locale === 'id' ? 'Biaya transportasi laut per ton terendah' : 'Lowest ton-per-mile ocean bulk freight rates'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-brand-gold-500 shrink-0 mt-0.5" />
                <span>{locale === 'id' ? 'Jarak pelabuhan ke pabrik hanya ±10 km' : 'Only ±10 km haulage distance from jetty to plant'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-brand-gold-500 shrink-0 mt-0.5" />
                <span>{locale === 'id' ? 'Bebas hambatan kemacetan lalu lintas perkotaan' : 'Bypasses major municipal traffic corridors'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <span className="text-brand-gold-600 font-semibold text-xs uppercase tracking-widest block mb-2">
              {locale === 'id' ? 'Rantai Pasok Hilir' : 'Downstream Delivery Channels'}
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
              {locale === 'id' ? 'Pengiriman Produk Jadi Tepat Waktu' : 'Precision On-Time Final Dispatch'}
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
              {locale === 'id'
                ? 'Didukung oleh fasilitas pemuatan truk berkecepatan tinggi, produk pasir silika olahan dapat dikirim dalam kemasan Jumbo Bag 1.0 - 1.5 MT atau curah langsung ke lokasi pabrik pembeli di sepanjang jalur industri Jawa.'
                : 'Backed by automated loading bays, finished silica sand is dispatched in 1.0 - 1.5 MT Jumbo Bags or loose bulk directly to customer facilities along Java\'s industrial belts.'}
            </p>
            <div className="flex gap-4">
              <Link 
                href="/contact"
                className="px-6 py-3.5 bg-brand-navy-950 hover:bg-brand-navy-900 text-white font-semibold rounded-xl text-xs md:text-sm transition-colors"
              >
                {locale === 'id' ? 'Konsultasi Jadwal Pengiriman' : 'Consult Dispatch Schedule'}
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
            <img 
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070" 
              alt="Truck Dispatch" 
              className="w-full h-80 object-cover" 
            />
            <div className="absolute top-4 left-4 bg-brand-navy-950/90 text-white px-3 py-1 rounded-lg text-xs font-bold">
              Outbound Dispatch: Rembang ➔ Customer Plants
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

