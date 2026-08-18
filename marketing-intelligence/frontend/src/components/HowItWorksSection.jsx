import React from 'react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "CONNECT",
      desc: "Connect your ad accounts, analytics platforms, and customer review feeds in one click."
    },
    {
      num: "02",
      title: "UNDERSTAND",
      desc: "Marketing Intelligence normalizes multi-touch attribution and detects shifts automatically."
    },
    {
      num: "03",
      title: "ACT",
      desc: "Receive clear, high-confidence executive recommendations to optimize ad spend and scale growth."
    }
  ];

  return (
    <section id="how-it-works" className="section-spacing bg-[#070a12]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="eyebrow-pill">
            SIMPLE THREE-STEP WORKFLOW
          </div>
          <h2 className="heading-section mb-5">
            HOW IT WORKS.
          </h2>
          <p className="text-subheading">
            From raw platform data to actionable revenue growth in three straightforward steps.
          </p>
        </div>

        {/* Clean 3-Step Horizontal Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div key={idx} className="p-8 rounded-xl bg-[#0d1320] border border-white/[0.08] relative">
              <span className="font-mono text-xs font-bold text-[#4f7cff] tracking-widest block mb-4">
                STEP {s.num}
              </span>
              <h3 className="font-sans font-bold text-xl text-white mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
