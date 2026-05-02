'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Grid3X3, Layers,
  MapPin, Tag, Image, Settings, LogOut, ChevronLeft,
  Home
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم', exact: true },
  { href: '/admin/brands', icon: Layers, label: 'البرندات' },
  { href: '/admin/categories', icon: Grid3X3, label: 'التصنيفات' },
  { href: '/admin/products', icon: Package, label: 'المنتجات' },
  { href: '/admin/governorates', icon: MapPin, label: 'المحافظات' },
  { href: '/admin/tags', icon: Tag, label: 'الشارات' },
  { href: '/admin/banners', icon: Image, label: 'سلايدر الصور' },
  { href: '/admin/settings', icon: Settings, label: 'الإعدادات' },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-primary-dark border-l border-white/5 min-h-screen flex flex-col relative z-50">
      {/* Brand Header */}
      <div className="p-8 pb-10">
        <div className="flex flex-col items-start gap-1">
          <Logo size="md" dark={true} href={null} />
          <div className="flex items-center gap-2 mt-2">
             <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
             <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Management Suite</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest px-4 mb-4">القائمة الرئيسية</p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'group flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold font-tajawal transition-all duration-300 relative overflow-hidden',
                isActive
                  ? 'bg-gold text-primary-dark shadow-lg shadow-gold/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              <div className="flex items-center gap-3.5 relative z-10">
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-primary-dark" : "text-white/30 group-hover:text-gold"
                )} />
                <span>{item.label}</span>
              </div>
              
              {isActive && (
                <ChevronLeft className="w-4 h-4 text-primary-dark animate-in slide-in-from-right-2 duration-300" />
              )}
              
              {/* Active Glow Effect */}
              {isActive && (
                <div className="absolute inset-y-0 right-0 w-1 bg-primary-dark rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Visit Store Action */}
      <div className="px-4 mb-2 mt-auto">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-4 w-full text-[13px] font-bold font-tajawal text-gold bg-gold/5 border border-gold/10 rounded-2xl hover:bg-gold hover:text-primary-dark transition-all group shadow-lg shadow-black/20"
        >
          <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-primary-dark/20 transition-colors">
            <Home className="w-4 h-4" />
          </div>
          <span>زيارة المتجر المباشر</span>
        </Link>
      </div>

      {/* Footer / Account */}
      <div className="p-6">
        <div className="bg-white/5 rounded-3xl p-4 border border-white/5">
           <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-xs font-bold font-tajawal text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-red-400/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
               <LogOut className="w-4 h-4" />
            </div>
            <span>تسجيل الخروج من النظام</span>
          </button>
        </div>
        
        <p className="text-center text-[9px] text-white/20 mt-4 font-tajawal font-medium">حقوق الملكية Elite & More &copy; 2024</p>
      </div>
    </aside>
  );
}
