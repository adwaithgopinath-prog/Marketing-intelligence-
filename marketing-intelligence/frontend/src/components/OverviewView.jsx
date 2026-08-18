import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Layers, ArrowRight } from 'lucide-react';

export default function OverviewView({ onNavigate }) {
  const [metricTab, setMetricTab] = useState('Revenue');

  const kpis = [
    { label: 'Revenue', value: '₹8.42L', change: '+18.6%', isPositive: true },
    { label: 'Ad Spend', value: '₹1.74L', change: '+7.2%', isPositive: true },
    { label: 'ROAS', value: '4.82x', change: '+10.4%', isPositive: true },
    { label: 'CAC', value: '₹842', change: '-6.8%', isPositive: true },
  ];

  const channels = [
    { name: 'Google Ads', spend: '₹82,400', revenue: '₹4,12,000', roas: '5.00x', pct: '48%' },
    { name: 'Meta Ads', spend: '₹54,100', revenue: '₹2,38,000', roas: '4.40x', pct: '28%' },
    { name: 'LinkedIn Ads', spend: '₹24,500', revenue: '₹1,08,000', roas: '4.40x', pct: '13%' },
    { name: 'Organic / SEO', spend: '₹13,000', revenue: '₹84,000', roas: '6.46x', pct: '11%' },
  ];

  const observations = [
    { text: 'Google Search revenue increased 24% following exact-match budget expansion.', type: 'positive' },
    { text: 'Meta CPA increased 17% due to creative ad saturation on mobile feed.', type: 'warning' },
    { text: 'Organic acquisition revenue increased 12% driven by tech documentation traffic.', type: 'positive' },
  ];

  const topCampaigns = [
    { name: 'Search_Brand_Exact_Q3', channel: 'Google', spend: '₹48,200', revenue: '₹2,64,000', roas: '5.47x', status: 'Active' },
    { name: 'Retargeting_LTV_Audience', channel: 'Meta', spend: '₹32,100', revenue: '₹1,28,000', roas: '3.98x', status: 'Active' },
    { name: 'Exec_DecisionMakers_InMail', channel: 'LinkedIn', spend: '₹24,500', revenue: '₹1,08,000', roas: '4.40x', status: 'Active' },
  ];

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-8 font-sans">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5E2] pb-6">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
            Marketing Overview
          </h1>
          <p className="text-sm text-[#737373] mt-1 font-sans">
            See how your marketing is performing across every channel.
          </p>
        </div>
      </div>

      {/* KPI ROW (EXACTLY FOUR CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="mi-card flex flex-col justify-between h-28">
            <span className="text-xs font-mono font-semibold text-[#737373] uppercase tracking-wider">
              {kpi.label}
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-sans font-bold text-3xl text-[#171717]">
                {kpi.value}
              </span>
              <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                kpi.isPositive ? 'bg-[#F0FBF5] text-[#2E9B68]' : 'bg-[#FDF2F2] text-[#D95757]'
              }`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* OVERVIEW MAIN CONTENT (2-COLUMN LAYOUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: PERFORMANCE CHART */}
        <div className="lg:col-span-8 mi-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E2]">
            <div>
              <h3 className="font-sans font-bold text-base text-[#171717]">Performance</h3>
              <p className="text-xs text-[#737373]">Revenue vs Ad Spend trajectory over selected timeframe</p>
            </div>

            {/* Metric Selector Tabs */}
            <div className="flex items-center gap-1 bg-[#F1F1EF] p-1 rounded-lg">
              {['Revenue', 'Spend', 'ROAS', 'Conversions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMetricTab(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    metricTab === tab 
                      ? 'bg-white text-[#171717] shadow-xs font-semibold' 
                      : 'text-[#737373] hover:text-[#171717]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Line Chart */}
          <div className="w-full h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F1EF" strokeDasharray="3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F1EF" strokeDasharray="3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#F1F1EF" strokeDasharray="3" />

              <path d="M0,140 Q120,90 240,50 T480,20 L500,10" fill="none" stroke="#5B5CE2" strokeWidth="2.5" />
              <path d="M0,165 Q120,135 240,105 T480,70 L500,55" fill="none" stroke="#A1A1A1" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="240" cy="50" r="3.5" fill="#5B5CE2" />
            </svg>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#737373]">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B5CE2]" /> Revenue (₹8,42,000)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A1A1A1]" /> Ad Spend (₹1,74,000)
            </span>
          </div>
        </div>

        {/* RIGHT: CHANNEL CONTRIBUTION */}
        <div className="lg:col-span-4 mi-card space-y-5 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#E5E5E2] mb-4">
              <h3 className="font-sans font-bold text-base text-[#171717]">Channel Contribution</h3>
              <p className="text-xs text-[#737373]">Revenue share by primary channel</p>
            </div>

            <div className="space-y-4">
              {channels.map((ch, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#171717]">{ch.name}</span>
                    <span className="font-mono text-[#737373]">{ch.revenue} ({ch.pct})</span>
                  </div>
                  {/* Clean Horizontal Progress Bar */}
                  <div className="w-full h-2 bg-[#F1F1EF] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5B5CE2] rounded-full" style={{ width: ch.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E5E2] flex items-center justify-between text-xs">
            <span className="text-[#737373]">Blended ROAS</span>
            <span className="font-bold text-[#2E9B68] font-mono">4.82x</span>
          </div>
        </div>

      </div>

      {/* WHAT CHANGED (PRODUCT OBSERVATIONS) */}
      <div className="mi-card space-y-4">
        <div className="pb-3 border-b border-[#E5E5E2]">
          <h3 className="font-sans font-bold text-base text-[#171717]">What Changed</h3>
          <p className="text-xs text-[#737373]">Automated performance observations over the last 7 days</p>
        </div>

        <div className="space-y-3">
          {observations.map((obs, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#F8F8F6] border border-[#E5E5E2] flex items-start gap-3">
              <div className={`mt-0.5 ${obs.type === 'positive' ? 'text-[#2E9B68]' : 'text-[#C78A24]'}`}>
                {obs.type === 'positive' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
              <p className="text-xs font-sans text-[#171717] font-medium leading-relaxed">
                {obs.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TOP CAMPAIGNS SUMMARY TABLE */}
      <div className="mi-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2]">
          <div>
            <h3 className="font-sans font-bold text-base text-[#171717]">Top Campaigns</h3>
            <p className="text-xs text-[#737373]">Highest revenue contributing initiatives</p>
          </div>
          <button 
            onClick={() => onNavigate('campaigns')}
            className="text-xs font-semibold text-[#5B5CE2] hover:underline flex items-center gap-1"
          >
            <span>View all campaigns</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="mi-table">
            <thead>
              <tr>
                <th>CAMPAIGN</th>
                <th>CHANNEL</th>
                <th>SPEND</th>
                <th>REVENUE</th>
                <th>ROAS</th>
                <th className="text-right">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {topCampaigns.map((row, idx) => (
                <tr key={idx} className="cursor-pointer" onClick={() => onNavigate('campaigns')}>
                  <td className="font-semibold text-[#171717]">{row.name}</td>
                  <td className="font-mono text-[#737373]">{row.channel}</td>
                  <td className="font-mono text-[#171717]">{row.spend}</td>
                  <td className="font-bold text-[#171717]">{row.revenue}</td>
                  <td className="font-bold text-[#2E9B68] font-mono">{row.roas}</td>
                  <td className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F0FBF5] text-[#2E9B68] font-mono text-[11px] font-semibold border border-[#2E9B68]/20">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
