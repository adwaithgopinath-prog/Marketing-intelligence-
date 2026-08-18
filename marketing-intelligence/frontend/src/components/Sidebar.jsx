import React from 'react';
import { 
  BarChart2, 
  Radio, 
  TrendingUp, 
  Layers, 
  PieChart, 
  Users, 
  Sparkles, 
  FileText, 
  Sliders, 
  HelpCircle, 
  Activity
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const mainNav = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'signals', label: 'Signals', icon: Radio },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'campaigns', label: 'Campaigns', icon: Layers },
    { id: 'channels', label: 'Channels', icon: PieChart },
    { id: 'audience', label: 'Audience', icon: Users },
  ];

  const intelligenceNav = [
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const workspaceNav = [
    { id: 'integrations', label: 'Integrations', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  return (
    <aside className="w-[220px] bg-[#F1F1EF] border-r border-[#E6E6E3] h-screen flex flex-col justify-between p-4 sticky top-0 select-none z-20 font-sans">
      
      <div>
        {/* Logo at top */}
        <div className="px-2 py-3 mb-4">
          <span className="font-sans font-bold text-xs tracking-wider text-[#171717] block">
            MARKETING INTELLIGENCE
          </span>
        </div>

        {/* Main Navigation */}
        <div className="space-y-1 mb-3">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full h-10 flex items-center gap-3 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#E5E5E2] text-[#171717] font-semibold' 
                    : 'text-[#737373] hover:text-[#171717] hover:bg-black/[0.03]'
                }`}
              >
                <Icon size={16} className="text-[#737373]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#E6E6E3] my-3" />

        {/* Intelligence Section */}
        <div className="space-y-1 mb-3">
          {intelligenceNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full h-10 flex items-center gap-3 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#E5E5E2] text-[#171717] font-semibold' 
                    : 'text-[#737373] hover:text-[#171717] hover:bg-black/[0.03]'
                }`}
              >
                <Icon size={16} className="text-[#737373]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#E6E6E3] my-3" />

        {/* Workspace Section */}
        <div className="space-y-1">
          {workspaceNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full h-10 flex items-center gap-3 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#E5E5E2] text-[#171717] font-semibold' 
                    : 'text-[#737373] hover:text-[#171717] hover:bg-black/[0.03]'
                }`}
              >
                <Icon size={16} className="text-[#737373]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Help */}
      <div className="pt-3 border-t border-[#E6E6E3] space-y-2">
        <button className="w-full h-9 flex items-center gap-3 px-3 rounded-lg text-sm font-medium text-[#737373] hover:text-[#171717] hover:bg-black/[0.03] transition-colors">
          <HelpCircle size={16} />
          <span>Help</span>
        </button>

        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white border border-[#E6E6E3]">
          <div className="w-7 h-7 rounded-full bg-[#E5E5E2] text-[#171717] flex items-center justify-center font-semibold text-xs">
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
