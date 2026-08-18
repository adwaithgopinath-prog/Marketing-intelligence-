import React from 'react';
import { Sparkles, Lightbulb, ShieldAlert, Zap } from 'lucide-react';

export default function AIIntelligenceSection() {
  return (
    <section id="intelligence" className="section-spacing bg-[#04060c]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="eyebrow-pill">
            AI SYNTHESIS ENGINE
          </div>
          <h2 className="heading-section mb-5">
            DATA TELLS YOU WHAT HAPPENED. <br />
            <span className="text-[#5ee7ff]">INTELLIGENCE TELLS YOU WHY.</span>
          </h2>
          <p className="text-subheading">
            Our LLM engine automatically identifies anomalies, attribution shifts, and growth opportunities across your entire marketing stack.
          </p>
        </div>

        {/* ONE Large Coherent AI Insight Interface */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0d1320] border border-[#4f7cff]/40 shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#4f7cff] flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <span className="font-sans font-bold text-base text-white">AI Executive Dispatch #42</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">HIGH CONFIDENCE (98.4%)</span>
          </div>

          {/* Core AI Statement */}
          <div className="bg-[#070a12] border border-white/[0.08] rounded-xl p-6 mb-8">
            <p className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
              "Paid Search generated <span className="text-emerald-400">28% more qualified leads</span> this week while spend increased <span className="text-[#5ee7ff]">only 8%</span>."
            </p>
          </div>

          {/* Three Structured Parts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5ee7ff] font-bold uppercase mb-2">
                <Lightbulb size={15} /> WHY IT MATTERS
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Search intent demonstrates 3.2x higher conversion velocity than social channels, yielding higher initial order values.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#4f7cff] font-bold uppercase mb-2">
                <ShieldAlert size={15} /> WHAT CHANGED
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Competitor bidding dropped on core exact-match keywords over the past 72 hours, reducing average cost-per-click from ₹42 to ₹28.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase mb-2">
                <Zap size={15} /> WHAT TO DO NEXT
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Reallocate ₹15,000/month from Instagram retargeting into Google Exact Match Search keywords to capture incremental pipeline.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
