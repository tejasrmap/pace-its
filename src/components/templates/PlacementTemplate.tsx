'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { Briefcase, TrendingUp, Building2, CheckCircle, Award, ArrowRight } from 'lucide-react';

interface PlacementTemplateProps {
  page: any;
}

export const PlacementTemplate: React.FC<PlacementTemplateProps> = ({ page }) => {
  const [selectedTable, setSelectedTable] = useState<number>(0);

  const tables = page.tables || [];

  const breadcrumbs = [
    { name: "Training & Placements", href: "/trainings-and-placements" },
    { name: page.title }
  ];

  return (
    <div className="bg-[#F5F7F9] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#052D49] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E9AC21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9AC21] text-[#052D49] uppercase tracking-wider font-condensed">
            <TrendingUp className="w-3.5 h-3.5" />
            TRAINING & PLACEMENT CELL
          </span>
          <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light">
            Empowering students with pre-placement corporate readiness, coding skills, and top-tier job opportunities across leading multinationals.
          </p>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Records Section */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E9AC21]">
                  VERIFIED PLACEMENT DATA
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-black text-[#052D49] uppercase tracking-tight">
                  Year-Wise & Department-Wise Selection Records
                </h2>
              </div>

              {/* Table Selector Tabs */}
              {tables.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tables.map((tbl: any, idx: number) => {
                    const label = tbl.headers?.[0] || `Placement Table ${idx + 1}`;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTable(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider font-condensed transition-all ${
                          selectedTable === idx
                            ? 'bg-[#073B60] text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {label.length > 30 ? label.slice(0, 30) + '...' : label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Active Selected Table */}
              {tables[selectedTable] && (
                <DataTable
                  headers={tables[selectedTable].headers}
                  rows={tables[selectedTable].rows}
                  title={tables[selectedTable].headers?.[0] || `Placement Report ${selectedTable + 1}`}
                />
              )}

              {/* All other tables stacked */}
              {tables.length > 1 && (
                <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
                  <h3 className="font-condensed text-xl font-bold text-[#052D49] uppercase tracking-wide">
                    Additional Placement Archives ({tables.length} Total Tables)
                  </h3>
                  {tables.map((tbl: any, idx: number) => {
                    if (idx === selectedTable) return null;
                    return (
                      <DataTable
                        key={idx}
                        headers={tbl.headers}
                        rows={tbl.rows}
                        title={`Placement Archive ${idx + 1}: ${tbl.headers?.[0] || 'Selection Statistics'}`}
                      />
                    );
                  })}
                </div>
              )}

              {/* Documents & Downloadable Reports */}
              {page.documents && page.documents.length > 0 && (
                <div className="mt-8">
                  <DocumentList
                    documents={page.documents}
                    title="Official Placement Reports & Brochures"
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
                Placements Navigation
              </h3>
              <ul className="space-y-1.5 text-xs font-semibold text-[#073B60]">
                <li>
                  <Link href="/trainings-and-placements" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Training & Placements Overview</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/placements-records" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 font-bold transition-colors">
                    <span>Placement Records Archive</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/skill-development" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Skill Development Wing</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/career-guidance-cell" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Career Guidance Cell</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/tpo" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>From The Desk of TPO</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-[#052D49] text-white rounded-2xl p-6 shadow-md border border-[#0A4A78] space-y-3">
              <span className="text-[10px] font-bold text-[#E9AC21] uppercase tracking-wider">
                CORPORATE RELATIONS
              </span>
              <h4 className="font-condensed text-xl font-bold uppercase">Recruit from PACE ITS</h4>
              <p className="text-xs text-gray-300">Invite our placement cell to schedule on-campus or virtual recruitment drives.</p>
              <Link
                href="/contact-us"
                className="inline-block w-full py-2.5 text-center bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                CONTACT TPO DESK →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

