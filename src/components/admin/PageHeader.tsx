import Link from 'next/link';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  addHref?: string;
  addLabel?: string;
}

export default function PageHeader({ title, addHref, addLabel }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {addHref && (
        <Link href={addHref} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {addLabel || 'إضافة جديد'}
        </Link>
      )}
    </div>
  );
}
