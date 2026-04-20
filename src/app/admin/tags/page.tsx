'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2, Tag as TagIcon, Layout, Settings2, Globe, Search, Palette, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { Tag } from '@/types';
import { tagSchema } from '@/lib/validators';
import { generateSlug } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Badge from '@/components/ui/Badge';

type TagFormData = z.infer<typeof tagSchema>;

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
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
  } = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: '',
      slug: '',
      color: '#6B2D8A',
      show_on_home: true,
      sort_order: 0,
    },
  });

  const colorValue = watch('color');

  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tags');
      const data = await res.json();
      setTags(data.data ?? []);
    } catch {
      toast.error('فشل تحميل الشارات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const openAdd = () => {
    reset({ name: '', slug: '', color: '#6B2D8A', show_on_home: true, sort_order: tags.length });
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (tag: Tag) => {
    reset({
      name: tag.name,
      slug: tag.slug,
      color: tag.color,
      show_on_home: tag.show_on_home,
      sort_order: tag.sort_order,
    });
    setEditingId(tag.id);
    setModalOpen(true);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('name', val);
    if (!editingId) setValue('slug', generateSlug(val));
  };

  const onSubmit = async (data: TagFormData) => {
    try {
      const url = editingId ? `/api/tags/${editingId}` : '/api/tags';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'فشل الحفظ');
      toast.success(editingId ? 'تم تحديث البيانات' : 'تم إضافة الشارة بنجاح');
      setModalOpen(false);
      fetchTags();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحفظ');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/tags/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'فشل الحذف');
      }
      toast.success('تم حذف الشارة بنجاح');
      setDeleteId(null);
      fetchTags();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحذف');
    } finally {
      setDeleting(false);
    }
  };

  const filteredTags = tags.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortOptions = Array.from({ length: Math.max(tags.length + 1, 12) }, (_, i) => ({
    label: `المركز ${i + 1}`,
    value: i.toString(),
  }));

  const deletingTag = tags.find((t) => t.id === deleteId);

  return (
    <div dir="rtl" className="font-tajawal space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">شارات المنتجات</h1>
          <p className="text-sm text-elite-muted mt-1">إدارة الشارات الملونة للتمييز بين المنتجات في المتجر</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 bg-gold text-primary-dark font-bold px-6 py-3 rounded-2xl hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/20 text-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          إضافة شارة جديدة
        </button>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-elite-muted" />
          <input
            type="text"
            placeholder="البحث عن شارة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3.5 bg-white border-none rounded-2xl shadow-soft focus:ring-2 focus:ring-gold/30 transition-all text-sm"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/5 text-primary rounded-xl">
              <TagIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-elite-muted">إجمالي الشارات</span>
          </div>
          <span className="text-xl font-bold text-elite-text">{tags.length}</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-[32px] shadow-soft overflow-hidden border border-white/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-dim/30 border-b border-elite-border/50">
                <th className="text-start p-5 text-elite-muted font-bold">الشارة</th>
                <th className="text-start p-5 text-elite-muted font-bold">كود اللون</th>
                <th className="text-start p-5 text-elite-muted font-bold">الرئيسية</th>
                <th className="text-start p-5 text-elite-muted font-bold">الترتيب</th>
                <th className="text-center p-5 text-elite-muted font-bold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elite-border/40">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-5"><div className="h-8 bg-surface-dim rounded-full w-24" /></td>
                    <td className="p-5"><div className="h-5 bg-surface-dim rounded-md w-20" /></td>
                    <td className="p-5"><div className="h-5 bg-surface-dim rounded-full w-12" /></td>
                    <td className="p-5"><div className="h-5 bg-surface-dim rounded-md w-8" /></td>
                    <td className="p-5 text-center"><div className="h-8 w-24 bg-surface-dim rounded-xl mx-auto" /></td>
                  </tr>
                ))
              ) : filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <tr key={tag.id} className="group hover:bg-surface-dim/30 transition-all duration-300">
                    <td className="p-5">
                       <Badge color={tag.color} className="shadow-sm px-4 py-1.5 rounded-lg text-[13px]">
                         {tag.name}
                       </Badge>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-elite-border" style={{ backgroundColor: tag.color }} />
                        <span className="text-elite-muted text-xs font-mono font-bold">{tag.color}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <Badge variant={tag.show_on_home ? 'success' : 'gray'} size="sm">
                        {tag.show_on_home ? 'نعم' : 'لا'}
                      </Badge>
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-dim text-elite-muted text-xs font-bold">
                        #{tag.sort_order + 1}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(tag)}
                          className="p-2 rounded-xl border border-elite-border text-elite-text hover:bg-gold hover:border-gold hover:text-primary-dark transition-all"
                          title="تعديل"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(tag.id)}
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
                  <td colSpan={5} className="p-12 text-center text-elite-muted">لا توجد نتائج</td>
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
            <div key={i} className="bg-white rounded-[24px] p-5 shadow-soft animate-pulse flex flex-col gap-3">
              <div className="h-6 w-20 bg-surface-dim rounded-full" />
              <div className="h-8 bg-surface-dim rounded-xl w-full" />
            </div>
          ))
        ) : filteredTags.map((tag) => (
          <div key={tag.id} className="bg-white rounded-[28px] p-5 shadow-soft border border-white active:scale-[0.98] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                 <Badge color={tag.color} className="shadow-sm px-3 py-1 rounded-lg text-sm mb-2">
                   {tag.name}
                 </Badge>
                 <div className="flex items-center gap-2 text-[11px] text-elite-muted font-bold">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }} />
                   <span>{tag.color}</span>
                 </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                 <Badge variant={tag.show_on_home ? 'success' : 'gray'} size="sm" className="text-[9px] px-2">
                    {tag.show_on_home ? 'تظهر في الرئيسية' : 'مخفية'}
                 </Badge>
                 <span className="text-[10px] font-bold text-elite-muted bg-surface-dim px-2 py-0.5 rounded-md">#{tag.sort_order + 1}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEdit(tag)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-surface-dim text-elite-text font-bold text-sm"
              >
                <Pencil className="w-4 h-4" />
                تعديل
              </button>
              <button
                onClick={() => setDeleteId(tag.id)}
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
        title={editingId ? 'تعديل بيانات الشارة' : 'إضافة شارة جديدة'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-elite-text mb-1">
              <TagIcon className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">بيانات الشارة</span>
            </div>

            <Input
              label="اسم الشارة"
              placeholder="مثال: خصم 50%"
              error={errors.name?.message}
              {...register('name')}
              onChange={onNameChange}
              className="bg-surface-dim/50 border-none"
            />

            <Input
              label="Slug"
              error={errors.slug?.message}
              {...register('slug')}
              dir="ltr"
              className="bg-surface-dim/50 border-none"
            />
          </div>

          <div className="h-px bg-elite-border/50" />

          <div className="space-y-5">
            <div className="flex items-center gap-2 text-elite-text mb-1">
              <Palette className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">مظهر الشارة</span>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-elite-text">اللون التعريفي</label>
              <div className="flex items-center gap-4 bg-surface-dim/50 p-3 rounded-2xl border border-elite-border/50">
                <input
                  type="color"
                  className="w-12 h-12 rounded-xl border-none cursor-pointer p-0.5 bg-white shadow-sm"
                  {...register('color')}
                />
                <div className="flex flex-col">
                   <span className="text-xs font-black text-elite-text font-mono">{colorValue.toUpperCase()}</span>
                   <span className="text-[10px] text-elite-muted">اضغط لتغيير اللون</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-elite-border/50" />

          <div className="space-y-5">
            <div className="flex items-center gap-2 text-elite-text mb-1">
              <Settings2 className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">الإعدادات</span>
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
                <div className="flex items-center gap-1.5 opacity-70">
                   <Eye className="w-3.5 h-3.5" />
                   <span className="text-[10px] font-bold">الرئيسية</span>
                </div>
                <Controller
                  name="show_on_home"
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
        title="حذف الشارة"
        message={`هل أنت متأكد من حذف شارة "${deletingTag?.name}"؟ سيتم حذفها من جميع المنتجات المرتبطة بها.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}

