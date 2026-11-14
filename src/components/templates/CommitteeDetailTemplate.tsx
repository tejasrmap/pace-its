'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { ShieldCheck, Users, FileText, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

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
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Editorial Header */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5AD35_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isStatutory ? "UGC Statutory Governance Body" : "Institutional Committee"}
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            Formed in strict compliance with statutory UGC Autonomous guidelines, AICTE regulations, and state university directives.
          </p>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Committee Structure & Members */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[#E2E8F0] pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E5AD35]">
                    Committee Charter & Objectives
                  </span>
                  <h2 className="font-condensed text-2xl sm:text-3xl font-extrabold text-[#123D5A] uppercase tracking-tight mt-0.5">
                    Composition & Responsibilities
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#123D5A]/10 text-[#123D5A] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* Committee Description & Charter Text */}
              <div className="prose max-w-none text-[#172B3A] text-sm sm:text-base leading-relaxed space-y-4">
                {page.fullText ? (
                  page.fullText.split('\n\n').slice(0, 5).map((para: string, idx: number) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-[#687783]">
                    Official committee composition, tenure, roles, and administrative objectives under PACE ITS governance.
                  </p>
                )}
              </div>

              {/* Preserved Members Table */}
              {page.tables && page.tables.length > 0 && (
                <div className="mt-8 space-y-6 pt-4 border-t border-[#E2E8F0]">
                  <h3 className="font-heading font-bold text-lg text-[#123D5A] uppercase tracking-wide">
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
                <div className="mt-8 pt-4 border-t border-[#E2E8F0]">
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
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-[#123D5A] uppercase tracking-wider pb-3 border-b border-[#E2E8F0]">
                Statutory Bodies
              </h3>
              <ul className="space-y-1">
                {[
                  { name: 'Governing Body', href: '/committees/statutory-committees/governing-body' },
                  { name: 'Academic Council', href: '/committees/statutory-committees/academic-council' },
                  { name: 'Finance Committee', href: '/committees/non-statutory-committees/finance-committee' },
                  { name: 'Board of Studies (BOS)', href: '/committees/statutory-committees/board-of-studies/cse' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs font-semibold text-[#172B3A] hover:text-[#123D5A] flex items-center justify-between p-2 rounded-lg hover:bg-[#F1F4F6] transition-colors"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-bold text-base text-[#123D5A] uppercase tracking-wider pt-4 pb-2 border-b border-[#E2E8F0]">
                Key Non-Statutory Cells
              </h3>
              <ul className="space-y-1">
                {[
                  { name: 'Internal Complaints Committee (ICC)', href: '/committees/non-statutory-committees/internal-complaints-committee' },
                  { name: 'Women Empowerment Cell', href: '/committees/non-statutory-committees/women-empowerment-committee' },
                  { name: 'Anti-Ragging Committee', href: '/committees/non-statutory-committees/anti-ragging-committee' },
                  { name: 'Grievance Redressal Committee', href: '/committees/non-statutory-committees/grievance-redressal-committee' },
                  { name: 'SC/ST Committee', href: '/committees/non-statutory-committees/sc-st-committee' },
                  { name: 'Student Welfare Committee', href: '/committees/non-statutory-committees/student-welfare-committee' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs font-semibold text-[#172B3A] hover:text-[#123D5A] flex items-center justify-between p-2 rounded-lg hover:bg-[#F1F4F6] transition-colors"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
