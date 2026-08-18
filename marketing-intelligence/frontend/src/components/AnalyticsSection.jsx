import React from 'react';

export default function AnalyticsSection() {
  return (
    <section id="analytics" className="section-spacing bg-[#070a12]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="eyebrow-pill">
            ANALYTICS & ATTRIBUTION
          </div>
          <h2 className="heading-section mb-5">
            KNOW WHAT IS <br />
            <span className="text-[#5ee7ff]">DRIVING GROWTH.</span>
          </h2>
          <p className="text-subheading">
            Measure true multi-touch revenue attribution across every acquisition channel with zero guesswork.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: ONE Primary Visualization */}
          <div className="lg:col-span-7 bg-[#0d1320] border border-white/[0.08] p-6 rounded-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <span className="font-sans font-bold text-sm text-white">Cross-Channel Revenue vs Spend</span>
              <span className="text-xs font-mono text-gray-400">30-DAY WINDOW</span>
            </div>

            <div className="w-full h-64 sm:h-72 relative">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f7cff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4f7cff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />

                <path d="M0,160 Q120,130 240,70 T480,30 L500,20" fill="none" stroke="#4f7cff" strokeWidth="3.5" />
                <path d="M0,160 Q120,130 240,70 T480,30 L500,20 L500,200 L0,200 Z" fill="url(#analyticsGrad)" />
                <circle cx="240" cy="70" r="5" fill="#5ee7ff" />
              </svg>
            </div>
          </div>

          {/* RIGHT: Supporting Metrics & Insight Statement */}
          <div className="lg:col-span-5 bg-[#0d1320] border border-white/[0.08] p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full">
            <div>
              <h3 className="font-sans font-bold text-lg text-white mb-6">Performance Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-gray-400">REVENUE</span>
                  <span className="font-sans font-bold text-white">₹84,240</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-gray-400">BLENDED ROAS</span>
                  <span className="font-sans font-bold text-emerald-400">4.82x</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-gray-400">CUSTOMER CAC</span>
                  <span className="font-sans font-bold text-white">₹2,550</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-gray-400">TOTAL CONVERSIONS</span>
                  <span className="font-sans font-bold text-white">6,840</span>
                </div>
              </div>
            </div>

            {/* Clear Primary Insight */}
            <div className="p-4 rounded-xl bg-[#4f7cff]/10 border border-[#4f7cff]/30 text-xs font-sans text-gray-300 leading-relaxed">
              <strong className="text-white block mb-1">KEY ATTRIBUTION INSIGHT:</strong>
              Paid Search exact-match keywords are delivering 2.8x higher lifetime value (LTV) than social retargeting campaigns this month.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
