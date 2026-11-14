'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface PlacementDrive {
  id: string;
  companyName: string;
  driveDate: string;
  academicYear: string;
  ctcOffered: string;
  offersCount: number;
  departmentsEligible: string[];
  status: 'COMPLETED' | 'SCHEDULED' | 'IN_PROGRESS';
  tier: 'Marquee / Super Dream' | 'Dream' | 'Standard';
}

const INITIAL_DRIVES: PlacementDrive[] = [
  {
    id: 'PL-001',
    companyName: 'Tata Consultancy Services (TCS)',
    driveDate: '2024-11-20',
    academicYear: '2024-25',
    ctcOffered: '₹3.6 - ₹7.0 LPA',
    offersCount: 142,
    departmentsEligible: ['CSE', 'ECE', 'EEE', 'IT', 'MECH'],
    status: 'COMPLETED',
    tier: 'Standard',
  },
  {
    id: 'PL-002',
    companyName: 'Cognizant Technology Solutions',
    driveDate: '2024-12-05',
    academicYear: '2024-25',
    ctcOffered: '₹4.0 - ₹6.5 LPA',
    offersCount: 98,
    departmentsEligible: ['CSE', 'ECE', 'AIML', 'AIDS'],
    status: 'COMPLETED',
    tier: 'Standard',
  },
  {
    id: 'PL-003',
    companyName: 'Virtusa Consulting Services',
    driveDate: '2025-01-14',
    academicYear: '2024-25',
    ctcOffered: '₹5.5 - ₹8.0 LPA',
    offersCount: 34,
    departmentsEligible: ['CSE', 'ECE', 'AIML'],
    status: 'COMPLETED',
    tier: 'Dream',
  },
  {
    id: 'PL-004',
    companyName: 'Hexaware Technologies',
    driveDate: '2025-02-02',
    academicYear: '2024-25',
    ctcOffered: '₹4.0 - ₹6.0 LPA',
    offersCount: 46,
    departmentsEligible: ['All B.Tech Branches'],
    status: 'COMPLETED',
    tier: 'Standard',
  },
  {
    id: 'PL-005',
    companyName: 'Accenture Solutions',
    driveDate: '2025-02-18',
    academicYear: '2024-25',
    ctcOffered: '₹4.5 - ₹6.5 LPA',
    offersCount: 82,
    departmentsEligible: ['CSE', 'ECE', 'EEE', 'AIML', 'AIDS'],
    status: 'COMPLETED',
    tier: 'Standard',
  },
  {
    id: 'PL-006',
    companyName: 'Efftronics Systems Pvt Ltd',
    driveDate: '2025-03-10',
    academicYear: '2024-25',
    ctcOffered: '₹5.0 - ₹7.2 LPA',
    offersCount: 18,
    departmentsEligible: ['ECE', 'EEE', 'CSE'],
    status: 'COMPLETED',
    tier: 'Dream',
  },
  {
    id: 'PL-007',
    companyName: 'Hyundai Mobis / Kia Motors',
    driveDate: '2025-04-05',
    academicYear: '2024-25',
    ctcOffered: '₹5.2 - ₹6.8 LPA',
    offersCount: 22,
    departmentsEligible: ['Mechanical', 'EEE'],
    status: 'COMPLETED',
    tier: 'Dream',
  },
  {
    id: 'PL-008',
    companyName: 'Tech Mahindra Ltd',
    driveDate: '2025-04-20',
    academicYear: '2024-25',
    ctcOffered: '₹3.8 - ₹5.5 LPA',
    offersCount: 54,
    departmentsEligible: ['All Engineering Branches'],
    status: 'COMPLETED',
    tier: 'Standard',
  },
];

