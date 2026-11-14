'use client';

import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  className?: string;
  variant?: 'underline' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  className = '',
  variant = 'underline',
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id || '');

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tab Navigation List */}
      <div
        className={`flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 ${
          variant === 'underline' ? 'border-b border-[#E2E8F0]' : 'bg-[#F1F4F6] p-1.5 rounded-xl'
        }`}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          let btnClasses = '';

          if (variant === 'underline') {
            btnClasses = isActive
              ? 'border-b-2 border-[#E5AD35] text-[#123D5A] font-bold pb-3 px-3'
              : 'text-[#687783] hover:text-[#123D5A] font-medium pb-3 px-3';
          } else {
            btnClasses = isActive
              ? 'bg-white text-[#123D5A] shadow-sm font-bold py-2 px-4 rounded-lg'
              : 'text-[#687783] hover:text-[#123D5A] font-medium py-2 px-4 rounded-lg';
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 text-sm whitespace-nowrap transition-colors ${btnClasses}`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#123D5A] text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div>{currentTab?.content}</div>
    </div>
  );
};

