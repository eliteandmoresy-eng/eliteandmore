'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Force scroll restoration to auto for better UX on refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BottomNav />
      <ScrollIndicator />
      <FloatingWhatsApp />
    </div>
  );
}
