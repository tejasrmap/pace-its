'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface ResearchRecord {
  id: string;
  title: string;
  investigator: string;
  department: string;
  type: 'PATENT' | 'FUNDED_PROJECT' | 'JOURNAL_PAPER' | 'CONSULTANCY';
  fundingAgencyOrJournal: string;
  sanctionedAmount: string;
  year: string;
  status: 'GRANTED' | 'PUBLISHED' | 'ONGOING' | 'COMPLETED';
}

const INITIAL_RECORDS: ResearchRecord[] = [
  {
    id: 'RES-001',
    title: 'Smart Agricultural IoT Framework for Precision Irrigation in Arid Zones',
    investigator: 'Dr. M. Sreenivasan & Dr. K. Venkateswarlu',
    department: 'CSE / ECE',
    type: 'PATENT',
    fundingAgencyOrJournal: 'Indian Patent Office (CBR-2023)',
    sanctionedAmount: 'N/A',
    year: '2023',
    status: 'PUBLISHED',
  },
  {
    id: 'RES-002',
    title: 'AICTE-MODROBS Modernization of VLSI Embedded Systems Laboratory',
    investigator: 'Dr. K. Venkateswarlu (PI)',
    department: 'ECE',
    type: 'FUNDED_PROJECT',
    fundingAgencyOrJournal: 'AICTE New Delhi (MODROBS Scheme)',
    sanctionedAmount: '₹14,50,000',
    year: '2022-24',
    status: 'COMPLETED',
  },
  {
    id: 'RES-003',
    title: 'Experimental Investigation on High-Performance Geopolymer Concrete Utilizing Industrial Slag',
    investigator: 'Dr. C. V. Subba Rao',
    department: 'Civil Engineering',
    type: 'JOURNAL_PAPER',
    fundingAgencyOrJournal: 'Elsevier Construction and Building Materials (SCI Q1)',
    sanctionedAmount: 'N/A',
    year: '2024',
    status: 'PUBLISHED',
  },
  {
    id: 'RES-004',
    title: 'Deep Learning Assisted Non-Invasive Diabetic Retinopathy Diagnostic Suite',
    investigator: 'Dr. P. Mallikarjuna Rao',
    department: 'AI & Machine Learning',
    type: 'PATENT',
    fundingAgencyOrJournal: 'Indian Patent Office (Application #202441012345)',
    sanctionedAmount: 'N/A',
    year: '2024',
    status: 'PUBLISHED',
  },
  {
    id: 'RES-005',
    title: 'Design and Optimization of Micro-Wind Turbine Blade Profiles for Low Wind Speed Regimes',
    investigator: 'Dr. G. Suresh Babu',
    department: 'Mechanical Engineering',
    type: 'FUNDED_PROJECT',
    fundingAgencyOrJournal: 'DST-SERB Core Research Grant',
    sanctionedAmount: '₹28,80,000',
    year: '2023-26',
    status: 'ONGOING',
  },
  {
    id: 'RES-006',
    title: 'Structural Stability and Geotechnical Soil Testing for Ongole Municipality Flyover',
    investigator: 'Department Consultancy Cell',
    department: 'Civil Engineering',
    type: 'CONSULTANCY',
    fundingAgencyOrJournal: 'Municipal Corporation of Ongole',
    sanctionedAmount: '₹6,40,000',
    year: '2023-24',
    status: 'COMPLETED',
  },
];

