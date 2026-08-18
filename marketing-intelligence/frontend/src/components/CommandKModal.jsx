import React, { useState, useEffect } from 'react';
import { Search, Layers, PieChart, Users, Radio, FileText, X, ArrowRight } from 'lucide-react';

export default function CommandKModal({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchItems = [
    { title: 'Summer Acquisition Q3', category: 'Campaign', tab: 'campaigns', icon: Layers },
    { title: 'Google Search Ads', category: 'Channel', tab: 'channels', icon: PieChart },
    { title: 'Meta Retargeting CPA drift', category: 'Signal', tab: 'signals', icon: Radio },
    { title: 'August Performance Review', category: 'Report', tab: 'reports', icon: FileText },
    { title: 'Enterprise Customer Segment', category: 'Customer', tab: 'customers', icon: Users },
  ];

  const filtered = query.trim() === ''
    ? searchItems
    : searchItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4 font-sans">
      <div className="bg-white border border-[#E5E5E2] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-modal">
        
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E5E2]">
          <Search size={16} className="text-[#A1A1A1]" />
          <input 
            type="text"
            autoFocus
            placeholder="Search campaigns, signals, reports, or channels..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm text-[#171717] focus:outline-none placeholder:text-[#A1A1A1]"
          />
          <button onClick={onClose} className="text-[#A1A1A1] hover:text-[#171717]">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-[#F1F1EF]">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectTab(item.tab);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F8F8F6] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-[#737373] group-hover:text-[#5B5CE2]" />
                    <span className="text-xs font-semibold text-[#171717]">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#A1A1A1] bg-[#F1F1EF] px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <ArrowRight size={13} className="text-[#A1A1A1] group-hover:text-[#5B5CE2] opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-[#737373]">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#F7F7F5] border-t border-[#E5E5E2] flex items-center justify-between text-[11px] font-mono text-[#A1A1A1]">
          <span>Navigation shortcut</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
}
