'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface AcademicCourse {
  id: string;
  code: string;
  name: string;
  degree: 'B.Tech' | 'M.Tech' | 'MBA' | 'Polytechnic';
  department: string;
  intake: number;
  duration: string;
  regulation: string;
  nbaStatus: 'Accredited' | 'Eligible' | 'Applied' | 'N/A';
  status: 'ACTIVE' | 'ARCHIVED';
}

const INITIAL_COURSES: AcademicCourse[] = [
  {
    id: 'CRS-01',
    code: 'BTECH-CSE',
    name: 'Computer Science and Engineering',
    degree: 'B.Tech',
    department: 'CSE',
    intake: 180,
    duration: '4 Years',
    regulation: 'PR-23 / PR-21',
    nbaStatus: 'Accredited',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-02',
    code: 'BTECH-AIML',
    name: 'Computer Science & Engineering (AI & ML)',
    degree: 'B.Tech',
    department: 'AIML',
    intake: 120,
    duration: '4 Years',
    regulation: 'PR-23 / PR-21',
    nbaStatus: 'Eligible',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-03',
    code: 'BTECH-AIDS',
    name: 'Computer Science & Engineering (AI & Data Science)',
    degree: 'B.Tech',
    department: 'AIDS',
    intake: 60,
    duration: '4 Years',
    regulation: 'PR-23 / PR-21',
    nbaStatus: 'Eligible',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-04',
    code: 'BTECH-ECE',
    name: 'Electronics and Communication Engineering',
    degree: 'B.Tech',
    department: 'ECE',
    intake: 180,
    duration: '4 Years',
    regulation: 'PR-23 / PR-21',
    nbaStatus: 'Accredited',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-05',
    code: 'BTECH-EEE',
    name: 'Electrical and Electronics Engineering',
    degree: 'B.Tech',
    department: 'EEE',
    intake: 60,
    duration: '4 Years',
    regulation: 'PR-23 / PR-21',
    nbaStatus: 'Accredited',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-06',
    code: 'BTECH-MECH',
    name: 'Mechanical Engineering',
    degree: 'B.Tech',
    department: 'Mechanical',
    intake: 60,
    duration: '4 Years',
    regulation: 'PR-23 / PR-21',
    nbaStatus: 'Accredited',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-07',
    code: 'BTECH-CIVIL',
    name: 'Civil Engineering',
    degree: 'B.Tech',
    department: 'Civil',
    intake: 60,
    duration: '4 Years',
    regulation: 'PR-23 / PR-21',
    nbaStatus: 'Accredited',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-08',
    code: 'PG-MBA',
    name: 'Master of Business Administration',
    degree: 'MBA',
    department: 'Management',
    intake: 120,
    duration: '2 Years',
    regulation: 'PR-22',
    nbaStatus: 'N/A',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-09',
    code: 'MTECH-VLSI',
    name: 'M.Tech in VLSI & Embedded Systems',
    degree: 'M.Tech',
    department: 'ECE',
    intake: 18,
    duration: '2 Years',
    regulation: 'PR-22',
    nbaStatus: 'Eligible',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-10',
    code: 'MTECH-CSE',
    name: 'M.Tech in Computer Science and Engineering',
    degree: 'M.Tech',
    department: 'CSE',
    intake: 18,
    duration: '2 Years',
    regulation: 'PR-22',
    nbaStatus: 'Eligible',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-11',
    code: 'POLY-DCE',
    name: 'Diploma in Civil Engineering',
    degree: 'Polytechnic',
    department: 'Civil',
    intake: 60,
    duration: '3 Years',
    regulation: 'C-20',
    nbaStatus: 'N/A',
    status: 'ACTIVE',
  },
  {
    id: 'CRS-12',
    code: 'POLY-DEEE',
    name: 'Diploma in Electrical & Electronics Engineering',
    degree: 'Polytechnic',
    department: 'EEE',
    intake: 60,
    duration: '3 Years',
    regulation: 'C-20',
    nbaStatus: 'N/A',
    status: 'ACTIVE',
  },
];

