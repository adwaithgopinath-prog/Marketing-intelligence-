import React from 'react';
import { ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';

export default function FinalCTA({ onLaunchApp }) {
  return (
    <section className="py-24 relative overflow-hidden bg-[#070a12] border-t border-white/[0.08]">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4f7cff]/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
        
        {/* Eyebrow */}
        <div className="eyebrow-badge mb-6 mx-auto">
          <Sparkles size={13} />
          <span>START YOUR FREE TRIAL</span>
        </div>

        {/* Headline */}
        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
          CONNECT YOUR DATA IN MINUTES. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#5ee7ff] to-[#4f7cff]">
            GET INTELLIGENCE INSTANTLY.
          </span>
        </h2>

        {/* Subtext */}
        <p className="font-sans text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-normal leading-relaxed mb-8">
          Unify your campaigns, customer reviews, and competitor signals into one real-time product interface.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={onLaunchApp}
            className="btn-primary-blue text-base py-3.5 px-8 flex items-center gap-2"
          >
            <LayoutDashboard size={18} />
            <span>Launch Product Free</span>
            <ArrowRight size={16} />
          </button>

          <a 
            href="#hero"
            className="btn-secondary-dark text-base py-3.5 px-8"
          >
            <span>Back to top</span>
          </a>
        </div>

        {/* Trust pill */}
        <div className="mt-12 text-xs font-mono text-gray-400">
          <span>✓ NO CREDIT CARD REQUIRED</span>
          <span className="mx-3">•</span>
          <span>✓ INSTANT RENDER BACKEND SYNC</span>
        </div>

      </div>
    </section>
  );
}
