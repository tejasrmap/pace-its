'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { Building, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface InstitutionalTemplateProps {
  page: any;
}

export const InstitutionalTemplate: React.FC<InstitutionalTemplateProps> = ({ page }) => {
  const breadcrumbs = [
    { name: page.section || "Institution", href: `/${page.canonicalPath.split('/')[1]}` },
    { name: page.title }
  ];

  return (
    <div className="bg-[#F5F7F9] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#052D49] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E9AC21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9AC21] text-[#052D49] uppercase tracking-wider font-condensed">
            <Building className="w-3.5 h-3.5" />
            {page.section || "PACE ITS INSTITUTIONAL"}
          </span>
          <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light">
            PACE Institute of Technology & Sciences — Autonomous Institution under Srinivasa Educational Society.
          </p>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 sm:p-8 shadow-sm">
              <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                {page.fullText ? (
                  page.fullText.split('\n\n').map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>Detailed institutional records and disclosures preserved for {page.title}.</p>
                )}
              </div>

              {/* Preserved Data Tables */}
              {page.tables && page.tables.length > 0 && (
                <div className="mt-8 space-y-6">
                  {page.tables.map((table: any, idx: number) => (
                    <DataTable
                      key={idx}
                      headers={table.headers}
                      rows={table.rows}
                      title={`Institutional Table ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Downloadable Documents */}
              {page.documents && page.documents.length > 0 && (
                <DocumentList
                  documents={page.documents}
                  title="Related Documents & Disclosures"
                  enableSearch={true}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 shadow-sm space-y-4">
              <h3 className="font-condensed text-lg font-bold text-[#052D49] uppercase tracking-wider pb-3 border-b border-gray-100">
                Institutional Quick Links
              </h3>
              <ul className="space-y-2 text-xs font-semibold text-[#073B60]">
                <li>
                  <Link href="/pace-at-glance" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>PACE at a Glance</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/vision-and-mission" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Vision & Mission</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/affiliation-and-accreditation" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Accreditations</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/organization-chart" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Organization Chart</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-[#073B60] text-white rounded-2xl p-6 shadow-md border border-[#0A4A78] space-y-3">
              <span className="text-[10px] font-bold text-[#E9AC21] uppercase tracking-wider">
                ADMISSION DESK
              </span>
              <h4 className="font-condensed text-xl font-bold uppercase">Enroll for 2026–27</h4>
              <p className="text-xs text-gray-300">Category-B and Management seats available across top branches.</p>
              <Link
                href="/admissions/b-category/apply-online/btech"
                className="inline-block w-full py-2.5 text-center bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                APPLY ONLINE NOW →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

