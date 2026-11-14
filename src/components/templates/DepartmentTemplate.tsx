'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { BookOpen, Award, Users, CheckCircle, FileText, ChevronRight, GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface DepartmentTemplateProps {
  page: any;
}

export const DepartmentTemplate: React.FC<DepartmentTemplateProps> = ({ page }) => {
  const tabs =
    page.tabs && page.tabs.length > 0
      ? page.tabs
      : [{ name: 'Overview', text: page.fullText, tables: page.tables, documents: page.documents }];
  const [activeTabName, setActiveTabName] = useState<string>(tabs[0].name);

  const activeTab = tabs.find((t: any) => t.name === activeTabName) || tabs[0];

  const isPolytechnic = page.canonicalPath.includes('polytechnic');

  const breadcrumbs = [
    { name: "Academics", href: "/academics/academic-calendar" },
    {
      name: isPolytechnic ? "Polytechnic / Diploma" : "Departments",
      href: isPolytechnic ? "/academics/departments/polytechnic/cme" : "/academics/departments/cse",
    },
    { name: page.title },
  ];

  return (
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Department Editorial Hero Banner */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        <Container className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            {isPolytechnic ? 'SBTET Accredited Diploma Section' : 'UGC Autonomous & NBA Accredited Department'}
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            An outcome-based academic discipline at PACE ITS fostering rigorous technical mastery, hands-on laboratory experimentation, and industry internships.
          </p>
        </Container>
      </div>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbs} />

      {/* Main Department Layout */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Department Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm sticky top-28">
              <h3 className="font-condensed text-base font-bold text-[#123D5A] uppercase tracking-wider px-3 pb-3 border-b border-[#E2E8F0] flex items-center justify-between">
                <span>Department Sections</span>
                <span className="text-[11px] text-[#E5AD35] font-bold">
                  {tabs.length} Tabs
                </span>
              </h3>

              <div className="mt-3 space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                {tabs.map((tab: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTabName(tab.name)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between font-condensed tracking-wide uppercase ${
                      activeTabName === tab.name
                        ? 'bg-[#123D5A] text-white shadow-md'
                        : 'text-slate-700 hover:bg-[#F1F4F6] hover:text-[#123D5A]'
                    }`}
                  >
                    <span className="truncate pr-2">{tab.name}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        activeTabName === tab.name ? 'text-[#E5AD35]' : 'opacity-40'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Department Quick Actions */}
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] space-y-2">
                <Link
                  href="/admissions/b-category/apply-online/btech"
                  className="block w-full py-2.5 text-center bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-condensed font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors"
                >
                  Apply For Admission →
                </Link>
                <Link
                  href="/regulations"
                  className="block w-full py-2 text-center border border-[#123D5A]/30 hover:border-[#123D5A] text-[#123D5A] font-condensed font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Academic Regulations
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Tab Content, Tables, Documents & Text */}
          <div className="lg:col-span-9 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[#E2E8F0] pb-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5AD35]">
                  Active Tab View
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-black text-[#123D5A] uppercase tracking-tight">
                  {activeTab.name}
                </h2>
              </div>

              {/* Active Tab Specific Content */}
              {activeTab.text ? (
                <div className="prose max-w-none text-[#172B3A] text-sm sm:text-base leading-relaxed space-y-4">
                  {activeTab.text.split('\n\n').map((para: string, pIdx: number) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              ) : (
                <div className="prose max-w-none text-[#172B3A] text-sm sm:text-base leading-relaxed space-y-4">
                  {page.fullText ? (
                    page.fullText
                      .split('\n\n')
                      .slice(0, 6)
                      .map((para: string, pIdx: number) => <p key={pIdx}>{para}</p>)
                  ) : (
                    <p className="text-[#687783]">
                      Department academic curricula, syllabus regulations, laboratories, and faculty information.
                    </p>
                  )}
                </div>
              )}

              {/* Tab Specific Tables or Department Global Tables */}
              {((activeTab.tables && activeTab.tables.length > 0)
                ? activeTab.tables
                : activeTab.name === tabs[0].name
                ? page.tables
                : []
              )?.map((table: any, tIdx: number) => (
                <div key={tIdx} className="mt-8">
                  <DataTable
                    headers={table.headers}
                    rows={table.rows}
                    title={table.headers?.[0] || `${activeTab.name} — Data Table ${tIdx + 1}`}
                  />
                </div>
              ))}

              {/* Tab Specific Documents or Department Global Documents */}
              {((activeTab.documents && activeTab.documents.length > 0)
                ? activeTab.documents
                : activeTab.name === tabs[0].name
                ? page.documents
                : []
              )?.length > 0 && (
                <div className="mt-8">
                  <DocumentList
                    documents={
                      activeTab.documents && activeTab.documents.length > 0
                        ? activeTab.documents
                        : page.documents
                    }
                    title={`${activeTab.name} Documents & Files`}
                    enableSearch={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
