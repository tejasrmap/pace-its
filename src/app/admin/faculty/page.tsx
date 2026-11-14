'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  specialization: string;
  email: string;
  phone: string;
  publications: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'PROBATION';
}

const INITIAL_FACULTY: FacultyMember[] = [
  {
    id: 'FAC-001',
    name: 'Dr. C. V. Subba Rao',
    designation: 'Professor & Principal',
    department: 'Civil Engineering',
    qualification: 'Ph.D., M.Tech (Structures)',
    experience: '24 Years',
    specialization: 'Structural Dynamics & Concrete Technology',
    email: 'principal@pace.ac.in',
    phone: '+91 95814 56310',
    publications: 38,
    status: 'ACTIVE',
  },
  {
    id: 'FAC-002',
    name: 'Dr. M. Sreenivasan',
    designation: 'Professor & HOD',
    department: 'Computer Science and Engineering',
    qualification: 'Ph.D., M.Tech (CSE)',
    experience: '18 Years',
    specialization: 'Cloud Computing, Distributed Systems',
    email: 'hod.cse@pace.ac.in',
    phone: '+91 95814 56311',
    publications: 26,
    status: 'ACTIVE',
  },
  {
    id: 'FAC-003',
    name: 'Dr. K. Venkateswarlu',
    designation: 'Professor & Dean R&D',
    department: 'Electronics & Communication',
    qualification: 'Ph.D., M.E.',
    experience: '21 Years',
    specialization: 'VLSI Architectures, Embedded Systems',
    email: 'dean.rd@pace.ac.in',
    phone: '+91 95814 56312',
    publications: 42,
    status: 'ACTIVE',
  },
  {
    id: 'FAC-004',
    name: 'Dr. T. Rama Rao',
    designation: 'Professor & HOD',
    department: 'Electrical & Electronics',
    qualification: 'Ph.D., M.Tech',
    experience: '19 Years',
    specialization: 'Smart Grids & Renewable Energy',
    email: 'hod.eee@pace.ac.in',
    phone: '+91 95814 56314',
    publications: 19,
    status: 'ACTIVE',
  },
  {
    id: 'FAC-005',
    name: 'Dr. G. Suresh Babu',
    designation: 'Professor & HOD',
    department: 'Mechanical Engineering',
    qualification: 'Ph.D., M.Tech',
    experience: '20 Years',
    specialization: 'Thermal Engineering & CFD Analysis',
    email: 'hod.mech@pace.ac.in',
    phone: '+91 95814 56315',
    publications: 31,
    status: 'ACTIVE',
  },
  {
    id: 'FAC-006',
    name: 'Dr. P. Mallikarjuna Rao',
    designation: 'Associate Professor',
    department: 'AI & Machine Learning',
    qualification: 'Ph.D., M.Tech',
    experience: '12 Years',
    specialization: 'Deep Learning & Natural Language Processing',
    email: 'p.mallik@pace.ac.in',
    phone: '+91 95814 56316',
    publications: 14,
    status: 'ACTIVE',
  },
  {
    id: 'FAC-007',
    name: 'Smt. D. Nagalakshmi',
    designation: 'Assistant Professor',
    department: 'Computer Science and Engineering',
    qualification: 'M.Tech, (Ph.D.)',
    experience: '8 Years',
    specialization: 'Information Security & Blockchain',
    email: 'd.nagalakshmi@pace.ac.in',
    phone: '+91 95814 56317',
    publications: 7,
    status: 'ACTIVE',
  },
  {
    id: 'FAC-008',
    name: 'Dr. B. V. Ramanjaneyulu',
    designation: 'Professor & HOD',
    department: 'Management Studies (MBA)',
    qualification: 'Ph.D., MBA',
    experience: '17 Years',
    specialization: 'Financial Econometrics & Strategic Management',
    email: 'hod.mba@pace.ac.in',
    phone: '+91 95814 56318',
    publications: 22,
    status: 'ACTIVE',
  },
];

const DEPARTMENTS = [
  'All Departments',
  'Civil Engineering',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Electronics & Communication',
  'Computer Science and Engineering',
  'AI & Machine Learning',
  'AI & Data Science',
  'Information Technology',
  'Management Studies (MBA)',
  'Science & Humanities',
];

