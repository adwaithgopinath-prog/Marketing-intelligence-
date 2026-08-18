import React, { useState } from 'react';
import { ArrowRight, GitMerge, Layers, UserCheck } from 'lucide-react';

export default function AttributionView() {
  const [selectedModel, setSelectedModel] = useState('Data Driven');

  const models = ['First Touch', 'Last Touch', 'Linear', 'Data Driven'];

  const attributionData = {
    'First Touch': [
      { channel: 'Google Search', share: '42%', revenue: '₹3,53,640' },
      { channel: 'Meta Ads', share: '31%', revenue: '₹2,61,020' },
      { channel: 'Email Campaign', share: '27%', revenue: '₹2,27,340' },
    ],
    'Last Touch': [
      { channel: 'Meta Ads', share: '61%', revenue: '₹5,13,620' },
      { channel: 'Google Search', share: '21%', revenue: '₹1,76,820' },
      { channel: 'Email Campaign', share: '18%', revenue: '₹1,51,560' },
    ],
    'Linear': [
      { channel: 'Google Search', share: '33%', revenue: '₹2,77,860' },
      { channel: 'Meta Ads', share: '33%', revenue: '₹2,77,860' },
      { channel: 'Email Campaign', share: '34%', revenue: '₹2,86,280' },
    ],
    'Data Driven': [
      { channel: 'Google Search', share: '39%', revenue: '₹3,28,380' },
      { channel: 'Meta Ads', share: '36%', revenue: '₹3,03,120' },
      { channel: 'Email Campaign', share: '25%', revenue: '₹2,10,500' },
    ],
  };

  const journeySteps = [
    { title: 'Google Search', type: 'Paid Search', time: 'Day 1' },
    { title: 'Landing Page', type: 'Direct Visit', time: 'Day 1' },
    { title: 'Meta Retargeting', type: 'Paid Social', time: 'Day 3' },
    { title: 'Email Offer', type: 'Lifecycle', time: 'Day 5' },
    { title: 'Purchase Completed', type: 'Conversion', time: 'Day 5' },
  ];

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-8 font-sans">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5E2] pb-6">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
            Attribution
          </h1>
          <p className="text-sm text-[#737373] mt-1 font-sans">
            Understand how channels contribute to the customer journey.
          </p>
        </div>

        {/* Model Switcher */}
        <div className="flex items-center gap-1 bg-[#F1F1EF] p-1 rounded-lg">
          {models.map((model) => (
            <button
              key={model}
              onClick={() => setSelectedModel(model)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                selectedModel === model 
                  ? 'bg-white text-[#171717] shadow-xs' 
                  : 'text-[#737373] hover:text-[#171717]'
              }`}
            >
              {model.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* CUSTOMER JOURNEY VISUALIZATION */}
      <div className="mi-card space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2]">
          <span className="text-xs font-mono text-[#5B5CE2] font-bold uppercase tracking-wider">
            CUSTOMER JOURNEY PATH
          </span>
          <div className="flex items-center gap-4 text-xs font-mono text-[#737373]">
            <span>Customer: <strong>#2841</strong></span>
            <span>Attributed Revenue: <strong className="text-[#171717]">₹18,400</strong></span>
            <span>Length: <strong>4 Touchpoints</strong></span>
          </div>
        </div>

        {/* Journey Step Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
          {journeySteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-[#E5E5E2] space-y-1 text-center">
                <span className="text-[10px] font-mono text-[#737373] uppercase">{step.time}</span>
                <span className="font-bold text-xs text-[#171717] block">{step.title}</span>
                <span className="text-[11px] font-mono text-[#5B5CE2] block">{step.type}</span>
              </div>
              {idx < journeySteps.length - 1 && (
                <div className="hidden sm:flex justify-center text-[#A1A1A1]">
                  <ArrowRight size={16} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ATTRIBUTION MODEL COMPARISON GRID */}
      <div className="mi-card space-y-6">
        <div className="pb-3 border-b border-[#E5E5E2]">
          <h3 className="font-sans font-bold text-base text-[#171717]">Attribution Model Comparison</h3>
          <p className="text-xs text-[#737373]">Compare multi-touch credit distribution across models</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['First Touch', 'Last Touch', 'Data Driven'].map((modelName) => (
            <div 
              key={modelName}
              className={`p-5 rounded-xl border transition-all ${
                selectedModel === modelName 
                  ? 'border-[#5B5CE2] bg-[#EEEEFF]/20 shadow-xs' 
                  : 'border-[#E5E5E2] bg-white'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2] mb-4">
                <span className="font-mono text-xs font-bold text-[#171717] uppercase">{modelName}</span>
                {selectedModel === modelName && (
                  <span className="text-[10px] font-mono text-[#5B5CE2] bg-white px-2 py-0.5 rounded border border-[#5B5CE2]">ACTIVE</span>
                )}
              </div>

              <div className="space-y-4">
                {attributionData[modelName].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-[#171717]">{item.channel}</span>
                      <span className="font-mono font-bold text-[#5B5CE2]">{item.share}</span>
                    </div>
                    <div className="w-full h-2 bg-[#F1F1EF] rounded-full overflow-hidden">
                      <div className="h-full bg-[#5B5CE2] rounded-full" style={{ width: item.share }} />
                    </div>
                    <span className="text-[11px] font-mono text-[#737373] block">{item.revenue}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
