'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { X, Star, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface UploadedImage {
  url: string;
  is_primary: boolean;
  sort_order: number;
}

interface MultiImageUploaderProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export default function MultiImageUploader({
  images,
  onChange,
  maxImages = 8,
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remaining = maxImages - images.length;
    const toUpload = Array.from(files).slice(0, remaining);

    if (toUpload.length === 0) {
      toast.error(`الحد الأقصى ${maxImages} صور`);
      return;
    }

    setUploading(true);
    const newImages: UploadedImage[] = [];

    for (const file of toUpload) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'products');

      try {
        const res = await fetch('/api/images/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) {
          newImages.push({
            url: data.url,
            is_primary: images.length === 0 && newImages.length === 0,
            sort_order: images.length + newImages.length,
          });
        }
      } catch {
        toast.error('فشل رفع الصورة');
      }
    }

    onChange([...images, ...newImages]);
    setUploading(false);
  };

  const removeImage = async (index: number) => {
    const url = images[index].url;
    const wasPrimary = images[index].is_primary;
    const updated = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, sort_order: i }));

    if (wasPrimary && updated.length > 0) {
      updated[0].is_primary = true;
    }

    onChange(updated);

    try {
      await fetch('/api/images/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
    } catch {
      // state already updated
    }
  };

  const setPrimary = (index: number) => {
    const updated = images.map((img, i) => ({ ...img, is_primary: i === index }));
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div
              key={img.url}
              className={cn(
                'relative aspect-square rounded-xl overflow-hidden border-2 transition-colors',
                img.is_primary ? 'border-gold' : 'border-elite-border'
              )}
            >
              <Image src={img.url} alt="" fill className="object-cover" sizes="120px" />

              {img.is_primary && (
                <span className="absolute top-1 start-1 bg-gold text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-tajawal">
                  رئيسية
                </span>
              )}

              <div className="absolute top-1 end-1 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
                {!img.is_primary && (
                  <button
                    type="button"
                    onClick={() => setPrimary(i)}
                    className="w-6 h-6 rounded-full bg-gold text-white flex items-center justify-center hover:bg-gold-dark transition-colors"
                    title="تعيين كصورة رئيسية"
                  >
                    <Star className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add more button */}
          {images.length < maxImages && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="aspect-square rounded-xl border-2 border-dashed border-elite-border flex items-center justify-center hover:border-primary hover:bg-surface-dim transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              ) : (
                <Plus className="w-6 h-6 text-elite-muted" />
              )}
            </button>
          )}
        </div>
      )}

      {images.length === 0 && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-elite-border rounded-xl p-8 flex flex-col items-center gap-2 hover:border-primary hover:bg-surface-dim transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          ) : (
            <>
              <Plus className="w-8 h-8 text-elite-muted" />
              <p className="font-tajawal text-sm text-elite-muted">اضغط لإضافة صور</p>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
