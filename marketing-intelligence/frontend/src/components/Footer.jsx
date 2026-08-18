import React from 'react';
import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 bg-[#05070d] border-t border-white/[0.08] text-gray-400 font-sans text-xs">
      <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo & Copyright */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#4f7cff] flex items-center justify-center text-white font-bold text-xs">
            <Activity size={14} />
          </div>
          <span className="font-bold text-white text-sm">Marketing<span className="text-[#5ee7ff]">Intel</span></span>
          <span className="font-mono text-gray-400 text-xs ml-2">© {new Date().getFullYear()} Marketing Intelligence. All rights reserved.</span>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-6 font-medium text-xs">
          <a href="#hero" className="hover:text-white transition-colors text-decoration-none">Overview</a>
          <a href="#signals" className="hover:text-white transition-colors text-decoration-none">Intelligence</a>
          <a href="#analytics" className="hover:text-white transition-colors text-decoration-none">Analytics</a>
          <a href="#ai-insights" className="hover:text-white transition-colors text-decoration-none">AI Engine</a>
        </div>

      </div>
    </footer>
  );
}
