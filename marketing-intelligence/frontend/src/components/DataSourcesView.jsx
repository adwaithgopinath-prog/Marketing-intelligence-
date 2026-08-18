import React from 'react';
import { Database, CheckCircle2, RefreshCw } from 'lucide-react';

export default function DataSourcesView() {
  const sources = [
    { name: 'Google Ads', status: 'Connected', lastSync: '2 minutes ago', records: '42,812', health: '98.7%' },
    { name: 'Meta Ads', status: 'Connected', lastSync: '5 minutes ago', records: '38,140', health: '99.2%' },
    { name: 'Google Analytics 4', status: 'Connected', lastSync: '1 minute ago', records: '1,24,900', health: '99.8%' },
    { name: 'LinkedIn Ads', status: 'Connected', lastSync: '12 minutes ago', records: '14,210', health: '97.4%' },
    { name: 'Trustpilot Reviews', status: 'Connected', lastSync: '1 hour ago', records: '428', health: '100.0%' },
    { name: 'Yelp Reviews', status: 'Connected', lastSync: '2 hours ago', records: '184', health: '100.0%' },
  ];

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-6 font-sans">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5E2] pb-6">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
            Data Sources & Integrations
          </h1>
          <p className="text-sm text-[#737373] mt-1 font-sans">
            Active provider connections, sync schedules, and API health status.
          </p>
        </div>

        <button className="btn-mi-secondary text-xs">
          <RefreshCw size={13} />
          <span>Sync All Sources</span>
        </button>
      </div>

      {/* SOURCES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sources.map((src, idx) => (
          <div key={idx} className="mi-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2]">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-[#5B5CE2]" />
                <span className="font-sans font-bold text-sm text-[#171717]">{src.name}</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#2E9B68] bg-[#F0FBF5] px-2 py-0.5 rounded border border-[#2E9B68]/20 flex items-center gap-1">
                <CheckCircle2 size={11} /> {src.status}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#737373]">Last Sync</span>
                <span className="text-[#171717]">{src.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">Records Ingested</span>
                <span className="font-bold text-[#171717]">{src.records}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">Provider Health</span>
                <span className="font-bold text-[#2E9B68]">{src.health}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
