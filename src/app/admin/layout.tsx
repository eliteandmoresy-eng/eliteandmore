'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Logo from '@/components/ui/Logo';

const pageTitles: Record<string, string> = {
  '/admin': 'لوحة التحكم',
  '/admin/brands': 'البرندات',
  '/admin/categories': 'التصنيفات',
  '/admin/products': 'المنتجات',
  '/admin/governorates': 'المحافظات',
  '/admin/tags': 'الشارات',
  '/admin/banners': 'سلايدر الصور',
  '/admin/settings': 'الإعدادات',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  // Derive page title for mobile header
  const pageTitle = Object.entries(pageTitles).find(([key]) =>
    key === '/admin' ? pathname === key : pathname.startsWith(key)
  )?.[1] ?? 'الإدارة';

  useEffect(() => {
    if (isLoginPage) return;
    if (status === 'unauthenticated') {
      router.replace('/admin/login');
    }
  }, [status, isLoginPage, router]);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Login page — no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Still loading session — show blank
  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-surface-dim flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Authenticated — show admin panel
  return (
    <div className="flex min-h-screen bg-surface-dim" dir="rtl">
      {/* ── Desktop sidebar (always visible md+) ── */}
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>

      {/* ── Mobile drawer overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile sidebar drawer (slides in from right for RTL) ── */}
      <div
        className={[
          'fixed top-0 right-0 z-50 h-full md:hidden transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Close button inside drawer */}
        <div className="relative h-full">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 left-4 z-10 p-1.5 rounded-lg bg-surface-dim text-elite-muted hover:text-elite-text transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5" />
          </button>
          <AdminSidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-30 bg-white border-b border-elite-border px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-elite-text hover:bg-surface-dim transition-colors flex-shrink-0"
            aria-label="فتح القائمة"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-base font-bold font-cairo text-elite-text truncate">{pageTitle}</span>
          <div className="flex-shrink-0">
            <Logo size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
