'use client';

import React, { useState, useEffect, useCallback } from 'react';

export default function AdminAdmissionsManager() {
  const [applications, setApplications] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [search, setSearch] = useState('');
  const [statusBreakdown, setStatusBreakdown] = useState<any>({});

  // Active Selected Application Modal
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: '15',
        ...(statusFilter && { status: statusFilter }),
        ...(programFilter && { program: programFilter }),
        ...(search && { search }),
      });

      const res = await fetch(`/api/admissions/applications?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to load applications');
      const data = await res.json();

      setApplications(data.applications);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setStatusBreakdown(data.statusBreakdown || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, programFilter, search]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admissions/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: appId, status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      // Update state locally
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );

      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    try {
      setSavingNote(true);
      const res = await fetch('/api/admissions/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedApp.id, internalNotes }),
      });

      if (!res.ok) throw new Error('Failed to save notes');

      setSelectedApp({ ...selectedApp, internalNotes });
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApp.id ? { ...app, internalNotes } : app
        )
      );
      alert('Internal review notes saved.');
    } catch (err: any) {
      alert(err.message || 'Error saving notes');
    } finally {
      setSavingNote(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchApplications();
  };

  const exportCSV = () => {
    if (applications.length === 0) return;
    const headers = ['ApplicationNo,CandidateName,FatherName,Phone,Email,Program,BranchPref1,Marks,Rank,Status,Date'];
    const rows = applications.map((a) =>
      `"${a.applicationNo}","${a.candidateName}","${a.fatherName}","${a.phone}","${a.email}","${a.programType}","${a.branchPref1}","${a.marksPercent}","${a.entranceRank || ''}","${a.status}","${new Date(a.createdAt).toISOString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PACE_Admissions_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusColors: any = {
    NEW: 'bg-amber-100 text-amber-800 border-amber-200',
    CONTACTED: 'bg-blue-100 text-blue-800 border-blue-200',
    UNDER_REVIEW: 'bg-purple-100 text-purple-800 border-purple-200',
    APPROVED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    REJECTED: 'bg-rose-100 text-rose-800 border-rose-200',
    CLOSED: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800 uppercase tracking-tight">
            Category-B Admissions Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time review, counseling workflow and verification of online admission applicants
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition shadow flex items-center gap-1.5"
        >
          <span>📥 Export Leads (CSV)</span>
        </button>
      </div>

      {/* Status Badges Filter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        {[
          { label: 'ALL', count: total },
          { label: 'NEW', count: statusBreakdown['NEW'] || 0 },
          { label: 'CONTACTED', count: statusBreakdown['CONTACTED'] || 0 },
          { label: 'UNDER_REVIEW', count: statusBreakdown['UNDER_REVIEW'] || 0 },
          { label: 'APPROVED', count: statusBreakdown['APPROVED'] || 0 },
          { label: 'REJECTED', count: statusBreakdown['REJECTED'] || 0 },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setStatusFilter(item.label === 'ALL' ? '' : item.label);
              setCurrentPage(1);
            }}
            className={`p-3 rounded-xl border text-left transition ${
              (item.label === 'ALL' && !statusFilter) || statusFilter === item.label
                ? 'bg-[#073B60] text-white border-[#073B60] shadow'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{item.label}</div>
            <div className="text-xl font-heading font-bold mt-1">{item.count}</div>
          </button>
        ))}
      </div>

      {/* Search & Program Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full md:w-auto flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, app no, phone or email..."
            className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B60]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-900"
          >
            Search
          </button>
        </form>

        <select
          value={programFilter}
          onChange={(e) => {
            setProgramFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B60] bg-white w-full md:w-auto"
        >
          <option value="">All Programs (B.Tech / M.Tech / MBA)</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
          <option value="MBA">MBA</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Application No</th>
                <th className="p-3.5">Candidate Details</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Program & Preference 1</th>
                <th className="p-3.5">Merit / Rank</th>
                <th className="p-3.5">Status Workflow</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#073B60] border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading applications...</span>
                    </div>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No admission applications found matching this criteria.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-mono text-[11px] font-bold text-slate-800">
                      {app.applicationNo}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">{app.candidateName}</div>
                      <div className="text-[11px] text-slate-500">
                        S/o {app.fatherName} • {app.category}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <a href={`tel:${app.phone}`} className="font-semibold text-[#073B60] hover:underline block">
                        {app.phone}
                      </a>
                      <a href={`mailto:${app.email}`} className="text-slate-400 text-[11px] hover:underline block truncate max-w-[150px]">
                        {app.email}
                      </a>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-700">{app.programType}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[180px]">
                        {app.branchPref1}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">{app.marksPercent}</div>
                      <div className="text-[10px] text-slate-500">{app.entranceRank || 'Direct Entry'}</div>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded border shadow-sm focus:outline-none ${
                          statusColors[app.status] || 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="UNDER_REVIEW">UNDER REVIEW</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setInternalNotes(app.internalNotes || '');
                        }}
                        className="px-2.5 py-1 bg-[#073B60] hover:bg-[#052D49] text-white rounded text-xs font-semibold transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold">{applications.length}</span> of{' '}
            <span className="font-semibold">{total}</span> total applications
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-3 py-1 font-semibold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {selectedApp.applicationNo}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{selectedApp.candidateName}</h3>
                <p className="text-xs text-slate-500">
                  Applied on {new Date(selectedApp.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Applicant Profile Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl text-xs border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px]">Father's Name</span>
                <span className="font-semibold text-slate-800">{selectedApp.fatherName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Gender & Category</span>
                <span className="font-semibold text-slate-800">{selectedApp.gender} • {selectedApp.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Date of Birth</span>
                <span className="font-semibold text-slate-800">{selectedApp.dob}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Phone Number</span>
                <span className="font-semibold text-[#073B60]">{selectedApp.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px]">Email Address</span>
                <span className="font-semibold text-slate-800">{selectedApp.email}</span>
              </div>
              <div className="col-span-3">
                <span className="text-slate-400 block text-[10px]">Permanent Address</span>
                <span className="text-slate-700">{selectedApp.address || 'Not specified'}</span>
              </div>
            </div>

            {/* Academic Information */}
            <div className="border border-slate-200 rounded-xl p-4 text-xs space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Academic & Branch Preferences
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">Qualifying Examination Marks</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedApp.marksPercent}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Entrance Exam Rank</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedApp.entranceRank || 'N/A'}</span>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="p-2 bg-blue-50 border border-blue-100 rounded text-blue-900 font-medium">
                  1st Choice: {selectedApp.branchPref1}
                </div>
                {selectedApp.branchPref2 && (
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-700">
                    2nd Choice: {selectedApp.branchPref2}
                  </div>
                )}
                {selectedApp.branchPref3 && (
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-700">
                    3rd Choice: {selectedApp.branchPref3}
                  </div>
                )}
              </div>
            </div>

            {/* Counseling Workflow & Notes */}
            <div className="border border-slate-200 rounded-xl p-4 text-xs space-y-3 bg-white">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Admissions Cell Review & Internal Notes
              </h4>
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Workflow Status</label>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800 font-bold bg-white"
                >
                  <option value="NEW">NEW - Unread Lead</option>
                  <option value="CONTACTED">CONTACTED - Student telephoned by Admissions Desk</option>
                  <option value="UNDER_REVIEW">UNDER REVIEW - Verification of certificates / marks</option>
                  <option value="APPROVED">APPROVED - Provisional allotment confirmed</option>
                  <option value="REJECTED">REJECTED - Ineligible or Seat Full</option>
                  <option value="CLOSED">CLOSED - Admitted elsewhere / Withdrawn</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Confidential Counseling Notes</label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record call logs, fee negotiations, certificate verification status..."
                  className="w-full p-2.5 border rounded-lg focus:border-[#073B60] text-slate-800 text-xs"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNote}
                  className="px-4 py-2 bg-[#073B60] hover:bg-[#052D49] text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
                >
                  {savingNote ? 'Saving...' : 'Save Review Notes'}
                </button>
              </div>
            </div>

            <div className="flex justify-end border-t pt-3">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

