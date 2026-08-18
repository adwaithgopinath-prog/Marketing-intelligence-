import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  Activity, 
  Plus, 
  Compass, 
  ShieldCheck, 
  X,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function DashboardView({ 
  apiStatus, 
  projects, 
  newProjectName, 
  setNewProjectName, 
  handleCreateProject, 
  reviews, 
  insights,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="fixed inset-0 z-50 bg-[#06080d]/95 backdrop-blur-2xl flex flex-col overflow-hidden animate-fadeIn">
      
      {/* App Navigation Bar */}
      <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-[#0a0d14]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ff4800] flex items-center justify-center text-white shadow-lg shadow-[#ff4800]/30 font-bold font-mono text-xs">
            MI
          </div>
          <div>
            <h2 className="font-heading font-bold text-sm text-white tracking-tight">MARKETING INTELLIGENCE ENGINE</h2>
            <span className="font-mono text-[10px] text-gray-400">CONNECTED TO backend API</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${apiStatus === 'Online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="text-gray-300">API Status: <strong className={apiStatus === 'Online' ? 'text-emerald-400' : 'text-amber-400'}>{apiStatus}</strong></span>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
            title="Return to Site"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Workspace Sidebar */}
        <aside className="w-64 bg-[#080a10] border-r border-white/10 p-4 flex flex-col gap-6">
          <div className="text-xs font-mono text-gray-400 uppercase tracking-widest px-3">
            ANALYTICS MODULES
          </div>

          <nav className="flex flex-col gap-1 font-heading text-sm">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard' ? 'bg-[#ff4800]/15 text-white border-l-4 border-[#ff4800] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 size={18} className={activeTab === 'dashboard' ? 'text-[#ff4800]' : ''} />
              <span>Overview</span>
            </button>

            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'projects' ? 'bg-[#ff4800]/15 text-white border-l-4 border-[#ff4800] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers size={18} className={activeTab === 'projects' ? 'text-[#ff4800]' : ''} />
              <span>Campaigns & Projects</span>
            </button>

            <button 
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'reviews' ? 'bg-[#ff4800]/15 text-white border-l-4 border-[#ff4800] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare size={18} className={activeTab === 'reviews' ? 'text-[#ff4800]' : ''} />
              <span>Review Ingestion Feed</span>
            </button>

            <button 
              onClick={() => setActiveTab('competitors')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'competitors' ? 'bg-[#ff4800]/15 text-white border-l-4 border-[#ff4800] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={18} className={activeTab === 'competitors' ? 'text-[#ff4800]' : ''} />
              <span>Competitor Tracking</span>
            </button>

            <button 
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'insights' ? 'bg-[#ff4800]/15 text-white border-l-4 border-[#ff4800] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass size={18} className={activeTab === 'insights' ? 'text-[#ff4800]' : ''} />
              <span>AI Signals & Insights</span>
            </button>
          </nav>
        </aside>

        {/* Workspace Main Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-[#06080d]">
          
          {/* Top Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="glass-panel p-5 rounded-2xl bg-[#0c0e17]">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>INGESTED REVIEWS</span>
                <MessageSquare size={16} className="text-[#ff4800]" />
              </div>
              <div className="text-3xl font-display font-bold text-white mt-2">14,290</div>
              <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +12.4% this month
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl bg-[#0c0e17]">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>SENTIMENT INDEX</span>
                <Activity size={16} className="text-emerald-400" />
              </div>
              <div className="text-3xl font-display font-bold text-white mt-2">84%</div>
              <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +3.2% baseline
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl bg-[#0c0e17]">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>COMPETITORS</span>
                <Users size={16} className="text-sky-400" />
              </div>
              <div className="text-3xl font-display font-bold text-white mt-2">8 Brands</div>
              <div className="text-xs text-sky-400 font-mono mt-1 flex items-center gap-1">
                <ArrowUpRight size={12} /> Live Sync Active
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl bg-[#0c0e17]">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>AI INSIGHTS</span>
                <Sparkles size={16} className="text-purple-400" />
              </div>
              <div className="text-3xl font-display font-bold text-white mt-2">142 Signals</div>
              <div className="text-xs text-purple-400 font-mono mt-1 flex items-center gap-1">
                <ShieldCheck size={12} /> High Confidence
              </div>
            </div>
          </div>

          {/* Active Tab View Rendering */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Ingested Reviews Section */}
              <div className="glass-panel p-6 rounded-2xl bg-[#0d0f17]">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                    <MessageSquare size={18} className="text-[#ff4800]" />
                    Live Review Ingestion Stream & Sentiment
                  </h3>
                  <span className="text-xs font-mono text-gray-400">API ACTIVE</span>
                </div>

                <div className="space-y-4">
                  {reviews.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white font-heading">{item.author} ({item.source})</span>
                        <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] uppercase ${
                          item.sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          item.sentiment === 'negative' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {item.sentiment} ({Math.round(item.score * 100)}%)
                        </span>
                      </div>
                      <p className="text-sm font-sans text-gray-300">"{item.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Side Column: Campaign Form & AI Signals */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Add New Campaign Form */}
              <div className="glass-panel p-6 rounded-2xl bg-[#0d0f17]">
                <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 mb-4">
                  <Plus size={18} className="text-sky-400" />
                  Add New Brand Campaign
                </h3>

                <form onSubmit={handleCreateProject} className="flex flex-col gap-3">
                  <input 
                    type="text" 
                    className="w-full bg-[#121522] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff4800] transition-colors"
                    placeholder="Brand or Product name..." 
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                  <button type="submit" className="btn-editorial-primary text-xs py-3 flex items-center justify-center gap-2">
                    <Plus size={16} />
                    <span>Create Campaign</span>
                  </button>
                </form>

                {projects.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">Active Campaigns ({projects.length}):</h4>
                    <div className="space-y-2">
                      {projects.map((p, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-white flex items-center justify-between">
                          <span>⚡ {p.name || 'Marketing Campaign'}</span>
                          <span className="text-[10px] text-emerald-400">ACTIVE</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Latest AI Signals */}
              <div className="glass-panel p-6 rounded-2xl bg-[#0d0f17]">
                <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-emerald-400" />
                  Real-time AI Signals
                </h3>

                <div className="space-y-3">
                  {insights.map((i) => (
                    <div key={i.id} className="p-3.5 rounded-xl bg-white/[0.03] border-l-4 border-l-[#ff4800] border-white/10">
                      <div className="text-xs font-bold text-white font-heading">{i.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{i.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
