'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { Building2, Compass, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface CampusFacilityTemplateProps {
  page: {
    canonicalPath: string;
    title: string;
    section: string;
    category?: string;
    fullText?: string;
    tables?: Array<{ headers: string[]; rows: string[][] }>;
    documents?: Array<{ title: string; url: string; academicYear?: string; extension?: string }>;
    breadcrumbs?: string[];
  };
}

export const CampusFacilityTemplate: React.FC<CampusFacilityTemplateProps> = ({ page }) => {
  const breadcrumbs = [
    { name: "Campus Life", href: "/campus/facilities" },
    { name: page.title }
  ];

  const campusLinks = [
    { title: "Campus Facilities Overview", href: "/campus/facilities" },
    { title: "Auditorium & Seminar Halls", href: "/campus/auditorium" },
    { title: "Student Hostels & Dining", href: "/campus/hostel" },
    { title: "Sports, Games & Gymnasium", href: "/campus/sports-and-games" },
    { title: "National Service Scheme (NSS)", href: "/campus/national-service-scheme" },
    { title: "National Cadet Corps (NCC)", href: "/campus/ncc" },
    { title: "Social Responsibility (ISR)", href: "/campus/isr" },
    { title: "Press & Media Coverage", href: "/campus/press-and-media" },
    { title: "Campus Photo Gallery", href: "/campus/gallery" },
    { title: "Institutional Careers", href: "/careers" },
  ];

  const paragraphs = page.fullText
    ? page.fullText.split('\n\n').filter(p => p.trim().length > 15)
    : [];

  return (
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Editorial Header Banner */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5AD35_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Campus & Infrastructure
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            Spanning over 110+ acres along NH-16 Ongole, PACE ITS offers a world-class academic environment, digital classrooms, advanced laboratories, and vibrant student amenities.
          </p>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview / Introduction Block */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-[#E2E8F0] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5AD35]">
                  Infrastructure & Amenities
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-extrabold text-[#123D5A] uppercase tracking-tight mt-0.5">
                  {page.title}
                </h2>
              </div>

              {paragraphs.length > 0 ? (
                <div className="prose max-w-none text-[#172B3A] text-sm sm:text-base leading-relaxed space-y-4">
                  {paragraphs.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-[#687783] py-4">
                  Official facilities, guidelines, and amenities regarding {page.title} at PACE Institute of Technology & Sciences.
                </div>
              )}
            </div>

            {/* Tables if available */}
            {page.tables && page.tables.length > 0 && (
              <div className="space-y-6">
                {page.tables.map((table, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm overflow-hidden">
                    <DataTable
                      headers={table.headers}
                      rows={table.rows}
                      title={`${page.title} — Specifications`}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Downloads if available */}
            {page.documents && page.documents.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-[#123D5A] text-lg uppercase border-b border-[#E2E8F0] pb-3">
                  Downloads & Circulars
                </h3>
                <DocumentList documents={page.documents} />
              </div>
            )}
          </div>

          {/* Right Navigation Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#123D5A] uppercase tracking-wider border-b border-[#E2E8F0] pb-3 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5AD35]" />
                Campus Facilities
              </h3>
              <nav className="space-y-1">
                {campusLinks.map((link) => {
                  const isActive = page.canonicalPath === link.href;
                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-[#123D5A] text-white shadow-sm font-bold'
                          : 'text-[#172B3A] hover:bg-[#F1F4F6] hover:text-[#123D5A]'
                      }`}
                    >
                      <span className="truncate pr-2">{link.title}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5AD35]' : 'text-slate-400'}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Campus Virtual Tour / Visit Card */}
            <div className="bg-gradient-to-br from-[#123D5A] to-[#0B2C43] rounded-2xl p-6 text-white shadow-md border border-[#E5AD35]/30 space-y-3">
              <span className="text-[10px] font-bold bg-[#E5AD35] text-[#0B2C43] px-2.5 py-0.5 rounded-full uppercase">
                Visit Us
              </span>
              <h4 className="font-heading font-bold text-lg text-white uppercase">
                Campus Location
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Located on National Highway 16, just 8 km from Ongole railway station and bus complex. Direct institutional bus connectivity across Prakasam District.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5AD35] hover:text-[#F6C54A] pt-2"
              >
                <span>Get Directions & Transport Routes</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

