import React from 'react';
import { Users, Smile, Frown, Meh, ArrowUpRight } from 'lucide-react';

export default function CustomersView({ reviews }) {
  const customerKpis = [
    { label: 'Total Customers', value: '1,284' },
    { label: 'New Customers', value: '942' },
    { label: 'Returning Customers', value: '342' },
    { label: 'Average Order Value', value: '₹6,550' },
  ];

  const channelQuality = [
    { channel: 'Organic SEO', positivePct: '88%', sentiment: 'Highly Satisfied', retention: '42%' },
    { channel: 'Google Ads', positivePct: '82%', sentiment: 'Satisfied', retention: '38%' },
    { channel: 'LinkedIn Ads', positivePct: '76%', sentiment: 'Satisfied', retention: '31%' },
    { channel: 'Meta Ads', positivePct: '69%', sentiment: 'Moderate', retention: '24%' },
  ];

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-8 font-sans">
      
      {/* PAGE HEADER */}
      <div className="border-b border-[#E5E5E2] pb-6">
        <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
          Customer Intelligence
        </h1>
        <p className="text-sm text-[#737373] mt-1 font-sans">
          Correlate acquisition channels with customer satisfaction and sentiment.
        </p>
      </div>

      {/* OVERVIEW METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {customerKpis.map((kpi, idx) => (
          <div key={idx} className="mi-card flex flex-col justify-between h-24">
            <span className="text-xs font-mono font-semibold text-[#737373] uppercase tracking-wider">{kpi.label}</span>
            <span className="font-sans font-bold text-2xl text-[#171717]">{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* SENTIMENT ANALYSIS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SENTIMENT OVERVIEW */}
        <div className="lg:col-span-4 mi-card space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#E5E5E2] mb-4">
              <h3 className="font-sans font-bold text-base text-[#171717]">Customer Sentiment</h3>
              <p className="text-xs text-[#737373]">VADER sentiment score from ingested reviews</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#2E9B68] flex items-center gap-1.5"><Smile size={14} /> Positive</span>
                  <span className="font-mono font-bold text-[#171717]">72%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F1EF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E9B68] rounded-full" style={{ width: '72%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#C78A24] flex items-center gap-1.5"><Meh size={14} /> Neutral</span>
                  <span className="font-mono font-bold text-[#171717]">19%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F1EF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C78A24] rounded-full" style={{ width: '19%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#D95757] flex items-center gap-1.5"><Frown size={14} /> Negative</span>
                  <span className="font-mono font-bold text-[#171717]">9%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F1EF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#D95757] rounded-full" style={{ width: '9%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E5E2] text-xs text-[#737373]">
            Analyzed across 428 customer feedback touchpoints
          </div>
        </div>

        {/* CHANNEL TO CUSTOMER QUALITY CORRELATION TABLE */}
        <div className="lg:col-span-8 mi-card space-y-4 p-0 overflow-hidden">
          <div className="p-5 border-b border-[#E5E5E2]">
            <h3 className="font-sans font-bold text-base text-[#171717]">Channel → Customer Quality</h3>
            <p className="text-xs text-[#737373]">Are our marketing channels bringing customers who are actually satisfied?</p>
          </div>

          <div className="overflow-x-auto">
            <table className="mi-table">
              <thead>
                <tr>
                  <th>CHANNEL</th>
                  <th>POSITIVE SENTIMENT %</th>
                  <th>SENTIMENT RATING</th>
                  <th className="text-right">RETENTION RATE</th>
                </tr>
              </thead>
              <tbody>
                {channelQuality.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F8F6] transition-colors">
                    <td className="font-semibold text-[#171717]">{row.channel}</td>
                    <td className="font-mono font-bold text-[#2E9B68]">{row.positivePct}</td>
                    <td className="text-[#171717]">{row.sentiment}</td>
                    <td className="text-right font-mono font-bold text-[#5B5CE2]">{row.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
