'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDepartmentsManager() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDept, setEditingDept] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/departments');
      if (!res.ok) throw new Error('Failed to load departments');
      const data = await res.json();
      setDepartments(data.departments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/departments/${editingDept.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingDept.name,
          intake: editingDept.intake,
          vision: editingDept.vision,
          mission: editingDept.mission,
          hodName: editingDept.hodName,
          hodEmail: editingDept.hodEmail,
          hodMessage: editingDept.hodMessage,
        }),
      });

      if (!res.ok) throw new Error('Failed to update department');
      setSaveSuccess(true);
      setTimeout(() => {
        setEditingDept(null);
        setSaveSuccess(false);
        fetchDepartments();
      }, 1000);
    } catch (err: any) {
      alert(err.message || 'Error updating department');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800 uppercase tracking-tight">
            Departments & Academic Disciplines
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage HOD profiles, approved intake capacities, vision & mission statements
          </p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-500 text-xs">
            <div className="w-6 h-6 border-2 border-[#073B60] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading departments...
          </div>
        ) : (
          departments.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-[#073B60]/40 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-bold text-lg text-[#073B60]">
                    {d.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      d.type === 'UG'
                        ? 'bg-blue-100 text-blue-800'
                        : d.type === 'PG'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {d.type}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug">{d.name}</h3>
                <div className="text-xs text-slate-500 mt-1">
                  Intake: <span className="font-semibold text-slate-700">{d.intake || '60 Seats'}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1">
                  <div className="text-slate-400 text-[10px] font-semibold uppercase">Head of Department</div>
                  <div className="font-semibold text-slate-800">{d.hodName || 'Dr. Department Head'}</div>
                  <div className="text-slate-500 text-[11px] truncate">{d.hodEmail || `${d.slug}@pace.ac.in`}</div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/departments/${d.slug}`}
                  target="_blank"
                  className="text-xs text-[#073B60] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Public View</span>
                  <span className="text-[10px]">↗</span>
                </Link>
                <button
                  onClick={() => setEditingDept(d)}
                  className="px-3 py-1 bg-slate-100 hover:bg-[#073B60] hover:text-white rounded text-xs font-semibold text-slate-700 transition"
                >
                  Edit Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Department Modal */}
      {editingDept && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-800">Edit Department Details</h3>
                <p className="text-xs text-slate-500">
                  {editingDept.code} - {editingDept.name}
                </p>
              </div>
              <button
                onClick={() => setEditingDept(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs font-semibold">
                ✓ Department updated successfully.
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department Name</label>
                <input
                  type="text"
                  value={editingDept.name || ''}
                  onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Approved Intake Capacity</label>
                <input
                  type="text"
                  value={editingDept.intake || ''}
                  onChange={(e) => setEditingDept({ ...editingDept, intake: e.target.value })}
                  placeholder="e.g. 240 Seats"
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">HOD Full Name</label>
                  <input
                    type="text"
                    value={editingDept.hodName || ''}
                    onChange={(e) => setEditingDept({ ...editingDept, hodName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">HOD Official Email</label>
                  <input
                    type="email"
                    value={editingDept.hodEmail || ''}
                    onChange={(e) => setEditingDept({ ...editingDept, hodEmail: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department Vision</label>
                <textarea
                  rows={2}
                  value={editingDept.vision || ''}
                  onChange={(e) => setEditingDept({ ...editingDept, vision: e.target.value })}
                  placeholder="To produce globally competent engineers..."
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department Mission</label>
                <textarea
                  rows={2}
                  value={editingDept.mission || ''}
                  onChange={(e) => setEditingDept({ ...editingDept, mission: e.target.value })}
                  placeholder="Imparting rigorous technological education..."
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">HOD Welcome Message</label>
                <textarea
                  rows={3}
                  value={editingDept.hodMessage || ''}
                  onChange={(e) => setEditingDept({ ...editingDept, hodMessage: e.target.value })}
                  placeholder="Welcome to the department..."
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingDept(null)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#073B60] hover:bg-[#052D49] text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
