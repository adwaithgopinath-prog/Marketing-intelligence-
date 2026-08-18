import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Users, 
  Activity, 
  ArrowUpRight, 
  Layers, 
  Sparkles,
  BarChart3
} from 'lucide-react';

export default function SignalsSection({ onLaunchApp }) {
  return (
    <section id="signals" className="py-24 relative overflow-hidden bg-[#070a12] border-t border-white/[0.08]">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#4f7cff]/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="eyebrow-badge mb-4">
            <Layers size={13} />
            <span>UNIFIED DATA STREAM</span>
          </div>
          
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-5">
            ONE VIEW. <br />
            <span className="text-[#5ee7ff]">EVERY SIGNAL.</span>
          </h2>
          
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            Stop switching between ad accounts and analytics tools. Unify revenue, spend, and customer signals into one real-time product interface.
          </p>
        </div>

        {/* Dense Dashboard UI Representation */}
        <div className="product-card p-6 sm:p-8 bg-[#0b1020] border border-white/[0.1] rounded-2xl">
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs font-mono text-gray-400 block mb-1">REVENUE</span>
              <div className="text-xl font-bold font-sans text-white">₹84,240</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp size={10} /> +18.6%
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs font-mono text-gray-400 block mb-1">SPEND</span>
              <div className="text-xl font-bold font-sans text-white">₹17,480</div>
              <div className="text-[11px] font-mono text-sky-400 mt-1 flex items-center gap-1">
                <Activity size={10} /> Budget cap
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs font-mono text-gray-400 block mb-1">ROAS</span>
              <div className="text-xl font-bold font-sans text-white">4.82x</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp size={10} /> +0.6x target
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs font-mono text-gray-400 block mb-1">CONVERSIONS</span>
              <div className="text-xl font-bold font-sans text-white">6,840</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <ArrowUpRight size={10} /> +14.2%
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs font-mono text-gray-400 block mb-1">CAC</span>
              <div className="text-xl font-bold font-sans text-white">₹2,550</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp size={10} /> -8.4% lower
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
              <span className="text-xs font-mono text-gray-400 block mb-1">CTR</span>
              <div className="text-xl font-bold font-sans text-white">4.12%</div>
              <div className="text-[11px] font-mono text-sky-400 mt-1 flex items-center gap-1">
                <Sparkles size={10} /> Above benchmark
              </div>
            </div>

          </div>

          {/* Unified Channel Attribution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Visual Stream Chart */}
            <div className="lg:col-span-8 bg-[#070a14] border border-white/[0.08] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-sans font-bold text-sm text-white">Multi-Channel Customer Touchpoints</h3>
                <span className="text-xs font-mono text-gray-400">TOUCHPOINTS: 14,290</span>
              </div>

              {/* Stacked Performance Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>GOOGLE SEARCH (EXACT MATCH)</span>
                    <span className="font-bold text-white">₹42,100 Rev (5.5x ROAS)</span>
                  </div>
                  <div className="w-full h-3 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#4f7cff] to-[#5ee7ff] rounded-full w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>META RETARGETING & LOOKALIKE</span>
                    <span className="font-bold text-white">₹22,400 Rev (3.4x ROAS)</span>
                  </div>
                  <div className="w-full h-3 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-[#4f7cff] rounded-full w-[60%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>LINKEDIN B2B INMAIL & SPONSORED</span>
                    <span className="font-bold text-white">₹11,800 Rev (4.1x ROAS)</span>
                  </div>
                  <div className="w-full h-3 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full w-[40%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>ORGANIC & DIRECT TRAFFIC</span>
                    <span className="font-bold text-white">₹7,940 Rev (Infinite ROAS)</span>
                  </div>
                  <div className="w-full h-3 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full w-[25%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="lg:col-span-4 bg-[#070a14] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-bold text-sm text-white mb-2">Live Stream Normalized</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Data from Google Ads, Meta Ads Manager, LinkedIn, and CRM automatically deduplicated in real-time.
                </p>
                <div className="p-3 rounded-lg bg-[#4f7cff]/10 border border-[#4f7cff]/30 text-xs font-mono text-[#5ee7ff]">
                  ✓ Zero data delay
                  <br />
                  ✓ Cross-device identity resolution
                </div>
              </div>

              <button 
                onClick={onLaunchApp}
                className="btn-primary-blue text-xs w-full justify-center py-2.5 mt-4"
              >
                <span>Launch Interactive View</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
