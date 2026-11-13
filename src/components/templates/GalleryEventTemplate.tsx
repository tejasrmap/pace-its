'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Camera, Calendar, ArrowLeft, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryEventTemplateProps {
  page: any;
}

export const GalleryEventTemplate: React.FC<GalleryEventTemplateProps> = ({ page }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = page.images || [];

  const breadcrumbs = [
    { name: "Campus Life", href: "/campus/gallery" },
    { name: "Events Gallery", href: "/college-events" },
    { name: page.title }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#052D49] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E9AC21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <Link
            href="/college-events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E9AC21] uppercase tracking-wider hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Events</span>
          </Link>
          <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {page.title}
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-[#E9AC21]" />
              <span>{images.length} High-Resolution Photographs</span>
            </span>
            <span>•</span>
            <span className="bg-[#073B60] px-2.5 py-0.5 rounded text-[#E9AC21] font-semibold">
              Official Campus Event Archive
            </span>
          </div>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {images.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E4E9EF] p-12 text-center text-gray-500">
            <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-condensed text-xl font-bold text-[#052D49] uppercase">Photographs Loading</h3>
            <p className="text-xs text-gray-400 mt-1">Images are preserved in the institutional media repository.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img: any, idx: number) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className="group relative bg-[#073B60] rounded-2xl overflow-hidden shadow-md cursor-pointer aspect-[4/3] border-2 border-transparent hover:border-[#E9AC21] transition-all hover:-translate-y-1"
              >
                <img
                  src={img.src}
                  alt={img.alt || page.title}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to campus placeholder
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <span className="font-medium truncate pr-2">{img.alt || `Photo ${idx + 1}`}</span>
                    <Maximize2 className="w-4 h-4 text-[#E9AC21] flex-shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Image Viewer Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-[#E9AC21] hover:text-[#052D49] text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt || page.title}
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-sm text-gray-300">
              <span className="font-semibold text-white">{page.title}</span> — Photo {selectedImage + 1} of {images.length}
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-[#E9AC21] hover:text-[#052D49] text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

