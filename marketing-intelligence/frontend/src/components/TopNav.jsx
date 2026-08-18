import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function TopNav({ activeTab, apiStatus }) {
  const formatTabName = (tab) => {
    return tab.charAt(0).toUpperCase() + tab.slice(1);
  };

  return (
    <header className="h-[64px] bg-white border-b border-[#E6E6E3] px-8 flex items-center justify-between sticky top-0 z-10 font-sans">
      
      {/* Left Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-sans">
        <button className="flex items-center gap-1 font-semibold text-[#171717] hover:text-[#5B5CE2] transition-colors py-1 px-1.5 rounded-md hover:bg-[#F1F1EF]">
          <span>Marketing Intelligence</span>
          <ChevronDown size={13} className="text-[#737373]" />
        </button>

        <span className="text-[#A3A3A3]">/</span>

        <span className="font-normal text-[#737373]">
          {formatTabName(activeTab)}
        </span>
      </div>

      {/* Right Tools & Avatar */}
      <div className="flex items-center gap-4">
        
        {/* Backend API health badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F1F1EF] text-[11px] font-mono">
          <span className={`w-1.5 h-1.5 rounded-full ${apiStatus === 'Online' ? 'bg-[#2FA36B]' : 'bg-[#C99832]'}`} />
          <span className="text-[#737373]">{apiStatus}</span>
        </div>

        {/* Search input */}
        <div className="relative hidden sm:block">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
          <input 
            type="text" 
            placeholder="Search signals..."
            className="w-48 bg-[#F7F7F5] border border-[#E6E6E3] rounded-lg pl-8 pr-3 py-1 text-xs text-[#171717] focus:outline-none focus:border-[#5B5CE2] transition-colors"
          />
        </div>

        {/* Notifications Icon */}
        <button className="p-1.5 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#F1F1EF] transition-colors">
          <Bell size={15} />
        </button>

        {/* User avatar */}
        <div className="w-7 h-7 rounded-full bg-[#E5E5E2] text-[#171717] flex items-center justify-center text-xs font-semibold">
          AT
        </div>
      </div>

    </header>
  );
}
