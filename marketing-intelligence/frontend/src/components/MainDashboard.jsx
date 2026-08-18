import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  ChevronDown, 
  Plus, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MessageSquare,
  X
} from 'lucide-react';

export default function MainDashboard({ 
  projects, 
  newProjectName, 
  setNewProjectName, 
  handleCreateProject, 
  reviews, 
  insights 
}) {
  const [timeframe, setTimeframe] = useState('30D');
  const [showAddModal, setShowAddModal] = useState(false);

  const kpis = [
    { label: 'REVENUE', value: '₹84,240', change: '+18.6%', isPositive: true },
    { label: 'ROAS', value: '4.82x', change: '+12.4%', isPositive: true },
    { label: 'CONVERSIONS', value: '1,284', change: '+9.8%', isPositive: true },
    { label: 'CAC', value: '₹842', change: '-6.2%', isPositive: true },
  ];

  const campaignList = [
    { name: 'Summer Acquisition Q3', channel: 'Google Search', spend: '₹12,400', revenue: '₹61,200', roas: '4.94x', status: 'Active' },
    { name: 'Brand Awareness Campaign', channel: 'Meta Ads', spend: '₹8,200', revenue: '₹31,400', roas: '3.82x', status: 'Active' },
    { name: 'B2B Executive Targeting', channel: 'LinkedIn', spend: '₹4,500', revenue: '₹18,900', roas: '4.20x', status: 'Active' },
    { name: 'Organic Intent Funnel', channel: 'SEO / Organic', spend: '₹1,500', revenue: '₹10,500', roas: '7.00x', status: 'Passive' },
  ];

  const channelMix = [
    { name: 'Google Ads', spend: '₹12,400', revenue: '₹61,200', roas: '4.94x', share: '45%' },
    { name: 'Meta Ads', spend: '₹8,200', revenue: '₹31,400', roas: '3.82x', share: '30%' },
    { name: 'LinkedIn', spend: '₹4,500', revenue: '₹18,900', roas: '4.20x', share: '15%' },
    { name: 'Organic', spend: '₹1,500', revenue: '₹10,500', roas: '7.00x', share: '10%' },
  ];

  const activities = [
    { id: 1, text: 'AI detected unusual CPA increase on Meta Retargeting', time: '2 minutes ago', type: 'warning' },
    { id: 2, text: 'Google Ads campaign "Summer Acquisition" exceeded ROAS target (4.94x)', time: '18 minutes ago', type: 'success' },
    { id: 3, text: 'New campaign dataset connected and synced with backend', time: '1 hour ago', type: 'info' },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8 animate-fadeIn">
      
      {/* HEADER ROW */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-[#a3a3a3] uppercase font-bold tracking-wider block mb-1">
            OVERVIEW
          </span>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-[#171717]">
            Good morning, Alex
          </h1>
          <p className="text-xs text-[#737373] mt-1 font-sans">
            Here's what's happening across your marketing today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-app-secondary text-xs">
            <span>Last 30 days</span>
            <ChevronDown size={14} className="text-[#737373]" />
          </button>

          <button 
            onClick={() => setShowAddModal(!showAddModal)}
            className="btn-app-primary text-xs"
          >
            <Plus size={14} />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* NEW CAMPAIGN INLINE FORM */}
      {showAddModal && (
        <div className="app-card border-[#2563eb]/40 bg-[#eff6ff]/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-sans font-bold text-sm text-[#171717]">Add New Campaign</h3>
            <button onClick={() => setShowAddModal(false)} className="text-[#737373] hover:text-[#171717]">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleCreateProject} className="flex gap-3">
            <input 
              type="text"
              placeholder="Campaign or brand name..."
              className="flex-1 bg-white border border-[#e7e7e4] rounded-lg px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#2563eb]"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <button type="submit" className="btn-app-primary text-xs">
              Save Campaign
            </button>
          </form>
        </div>
      )}

      {/* FEATURED HERO BANNER */}
      <div className="app-card bg-[#171717] text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[#2563eb] uppercase font-bold tracking-widest block">
              MARKETING INTELLIGENCE
            </span>
            <h2 className="font-sans font-bold text-xl sm:text-2xl text-white">
              Your marketing performance, at a glance.
            </h2>
            <div className="flex items-center gap-6 pt-2 font-sans text-xs">
              <div>
                <span className="text-[#a3a3a3] block">Active Campaigns</span>
                <span className="font-bold text-white text-base">12 campaigns</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <span className="text-[#a3a3a3] block">Attributed Revenue</span>
                <span className="font-bold text-white text-base">₹84,240</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <span className="text-[#a3a3a3] block">Blended ROAS</span>
                <span className="font-bold text-emerald-400 text-base">4.82x</span>
              </div>
            </div>
          </div>

          {/* Inline mini graph */}
          <div className="w-full md:w-64 h-20 bg-white/5 rounded-xl border border-white/10 p-3">
            <div className="text-[10px] font-mono text-[#a3a3a3] flex justify-between">
              <span>30-DAY TRAJECTORY</span>
              <span className="text-emerald-400">+18.6%</span>
            </div>
            <div className="w-full h-12 relative mt-1">
              <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                <path d="M0,45 Q50,35 100,20 T200,5" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                <circle cx="100" cy="20" r="3" fill="#60a5fa" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* KPI GRID (4 IDENTICAL CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="app-card">
            <span className="text-[11px] font-mono text-[#737373] uppercase font-semibold block mb-2">
              {kpi.label}
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-sans font-bold text-2xl text-[#171717]">
                {kpi.value}
              </span>
              <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                kpi.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PERFORMANCE CARD (LEFT - LARGE CHART) */}
        <div className="lg:col-span-8 app-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e7e7e4]">
            <div>
              <h3 className="font-sans font-bold text-base text-[#171717]">Performance</h3>
              <p className="text-xs text-[#737373]">Revenue & conversion trends across all integrated channels</p>
            </div>

            {/* Timeframe switch */}
            <div className="flex items-center gap-1 bg-[#f1f1ef] p-1 rounded-lg">
              {['7D', '30D', '90D'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                    timeframe === t ? 'bg-white text-[#171717] shadow-sm' : 'text-[#737373] hover:text-[#171717]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Line Chart */}
          <div className="w-full h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="500" y2="50" stroke="#f0f0ed" strokeDasharray="3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#f0f0ed" strokeDasharray="3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f0f0ed" strokeDasharray="3" />

              <path d="M0,150 Q120,110 240,60 T480,25 L500,15" fill="none" stroke="#2563eb" strokeWidth="3" />
              <path d="M0,165 Q120,135 240,95 T480,60 L500,45" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="240" cy="60" r="4" fill="#2563eb" />
            </svg>
          </div>

          <div className="flex items-center gap-6 pt-2 text-xs font-mono text-[#737373]">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2563eb]" /> Revenue (₹84,240)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#93c5fd]" /> Ad Spend (₹17,480)
            </span>
          </div>
        </div>

        {/* AI INSIGHTS CARD (RIGHT) */}
        <div className="lg:col-span-4 app-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#e7e7e4] mb-4">
              <h3 className="font-sans font-bold text-base text-[#171717] flex items-center gap-2">
                <Sparkles size={16} className="text-[#2563eb]" />
                AI Insights
              </h3>
              <span className="text-[11px] font-mono text-[#737373]">3 SIGNALS</span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#f7f7f5] border border-[#e7e7e4]">
                <span className="text-[11px] font-mono font-bold text-emerald-600 uppercase block mb-1">
                  ↑ Paid Search
                </span>
                <p className="text-xs font-sans text-[#171717] font-medium leading-relaxed mb-2">
                  "Paid Search generated 28% more qualified leads this week while spend increased only 8%."
                </p>
                <button className="text-[11px] font-sans font-semibold text-[#2563eb] hover:underline flex items-center gap-1">
                  <span>View insight</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7f7f5] border border-[#e7e7e4]">
                <span className="text-[11px] font-mono font-bold text-amber-600 uppercase block mb-1">
                  ↓ Meta Ads
                </span>
                <p className="text-xs font-sans text-[#171717] font-medium leading-relaxed mb-2">
                  "Cost-per-acquisition (CPA) increased 12% over the last 7 days due to creative ad fatigue."
                </p>
                <button className="text-[11px] font-sans font-semibold text-[#2563eb] hover:underline flex items-center gap-1">
                  <span>View insight</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e7e7e4] text-right">
            <span className="text-xs text-[#737373]">Real-time model accuracy 98.4%</span>
          </div>
        </div>

      </div>

      {/* CAMPAIGN PERFORMANCE TABLE */}
      <div className="app-card space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#e7e7e4]">
          <div>
            <h3 className="font-sans font-bold text-base text-[#171717]">Top Campaigns</h3>
            <p className="text-xs text-[#737373]">Performance breakdown across active marketing initiatives</p>
          </div>
          <span className="text-xs font-mono text-[#737373]">{campaignList.length} CAMPAIGNS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e7e7e4] text-xs font-mono text-[#737373]">
                <th className="pb-3 px-2 font-medium">CAMPAIGN</th>
                <th className="pb-3 px-2 font-medium">CHANNEL</th>
                <th className="pb-3 px-2 font-medium">SPEND</th>
                <th className="pb-3 px-2 font-medium">REVENUE</th>
                <th className="pb-3 px-2 font-medium">ROAS</th>
                <th className="pb-3 px-2 font-medium text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ed] text-xs font-sans">
              {campaignList.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#f7f7f5] transition-colors">
                  <td className="py-3.5 px-2 font-semibold text-[#171717]">{row.name}</td>
                  <td className="py-3.5 px-2 text-[#737373] font-mono">{row.channel}</td>
                  <td className="py-3.5 px-2 text-[#171717] font-mono">{row.spend}</td>
                  <td className="py-3.5 px-2 text-[#171717] font-bold">{row.revenue}</td>
                  <td className="py-3.5 px-2 text-emerald-600 font-bold">{row.roas}</td>
                  <td className="py-3.5 px-2 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-mono text-[11px] font-semibold">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CHANNEL MIX & RECENT ACTIVITY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CHANNEL MIX CARD */}
        <div className="lg:col-span-6 app-card space-y-4">
          <div className="pb-3 border-b border-[#e7e7e4]">
            <h3 className="font-sans font-bold text-base text-[#171717]">Channel Mix</h3>
            <p className="text-xs text-[#737373]">Acquisition spend vs revenue contribution</p>
          </div>

          <div className="space-y-3">
            {channelMix.map((ch, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#f7f7f5]">
                <div>
                  <span className="font-bold text-xs text-[#171717] block">{ch.name}</span>
                  <span className="text-[11px] font-mono text-[#737373]">Spend: {ch.spend}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-emerald-600 block">ROAS {ch.roas}</span>
                  <span className="text-[11px] font-mono text-[#737373]">{ch.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY CARD */}
        <div className="lg:col-span-6 app-card space-y-4">
          <div className="pb-3 border-b border-[#e7e7e4]">
            <h3 className="font-sans font-bold text-base text-[#171717]">Recent Activity</h3>
            <p className="text-xs text-[#737373]">Live audit trail of system events and alerts</p>
          </div>

          <div className="space-y-3">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#f7f7f5]">
                <Clock size={15} className="text-[#2563eb] mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-sans text-[#171717] font-medium">{act.text}</p>
                  <span className="text-[10px] font-mono text-[#737373] block mt-0.5">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
