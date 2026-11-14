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
    title: 'AICTE Mandatory Disclosure & Extension of Approval (EOA)',
    category: 'Accreditation & Approvals',
    fileName: 'Mandatory_Disclosure_PACEITS-KQ.pdf',
    fileSize: '2.5 MB',
    uploadedDate: '2024-05-12',
    academicYear: '2024-25',
    downloadCount: 1420,
    url: 'https://pace.ac.in/public/assets/images/Mandatory%20Disclosure%20PACEITS-KQ.pdf',
  },
  {
    id: 'DOC-002',
    title: 'B.Tech Academic Regulations (Autonomous PR-23) Curriculum Scheme',
    category: 'Academic Regulations',
    fileName: 'CSE_R23_Syllabus.pdf',
    fileSize: '3.4 MB',
    uploadedDate: '2023-08-20',
    academicYear: '2023-24',
    downloadCount: 3840,
    url: 'https://pace.ac.in/public/assets/images/syllabus/CSE_R23.pdf',
  },
  {
    id: 'DOC-003',
    title: 'Institutional Rating & Accreditation Certificate — Cycle 1 (Grade A)',
    category: 'Accreditation & Approvals',
    fileName: 'RatingCertificate_Cycle1.pdf',
    fileSize: '1.2 MB',
    uploadedDate: '2023-01-15',
    academicYear: '2022-23',
    downloadCount: 890,
    url: 'https://pace.ac.in/public/assets/images/06.RatingCertificate_2021-22.pdf',
  },
  {
    id: 'DOC-004',
    title: 'Autonomous Examination Time Table — B.Tech II Year I Semester Regular/Supply Dec 2023',
    category: 'Examination Circulars',
    fileName: 'Exam_TimeTable_BTech_Dec2023.pdf',
    fileSize: '620 KB',
    uploadedDate: '2023-11-28',
    academicYear: '2023-24',
    downloadCount: 2210,
    url: 'https://pace.ac.in/public/assets/images/timetabledata/REVISED_II_BTECH_I_SEM_REG_SUPPLE_EXAM_TIMETABLE_DEC_2023.pdf',
  },
  {
    id: 'DOC-005',
    title: 'Right to Information (RTI) Statutory Disclosure Manual',
    category: 'Statutory Disclosures',
    fileName: 'rti-latest.pdf',
    fileSize: '1.8 MB',
    uploadedDate: '2024-06-01',
    academicYear: '2024-25',
    downloadCount: 540,
    url: 'https://pace.ac.in/public/assets/images/rti-latest.pdf',
  },
  {
    id: 'DOC-006',
    title: 'Campus ERP & Institutional Governance Policy Manual',
    category: 'Finance & Audit',
    fileName: 'ERP_Policy.pdf',
    fileSize: '1.4 MB',
    uploadedDate: '2024-04-10',
    academicYear: '2023-24',
    downloadCount: 310,
    url: 'https://pace.ac.in/public/assets/images/policies/ERP_Policy.pdf',
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

