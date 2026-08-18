import React, { useState } from 'react';
import { ArrowRight, ChevronDown, X } from 'lucide-react';

export default function SignalsView() {
  const [filter, setFilter] = useState('All');
  const [selectedSignal, setSelectedSignal] = useState(null);

  const signals = [
    {
      id: 1,
      type: 'Critical',
      title: 'Meta Retargeting CPA Spike',
      channel: 'Meta Ads',
      changed: 'CPA increased from ₹742 to ₹1,084.',
      magnitude: '+46%',
      time: '2h ago',
      why: 'Creative asset B hit audience saturation threshold after 14 days in active rotation.',
      evidence: 'CPA: ₹742 → ₹1,084 | Click-through rate: 2.4% → 1.1% | Impressions: 42,100',
      action: 'Reduce retargeting daily budget cap by 15% and rotate to creative variant C.'
    },
    {
      id: 2,
      type: 'Opportunity',
      title: 'Google Search Scaling Potential',
      channel: 'Google Ads',
      changed: 'ROAS increased from 3.2x to 5.1x.',
      magnitude: '+59%',
      time: '1h ago',
      why: 'Search intent quality improved following the latest exact-match keyword refinement.',
      evidence: 'ROAS: 3.2x → 5.1x | Conversion Rate: 4.2% → 6.8% | CPC: ₹42 → ₹28',
      action: 'Increase exact-match campaign daily budget by +₹5,000 to capture remaining search volume.'
    },
    {
      id: 3,
      type: 'Watch',
      title: 'LinkedIn B2B Conversion Lag',
      channel: 'LinkedIn Ads',
      changed: 'Spend increased 31% while conversions increased only 4%.',
      magnitude: '31% Drift',
      time: '3h ago',
      why: 'Campaign audience expansion included lower-tier job titles outside primary decision-maker ICP.',
      evidence: 'Spend: ₹18.4K → ₹24.5K | Lead Volume: 92 → 96 | CPL: ₹200 → ₹255',
      action: 'Tighten job title targeting parameters to VP level and above.'
    }
  ];

  const filteredSignals = filter === 'All' ? signals : signals.filter(s => s.type.toLowerCase() === filter.toLowerCase());

  return (
    <div className="bg-[#F7F7F5] min-h-full font-sans">
      <div className="max-w-[1200px] mx-auto px-10 py-10 space-y-12">
        
        {/* PAGE HEADER */}
        <div className="flex items-end justify-between border-b border-[#E6E6E3] pb-6">
          <div>
            <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
              Signals
            </h1>
            <p className="text-sm text-[#737373] mt-1 font-sans">
              Important changes across your marketing.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-white border border-[#E6E6E3] px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#171717] hover:bg-[#F1F1EF] transition-colors">
            <span>Last 7 days</span>
            <ChevronDown size={14} className="text-[#737373]" />
          </button>
        </div>

        {/* ONE FEATURED SIGNAL SURFACE */}
        <div className="bg-white border border-[#E6E6E3] rounded-2xl p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#5B5CE2] font-semibold tracking-wider uppercase">
              FEATURED SIGNAL
            </span>
            <span className="text-xs font-mono text-[#737373]">2h ago</span>
          </div>

          <div className="space-y-2">
            <h2 className="font-sans font-bold text-2xl text-[#171717]">
              CPA increased 46% on Meta Retargeting
            </h2>
            <p className="text-sm text-[#737373] font-sans max-w-xl leading-relaxed">
              Cost per acquisition drifted from ₹742 to ₹1,084 following audience creative saturation.
            </p>
          </div>

          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-3xl font-bold font-sans text-[#171717]">₹1,084</span>
            <span className="text-xs font-mono font-semibold text-[#D95757] bg-[#FDF2F2] px-2 py-0.5 rounded border border-[#D95757]/20">
              +46% vs previous week (was ₹742)
            </span>
          </div>

          <div className="pt-4 border-t border-[#E6E6E3]">
            <button 
              onClick={() => setSelectedSignal(signals[0])}
              className="text-xs font-semibold text-[#5B5CE2] hover:underline inline-flex items-center gap-1.5"
            >
              <span>View analysis</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ALL SIGNALS LIST (SIMPLE ROWS, NOT CARDS IN CARDS) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6E6E3]">
            <h3 className="font-sans font-semibold text-sm text-[#171717]">All Signals</h3>
            <div className="flex items-center gap-2">
              {['All', 'Critical', 'Opportunity', 'Watch'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    filter === f ? 'bg-white border border-[#E6E6E3] text-[#171717] font-semibold' : 'text-[#737373] hover:text-[#171717]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E6E6E3] rounded-2xl divide-y divide-[#E6E6E3] overflow-hidden shadow-xs">
            {filteredSignals.map((sig) => (
              <div 
                key={sig.id}
                onClick={() => setSelectedSignal(sig)}
                className="p-5 flex items-center justify-between hover:bg-[#F8F8F6] cursor-pointer transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#171717]">{sig.title}</span>
                    <span className="text-xs font-mono text-[#737373]">• {sig.channel}</span>
                  </div>
                  <p className="text-xs text-[#737373]">{sig.changed}</p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono font-semibold text-[#5B5CE2]">{sig.magnitude}</span>
                  <span className="text-xs font-mono text-[#737373]">{sig.time}</span>
                  <ArrowRight size={14} className="text-[#A1A1A1]" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MINIMAL ANALYSIS MODAL */}
      {selectedSignal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E6E6E3] rounded-2xl w-full max-w-xl p-8 space-y-6 shadow-2xl animate-modal font-sans">
            <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-4">
              <div>
                <span className="text-xs font-mono text-[#5B5CE2] font-semibold uppercase">{selectedSignal.channel}</span>
                <h3 className="font-sans font-bold text-xl text-[#171717] mt-0.5">{selectedSignal.title}</h3>
              </div>
              <button onClick={() => setSelectedSignal(null)} className="text-[#737373] hover:text-[#171717]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-mono text-[#737373] uppercase font-bold block mb-1">WHAT CHANGED</span>
                <p className="text-[#171717] font-semibold">{selectedSignal.changed}</p>
              </div>

              <div>
                <span className="font-mono text-[#737373] uppercase font-bold block mb-1">WHY IT MATTERS</span>
                <p className="text-[#737373] leading-relaxed">{selectedSignal.why}</p>
              </div>

              <div>
                <span className="font-mono text-[#737373] uppercase font-bold block mb-1">RECOMMENDED ACTION</span>
                <p className="text-[#5B5CE2] font-semibold leading-relaxed">{selectedSignal.action}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E6E3] flex justify-end">
              <button onClick={() => setSelectedSignal(null)} className="btn-mi-primary text-xs">
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
