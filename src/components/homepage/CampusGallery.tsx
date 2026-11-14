'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, ArrowRight, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

export const CampusGallery: React.FC = () => {
  const galleryItems = [
    {
      title: 'Institutional Auditorium & Convocations',
      category: 'Campus Facilities',
      date: 'Central Auditorium',
      image: '/assets/campus/auditorium.jpg',
      link: '/campus/auditorium',
    },
    {
      title: 'Advanced Computer & Programming Labs',
      category: 'Academic Infrastructure',
      date: 'CSE Department',
      image: '/assets/campus/cse_lab.jpg',
      link: '/academics/departments/cse',
    },
    {
      title: 'Campus Dining & Student Canteen',
      category: 'Student Amenities',
      date: 'Student Canteen',
      image: '/assets/campus/canteen.jpg',
      link: '/campus/facilities',
    },
    {
      title: 'Institutional Fleet & Transport Logistics',
      category: 'Campus Services',
      date: 'Transport Fleet',
      image: '/assets/campus/transport.jpg',
      link: '/campus/facilities',
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
