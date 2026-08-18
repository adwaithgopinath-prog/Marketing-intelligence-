import React, { useState } from 'react';
import { 
  Eye, 
  Search, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  BarChart2, 
  BrainCircuit, 
  Layers, 
  Sparkles 
} from 'lucide-react';

const STEPS = [
  {
    id: 1,
    stepNumber: "STEP 01",
    tag: "UNDERSTAND",
    title: "Unified Multi-Source Review Ingestion",
    description: "Automatically aggregate reviews, social feedback, and customer tickets across Google, Yelp, and Trustpilot into a single normalized data stream.",
    icon: Eye,
    accent: "#ff4800",
    graphicData: {
      title: "Live Review Pipeline & Sentiment Normalized",
      badge: "Real-time Stream",
      metrics: [
        { label: "Google Reviews", val: "8,920", sub: "+94% positive" },
        { label: "Yelp Ingestion", val: "3,140", sub: "+78% positive" },
        { label: "Trustpilot Feed", val: "2,230", sub: "+89% positive" }
      ],
      sampleFeed: [
        { author: "Elena R.", text: "The new UI speeds up campaign creation by 3x. Incredible execution!", sentiment: "Positive", score: "96%" },
        { author: "David M.", text: "API response latency is under 50ms now. Perfect for real-time dashboards.", sentiment: "Positive", score: "92%" }
      ]
    }
  },
  {
    id: 2,
    stepNumber: "STEP 02",
    tag: "DISCOVER",
    title: "Pattern & Anomaly Detection Engine",
    description: "Identify sudden shifts in customer voice, competitor pricing updates, and emerging product friction before they impact bottom-line revenue.",
    icon: Search,
    accent: "#38bdf8",
    graphicData: {
      title: "Detected Friction & Competitor Shift Matrix",
      badge: "3 Anomalies Flagged",
      metrics: [
        { label: "Competitor Price Cut", val: "Brand X", sub: "-15% mid-tier" },
        { label: "Sentiment Spike", val: "+28%", sub: "UI praise surge" },
        { label: "Support Delay", val: "12 reviews", sub: "Ticket backlog" }
      ],
      sampleFeed: [
        { author: "Alert System", text: "Competitor X dropped Enterprise tier pricing by $20/mo.", sentiment: "Warning", score: "Anomaly" },
        { author: "Trend Detector", text: "Customer praise for mobile responsiveness jumped 34% this week.", sentiment: "Positive", score: "Trend" }
      ]
    }
  },
  {
    id: 3,
    stepNumber: "STEP 03",
    tag: "PREDICT",
    title: "Predictive ROAS & Segment Forecasting",
    description: "Model customer lifetime value and forecast campaign return-on-ad-spend across paid search, social, and organic acquisition channels.",
    icon: TrendingUp,
    accent: "#10b981",
    graphicData: {
      title: "Quarterly Forecast & Channel Attributions",
      badge: "94.2% Model Accuracy",
      metrics: [
        { label: "Projected ROAS", val: "5.4x", sub: "+0.6x lift" },
        { label: "LTV Forecast", val: "$1,420", sub: "12-month cohort" },
        { label: "CAC Efficiency", val: "$34.10", sub: "-18% optimization" }
      ],
      sampleFeed: [
        { author: "Forecaster AI", text: "Reallocating 15% budget to Google Search projects +$42K net gain.", sentiment: "Opportunity", score: "High Confidence" }
      ]
    }
  },
  {
    id: 4,
    stepNumber: "STEP 04",
    tag: "ACT",
    title: "Automated Strategic Recommendations",
    description: "Turn raw analytics into clear strategic directives. Get clear action plans on budget reallocation, ad copy tweaks, and market positioning.",
    icon: Zap,
    accent: "#f59e0b",
    graphicData: {
      title: "Autonomous Recommendation Stack",
      badge: "Ready for Execution",
      metrics: [
        { label: "Action 1", val: "Scale Search", sub: "Increase budget 20%" },
        { label: "Action 2", val: "Fix Support", sub: "Add 2 reps to queue" },
        { label: "Action 3", val: "Counter Offer", sub: "Match Brand X discount" }
      ],
      sampleFeed: [
        { author: "Executive Copilot", text: "Action Plan #42 generated: Shift $5,000 from Instagram to Search for 3.2x ROAS.", sentiment: "Action Ready", score: "Execute" }
      ]
    }
  }
];

export default function ProductStory() {
  const [activeTab, setActiveTab] = useState(0);
  const currentStep = STEPS[activeTab];

  return (
    <section id="story" className="py-24 relative overflow-hidden bg-[#06070a] border-y border-white/10">
      {/* Background Watermark */}
      <div className="bg-watermark -top-20 right-0 opacity-15 select-none">
        INTELLIGENCE
      </div>

      <div className="editorial-container">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="editorial-badge mb-4">
            <span className="badge-dot" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl uppercase text-white tracking-tight leading-none mb-6">
            THE INTELLIGENCE <br />
            <span className="text-[#ff4800]">WORKFLOW.</span>
          </h2>
          <p className="font-sans text-gray-400 text-lg">
            From raw customer reviews to automated revenue decisions in four continuous stages.
          </p>
        </div>

        {/* Interactive Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {STEPS.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeTab === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white/[0.06] border-[#ff4800] shadow-lg shadow-[#ff4800]/10 scale-[1.02]' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                      style={{ 
                        backgroundColor: isActive ? `${step.accent}20` : 'rgba(255,255,255,0.05)', 
                        color: isActive ? step.accent : '#94a3b8' 
                      }}
                    >
                      {step.stepNumber} — {step.tag}
                    </span>
                    <IconComp size={18} style={{ color: isActive ? step.accent : '#64748b' }} />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dynamic Graphic Preview Panel */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/15 bg-[#0b0d14] relative overflow-hidden min-h-[460px]">
              
              {/* Graphic Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="font-mono text-xs text-[#ff4800] uppercase font-bold tracking-widest block mb-1">
                    {currentStep.stepNumber} PREVIEW
                  </span>
                  <h4 className="font-heading font-bold text-lg text-white">
                    {currentStep.graphicData.title}
                  </h4>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                  {currentStep.graphicData.badge}
                </span>
              </div>

              {/* Dynamic Key Metric Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {currentStep.graphicData.metrics.map((m, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="text-gray-400 text-xs font-mono">{m.label}</div>
                    <div className="text-xl font-display font-bold text-white mt-1">{m.val}</div>
                    <div className="text-xs text-emerald-400 font-sans mt-0.5">{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* Sample Dynamic Feed */}
              <div className="bg-[#050609] border border-white/10 rounded-xl p-5 mb-6">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
                  LIVE STREAM DATA SAMPLES
                </div>

                <div className="flex flex-col gap-3">
                  {currentStep.graphicData.sampleFeed.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-white mb-1">{item.author}</div>
                        <div className="text-xs text-gray-300">"{item.text}"</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#ff4800]/20 text-[#ff4800] text-[11px] font-mono font-bold flex-shrink-0">
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Step Indicator Footer */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-4 border-t border-white/10">
                <span>STAGE {activeTab + 1} OF 4</span>
                <span className="text-[#ff4800] font-bold">AUTOMATED INTELLIGENCE PIPELINE ACTIVE</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
