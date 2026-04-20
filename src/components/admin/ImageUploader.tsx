'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  folder?: string;
  className?: string;
}

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
  folder = 'products',
  className,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (files: File[]) => {
      if (images.length + files.length > maxImages) {
        toast.error(`الحد الأقصى ${maxImages} صور`);
        return;
      }

      setUploading(true);
      const newImages: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
          const res = await fetch('/api/images/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          if (data.url) newImages.push(data.url);
        } catch {
          toast.error('فشل رفع الصورة');
        }
      }

      onImagesChange([...images, ...newImages]);
      setUploading(false);
    },
    [images, maxImages, folder, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: maxImages - images.length,
    disabled: uploading,
  });

  const removeImage = async (url: string) => {
    onImagesChange(images.filter((img) => img !== url));
    try {
      await fetch('/api/images/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
    } catch {
      // Image already removed from state
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Preview */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div
              key={i}
              className="relative w-24 h-24 rounded-xl overflow-hidden border border-elite-border"
            >
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropzone */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-elite-border hover:border-primary/50 hover:bg-cream/50'
          } ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
          ) : (
            <>
              <Upload className="w-8 h-8 mx-auto text-elite-muted mb-2" />
              <p className="text-sm text-elite-muted font-tajawal">
                اسحب الصور هنا أو اضغط للاختيار
              </p>
              <p className="text-xs text-elite-muted/60 font-tajawal mt-1">
                JPG, PNG, WebP — حتى {maxImages} صور
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
