'use client';

import React, { useState, useEffect } from 'react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [actionFilter, setActionFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: '25',
        ...(actionFilter && { action: actionFilter }),
        ...(entityFilter && { entityType: entityFilter }),
      });

      const res = await fetch(`/api/audit-logs?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to load audit logs');
      const data = await res.json();

      setLogs(data.logs);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentPage, actionFilter, entityFilter]);

  const actionBadgeColors: any = {
    LOGIN_SUCCESS: 'bg-emerald-100 text-emerald-800',
    LOGIN_FAILED: 'bg-rose-100 text-rose-800',
    CREATE: 'bg-blue-100 text-blue-800',
    UPDATE: 'bg-amber-100 text-amber-800',
    DELETE: 'bg-red-100 text-red-800',
    ADMISSION_STATUS_UPDATED: 'bg-purple-100 text-purple-800',
    ADMISSION_SUBMITTED: 'bg-teal-100 text-teal-800',
    SYSTEM_INITIALIZATION: 'bg-slate-100 text-slate-800',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-800 uppercase tracking-tight">
          Security & Institutional Audit Trail
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Immutable ledger of administrative actions, status transitions, authentication events, and data edits
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto flex-wrap">
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B60] bg-white"
          >
            <option value="">All Action Types</option>
            <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
            <option value="LOGIN_FAILED">LOGIN_FAILED</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="ADMISSION_STATUS_UPDATED">ADMISSION_STATUS_UPDATED</option>
            <option value="ADMISSION_SUBMITTED">ADMISSION_SUBMITTED</option>
          </select>

          <select
            value={entityFilter}
            onChange={(e) => {
              setEntityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B60] bg-white"
          >
            <option value="">All Entity Types</option>
            <option value="User">User</option>
            <option value="Page">Page</option>
            <option value="AdmissionApplication">AdmissionApplication</option>
            <option value="Department">Department</option>
            <option value="WebsiteSetting">WebsiteSetting</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Recorded Events: <span className="font-bold text-slate-800">{total}</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Target Entity</th>
                <th className="p-3.5">Initiating User</th>
                <th className="p-3.5">IP Address</th>
                <th className="p-3.5">Details (JSON)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#073B60] border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading audit trail...</span>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No audit records match the current filter.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          actionBadgeColors[log.action] || 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-800">{log.entityType}</span>
                      {log.entityId && (
                        <span className="block text-[10px] text-slate-400 font-mono truncate max-w-[120px]">
                          {log.entityId}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-800">
                        {log.user ? log.user.name : 'System Worker / Guest'}
                      </span>
                      {log.user && (
                        <span className="block text-[10px] text-slate-400 truncate max-w-[150px]">
                          {log.user.email}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                    <td className="p-3.5 font-mono text-[10px] text-slate-600 max-w-xs truncate">
                      {log.details || '—'}
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
            Showing <span className="font-semibold">{logs.length}</span> of{' '}
            <span className="font-semibold">{total}</span> total events
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
    </div>
  );
}
