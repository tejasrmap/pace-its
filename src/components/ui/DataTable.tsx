import React from 'react';

interface DataTableProps {
  headers: string[];
  rows: string[][];
  title?: string;
}

export const DataTable: React.FC<DataTableProps> = ({ headers, rows, title }) => {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[#E4E9EF] shadow-sm bg-white">
      {title && (
        <div className="bg-[#073B60] text-white px-4 py-2.5 text-xs sm:text-sm font-bold font-condensed uppercase tracking-wider">
          {title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-xs sm:text-sm">
          {headers && headers.length > 0 && (
            <thead className="bg-[#F5F7F9] text-[#052D49] font-bold">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 border-b border-gray-200 font-semibold tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {rows.map((row, rIdx) => (
              <tr 
                key={rIdx} 
                className={rIdx % 2 === 0 ? 'bg-white hover:bg-amber-50/40 transition-colors' : 'bg-[#F9FAFB] hover:bg-amber-50/40 transition-colors'}
              >
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-2.5 whitespace-normal break-words">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

