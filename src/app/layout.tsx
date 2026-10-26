import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT. Cempaga Karya Wijaya | Quality in Every Grain",
  description: "Premier Indonesian industrial silica mineral processing and manufacturing enterprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <AppProvider>
          <AppShell>
            {children}
          </AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
