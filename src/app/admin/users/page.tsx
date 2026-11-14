'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'SUPER_ADMIN' | 'PRINCIPAL' | 'DEAN' | 'HOD' | 'ADMISSION_OFFICER' | 'CONTENT_EDITOR';
  status: 'ACTIVE' | 'SUSPENDED';
  twoFactorEnabled: boolean;
  lastLogin: string;
}

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'USR-001',
    name: 'Administrator',
    email: 'admin@pace.ac.in',
    department: 'Central Administration',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    twoFactorEnabled: true,
    lastLogin: 'Today, 05:14 AM',
  },
  {
    id: 'USR-002',
    name: 'Dr. C. V. Subba Rao',
    email: 'principal@pace.ac.in',
    department: 'Principal Office',
    role: 'PRINCIPAL',
    status: 'ACTIVE',
    twoFactorEnabled: true,
    lastLogin: 'Yesterday, 04:30 PM',
  },
  {
    id: 'USR-003',
    name: 'Admissions Cell Convener',
    email: 'admissions@pace.ac.in',
    department: 'Admissions Bureau',
    role: 'ADMISSION_OFFICER',
    status: 'ACTIVE',
    twoFactorEnabled: false,
    lastLogin: '12 Nov 2026, 11:15 AM',
  },
  {
    id: 'USR-004',
    name: 'Dr. M. Sreenivasan',
    email: 'hod.cse@pace.ac.in',
    department: 'Computer Science and Engineering',
    role: 'HOD',
    status: 'ACTIVE',
    twoFactorEnabled: false,
    lastLogin: '10 Nov 2026, 09:20 AM',
  },
  {
    id: 'USR-005',
    name: 'Website Content Editor',
    email: 'editor@pace.ac.in',
    department: 'Media & Public Relations',
    role: 'CONTENT_EDITOR',
    status: 'ACTIVE',
    twoFactorEnabled: false,
    lastLogin: '13 Nov 2026, 02:45 PM',
  },
];

export default function AdminUsersManager() {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Computer Science and Engineering',
    role: 'HOD' as const,
  });

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      department: 'Computer Science and Engineering',
      role: 'HOD',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserAccount = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      department: formData.department,
      role: formData.role,
      status: 'ACTIVE',
      twoFactorEnabled: false,
      lastLogin: 'Never logged in',
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u
      )
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-amber-50 border-l-4 border-[#E5AD35] p-4 rounded-r-lg flex items-start justify-between shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h4 className="text-sm font-bold text-amber-900">
              Frontend Prototype — RBAC User Governance & Security Administration
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Role assignments, session controls, and granular permission matrices. Multi-Factor Authentication (MFA) SMS/TOTP enrollment and audit log binding will be wired in Phase 4/5.
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
            User Accounts & Role-Based Access Control
          </h1>
          <p className="text-sm text-slate-500">
            Institutional credentials, privilege boundaries, and access rights across administrative and departmental levels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Sending password reset notifications to suspended accounts...')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
          >
            🔑 Security Audit
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-bold text-white bg-[#123D5A] hover:bg-[#0B2C43] rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>+ Invite User</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Staff Users</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">{users.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Authorized institutional emails</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role Cadres</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">6 Roles</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Strict privilege partitioning</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Two-Factor Authentication</div>
          <div className="text-2xl font-bold text-[#E5AD35] mt-1">Enforced</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Mandatory for Super Admin</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Security State</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">Optimal</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Zero unauthorized breaches</div>
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
              placeholder="Search user name or email..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'SUPER_ADMIN', 'PRINCIPAL', 'HOD', 'ADMISSION_OFFICER', 'CONTENT_EDITOR'].map(
            (r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  roleFilter === r
                    ? 'bg-[#123D5A] text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r === 'ALL'
                  ? 'All Roles'
                  : r === 'SUPER_ADMIN'
                  ? 'Super Admin'
                  : r === 'ADMISSION_OFFICER'
                  ? 'Admissions'
                  : r === 'CONTENT_EDITOR'
                  ? 'Editor'
                  : r}
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">User Identity & Email</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4 text-center">2FA Security</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#123D5A] text-amber-300 font-bold flex items-center justify-center shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{u.department}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold text-[10px] px-2 py-0.5 rounded ${
                        u.role === 'SUPER_ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : u.role === 'PRINCIPAL'
                          ? 'bg-blue-100 text-blue-800'
                          : u.role === 'ADMISSION_OFFICER'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.twoFactorEnabled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {u.twoFactorEnabled ? '🛡️ Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{u.lastLogin}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className="px-2 py-1 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded font-semibold transition"
                      >
                        {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
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
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#123D5A]">Invite Staff User</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Staff Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. K. Ramesh"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Institutional Email (@pace.ac.in) *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="k.ramesh@pace.ac.in"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="HOD">Head of Department (HOD)</option>
                  <option value="DEAN">Dean / Director</option>
                  <option value="ADMISSION_OFFICER">Admissions Officer</option>
                  <option value="CONTENT_EDITOR">Content Editor</option>
                  <option value="SUPER_ADMIN">Super Administrator</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department Affiliation</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
