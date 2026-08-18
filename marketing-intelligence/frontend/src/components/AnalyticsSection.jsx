import React, { useState } from 'react';
import { BarChart3, TrendingUp, Filter, Users, ArrowUpRight, DollarSign, Activity } from 'lucide-react';

export default function AnalyticsSection() {
  const [selectedChannel, setSelectedChannel] = useState('All');

  const channels = [
    { name: 'Paid Search', spend: '$12,400', revenue: '$68,200', roas: '5.50x', share: '45%' },
    { name: 'Paid Social', spend: '$9,200', revenue: '$32,100', roas: '3.48x', share: '28%' },
    { name: 'Email / CRM', spend: '$1,800', revenue: '$18,900', roas: '10.50x', share: '16%' },
    { name: 'Organic Search', spend: '$3,200', revenue: '$22,400', roas: '7.00x', share: '11%' },
  ];

  return (
    <section id="analytics" className="py-24 relative overflow-hidden bg-[#090b10]">
      {/* Background Watermark */}
      <div className="bg-watermark top-10 left-1/3 opacity-15 select-none">
        GROWTH
      </div>

      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="editorial-badge mb-4">
            <span className="badge-dot" />
            <span>CROSS-CHANNEL ANALYTICS</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl uppercase text-white tracking-tight leading-none mb-6">
            PRECISION <br />
            <span className="text-[#ff4800]">PERFORMANCE METRICS.</span>
          </h2>
          <p className="font-sans text-gray-400 text-lg">
            No vanity metrics. Deep multi-touch attribution and real-time campaign profitability breakdown.
          </p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Chart Box: Conversion Funnel & Revenue Attribution */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl bg-[#0d0f17]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-white">Conversion Funnel Velocity</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Stage drop-offs & conversion efficiency</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#ff4800]/15 text-[#ff4800] font-mono text-xs font-bold">
                  AVG CONVERSION: 4.82%
                </span>
              </div>
            </div>

            {/* Funnel Visual Stack */}
            <div className="flex flex-col gap-4 mb-8">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>1. TOTAL AD IMPRESSIONS</span>
                  <span className="font-bold text-white">1,420,000</span>
                </div>
                <div className="w-full h-8 bg-white/[0.04] rounded-lg overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg w-full flex items-center justify-end px-3 text-xs font-mono font-bold text-white">
                    100%
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>2. AD CLICKS & LANDINGS</span>
                  <span className="font-bold text-white">142,000 (10.0% CTR)</span>
                </div>
                <div className="w-full h-8 bg-white/[0.04] rounded-lg overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-lg w-[65%] flex items-center justify-end px-3 text-xs font-mono font-bold text-white">
                    65.0%
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>3. PRODUCT CONSIDERATION / INTENT</span>
                  <span className="font-bold text-white">34,100</span>
                </div>
                <div className="w-full h-8 bg-white/[0.04] rounded-lg overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-lg w-[38%] flex items-center justify-end px-3 text-xs font-mono font-bold text-white">
                    38.0%
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>4. COMPLETED TRANSACTIONS</span>
                  <span className="font-bold text-emerald-400">6,840 PURCHASES</span>
                </div>
                <div className="w-full h-8 bg-white/[0.04] rounded-lg overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-[#ff4800] to-[#ff7700] rounded-lg w-[20%] flex items-center justify-end px-3 text-xs font-mono font-bold text-white shadow-lg shadow-[#ff4800]/30">
                    20.0%
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stat Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-gray-400 text-xs font-mono">AVG ORDER VALUE</div>
                <div className="text-xl font-display font-bold text-white mt-1">$142.50</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs font-mono">CUSTOMER CAC</div>
                <div className="text-xl font-display font-bold text-emerald-400">$29.40</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs font-mono">PAYBACK PERIOD</div>
                <div className="text-xl font-display font-bold text-sky-400">18 DAYS</div>
              </div>
            </div>
          </div>

          {/* Right Column: Channel Breakdown Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-[#0d0f17] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <h3 className="font-heading font-bold text-lg text-white">Channel Efficiency Matrix</h3>
                  <BarChart3 size={18} className="text-[#ff4800]" />
                </div>

                {/* Channel List */}
                <div className="flex flex-col gap-4">
                  {channels.map((ch, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#ff4800]/40 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-heading font-bold text-sm text-white">{ch.name}</div>
                        <div className="text-xs font-mono text-gray-400 mt-0.5">
                          Spend: {ch.spend} • Share: {ch.share}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-bold text-lg text-emerald-400">{ch.roas}</div>
                        <div className="text-xs font-mono text-gray-300">Rev: {ch.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Insight Pill */}
              <div className="mt-6 p-4 rounded-xl bg-[#ff4800]/10 border border-[#ff4800]/30 text-xs text-gray-300 flex items-center gap-3">
                <TrendingUp size={20} className="text-[#ff4800] flex-shrink-0" />
                <span>
                  <strong>Recommendation:</strong> Shift 12% of Paid Social budget into Email & Paid Search to maximize gross margin.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
