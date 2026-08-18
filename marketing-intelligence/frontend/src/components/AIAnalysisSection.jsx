import React, { useState } from 'react';
import { Sparkles, Zap, Lightbulb, ShieldAlert, ArrowRight, CheckCircle2, Bot } from 'lucide-react';

export default function AIAnalysisSection({ onLaunchApp }) {
  const [actionApplied, setActionApplied] = useState(false);

  return (
    <section id="ai-insights" className="py-24 relative overflow-hidden bg-[#070a12] border-t border-white/[0.08]">
      
      {/* Background Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-80 bg-gradient-to-t from-[#4f7cff]/10 to-transparent pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="eyebrow-badge mb-4">
            <Sparkles size={13} />
            <span>EXECUTIVE SYNTHESIS ENGINE</span>
          </div>
          
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-5">
            INTELLIGENCE, <br />
            <span className="text-[#5ee7ff]">NOT JUST DATA.</span>
          </h2>
          
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            Stop digging through reports. Our AI engine continuously analyzes thousands of datapoints to surface clear strategic decisions.
          </p>
        </div>

        {/* AI Insight Interface Box */}
        <div className="product-card p-6 sm:p-10 bg-[#0b1020] border border-[#4f7cff]/40 rounded-2xl shadow-[0_20px_60px_rgba(79,124,255,0.15)] relative overflow-hidden">
          
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4f7cff] flex items-center justify-center text-white shadow-md shadow-[#4f7cff]/30">
                <Bot size={20} />
              </div>
              <div>
                <span className="font-mono text-xs text-[#5ee7ff] font-bold uppercase tracking-wider block">
                  AI ANALYSIS DISPATCH
                </span>
                <h3 className="font-sans font-bold text-base text-white">Meta Campaign Lead Velocity Signal</h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
              <Sparkles size={13} /> 98.2% Accuracy Model
            </span>
          </div>

          {/* Central AI Signal Text */}
          <div className="bg-[#060811] border border-white/[0.08] rounded-xl p-6 mb-8 relative">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#4f7cff] rounded-l-xl" />
            <p className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
              "Your Meta campaigns generated <span className="text-emerald-400">34% more qualified leads</span> this week while spend increased <span className="text-[#5ee7ff]">only 8%</span>."
            </p>
          </div>

          {/* Structured Analysis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            
            {/* Card 1: WHY IT MATTERS */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5ee7ff] font-bold uppercase mb-2">
                <Lightbulb size={15} /> WHY IT MATTERS
              </div>
              <p className="text-xs sm:text-sm font-sans text-gray-300 leading-relaxed">
                Ad copy iteration #4 resonates strongly with mid-market decision makers, driving a 2.4x higher conversion rate on landing page V2.
              </p>
            </div>

            {/* Card 2: WHAT CHANGED */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#4f7cff] font-bold uppercase mb-2">
                <ShieldAlert size={15} /> WHAT CHANGED
              </div>
              <p className="text-xs sm:text-sm font-sans text-gray-300 leading-relaxed">
                Algorithmic ad set placement optimized toward mobile feeds, reducing cost-per-click from ₹42.10 down to ₹28.40.
              </p>
            </div>

            {/* Card 3: RECOMMENDED ACTION */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase mb-2">
                <Zap size={15} /> RECOMMENDED ACTION
              </div>
              <p className="text-xs sm:text-sm font-sans text-gray-300 leading-relaxed">
                Scale Meta budget by +15% over the next 5 days to capture additional high-intent lead volume before audience saturation.
              </p>
            </div>

          </div>

          {/* Execution Controls Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
            <span className="text-xs font-mono text-gray-400">
              ACTION STATUS: <strong className={actionApplied ? 'text-emerald-400' : 'text-amber-400'}>
                {actionApplied ? 'EXECUTED & SYNCED TO CAMPAIGN' : 'READY FOR AUTOMATED DISPATCH'}
              </strong>
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setActionApplied(!actionApplied)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                  actionApplied
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#4f7cff] text-white hover:bg-[#3b68ff] shadow-md shadow-[#4f7cff]/30'
                }`}
              >
                {actionApplied ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Action Applied</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>Execute Recommendation</span>
                  </>
                )}
              </button>

              <button 
                onClick={onLaunchApp}
                className="btn-secondary-dark text-xs py-2.5 px-4 whitespace-nowrap"
              >
                <span>View Product Workspace</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
