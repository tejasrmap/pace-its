'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/overview');
      if (!res.ok) throw new Error('Failed to load dashboard metrics');
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#073B60] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <h3 className="font-bold text-lg">Error loading overview</h3>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={fetchOverview}
          className="mt-4 px-4 py-2 bg-[#073B60] text-white rounded-lg text-xs font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  const { metrics, recentApplications, recentAuditLogs, system } = data;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#073B60] to-[#052D49] rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-[#E9AC21]/30">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#E9AC21] font-semibold">Institutional Command Center</span>
          <h1 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight mt-1">
            PACE ITS Website Administration
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Manage all 343 institutional canonical routes, category-B admission applications, academic departments, and security audit logs.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/admissions"
            className="px-4 py-2.5 bg-[#E9AC21] hover:bg-[#F6C54A] text-[#073B60] rounded-lg text-xs font-bold transition shadow"
          >
            Review Enquiries ({metrics?.admissions?.new || 0} New)
          </Link>
          <Link
            href="/admin/pages"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition border border-white/20"
          >
            Manage Pages (343)
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Pages */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Canonical Pages</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-lg">📄</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-heading font-bold text-slate-800">
              {metrics?.pages?.total || 0}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{metrics?.pages?.published || 0} Published</span>
              <span className="text-slate-300">|</span>
              <span>{metrics?.pages?.draft || 0} Draft</span>
            </div>
          </div>
        </div>

        {/* Admissions Total */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Admission Enquiries</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-lg text-lg">🎓</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-heading font-bold text-slate-800">
              {metrics?.admissions?.total || 0}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                {metrics?.admissions?.new || 0} New
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                {metrics?.admissions?.approved || 0} Approved
              </span>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Departments</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg text-lg">🏛️</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-heading font-bold text-slate-800">
              {metrics?.departments?.total || 0}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              13 Engineering & PG + 7 Polytechnic
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">System Status</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-lg">🛡️</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-lg font-bold text-slate-800">Operational</span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Prisma Client v5.22.0 active
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Admissions & Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Admissions Enquiries */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="font-heading font-bold text-slate-800 uppercase tracking-wide text-sm">
                Recent Category-B Applications
              </h2>
              <p className="text-xs text-slate-500">Latest online admission submissions</p>
            </div>
            <Link
              href="/admin/admissions"
              className="text-xs font-bold text-[#073B60] hover:underline"
            >
              View All ({metrics?.admissions?.total}) →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentApplications?.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">No applications received yet.</div>
            ) : (
              recentApplications.map((app: any) => {
                const badgeColor =
                  app.status === 'NEW'
                    ? 'bg-amber-100 text-amber-800'
                    : app.status === 'APPROVED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : app.status === 'CONTACTED'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-700';

                return (
                  <div key={app.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800">{app.candidateName}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {app.applicationNo} • {app.programType} ({app.branchPref1.split('(')[1]?.replace(')', '') || app.branchPref1})
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Phone: {app.phone} • Marks: {app.marksPercent}
                      </div>
                    </div>
                    <Link
                      href={`/admin/admissions`}
                      className="text-xs px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                    >
                      Inspect
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Security Audit Trail */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="font-heading font-bold text-slate-800 uppercase tracking-wide text-sm">
                Security & System Audit Log
              </h2>
              <p className="text-xs text-slate-500">Immutable audit records of administrative actions</p>
            </div>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-bold text-[#073B60] hover:underline"
            >
              Full Trail →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentAuditLogs?.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">No audit logs recorded yet.</div>
            ) : (
              recentAuditLogs.map((log: any) => (
                <div key={log.id} className="p-3.5 hover:bg-slate-50 transition text-xs flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">{log.action}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {log.entityType}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      User: {log.user?.email || 'System Root'}
                    </div>
                    {log.details && (
                      <div className="text-[10px] text-slate-400 truncate max-w-sm font-mono">
                        {log.details}
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

