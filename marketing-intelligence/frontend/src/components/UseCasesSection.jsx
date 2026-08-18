import React, { useState } from 'react';

export default function UseCasesSection() {
  const [activeTab, setActiveTab] = useState('PERFORMANCE');

  const tabs = [
    {
      id: 'PERFORMANCE',
      label: 'PERFORMANCE',
      title: 'Real-Time ROAS & Margin Tracking',
      desc: 'Monitor real gross revenue versus total ad spend across Google, Meta, and LinkedIn without waiting for end-of-month reconciliation.',
      metric: '₹84,240 Rev • 4.82x ROAS'
    },
    {
      id: 'CAMPAIGNS',
      label: 'CAMPAIGNS',
      title: 'Cross-Channel Campaign Optimization',
      desc: 'Compare campaign performance side-by-side to instantly identify ad fatigue, high CAC channels, and budget reallocation opportunities.',
      metric: '4 Active Campaigns • 14.2% Growth'
    },
    {
      id: 'CUSTOMERS',
      label: 'CUSTOMERS',
      title: 'Customer Review & Sentiment Stream',
      desc: 'Ingest customer feedback across Google Reviews, Trustpilot, and Yelp to map product friction directly to conversion drops.',
      metric: '14,290 Reviews Scanned • 84% Positive'
    },
    {
      id: 'REPORTING',
      label: 'REPORTING',
      title: 'Automated Executive Dispatch & Reports',
      desc: 'Generate executive summary reports in seconds with zero manual data entry or spreadsheet stitching required.',
      metric: '100% Automated Attribution'
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <section id="use-cases" className="section-spacing bg-[#070a12]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="eyebrow-pill">
            USE CASES & CAPABILITIES
          </div>
          <h2 className="heading-section mb-5">
            TAILORED FOR EVERY <br />
            <span className="text-[#5ee7ff]">GROWTH NEED.</span>
          </h2>
          <p className="text-subheading">
            Select a capability to see how Marketing Intelligence transforms raw metrics into focused execution.
          </p>
        </div>

        {/* Tab Buttons Row */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2.5 rounded-lg font-mono text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-[#4f7cff] text-white shadow-lg'
                  : 'bg-[#0d1320] text-gray-400 border border-white/[0.08] hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ONE Large Visualization View matching active tab */}
        <div className="product-frame p-8 bg-[#0d1320] border border-white/[0.1] rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-mono text-[#5ee7ff] uppercase font-bold tracking-wider block mb-2">
                {currentTab.label} MODULE
              </span>
              <h3 className="font-sans font-bold text-2xl text-white mb-4">
                {currentTab.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans mb-6">
                {currentTab.description}
              </p>

              <div className="p-3.5 rounded-lg bg-[#070a12] border border-white/[0.08] text-xs font-mono text-[#4f7cff] font-semibold">
                SYSTEM STATUS: {currentTab.metric}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#070a12] border border-white/[0.08] rounded-xl p-6 h-64 flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span>{currentTab.label} STREAM PREVIEW</span>
                <span className="text-emerald-400 font-bold">LIVE METRIC</span>
              </div>

              <div className="w-full h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                  <path d="M0,100 Q120,70 240,40 T480,20 L500,10" fill="none" stroke="#4f7cff" strokeWidth="3" />
                  <circle cx="240" cy="40" r="4" fill="#5ee7ff" />
                </svg>
              </div>

              <div className="text-xs font-mono text-gray-400 text-right">
                UPDATED REAL-TIME
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
