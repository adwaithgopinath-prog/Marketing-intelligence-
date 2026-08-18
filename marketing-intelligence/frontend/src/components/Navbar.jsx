import React, { useState, useEffect } from 'react';
import { Activity, ArrowRight, LayoutDashboard } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-200 ${
      scrolled 
        ? 'bg-[#070a12]/90 backdrop-blur-md border-b border-white/[0.08]' 
        : 'bg-transparent border-b border-white/[0.04]'
    }`}>
      <div className="site-container flex items-center justify-between">
        
        {/* Logo Left */}
        <a href="#" className="flex items-center gap-2.5 text-decoration-none">
          <div className="w-8 h-8 rounded-md bg-[#4f7cff] flex items-center justify-center text-white">
            <Activity size={18} />
          </div>
          <span className="font-sans font-bold text-base tracking-tight text-white">
            Marketing<span className="text-[#5ee7ff]">Intel</span>
          </span>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#product" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Product</a>
          <a href="#intelligence" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Intelligence</a>
          <a href="#analytics" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Analytics</a>
          <a href="#use-cases" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Solutions</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-decoration-none">Pricing</a>
        </nav>

        {/* Action Controls Right */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onLaunchApp}
            className="text-xs font-medium text-gray-300 hover:text-white transition-colors hidden sm:block"
          >
            Login
          </button>

          <button 
            onClick={onLaunchApp}
            className="btn-blue-primary text-xs py-2 px-4"
          >
            {isAppOpen ? 'Close App' : 'Get Started'}
          </button>
        </div>

      </div>
    </header>
  );
}
