import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function TopNav({ activeTab, apiStatus }) {
  const formatTabName = (tab) => {
    return tab.charAt(0).toUpperCase() + tab.slice(1);
  };

  return (
    <header className="h-[64px] bg-white border-b border-[#e5e5e2] px-8 flex items-center justify-between sticky top-0 z-10 font-sans">
      
      {/* Left Workspace Selector & Breadcrumb */}
      <div className="flex items-center gap-3 text-xs">
        <button className="flex items-center gap-1.5 font-bold text-[#171717] hover:text-[#2563eb] transition-colors py-1 px-2 rounded-md hover:bg-[#f1f1ef]">
          <span>Marketing Intelligence</span>
          <ChevronDown size={14} className="text-[#737373]" />
        </button>

        <span className="text-[#a3a3a3]">/</span>

        <span className="font-semibold text-[#737373]">
          {formatTabName(activeTab)}
        </span>
      </div>

      {/* Right Search, Notifications, Avatar */}
      <div className="flex items-center gap-4">
        
        {/* Backend API status */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f1f1ef] text-[11px] font-mono">
          <span className={`w-2 h-2 rounded-full ${apiStatus === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span className="text-[#737373]">{apiStatus}</span>
        </div>

        {/* Search Input */}
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
          <input 
            type="text" 
            placeholder="Search signals..."
            className="w-56 bg-[#f7f7f5] border border-[#e5e5e2] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#171717] focus:outline-none focus:border-[#2563eb] transition-colors"
          />
        </div>

        {/* Notifications Icon */}
        <button className="p-2 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#f1f1ef] transition-colors">
          <Bell size={16} />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-xs font-bold shadow-sm">
          AT
        </div>
      </div>

    </header>
  );
}