export default function AdminFacultyManager() {
  const [faculty, setFaculty] = useState<FacultyMember[]>(INITIAL_FACULTY);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FacultyMember | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    designation: string;
    department: string;
    qualification: string;
    experience: string;
    specialization: string;
    email: string;
    phone: string;
    publications: number;
    status: FacultyMember['status'];
  }>({
    name: '',
    designation: 'Assistant Professor',
    department: 'Computer Science and Engineering',
    qualification: 'M.Tech',
    experience: '5 Years',
    specialization: '',
    email: '',
    phone: '',
    publications: 0,
    status: 'ACTIVE',
  });

  const filtered = useMemo(() => {
    return faculty.filter((f) => {
      const matchSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.specialization.toLowerCase().includes(search.toLowerCase()) ||
        f.qualification.toLowerCase().includes(search.toLowerCase()) ||
        f.email.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === 'All Departments' || f.department === deptFilter;
      const matchStatus = statusFilter === 'ALL' || f.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [faculty, search, deptFilter, statusFilter]);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      designation: 'Assistant Professor',
      department: 'Computer Science and Engineering',
      qualification: 'M.Tech',
      experience: '5 Years',
      specialization: '',
      email: '',
      phone: '',
      publications: 0,
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FacultyMember) => {
    setEditingMember(item);
    setFormData({
      name: item.name,
      designation: item.designation,
      department: item.department,
      qualification: item.qualification,
      experience: item.experience,
      specialization: item.specialization,
      email: item.email,
      phone: item.phone,
      publications: item.publications,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setFaculty(faculty.map((f) => (f.id === editingMember.id ? { ...f, ...formData } : f)));
    } else {
      const newMember: FacultyMember = {
        id: `FAC-${String(faculty.length + 1).padStart(3, '0')}`,
        ...formData,
      };
      setFaculty([newMember, ...faculty]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this faculty record?')) {
      setFaculty(faculty.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Prototype Notice Banner */}
      <div className="bg-amber-50 border-l-4 border-[#E5AD35] p-4 rounded-r-lg flex items-start justify-between shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h4 className="text-sm font-bold text-amber-900">
              Frontend Prototype — Faculty Management Subsystem
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              This module displays interactive client-side state. Backend database persistence and full JNTUK faculty ledger integration will be connected in Phase 4/5.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold bg-[#E5AD35]/20 text-[#073B60] px-2.5 py-1 rounded-full uppercase tracking-wider">
          Phase 4 UI Spec
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#123D5A]">
            Faculty & Academic Staff Directory
          </h1>
          <p className="text-sm text-slate-500">
            Manage institutional teaching faculty profiles, academic credentials, and departmental affiliations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting Faculty Registry as Excel/CSV...')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
          >
            📥 Export CSV
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-bold text-white bg-[#123D5A] hover:bg-[#0B2C43] rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>+ Add New Faculty</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Teaching Staff</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">{faculty.length + 240}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">100% AICTE Cadre Ratio Compliant</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ph.D. Qualified</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">68</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">28% of total faculty body</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Research Publications</div>
          <div className="text-2xl font-bold text-[#E5AD35] mt-1">480+</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Scopus & Web of Science Indexed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Academic Depts</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">13</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">10 B.Tech + 3 PG Programmes</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialization, email..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20 focus:border-[#123D5A]"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="ON_LEAVE">On Leave</option>
            <option value="PROBATION">Probation</option>
          </select>

          {(search || deptFilter !== 'All Departments' || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('');
                setDeptFilter('All Departments');
                setStatusFilter('ALL');
              }}
              className="px-3 py-2 text-xs text-slate-600 hover:text-slate-900 underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Faculty Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Department & Cadre</th>
                <th className="py-3 px-4">Qualification & Exp</th>
                <th className="py-3 px-4">Research Specialization</th>
                <th className="py-3 px-4 text-center">Papers</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="text-3xl mb-2">🔍</div>
                    <div className="font-semibold text-slate-600 text-sm">No faculty members found</div>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or department filter</p>
                  </td>
                </tr>
              ) : (
                filtered.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#123D5A] text-amber-300 font-bold flex items-center justify-center shrink-0">
                          {f.name.charAt(f.name.startsWith('Dr.') ? 4 : 0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{f.name}</div>
                          <div className="text-[11px] text-slate-500">{f.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{f.designation}</div>
                      <div className="text-[11px] text-slate-500">{f.department}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{f.qualification}</div>
                      <div className="text-[11px] text-slate-500">{f.experience} experience</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <span className="text-slate-700 truncate block" title={f.specialization}>
                        {f.specialization}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                        {f.publications}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          f.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : f.status === 'ON_LEAVE'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(f)}
                          className="px-2 py-1 text-slate-600 hover:text-[#123D5A] hover:bg-slate-100 rounded font-medium transition"
                          title="Edit Profile"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(f.id)}
                          className="px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded font-medium transition"
                          title="Delete Record"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>Showing {filtered.length} of {faculty.length} faculty members</div>
          <div className="flex gap-1">
            <button disabled className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-2.5 py-1 bg-[#123D5A] text-white rounded font-bold">1</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700">2</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#123D5A]">
                {editingMember ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name with Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. K. Ramesh Babu"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                  >
                    {DEPARTMENTS.filter((d) => d !== 'All Departments').map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                  >
                    <option value="Professor & Principal">Professor & Principal</option>
                    <option value="Professor & HOD">Professor & HOD</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Adjunct Faculty">Adjunct Faculty</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Highest Qualification *</label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="Ph.D., M.Tech"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 10 Years"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@pace.ac.in"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publications Count</label>
                  <input
                    type="number"
                    value={formData.publications}
                    onChange={(e) => setFormData({ ...formData, publications: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specialization & Research Areas</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="e.g. Machine Learning, Computer Vision, Signal Processing"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123D5A] hover:bg-[#0B2C43] text-white font-bold rounded-lg shadow"
                >
                  {editingMember ? 'Update Profile' : 'Add to Directory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

