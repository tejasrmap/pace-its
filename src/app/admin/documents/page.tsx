'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface InstitutionalDoc {
  id: string;
  title: string;
  category: string;
  fileName: string;
  fileSize: string;
  uploadedDate: string;
  academicYear: string;
  downloadCount: number;
  url: string;
}

const INITIAL_DOCS: InstitutionalDoc[] = [
  {
    id: 'DOC-001',
    title: 'AICTE Extension of Approval (EOA) Letter 2024-2025',
    category: 'Accreditation & Approvals',
    fileName: 'AICTE_EOA_Report_2024_25.pdf',
    fileSize: '1.8 MB',
    uploadedDate: '2024-05-12',
    academicYear: '2024-25',
    downloadCount: 1420,
    url: 'https://pace.ac.in/documents/aicte/eoa-2024-25.pdf',
  },
  {
    id: 'DOC-002',
    title: 'B.Tech Academic Regulations (Autonomous PR-23) Curriculum Scheme',
    category: 'Academic Regulations',
    fileName: 'PACE_BTech_PR23_Regulations.pdf',
    fileSize: '3.4 MB',
    uploadedDate: '2023-08-20',
    academicYear: '2023-24',
    downloadCount: 3840,
    url: 'https://pace.ac.in/documents/regulations/pr23-btech.pdf',
  },
  {
    id: 'DOC-003',
    title: 'NAAC Self Study Report (SSR) — Cycle 1 (Grade A)',
    category: 'Accreditation & Approvals',
    fileName: 'NAAC_SSR_PACE_ITS_Cycle1.pdf',
    fileSize: '14.2 MB',
    uploadedDate: '2023-01-15',
    academicYear: '2022-23',
    downloadCount: 890,
    url: 'https://pace.ac.in/documents/naac/ssr-cycle1.pdf',
  },
  {
    id: 'DOC-004',
    title: 'Autonomous Examination Time Table — B.Tech IV Year II Semester Regular/Supply May 2024',
    category: 'Examination Circulars',
    fileName: 'Exam_TimeTable_BTech_4_2_May2024.pdf',
    fileSize: '620 KB',
    uploadedDate: '2024-04-28',
    academicYear: '2023-24',
    downloadCount: 2210,
    url: 'https://pace.ac.in/documents/exams/timetable-4-2-may2024.pdf',
  },
  {
    id: 'DOC-005',
    title: 'Mandatory Disclosure under Rule 4(1)(b) of RTI Act 2005',
    category: 'Statutory Disclosures',
    fileName: 'Mandatory_Disclosure_2024.pdf',
    fileSize: '2.1 MB',
    uploadedDate: '2024-06-01',
    academicYear: '2024-25',
    downloadCount: 540,
    url: 'https://pace.ac.in/documents/statutory/rti-disclosure-2024.pdf',
  },
  {
    id: 'DOC-006',
    title: 'Audited Financial Statements & Balance Sheet FY 2023-2024',
    category: 'Finance & Audit',
    fileName: 'PACE_Audited_Statements_2023_24.pdf',
    fileSize: '4.8 MB',
    uploadedDate: '2024-09-30',
    academicYear: '2023-24',
    downloadCount: 310,
    url: 'https://pace.ac.in/documents/finance/audit-2023-24.pdf',
  },
];

const CATEGORIES = [
  'All Categories',
  'Academic Regulations',
  'Accreditation & Approvals',
  'Examination Circulars',
  'Statutory Disclosures',
  'Finance & Audit',
  'Department Syllabi',
];

export default function AdminDocumentsManager() {
  const [docs, setDocs] = useState<InstitutionalDoc[]>(INITIAL_DOCS);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All Categories');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic Regulations',
    fileName: '',
    academicYear: '2024-25',
    url: '',
  });

  const filtered = useMemo(() => {
    return docs.filter((d) => {
      const matchSearch =
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.fileName.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === 'All Categories' || d.category === catFilter;
      return matchSearch && matchCat;
    });
  }, [docs, search, catFilter]);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Academic Regulations',
      fileName: 'document.pdf',
      academicYear: '2024-25',
      url: 'https://pace.ac.in/documents/general/doc.pdf',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: InstitutionalDoc = {
      id: `DOC-${String(docs.length + 1).padStart(3, '0')}`,
      title: formData.title,
      category: formData.category,
      fileName: formData.fileName,
      fileSize: '1.2 MB',
      uploadedDate: new Date().toISOString().split('T')[0],
      academicYear: formData.academicYear,
      downloadCount: 0,
      url: formData.url,
    };
    setDocs([newDoc, ...docs]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete document entry from repository?')) {
      setDocs(docs.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-amber-50 border-l-4 border-[#E5AD35] p-4 rounded-r-lg flex items-start justify-between shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h4 className="text-sm font-bold text-amber-900">
              Frontend Prototype — Institutional Document Repository (4,608 PDFs)
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Comprehensive PDF document catalog covering AICTE, NAAC, examination timetables, and academic regulations. S3 presigned URL generation and automated PDF OCR indexing will be wired in Phase 4/5.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold bg-[#E5AD35]/20 text-[#073B60] px-2.5 py-1 rounded-full uppercase tracking-wider">
          Phase 4 UI Spec
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#123D5A]">
            Institutional PDF Repository & Document Index
          </h1>
          <p className="text-sm text-slate-500">
            Official government approval letters, academic regulations, examination notifications, and statutory disclosures.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Verifying MD5 integrity of all 4,608 documents...')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
          >
            🛡️ Verify Hashes
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-bold text-white bg-[#123D5A] hover:bg-[#0B2C43] rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>+ Upload Document</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indexed Documents</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">4,608</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">100% audit mapped in Phase 1</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total File Size</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">18.6 GB</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Full institutional archive</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Public Downloads</div>
          <div className="text-2xl font-bold text-[#E5AD35] mt-1">124K+</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Regulations & Exam circulars</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Statutory Compliance</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">100%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">AICTE, UGC, RTI & NAAC</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search document title or filename..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>

        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Document Title & Filename</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Academic Year</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Upload Date</th>
                <th className="py-3 px-4 text-center">Downloads</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-red-500 text-base font-bold">📄</span>
                      <div>
                        <div className="font-bold text-slate-900">{d.title}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{d.fileName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {d.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{d.academicYear}</td>
                  <td className="py-3 px-4 text-slate-600 font-mono">{d.fileSize}</td>
                  <td className="py-3 px-4 text-slate-500">{d.uploadedDate}</td>
                  <td className="py-3 px-4 text-center font-bold text-[#123D5A]">
                    {d.downloadCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 text-slate-600 hover:text-[#123D5A] hover:bg-slate-100 rounded font-semibold transition"
                      >
                        Download ↗
                      </a>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#123D5A]">Upload Institutional Document</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Document Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. B.Tech PR23 Academic Calendar 2024-25"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Categories').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
                <div className="text-2xl mb-1">📄</div>
                <div className="font-bold text-slate-700">Drop PDF document here or click to browse</div>
                <p className="text-[11px] text-slate-400 mt-1">Maximum file size: 50MB (Standard PDF/A format recommended)</p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123D5A] hover:bg-[#0B2C43] text-white font-bold rounded-lg shadow"
                >
                  Upload & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

