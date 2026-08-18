import React, { useState } from 'react';
import { BarChart2, TrendingUp, Filter, ArrowUpRight } from 'lucide-react';

export default function CampaignAnalyticsSection() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const campaignData = [
    { name: 'Search_Brand_Exact_Q3', platform: 'Google Ads', spend: '₹6,400', revenue: '₹35,200', conversions: 420, roas: '5.50x', status: 'High Yield' },
    { name: 'Meta_Retargeting_LTV_V2', platform: 'Meta', spend: '₹4,800', revenue: '₹16,320', conversions: 280, roas: '3.40x', status: 'Optimal' },
    { name: 'B2B_Exec_Decision_Makers', platform: 'LinkedIn', spend: '₹3,200', revenue: '₹13,120', conversions: 94, roas: '4.10x', status: 'Scaling' },
    { name: 'SEO_Organic_Intent_Blog', platform: 'Organic', spend: '₹1,500', revenue: '₹10,500', conversions: 190, roas: '7.00x', status: 'Passive' },
  ];

  return (
    <section id="analytics" className="py-24 relative overflow-hidden bg-[#0b1020] border-t border-white/[0.08]">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#5ee7ff]/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="eyebrow-badge mb-4">
            <BarChart2 size={13} />
            <span>CAMPAIGN ATTRIBUTION DEEP DIVE</span>
          </div>
          
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-5">
            UNDERSTAND <br />
            <span className="text-[#5ee7ff]">WHAT CHANGED.</span>
          </h2>
          
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            Track exact week-over-week performance shifts. See which campaigns deliver high-intent customers and which waste budget.
          </p>
        </div>

        {/* Campaign Performance Table & Interactive Graph */}
        <div className="product-card p-6 sm:p-8 bg-[#101626]/90 border border-white/[0.1] rounded-2xl">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
            <div>
              <h3 className="font-sans font-bold text-lg text-white">Active Campaign Matrix</h3>
              <p className="text-xs font-mono text-gray-400 mt-0.5">Real-time spend vs return attribution</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              {['All', 'High Yield', 'Scaling'].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                    selectedFilter === f 
                      ? 'bg-[#4f7cff] text-white' 
                      : 'bg-white/[0.04] text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Graph Display */}
          <div className="bg-[#070a14] border border-white/[0.08] rounded-xl p-5 mb-8">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-3">
              <span>WEEKLY ROAS TREND BY CHANNEL</span>
              <span className="text-emerald-400">AVERAGE ROAS: 4.82x</span>
            </div>

            {/* Interactive SVG Chart */}
            <div className="w-full h-40 sm:h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <path d="M0,120 Q120,90 240,40 T480,20 L500,10" fill="none" stroke="#4f7cff" strokeWidth="3" />
                <path d="M0,130 Q120,110 240,80 T480,50 L500,40" fill="none" stroke="#5ee7ff" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="240" cy="40" r="5" fill="#4f7cff" className="animate-pulse" />
                <circle cx="480" cy="20" r="5" fill="#5ee7ff" />
              </svg>
            </div>
          </div>

          {/* Campaign Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs font-mono text-gray-400">
                  <th className="pb-3 px-2 font-medium">CAMPAIGN</th>
                  <th className="pb-3 px-2 font-medium">PLATFORM</th>
                  <th className="pb-3 px-2 font-medium">SPEND</th>
                  <th className="pb-3 px-2 font-medium">REVENUE</th>
                  <th className="pb-3 px-2 font-medium">CONVERSIONS</th>
                  <th className="pb-3 px-2 font-medium">ROAS</th>
                  <th className="pb-3 px-2 font-medium text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-sm">
                {campaignData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-2 font-sans font-semibold text-white">{row.name}</td>
                    <td className="py-4 px-2 font-mono text-xs text-gray-300">{row.platform}</td>
                    <td className="py-4 px-2 font-mono text-xs text-gray-300">{row.spend}</td>
                    <td className="py-4 px-2 font-sans font-bold text-white">{row.revenue}</td>
                    <td className="py-4 px-2 font-mono text-xs text-gray-300">{row.conversions}</td>
                    <td className="py-4 px-2 font-sans font-bold text-emerald-400">{row.roas}</td>
                    <td className="py-4 px-2 text-right">
                      <span className="px-2.5 py-1 rounded bg-[#4f7cff]/15 text-[#5ee7ff] font-mono text-[11px] font-semibold">
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
    </section>
  );
}
