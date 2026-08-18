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
  X
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
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="fixed inset-0 z-50 bg-[#070a12]/95 backdrop-blur-2xl flex flex-col overflow-hidden animate-fadeIn">
      
      {/* Workspace Header */}
      <header className="h-16 border-b border-white/[0.08] px-6 flex items-center justify-between bg-[#0b1020]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4f7cff] to-[#38bdf8] flex items-center justify-center text-white font-bold font-mono text-xs">
            MI
          </div>
          <div>
            <h2 className="font-sans font-bold text-sm text-white">Marketing Intelligence Application</h2>
            <span className="font-mono text-[10px] text-gray-400">LIVE RENDER BACKEND SYNC</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${apiStatus === 'Online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-gray-400">Backend Status: <strong className={apiStatus === 'Online' ? 'text-emerald-400' : 'text-amber-400'}>{apiStatus}</strong></span>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors"
            title="Return to Site"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Workspace Sidebar */}
        <aside className="w-60 bg-[#070a12] border-r border-white/[0.08] p-4 flex flex-col gap-6">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider px-3">
            WORKSPACE NAVIGATION
          </span>

          <nav className="flex flex-col gap-1 text-sm font-sans">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'overview' ? 'bg-[#4f7cff]/15 text-white font-semibold border-l-2 border-[#4f7cff]' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <BarChart3 size={16} className={activeTab === 'overview' ? 'text-[#5ee7ff]' : ''} />
              <span>Overview</span>
            </button>

            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'campaigns' ? 'bg-[#4f7cff]/15 text-white font-semibold border-l-2 border-[#4f7cff]' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Layers size={16} className={activeTab === 'campaigns' ? 'text-[#5ee7ff]' : ''} />
              <span>Campaigns</span>
            </button>

            <button 
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'reviews' ? 'bg-[#4f7cff]/15 text-white font-semibold border-l-2 border-[#4f7cff]' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <MessageSquare size={16} className={activeTab === 'reviews' ? 'text-[#5ee7ff]' : ''} />
              <span>Reviews Stream</span>
            </button>

            <button 
              onClick={() => setActiveTab('competitors')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'competitors' ? 'bg-[#4f7cff]/15 text-white font-semibold border-l-2 border-[#4f7cff]' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Users size={16} className={activeTab === 'competitors' ? 'text-[#5ee7ff]' : ''} />
              <span>Competitors</span>
            </button>

            <button 
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'insights' ? 'bg-[#4f7cff]/15 text-white font-semibold border-l-2 border-[#4f7cff]' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Compass size={16} className={activeTab === 'insights' ? 'text-[#5ee7ff]' : ''} />
              <span>AI Insights</span>
            </button>
          </nav>
        </aside>

        {/* Workspace Main Workspace */}
        <main className="flex-1 p-8 overflow-y-auto bg-[#070a12]">
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0b1020] border border-white/[0.08] p-5 rounded-xl">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>INGESTED REVIEWS</span>
                <MessageSquare size={16} className="text-[#4f7cff]" />
              </div>
              <div className="text-2xl font-bold font-sans text-white mt-2">14,290</div>
              <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +12.4% this month
              </div>
            </div>

            <div className="bg-[#0b1020] border border-white/[0.08] p-5 rounded-xl">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>SENTIMENT INDEX</span>
                <Activity size={16} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-sans text-white mt-2">84%</div>
              <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +3.2% baseline
              </div>
            </div>

            <div className="bg-[#0b1020] border border-white/[0.08] p-5 rounded-xl">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>COMPETITORS TRACKED</span>
                <Users size={16} className="text-[#5ee7ff]" />
              </div>
              <div className="text-2xl font-bold font-sans text-white mt-2">8 Brands</div>
              <div className="text-xs text-[#5ee7ff] font-mono mt-1 flex items-center gap-1">
                <ArrowUpRight size={12} /> Live Sync
              </div>
            </div>

            <div className="bg-[#0b1020] border border-white/[0.08] p-5 rounded-xl">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>AI INSIGHTS</span>
                <Sparkles size={16} className="text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-sans text-white mt-2">142 Signals</div>
              <div className="text-xs text-purple-400 font-mono mt-1 flex items-center gap-1">
                <ShieldCheck size={12} /> High Confidence
              </div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Stream */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#0b1020] border border-white/[0.08] p-6 rounded-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <h3 className="font-sans font-bold text-base text-white flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#4f7cff]" />
                    Live Customer Reviews & Sentiment Feed
                  </h3>
                  <span className="text-xs font-mono text-gray-400">REST API CONNECTED</span>
                </div>

                <div className="space-y-3">
                  {reviews.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white font-sans">{item.author} ({item.source})</span>
                        <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold uppercase ${
                          item.sentiment === 'positive' ? 'bg-emerald-500/15 text-emerald-400' :
                          item.sentiment === 'negative' ? 'bg-rose-500/15 text-rose-400' :
                          'bg-amber-500/15 text-amber-400'
                        }`}>
                          {item.sentiment} ({Math.round(item.score * 100)}%)
                        </span>
                      </div>
                      <p className="text-xs font-sans text-gray-300">"{item.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Campaign Form & AI Signals */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Campaign Creation */}
              <div className="bg-[#0b1020] border border-white/[0.08] p-6 rounded-xl">
                <h3 className="font-sans font-bold text-sm text-white flex items-center gap-2 mb-4">
                  <Plus size={16} className="text-[#5ee7ff]" />
                  Create Campaign / Project
                </h3>

                <form onSubmit={handleCreateProject} className="flex flex-col gap-3">
                  <input 
                    type="text" 
                    className="w-full bg-[#070a12] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#4f7cff] transition-colors"
                    placeholder="Campaign or brand name..." 
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                  <button type="submit" className="btn-primary-blue text-xs py-2.5 justify-center">
                    <Plus size={14} />
                    <span>Add Project</span>
                  </button>
                </form>

                {projects.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/[0.08]">
                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">Active Projects ({projects.length}):</span>
                    <div className="space-y-1.5">
                      {projects.map((p, idx) => (
                        <div key={idx} className="p-2 rounded bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-white flex items-center justify-between">
                          <span>⚡ {p.name || 'Marketing Project'}</span>
                          <span className="text-[10px] text-emerald-400">ACTIVE</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Latest AI Signals */}
              <div className="bg-[#0b1020] border border-white/[0.08] p-6 rounded-xl">
                <h3 className="font-sans font-bold text-sm text-white flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-purple-400" />
                  Latest AI Signals
                </h3>

                <div className="space-y-2.5">
                  {insights.map((i) => (
                    <div key={i.id} className="p-3 rounded-lg bg-white/[0.02] border-l-2 border-l-[#4f7cff]">
                      <div className="text-xs font-bold text-white font-sans">{i.title}</div>
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
