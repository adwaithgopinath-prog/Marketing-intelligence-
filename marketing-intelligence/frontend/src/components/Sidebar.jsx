import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  GitMerge, 
  Radio, 
  Layers, 
  PieChart, 
  Users, 
  Sparkles, 
  FileText, 
  Database, 
  Activity, 
  Sliders, 
  HelpCircle 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const overviewNav = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'attribution', label: 'Attribution', icon: GitMerge },
    { id: 'signals', label: 'Signals', icon: Radio },
    { id: 'campaigns', label: 'Campaigns', icon: Layers },
    { id: 'channels', label: 'Channels', icon: PieChart },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  const intelligenceNav = [
    { id: 'ai-analysis', label: 'AI Analysis', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const dataNav = [
    { id: 'datasources', label: 'Data Sources', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Activity },
  ];

  const systemNav = [
    { id: 'settings', label: 'Settings', icon: Sliders },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const renderNavGroup = (title, items) => (
    <div className="mb-4">
      {title && (
        <span className="text-[10px] font-mono font-bold text-[#A1A1A1] uppercase tracking-wider px-2 block mb-1.5">
          {title}
        </span>
      )}
      <div className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full h-9 flex items-center gap-2.5 px-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                isActive 
                  ? 'bg-[#E5E5E3] text-[#171717] font-semibold' 
                  : 'text-[#737373] hover:text-[#171717] hover:bg-black/[0.03]'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#5B5CE2]' : 'text-[#737373]'} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="w-[224px] min-w-[224px] bg-[#F2F2F0] border-r border-[#E5E5E2] h-screen flex flex-col justify-between p-3.5 sticky top-0 select-none z-20 font-sans">
      
      <div className="overflow-y-auto">
        {/* Top Logo */}
        <div className="flex items-center gap-2 px-2 py-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-[#5B5CE2] text-white flex items-center justify-center font-bold text-xs">
            MI
          </div>
          <span className="font-sans font-bold text-xs text-[#171717] tracking-tight">
            Marketing <span className="text-[#5B5CE2]">Intel</span>
          </span>
        </div>

        {/* Navigation Sections */}
        {renderNavGroup('OVERVIEW', overviewNav)}
        <div className="h-[1px] bg-[#E5E5E2] my-2" />
        
        {renderNavGroup('INTELLIGENCE', intelligenceNav)}
        <div className="h-[1px] bg-[#E5E5E2] my-2" />

        {renderNavGroup('DATA', dataNav)}
        <div className="h-[1px] bg-[#E5E5E2] my-2" />

        {renderNavGroup('SYSTEM', systemNav)}
      </div>

      {/* Bottom Profile */}
      <div className="pt-2 border-t border-[#E5E5E2]">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-white border border-[#E5E5E2]">
          <div className="w-7 h-7 rounded-full bg-[#E5E5E3] text-[#171717] flex items-center justify-center font-semibold text-xs">
            AT
          </div>
          <div className="flex-1 overflow-hidden">
            <span className="text-xs font-semibold text-[#171717] block truncate">Alex Turner</span>
            <span className="text-[11px] text-[#737373] block truncate">Growth Lead</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
