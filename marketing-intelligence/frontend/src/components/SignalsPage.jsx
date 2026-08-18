import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight, 
  Info,
  Clock,
  Sparkles,
  Zap,
  ShieldAlert,
  Lightbulb
} from 'lucide-react';

export default function SignalsPage({ insights, reviews }) {
  const [selectedSignal, setSelectedSignal] = useState(0);

  const summaryMetrics = [
    { label: 'CRITICAL', count: 4, color: 'text-red-600 bg-red-50 border-red-200' },
    { label: 'OPPORTUNITIES', count: 7, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'MONITORING', count: 12, color: 'text-gray-600 bg-gray-50 border-gray-200' },
  ];

  const prioritySignal = {
    title: 'Google Ads ROAS increased 32%',
    description: 'Your Search campaigns generated significantly higher returns over the last 7 days.',
    roas: '4.82x',
    change: '+32%',
    campaignName: 'Search_Brand_Exact_Q3'
  };

  const signalFeed = [
    {
      id: 0,
      icon: TrendingUp,
      iconColor: 'text-emerald-600',
      title: 'Search conversion rate increased',
      desc: 'Conversions are up 18% compared with last week.',
      time: '12 min ago',
      status: 'Positive',
      statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      why: 'Search intent quality improved following the latest landing page update.',
      changed: 'Cost-per-click dropped from ₹42.10 down to ₹28.40 on exact keywords.',
      action: 'Scale search daily budget by +15% over the next 5 days.'
    },
    {
      id: 1,
      icon: TrendingDown,
      iconColor: 'text-amber-600',
      title: 'Meta CPA increased',
      desc: 'Cost per acquisition increased 14% across retargeting audiences.',
      time: '38 min ago',
      status: 'Attention',
      statusColor: 'bg-amber-50 text-amber-600 border-amber-200',
      why: 'Ad creative iteration #2 reached audience saturation threshold after 14 days.',
      changed: 'Click-through rates dropped from 2.4% to 1.1% on mobile feed placement.',
      action: 'Refresh ad copy and replace creative set B with video variant C.'
    },
    {
      id: 2,
      icon: AlertCircle,
      iconColor: 'text-[#2563eb]',
      title: 'New campaign opportunity detected',
      desc: 'Your highest-performing B2B decision maker audience is underutilized.',
      time: '1 hr ago',
      status: 'Opportunity',
      statusColor: 'bg-blue-50 text-[#2563eb] border-blue-200',
      why: 'LinkedIn InMail campaigns yield 3.4x higher LTV buyers than average.',
      changed: 'Daily budget cap reached at 2:00 PM every afternoon.',
      action: 'Increase daily spend cap by ₹3,500 to capture remaining intent.'
    },
    {
      id: 3,
      icon: TrendingUp,
      iconColor: 'text-emerald-600',
      title: 'LinkedIn B2B Conversion Spike',
      desc: 'InMail campaigns generated 42 new qualified decision-maker leads.',
      time: '3 hrs ago',
      status: 'Positive',
      statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      why: 'Executive decision-maker response rates hit a 90-day high.',
      changed: 'Target audience segment expanded to include VP level titles.',
      action: 'Maintain current audience parameters and monitor CPL trend.'
    }
  ];

  const opportunities = [
    { title: 'Reallocate Instagram spend to Google Exact Match', impact: '+₹14.2K Revenue Potential' },
    { title: 'Expand LinkedIn targeting to Mid-Market CTOs', impact: '+24% Lead Volume' },
    { title: 'Optimize Google Ads ad schedule for peak business hours', impact: '-12% Wasted Spend' },
  ];

  const watchlist = [
    { title: 'Meta CPA drift on retargeting audience', status: 'Monitoring' },
    { title: 'Organic blog search impression share', status: 'Stable' },
    { title: 'Google Ads brand keyword competition', status: 'Low Risk' },
  ];

  const activeSignalData = signalFeed[selectedSignal] || signalFeed[0];

  return (
    <div className="p-8 max-w-[1240px] mx-auto space-y-10 animate-fadeIn font-sans">
      
      {/* PAGE TITLE & TOP CONTROLS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#171717]">
            Signals
          </h1>
          <p className="text-sm text-[#737373] mt-1 font-sans">
            Important changes and opportunities across your marketing.
          </p>
        </div>

        <button className="btn-app-secondary text-xs">
          <span>Last 7 days</span>
          <ChevronDown size={14} className="text-[#737373]" />
        </button>
      </div>

      {/* SECTION 1 — SUMMARY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {summaryMetrics.map((item, idx) => (
          <div key={idx} className="app-card border-[#e5e5e2] flex items-center justify-between py-4 px-5">
            <span className="text-xs font-mono font-bold text-[#737373] uppercase tracking-wider">
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold font-mono px-2.5 py-0.5 rounded-md border ${item.color}`}>
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 2 — PRIORITY SIGNAL */}
      <div className="app-card border-[#e5e5e2] space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e2]">
          <span className="text-xs font-mono text-[#2563eb] font-bold uppercase tracking-wider">
            PRIORITY SIGNAL
          </span>
          <span className="text-xs font-mono text-emerald-600 font-semibold">HIGH CONFIDENCE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-sans font-bold text-xl text-[#171717]">
              {prioritySignal.title}
            </h2>
            <p className="text-sm text-[#737373] leading-relaxed font-sans">
              {prioritySignal.description}
            </p>

            <div className="flex items-baseline gap-4 pt-2">
              <div>
                <span className="text-[11px] font-mono text-[#737373] block">CURRENT ROAS</span>
                <span className="text-2xl font-bold text-[#171717]">{prioritySignal.roas}</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                {prioritySignal.change}
              </span>
            </div>

            <div className="pt-2">
              <button className="text-xs font-semibold text-[#2563eb] hover:underline inline-flex items-center gap-1.5">
                <span>View campaign details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Simple Chart */}
          <div className="lg:col-span-5 bg-[#f7f7f5] border border-[#e5e5e2] rounded-xl p-4 h-40 flex flex-col justify-between">
            <div className="flex justify-between text-[11px] font-mono text-[#737373]">
              <span>7-DAY ROAS TRAJECTORY</span>
              <span className="text-emerald-600">4.82x</span>
            </div>
            <div className="w-full h-24 relative">
              <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                <path d="M0,65 Q75,50 150,25 T300,10" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                <circle cx="150" cy="25" r="3.5" fill="#2563eb" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 — SIGNAL FEED */}
      <div className="app-card border-[#e5e5e2] space-y-4">
        <div className="pb-3 border-b border-[#e5e5e2]">
          <h3 className="font-sans font-bold text-base text-[#171717]">Signal Feed</h3>
          <p className="text-xs text-[#737373]">Real-time detection stream ordered by strategic priority</p>
        </div>

        <div className="divide-y divide-[#e5e5e2]">
          {signalFeed.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedSignal === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedSignal(item.id)}
                className={`py-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#f7f7f5] rounded-lg' : 'hover:bg-[#f7f7f5]/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${item.iconColor}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#171717]">{item.title}</h4>
                    <p className="text-xs text-[#737373] mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-[#737373] whitespace-nowrap">{item.time}</span>
                  <span className={`px-2.5 py-0.5 rounded border text-[11px] font-semibold ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4 — OPPORTUNITIES & WATCHLIST (2-COLUMN LAYOUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Opportunities */}
        <div className="lg:col-span-6 app-card border-[#e5e5e2] space-y-4">
          <div className="pb-3 border-b border-[#e5e5e2]">
            <h3 className="font-sans font-bold text-base text-[#171717]">Opportunities</h3>
            <p className="text-xs text-[#737373]">High-yield optimization targets</p>
          </div>

          <div className="space-y-3">
            {opportunities.map((opp, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#f7f7f5] border border-[#e5e5e2] flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-[#171717]">{opp.title}</span>
                <span className="text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {opp.impact}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Watchlist */}
        <div className="lg:col-span-6 app-card border-[#e5e5e2] space-y-4">
          <div className="pb-3 border-b border-[#e5e5e2]">
            <h3 className="font-sans font-bold text-base text-[#171717]">Watchlist</h3>
            <p className="text-xs text-[#737373]">Metrics worth monitoring over the next 48 hours</p>
          </div>

          <div className="space-y-3">
            {watchlist.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#f7f7f5] border border-[#e5e5e2] flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-[#171717]">{item.title}</span>
                <span className="text-[11px] font-mono font-semibold text-[#737373] bg-white px-2 py-0.5 rounded border border-[#e5e5e2]">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 5 — SIGNAL DETAILS PANEL */}
      <div className="app-card border-[#e5e5e2] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e2]">
          <div>
            <span className="text-[11px] font-mono text-[#2563eb] font-bold uppercase tracking-wider block">
              SIGNAL DETAILS
            </span>
            <h3 className="font-sans font-bold text-lg text-[#171717] mt-0.5">
              {activeSignalData.title}
            </h3>
          </div>
          <span className={`px-2.5 py-0.5 rounded border text-[11px] font-mono font-semibold ${activeSignalData.statusColor}`}>
            {activeSignalData.status}
          </span>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-[#f7f7f5] border border-[#e5e5e2]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2563eb] uppercase mb-2">
              <Lightbulb size={15} /> WHY THIS MATTERS
            </div>
            <p className="text-xs text-[#171717] font-sans leading-relaxed">
              {activeSignalData.why}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f7f7f5] border border-[#e5e5e2]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase mb-2">
              <ShieldAlert size={15} /> WHAT CHANGED
            </div>
            <p className="text-xs text-[#171717] font-sans leading-relaxed">
              {activeSignalData.changed}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f7f7f5] border border-[#e5e5e2]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase mb-2">
              <Zap size={15} /> RECOMMENDED ACTION
            </div>
            <p className="text-xs text-[#171717] font-sans leading-relaxed">
              {activeSignalData.action}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
