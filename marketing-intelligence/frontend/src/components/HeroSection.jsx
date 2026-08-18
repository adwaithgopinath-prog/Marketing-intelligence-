import React from 'react';
import { ArrowRight, Play, TrendingUp, DollarSign, Target, Users } from 'lucide-react';

export default function HeroSection({ onLaunchApp }) {
  return (
    <section id="hero" className="pt-36 pb-24 border-b border-white/[0.08] min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="site-container">
        
        {/* Strict 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Hero Copy */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* Small Eyebrow */}
            <div className="eyebrow-pill">
              MARKETING INTELLIGENCE
            </div>

            {/* Headline */}
            <h1 className="heading-hero mb-6">
              SEE WHAT YOUR <br />
              MARKETING IS <br />
              <span className="text-[#5ee7ff]">REALLY DOING.</span>
            </h1>

            {/* Short Paragraph */}
            <p className="text-subheading mb-8">
              Connect your campaigns, channels and customer data into one intelligent view.
            </p>

            {/* Two CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onLaunchApp}
                className="btn-blue-primary"
              >
                <span>Explore Intelligence</span>
                <ArrowRight size={16} />
              </button>

              <a 
                href="#how-it-works"
                className="btn-dark-secondary"
              >
                <Play size={14} fill="currentColor" />
                <span>See how it works</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: ONE SINGLE CLEAN DASHBOARD VISUALIZATION */}
          <div className="lg:col-span-7">
            <div className="product-frame p-6 bg-[#0d1320] border border-white/[0.1] rounded-2xl shadow-2xl">
              
              {/* Dashboard Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-gray-400 ml-2">MARKETING OVERVIEW</span>
                </div>
                <span className="text-xs font-mono text-[#5ee7ff]">LIVE SYSTEM SYNC</span>
              </div>

              {/* Main Revenue Metric */}
              <div className="mb-6">
                <span className="text-xs font-mono text-gray-400 block mb-1">TOTAL ATTRIBUTED REVENUE</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold font-sans text-white">₹84,240</span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">+18.6%</span>
                </div>
              </div>

              {/* Clean Revenue & Spend Chart */}
              <div className="bg-[#070a12] border border-white/[0.08] rounded-xl p-4 mb-6">
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-3">
                  <span>REVENUE TRAJECTORY (30 DAYS)</span>
                  <span className="text-[#4f7cff]">ROAS 4.82x</span>
                </div>
                <div className="w-full h-44 relative">
                  <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="heroBlueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f7cff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#4f7cff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,120 Q120,95 240,55 T480,25 L500,15" fill="none" stroke="#4f7cff" strokeWidth="3" />
                    <path d="M0,120 Q120,95 240,55 T480,25 L500,15 L500,160 L0,160 Z" fill="url(#heroBlueGrad)" />
                    <circle cx="240" cy="55" r="4" fill="#5ee7ff" />
                    <circle cx="480" cy="25" r="4" fill="#4f7cff" />
                  </svg>
                </div>
              </div>

              {/* Clean Metric Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3">
                  <span className="text-[11px] font-mono text-gray-400 block">ROAS</span>
                  <span className="text-lg font-bold text-white mt-0.5 block">4.82x</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3">
                  <span className="text-[11px] font-mono text-gray-400 block">CONVERSION</span>
                  <span className="text-lg font-bold text-white mt-0.5 block">7.42%</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3">
                  <span className="text-[11px] font-mono text-gray-400 block">LEADS</span>
                  <span className="text-lg font-bold text-white mt-0.5 block">1,284</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
