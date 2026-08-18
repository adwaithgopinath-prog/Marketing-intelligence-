import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function SignalsPage() {
  const [timeframe, setTimeframe] = useState('7D');

  const criticalSignals = [
    { title: 'Meta CPA increased 14%', desc: 'Cost per acquisition drift on mobile feed set B', time: '38m ago' },
    { title: 'Ad fatigue threshold reached', desc: 'Click-through rate dropped from 2.4% to 1.1%', time: '2h ago' },
    { title: 'Conversion drop on mobile placement', desc: 'Bounce rate spiked 8% on iOS traffic', time: '5h ago' },
  ];

  const opportunities = [
    { title: 'Reallocate Instagram budget to Search', impact: '+₹14.2K potential' },
    { title: 'Expand LinkedIn targeting to CTOs', impact: '+24% lead volume' },
    { title: 'Optimize schedule for peak hours', impact: '-12% spend waste' },
  ];

  const watchlist = [
    { title: 'Retargeting frequency cap', status: 'Stable' },
    { title: 'Brand keyword competition', status: 'Low Risk' },
    { title: 'Organic blog search share', status: 'Monitoring' },
  ];

  return (
    <div className="bg-[#F7F7F5] min-h-full">
      
      {/* CENTERING CONTAINER (Max-width 1200px, 32px 40px 64px padding) */}
      <div className="max-w-[1200px] mx-auto px-10 py-8 space-y-8 font-sans">
        
        {/* PAGE HEADER */}
        <div className="flex items-end justify-between border-b border-[#E6E6E3] pb-6">
          <div>
            <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
              Signals
            </h1>
            <p className="text-sm text-[#737373] mt-1 font-sans">
              Important changes and opportunities across your marketing.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-white border border-[#E6E6E3] px-3 py-1.5 rounded-lg text-xs font-medium text-[#171717] hover:bg-[#F1F1EF] transition-colors">
            <span>Last 7 days</span>
            <ChevronDown size={14} className="text-[#737373]" />
          </button>
        </div>

        {/* FEATURED MODULE (ONE SINGLE SURFACE) */}
        <div className="module-surface space-y-6">
          
          <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-4">
            <span className="text-xs font-mono font-semibold text-[#5B5CE2] uppercase tracking-wider">
              SIGNAL
            </span>
            <span className="text-xs font-mono text-[#2FA36B] font-semibold">HIGH CONFIDENCE</span>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#171717] tracking-tight max-w-2xl leading-tight">
              "Paid Search is outperforming your other acquisition channels."
            </h2>
            <p className="text-sm text-[#737373] font-sans max-w-2xl leading-relaxed">
              Search campaigns generated 32% higher returns over the last 7 days while cost-per-click dropped on core exact match keywords.
            </p>
          </div>

          {/* Integrated Chart & Metric (NO nested cards!) */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#737373] block">BLENDED ROAS</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-bold font-sans text-[#171717]">4.82x</span>
                <span className="text-xs font-mono font-semibold text-[#2FA36B]">+32% vs last week</span>
              </div>
            </div>

            {/* Clean Line Chart Integrated inside Module Surface */}
            <div className="w-full sm:w-72 h-16">
              <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                <path d="M0,50 Q75,40 150,20 T300,5" fill="none" stroke="#5B5CE2" strokeWidth="2.5" />
                <circle cx="150" cy="20" r="3" fill="#5B5CE2" />
              </svg>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E6E6E3]">
            <a href="#campaigns" className="text-xs font-semibold text-[#5B5CE2] hover:underline inline-flex items-center gap-1">
              <span>View campaign</span>
              <ArrowRight size={14} />
            </a>
          </div>

        </div>

        {/* LOWER GRID: EXACTLY 3 MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* MODULE 1: Critical Signals */}
          <div className="module-surface flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-[#E6E6E3] mb-4">
                <h3 className="font-sans font-semibold text-sm text-[#171717]">Critical Signals</h3>
              </div>

              <div className="space-y-4">
                {criticalSignals.map((sig, idx) => (
                  <div key={idx} className="pb-3 border-b border-[#E6E6E3] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#171717]">{sig.title}</span>
                      <span className="text-[11px] font-mono text-[#737373]">{sig.time}</span>
                    </div>
                    <p className="text-xs text-[#737373] mt-1">{sig.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MODULE 2: Opportunities */}
          <div className="module-surface flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-[#E6E6E3] mb-4">
                <h3 className="font-sans font-semibold text-sm text-[#171717]">Opportunities</h3>
              </div>

              <div className="space-y-4">
                {opportunities.map((opp, idx) => (
                  <div key={idx} className="pb-3 border-b border-[#E6E6E3] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#171717]">{opp.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#2FA36B] font-medium block mt-1">
                      {opp.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MODULE 3: Watchlist */}
          <div className="module-surface flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-[#E6E6E3] mb-4">
                <h3 className="font-sans font-semibold text-sm text-[#171717]">Watchlist</h3>
              </div>

              <div className="space-y-4">
                {watchlist.map((item, idx) => (
                  <div key={idx} className="pb-3 border-b border-[#E6E6E3] last:border-0 last:pb-0 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#171717]">{item.title}</span>
                    <span className="text-[11px] font-mono text-[#737373]">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