export default function AdminResearchManager() {
  const [records, setRecords] = useState<ResearchRecord[]>(INITIAL_RECORDS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ResearchRecord | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    investigator: '',
    department: 'CSE',
    type: 'PATENT' as const,
    fundingAgencyOrJournal: '',
    sanctionedAmount: 'N/A',
    year: '2024',
    status: 'PUBLISHED' as const,
  });

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.investigator.toLowerCase().includes(search.toLowerCase()) ||
        r.fundingAgencyOrJournal.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'ALL' || r.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [records, search, typeFilter]);

  const handleOpenAdd = () => {
    setEditingRecord(null);
    setFormData({
      title: '',
      investigator: '',
      department: 'CSE',
      type: 'PATENT',
      fundingAgencyOrJournal: '',
      sanctionedAmount: 'N/A',
      year: '2024',
      status: 'PUBLISHED',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ResearchRecord) => {
    setEditingRecord(item);
    setFormData({
      title: item.title,
      investigator: item.investigator,
      department: item.department,
      type: item.type,
      fundingAgencyOrJournal: item.fundingAgencyOrJournal,
      sanctionedAmount: item.sanctionedAmount,
      year: item.year,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      setRecords(records.map((r) => (r.id === editingRecord.id ? { ...r, ...formData } : r)));
    } else {
      const newRec: ResearchRecord = {
        id: `RES-${String(records.length + 1).padStart(3, '0')}`,
        ...formData,
      };
      setRecords([newRec, ...records]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete research record?')) {
      setRecords(records.filter((r) => r.id !== id));
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
              Frontend Prototype — Research & Development (R&D) Ledger
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Patents, sponsored project grants, and indexed journal papers. DOI resolver and research sanction letter uploads will be wired in Phase 4/5.
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
            Research, Patents & Sponsored Grants
          </h1>
          <p className="text-sm text-slate-500">
            Institutional intellectual property, external government funding, and peer-reviewed scientific contributions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting R&D Annual Dossier PDF...')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
          >
            📑 R&D Dossier PDF
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-bold text-white bg-[#123D5A] hover:bg-[#0B2C43] rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>+ Add Research Entry</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patents Published</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">32</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">4 Granted by Patent Office India</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">External Grant Funding</div>
          <div className="text-2xl font-bold text-[#E5AD35] mt-1">₹1.42 Cr</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">AICTE, DST-SERB & MSME</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indexed Publications</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">480+</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Scopus / Web of Science (SCI)</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Industry MoUs</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">28</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Active collaborative centers</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, investigator, agency..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'PATENT', 'FUNDED_PROJECT', 'JOURNAL_PAPER', 'CONSULTANCY'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                typeFilter === t
                  ? 'bg-[#123D5A] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t === 'ALL'
                ? 'All Entries'
                : t === 'PATENT'
                ? 'Patents'
                : t === 'FUNDED_PROJECT'
                ? 'Grants'
                : t === 'JOURNAL_PAPER'
                ? 'Papers'
                : 'Consultancy'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Research Title / Intellectual Property</th>
                <th className="py-3 px-4">Principal Investigator & Dept</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Agency / Journal</th>
                <th className="py-3 px-4">Sanction / Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 max-w-sm">
                    <div className="font-bold text-slate-900 leading-snug">{r.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">{r.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{r.investigator}</div>
                    <div className="text-[11px] text-slate-500">{r.department}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {r.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{r.fundingAgencyOrJournal}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#123D5A]">{r.sanctionedAmount}</div>
                    <div className="text-[11px] text-slate-500">{r.year}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'GRANTED' || r.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : r.status === 'ONGOING'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="px-2 py-1 text-slate-600 hover:text-[#123D5A] hover:bg-slate-100 rounded font-medium transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded font-medium transition"
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
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#123D5A]">
                {editingRecord ? 'Edit Research Record' : 'Add Research Entry'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project / Paper / Patent Title *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lead Investigator / Authors *</label>
                  <input
                    type="text"
                    required
                    value={formData.investigator}
                    onChange={(e) => setFormData({ ...formData, investigator: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="PATENT">Patent</option>
                    <option value="FUNDED_PROJECT">Funded Project</option>
                    <option value="JOURNAL_PAPER">Journal Paper</option>
                    <option value="CONSULTANCY">Consultancy</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Agency or Journal</label>
                  <input
                    type="text"
                    value={formData.fundingAgencyOrJournal}
                    onChange={(e) => setFormData({ ...formData, fundingAgencyOrJournal: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sanctioned Amount</label>
                  <input
                    type="text"
                    value={formData.sanctionedAmount}
                    onChange={(e) => setFormData({ ...formData, sanctionedAmount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="GRANTED">Granted</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
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
                  {editingRecord ? 'Update Entry' : 'Create Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
