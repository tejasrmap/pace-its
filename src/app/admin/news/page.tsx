'use client';

import React, { useState, useEffect } from 'react';

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newLink, setNewLink] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error('Failed to load announcements');
      const data = await res.json();
      setArticles(data.articles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setIsCreating(true);

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          link: newLink,
          isTicker: true,
          isActive: true,
        }),
      });

      if (!res.ok) throw new Error('Failed to post announcement');
      setNewTitle('');
      setNewLink('');
      fetchNews();
    } catch (err: any) {
      alert(err.message || 'Error posting');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-800 uppercase tracking-tight">
          News Ticker & Institutional Announcements
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage real-time notifications appearing on the top ticker banner across all 343 pages
        </p>
      </div>

      {/* Add New Announcement Form */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-sm text-slate-800 mb-3">Add Urgent Broadcast / News Item</h3>
        <form onSubmit={handleCreate} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Announcement Text</label>
            <input
              type="text"
              required
              placeholder="e.g. B.Tech Semester End Examinations Hall Tickets Available for Download..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Link URL (Optional)</label>
            <input
              type="text"
              placeholder="e.g. /examination/notifications or https://..."
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800 font-mono"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 bg-[#073B60] hover:bg-[#052D49] text-white rounded-lg font-bold text-xs transition disabled:opacity-50"
            >
              {isCreating ? 'Broadcasting...' : 'Publish to News Ticker'}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Announcements List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs uppercase text-slate-600">
          Active Broadcasts ({articles.length})
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-6 text-center text-xs text-slate-500">Loading announcements...</div>
          ) : articles.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">No active news announcements.</div>
          ) : (
            articles.map((a) => (
              <div key={a.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50 transition">
                <div className="space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{a.title}</span>
                  </div>
                  {a.link && (
                    <div className="text-[11px] text-blue-600 font-mono pl-4">
                      Target: {a.link}
                    </div>
                  )}
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

