import React from 'react';
import { PieChart, ArrowUpRight } from 'lucide-react';

export default function ChannelsView() {
  const channelData = [
    { name: 'Google Ads', spend: '₹82,400', revenue: '₹4,12,000', roas: '5.00x', cac: '₹116', conversions: '710', share: '48.9%' },
    { name: 'Meta Ads', spend: '₹54,100', revenue: '₹2,38,000', roas: '4.40x', cac: '₹145', conversions: '372', share: '28.2%' },
    { name: 'LinkedIn Ads', spend: '₹24,500', revenue: '₹1,08,000', roas: '4.40x', cac: '₹255', conversions: '96', share: '12.8%' },
    { name: 'Organic SEO', spend: '₹13,000', revenue: '₹84,000', roas: '6.46x', cac: '₹38', conversions: '340', share: '10.1%' },
  ];

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-6 font-sans">
      
      {/* PAGE HEADER */}
      <div className="border-b border-[#E5E5E2] pb-6">
        <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
          Channels
        </h1>
        <p className="text-sm text-[#737373] mt-1 font-sans">
          Compare the economics of every acquisition channel.
        </p>
      </div>

      {/* CHANNELS COMPARISON GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {channelData.map((ch, idx) => (
          <div key={idx} className="mi-card flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2]">
              <span className="font-sans font-bold text-base text-[#171717]">{ch.name}</span>
              <span className="text-xs font-mono font-bold text-[#5B5CE2] bg-[#EEEEFF] px-2 py-0.5 rounded border border-[#5B5CE2]/20">
                {ch.share}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#737373]">Revenue</span>
                <span className="font-bold text-[#171717] font-sans">{ch.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">Spend</span>
                <span className="text-[#171717]">{ch.spend}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">ROAS</span>
                <span className="font-bold text-[#2E9B68]">{ch.roas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">CAC</span>
                <span className="text-[#737373]">{ch.cac}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SIDE-BY-SIDE CHANNEL ECONOMICS TABLE */}
      <div className="mi-card p-0 overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E2]">
          <h3 className="font-sans font-bold text-base text-[#171717]">Side-by-Side Channel Economics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="mi-table">
            <thead>
              <tr>
                <th>CHANNEL</th>
                <th>SPEND</th>
                <th>REVENUE</th>
                <th>ROAS</th>
                <th>CAC</th>
                <th>CONVERSIONS</th>
                <th className="text-right">CONTRIBUTION %</th>
              </tr>
            </thead>
            <tbody>
              {channelData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8F8F6] transition-colors">
                  <td className="font-semibold text-[#171717]">{row.name}</td>
                  <td className="font-mono text-[#171717]">{row.spend}</td>
                  <td className="font-bold text-[#171717]">{row.revenue}</td>
                  <td className="font-bold text-[#2E9B68] font-mono">{row.roas}</td>
                  <td className="font-mono text-[#737373]">{row.cac}</td>
                  <td className="font-mono text-[#171717]">{row.conversions}</td>
                  <td className="text-right font-mono font-bold text-[#5B5CE2]">{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
