'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPagesManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // Edit Modal State
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Create Modal State
  const [isCreating, setIsCreating] = useState(false);
  const [newPath, setNewPath] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newSection, setNewSection] = useState('Academics');
  const [newCategory, setNewCategory] = useState('General');
  const [createError, setCreateError] = useState('');

  const fetchPages = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: '15',
        ...(search && { search }),
        ...(category && { category }),
        ...(status && { status }),
      });

      const res = await fetch(`/api/pages?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to load pages');
      const data = await res.json();

      setPages(data.pages);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      if (data.filters?.categories) {
        setAvailableCategories(data.filters.categories);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [currentPage, category, status]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPages();
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/pages/${editingPage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingPage.title,
          section: editingPage.section,
          category: editingPage.category,
          status: editingPage.status,
          seoTitle: editingPage.seoTitle,
          seoDesc: editingPage.seoDesc,
        }),
      });

      if (!res.ok) throw new Error('Failed to update page');
      setSaveSuccess(true);
      setTimeout(() => {
        setEditingPage(null);
        setSaveSuccess(false);
        fetchPages();
      }, 1000);
    } catch (err: any) {
      alert(err.message || 'Error updating page');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          canonicalPath: newPath,
          title: newTitle,
          section: newSection,
          category: newCategory,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create page');
      }

      setIsCreating(false);
      setNewPath('');
      setNewTitle('');
      fetchPages();
    } catch (err: any) {
      setCreateError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800 uppercase tracking-tight">
            Canonical Page Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete registry of all 343 institutional routes and templates
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-[#073B60] hover:bg-[#052D49] text-white text-xs font-bold rounded-lg transition shadow flex items-center gap-1.5"
        >
          <span>+ Create New Route</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full md:w-auto flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by route (e.g. /cse, /admissions) or title..."
            className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B60]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-900"
          >
            Search
          </button>
        </form>

        <div className="flex gap-2 w-full md:w-auto flex-wrap">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B60] bg-white"
          >
            <option value="">All Categories</option>
            {availableCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#073B60] bg-white"
          >
            <option value="">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Canonical Path</th>
                <th className="p-3.5">Page Title</th>
                <th className="p-3.5">Section / Category</th>
                <th className="p-3.5">Template</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#073B60] border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading canonical routes...</span>
                    </div>
                  </td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No pages matched your search criteria.
                  </td>
                </tr>
              ) : (
                pages.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-mono text-[11px] text-slate-800 font-semibold max-w-[200px] truncate">
                      <Link
                        href={p.canonicalPath}
                        target="_blank"
                        className="text-[#073B60] hover:underline flex items-center gap-1"
                      >
                        <span>{p.canonicalPath}</span>
                        <span className="text-[10px] text-slate-400">↗</span>
                      </Link>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800 max-w-[250px] truncate">
                      {p.title}
                    </td>
                    <td className="p-3.5">
                      <span className="text-slate-600 font-medium">{p.section}</span>
                      <span className="text-slate-400 text-[11px] block">{p.category}</span>
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono text-[10px]">
                      {p.template}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'PUBLISHED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setEditingPage(p)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#073B60] hover:text-white rounded text-slate-700 font-medium transition"
                      >
                        Edit
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
            Showing <span className="font-semibold">{pages.length}</span> of{' '}
            <span className="font-semibold">{total}</span> total routes
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

      {/* Edit Page Modal */}
      {editingPage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-800">Edit Canonical Route</h3>
                <p className="text-xs text-slate-500 font-mono">{editingPage.canonicalPath}</p>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs font-semibold">
                ✓ Route metadata updated successfully.
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={editingPage.title || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={editingPage.section || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, section: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingPage.category || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Publishing Status</label>
                <select
                  value={editingPage.status || 'PUBLISHED'}
                  onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800 bg-white"
                >
                  <option value="PUBLISHED">PUBLISHED (Visible to public & search engines)</option>
                  <option value="DRAFT">DRAFT (Hidden from navigation)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  value={editingPage.seoTitle || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, seoTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">SEO Meta Description</label>
                <textarea
                  rows={3}
                  value={editingPage.seoDesc || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, seoDesc: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setEditingPage(null)}
                className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePage}
                disabled={isSaving}
                className="px-4 py-2 bg-[#073B60] hover:bg-[#052D49] text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Route Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-slate-800">Add Canonical Route</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {createError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreatePage} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Canonical URL Path</label>
                <input
                  type="text"
                  required
                  placeholder="/academics/new-program"
                  value={newPath}
                  onChange={(e) => setNewPath(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Computer Applications (MCA)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:border-[#073B60] text-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#073B60] hover:bg-[#052D49] text-white rounded-lg text-xs font-bold transition"
                >
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

