import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  DollarSign, 
  Target, 
  Users, 
  BarChart2, 
  ChevronRight,
  Zap,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ProductDashboardVisual({ onLaunchApp }) {
  const [activeChannel, setActiveChannel] = useState('All');

  return (
    <div className="relative w-full select-none perspective-3d pt-4">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-gradient-to-tr from-[#4f7cff]/20 via-[#38bdf8]/15 to-transparent rounded-full filter blur-[90px] pointer-events-none" />

      {/* Main Layered 3D Dashboard Composition */}
      <div className="product-tilt relative w-full bg-[#0b1020]/95 border border-white/[0.12] rounded-2xl p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="font-mono text-xs text-gray-400 font-medium ml-2 hidden sm:inline">
              MARKETING OVERVIEW — LIVE INTELLIGENCE ENGINE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#4f7cff]/15 border border-[#4f7cff]/30 text-[#5ee7ff] font-mono text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5ee7ff] animate-pulse" />
              REAL-TIME SYNC
            </span>
          </div>
        </div>

        {/* Hero Revenue Stat Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 items-end">
          <div className="md:col-span-6">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1">
              TOTAL ATTRIBUTED REVENUE
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                ₹84,240
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                <TrendingUp size={12} /> +18.6%
              </span>
            </div>
          </div>

          {/* Channel Selector Pills */}
          <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-1.5 overflow-x-auto">
            {['All', 'Google Ads', 'Meta', 'LinkedIn', 'Organic'].map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all whitespace-nowrap ${
                  activeChannel === ch
                    ? 'bg-[#4f7cff] text-white shadow-md shadow-[#4f7cff]/30'
                    : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Elegant SVG Area Chart */}
        <div className="relative bg-[#070a14] border border-white/[0.08] rounded-xl p-5 mb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4 text-xs font-mono text-gray-400">
            <span>PERFORMANCE TRAJECTORY (LAST 30 DAYS)</span>
            <span className="text-[#5ee7ff] font-semibold">ATTRIBUTION VELOCITY: HIGH</span>
          </div>

          <div className="w-full h-44 sm:h-52 relative">
            <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartBlueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f7cff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4f7cff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="chartCyanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5ee7ff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#5ee7ff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="45" x2="500" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="0" y1="135" x2="500" y2="135" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />

              {/* Spend Baseline Path */}
              <path 
                d="M0,120 Q120,110 240,95 T480,75 L500,70" 
                fill="none" 
                stroke="#5ee7ff" 
                strokeWidth="2" 
                strokeDasharray="4 2"
              />
              <path 
                d="M0,120 Q120,110 240,95 T480,75 L500,70 L500,180 L0,180 Z" 
                fill="url(#chartCyanGrad)" 
              />

              {/* Revenue Growth Path */}
              <path 
                d="M0,135 Q100,105 200,60 T400,30 L500,15" 
                fill="none" 
                stroke="#4f7cff" 
                strokeWidth="3.5" 
              />
              <path 
                d="M0,135 Q100,105 200,60 T400,30 L500,15 L500,180 L0,180 Z" 
                fill="url(#chartBlueGrad)" 
              />

              {/* Glowing Data Dots */}
              <circle cx="200" cy="60" r="5" fill="#5ee7ff" className="animate-ping" />
              <circle cx="200" cy="60" r="4" fill="#ffffff" />
              <circle cx="400" cy="30" r="4" fill="#4f7cff" />
            </svg>
          </div>
        </div>

        {/* Overlapping Floating Small Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          
          {/* Card 1: ROAS */}
          <div className="bg-[#101626]/90 border border-white/[0.1] rounded-xl p-4 shadow-lg hover:border-[#4f7cff]/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
              <span>ROAS</span>
              <DollarSign size={14} className="text-[#4f7cff]" />
            </div>
            <div className="text-2xl font-bold font-sans text-white">4.82x</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp size={10} /> +0.6x target
            </div>
          </div>

          {/* Card 2: CONVERSION RATE */}
          <div className="bg-[#101626]/90 border border-white/[0.1] rounded-xl p-4 shadow-lg hover:border-[#5ee7ff]/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
              <span>CONVERSION RATE</span>
              <Target size={14} className="text-[#5ee7ff]" />
            </div>
            <div className="text-2xl font-bold font-sans text-white">7.42%</div>
            <div className="text-[11px] font-mono text-[#5ee7ff] mt-1 flex items-center gap-1">
              <ArrowUpRight size={10} /> +1.4% optimization
            </div>
          </div>

          {/* Card 3: QUALIFIED LEADS */}
          <div className="bg-[#101626]/90 border border-white/[0.1] rounded-xl p-4 shadow-lg hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
              <span>QUALIFIED LEADS</span>
              <Users size={14} className="text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-sans text-white">1,284</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp size={10} /> High intent
            </div>
          </div>

        </div>

        {/* AI Insight Highlight Card */}
        <div className="bg-gradient-to-r from-[#4f7cff]/20 via-[#101626] to-[#5ee7ff]/20 border border-[#4f7cff]/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4f7cff] flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#5ee7ff] uppercase font-bold tracking-wider block">
                AI INSIGHT
              </span>
              <p className="text-xs sm:text-sm font-sans font-medium text-white">
                "Paid Search is outperforming Social by <strong className="text-emerald-400">28%</strong> this week."
              </p>
            </div>
          </div>

          <button 
            onClick={onLaunchApp}
            className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold text-white transition-colors flex items-center gap-1 self-end sm:self-auto"
          >
            <span>View insight</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
