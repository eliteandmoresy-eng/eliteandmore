'use client';

import { X, ExternalLink, Package, Layers, Tag, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'products' | 'brands' | 'tags' | 'out_of_stock';
  data: any[];
  loading: boolean;
}

export default function DashboardListModal({
  isOpen,
  onClose,
  title,
  type,
  data,
  loading,
}: DashboardListModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'products': return Package;
      case 'brands': return Layers;
      case 'tags': return Tag;
      case 'out_of_stock': return AlertCircle;
      default: return Package;
    }
  };

  const Icon = getIcon();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-6 border-b border-lite-gold/10 flex items-center justify-between bg-surface-dim/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-2xl shadow-sm text-primary">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cairo font-black text-xl text-elite-text">{title}</h3>
              <p className="text-xs text-elite-muted font-tajawal">عرض سريع لأهم العناصر</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 rounded-2xl hover:bg-white hover:text-red-500 transition-all text-elite-muted"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 custom-scrollbar">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 bg-surface-dim rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-surface-dim rounded-full flex items-center justify-center mx-auto text-elite-muted/30">
                <Icon className="w-8 h-8" />
              </div>
              <p className="font-tajawal text-elite-muted">لا يوجد بيانات لعرضها حالياً</p>
            </div>
          ) : (
            data.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-lite-gold/20 hover:bg-surface-dim/50 transition-all group"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-surface-dim flex-shrink-0 shadow-sm flex items-center justify-center border border-lite-gold/5">
                  {item.logo_url || item.image_url || (item.images && item.images[0]?.url) ? (
                    <Image 
                      src={item.logo_url || item.image_url || (item.images && item.images[0]?.url)} 
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-1 text-center">
                      <Icon className="w-4 h-4 text-elite-muted/40 mb-0.5" />
                      <span className="text-[8px] font-bold text-elite-muted/40 leading-tight">لا توجد صورة</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-elite-text font-tajawal truncate">{item.name}</p>
                  <p className="text-[10px] text-elite-muted font-tajawal">
                    {type === 'products' || type === 'out_of_stock' ? item.brand?.name : item.slug}
                  </p>
                </div>
                <Link 
                  href={`/admin/${type === 'out_of_stock' ? 'products' : type}/${type === 'tags' ? '' : item.id + '/edit'}`}
                  className="p-2 rounded-xl bg-white text-elite-muted hover:text-gold hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-dim/20 border-t border-lite-gold/10 text-center">
          <Link 
            href={`/admin/${type === 'out_of_stock' ? 'products?stock=out_of_stock' : type}`}
            onClick={onClose}
            className="text-xs font-black text-primary hover:text-gold transition-colors font-tajawal flex items-center justify-center gap-2"
          >
            عرض كافة {title} في صفحة مستقلة
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
