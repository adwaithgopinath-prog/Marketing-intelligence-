import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#040507] border-t border-white/10 text-gray-400 font-sans text-xs">
      <div className="editorial-container flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#ff4800] flex items-center justify-center text-white font-bold font-mono text-[10px]">
            MI
          </div>
          <span className="font-display font-bold text-white text-sm">MARKETING INTEL°</span>
          <span className="font-mono text-gray-400 text-[11px]">© {new Date().getFullYear()} ALL RIGHTS RESERVED.</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 font-heading">
          <a href="#product" className="hover:text-white transition-colors text-decoration-none">Product</a>
          <a href="#story" className="hover:text-white transition-colors text-decoration-none">Story</a>
          <a href="#analytics" className="hover:text-white transition-colors text-decoration-none">Analytics</a>
          <a href="#insights" className="hover:text-white transition-colors text-decoration-none">AI Signals</a>
        </div>

      </div>
    </footer>
  );
}
