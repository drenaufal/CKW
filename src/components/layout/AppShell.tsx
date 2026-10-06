"use client";

import React, { ReactNode } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen bg-neutral-100">{children}</div>;
  }

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

