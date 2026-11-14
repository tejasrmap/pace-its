'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { Building, ShieldCheck, ArrowRight, Award } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface InstitutionalTemplateProps {
  page: any;
}

export const InstitutionalTemplate: React.FC<InstitutionalTemplateProps> = ({ page }) => {
  const breadcrumbs = [
    { name: page.section || "Institution", href: `/${page.canonicalPath.split('/')[1]}` },
    { name: page.title }
  ];

  const quickLinks = [
    { title: "PACE at a Glance", href: "/pace-at-glance" },
    { title: "Vision & Mission", href: "/vision-and-mission" },
    { title: "Affiliation & Accreditation", href: "/affiliation-and-accreditation" },
    { title: "Organization Chart", href: "/organization-chart" },
    { title: "Awards & Accolades", href: "/awards-and-accolades" },
    { title: "Why PACE ITS", href: "/why-pace" },
    { title: "Admissions Procedure", href: "/admissions/admission-procedure" },
    { title: "Contact Us", href: "/contact-us" },
  ];

  const paragraphs = page.fullText
    ? page.fullText.split('\n\n').filter((p: string) => p.trim().length > 15)
    : [];

  return (
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Editorial Header */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <Container className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            {page.section || "PACE ITS Institutional"}
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            PACE Institute of Technology & Sciences — Autonomous Institution under Srinivasa Educational Society.
          </p>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-[#E2E8F0] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5AD35]">
                  Official Institutional Document
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-extrabold text-[#123D5A] uppercase tracking-tight mt-0.5">
                  {page.title}
                </h2>
              </div>

              <div className="prose max-w-none text-[#172B3A] text-sm sm:text-base leading-relaxed space-y-4">
                {paragraphs.length > 0 ? (
                  paragraphs.map((para: string, idx: number) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-[#687783]">
                    Detailed institutional records, statutory declarations, and governance frameworks of PACE Institute of Technology & Sciences.
                  </p>
                )}
              </div>

              {/* Data Tables */}
              {page.tables && page.tables.length > 0 && (
                <div className="mt-8 space-y-6 pt-4 border-t border-[#E2E8F0]">
                  {page.tables.map((table: any, idx: number) => (
                    <DataTable
                      key={idx}
                      headers={table.headers}
                      rows={table.rows}
                      title={`${page.title} — Schedule Table ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Downloadable Documents */}
              {page.documents && page.documents.length > 0 && (
                <div className="mt-8 pt-4 border-t border-[#E2E8F0]">
                  <DocumentList
                    documents={page.documents}
                    title="Related Documents & Disclosures"
                    enableSearch={true}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-[#123D5A] uppercase tracking-wider pb-3 border-b border-[#E2E8F0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5AD35]" />
                Institutional Links
              </h3>
              <ul className="space-y-1">
                {quickLinks.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-xs font-semibold text-[#172B3A] hover:text-[#123D5A] flex items-center justify-between p-2 rounded-lg hover:bg-[#F1F4F6] transition-colors"
                    >
                      <span>{item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accreditation Badge Widget */}
            <div className="bg-[#123D5A] rounded-2xl p-6 text-white shadow-md border border-[#E5AD35]/30 space-y-3">
              <span className="text-[10px] font-bold bg-[#E5AD35] text-[#0B2C43] px-2.5 py-0.5 rounded-full uppercase">
                Accreditation
              </span>
              <h4 className="font-heading font-bold text-lg text-white uppercase">
                NAAC 'A' Grade
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                PACE Institute of Technology & Sciences is accredited by the National Assessment and Accreditation Council (NAAC) with 'A' Grade (Cycle-1) and recognized as an Autonomous Institution by UGC.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
