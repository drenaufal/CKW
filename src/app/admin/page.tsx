"use client";

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Shield, LayoutDashboard, Package, MailOpen, Activity, 
  Settings, LogOut, CheckCircle, Plus, Edit, Trash2, Globe, Send, Bell,
  Wrench, AlertTriangle, Power, Save, ExternalLink, RefreshCw, X
} from 'lucide-react';
import { ProductItem } from '@/services/dataStorage';

export default function AdminPage() {
  const { 
    inquiries, 
    products, 
    setProducts, 
    currentUser, 
    setCurrentUser,
    login,
    logout,
    updateInquiryStatus,
    auditLogs, 
    zohoLogs,
    maintenanceConfig,
    setMaintenanceConfig,
    toggleMaintenanceMode,
    refreshInquiries,
    refreshProducts,
    refreshAuditLogs
  } = useAppContext();

  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  // Product Edit / Create Modal State
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  const emptyProduct: ProductItem = {
    id: 0,
    name_id: '',
    name_en: '',
    slug: '',
    shortDescription_id: '',
    shortDescription_en: '',
    description_id: '',
    description_en: '',
    chemicalComposition_id: 'SiO2 ≥ 99.3%, Fe2O3 ≤ 0.020%',
    chemicalComposition_en: 'SiO2 ≥ 99.3%, Fe2O3 ≤ 0.020%',
    particleSize_id: 'Mesh 30 - 100',
    particleSize_en: 'Mesh 30 - 100',
    moistureContent_id: '≤ 0.2%',
    moistureContent_en: '≤ 0.2%',
    cleanliness_id: 'Bebas kotoran organik dan lempung',
    cleanliness_en: 'Free of clay and organic matter',
    packagingRequirement_id: 'Jumbo Bag 1.0 - 1.5 MT',
    packagingRequirement_en: 'Jumbo Bag 1.0 - 1.5 MT',
    imageUrl: '/silika.jpeg',
    status: 'published',
    featured: false,
    sortOrder: products.length + 1,
    assaySiO2: '≥ 99.3%',
    assayFe2O3: '≤ 0.020%',
    assayAl2O3: '≤ 0.20%',
    assayTiO2: '≤ 0.02%',
    assayLOI: '≤ 0.15%',
    afsFineness: '45-50',
    mohsHardness: '7.0',
    specificGravity: '2.65 g/cm³',
    bulkDensity: '1.55 MT/m³',
    phValue: '7.0'
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSavingProduct(true);

    try {
      const isNew = isNewProduct || editingProduct.id === 0;
      const method = isNew ? 'POST' : 'PUT';
      const autoSlug = editingProduct.slug?.trim() || editingProduct.name_id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `silica-${Date.now()}`;
      const payload: ProductItem = {
        ...editingProduct,
        id: isNew ? Date.now() : editingProduct.id,
        slug: autoSlug,
      };

      const res = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        if (isNew) {
          setProducts([payload, ...products]);
          showToast(`Produk "${payload.name_id}" berhasil ditambahkan`);
        } else {
          setProducts(products.map(p => p.id === payload.id ? payload : p));
          showToast(`Produk "${payload.name_id}" berhasil diperbarui`);
        }
        setEditingProduct(null);
      } else {
        showToast(data.message || 'Gagal menyimpan produk.');
      }
    } catch {
      showToast('Terjadi kesalahan koneksi saat menyimpan produk.');
    } finally {
      setIsSavingProduct(false);
    }
  };

  // Maintenance form state
  const [maintForm, setMaintForm] = useState({
    title_id: maintenanceConfig?.title_id || '',
    title_en: maintenanceConfig?.title_en || '',
    message_id: maintenanceConfig?.message_id || '',
    message_en: maintenanceConfig?.message_en || '',
    estimatedEnd: maintenanceConfig?.estimatedEnd || '',
    contactEmail: maintenanceConfig?.contactEmail || '',
    contactPhone: maintenanceConfig?.contactPhone || '',
  });

  useEffect(() => {
    if (maintenanceConfig) {
      setMaintForm({
        title_id: maintenanceConfig.title_id || '',
        title_en: maintenanceConfig.title_en || '',
        message_id: maintenanceConfig.message_id || '',
        message_en: maintenanceConfig.message_en || '',
        estimatedEnd: maintenanceConfig.estimatedEnd || '',
        contactEmail: maintenanceConfig.contactEmail || '',
        contactPhone: maintenanceConfig.contactPhone || '',
      });
    }
  }, [maintenanceConfig]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await login(username.trim(), password);
      if (res.success) {
        showToast('Login berhasil sebagai Administrator');
      } else {
        setLoginError(res.message || 'Kredensial tidak valid.');
      }
    } catch {
      setLoginError('Terjadi kesalahan koneksi ke server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast('Berhasil keluar dari sistem.');
  };

  const toggleProductStatus = async (id: number) => {
    const targetProduct = products.find(p => p.id === id);
    if (!targetProduct) return;
    const nextStatus = targetProduct.status === 'published' ? 'draft' as const : 'published' as const;
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, status: nextStatus };
      }
      return p;
    });
    setProducts(updated);
    showToast('Status produk berhasil diperbarui');
    try {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...targetProduct, status: nextStatus }),
      });
    } catch {}
  };

  const handleToggleMaintenance = () => {
    const target = !maintenanceConfig.enabled;
    toggleMaintenanceMode(target);
    showToast(
      target 
        ? 'Mode Pemeliharaan DIAKTIFKAN. Halaman publik kini menampilkan pesan maintenance.' 
        : 'Mode Pemeliharaan DINONAKTIFKAN. Website kini kembali live untuk publik.'
    );
  };

  const handleSaveMaintenanceConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setMaintenanceConfig({
      ...maintenanceConfig,
      ...maintForm,
    });
    showToast('Pengaturan pesan Mode Pemeliharaan berhasil disimpan');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-brand-navy-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 p-8 md:p-10 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-navy-950 rounded-2xl flex items-center justify-center text-brand-gold-500 shadow-lg">
              <Shield size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-center text-brand-navy-950 mb-1">
            Portal Admin CMS
          </h2>
          <p className="text-center text-xs text-neutral-500 mb-8 font-sans">
            PT. Cempaga Karya Wijaya Governance Panel
          </p>
          
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs mb-6">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-sm" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-sm" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••"
              />
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full py-3.5 bg-brand-navy-950 hover:bg-brand-navy-900 disabled:opacity-70 text-white font-bold rounded-xl transition-colors text-sm shadow-md flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-4 h-4 border-2 border-brand-gold-500 border-t-transparent rounded-full animate-spin"></span>
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <span>Masuk ke Dashboard CMS</span>
                )}
              </button>
            </div>
            <div className="text-center text-xs text-neutral-400 pt-2 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Autentikasi Terintegrasi Database MySQL</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Utama' },
    { id: 'maintenance', icon: Wrench, label: 'Mode Pemeliharaan' },
    { id: 'inquiries', icon: MailOpen, label: 'Inquiry RFQ & Leads' },
    { id: 'products', icon: Package, label: 'Katalog Produk' },
    { id: 'zoho', icon: Send, label: 'Integrasi Zoho' },
    { id: 'audit', icon: Activity, label: 'Audit Trail Logs' },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-brand-navy-950 text-white px-5 py-3 rounded-xl shadow-2xl border border-brand-gold-500/50 flex items-center gap-3 text-xs animate-in slide-in-from-top-4">
          <CheckCircle size={16} className="text-brand-gold-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Sidebar */}
      <aside className="w-64 bg-brand-navy-950 text-neutral-300 flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-brand-navy-900 gap-3">
          <div className="w-9 h-9 bg-brand-gold-500 rounded-lg flex items-center justify-center text-brand-navy-950 font-black">
            CKW
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-sm tracking-wide">Admin Portal</h1>
            <span className="text-[10px] text-neutral-400">Enterprise CMS v2.0</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-brand-navy-900 border-l-4 border-brand-gold-500 text-white shadow-inner' 
                  : 'text-neutral-400 hover:bg-brand-navy-900/60 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={16} className={activeTab === tab.id ? 'text-brand-gold-400' : 'text-neutral-400'} />
                <span>{tab.label}</span>
              </div>
              {tab.id === 'maintenance' && maintenanceConfig?.enabled && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-brand-navy-900">
          <div className="mb-3 px-2 text-xs text-neutral-400">
            <span>User: </span>
            <strong className="text-white">{currentUser.name}</strong>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-2 w-full py-2.5 text-xs text-red-400 hover:bg-brand-navy-900 rounded-xl transition-colors font-semibold"
          >
            <LogOut size={14} />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Top Persistent Warning If Maintenance Mode is Active */}
        {maintenanceConfig?.enabled && (
          <div className="bg-amber-500 text-brand-navy-950 px-8 py-2.5 flex items-center justify-between text-xs font-bold shadow-sm shrink-0">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>
                PERHATIAN: Mode Pemeliharaan (Maintenance Mode) sedang AKTIF. Pengunjung umum tidak dapat mengakses website.
              </span>
            </div>
            <button 
              onClick={handleToggleMaintenance}
              className="px-3 py-1 bg-brand-navy-950 text-white rounded-lg hover:bg-brand-navy-900 transition-colors font-semibold"
            >
              Nonaktifkan Sekarang
            </button>
          </div>
        )}

        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">CMS Panel /</span>
            <span className="text-sm font-bold text-brand-navy-950 capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank" 
              className="px-3.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
            >
              <Globe size={14} />
              <span>Buka Website</span>
            </a>
          </div>
        </header>

        <div className="p-8 flex-1">
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Maintenance Mode Hero Card on Dashboard */}
              <div className={`p-6 rounded-2xl border transition-all ${
                maintenanceConfig?.enabled
                  ? 'bg-amber-500/10 border-amber-300'
                  : 'bg-white border-neutral-200 shadow-sm'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      maintenanceConfig?.enabled 
                        ? 'bg-amber-500 text-brand-navy-950 shadow-md' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      <Wrench size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-bold text-lg text-brand-navy-950">
                          Status Portal & Mode Pemeliharaan
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          maintenanceConfig?.enabled 
                            ? 'bg-amber-500 text-brand-navy-950' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {maintenanceConfig?.enabled ? 'Maintenance ON' : 'Website Live'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
                        {maintenanceConfig?.enabled
                          ? 'Mode Pemeliharaan sedang aktif. Semua pengunjung diarahkan ke halaman pemeliharaan resmi dengan kontak darurat, sementara Anda tetap dapat mengelola CMS.'
                          : 'Website sedang aktif normal (Live). Pengunjung umum dapat menjelajahi seluruh halaman produk, spesifikasi lab, dan mengirim RFQ.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveTab('maintenance')}
                      className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 transition-colors"
                    >
                      Konfigurasi Pesan
                    </button>
                    <button
                      onClick={handleToggleMaintenance}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                        maintenanceConfig?.enabled
                          ? 'bg-green-600 hover:bg-green-500 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 text-brand-navy-950'
                      }`}
                    >
                      <Power size={15} />
                      <span>{maintenanceConfig?.enabled ? 'Buka Website (Disable)' : 'Aktifkan Mode Maintenance'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistics Metrics */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 text-brand-blue-600 rounded-xl flex items-center justify-center mb-3">
                    <MailOpen size={20} />
                  </div>
                  <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Total RFQ Masuk</p>
                  <p className="text-3xl font-extrabold text-brand-navy-950 mt-1">{inquiries.length}</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
                    <Package size={20} />
                  </div>
                  <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Produk Terpublikasi</p>
                  <p className="text-3xl font-extrabold text-brand-navy-950 mt-1">
                    {products.filter(p => p.status === 'published').length}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3">
                    <Send size={20} />
                  </div>
                  <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Zoho Webhook Dispatches</p>
                  <p className="text-3xl font-extrabold text-brand-navy-950 mt-1">{zohoLogs.length}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3">
                    <Activity size={20} />
                  </div>
                  <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Audit Log Entries</p>
                  <p className="text-3xl font-extrabold text-brand-navy-950 mt-1">{auditLogs.length}</p>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display font-bold text-lg text-brand-navy-950">Inquiry Komersial Terbaru</h3>
                  <button onClick={() => setActiveTab('inquiries')} className="text-xs text-brand-blue-600 font-semibold hover:underline">
                    Lihat Semua RFQ →
                  </button>
                </div>
                {inquiries.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-6 text-center">Belum ada inquiry yang masuk dari formulir website.</p>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map(inq => (
                      <div key={inq.id} className="p-4 rounded-xl border border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono font-bold text-brand-navy-950 mr-3">{inq.inquiryCode}</span>
                          <span className="font-semibold text-neutral-900">{inq.name} ({inq.company})</span>
                          <span className="text-neutral-500 ml-2">• {inq.productName} ({inq.quantity})</span>
                        </div>
                        <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full font-bold text-[10px] uppercase">
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: MAINTENANCE MODE */}
          {activeTab === 'maintenance' && (
            <div className="space-y-8 max-w-4xl">
              
              {/* Master Switch Banner */}
              <div className={`p-8 rounded-3xl border transition-all ${
                maintenanceConfig?.enabled 
                  ? 'bg-amber-500/15 border-amber-300' 
                  : 'bg-white border-neutral-200 shadow-sm'
              }`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      maintenanceConfig?.enabled 
                        ? 'bg-amber-500 text-brand-navy-950 shadow-lg' 
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      <Wrench size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="font-display font-bold text-xl text-brand-navy-950">
                          Saklar Utama Mode Pemeliharaan (Master Switch)
                        </h2>
                        <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                          maintenanceConfig?.enabled 
                            ? 'bg-amber-500 text-brand-navy-950' 
                            : 'bg-neutral-200 text-neutral-700'
                        }`}>
                          {maintenanceConfig?.enabled ? 'AKTIF (ON)' : 'TIDAK AKTIF (OFF)'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">
                        Saat mode pemeliharaan diaktifkan, seluruh rute publik akan secara otomatis menampilkan halaman pemeliharaan. Anda dan tim internal tetap memiliki akses penuh ke Admin Panel ini untuk melakukan perubahan.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleMaintenance}
                    className={`px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0 ${
                      maintenanceConfig?.enabled 
                        ? 'bg-green-600 hover:bg-green-500 text-white' 
                        : 'bg-amber-500 hover:bg-amber-400 text-brand-navy-950'
                    }`}
                  >
                    <Power size={18} />
                    <span>{maintenanceConfig?.enabled ? 'Buka Website Kembali' : 'Aktifkan Mode Maintenance'}</span>
                  </button>
                </div>
              </div>

              {/* Maintenance Copy & Details Form */}
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="font-display font-bold text-lg text-brand-navy-950">
                      Konfigurasi Informasi & Pesan Pemeliharaan
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Kustomisasi teks pengumuman, estimasi waktu selesai, dan kontak darurat untuk pengunjung.
                    </p>
                  </div>
                  <a
                    href="/"
                    target="_blank"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>Lihat Halaman Publik</span>
                  </a>
                </div>

                <form onSubmit={handleSaveMaintenanceConfig} className="space-y-6">
                  
                  {/* Title ID & EN */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Judul Pemeliharaan (Bahasa Indonesia) *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-xs" 
                        value={maintForm.title_id} 
                        onChange={e => setMaintForm({...maintForm, title_id: e.target.value})} 
                        placeholder="Sistem Sedang Dalam Pemeliharaan Berkala"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Maintenance Title (English) *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-xs" 
                        value={maintForm.title_en} 
                        onChange={e => setMaintForm({...maintForm, title_en: e.target.value})} 
                        placeholder="System Under Scheduled Maintenance"
                      />
                    </div>
                  </div>

                  {/* Message ID & EN */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Pesan Penjelasan (Bahasa Indonesia) *
                      </label>
                      <textarea 
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-xs resize-none" 
                        value={maintForm.message_id} 
                        onChange={e => setMaintForm({...maintForm, message_id: e.target.value})} 
                        placeholder="Deskripsikan alasan pemeliharaan untuk pengunjung..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Explanation Message (English) *
                      </label>
                      <textarea 
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-xs resize-none" 
                        value={maintForm.message_en} 
                        onChange={e => setMaintForm({...maintForm, message_en: e.target.value})} 
                        placeholder="Describe the maintenance context for international clients..."
                      />
                    </div>
                  </div>

                  {/* Estimation & Contacts */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Estimasi Waktu Selesai
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-xs" 
                        value={maintForm.estimatedEnd} 
                        onChange={e => setMaintForm({...maintForm, estimatedEnd: e.target.value})} 
                        placeholder="e.g. ± 1 - 2 Jam / Pukul 15:00 WIB"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Email Kontak Darurat
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-xs" 
                        value={maintForm.contactEmail} 
                        onChange={e => setMaintForm({...maintForm, contactEmail: e.target.value})} 
                        placeholder="cempagakaryawijaya@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        WhatsApp Sales Darurat
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none text-xs" 
                        value={maintForm.contactPhone} 
                        onChange={e => setMaintForm({...maintForm, contactPhone: e.target.value})} 
                        placeholder="+62 823 1516 1767"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-100">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-brand-navy-950 hover:bg-brand-navy-900 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
                    >
                      <Save size={16} />
                      <span>Simpan Perubahan Pesan</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Informational Guidelines Card */}
              <div className="bg-brand-navy-50 border border-brand-navy-100 p-6 rounded-2xl text-xs text-brand-navy-950 space-y-2">
                <span className="font-bold block text-sm">💡 Catatan Operasional:</span>
                <ul className="list-disc list-inside space-y-1 text-neutral-700">
                  <li>Mode pemeliharaan dapat diaktifkan dan dinonaktifkan kapan saja tanpa perlu me-restart server.</li>
                  <li>Perubahan status pemeliharaan dicatat secara otomatis ke dalam <strong>Audit Trail Logs</strong> untuk keamanan.</li>
                  <li>Admin yang sedang login dapat tetap meninjau halaman website secara langsung dengan banner peringatan di bagian atas layar.</li>
                </ul>
              </div>

            </div>
          )}

          {/* TAB: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-navy-950">Commercial Inquiries Manager</h2>
                  <p className="text-xs text-neutral-500 mt-1">Daftar permintaan penawaran harga dari form RFQ publik</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      refreshInquiries();
                      showToast('Data RFQ disinkronkan dari server');
                    }}
                    className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
                    title="Refresh Data dari Server"
                  >
                    <RefreshCw size={14} />
                  </button>
                  <span className="px-3 py-1 bg-brand-navy-50 text-brand-navy-950 font-mono text-xs font-bold rounded-lg">
                    {inquiries.length} Inquiries
                  </span>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center text-neutral-400 text-sm">
                  Belum ada inquiry tersimpan. Cobalah kirim formulir RFQ di halaman Kontak.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold uppercase">
                      <tr>
                        <th className="px-6 py-4">Kode Pelacakan</th>
                        <th className="px-6 py-4">Pemohon & Perusahaan</th>
                        <th className="px-6 py-4">Produk Diminati</th>
                        <th className="px-6 py-4">Estimasi Kebutuhan</th>
                        <th className="px-6 py-4">Kontak</th>
                        <th className="px-6 py-4">Status & Sync</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {inquiries.map(inq => (
                        <tr key={inq.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-brand-navy-950">{inq.inquiryCode}</td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-neutral-900">{inq.name}</p>
                            <p className="text-neutral-500">{inq.company}</p>
                          </td>
                          <td className="px-6 py-4 font-medium text-neutral-800">{inq.productName}</td>
                          <td className="px-6 py-4 font-mono text-neutral-700">{inq.quantity || '-'}</td>
                          <td className="px-6 py-4">
                            <p className="text-neutral-700">{inq.email}</p>
                            <p className="text-neutral-500">{inq.phone}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <select
                                value={inq.status}
                                onChange={async (e) => {
                                  const nextStatus = e.target.value as any;
                                  const ok = await updateInquiryStatus(inq.id, nextStatus);
                                  if (ok) showToast(`Status ${inq.inquiryCode} diubah ke ${nextStatus}`);
                                }}
                                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-brand-blue-700 font-bold rounded-lg text-[10px] outline-none cursor-pointer transition-colors"
                              >
                                <option value="NEW">BARU (NEW)</option>
                                <option value="READ">DIBACA (READ)</option>
                                <option value="CONTACTED">DIHUBUNGI</option>
                                <option value="QUOTED">PENAWARAN</option>
                                <option value="CLOSED">SELESAI</option>
                              </select>
                              {inq.zohoSynced && (
                                <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-mono">
                                  Zoho ✓
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-navy-950">Katalog Produk & Spesifikasi</h2>
                  <p className="text-xs text-neutral-500 mt-1">Kelola data pasir silika, kemurnian kimia, dan status tampil</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingProduct({ ...emptyProduct });
                    setIsNewProduct(true);
                  }}
                  className="px-4 py-2 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow"
                >
                  <Plus size={16} />
                  <span>Tambah Produk</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold uppercase">
                    <tr>
                      <th className="px-6 py-4">Nama Produk (ID/EN)</th>
                      <th className="px-6 py-4">Grade Kemurnian</th>
                      <th className="px-6 py-4">Ukuran Butir</th>
                      <th className="px-6 py-4">Status Publikasi</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {products.map(prod => (
                      <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-neutral-900">{prod.name_id}</p>
                          <p className="text-neutral-500">{prod.name_en}</p>
                        </td>
                        <td className="px-6 py-4 font-mono font-semibold text-brand-blue-600">
                          {prod.assaySiO2 ? `SiO2 ${prod.assaySiO2}` : '-'}
                        </td>
                        <td className="px-6 py-4 text-neutral-600 font-mono">
                          {prod.particleSize_id}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleProductStatus(prod.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                              prod.status === 'published' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                            }`}
                          >
                            {prod.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => {
                              setEditingProduct({ ...prod });
                              setIsNewProduct(false);
                            }}
                            className="p-1.5 text-neutral-500 hover:text-brand-blue-600 hover:bg-neutral-100 rounded-lg transition-colors"
                            title="Edit Produk"
                          >
                            <Edit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ZOHO INTEGRATION */}
          {activeTab === 'zoho' && (
            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200 shadow-sm max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    Z
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-brand-navy-950">Zoho Workplace Suite Configuration</h3>
                    <p className="text-xs text-neutral-500">Integrasi real-time Zoho Mail REST API & Zoho Cliq Sales Webhooks</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-100">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                      Zoho Mail Sales Desk Destination
                    </label>
                    <input 
                      type="text" 
                      defaultValue="sales@cempagakaryawijaya.com" 
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono bg-neutral-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                      Zoho Cliq Lead Channel Webhook URL
                    </label>
                    <input 
                      type="text" 
                      defaultValue="https://cliq.zoho.com/api/v2/channels/ckw-leads/incoming?zapikey=••••••••" 
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono bg-neutral-50"
                      readOnly
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={() => showToast('Uji koneksi ping Zoho Workplace berhasil: 200 OK')}
                      className="px-5 py-2.5 bg-brand-navy-950 hover:bg-brand-navy-900 text-white font-bold rounded-xl text-xs transition-colors shadow"
                    >
                      Uji Koneksi (Diagnostic Ping)
                    </button>
                  </div>
                </div>
              </div>

              {/* Zoho Logs */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 max-w-2xl">
                <h4 className="font-display font-bold text-sm text-brand-navy-950 mb-4">Riwayat Pengiriman Webhook Terakhir</h4>
                {zohoLogs.length === 0 ? (
                  <p className="text-xs text-neutral-400">Belum ada pengiriman webhook aktif.</p>
                ) : (
                  <div className="space-y-2">
                    {zohoLogs.slice(0, 5).map(zh => (
                      <div key={zh.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between text-xs font-mono">
                        <div>
                          <span className="text-green-600 font-bold mr-2">[{zh.service}]</span>
                          <span className="text-neutral-700">{zh.payloadSummary}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400">{new Date(zh.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
              <h3 className="font-display font-bold text-lg text-brand-navy-950 mb-4">Immutable Audit Trail</h3>
              {auditLogs.length === 0 ? (
                <p className="text-xs text-neutral-400 py-6 text-center">Belum ada aktivitas audit log.</p>
              ) : (
                <div className="space-y-2">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-brand-blue-600 mr-2">[{log.action}]</span>
                        <span className="text-neutral-900 font-medium">{log.details}</span>
                        <span className="text-neutral-400 ml-2">oleh {log.actor}</span>
                      </div>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Edit / Create Modal Dialog */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-brand-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 my-auto">
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50 shrink-0">
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-navy-950">
                    {isNewProduct ? 'Tambah Produk Pasir Silika Baru' : `Edit Produk: ${editingProduct.name_id}`}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Perbarui spesifikasi teknis, kadar kimia, dan deskripsi produk untuk portal publik
                  </p>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="w-9 h-9 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 flex items-center justify-center transition-colors"
                  title="Tutup Form"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Form Body */}
              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* Group 1: Informasi Dasar */}
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-gold-600 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-brand-gold-500 rounded-full inline-block"></span>
                    Informasi Dasar Produk
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Nama Produk (Bahasa Indonesia) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name_id}
                        onChange={e => setEditingProduct({ ...editingProduct, name_id: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. Pasir Silika Kaca Float & Otomotif"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Product Name (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name_en}
                        onChange={e => setEditingProduct({ ...editingProduct, name_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. Float & Automotive Glass Silica Sand"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={editingProduct.slug}
                        onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. float-glass-silica"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          Status Publikasi
                        </label>
                        <select
                          value={editingProduct.status}
                          onChange={e => setEditingProduct({ ...editingProduct, status: e.target.value as 'published' | 'draft' })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none bg-white"
                        >
                          <option value="published">Published (Aktif)</option>
                          <option value="draft">Draft (Arsip)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          Urutan Tampil (Sort)
                        </label>
                        <input
                          type="number"
                          value={editingProduct.sortOrder || 0}
                          onChange={e => setEditingProduct({ ...editingProduct, sortOrder: parseInt(e.target.value) || 0 })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Group 2: Spesifikasi Kimia & Fisik */}
                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-gold-600 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-brand-gold-500 rounded-full inline-block"></span>
                    Spesifikasi Kimia & Hasil Uji Laboratorium
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Kadar Silika (SiO2)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.assaySiO2 || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, assaySiO2: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. ≥ 99.30%"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Kadar Besi (Fe2O3)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.assayFe2O3 || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, assayFe2O3: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. ≤ 0.020%"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        AFS Fineness
                      </label>
                      <input
                        type="text"
                        value={editingProduct.afsFineness || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, afsFineness: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. 45-50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Ukuran Butir / Mesh (ID)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.particleSize_id || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, particleSize_id: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. Mesh 30 - 100 (0.15 mm - 0.60 mm)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Particle Size / Mesh (EN)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.particleSize_en || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, particleSize_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. Mesh 30 - 100 (0.15 mm - 0.60 mm)"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Kandungan Kelembapan (ID)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.moistureContent_id || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, moistureContent_id: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. ≤ 0.2% (Kering Kiln)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Moisture Content (EN)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.moistureContent_en || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, moistureContent_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="e.g. ≤ 0.2% (Dry Kiln)"
                      />
                    </div>
                  </div>
                </div>

                {/* Group 3: Kebersihan & Kemasan */}
                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-gold-600 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-brand-gold-500 rounded-full inline-block"></span>
                    Kebersihan & Persyaratan Kemasan
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Tingkat Kebersihan (ID)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.cleanliness_id || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, cleanliness_id: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="Bebas lempung dan bahan organik"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Cleanliness (EN)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.cleanliness_en || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, cleanliness_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="Free of clay, organic matter, and foreign debris"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Persyaratan Kemasan (ID)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.packagingRequirement_id || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, packagingRequirement_id: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="Jumbo Bag 1.0 - 1.5 MT atau Curah"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Packaging Requirements (EN)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.packagingRequirement_en || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, packagingRequirement_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                        placeholder="Jumbo Bag 1.0 - 1.5 MT or Bulk Barge / Truck"
                      />
                    </div>
                  </div>
                </div>

                {/* Group 4: Deskripsi & Gambar */}
                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-gold-600 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-brand-gold-500 rounded-full inline-block"></span>
                    Deskripsi & Foto Produk
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Deskripsi Singkat (ID)
                      </label>
                      <textarea
                        rows={2}
                        value={editingProduct.shortDescription_id || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, shortDescription_id: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Short Description (EN)
                      </label>
                      <textarea
                        rows={2}
                        value={editingProduct.shortDescription_en || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, shortDescription_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none resize-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      URL Foto Gambar
                    </label>
                    <input
                      type="text"
                      value={editingProduct.imageUrl || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:border-brand-blue-600 focus:ring-1 focus:ring-brand-blue-600 outline-none"
                      placeholder="/silika.jpeg atau https://..."
                    />
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProduct}
                    className="px-6 py-2.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={15} />
                    <span>{isSavingProduct ? 'Menyimpan...' : (isNewProduct ? 'Tambahkan Produk' : 'Simpan Perubahan')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
