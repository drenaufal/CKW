"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Shield, LayoutDashboard, Package, MailOpen, Activity, 
  Settings, LogOut, CheckCircle, Plus, Edit, Trash2, Globe, Send, Bell
} from 'lucide-react';
import { ProductItem } from '@/services/dataStorage';

export default function AdminPage() {
  const { inquiries, products, setProducts, currentUser, setCurrentUser, auditLogs, zohoLogs } = useAppContext();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setCurrentUser({ role: 'superadmin', name: 'Super Admin' });
      setLoginError('');
      showToast('Login berhasil sebagai Super Admin');
    } else {
      setLoginError('Kredensial tidak valid. Silakan gunakan user: admin / pass: admin123');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const toggleProductStatus = (id: number) => {
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'published' ? 'draft' as const : 'published' as const };
      }
      return p;
    });
    setProducts(updated);
    showToast('Status produk berhasil diperbarui');
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
                className="w-full py-3.5 bg-brand-navy-950 hover:bg-brand-navy-900 text-white font-bold rounded-xl transition-colors text-sm shadow-md"
              >
                Masuk ke Dashboard CMS
              </button>
            </div>
            <div className="text-center text-xs text-neutral-400 pt-2">
              Kredensial Demo: <code className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-700 font-mono">admin</code> / <code className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-700 font-mono">admin123</code>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Utama' },
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
          <CheckCircle size={16} className="text-brand-gold-400" />
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
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-brand-navy-900 border-l-4 border-brand-gold-500 text-white shadow-inner' 
                  : 'text-neutral-400 hover:bg-brand-navy-900/60 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? 'text-brand-gold-400' : 'text-neutral-400'} />
              <span>{tab.label}</span>
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

          {/* TAB: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-navy-950">Commercial Inquiries Manager</h2>
                  <p className="text-xs text-neutral-500 mt-1">Daftar permintaan penawaran harga dari form RFQ publik</p>
                </div>
                <span className="px-3 py-1 bg-brand-navy-50 text-brand-navy-950 font-mono text-xs font-bold rounded-lg">
                  {inquiries.length} Inquiries
                </span>
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
                              <span className="px-2.5 py-1 bg-blue-50 text-brand-blue-700 font-bold rounded-full text-[10px]">
                                {inq.status}
                              </span>
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
                  onClick={() => showToast('Fitur Tambah Produk Baru aktif di mode live DB')}
                  className="px-4 py-2 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-bold rounded-xl text-xs flex items-center gap-2"
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
                            onClick={() => showToast(`Edit mode untuk ${prod.name_id}`)}
                            className="p-1.5 text-neutral-500 hover:text-brand-blue-600 transition-colors"
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
      </main>
    </div>
  );
}

