'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TopAnnouncementBar from './TopAnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import BottomNav from './BottomNav';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import CreativeBackground from '@/components/ui/CreativeBackground';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  // Force scroll to top on every path change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Force scroll restoration to manual to prevent browser from jumping to previous positions
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CreativeBackground density={pathname === '/' ? 'high' : 'low'} />
      <TopAnnouncementBar />
      <Header />
      <main className="min-h-screen animate-fade-in">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <ScrollIndicator />
      <FloatingWhatsApp />
    </div>
  );
}
