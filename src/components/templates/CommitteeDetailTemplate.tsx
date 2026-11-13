'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { ShieldCheck, Users, FileText, ArrowRight } from 'lucide-react';

interface CommitteeDetailTemplateProps {
  page: any;
}

export const CommitteeDetailTemplate: React.FC<CommitteeDetailTemplateProps> = ({ page }) => {
  const isStatutory = page.canonicalPath.includes('statutory');

  const breadcrumbs = [
    { name: "Committees", href: "/committees/statutory-committees/governing-body" },
    { name: isStatutory ? "Statutory Committees" : "Non-Statutory Committees" },
    { name: page.title }
  ];

  return (
    <div className="bg-[#F5F7F9] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#052D49] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E9AC21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9AC21] text-[#052D49] uppercase tracking-wider font-condensed">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isStatutory ? "UGC STATUTORY GOVERNANCE BODY" : "INSTITUTIONAL NON-STATUTORY COMMITTEE"}
          </span>
          <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light">
            Formed in strict compliance with statutory UGC Autonomous guidelines, AICTE regulations, and state university directives.
          </p>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Committee Structure & Members */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-gray-100 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E9AC21]">
                    COMMITTEE CHARTER & OBJECTIVES
                  </span>
                  <h2 className="font-condensed text-2xl sm:text-3xl font-black text-[#052D49] uppercase tracking-tight">
                    Composition & Responsibilities
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#073B60]/10 text-[#073B60] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* Committee Description & Charter Text */}
              <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                {page.fullText ? (
                  page.fullText.split('\n\n').slice(0, 5).map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>Official committee composition, tenure, roles, and administrative objectives.</p>
                )}
              </div>

              {/* Preserved Members Table (Extracted from source) */}
              {page.tables && page.tables.length > 0 && (
                <div className="mt-8 space-y-6">
                  <h3 className="font-condensed text-xl font-bold text-[#052D49] uppercase tracking-wide border-b border-gray-100 pb-2">
                    Committee Composition & Members List
                  </h3>
                  {page.tables.map((table: any, idx: number) => (
                    <DataTable
                      key={idx}
                      headers={table.headers}
                      rows={table.rows}
                      title={`Members Roster ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Committee Meeting Minutes & Circulars */}
              {page.documents && page.documents.length > 0 && (
                <div className="mt-8">
                  <DocumentList
                    documents={page.documents}
                    title="Meeting Minutes & Resolutions"
                    enableSearch={true}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 shadow-sm space-y-4">
              <h3 className="font-condensed text-lg font-bold text-[#052D49] uppercase tracking-wider pb-3 border-b border-gray-100">
                Statutory Bodies
              </h3>
              <ul className="space-y-1.5 text-xs font-semibold text-[#073B60]">
                <li>
                  <Link href="/committees/statutory-committees/governing-body" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Governing Body</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/committees/statutory-committees/academic-council" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Academic Council</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/committees/non-statutory-committees/finance-committee" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Finance Committee</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/committees/statutory-committees/board-of-studies/cse" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Board of Studies (BOS)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
              </ul>

              <h3 className="font-condensed text-lg font-bold text-[#052D49] uppercase tracking-wider pt-4 pb-2 border-b border-gray-100">
                Key Non-Statutory Cells
              </h3>
              <ul className="space-y-1.5 text-xs font-semibold text-[#073B60]">
                <li>
                  <Link href="/committees/non-statutory-committees/internal-complaints-committee" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Internal Complaints Committee (ICC)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/committees/non-statutory-committees/women-empowerment-committee" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Women Empowerment Cell</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/committees/non-statutory-committees/anti-ragging-committee" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Anti-Ragging Committee</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/committees/non-statutory-committees/grievance-redressal-committee" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Grievance Redressal Committee</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

