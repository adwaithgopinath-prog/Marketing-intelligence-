import React from 'react';
import { Sparkles, ArrowRight, ShieldAlert, Lightbulb, Zap, CheckCircle2 } from 'lucide-react';

export default function AIAnalysisView() {
  const analyses = [
    {
      id: 1,
      title: 'CPA deterioration detected in Meta Retargeting.',
      why: 'Meta is becoming less efficient despite stable conversion volume.',
      changed: 'CPA increased 18% over seven days (from ₹742 to ₹874).',
      action: 'Reduce retargeting spend by 10–15% and review audience creative saturation.',
      evidence: 'CPA: ₹742 → ₹874 | Conversions: 284 → 291 | Spend: ₹2.1L → ₹2.5L',
      confidence: 'High (98.4%)',
      statusColor: 'border-[#C78A24]/30 bg-[#FEF9F0]/30'
    },
    {
      id: 2,
      title: 'Google Search has additional scaling potential.',
      why: 'Exact-match Search ROAS remains 5.47x while daily budget cap is hit early.',
      changed: 'Search conversion rate increased +18% while cost-per-click dropped.',
      action: 'Increase exact-match daily budget by +₹5,000 to capture remaining search intent.',
      evidence: 'ROAS: 5.47x | Conversion Rate: 6.8% | Budget Cap Hit: 2:30 PM daily',
      confidence: 'High (99.1%)',
      statusColor: 'border-[#2E9B68]/30 bg-[#F0FBF5]/30'
    },
    {
      id: 3,
      title: 'Organic acquisition is becoming a larger revenue contributor.',
      why: 'Technical documentation traffic has an 8.44x effective ROAS and high retention.',
      changed: 'Organic revenue increased 31% month-over-month.',
      action: 'Publish 3 additional technical case studies to accelerate organic acquisition.',
      evidence: 'Organic Revenue: ₹38K → ₹84K | Conversion Rate: 5.2%',
      confidence: 'High (96.5%)',
      statusColor: 'border-[#5B5CE2]/30 bg-[#EEEEFF]/30'
    }
  ];

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-8 font-sans">
      
      {/* PAGE HEADER */}
      <div className="border-b border-[#E5E5E2] pb-6">
        <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight flex items-center gap-2.5">
          <Sparkles size={24} className="text-[#5B5CE2]" />
          AI Analysis
        </h1>
        <p className="text-sm text-[#737373] mt-1 font-sans">
          What deserves your attention? Automated evaluation of actual performance data.
        </p>
      </div>

      {/* ANALYSIS DIRECTIVES STREAM */}
      <div className="space-y-6">
        {analyses.map((item) => (
          <div key={item.id} className="mi-card space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2]">
              <h2 className="font-sans font-bold text-lg text-[#171717]">
                {item.id}. {item.title}
              </h2>
              <span className="text-xs font-mono font-bold text-[#5B5CE2] bg-[#EEEEFF] px-2.5 py-0.5 rounded border border-[#5B5CE2]/20">
                Confidence: {item.confidence}
              </span>
            </div>

            {/* 4-Box Structured Directive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#E5E5E2] space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#5B5CE2] uppercase block">WHY IT MATTERS</span>
                <p className="text-[#171717] leading-relaxed">{item.why}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#E5E5E2] space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#C78A24] uppercase block">WHAT CHANGED</span>
                <p className="text-[#171717] leading-relaxed">{item.changed}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0FBF5] border border-[#2E9B68]/30 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#2E9B68] uppercase block">RECOMMENDED ACTION</span>
                <p className="text-[#171717] font-semibold leading-relaxed">{item.action}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#E5E5E2] space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#737373] uppercase block">EVIDENCE</span>
                <p className="text-[#171717] font-mono leading-relaxed">{item.evidence}</p>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
