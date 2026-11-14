'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Camera, Calendar, ArrowLeft, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

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
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5AD35_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container className="relative z-10 space-y-3">
          <Link
            href="/college-events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5AD35] uppercase tracking-wider hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Event Galleries</span>
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {page.title}
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-[#E5AD35]" />
              <span>{images.length} Verified Photographs</span>
            </span>
            <span>•</span>
            <span className="bg-[#123D5A] px-2.5 py-0.5 rounded text-[#E5AD35] font-semibold">
              Official Campus Event Archive
            </span>
          </div>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        {images.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center text-slate-500">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-xl text-[#123D5A] uppercase">Photographs Loading</h3>
            <p className="text-xs text-[#687783] mt-1">Images are preserved in the institutional media repository.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img: any, idx: number) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className="group relative bg-[#123D5A] rounded-2xl overflow-hidden shadow-md cursor-pointer aspect-[4/3] border-2 border-transparent hover:border-[#E5AD35] transition-all hover:-translate-y-1"
              >
                <img
                  src={img.src}
                  alt={img.alt || page.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs font-semibold">
                    <span className="truncate pr-2">Photo {idx + 1} of {images.length}</span>
                    <Maximize2 className="w-4 h-4 text-[#E5AD35] flex-shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Lightbox Modal */}
      {selectedImage !== null && images[selectedImage] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt || page.title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white text-xs space-y-1">
              <div className="font-bold text-sm text-[#E5AD35]">{page.title}</div>
              <div className="text-slate-400">
                Image {selectedImage + 1} of {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
