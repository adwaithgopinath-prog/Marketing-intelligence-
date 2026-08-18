import React from 'react';
import { ArrowRight, Sparkles, LayoutDashboard, ShieldCheck, Play, Activity } from 'lucide-react';
import ProductVisualization from './ProductVisualization';

export default function Hero({ onLaunchApp }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center">
      {/* Background Oversized Typography Watermark */}
      <div className="bg-watermark top-16 -left-10 opacity-30 select-none">
        MARKETING
      </div>
      <div className="bg-watermark bottom-0 right-0 opacity-20 select-none">
        DECISIONS
      </div>

      <div className="editorial-container">
        {/* Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Oversized Editorial Typography */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Status / Category Tag */}
            <div className="editorial-badge mb-6">
              <span className="badge-dot" />
              <span>MARKETING INTELLIGENCE ENGINE V2</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl xl:text-7xl tracking-tighter text-white leading-[0.92] uppercase mb-8">
              TURN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                MARKETING DATA
              </span> <br />
              INTO BETTER <br />
              <span className="text-[#ff4800] underline decoration-[#ff4800]/40 underline-offset-8">
                DECISIONS.
              </span>
            </h1>

            {/* Subtext */}
            <p className="font-sans text-lg sm:text-xl text-gray-300 max-w-xl font-normal leading-relaxed mb-10">
              Stop drowning in fragmented metrics. Ingest reviews, track competitor shifts, and surface high-confidence strategic moves in real-time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button 
                onClick={onLaunchApp}
                className="btn-editorial-primary text-base py-4 px-8"
              >
                <LayoutDashboard size={20} />
                <span>Launch Live Dashboard</span>
                <ArrowRight size={18} />
              </button>

              <a 
                href="#story" 
                className="btn-editorial-secondary text-base py-4 px-8"
              >
                <Play size={16} fill="currentColor" />
                <span>Product Story</span>
              </a>
            </div>

            {/* Key Statistics Ticker */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full">
              <div>
                <div className="font-display font-bold text-2xl text-white">14.2K+</div>
                <div className="font-mono text-xs text-gray-400 uppercase mt-0.5">Reviews Ingested</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-emerald-400">+28%</div>
                <div className="font-mono text-xs text-gray-400 uppercase mt-0.5">Lead Efficiency</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-sky-400">&lt;100ms</div>
                <div className="font-mono text-xs text-gray-400 uppercase mt-0.5">Insight Latency</div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: 3D Product Visualization */}
          <div className="lg:col-span-6 z-10">
            <ProductVisualization />
          </div>

        </div>
      </div>
    </section>
  );
}
