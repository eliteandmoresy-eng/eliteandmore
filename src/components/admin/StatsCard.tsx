import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: string;
  change?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = 'text-primary',
  trend,
  change,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-[28px] border border-white/50 shadow-soft p-5 md:p-6 hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <div className={cn('p-3 rounded-2xl bg-surface-dim group-hover:bg-primary/5 transition-colors', color)}>
             <Icon className="w-6 h-6" />
           </div>
           {change && (
              <span className={cn(
                'text-[10px] font-black px-2 py-1 rounded-lg bg-surface-dim',
                change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              )}>
                {change}
              </span>
           )}
        </div>
        
        <div className="min-w-0">
          <p className="text-[11px] md:text-xs text-elite-muted font-bold font-tajawal truncate uppercase tracking-widest leading-none mb-2">{title}</p>
          <div className="flex items-baseline gap-1">
             <p className="text-2xl md:text-3xl font-black font-cairo text-elite-text">{value}</p>
          </div>
          
          {(trend || change) && (
            <div className="mt-3 flex items-center gap-1.5 opacity-60">
               <div className="w-1 h-1 rounded-full bg-lite-gold" />
               <p className="text-[9px] md:text-[10px] font-bold text-elite-muted font-tajawal truncate leading-none">
                 {trend || (change && (change.startsWith('+') ? 'زيادة عن الشهر الماضي' : 'انخفاض عن الشهر الماضي'))}
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

