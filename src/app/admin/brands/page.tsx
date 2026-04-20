'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search, Filter, Hash, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import { Brand } from '@/types';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Badge from '@/components/ui/Badge';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/brands?all=true');
      const data = await res.json();
      setBrands(data.data ?? []);
    } catch {
      toast.error('فشل تحميل البرندات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/brands/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'فشل الحذف');
      }
      toast.success('تم حذف البرند بنجاح');
      setDeleteId(null);
      fetchBrands();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحذف');
    } finally {
      setDeleting(false);
    }
  };

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deletingBrand = brands.find((b) => b.id === deleteId);

  return (
    <div dir="rtl" className="font-tajawal space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">البرندات</h1>
          <p className="text-sm text-elite-muted mt-1">إدارة وتحكم بهوية البرندات التجارية في متجرك</p>
        </div>
        <Link
          href="/admin/brands/new"
          className="inline-flex items-center justify-center gap-2 bg-gold text-primary-dark font-bold px-6 py-3 rounded-2xl hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/20 text-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          إضافة برند جديد
        </Link>
      </div>

      {/* Stats & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-elite-muted" />
          <input
            type="text"
            placeholder="بحث عن اسم برند أو slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3.5 bg-white border-none rounded-2xl shadow-soft focus:ring-2 focus:ring-gold/30 transition-all text-sm"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/5 text-primary rounded-xl">
              <Hash className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-elite-muted">إجمالي البرندات</span>
          </div>
          <span className="text-xl font-bold text-elite-text">{brands.length}</span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-[32px] shadow-soft overflow-hidden border border-white/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-dim/30 border-b border-elite-border/50">
                <th className="text-start p-5 text-elite-muted font-bold">البرند</th>
                <th className="text-start p-5 text-elite-muted font-bold">التصنيفات</th>
                <th className="text-start p-5 text-elite-muted font-bold">الحالة</th>
                <th className="text-start p-5 text-elite-muted font-bold">الترتيب</th>
                <th className="text-center p-5 text-elite-muted font-bold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elite-border/40">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-5"><div className="flex gap-3"><div className="w-12 h-12 bg-surface-dim rounded-xl" /><div className="space-y-2"><div className="h-4 w-24 bg-surface-dim rounded" /><div className="h-3 w-16 bg-surface-dim rounded" /></div></div></td>
                    <td className="p-5"><div className="h-6 w-20 bg-surface-dim rounded-full" /></td>
                    <td className="p-5"><div className="h-6 w-16 bg-surface-dim rounded-full" /></td>
                    <td className="p-5"><div className="h-4 w-8 bg-surface-dim rounded" /></td>
                    <td className="p-5 text-center"><div className="h-8 w-24 bg-surface-dim rounded-xl mx-auto" /></td>
                  </tr>
                ))
              ) : filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr key={brand.id} className="group hover:bg-surface-dim/30 transition-all duration-300">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-elite-border bg-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={brand.logo_url}
                            alt={brand.name}
                            fill
                            className="object-contain p-1"
                            sizes="56px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-elite-text text-base leading-tight truncate">{brand.name}</p>
                          <p className="text-xs text-elite-muted mt-0.5 tracking-wide uppercase font-medium">{brand.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <Badge variant={brand.has_categories ? 'blue' : 'gray'} className="text-[10px] px-2.5 py-1">
                        {brand.has_categories ? 'مع تصنيفات' : 'منتجات مباشرة'}
                      </Badge>
                    </td>
                    <td className="p-5">
                      <Badge variant={brand.is_active ? 'success' : 'danger'} className="text-[10px] px-2.5 py-1">
                        {brand.is_active ? 'فعّال' : 'معطّل'}
                      </Badge>
                    </td>
                    <td className="p-5 text-elite-text font-bold text-lg">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-dim/50 text-elite-muted text-xs">
                        #{brand.sort_order + 1}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/brands/${brand.id}/edit`}
                          className="p-2 rounded-xl border border-elite-border text-elite-text hover:bg-gold hover:border-gold hover:text-primary-dark transition-all"
                          title="تعديل"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(brand.id)}
                          className="p-2 rounded-xl border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-surface-dim flex items-center justify-center mb-2">
                        <Search className="w-8 h-8 text-elite-muted/40" />
                      </div>
                      <p className="text-elite-muted font-medium">لم يتم العثور على أي نتائج</p>
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="text-gold font-bold text-sm hover:underline"
                        >
                          إعادة ضبط البحث
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[24px] p-4 shadow-soft animate-pulse flex items-center gap-4">
              <div className="w-16 h-16 bg-surface-dim rounded-2xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-surface-dim rounded" />
                <div className="h-3 w-16 bg-surface-dim rounded" />
              </div>
            </div>
          ))
        ) : filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-[28px] p-5 shadow-soft border border-white/50 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-elite-border bg-gray-50 flex-shrink-0">
                  <Image
                    src={brand.logo_url}
                    alt={brand.name}
                    fill
                    className="object-contain p-1.5"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-elite-text text-base leading-tight truncate">{brand.name}</p>
                    <span className="text-[10px] font-bold bg-surface-dim text-elite-muted px-2 py-0.5 rounded-lg whitespace-nowrap">
                      #{brand.sort_order + 1}
                    </span>
                  </div>
                  <p className="text-xs text-elite-muted mt-0.5 uppercase tracking-wide">{brand.slug}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={brand.is_active ? 'success' : 'danger'} className="text-[9px] px-2 py-0.5">
                      {brand.is_active ? 'فعّال' : 'معطّل'}
                    </Badge>
                    <Badge variant={brand.has_categories ? 'blue' : 'gray'} className="text-[9px] px-2 py-0.5">
                      {brand.has_categories ? 'تصنيفات' : 'مباشر'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/brands/${brand.id}/edit`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-surface-dim text-elite-text font-bold text-sm hover:bg-gold/10 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                  تعديل
                </Link>
                <button
                  onClick={() => setDeleteId(brand.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[28px] p-12 shadow-soft text-center">
            <p className="text-elite-muted">لا توجد نتائج</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="حذف البرند"
        message={`هل أنت متأكد من حذف براند "${deletingBrand?.name}"؟ سيؤدي هذا إلى حذف المنتجات المرتبطة به أيضاً.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}

