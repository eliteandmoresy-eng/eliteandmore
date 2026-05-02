'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Tag, MapPin, Layers, TrendingUp, Users, ShoppingBag, ArrowUpRight, Activity, AlertCircle } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import DashboardListModal from '@/components/admin/DashboardListModal';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    brands: 0,
    tags: 0,
    outOfStock: 0,
  });

  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'products' | 'brands' | 'tags' | 'out_of_stock';
    title: string;
    data: any[];
    loading: boolean;
  }>({
    isOpen: false,
    type: 'products',
    title: '',
    data: [],
    loading: false,
  });

  useEffect(() => {
    async function loadStats() {
      const [products, brands, tags, outOfStock] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('brands').select('id', { count: 'exact', head: true }),
        supabase.from('tags').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('stock_status', 'out_of_stock'),
      ]);

      setStats({
        products: products.count || 0,
        brands: brands.count || 0,
        tags: tags.count || 0,
        outOfStock: outOfStock.count || 0,
      });
    }

    loadStats();
  }, []);

  const openModal = async (type: typeof modal['type'], title: string) => {
    setModal({ ...modal, isOpen: true, type, title, loading: true, data: [] });
    
    try {
      let query;
      switch (type) {
        case 'products':
          query = supabase.from('products').select('*, brand:brands(name)').order('created_at', { ascending: false }).limit(10);
          break;
        case 'brands':
          query = supabase.from('brands').select('*').order('name', { ascending: true });
          break;
        case 'tags':
          query = supabase.from('tags').select('*').order('sort_order', { ascending: true });
          break;
        case 'out_of_stock':
          query = supabase.from('products').select('*, brand:brands(name)').eq('stock_status', 'out_of_stock').order('updated_at', { ascending: false });
          break;
      }

      const { data } = await query;
      setModal(m => ({ ...m, data: data || [], loading: false }));
    } catch {
      setModal(m => ({ ...m, loading: false }));
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ... (Header remains same) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-cairo font-bold text-elite-text mb-1 flex items-center gap-3">
             <Activity className="w-8 h-8 text-gold" />
             لوحة التحكم
          </h1>
          <p className="text-elite-muted text-sm font-tajawal">مرحباً بك في مركز الإدارة لمتجر Elite and More تتبع كل شيء من هنا.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-white/50 shadow-soft">
           <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
           </div>
           <div className="pr-1 pl-4">
              <p className="text-[10px] text-elite-muted font-bold leading-none mb-1">حالة النظام</p>
              <p className="text-xs font-black text-green-600 leading-none">متصل ويعمل</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="إجمالي المنتجات" 
          value={stats.products} 
          icon={Package} 
          trend="اضغط للمعاينة"
          onClick={() => openModal('products', 'أحدث المنتجات')}
        />
        <StatsCard 
          title="البرندات المتاحة" 
          value={stats.brands} 
          icon={Layers} 
          color="text-gold" 
          trend="اضغط للمعاينة"
          onClick={() => openModal('brands', 'قائمة البرندات')}
        />
        <StatsCard 
          title="الوسوم المستخدمة" 
          value={stats.tags} 
          icon={Tag} 
          color="text-primary" 
          trend="اضغط للمعاينة"
          onClick={() => openModal('tags', 'قائمة الوسوم')}
        />
        <StatsCard 
          title="منتجات نفدت" 
          value={stats.outOfStock} 
          icon={AlertCircle} 
          color={stats.outOfStock > 0 ? "text-red-500" : "text-green-500"} 
          trend={stats.outOfStock > 0 ? "اضغط للمعاينة" : "كل شيء متوفر"}
          onClick={() => openModal('out_of_stock', 'منتجات نفدت')}
        />
      </div>

      <DashboardListModal 
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        type={modal.type}
        data={modal.data}
        loading={modal.loading}
      />
// ... (rest remains same)
      <div className="grid grid-cols-1 gap-6">
         <div className="bg-white rounded-[32px] p-8 shadow-soft border border-white/50 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-lg font-bold text-elite-text font-cairo">نظرة عامة على المتجر</h3>
                  <p className="text-xs text-elite-muted mt-1">تطور نمو المحتوى الإجمالي في المتجر</p>
               </div>
               <button className="p-2 rounded-xl bg-surface-dim text-elite-muted hover:text-gold transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
               </button>
            </div>
            
            <div className="space-y-6">
               {[
                 { label: 'المنتجات المسجلة', value: stats.products, total: 500, color: 'bg-primary' },
                 { label: 'الماركات المتعاقدة', value: stats.brands, total: 100, color: 'bg-gold' },
                 { label: 'المنتجات النافدة', value: stats.outOfStock, total: stats.products || 1, color: 'bg-red-500' },
               ].map((item, idx) => (
                 <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-end">
                       <span className="text-sm font-bold text-elite-text">{item.label}</span>
                       <span className="text-xs font-black text-elite-muted">{item.value} / {item.total}</span>
                    </div>
                    <div className="h-2 bg-surface-dim rounded-full overflow-hidden">
                       <div 
                         className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                         style={{ width: `${(item.value / item.total) * 100}%` }}
                       />
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors" />
         </div>
      </div>
    </div>
  );
}

