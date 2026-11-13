'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, FileText, Building2, BookOpen } from 'lucide-react';
import pagesData from '@/data/canonicalPages.json';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches: any[] = [];
    const pages = Object.values(pagesData) as any[];

    for (const page of pages) {
      if (
        page.title?.toLowerCase().includes(q) ||
        page.canonicalPath?.toLowerCase().includes(q) ||
        page.section?.toLowerCase().includes(q) ||
        page.fullText?.toLowerCase().includes(q)
      ) {
        matches.push(page);
        if (matches.length >= 10) break;
      }
    }

    setResults(matches);
  }, [query]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E9AC21]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search departments, courses, faculty, committees, regulations..."
            className="w-full text-base outline-none text-[#052D49] placeholder:text-gray-400"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 divide-y divide-gray-50">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-gray-400 text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#073B60]" />
              Type keyword to search across 343 institutional pages, syllabi and records.
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              No results found for "<span className="font-semibold text-gray-800">{query}</span>"
            </div>
          ) : (
            results.map((res, i) => (
              <Link
                key={i}
                href={res.canonicalPath}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F7F9] group transition-colors pt-3"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#073B60]/10 text-[#073B60]">
                      {res.section}
                    </span>
                    <h4 className="font-semibold text-[#073B60] group-hover:text-[#E9AC21] transition-colors text-sm">
                      {res.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {res.canonicalPath}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#E9AC21] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="bg-[#F5F7F9] px-4 py-2 text-[11px] text-gray-500 flex justify-between items-center border-t border-gray-100">
          <span>Search index covering all 343 PACE ITS canonical routes</span>
          <kbd className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-500 text-[10px]">ESC</kbd>
        </div>
      </div>
    </div>
  );
};

