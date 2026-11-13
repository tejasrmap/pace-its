'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { BookOpen, Award, Users, CheckCircle, FileText, ChevronRight, GraduationCap } from 'lucide-react';

interface DepartmentTemplateProps {
  page: any;
}

export const DepartmentTemplate: React.FC<DepartmentTemplateProps> = ({ page }) => {
  const tabs = page.tabs && page.tabs.length > 0 ? page.tabs : [{ name: 'Overview', text: page.fullText, tables: page.tables, documents: page.documents }];
  const [activeTabName, setActiveTabName] = useState<string>(tabs[0].name);

  const activeTab = tabs.find((t: any) => t.name === activeTabName) || tabs[0];

  const breadcrumbs = [
    { name: "Academics", href: "/academics/academic-calendar" },
    { name: "Departments", href: "/academics/departments/cse" },
    { name: page.title }
  ];

  return (
    <div className="bg-[#F5F7F9] min-h-screen">
      {/* Department Editorial Hero Banner */}
      <div className="bg-[#052D49] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E9AC21]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9AC21] text-[#052D49] uppercase tracking-wider font-condensed">
              <GraduationCap className="w-3.5 h-3.5" />
              DEPARTMENT OF ACADEMIC EXCELLENCE
            </span>
            <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              {page.title}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light">
              An outcome-based academic department at PACE ITS fostering technical proficiency, industry internships, innovative research, and global placements.
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbs} />

      {/* Main Department Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Department Sidebar Tabs (Matching source department nav-pills) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-4 shadow-sm sticky top-28">
              <h3 className="font-condensed text-base font-bold text-[#052D49] uppercase tracking-wider px-3 pb-3 border-b border-gray-100 flex items-center justify-between">
                <span>Department Navigation</span>
                <span className="text-[11px] text-[#E9AC21] font-bold">
                  {tabs.length} Sections
                </span>
              </h3>

              <div className="mt-3 space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                {tabs.map((tab: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTabName(tab.name)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between font-condensed tracking-wide uppercase ${
                      activeTabName === tab.name
                        ? 'bg-[#073B60] text-white shadow-md'
                        : 'text-gray-700 hover:bg-[#F5F7F9] hover:text-[#073B60]'
                    }`}
                  >
                    <span className="truncate pr-2">{tab.name}</span>
                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${activeTabName === tab.name ? 'text-[#E9AC21]' : 'opacity-40'}`} />
                  </button>
                ))}
              </div>

              {/* Department Quick Links */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                <Link
                  href="/admissions/b-category/apply-online/btech"
                  className="block w-full py-2.5 text-center bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors"
                >
                  APPLY FOR ADMISSION →
                </Link>
                <Link
                  href="/regulations"
                  className="block w-full py-2 text-center border border-[#073B60]/30 hover:border-[#073B60] text-[#073B60] font-condensed font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  ACADEMIC REGULATIONS
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Tab Content, Tables, Documents & Text */}
          <div className="lg:col-span-9 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E9AC21]">
                  ACTIVE SUB-SECTION
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-black text-[#052D49] uppercase tracking-tight">
                  {activeTab.name}
                </h2>
              </div>

              {/* Active Tab Specific Content */}
              {activeTab.text ? (
                <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                  {activeTab.text.split('\n\n').map((para: string, pIdx: number) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              ) : (
                /* Fallback to department full text */
                <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                  {page.fullText ? (
                    page.fullText.split('\n\n').slice(0, 6).map((para: string, pIdx: number) => (
                      <p key={pIdx}>{para}</p>
                    ))
                  ) : (
                    <p>Department technical details, laboratories, faculty, and academic programs.</p>
                  )}
                </div>
              )}

              {/* Tab Specific Tables or Department Global Tables */}
              {((activeTab.tables && activeTab.tables.length > 0) ? activeTab.tables : (activeTab.name === tabs[0].name ? page.tables : []))?.map((table: any, tIdx: number) => (
                <div key={tIdx} className="mt-8">
                  <DataTable
                    headers={table.headers}
                    rows={table.rows}
                    title={table.headers?.[0] || `Department Table ${tIdx + 1}`}
                  />
                </div>
              ))}

              {/* Tab Specific Documents or Department Global Documents */}
              {((activeTab.documents && activeTab.documents.length > 0) ? activeTab.documents : (activeTab.name === tabs[0].name ? page.documents : []))?.length > 0 && (
                <div className="mt-8">
                  <DocumentList
                    documents={(activeTab.documents && activeTab.documents.length > 0) ? activeTab.documents : page.documents}
                    title={`${activeTab.name} Documents & Files`}
                    enableSearch={true}
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
