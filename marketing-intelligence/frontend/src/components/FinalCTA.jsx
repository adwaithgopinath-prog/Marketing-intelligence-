import React from 'react';
import { ArrowRight, Sparkles, LayoutDashboard, Zap } from 'lucide-react';

export default function FinalCTA({ onLaunchApp }) {
  return (
    <section className="py-32 relative overflow-hidden bg-[#050608] border-t border-white/10">
      {/* Background Watermark */}
      <div className="bg-watermark top-10 left-1/2 transform -translate-x-1/2 opacity-20 select-none text-center">
        DECISIONS
      </div>

      <div className="editorial-container relative z-10 text-center max-w-5xl mx-auto">
        {/* Editorial Badge */}
        <div className="editorial-badge mb-8 mx-auto">
          <span className="badge-dot" />
          <span>START FREE TRIAL TODAY</span>
        </div>

        {/* Large Editorial Headline */}
        <h2 className="font-display font-extrabold text-5xl sm:text-7xl xl:text-8xl uppercase text-white tracking-tighter leading-[0.9] mb-8">
          STOP GUESSING. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4800] via-[#ff7700] to-amber-400">
            START KNOWING.
          </span>
        </h2>

        {/* Subtext */}
        <p className="font-sans text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed mb-12">
          Turn your marketing data into high-confidence strategic decisions you can act on instantly.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <button 
            onClick={onLaunchApp}
            className="btn-editorial-primary text-lg py-5 px-10 flex items-center gap-3 shadow-2xl shadow-[#ff4800]/40"
          >
            <LayoutDashboard size={22} />
            <span>Launch Live App Free</span>
            <ArrowRight size={20} />
          </button>

          <a 
            href="#product" 
            className="btn-editorial-secondary text-lg py-5 px-10"
          >
            <span>Explore Intelligence Engine</span>
          </a>
        </div>

        {/* Guarantee bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-gray-400">
          <span>✓ NO CREDIT CARD REQUIRED</span>
          <span>✓ 14-DAY FULL ACCESS</span>
          <span>✓ REAL-TIME RENDER BACKEND CONNECTED</span>
        </div>
      </div>
    </section>
  );
}
