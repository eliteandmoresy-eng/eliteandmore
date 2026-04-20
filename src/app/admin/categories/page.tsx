'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search, SlidersHorizontal, Hash, LayoutGrid, Building2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Brand, Category } from '@/types';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/brands?all=true')
      .then((r) => r.json())
      .then((d) => {
        const all: Brand[] = d.data ?? [];
        setBrands(all.filter((b) => b.has_categories));
      })
      .catch(() => {});
  }, []);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const url = selectedBrand
        ? `/api/categories?brand_id=${selectedBrand}`
        : '/api/categories';
      const res = await fetch(url);
      const data = await res.json();
      setCategories(data.data ?? []);
    } catch {
      toast.error('فشل تحميل التصنيفات');
    } finally {
      setLoading(false);
    }
  }, [selectedBrand]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/categories/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'فشل الحذف');
      }
      toast.success('تم حذف التصنيف بنجاح');
      setDeleteId(null);
      fetchCategories();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحذف');
    } finally {
      setDeleting(false);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.brand?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deletingCat = categories.find((c) => c.id === deleteId);

  const brandOptions = [
    { value: '', label: 'الكل (جميع البراندات)' },
    ...brands.map((b) => ({ value: b.id, label: b.name })),
  ];

  return (
    <div dir="rtl" className="font-tajawal space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">التصنيفات</h1>
          <p className="text-sm text-elite-muted mt-1">إدارة الأقسام الداخلية لكل برند لتسهيل تصفح المنتجات</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center justify-center gap-2 bg-gold text-primary-dark font-bold px-6 py-3 rounded-2xl hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/20 text-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          إضافة تصنيف جديد
        </Link>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-elite-muted" />
          <input
            type="text"
            placeholder="بحث عن اسم التصنيف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3.5 bg-white border-none rounded-2xl shadow-soft focus:ring-2 focus:ring-gold/30 transition-all text-sm"
          />
        </div>
        <div>
          <Select
            options={brandOptions}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-white border-none shadow-soft"
            placeholder="تصفية حسب البرند"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/5 text-primary rounded-xl">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-elite-muted">إجمالي الأقسام</span>
          </div>
          <span className="text-xl font-bold text-elite-text">{categories.length}</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-[32px] shadow-soft overflow-hidden border border-white/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-dim/30 border-b border-elite-border/50">
                <th className="text-start p-5 text-elite-muted font-bold">التصنيف</th>
                <th className="text-start p-5 text-elite-muted font-bold">البرند التابع</th>
                <th className="text-start p-5 text-elite-muted font-bold">الترتيب</th>
                <th className="text-center p-5 text-elite-muted font-bold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elite-border/40">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-5"><div className="flex gap-3"><div className="w-12 h-12 bg-surface-dim rounded-xl" /> <div className="space-y-2"><div className="h-4 w-24 bg-surface-dim rounded" /><div className="h-3 w-16 bg-surface-dim rounded" /></div></div></td>
                    <td className="p-5"><div className="h-6 w-20 bg-surface-dim rounded-full" /></td>
                    <td className="p-5"><div className="h-4 w-8 bg-surface-dim rounded" /></td>
                    <td className="p-5 text-center"><div className="h-8 w-24 bg-surface-dim rounded-xl mx-auto" /></td>
                  </tr>
                ))
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="group hover:bg-surface-dim/30 transition-all duration-300">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-elite-border bg-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform">
                          {cat.image_url ? (
                            <Image src={cat.image_url} alt={cat.name} fill className="object-cover" sizes="48px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-elite-muted/40">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-elite-text text-base leading-tight truncate">{cat.name}</p>
                          <p className="text-xs text-elite-muted mt-0.5 uppercase tracking-wide">{cat.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-elite-muted">
                        <div className="relative w-6 h-6 rounded-md overflow-hidden bg-white border border-elite-border flex-shrink-0">
                           {cat.brand?.logo_url && <Image src={cat.brand.logo_url} alt="" fill className="object-contain" sizes="24px" />}
                        </div>
                        <span className="font-bold text-xs">{cat.brand?.name ?? '—'}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <Badge variant="blue" size="sm" className="bg-blue-50 text-blue-600 border-none font-bold">
                        #{cat.sort_order + 1}
                      </Badge>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/categories/${cat.id}/edit`}
                          className="p-2 rounded-xl border border-elite-border text-elite-text hover:bg-gold hover:border-gold hover:text-primary-dark transition-all"
                          title="تعديل"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(cat.id)}
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
                  <td colSpan={4} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search className="w-10 h-10 text-elite-muted/20" />
                      <p className="text-elite-muted font-medium">لم يتم العثور على أي تصنيفات</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Feed */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[24px] p-4 animate-pulse flex gap-4">
              <div className="w-16 h-16 bg-surface-dim rounded-2xl" />
              <div className="flex-1 space-y-2 mt-1">
                <div className="h-4 w-24 bg-surface-dim rounded" />
                <div className="h-3 w-16 bg-surface-dim rounded" />
              </div>
            </div>
          ))
        ) : filteredCategories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-[28px] p-5 shadow-soft border border-white hover:border-gold/30 transition-all active:scale-[0.98]">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-elite-border bg-gray-50 flex-shrink-0">
                {cat.image_url ? (
                  <Image src={cat.image_url} alt={cat.name} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-elite-muted/40">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p className="font-bold text-elite-text text-base truncate">{cat.name}</p>
                  <span className="text-[10px] font-bold bg-surface-dim text-elite-muted px-2 py-0.5 rounded-lg whitespace-nowrap">
                    #{cat.sort_order + 1}
                  </span>
                </div>
                <p className="text-xs text-elite-muted mt-0.5 truncate uppercase tracking-wide">{cat.slug}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Badge variant="gray" size="sm" className="px-2 py-0.5 border-none gap-1.5 grayscale">
                    <Building2 className="w-3 h-3" />
                    {cat.brand?.name ?? '—'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/categories/${cat.id}/edit`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-surface-dim text-elite-text font-bold text-sm hover:bg-gold/10 transition-all"
              >
                <Pencil className="w-4 h-4" />
                تعديل
              </Link>
              <button
                onClick={() => setDeleteId(cat.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="حذف التصنيف"
        message={`هل أنت متأكد من حذف تصنيف "${deletingCat?.name}"؟ سيتم حذف الارتباط مع المنتجات في هذا التصنيف فقط.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}

