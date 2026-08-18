import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Layers, 
  PieChart, 
  Users, 
  Sparkles, 
  FileText, 
  Database, 
  Sliders, 
  HelpCircle, 
  User, 
  Activity,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const mainNav = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'campaigns', label: 'Campaigns', icon: Layers },
    { id: 'channels', label: 'Channels', icon: PieChart },
    { id: 'audience', label: 'Audience', icon: Users },
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const workspaceNav = [
    { id: 'datasources', label: 'Data Sources', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  return (
    <aside className="w-60 bg-[#f1f1ef] border-r border-[#e7e7e4] h-screen flex flex-col justify-between p-4 sticky top-0 select-none z-20">
      
      <div>
        {/* Top Logo */}
        <div className="flex items-center gap-2.5 px-2 py-3 mb-4">
          <div className="w-7 h-7 rounded-md bg-[#2563eb] flex items-center justify-center text-white font-bold text-xs">
            MI
          </div>
          <span className="font-sans font-bold text-sm text-[#171717] tracking-tight">
            Marketing<span className="text-[#2563eb]">Intel</span>
          </span>
        </div>

        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          <span className="text-[11px] font-mono text-[#a3a3a3] uppercase font-bold tracking-wider px-2 block mb-2">
            MAIN MENU
          </span>
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-white text-[#171717] shadow-sm font-semibold border border-[#e7e7e4]' 
                    : 'text-[#737373] hover:text-[#171717] hover:bg-black/[0.03]'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#2563eb]' : 'text-[#737373]'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#e7e7e4] my-4" />

        {/* Workspace Navigation */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-[#a3a3a3] uppercase font-bold tracking-wider px-2 block mb-2">
            WORKSPACE
          </span>
          {workspaceNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-white text-[#171717] shadow-sm font-semibold border border-[#e7e7e4]' 
                    : 'text-[#737373] hover:text-[#171717] hover:bg-black/[0.03]'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#2563eb]' : 'text-[#737373]'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Help */}
      <div className="pt-4 border-t border-[#e7e7e4] space-y-2">
        <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium text-[#737373] hover:text-[#171717] hover:bg-black/[0.03] transition-all">
          <HelpCircle size={16} />
          <span>Help & Support</span>
        </button>

        <div className="flex items-center gap-3 px-2.5 py-2 rounded-lg bg-white border border-[#e7e7e4]">
          <div className="w-7 h-7 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center font-bold text-xs">
            AT
          </div>
          <div className="flex-1 overflow-hidden">
            <span className="text-xs font-bold text-[#171717] block truncate">Alex Turner</span>
            <span className="text-[10px] font-mono text-[#737373] block truncate">Growth Lead</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
