import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, ChevronRight, X } from 'lucide-react';

export default function PerformanceView() {
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCampaignDetail, setActiveCampaignDetail] = useState(null);

  const campaigns = [
    { id: 1, name: 'Search_Brand_Exact_Q3', channel: 'Google Ads', spend: '₹48,200', revenue: '₹2,64,000', roas: '5.47x', conversions: '412', cac: '₹116', trend: '+14%', isPositive: true, status: 'Active', objective: 'Lead Gen' },
    { id: 2, name: 'Retargeting_LTV_Audience', channel: 'Meta Ads', spend: '₹32,100', revenue: '₹1,28,000', roas: '3.98x', conversions: '284', cac: '₹113', trend: '-8%', isPositive: false, status: 'Active', objective: 'Conversions' },
    { id: 3, name: 'Exec_DecisionMakers_InMail', channel: 'LinkedIn Ads', spend: '₹24,500', revenue: '₹1,08,000', roas: '4.40x', conversions: '96', cac: '₹255', trend: '+22%', isPositive: true, status: 'Active', objective: 'Lead Gen' },
    { id: 4, name: 'Search_Competitor_Keywords', channel: 'Google Ads', spend: '₹18,400', revenue: '₹74,000', roas: '4.02x', conversions: '142', cac: '₹129', trend: '+4%', isPositive: true, status: 'Active', objective: 'Acquisition' },
    { id: 5, name: 'Lookalike_Top_Purchasers', channel: 'Meta Ads', spend: '₹14,200', revenue: '₹42,000', roas: '2.95x', conversions: '88', cac: '₹161', trend: '-15%', isPositive: false, status: 'Attention', objective: 'Prospecting' },
    { id: 6, name: 'Organic_Tech_Documentation', channel: 'Organic SEO', spend: '₹4,500', revenue: '₹38,000', roas: '8.44x', conversions: '180', cac: '₹25', trend: '+31%', isPositive: true, status: 'Active', objective: 'Organic' },
  ];

  const filteredCampaigns = campaigns.filter(c => {
    const matchesChannel = selectedChannel === 'All' || c.channel.toLowerCase().includes(selectedChannel.toLowerCase());
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.channel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-6 font-sans">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5E2] pb-6">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
            Performance
          </h1>
          <p className="text-sm text-[#737373] mt-1 font-sans">
            Understand which campaigns are creating efficient growth.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1A1]" />
            <input 
              type="text"
              placeholder="Filter campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-[#E5E5E2] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#171717] focus:outline-none focus:border-[#5B5CE2]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#F1F1EF] p-1 rounded-lg">
            {['All', 'Google', 'Meta', 'LinkedIn'].map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChannel(ch)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedChannel === ch 
                    ? 'bg-white text-[#171717] shadow-xs font-semibold' 
                    : 'text-[#737373] hover:text-[#171717]'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CAMPAIGN PERFORMANCE TABLE */}
      <div className="mi-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="mi-table">
            <thead>
              <tr>
                <th>CAMPAIGN</th>
                <th>CHANNEL</th>
                <th>SPEND</th>
                <th>REVENUE</th>
                <th>ROAS</th>
                <th>CONVERSIONS</th>
                <th>CAC</th>
                <th>TREND</th>
                <th className="text-right">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => setActiveCampaignDetail(row)}
                  className="cursor-pointer hover:bg-[#F8F8F6] transition-colors"
                >
                  <td className="font-semibold text-[#171717]">{row.name}</td>
                  <td className="font-mono text-[#737373]">{row.channel}</td>
                  <td className="font-mono text-[#171717]">{row.spend}</td>
                  <td className="font-bold text-[#171717]">{row.revenue}</td>
                  <td className="font-bold text-[#2E9B68] font-mono">{row.roas}</td>
                  <td className="font-mono text-[#171717]">{row.conversions}</td>
                  <td className="font-mono text-[#737373]">{row.cac}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1 font-mono text-xs font-semibold ${
                      row.isPositive ? 'text-[#2E9B68]' : 'text-[#D95757]'
                    }`}>
                      {row.isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {row.trend}
                    </span>
                  </td>
                  <td className="text-right">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold border ${
                      row.status === 'Active' ? 'bg-[#F0FBF5] text-[#2E9B68] border-[#2E9B68]/20' : 'bg-[#FEF9F0] text-[#C78A24] border-[#C78A24]/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CAMPAIGN DETAIL WORKSPACE MODAL (REQUIREMENT 16) */}
      {activeCampaignDetail && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E2] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl animate-modal">
            <div className="flex items-center justify-between border-b border-[#E5E5E2] pb-4">
              <div>
                <span className="text-xs font-mono text-[#5B5CE2] font-semibold uppercase">{activeCampaignDetail.channel}</span>
                <h2 className="font-sans font-bold text-xl text-[#171717] mt-0.5">{activeCampaignDetail.name}</h2>
              </div>
              <button onClick={() => setActiveCampaignDetail(null)} className="text-[#737373] hover:text-[#171717]">
                <X size={20} />
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-[#F8F8F6] border border-[#E5E5E2]">
                <span className="text-[10px] font-mono text-[#737373] uppercase block">REVENUE</span>
                <span className="font-bold text-base text-[#171717]">{activeCampaignDetail.revenue}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F8F8F6] border border-[#E5E5E2]">
                <span className="text-[10px] font-mono text-[#737373] uppercase block">SPEND</span>
                <span className="font-bold text-base text-[#171717]">{activeCampaignDetail.spend}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F8F8F6] border border-[#E5E5E2]">
                <span className="text-[10px] font-mono text-[#737373] uppercase block">ROAS</span>
                <span className="font-bold text-base text-[#2E9B68] font-mono">{activeCampaignDetail.roas}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F8F8F6] border border-[#E5E5E2]">
                <span className="text-[10px] font-mono text-[#737373] uppercase block">CAC</span>
                <span className="font-bold text-base text-[#171717]">{activeCampaignDetail.cac}</span>
              </div>
            </div>

            {/* Detailed Performance Chart */}
            <div className="p-4 rounded-xl border border-[#E5E5E2] space-y-2">
              <span className="text-xs font-mono text-[#737373]">30-DAY CAMPAIGN TRAJECTORY</span>
              <div className="w-full h-40">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <path d="M0,80 Q75,60 150,30 T300,10" fill="none" stroke="#5B5CE2" strokeWidth="2.5" />
                  <circle cx="150" cy="30" r="3.5" fill="#5B5CE2" />
                </svg>
              </div>
            </div>

            {/* Campaign Workspace Tabs */}
            <div className="flex border-b border-[#E5E5E2] text-xs font-medium text-[#737373]">
              {['Overview', 'Performance', 'Audience', 'Creative', 'Attribution', 'Signals'].map((tab, idx) => (
                <button key={tab} className={`px-4 py-2 border-b-2 transition-colors ${idx === 0 ? 'border-[#5B5CE2] text-[#5B5CE2] font-semibold' : 'border-transparent hover:text-[#171717]'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-xs text-[#737373] leading-relaxed">
              Campaign objective set to <strong>{activeCampaignDetail.objective}</strong>. Data synced 2 minutes ago with official provider API.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
