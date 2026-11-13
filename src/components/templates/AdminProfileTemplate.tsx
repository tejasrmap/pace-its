'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { UserCheck, Mail, Phone, Award, Quote, ArrowRight } from 'lucide-react';

interface AdminProfileTemplateProps {
  page: any;
}

export const AdminProfileTemplate: React.FC<AdminProfileTemplateProps> = ({ page }) => {
  const breadcrumbs = [
    { name: "Administration", href: "/administration/chairman-message" },
    { name: page.title }
  ];

  return (
    <div className="bg-[#F5F7F9] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#052D49] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E9AC21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9AC21] text-[#052D49] uppercase tracking-wider font-condensed">
            <UserCheck className="w-3.5 h-3.5" />
            INSTITUTIONAL LEADERSHIP
          </span>
          <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light">
            Guiding PACE Institute of Technology & Sciences towards academic distinction, ethical leadership, and innovation.
          </p>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Message Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 sm:p-10 shadow-sm relative">
              <Quote className="w-16 h-16 text-[#E9AC21]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E9AC21]">
                  OFFICIAL COMMUNICATION
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-black text-[#052D49] uppercase tracking-tight">
                  {page.title}
                </h2>
              </div>

              {/* Message paragraphs */}
              <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                {page.fullText ? (
                  page.fullText.split('\n\n').map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>Preserving official executive communication and biography for {page.title}.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Administration Directory */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 shadow-sm space-y-4">
              <h3 className="font-condensed text-lg font-bold text-[#052D49] uppercase tracking-wider pb-3 border-b border-gray-100">
                Administration Directory
              </h3>
              <ul className="space-y-1.5 text-xs font-semibold text-[#073B60]">
                <li>
                  <Link href="/administration/chairman-message" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Chairman's Message</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/administration/vice-president-message" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Vice President's Message</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/administration/secretary-message" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Secretary's Message</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/administration/principal-profile" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Principal's Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/administration/cao" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Chief Administrative Officer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/administration/deans-and-directors" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Deans & Directors</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/administration/hrmanager" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>HR Manager</span>
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

