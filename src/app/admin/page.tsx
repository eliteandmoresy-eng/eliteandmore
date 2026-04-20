'use client';

import { useState, useEffect } from 'react';
import { Package, Tag, MapPin, Layers, TrendingUp, Users, ShoppingBag, ArrowUpRight, Activity } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    brands: 0,
    tags: 0,
    governorates: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [products, brands, tags, governorates] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('brands').select('id', { count: 'exact', head: true }),
        supabase.from('tags').select('id', { count: 'exact', head: true }),
        supabase.from('governorates').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        products: products.count || 0,
        brands: brands.count || 0,
        tags: tags.count || 0,
        governorates: governorates.count || 0,
      });
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-cairo font-bold text-elite-text mb-1 flex items-center gap-3">
             <Activity className="w-8 h-8 text-gold" />
             لوحة التحكم
          </h1>
          <p className="text-elite-muted text-sm font-tajawal">مرحباً بك في مركز الإدارة لمتجر Elite and More. تتبع كل شيء من هنا.</p>
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
          trend="+2 جديد هذا الأسبوع"
        />
        <StatsCard 
          title="البرندات المتاحة" 
          value={stats.brands} 
          icon={Layers} 
          color="text-gold" 
          trend="تغطية كاملة"
        />
        <StatsCard 
          title="الوسوم المستخدمة" 
          value={stats.tags} 
          icon={Tag} 
          color="text-primary" 
          trend="نشط"
        />
        <StatsCard 
          title="نقاط التغطية" 
          value={stats.governorates} 
          icon={MapPin} 
          color="text-blue-500" 
          trend="جميع المحافظات"
        />
      </div>

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
                 { label: 'المناطق المغطاة', value: stats.governorates, total: 14, color: 'bg-blue-500' },
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
            
            {/* Abstract Background Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors" />
         </div>
      </div>
    </div>
  );
}

