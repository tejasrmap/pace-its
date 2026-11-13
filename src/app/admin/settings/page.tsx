'use client';

import React, { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);
  const [values, setValues] = useState<any>({});
  const [message, setMessage] = useState('');

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to load settings');
      const data = await res.json();
      setSettings(data.settings);
      const valMap: any = {};
      data.settings.forEach((s: any) => {
        valMap[s.key] = s.value;
      });
      setValues(valMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUpdate = async (key: string) => {
    try {
      setUpdatingKey(key);
      setMessage('');
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: values[key] }),
      });

      if (!res.ok) throw new Error('Failed to update setting');
      setMessage(`Setting "${key}" successfully saved.`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating setting');
    } finally {
      setUpdatingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-800 uppercase tracking-tight">
          Website & System Configuration
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Global institutional metadata, admissions contact hotlines, accreditation badges
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
          ✓ {message}
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        {loading ? (
          <div className="py-12 text-center text-slate-500 text-xs">Loading configuration...</div>
        ) : (
          settings.map((s) => (
            <div key={s.id} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <span className="font-mono text-xs font-bold text-[#073B60]">{s.key}</span>
                  <span className="ml-2 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
                    {s.group}
                  </span>
                </div>
                <button
                  onClick={() => handleUpdate(s.key)}
                  disabled={updatingKey === s.key}
                  className="px-3 py-1 bg-[#073B60] hover:bg-[#052D49] text-white text-xs font-semibold rounded transition self-start sm:self-auto disabled:opacity-50"
                >
                  {updatingKey === s.key ? 'Saving...' : 'Save'}
                </button>
              </div>

              {s.value && s.value.length > 80 ? (
                <textarea
                  rows={2}
                  value={values[s.key] || ''}
                  onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-[#073B60] text-slate-800"
                />
              ) : (
                <input
                  type="text"
                  value={values[s.key] || ''}
                  onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-[#073B60] text-slate-800"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

