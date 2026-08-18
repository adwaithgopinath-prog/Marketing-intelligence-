import React, { useState, useEffect } from 'react';
import { Activity, ArrowRight, LayoutDashboard, Zap } from 'lucide-react';

export default function Navbar({ onLaunchApp, isAppOpen, apiStatus }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#070a12]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5' 
        : 'bg-transparent py-5'
    }`}>
      <div className="site-container flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 text-decoration-none group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f7cff] to-[#38bdf8] flex items-center justify-center text-white shadow-md shadow-[#4f7cff]/30">
            <Activity size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base tracking-tight text-white flex items-center gap-1">
              Marketing<span className="text-[#5ee7ff]">Intel</span>
            </span>
          </div>
        </a>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a href="#hero" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Overview</a>
          <a href="#signals" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Intelligence</a>
          <a href="#analytics" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Analytics</a>
          <a href="#ai-insights" className="text-gray-300 hover:text-white transition-colors text-decoration-none">AI Engine</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Solutions</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* API Health Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${apiStatus === 'Online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-gray-400">API: <strong className={apiStatus === 'Online' ? 'text-emerald-400' : 'text-amber-400'}>{apiStatus}</strong></span>
          </div>

          <button 
            onClick={onLaunchApp}
            className="btn-primary-blue text-xs py-2.5 px-4 font-semibold flex items-center gap-2"
          >
            {isAppOpen ? (
              <span>Close App</span>
            ) : (
              <>
                <LayoutDashboard size={15} />
                <span>Launch App</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
