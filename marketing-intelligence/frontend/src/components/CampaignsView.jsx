import React, { useState } from 'react';
import { Plus, Search, Layers, X } from 'lucide-react';

export default function CampaignsView({ 
  projects, 
  newProjectName, 
  setNewProjectName, 
  handleCreateProject 
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const defaultCampaigns = [
    { id: 1, name: 'Search_Brand_Exact_Q3', channel: 'Google Ads', status: 'Active', spend: '₹48,200', revenue: '₹2,64,000', roas: '5.47x', cac: '₹116', conversions: '412' },
    { id: 2, name: 'Retargeting_LTV_Audience', channel: 'Meta Ads', status: 'Active', spend: '₹32,100', revenue: '₹1,28,000', roas: '3.98x', cac: '₹113', conversions: '284' },
    { id: 3, name: 'Exec_DecisionMakers_InMail', channel: 'LinkedIn Ads', status: 'Active', spend: '₹24,500', revenue: '₹1,08,000', roas: '4.40x', cac: '₹255', conversions: '96' },
    { id: 4, name: 'Lookalike_Top_Purchasers', channel: 'Meta Ads', status: 'Needs attention', spend: '₹14,200', revenue: '₹42,000', roas: '2.95x', cac: '₹161', conversions: '88' },
    { id: 5, name: 'Summer_Acquisition_Promo', channel: 'Google Ads', status: 'Paused', spend: '₹8,500', revenue: '₹24,000', roas: '2.82x', cac: '₹180', conversions: '47' },
  ];

  const mergedCampaigns = [
    ...projects.map(p => ({
      id: p.id,
      name: p.name,
      channel: 'Custom API',
      status: 'Active',
      spend: '₹10,000',
      revenue: '₹45,000',
      roas: '4.50x',
      cac: '₹120',
      conversions: '83'
    })),
    ...defaultCampaigns
  ];

  const filteredCampaigns = activeTab === 'All' 
    ? mergedCampaigns 
    : mergedCampaigns.filter(c => c.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="p-8 max-w-[1280px] mx-auto space-y-6 font-sans">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E5E2] pb-6">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#171717] tracking-tight">
            Campaigns
          </h1>
          <p className="text-sm text-[#737373] mt-1 font-sans">
            Manage and optimize active marketing initiatives.
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-mi-primary text-xs"
        >
          <Plus size={14} />
          <span>New Campaign</span>
        </button>
      </div>

      {/* TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-[#F1F1EF] p-1 rounded-lg">
          {['All', 'Active', 'Paused', 'Needs attention'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-white text-[#171717] shadow-xs font-semibold' 
                  : 'text-[#737373] hover:text-[#171717]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CAMPAIGN TABLE */}
      <div className="mi-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="mi-table">
            <thead>
              <tr>
                <th>CAMPAIGN</th>
                <th>CHANNEL</th>
                <th>SPEND</th>
                <th>REVENUE</th>
                <th>ROAS</th>
                <th>CAC</th>
                <th>CONVERSIONS</th>
                <th className="text-right">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((row) => (
                <tr key={row.id} className="hover:bg-[#F8F8F6] transition-colors">
                  <td className="font-semibold text-[#171717]">{row.name}</td>
                  <td className="font-mono text-[#737373]">{row.channel}</td>
                  <td className="font-mono text-[#171717]">{row.spend}</td>
                  <td className="font-bold text-[#171717]">{row.revenue}</td>
                  <td className="font-bold text-[#2E9B68] font-mono">{row.roas}</td>
                  <td className="font-mono text-[#737373]">{row.cac}</td>
                  <td className="font-mono text-[#171717]">{row.conversions}</td>
                  <td className="text-right">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold border ${
                      row.status === 'Active' ? 'bg-[#F0FBF5] text-[#2E9B68] border-[#2E9B68]/20' : 
                      row.status === 'Needs attention' ? 'bg-[#FEF9F0] text-[#C78A24] border-[#C78A24]/20' :
                      'bg-[#F1F1EF] text-[#737373] border-[#E5E5E2]'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE CAMPAIGN MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E2] rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-modal font-sans">
            <div className="flex items-center justify-between border-b border-[#E5E5E2] pb-3">
              <h3 className="font-sans font-bold text-base text-[#171717]">Create New Campaign</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#737373] hover:text-[#171717]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => { handleCreateProject(e); setShowAddModal(false); }} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#737373] block mb-1">CAMPAIGN NAME</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Q4_Acquisition_Search"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-[#E5E5E2] rounded-lg px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#5B5CE2]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-mi-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-mi-primary text-xs">
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