export default function AdminCoursesManager() {
  const [courses, setCourses] = useState<AcademicCourse[]>(INITIAL_COURSES);
  const [search, setSearch] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<AcademicCourse | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    degree: 'B.Tech' as const,
    department: 'CSE',
    intake: 60,
    duration: '4 Years',
    regulation: 'PR-23',
    nbaStatus: 'Accredited' as const,
    status: 'ACTIVE' as const,
  });

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.department.toLowerCase().includes(search.toLowerCase());
      const matchDegree = degreeFilter === 'ALL' || c.degree === degreeFilter;
      return matchSearch && matchDegree;
    });
  }, [courses, search, degreeFilter]);

  const totalSeats = useMemo(() => courses.reduce((acc, c) => acc + c.intake, 0), [courses]);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({
      code: '',
      name: '',
      degree: 'B.Tech',
      department: 'CSE',
      intake: 60,
      duration: '4 Years',
      regulation: 'PR-23',
      nbaStatus: 'Accredited',
      status: 'ACTIVE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AcademicCourse) => {
    setEditingCourse(item);
    setFormData({
      code: item.code,
      name: item.name,
      degree: item.degree,
      department: item.department,
      intake: item.intake,
      duration: item.duration,
      regulation: item.regulation,
      nbaStatus: item.nbaStatus,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses(courses.map((c) => (c.id === editingCourse.id ? { ...c, ...formData } : c)));
    } else {
      const newCourse: AcademicCourse = {
        id: `CRS-${String(courses.length + 1).padStart(2, '0')}`,
        ...formData,
      };
      setCourses([newCourse, ...courses]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this course from the catalog?')) {
      setCourses(courses.filter((c) => c.id !== id));
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
              Frontend Prototype — Academic Program & Curriculum Management
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Course catalog and AICTE sanctioned intake matrices. Curricula syllabus PDF upload slots and course outcome mapping will be connected in Phase 4/5.
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
            Academic Programs & Intake Catalog
          </h1>
          <p className="text-sm text-slate-500">
            Approved degrees, branch codes, AICTE sanctioned seats, and academic regulations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting AICTE Approval Matrix PDF...')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
          >
            📋 AICTE Matrix PDF
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-bold text-white bg-[#123D5A] hover:bg-[#0B2C43] rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>+ Add Program</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sanctioned Seats</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">{totalSeats}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Across all levels (UG / PG / Poly)</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">B.Tech Intake</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">720</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">7 Autonomous specializations</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">NBA Accredited Programs</div>
          <div className="text-2xl font-bold text-[#E5AD35] mt-1">5 Tier-I</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">CSE, ECE, EEE, MECH, CIVIL</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Regulations</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">PR-23 / PR-21</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Outcome-Based Education (OBE)</div>
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
              placeholder="Search course code or title..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'B.Tech', 'M.Tech', 'MBA', 'Polytechnic'].map((deg) => (
            <button
              key={deg}
              onClick={() => setDegreeFilter(deg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                degreeFilter === deg
                  ? 'bg-[#123D5A] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {deg}
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
                <th className="py-3 px-4">Program Code</th>
                <th className="py-3 px-4">Degree & Branch Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">Sanctioned Intake</th>
                <th className="py-3 px-4">Regulation</th>
                <th className="py-3 px-4">NBA Accreditation</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#123D5A]">{c.code}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[11px] text-slate-500">{c.duration} Full-Time</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">{c.department}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                      {c.intake} seats
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-700">{c.regulation}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.nbaStatus === 'Accredited'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.nbaStatus === 'Eligible'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {c.nbaStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="px-2 py-1 text-slate-600 hover:text-[#123D5A] hover:bg-slate-100 rounded font-medium transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
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
                {editingCourse ? 'Edit Academic Program' : 'Add New Academic Program'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. BTECH-CSE"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree Level *</label>
                  <select
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="Polytechnic">Polytechnic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Computer Science and Engineering"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sanctioned Intake *</label>
                  <input
                    type="number"
                    required
                    value={formData.intake}
                    onChange={(e) => setFormData({ ...formData, intake: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Regulation Code</label>
                  <input
                    type="text"
                    value={formData.regulation}
                    onChange={(e) => setFormData({ ...formData, regulation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NBA Status</label>
                  <select
                    value={formData.nbaStatus}
                    onChange={(e) => setFormData({ ...formData, nbaStatus: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="Accredited">Accredited</option>
                    <option value="Eligible">Eligible</option>
                    <option value="Applied">Applied</option>
                    <option value="N/A">N/A</option>
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
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
