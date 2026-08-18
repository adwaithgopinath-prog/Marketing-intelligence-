import React, { useState } from 'react';
import { Zap, Sparkles, CheckCircle2, ArrowRight, Lightbulb, ShieldAlert, Cpu, Bot } from 'lucide-react';

export default function AIInsightsSection({ onLaunchApp }) {
  const [executed, setExecuted] = useState(false);

  return (
    <section id="insights" className="py-28 relative overflow-hidden bg-[#07080c]">
      {/* Background Oversized Typography Watermark */}
      <div className="bg-watermark -bottom-10 -left-10 opacity-20 select-none">
        DATA
      </div>

      <div className="editorial-container">
        
        {/* Section Headline */}
        <div className="max-w-4xl mb-16 text-center mx-auto">
          <div className="editorial-badge mb-6 mx-auto">
            <span className="badge-dot" />
            <span>AI SYNTHESIS ENGINE</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase text-white tracking-tight leading-[0.95] mb-6">
            YOUR DATA <br />
            <span className="text-[#ff4800]">ALREADY KNOWS</span> <br />
            WHAT TO DO NEXT.
          </h2>

          <p className="font-sans text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Our LLM engine synthesizes thousands of customer touchpoints into clear, prioritized executive actions.
          </p>
        </div>

        {/* Dramatic AI Insight Showcase Card */}
        <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0f121d] to-[#08090d] border border-[#ff4800]/40 shadow-[0_20px_80px_rgba(255,72,0,0.15)] relative">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff4800] flex items-center justify-center text-white shadow-lg shadow-[#ff4800]/30">
                <Bot size={22} />
              </div>
              <div>
                <span className="font-mono text-xs text-[#ff4800] font-bold uppercase tracking-widest block">
                  HIGH-PRIORITY SIGNAL DETECTED
                </span>
                <h3 className="font-heading font-bold text-lg text-white">Cross-Channel Lead Attribution Anomaly</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
                <Sparkles size={14} /> 98.4% Confidence Score
              </span>
            </div>
          </div>

          {/* Central Quote Statement */}
          <div className="bg-[#050609] border border-white/10 rounded-2xl p-6 sm:p-8 mb-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#ff4800] to-amber-500" />
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
              "Paid Search is generating <span className="text-[#ff4800]">28% more qualified leads</span> than Social despite <span className="text-emerald-400">14% lower total spend</span>."
            </p>
          </div>

          {/* 3 Breakdown Columns: WHY IT MATTERS / WHAT CHANGED / WHAT TO DO NEXT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            {/* Column 1 */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#ff4800] font-bold uppercase tracking-wider mb-3">
                  <Lightbulb size={16} /> 01. WHY IT MATTERS
                </div>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  Your current paid social campaigns suffer from high ad fatigue and dropping intent. Search intent demonstrates 3.2x higher conversion velocity.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-3">
                  <ShieldAlert size={16} /> 02. WHAT CHANGED
                </div>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  Competitor B reduced bidding on primary keywords over the past 72 hours, dropping average CPC from $4.10 down to $2.85.
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-3">
                  <Zap size={16} /> 03. WHAT TO DO NEXT
                </div>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  Reallocate $4,500/month from Instagram retargeting into Google Exact Match Search keywords to capture $38,000 net incremental pipeline.
                </p>
              </div>
            </div>

          </div>

          {/* Action Execution Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="text-xs font-mono text-gray-400">
              STATUS: <strong className={executed ? 'text-emerald-400' : 'text-amber-400'}>
                {executed ? 'RECOMMENDATION EXECUTED & LOGGED' : 'AWAITING DISPATCH'}
              </strong>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => setExecuted(!executed)}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-heading text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  executed 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-[#ff4800] text-white hover:bg-[#ff5714] shadow-lg shadow-[#ff4800]/30'
                }`}
              >
                {executed ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Action Applied to Pipeline</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    <span>Auto-Execute Budget Shift</span>
                  </>
                )}
              </button>

              <button 
                onClick={onLaunchApp}
                className="btn-editorial-secondary text-sm py-3 px-5 whitespace-nowrap"
              >
                <span>View All AI Signals</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
