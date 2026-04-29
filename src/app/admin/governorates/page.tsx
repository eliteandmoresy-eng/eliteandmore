'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2, MapPin, Truck, Settings2, Globe, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { Governorate } from '@/types';
import { governorateSchema } from '@/lib/validators';
import { formatSYP, generateSlug } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Badge from '@/components/ui/Badge';

type GovFormData = z.infer<typeof governorateSchema>;

export default function GovernoratesPage() {
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GovFormData>({
    resolver: zodResolver(governorateSchema),
    defaultValues: {
      name: '',
      slug: '',
      shipping_cost: 0,
      is_active: true,
      sort_order: 0,
    },
  });

  const fetchGovernorates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/governorates?all=true');
      const data = await res.json();
      setGovernorates(data.data ?? []);
    } catch {
      toast.error('فشل تحميل المحافظات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGovernorates();
  }, [fetchGovernorates]);

  const openAdd = () => {
    reset({ name: '', slug: '', shipping_cost: 0, is_active: true, sort_order: governorates.length });
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (gov: Governorate) => {
    reset({
      name: gov.name,
      slug: gov.slug,
      shipping_cost: gov.shipping_cost,
      is_active: gov.is_active,
      sort_order: gov.sort_order,
    });
    setEditingId(gov.id);
    setModalOpen(true);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('name', val);
    if (!editingId) setValue('slug', generateSlug(val));
  };

  const onSubmit = async (data: GovFormData) => {
    try {
      const url = editingId ? `/api/governorates/${editingId}` : '/api/governorates';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'فشل الحفظ');
      toast.success(editingId ? 'تم تحديث البيانات' : 'تم إضافة المحافظة بنجاح');
      setModalOpen(false);
      fetchGovernorates();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحفظ');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/governorates/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'فشل الحذف');
      }
      toast.success('تم حذف المحافظة بنجاح');
      setDeleteId(null);
      fetchGovernorates();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحذف');
    } finally {
      setDeleting(false);
    }
  };

  const filteredGovernorates = governorates.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortOptions = Array.from({ length: Math.max(governorates.length + 1, 14) }, (_, i) => ({
    label: `المركز ${i + 1}`,
    value: i.toString(),
  }));

  const deletingGov = governorates.find((g) => g.id === deleteId);

  return (
    <div dir="rtl" className="font-tajawal space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">المحافظات</h1>
          <p className="text-sm text-elite-muted mt-1">إدارة تكاليف الشحن وتفعيل التوصيل لكل محافظة</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 bg-gold text-primary-dark font-bold px-6 py-3 rounded-2xl hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/20 text-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          إضافة محافظة جديدة
        </button>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-elite-muted" />
          <input
            type="text"
            placeholder="البحث عن محافظة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3.5 bg-white border-none rounded-2xl shadow-soft focus:ring-2 focus:ring-gold/30 transition-all text-sm"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/5 text-primary rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-elite-muted">إجمالي المناطق</span>
          </div>
          <span className="text-xl font-bold text-elite-text">{governorates.length}</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-[32px] shadow-soft overflow-hidden border border-white/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-dim/30 border-b border-elite-border/50">
                <th className="text-start p-5 text-elite-muted font-bold">المحافظة</th>
                <th className="text-start p-5 text-elite-muted font-bold">تكلفة الشحن</th>
                <th className="text-start p-5 text-elite-muted font-bold">حالة التوصيل</th>
                <th className="text-start p-5 text-elite-muted font-bold">الترتيب</th>
                <th className="text-center p-5 text-elite-muted font-bold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elite-border/40">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 5 }).map((__, j) => (
                      <td key={j} className="p-5">
                        <div className="h-4 bg-surface-dim rounded-lg w-2/3" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredGovernorates.length > 0 ? (
                filteredGovernorates.map((gov) => (
                  <tr key={gov.id} className="group hover:bg-surface-dim/30 transition-all duration-300">
                    <td className="p-5 text-elite-text font-bold">
                       <span className="text-lg">{gov.name}</span>
                       <span className="block text-xs text-elite-muted font-medium mt-0.5">{gov.slug}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-primary font-black">
                        <Truck className="w-4 h-4 text-gold" />
                        <span>{formatSYP(gov.shipping_cost)}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <Badge variant={gov.is_active ? 'success' : 'danger'} size="sm">
                        {gov.is_active ? 'مفعل' : 'معطل'}
                      </Badge>
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-dim text-elite-muted text-xs font-bold">
                        #{gov.sort_order + 1}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(gov)}
                          className="p-2 rounded-xl border border-elite-border text-elite-text hover:bg-gold hover:border-gold hover:text-primary-dark transition-all"
                          title="تعديل"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(gov.id)}
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
                  <td colSpan={5} className="p-12 text-center text-elite-muted">لم يتم العثور على نتائج</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[24px] p-5 shadow-soft animate-pulse space-y-3">
              <div className="h-4 w-32 bg-surface-dim rounded" />
              <div className="h-8 bg-surface-dim rounded-xl w-full" />
            </div>
          ))
        ) : filteredGovernorates.map((gov) => (
          <div key={gov.id} className="bg-white rounded-[28px] p-5 shadow-soft border border-white active:scale-[0.98] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-elite-text text-lg leading-tight">{gov.name}</p>
                <div className="flex items-center gap-2 mt-2">
                   <Badge variant={gov.is_active ? 'success' : 'danger'} size="sm" className="text-[9px] px-2">
                    {gov.is_active ? 'توصيل متاح' : 'التوصيل متوقف'}
                  </Badge>
                  <span className="text-[10px] font-bold text-elite-muted bg-surface-dim px-2 py-0.5 rounded-md">#{gov.sort_order + 1}</span>
                </div>
              </div>
              <div className="text-left font-black text-primary">
                <span className="text-xs block text-elite-muted font-bold mb-0.5">تكلفة الشحن</span>
                {formatSYP(gov.shipping_cost)}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEdit(gov)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-surface-dim text-elite-text font-bold text-sm"
              >
                <Pencil className="w-4 h-4" />
                تعديل
              </button>
              <button
                onClick={() => setDeleteId(gov.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 text-red-500 font-bold text-sm"
              >
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'تعديل بيانات المحافظة' : 'إضافة محافظة جديدة'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-elite-text mb-1">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">المعلومات الأساسية</span>
            </div>

            <Input
              label="اسم المحافظة"
              placeholder="مثال: دمشق"
              error={errors.name?.message}
              {...register('name')}
              onChange={onNameChange}
              className="bg-surface-dim/50 border-none"
            />

            <input type="hidden" {...register('slug')} />
          </div>

          <div className="h-px bg-elite-border/50" />

          <div className="space-y-5">
            <div className="flex items-center gap-2 text-elite-text mb-1">
              <Truck className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">إعدادات الشحن</span>
            </div>

            <Input
              label="تكلفة الشحن (ل.س)"
              type="number"
              error={errors.shipping_cost?.message}
              {...register('shipping_cost', { valueAsNumber: true })}
              className="bg-surface-dim/50 border-none font-black text-primary"
            />
          </div>

          <div className="h-px bg-elite-border/50" />

          <div className="space-y-5">
            <div className="flex items-center gap-2 text-elite-text mb-1">
              <Settings2 className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">أولوية الظهور والحالة</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-elite-text">الترتيب</label>
                <Controller
                  name="sort_order"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={sortOptions}
                      value={field.value.toString()}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      className="bg-surface-dim/50 border-none"
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-dim/30 mt-auto h-[46px]">
                <div className="flex items-center gap-1.5 grayscale opacity-70">
                   <Globe className="w-3.5 h-3.5" />
                   <span className="text-[10px] font-bold">فعال</span>
                </div>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <Switch checked={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="flex-1 rounded-2xl">
              إلغاء
            </Button>
            <Button type="submit" variant="gold" loading={isSubmitting} className="flex-1 rounded-2xl shadow-gold/20">
              حفظ البيانات
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="حذف المحافظة"
        message={`هل أنت متأكد من حذف محافظة "${deletingGov?.name}"؟ سيتم حذف جميع إعدادات الشحن الخاصة بها.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}

