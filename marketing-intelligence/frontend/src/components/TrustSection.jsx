import React from 'react';

export default function TrustSection() {
  const platforms = [
    'Google Ads',
    'Meta Ads',
    'LinkedIn Ads',
    'Google Analytics 4',
    'HubSpot CRM',
    'Shopify'
  ];

  return (
    <section className="py-16 border-b border-white/[0.08] bg-[#070a12]">
      <div className="site-container text-center">
        
        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-8 font-semibold">
          BUILT FOR MARKETING TEAMS THAT RUN ON DATA.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {platforms.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm font-sans font-semibold text-gray-400 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#4f7cff]" />
              <span>{p}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
