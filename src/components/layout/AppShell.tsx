"use client";

import React, { ReactNode, useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import MaintenanceScreen from '@/components/public/MaintenanceScreen';
import { useAppContext } from '@/context/AppContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, EyeOff } from 'lucide-react';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { maintenanceConfig, currentUser } = useAppContext();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const isAdmin = pathname?.startsWith('/admin');

  // If in Admin panel, always render admin view
  if (isAdmin) {
    return <div className="min-h-screen bg-neutral-100">{children}</div>;
  }

  // If maintenance mode is active
  if (maintenanceConfig?.enabled) {
    // Only if logged in as admin AND explicitly toggled preview mode, show the site with warning
    if (currentUser && isPreviewMode) {
      return (
        <div className="min-h-screen flex flex-col bg-neutral-50 font-sans text-neutral-900">
          <div className="sticky top-0 z-50 bg-amber-500 text-brand-navy-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>
                MODE PRATINJAU ADMIN: Mode pemeliharaan sedang AKTIF. Pengunjung umum hanya melihat landing page pemeliharaan.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreviewMode(false)}
                className="px-3 py-1 bg-brand-navy-950/20 hover:bg-brand-navy-950/30 text-brand-navy-950 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <EyeOff size={13} />
                <span>Lihat Tampilan Maintenance</span>
              </button>
              <Link 
                href="/admin" 
                className="px-3 py-1 bg-brand-navy-950 text-white rounded-lg hover:bg-brand-navy-900 transition-colors flex items-center gap-1"
              >
                <span>Kembali ke Admin Panel</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <Navbar />
          <main className="flex-grow flex flex-col w-full relative">
            {children}
          </main>
          <Footer />
        </div>
      );
    }

    // By default: all public visitors (and admin visiting public routes) see the full Maintenance landing page!
    return <MaintenanceScreen onEnablePreview={() => setIsPreviewMode(true)} />;
  }

  // Normal live website
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-sans text-neutral-900">
      <Navbar />
      <main className="flex-grow flex flex-col w-full relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
