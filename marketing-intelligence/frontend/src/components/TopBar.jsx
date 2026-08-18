import React from 'react';
import { Search, Bell, ChevronDown, Calendar } from 'lucide-react';

export default function TopBar({ 
  activeTab, 
  apiStatus, 
  dateRange, 
  setDateRange, 
  onOpenCommandK 
}) {
  const formatTabName = (tab) => {
    if (tab === 'ai-analysis') return 'AI Analysis';
    if (tab === 'datasources') return 'Data Sources';
    return tab.charAt(0).toUpperCase() + tab.slice(1);
  };

  const dateOptions = ['Today', '7 days', '30 days', '90 days', 'Custom'];

  return (
    <header className="h-[64px] min-h-[64px] bg-white border-b border-[#E5E5E2] px-6 flex items-center justify-between sticky top-0 z-10 font-sans">
      
      {/* Left Workspace Selector & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <button className="flex items-center gap-1 font-semibold text-[#171717] hover:text-[#5B5CE2] transition-colors py-1 px-1.5 rounded-md hover:bg-[#F1F1EF]">
          <span>Marketing Intelligence</span>
          <ChevronDown size={13} className="text-[#737373]" />
        </button>

        <span className="text-[#A1A1A1]">/</span>

        <span className="font-medium text-[#737373]">
          {formatTabName(activeTab)}
        </span>
      </div>

      {/* Right Search, Date Filter, Notifications */}
      <div className="flex items-center gap-3">
        
        {/* Global Command K Search Button */}
        <button 
          onClick={onOpenCommandK}
          className="flex items-center gap-2 bg-[#F7F7F5] border border-[#E5E5E2] rounded-lg px-3 py-1.5 text-xs text-[#737373] hover:text-[#171717] hover:border-[#D4D4D0] transition-colors"
        >
          <Search size={13} className="text-[#A1A1A1]" />
          <span>Search...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-[#E5E5E2] text-[#A1A1A1]">
            ⌘K
          </kbd>
        </button>

        {/* Global Date Filter Dropdown */}
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="appearance-none bg-white border border-[#E5E5E2] rounded-lg pl-8 pr-7 py-1.5 text-xs font-medium text-[#171717] hover:bg-[#F8F8F6] focus:outline-none focus:border-[#5B5CE2] cursor-pointer"
          >
            {dateOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <Calendar size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#737373] pointer-events-none" />
          <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#737373] pointer-events-none" />
        </div>

        {/* API Health indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#F1F1EF] text-[11px] font-mono">
          <span className={`w-1.5 h-1.5 rounded-full ${apiStatus === 'Online' ? 'bg-[#2E9B68]' : 'bg-[#C78A24]'}`} />
          <span className="text-[#737373]">{apiStatus}</span>
        </div>

        {/* Notifications Button */}
        <button className="p-1.5 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#F1F1EF] transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#5B5CE2]" />
        </button>

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-[#E5E5E3] text-[#171717] flex items-center justify-center text-xs font-semibold">
          AT
        </div>
      </div>

    </header>
  );
}
