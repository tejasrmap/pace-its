'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

export const CampusGallery: React.FC = () => {
  const galleryItems = [
    {
      title: 'Annual Day Celebrations & Cultural Fest',
      category: 'Campus Life',
      date: 'March 2024',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      link: '/display-events-gallery/119',
    },
    {
      title: 'International Conference on Smart Technologies',
      category: 'Research & Academics',
      date: 'January 2024',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      link: '/display-events-gallery/130',
    },
    {
      title: 'State Level Sports Meet & Athletic Championship',
      category: 'Sports & Athletics',
      date: 'February 2024',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      link: '/display-events-gallery/151',
    },
    {
      title: 'AICTE IDEA Lab Hands-on Innovation Workshop',
      category: 'Innovation',
      date: 'November 2023',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      link: '/display-events-gallery/165',
    },
  ];

  return (
    <section className="py-20 bg-[#F1F4F6] border-b border-[#E2E8F0]">
      <Container>
        <SectionHeading
          eyebrow="Campus Life & Events"
          title="Moments of Excellence & Student Life"
          description="A glimpse into technical symposiums, cultural celebrations, sports championships, and research conclaves across PACE ITS campus."
          align="center"
          action={
            <Link
              href="/college-events"
              className="text-xs font-bold text-[#123D5A] hover:text-[#E5AD35] flex items-center gap-1 transition"
            >
              <span>View All 204 Event Archives</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold bg-[#E5AD35] text-[#0B2C43] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-white/90">
                  <Calendar className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="font-heading font-bold text-sm text-[#123D5A] group-hover:text-[#E5AD35] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#687783] group-hover:text-[#123D5A]">
                  <span className="font-semibold">Explore Photo Archive</span>
                  <Camera className="w-4 h-4 text-[#E5AD35]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
