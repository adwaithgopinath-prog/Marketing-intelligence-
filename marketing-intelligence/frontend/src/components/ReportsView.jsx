import React, { useState } from 'react';
import { FileText, Download, Share2, Plus, ArrowRight } from 'lucide-react';

export default function ReportsView() {
  const [activeReport, setActiveReport] = useState(null);

  const reports = [
    {
      id: 1,
      title: 'August Performance Review',
      period: 'Aug 1 - Aug 31, 2026',
      created: '2 days ago',
      channels: 'Google, Meta, LinkedIn',
      status: 'Ready',
      summary: 'Attributed revenue increased +18.6% month-over-month. Google Search was the primary growth driver achieving 5.00x ROAS.',
      revenue: '₹8,42,000',
      spend: '₹1,74,000',
      roas: '4.82x',
      cac: '₹842'
    },
    {
      id: 2,
      title: 'July Performance Review',
      period: 'Jul 1 - Jul 31, 2026',
      created: '1 month ago',
      channels: 'Google, Meta, Organic',
      status: 'Archived',
      summary: 'Blended ROAS stabilized at 4.20x. Meta retargeting performance remained steady.',
      revenue: '₹7,10,000',
      spend: '₹1,69,000',
      roas: '4.20x',
      cac: '₹910'
    },
  ];

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-6 font-sans">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5E2] pb-6">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
            Reports
          </h1>
          <p className="text-sm text-[#737373] mt-1 font-sans">
            Executive marketing performance outputs and export files.
          </p>
        </div>

        <button className="btn-mi-primary text-xs">
          <Plus size={14} />
          <span>Create Report</span>
        </button>
      </div>

      {/* REPORTS LIST */}
      <div className="space-y-4">
        {reports.map((rep) => (
          <div key={rep.id} className="mi-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-[#F1F1EF] text-[#5B5CE2] mt-0.5">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-sans font-bold text-base text-[#171717]">{rep.title}</h3>
                <p className="text-xs text-[#737373] mt-0.5">{rep.period} • {rep.channels}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-[#F0FBF5] text-[#2E9B68] font-bold border border-[#2E9B68]/20">
                {rep.status}
              </span>
              <button 
                onClick={() => setActiveReport(rep)}
                className="btn-mi-secondary text-xs"
              >
                <Download size={13} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REPORT DETAIL DRAWER */}
      {activeReport && (
        <div className="mi-card space-y-6 border-[#5B5CE2]/40 bg-[#EEEEFF]/10">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2]">
            <h3 className="font-sans font-bold text-lg text-[#171717]">{activeReport.title} Details</h3>
            <button onClick={() => setActiveReport(null)} className="text-xs text-[#5B5CE2] font-semibold hover:underline">
              Close Report
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-[#737373] uppercase font-bold">EXECUTIVE SUMMARY</span>
            <p className="text-xs text-[#171717] font-sans leading-relaxed">{activeReport.summary}</p>
          </div>

          <div className="grid grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-white rounded-lg border border-[#E5E5E2]">
              <span className="text-[#737373] block">REVENUE</span>
              <span className="font-bold text-[#171717]">{activeReport.revenue}</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#E5E5E2]">
              <span className="text-[#737373] block">SPEND</span>
              <span className="font-bold text-[#171717]">{activeReport.spend}</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#E5E5E2]">
              <span className="text-[#737373] block">ROAS</span>
              <span className="font-bold text-[#2E9B68]">{activeReport.roas}</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#E5E5E2]">
              <span className="text-[#737373] block">CAC</span>
              <span className="font-bold text-[#171717]">{activeReport.cac}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
