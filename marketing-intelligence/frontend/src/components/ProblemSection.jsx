import React from 'react';

export default function ProblemSection() {
  const problems = [
    {
      num: "01",
      title: "SCATTERED DATA",
      description: "Metrics live across Google Ads, Meta, LinkedIn, and CRM dashboards. Gathering a clear picture takes hours of manual spreadsheet exports."
    },
    {
      num: "02",
      title: "UNCLEAR PERFORMANCE",
      description: "Every platform claims credit for the same conversion. Multi-touch attribution is broken, making real campaign ROI impossible to verify."
    },
    {
      num: "03",
      title: "SLOW DECISIONS",
      description: "By the time weekly reports are compiled, ad spend has already been wasted on underperforming channels and fatigued ad creative."
    }
  ];

  return (
    <section className="section-spacing bg-[#070a12]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="eyebrow-pill">
            THE CORE PROBLEM
          </div>
          <h2 className="heading-section mb-5">
            YOUR DATA IS EVERYWHERE. <br />
            <span className="text-[#5ee7ff]">YOUR ANSWERS SHOULDN'T BE.</span>
          </h2>
          <p className="text-subheading">
            Modern marketing teams generate vast amounts of data, but spend most of their time stitching reports together instead of optimizing growth.
          </p>
        </div>

        {/* 3 Aligned Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((item, idx) => (
            <div key={idx} className="p-8 rounded-xl bg-[#0d1320] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-[#4f7cff] block mb-3">
                  {item.num}
                </span>
                <h3 className="font-sans font-bold text-lg text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
