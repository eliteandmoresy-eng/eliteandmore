'use client';
import { useState, useEffect } from 'react';
import { Tag } from '@/types';
import { cn } from '@/lib/utils';

interface TagSelectorProps {
  selectedTagIds: string[];
  onChange: (ids: string[]) => void;
}

export default function TagSelector({ selectedTagIds, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tags')
      .then((r) => r.json())
      .then((d) => { if (d.data) setTags(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id: string) => {
    if (selectedTagIds.includes(id)) {
      onChange(selectedTagIds.filter((t) => t !== id));
    } else {
      onChange([...selectedTagIds, id]);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-surface-dim animate-pulse" />
        ))}
      </div>
    );
  }

  if (tags.length === 0) {
    return <p className="font-tajawal text-sm text-elite-muted">لا توجد تاغات متاحة</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const selected = selectedTagIds.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggle(tag.id)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-tajawal font-medium border-2 transition-all duration-200',
              selected ? 'text-white' : 'bg-transparent'
            )}
            style={
              selected
                ? { backgroundColor: tag.color, borderColor: tag.color }
                : { borderColor: tag.color, color: tag.color }
            }
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}
