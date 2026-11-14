'use client';

import React from 'react';
import { FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

const downloads = [
  {
    title: "Official College Brochure 2026",
    desc: "Comprehensive overview of engineering departments, campus infrastructure, pedagogy, and student life.",
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
    <section className="py-20 bg-slate-50 border-t border-slate-200 font-sans">
      <Container>
        <SectionHeading
          eyebrow="Statutory & Academic Repository"
          title="Important Institutional Downloads & Disclosures"
          description="Instant access to verified institutional policy manuals, brochures, accreditations, and regulatory filings."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {downloads.map((d, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#E5AD35]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {d.category}
                  </span>
                  <FileText className="w-4 h-4 text-[#E5AD35]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#123D5A] group-hover:text-[#0B2C43] transition">
                  {d.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {d.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">PDF Document</span>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123D5A] hover:text-[#E5AD35] transition"
                >
                  <span>Download</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
