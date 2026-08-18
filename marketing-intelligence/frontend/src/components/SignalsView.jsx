import React, { useState } from 'react';
import { Radio, AlertCircle, TrendingUp, Clock, ArrowRight, X, ShieldAlert, Lightbulb, Zap, CheckCircle2 } from 'lucide-react';

export default function SignalsView() {
  const [filter, setFilter] = useState('All');
  const [selectedSignal, setSelectedSignal] = useState(null);

  const signals = [
    {
      id: 1,
      type: 'CRITICAL',
      title: 'Meta Retargeting CPA Spike',
      channel: 'Meta Ads',
      changed: 'CPA increased from ₹742 to ₹1,084.',
      magnitude: '+46%',
      time: '2h ago',
      why: 'Creative asset B hit audience saturation threshold after 14 days in active rotation.',
      evidence: 'CPA: ₹742 → ₹1,084 | Click-through rate: 2.4% → 1.1% | Impressions: 42,100',
      action: 'Reduce retargeting daily budget cap by 15% and rotate to creative variant C.',
      color: 'border-[#D95757]/30 bg-[#FDF2F2]/30 text-[#D95757]',
      badge: 'bg-[#FDF2F2] text-[#D95757] border-[#D95757]/20'
    },
    {
      id: 2,
      type: 'OPPORTUNITY',
      title: 'Google Search Scaling Potential',
      channel: 'Google Ads',
      changed: 'ROAS increased from 3.2x to 5.1x.',
      magnitude: '+59%',
      time: '1h ago',
      why: 'Search intent quality improved following the latest exact-match keyword refinement.',
      evidence: 'ROAS: 3.2x → 5.1x | Conversion Rate: 4.2% → 6.8% | CPC: ₹42 → ₹28',
      action: 'Increase exact-match campaign daily budget by +₹5,000 to capture remaining search volume.',
      color: 'border-[#2E9B68]/30 bg-[#F0FBF5]/30 text-[#2E9B68]',
      badge: 'bg-[#F0FBF5] text-[#2E9B68] border-[#2E9B68]/20'
    },
    {
      id: 3,
      type: 'WATCH',
      title: 'LinkedIn B2B Conversion Lag',
      channel: 'LinkedIn Ads',
      changed: 'Spend increased 31% while conversions increased only 4%.',
      magnitude: '31% Spend Drift',
      time: '3h ago',
      why: 'Campaign audience expansion included lower-tier job titles outside primary decision-maker ICP.',
      evidence: 'Spend: ₹18.4K → ₹24.5K | Lead Volume: 92 → 96 | CPL: ₹200 → ₹255',
      action: 'Tighten job title targeting parameters to VP level and above.',
      color: 'border-[#C78A24]/30 bg-[#FEF9F0]/30 text-[#C78A24]',
      badge: 'bg-[#FEF9F0] text-[#C78A24] border-[#C78A24]/20'
    }
  ];

  const filteredSignals = filter === 'All' ? signals : signals.filter(s => s.type.toLowerCase() === filter.toLowerCase());

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-6 font-sans">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5E2] pb-6">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
            Signals
          </h1>
          <p className="text-sm text-[#737373] mt-1 font-sans">
            Important changes across your marketing.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 bg-[#F1F1EF] p-1 rounded-lg">
          {['All', 'Critical', 'Opportunity', 'Watch'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                filter === f 
                  ? 'bg-white text-[#171717] shadow-xs font-semibold' 
                  : 'text-[#737373] hover:text-[#171717]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* SIGNAL CARDS STREAM */}
      <div className="space-y-4">
        {filteredSignals.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedSignal(item)}
            className="mi-card hover:bg-[#F8F8F6] cursor-pointer transition-colors space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#E5E5E2] pb-3">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-bold border ${item.badge}`}>
                  {item.type}
                </span>
                <h3 className="font-sans font-bold text-base text-[#171717]">{item.title}</h3>
                <span className="text-xs font-mono text-[#737373] hidden sm:inline-block">• {item.channel}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#737373]">
                <span>{item.time}</span>
                <ArrowRight size={14} className="text-[#5B5CE2]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div>
                <span className="text-[11px] font-mono text-[#737373] uppercase block">WHAT CHANGED</span>
                <span className="font-semibold text-[#171717]">{item.changed}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#737373] uppercase block">MAGNITUDE</span>
                <span className="font-mono font-bold text-[#5B5CE2]">{item.magnitude}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#737373] uppercase block">RECOMMENDED ACTION</span>
                <span className="text-[#737373] truncate block">{item.action}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SIGNAL DETAIL MODAL */}
      {selectedSignal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E2] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl animate-modal font-sans">
            
            <div className="flex items-center justify-between border-b border-[#E5E5E2] pb-4">
              <div>
                <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-bold border ${selectedSignal.badge}`}>
                  {selectedSignal.type}
                </span>
                <h2 className="font-sans font-bold text-xl text-[#171717] mt-2">{selectedSignal.title}</h2>
              </div>
              <button onClick={() => setSelectedSignal(null)} className="text-[#737373] hover:text-[#171717]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#E5E5E2]">
                <span className="text-[11px] font-mono font-bold text-[#5B5CE2] uppercase block mb-1">
                  WHAT CHANGED
                </span>
                <p className="text-xs text-[#171717] font-semibold">{selectedSignal.changed}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#E5E5E2]">
                <span className="text-[11px] font-mono font-bold text-[#C78A24] uppercase block mb-1">
                  WHY IT MATTERS
                </span>
                <p className="text-xs text-[#171717]">{selectedSignal.why}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#E5E5E2]">
                <span className="text-[11px] font-mono font-bold text-[#737373] uppercase block mb-1">
                  EVIDENCE
                </span>
                <p className="text-xs font-mono text-[#171717]">{selectedSignal.evidence}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0FBF5] border border-[#2E9B68]/30">
                <span className="text-[11px] font-mono font-bold text-[#2E9B68] uppercase block mb-1">
                  RECOMMENDED ACTION
                </span>
                <p className="text-xs text-[#171717] font-semibold">{selectedSignal.action}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E5E2] text-right">
              <button onClick={() => setSelectedSignal(null)} className="btn-mi-primary text-xs">
                Acknowledge Signal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
