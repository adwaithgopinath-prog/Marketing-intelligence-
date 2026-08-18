import React from 'react';
import { Layers, Activity, Users } from 'lucide-react';

export default function ProductOverviewSection() {
  return (
    <section id="product" className="section-spacing bg-[#070a12]">
      <div className="site-container">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="eyebrow-pill">
            PRODUCT OVERVIEW
          </div>
          <h2 className="heading-section mb-5">
            ONE PLACE FOR YOUR <br />
            <span className="text-[#5ee7ff]">MARKETING INTELLIGENCE.</span>
          </h2>
          <p className="text-subheading">
            A single unified interface to track every dollar spent, every impression served, and every revenue milestone achieved.
          </p>
        </div>

        {/* Large Centered Dashboard Interface */}
        <div className="product-frame p-6 sm:p-8 bg-[#0d1320] border border-white/[0.1] rounded-2xl mb-16 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6 text-xs font-mono text-gray-400">
            <span className="font-bold text-white">INTELLIGENCE DASHBOARD</span>
            <span>REAL-TIME INGESTION ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#070a12] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-xs font-mono text-gray-400">ATTRIBUTED REVENUE</span>
              <div className="text-2xl font-bold text-white mt-1">₹84,240</div>
              <span className="text-xs font-mono text-emerald-400 mt-1 block">+18.6% vs last month</span>
            </div>
            <div className="bg-[#070a12] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-xs font-mono text-gray-400">TOTAL AD SPEND</span>
              <div className="text-2xl font-bold text-white mt-1">₹17,480</div>
              <span className="text-xs font-mono text-sky-400 mt-1 block">Within target budget</span>
            </div>
            <div className="bg-[#070a12] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-xs font-mono text-gray-400">BLENDED ROAS</span>
              <div className="text-2xl font-bold text-white mt-1">4.82x</div>
              <span className="text-xs font-mono text-emerald-400 mt-1 block">+0.6x baseline</span>
            </div>
            <div className="bg-[#070a12] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-xs font-mono text-gray-400">CUSTOMER CAC</span>
              <div className="text-2xl font-bold text-white mt-1">₹2,550</div>
              <span className="text-xs font-mono text-emerald-400 mt-1 block">-8.4% lower CAC</span>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="bg-[#070a12] p-5 rounded-xl border border-white/[0.08] h-48 sm:h-64 relative flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
              <path d="M0,130 Q120,100 240,50 T480,25 L500,15" fill="none" stroke="#4f7cff" strokeWidth="3" />
              <path d="M0,130 Q120,100 240,50 T480,25 L500,15 L500,150 L0,150 Z" fill="rgba(79,124,255,0.15)" />
            </svg>
          </div>
        </div>

        {/* Three Aligned Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-[#0d1320] border border-white/[0.08]">
            <div className="w-9 h-9 rounded-lg bg-[#4f7cff]/15 text-[#5ee7ff] flex items-center justify-center mb-4">
              <Layers size={18} />
            </div>
            <h3 className="font-sans font-bold text-base text-white mb-2">Campaigns</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Track campaign performance across Search, Social, and CRM channels in one normalized view.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0d1320] border border-white/[0.08]">
            <div className="w-9 h-9 rounded-lg bg-[#4f7cff]/15 text-[#5ee7ff] flex items-center justify-center mb-4">
              <Activity size={18} />
            </div>
            <h3 className="font-sans font-bold text-base text-white mb-2">Performance</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Verify real return-on-ad-spend (ROAS) and customer acquisition cost (CAC) without multi-counting.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0d1320] border border-white/[0.08]">
            <div className="w-9 h-9 rounded-lg bg-[#4f7cff]/15 text-[#5ee7ff] flex items-center justify-center mb-4">
              <Users size={18} />
            </div>
            <h3 className="font-sans font-bold text-base text-white mb-2">Customers</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Analyze buyer sentiment and customer feedback trends automatically ingested from reviews.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
