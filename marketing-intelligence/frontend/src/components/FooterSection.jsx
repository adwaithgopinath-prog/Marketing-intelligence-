import React from 'react';
import { Activity } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="py-16 bg-[#04060c] border-t border-white/[0.08] text-gray-400 font-sans text-xs">
      <div className="site-container">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Col 1: Logo & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#4f7cff] flex items-center justify-center text-white">
                <Activity size={16} />
              </div>
              <span className="font-bold text-white text-base">Marketing<span className="text-[#5ee7ff]">Intel</span></span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs font-sans">
              AI-driven multi-touch attribution and real-time consumer review ingestion platform.
            </p>
          </div>

          {/* Col 2: Product Links */}
          <div>
            <h4 className="font-sans font-bold text-white text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 font-medium">
              <li><a href="#product" className="hover:text-white transition-colors text-decoration-none">Overview</a></li>
              <li><a href="#intelligence" className="hover:text-white transition-colors text-decoration-none">AI Engine</a></li>
              <li><a href="#analytics" className="hover:text-white transition-colors text-decoration-none">Analytics</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors text-decoration-none">Use Cases</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-sans font-bold text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 font-medium">
              <li><a href="#" className="hover:text-white transition-colors text-decoration-none">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Terms of Service</a></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="font-sans font-bold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5 font-medium">
              <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-decoration-none">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Status</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <span>© {new Date().getFullYear()} Marketing Intelligence Platform. All rights reserved.</span>
          <span>CONNECTED TO RENDER API V2</span>
        </div>

      </div>
    </footer>
  );
}
