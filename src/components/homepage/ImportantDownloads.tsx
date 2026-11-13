'use client';

import React from 'react';
import { FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

const downloads = [
  {
    title: "Official College Brochure 2026",
    desc: "Complete overview of departments, campus infrastructure, pedagogy, and student life.",
    url: "https://pace.ac.in/public/assets/images/PACE Brochure 2026.pdf",
    category: "Brochure"
  },
  {
    title: "Mandatory Disclosure PACEITS-KQ",
    desc: "Statutory AICTE compliance, approved programs, infrastructure audit, and governance details.",
    url: "https://pace.ac.in/public/assets/images/Mandatory Disclosure PACEITS-KQ.pdf",
    category: "AICTE Mandatory"
  },
  {
    title: "National Institutional Ranking Framework (NIRF 2024)",
    desc: "Official NIRF 2024 data submissions for Engineering and Management disciplines.",
    url: "https://pace.ac.in/public/assets/images/proffessional-bodies/National_Institutional_Ranking_Framework_2024.pdf",
    category: "NIRF Report"
  },
  {
    title: "PACE Student Hand Book",
    desc: "Academic guidelines, code of conduct, grading system, attendance criteria, and campus policies.",
    url: "https://pace.ac.in/public/assets/images/student hand book.pdf",
    category: "Handbook"
  },
  {
    title: "HR Policy Book",
    desc: "Governing rules, service conditions, faculty promotion avenues, and research incentives.",
    url: "https://pace.ac.in/public/assets/images/HR Policy Book.pdf",
    category: "Institutional Policy"
  },
  {
    title: "Right to Information (RTI) Act",
    desc: "Public authority disclosures, appellate officers, and designated RTI coordinators.",
    url: "https://pace.ac.in/public/assets/images/rti-latest.pdf",
    category: "Statutory"
  }
];

export const ImportantDownloads: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5F7F9] border-t border-[#E4E9EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#E9AC21] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E9AC21]" />
              STATUTORY & ACADEMIC REPOSITORY
            </div>
            <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black text-[#052D49] uppercase tracking-tight">
              IMPORTANT DOWNLOADS & DISCLOSURES
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-2">
              Instant access to authentic institutional policy manuals, brochures, accreditations, and regulatory documentation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#E4E9EF] shadow-sm hover:border-[#E9AC21] transition-all hover-card-elevation flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#073B60]/10 text-[#073B60]">
                    {item.category}
                  </span>
                  <FileText className="w-5 h-5 text-[#E9AC21]" />
                </div>

                <h3 className="font-condensed text-lg font-bold text-[#052D49] group-hover:text-[#073B60] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#073B60] group-hover:text-[#E9AC21] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document (PDF)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

