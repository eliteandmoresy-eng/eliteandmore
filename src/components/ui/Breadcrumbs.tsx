import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn('flex items-center flex-wrap gap-1 text-sm font-tajawal', className)}
      aria-label="breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-1">
            {isLast ? (
              <span className="font-bold text-primary">{item.label}</span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-elite-muted hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-elite-muted">{item.label}</span>
            )}
            {!isLast && (
              <span className="text-elite-muted/50 mx-0.5">/</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