export default function AdminPlacementsManager() {
  const [drives, setDrives] = useState<PlacementDrive[]>(INITIAL_DRIVES);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('2024-25');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDrive, setEditingDrive] = useState<PlacementDrive | null>(null);

  const [formData, setFormData] = useState<{
    companyName: string;
    driveDate: string;
    academicYear: string;
    ctcOffered: string;
    offersCount: number;
    departmentsEligible: string;
    status: PlacementDrive['status'];
    tier: PlacementDrive['tier'];
  }>({
    companyName: '',
    driveDate: '',
    academicYear: '2024-25',
    ctcOffered: '₹4.5 LPA',
    offersCount: 10,
    departmentsEligible: 'CSE, ECE, EEE',
    status: 'COMPLETED',
    tier: 'Standard',
  });

  const filtered = useMemo(() => {
    return drives.filter((d) => {
      const matchSearch = d.companyName.toLowerCase().includes(search.toLowerCase());
      const matchYear = yearFilter === 'ALL' || d.academicYear === yearFilter;
      return matchSearch && matchYear;
    });
  }, [drives, search, yearFilter]);

  const totalOffers = useMemo(() => filtered.reduce((acc, d) => acc + d.offersCount, 0), [filtered]);

  const handleOpenAdd = () => {
    setEditingDrive(null);
    setFormData({
      companyName: '',
      driveDate: new Date().toISOString().split('T')[0],
      academicYear: '2024-25',
      ctcOffered: '₹4.5 LPA',
      offersCount: 15,
      departmentsEligible: 'CSE, ECE',
      status: 'SCHEDULED',
      tier: 'Standard',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PlacementDrive) => {
    setEditingDrive(item);
    setFormData({
      companyName: item.companyName,
      driveDate: item.driveDate,
      academicYear: item.academicYear,
      ctcOffered: item.ctcOffered,
      offersCount: item.offersCount,
      departmentsEligible: item.departmentsEligible.join(', '),
      status: item.status,
      tier: item.tier,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDrive) {
      setDrives(
        drives.map((d) =>
          d.id === editingDrive.id
            ? {
                ...d,
                ...formData,
                departmentsEligible: formData.departmentsEligible.split(',').map((s) => s.trim()),
              }
            : d
        )
      );
    } else {
      const newDrive: PlacementDrive = {
        id: `PL-${String(drives.length + 1).padStart(3, '0')}`,
        companyName: formData.companyName,
        driveDate: formData.driveDate,
        academicYear: formData.academicYear,
        ctcOffered: formData.ctcOffered,
        offersCount: formData.offersCount,
        departmentsEligible: formData.departmentsEligible.split(',').map((s) => s.trim()),
        status: formData.status,
        tier: formData.tier,
      };
      setDrives([newDrive, ...drives]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this placement drive record?')) {
      setDrives(drives.filter((d) => d.id !== id));
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
              Frontend Prototype — Training & Placement Cell Management
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Placement drives and recruitment statistics. Student offer letter document uploads and CTC verification workflows will be wired in Phase 4/5.
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
            Campus Placement Drives & Statistics
          </h1>
          <p className="text-sm text-slate-500">
            Corporate recruitment drives, student job offers, salary packages, and company partnerships.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting Placement Annual Report PDF...')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
          >
            📊 Annual Report PDF
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-bold text-white bg-[#123D5A] hover:bg-[#0B2C43] rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>+ Add Placement Drive</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Placement Drives</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">{drives.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Drives scheduled & completed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Offers Recorded</div>
          <div className="text-2xl font-bold text-[#E5AD35] mt-1">{totalOffers}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Batch selections listed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Drives</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">
            {drives.filter(d => d.status === 'COMPLETED').length}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Recruitment rounds completed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled Drives</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">
            {drives.filter(d => d.status === 'SCHEDULED').length}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Upcoming campus sessions</div>
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
              placeholder="Search recruiting company..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['2024-25', '2023-24', '2022-23', 'ALL'].map((yr) => (
            <button
              key={yr}
              onClick={() => setYearFilter(yr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                yearFilter === yr
                  ? 'bg-[#123D5A] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {yr === 'ALL' ? 'All Batches' : yr}
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
                <th className="py-3 px-4">Recruiting Enterprise</th>
                <th className="py-3 px-4">Drive Date & Batch</th>
                <th className="py-3 px-4">Package Offered (CTC)</th>
                <th className="py-3 px-4 text-center">Selected Students</th>
                <th className="py-3 px-4">Eligible Branches</th>
                <th className="py-3 px-4">Drive Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{d.companyName}</div>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold inline-block mt-0.5">
                      {d.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{d.driveDate}</div>
                    <div className="text-[11px] text-slate-500">AY {d.academicYear}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#123D5A]">{d.ctcOffered}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                      {d.offersCount} offers
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <span className="text-slate-600 truncate block">
                      {d.departmentsEligible.join(', ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : d.status === 'IN_PROGRESS'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(d)}
                        className="px-2 py-1 text-slate-600 hover:text-[#123D5A] hover:bg-slate-100 rounded font-medium transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(d.id)}
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
                {editingDrive ? 'Edit Placement Drive' : 'Schedule New Placement Drive'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Wipro Technologies"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Drive Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.driveDate}
                    onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Year</label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="2025-26">2025-26</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">CTC Offered</label>
                  <input
                    type="text"
                    value={formData.ctcOffered}
                    onChange={(e) => setFormData({ ...formData, ctcOffered: e.target.value })}
                    placeholder="₹5.0 LPA"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offers Count</label>
                  <input
                    type="number"
                    value={formData.offersCount}
                    onChange={(e) => setFormData({ ...formData, offersCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Eligible Branches (comma-separated)</label>
                <input
                  type="text"
                  value={formData.departmentsEligible}
                  onChange={(e) => setFormData({ ...formData, departmentsEligible: e.target.value })}
                  placeholder="CSE, ECE, EEE, MECH"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
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
                  {editingDrive ? 'Update Record' : 'Save Drive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

