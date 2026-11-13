'use client';

import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Search } from 'lucide-react';

interface DocumentItem {
  title: string;
  url: string;
  category?: string;
  academicYear?: string;
}

interface DocumentListProps {
  documents: DocumentItem[];
  title?: string;
  enableSearch?: boolean;
}

export const DocumentList: React.FC<DocumentListProps> = ({ 
  documents, 
  title = "Downloadable Documents & Circulars", 
  enableSearch = false 
}) => {
  const [search, setSearch] = useState('');

  if (!documents || documents.length === 0) return null;

  const filtered = documents.filter(d => 
    (d.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (d.url || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="my-8 bg-white rounded-2xl border border-[#E4E9EF] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h3 className="font-condensed text-xl font-bold text-[#052D49] uppercase tracking-wide">
            {title} ({documents.length})
          </h3>
          <p className="text-xs text-gray-500">Official authentic institutional files preserved from source.</p>
        </div>

        {enableSearch && documents.length > 5 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 outline-none focus:border-[#E9AC21]"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
        {filtered.map((doc, idx) => (
          <a
            key={idx}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#E9AC21] bg-[#F9FAFB] hover:bg-white transition-all group shadow-xs"
          >
            <div className="flex items-center gap-3 pr-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#073B60]/10 text-[#073B60] group-hover:bg-[#E9AC21] group-hover:text-[#052D49] flex items-center justify-center flex-shrink-0 transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-[#052D49] group-hover:text-[#073B60] truncate">
                {doc.title || doc.url.split('/').pop()}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0 text-gray-400 group-hover:text-[#E9AC21]">
              <Download className="w-4 h-4" />
              <ExternalLink className="w-3 h-3 opacity-60" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

