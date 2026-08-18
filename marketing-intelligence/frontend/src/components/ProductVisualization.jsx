import React, { useState, useRef } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  MessageSquare, 
  Activity, 
  Zap, 
  ArrowUpRight, 
  Target, 
  DollarSign, 
  Layers,
  ChevronRight
} from 'lucide-react';

export default function ProductVisualization({ activeStep = 0 }) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 6, y: -8 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 3D tilt calculation
    const rotX = (-y / rect.height) * 14;
    const rotY = (x / rect.width) * 16;
    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 6, y: -8 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-container relative w-full py-6 select-none"
    >
      {/* Glow aura behind 3D visual */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4800]/20 via-transparent to-sky-500/10 rounded-3xl filter blur-3xl opacity-60 pointer-events-none transform -rotate-3 scale-95" />

      {/* Main 3D Card Container */}
      <div 
        className="floating-3d-card relative bg-[#0e1017]/90 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Subtle grid line texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Dashboard Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="font-mono text-xs text-gray-400 ml-2">LIVE DEMO — BRAND INTELLIGENCE MATRIX</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#ff4800]/15 border border-[#ff4800]/30 text-[#ff4800] font-mono text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800] animate-ping" />
              LIVE INGESTION
            </span>
          </div>
        </div>

        {/* Top Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 relative z-10">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 transition-all hover:border-[#ff4800]/40">
            <div className="text-gray-400 text-xs font-heading font-medium flex items-center justify-between">
              <span>ROAS Multiplier</span>
              <DollarSign size={14} className="text-[#ff4800]" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">4.82x</div>
            <div className="text-emerald-400 text-[11px] font-mono flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +34.2% YoY
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 transition-all hover:border-sky-500/40">
            <div className="text-gray-400 text-xs font-heading font-medium flex items-center justify-between">
              <span>Conversion Rate</span>
              <Target size={14} className="text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">3.48%</div>
            <div className="text-sky-400 text-[11px] font-mono flex items-center gap-1 mt-1">
              <ArrowUpRight size={12} /> +1.2% benchmark
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 transition-all hover:border-emerald-500/40">
            <div className="text-gray-400 text-xs font-heading font-medium flex items-center justify-between">
              <span>Sentiment Index</span>
              <Activity size={14} className="text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">88.4%</div>
            <div className="text-emerald-400 text-[11px] font-mono flex items-center gap-1 mt-1">
              <Sparkles size={12} /> High Sentiment
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 transition-all hover:border-purple-500/40">
            <div className="text-gray-400 text-xs font-heading font-medium flex items-center justify-between">
              <span>Reviews Scanned</span>
              <MessageSquare size={14} className="text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">14.2K</div>
            <div className="text-purple-400 text-[11px] font-mono flex items-center gap-1 mt-1">
              <Layers size={12} /> 4 Channels
            </div>
          </div>
        </div>

        {/* Central Analytics Curve + Floating Graphic */}
        <div className="relative bg-[#06080d] border border-white/10 rounded-xl p-5 mb-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-heading font-bold text-sm text-white">REVENUE TRAJECTORY VS CAMPAIGN SPEND</h4>
              <p className="text-xs text-gray-400 font-sans">Multi-channel cross-attribution engine</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4800]" /> Revenue ($128.4K)
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Ad Spend ($26.6K)
              </span>
            </div>
          </div>

          {/* SVG Line Graph */}
          <div className="w-full h-44 sm:h-52 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4800" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ff4800" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />

              {/* Spend Curve */}
              <path 
                d="M0,130 Q100,120 200,110 T400,90 T500,80" 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="2" 
                strokeDasharray="4 2"
              />
              <path 
                d="M0,130 Q100,120 200,110 T400,90 T500,80 L500,180 L0,180 Z" 
                fill="url(#spendGrad)" 
              />

              {/* Revenue Curve */}
              <path 
                d="M0,140 Q100,110 200,60 T400,35 T500,15" 
                fill="none" 
                stroke="#ff4800" 
                strokeWidth="3.5" 
              />
              <path 
                d="M0,140 Q100,110 200,60 T400,35 T500,15 L500,180 L0,180 Z" 
                fill="url(#revenueGrad)" 
              />

              {/* Glowing Data Nodes */}
              <circle cx="200" cy="60" r="5" fill="#ff4800" className="animate-ping" />
              <circle cx="200" cy="60" r="4" fill="#ffffff" />
              <circle cx="400" cy="35" r="5" fill="#ff4800" />
              <circle cx="500" cy="15" r="5" fill="#ff4800" />
            </svg>
          </div>
        </div>

        {/* Floating AI Insight Banner */}
        <div className="bg-gradient-to-r from-[#ff4800]/20 via-[#121520] to-sky-500/20 border border-[#ff4800]/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-20 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ff4800] flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <Zap size={16} />
            </div>
            <div>
              <div className="text-xs font-mono text-[#ff4800] uppercase font-bold tracking-wider">AI AUTOMATED OPPORTUNITY</div>
              <p className="text-xs sm:text-sm font-sans font-medium text-white">
                "Paid Search generates <strong className="text-emerald-400">28% higher lead quality</strong> than Social at 14% lower CAC."
              </p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold text-white transition-colors flex items-center gap-1 self-end sm:self-auto">
            <span>Execute Action</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
