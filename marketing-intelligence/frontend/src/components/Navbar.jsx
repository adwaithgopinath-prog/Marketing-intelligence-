import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, LayoutDashboard, Compass, Layers, ShieldCheck } from 'lucide-react';

export default function Navbar({ onLaunchApp, isAppOpen, apiStatus }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#08090c]/85 backdrop-blur-md border-b border-white/10 py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="editorial-container flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff4800] to-[#ff7700] flex items-center justify-center text-white shadow-lg shadow-[#ff4800]/25 group-hover:scale-105 transition-transform">
            <Sparkles size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              MARKETING<span className="text-[#ff4800]">.</span>INTEL
            </span>
            <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase -mt-1">
              ENGINE V2.4
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium font-heading">
          <a href="#product" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Product</a>
          <a href="#story" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Story</a>
          <a href="#analytics" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Analytics</a>
          <a href="#insights" className="text-gray-300 hover:text-white transition-colors text-decoration-none">AI Engine</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Solutions</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Backend Health Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${apiStatus === 'Online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="text-gray-300">API: <strong className={apiStatus === 'Online' ? 'text-emerald-400' : 'text-amber-400'}>{apiStatus}</strong></span>
          </div>

          <button 
            onClick={onLaunchApp}
            className="btn-editorial-primary text-xs py-2.5 px-5 flex items-center gap-2"
          >
            {isAppOpen ? (
              <>
                <span>Close Dashboard</span>
              </>
            ) : (
              <>
                <LayoutDashboard size={16} />
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
