"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { Search, Filter, ShieldCheck, Check, Copy, X } from 'lucide-react';
import { ProductItem } from '@/services/dataStorage';

export default function ProductsPage() {
  const { locale, products } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeProducts = products.filter(p => {
    if (p.status !== 'published') return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = (locale === 'id' ? p.name_id : p.name_en).toLowerCase();
    const desc = (locale === 'id' ? p.shortDescription_id : p.shortDescription_en).toLowerCase();
    return name.includes(q) || desc.includes(q);
  }).sort((a,b) => a.sortOrder - b.sortOrder);

  const handleCopySpec = (p: ProductItem) => {
    const text = `
PT. CEMPAGA KARYA WIJAYA - SPECIFICATION SHEET
Product: ${p.name_en} (${p.name_id})
Grade: SiO2 ${p.assaySiO2 || '≥ 99.3%'}, Fe2O3 ${p.assayFe2O3 || '≤ 120 ppm'}
Chemical Composition: ${p.chemicalComposition_en}
Grain Size: ${p.particleSize_en}
Moisture: ${p.moistureContent_en}
Packaging: ${p.packagingRequirement_en}
Inquiry & Sales: sales@cempagakaryawijaya.com | +62 536 4230046
    `.trim();

    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn("Clipboard access denied", e);
    }
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-brand-navy-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="font-sans font-semibold text-brand-gold-500 tracking-widest uppercase text-xs md:text-sm mb-3 block">
            {locale === 'id' ? 'Katalog Pasir Silika Industri' : 'Industrial Quartz & Silica Catalog'}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
            {locale === 'id' ? 'Katalog Pasir Silika Olahan' : 'Processed Silica Sand Catalog'}
          </h1>
          <p className="text-neutral-300 max-w-2xl mx-auto text-sm md:text-base">
            {locale === 'id' 
              ? 'Tersedia beragam grade kemurnian tinggi dari kaca float, panel surya PV, pengecoran logam (foundry), hingga filtrasi air.' 
              : 'Engineered high-purity grades for float glass, photovoltaic solar covers, foundry molds, and water filtration.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder={locale === 'id' ? 'Cari produk, grade silika...' : 'Search products, silica grade...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 text-sm bg-white"
            />
          </div>
          <div className="text-xs text-neutral-500">
            {locale === 'id' ? `Menampilkan ${activeProducts.length} produk aktif` : `Displaying ${activeProducts.length} active products`}
          </div>
        </div>

        {/* Product Grid */}
        {activeProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <p className="text-neutral-500 text-base">
              {locale === 'id' ? 'Tidak ada produk yang sesuai dengan pencarian.' : 'No products matched your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image & Badge */}
                <div className="h-52 relative overflow-hidden bg-neutral-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name_en} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                    {product.assaySiO2 && (
                      <span className="px-2.5 py-1 bg-brand-navy-950/90 text-brand-gold-400 font-mono font-bold text-xs rounded-lg backdrop-blur-sm shadow border border-brand-navy-800">
                        SiO2 {product.assaySiO2}
                      </span>
                    )}
                    {product.assayFe2O3 && (
                      <span className="px-2.5 py-1 bg-white/90 text-neutral-900 font-mono font-semibold text-xs rounded-lg backdrop-blur-sm shadow">
                        Fe2O3 {product.assayFe2O3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg md:text-xl text-brand-navy-950 mb-2 leading-snug">
                      {locale === 'id' ? product.name_id : product.name_en}
                    </h3>
                    <p className="text-neutral-600 text-xs md:text-sm line-clamp-2 leading-relaxed mb-6">
                      {locale === 'id' ? product.shortDescription_id : product.shortDescription_en}
                    </p>

                    {/* Spec Summary */}
                    <div className="space-y-2.5 bg-neutral-50 p-4 rounded-xl border border-neutral-100 text-xs mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">{locale === 'id' ? 'Ukuran Butir' : 'Grain Size'}:</span>
                        <span className="font-mono font-medium text-neutral-900 text-right">{locale === 'id' ? product.particleSize_id : product.particleSize_en}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">{locale === 'id' ? 'Kelembapan' : 'Moisture'}:</span>
                        <span className="font-mono font-medium text-neutral-900">{locale === 'id' ? product.moistureContent_id : product.moistureContent_en}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">{locale === 'id' ? 'Kemasan' : 'Packaging'}:</span>
                        <span className="font-medium text-neutral-900 truncate max-w-[150px]">{locale === 'id' ? product.packagingRequirement_id : product.packagingRequirement_en}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="px-3 py-2.5 bg-brand-blue-50 hover:bg-brand-blue-100 text-brand-blue-700 font-semibold rounded-xl text-xs transition-colors text-center"
                    >
                      {locale === 'id' ? 'Spesifikasi Lab' : 'Lab Assay Sheet'}
                    </button>
                    <Link 
                      href={`/contact?product=${encodeURIComponent(product.slug)}`}
                      className="px-3 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-xs transition-colors text-center"
                    >
                      {locale === 'id' ? 'Minta RFQ' : 'Request RFQ'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Technical Assay Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-neutral-200 relative">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="px-3 py-1 bg-brand-gold-500 text-brand-navy-950 font-bold text-xs rounded-full uppercase tracking-wider inline-block mb-2">
                Certificate of Analysis (COA) Preview
              </span>
              <h3 className="font-display font-bold text-2xl text-brand-navy-950">
                {locale === 'id' ? selectedProduct.name_id : selectedProduct.name_en}
              </h3>
              <p className="text-neutral-500 text-xs mt-1">
                ASTM C-136 & XRF Spectrometry Assay Laboratory Specifications
              </p>
            </div>

            {/* Chemical Breakdown Table */}
            <div className="mb-6">
              <h4 className="font-sans font-bold text-sm text-neutral-900 uppercase tracking-wider mb-3">
                {locale === 'id' ? 'Komposisi Kimia Teruji (Chemical Composition)' : 'Tested Chemical Composition'}
              </h4>
              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold text-neutral-600">Parameter Oxides</th>
                      <th className="px-4 py-2.5 font-semibold text-neutral-600">Typical Value</th>
                      <th className="px-4 py-2.5 font-semibold text-neutral-600">Standard Tolerance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-mono">
                    <tr>
                      <td className="px-4 py-2 font-medium text-neutral-900 font-sans">Silica (SiO2)</td>
                      <td className="px-4 py-2 text-brand-blue-600 font-bold">{selectedProduct.assaySiO2 || '≥ 99.30%'}</td>
                      <td className="px-4 py-2 text-neutral-500 font-sans">Min. 99.00%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-neutral-900 font-sans">Iron Oxide (Fe2O3)</td>
                      <td className="px-4 py-2 text-neutral-800 font-bold">{selectedProduct.assayFe2O3 || '≤ 0.020%'}</td>
                      <td className="px-4 py-2 text-neutral-500 font-sans">Max. 0.025%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-neutral-900 font-sans">Alumina (Al2O3)</td>
                      <td className="px-4 py-2 text-neutral-800">{selectedProduct.assayAl2O3 || '≤ 0.20%'}</td>
                      <td className="px-4 py-2 text-neutral-500 font-sans">Max. 0.30%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-neutral-900 font-sans">Titanium (TiO2)</td>
                      <td className="px-4 py-2 text-neutral-800">{selectedProduct.assayTiO2 || '≤ 0.02%'}</td>
                      <td className="px-4 py-2 text-neutral-500 font-sans">Max. 0.03%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-neutral-900 font-sans">Loss on Ignition (LOI)</td>
                      <td className="px-4 py-2 text-neutral-800">{selectedProduct.assayLOI || '≤ 0.15%'}</td>
                      <td className="px-4 py-2 text-neutral-500 font-sans">Max. 0.20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Physical Specs */}
            <div className="mb-6 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-neutral-500 block mb-1">AFS Grain Fineness</span>
                <span className="font-mono font-bold text-neutral-900">{selectedProduct.afsFineness || '45 - 55'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-neutral-500 block mb-1">Mohs Hardness</span>
                <span className="font-mono font-bold text-neutral-900">{selectedProduct.mohsHardness || '7.0'}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
              <button 
                onClick={() => handleCopySpec(selectedProduct)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium rounded-xl text-xs transition-colors flex-1"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                <span>{copied ? (locale === 'id' ? 'Berhasil Disalin!' : 'Copied to Clipboard!') : (locale === 'id' ? 'Salin Lembar Spesifikasi' : 'Copy Spec Sheet')}</span>
              </button>
              {/* <Link 
                href={`/contact?product=${encodeURIComponent(selectedProduct.slug)}`}
                className="flex items-center justify-center px-6 py-3 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-xs transition-colors flex-1"
              >
                {locale === 'id' ? 'Minta Penawaran Komersial' : 'Request Commercial Quote'}
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

