import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection({ onLaunchApp }) {
  return (
    <section className="section-spacing bg-[#070a12] text-center">
      <div className="site-container max-w-3xl mx-auto">
        
        {/* Eyebrow */}
        <div className="eyebrow-pill mx-auto">
          START YOUR FREE TRIAL
        </div>

        {/* Headline */}
        <h2 className="heading-section mb-6">
          STOP GUESSING. <br />
          <span className="text-[#5ee7ff]">START KNOWING.</span>
        </h2>

        {/* Short Paragraph */}
        <p className="text-subheading mb-8 max-w-xl mx-auto">
          Connect your marketing platforms in minutes and get high-confidence attribution signals immediately.
        </p>

        {/* Single Primary Button */}
        <button 
          onClick={onLaunchApp}
          className="btn-blue-primary text-base py-3.5 px-8"
        >
          <span>Get Started Free</span>
          <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
}
