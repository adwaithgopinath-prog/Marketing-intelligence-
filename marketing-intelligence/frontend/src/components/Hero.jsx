import React from 'react';
import { ArrowRight, Play, Sparkles, LayoutDashboard } from 'lucide-react';
import ProductDashboardVisual from './ProductDashboardVisual';

export default function Hero({ onLaunchApp }) {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Asymmetrical Grid: Hero Typography Left, Dominant Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* Small Eyebrow */}
            <div className="eyebrow-badge mb-5">
              <Sparkles size={13} />
              <span>MARKETING INTELLIGENCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-[1.08] mb-6">
              SEE WHAT YOUR <br />
              MARKETING IS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#5ee7ff] to-[#4f7cff]">
                REALLY DOING.
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="font-sans text-base sm:text-lg text-gray-300 max-w-lg font-normal leading-relaxed mb-8">
              Connect your campaigns, channels and customer data into one intelligent view.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button 
                onClick={onLaunchApp}
                className="btn-primary-blue text-sm py-3 px-6"
              >
                <span>Explore Intelligence</span>
                <ArrowRight size={16} />
              </button>

              <a 
                href="#signals"
                className="btn-secondary-dark text-sm py-3 px-6"
              >
                <Play size={14} fill="currentColor" />
                <span>See how it works</span>
              </a>
            </div>

            {/* Trust Metric Row */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center gap-8 text-xs font-mono text-gray-400">
              <div>
                <strong className="text-white text-sm block font-sans">100% Normalized</strong>
                <span>Multi-channel attribution</span>
              </div>
              <div>
                <strong className="text-emerald-400 text-sm block font-sans">Real-time LLM</strong>
                <span>Pattern & anomaly detection</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Dominant Dashboard Visual */}
          <div className="lg:col-span-7 w-full">
            <ProductDashboardVisual onLaunchApp={onLaunchApp} />
          </div>

        </div>

      </div>
    </section>
  );
}
