import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import MainDashboard from './components/MainDashboard';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');

  const [insights] = useState([
    { id: 1, title: 'Positive Sentiment Surge', desc: 'Customer praise for product UI increased by 28% after recent release.', type: 'positive' },
    { id: 2, title: 'Competitor Pricing Shift', desc: 'Competitor X launched a new pricing model targeting mid-market users.', type: 'warning' },
    { id: 3, title: 'Support Delay Friction', desc: 'Customer support response times raised concerns in 12 recent reviews.', type: 'negative' }
  ]);

  const [reviews] = useState([
    { id: 1, author: 'Alex Turner', source: 'Google', text: 'The insights generated saved our marketing team over 15 hours a week!', sentiment: 'positive', score: 0.92 },
    { id: 2, author: 'Sarah Jenkins', source: 'Trustpilot', text: 'Decent analytics dashboard, but would love more custom exports.', sentiment: 'neutral', score: 0.51 },
    { id: 3, author: 'Markus Vance', source: 'Yelp', text: 'Initial onboarding had a slight learning curve, but backend API is solid.', sentiment: 'positive', score: 0.78 }
  ]);

  useEffect(() => {
    // Backend API Health Check
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status === 'ok' ? 'Online' : 'Degraded'))
      .catch(() => setApiStatus('Offline'));

    // Backend Projects Fetch
    fetch(`${API_BASE}/api/v1/projects`)
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(err => console.log('Projects endpoint status:', err));
  }, []);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    
    fetch(`${API_BASE}/api/v1/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProjectName })
    })
    .then(res => res.json())
    .then(data => {
      setProjects(prev => [...prev, data]);
      setNewProjectName('');
    })
    .catch(() => {
      // Fallback local addition if backend offline
      setProjects(prev => [...prev, { id: Date.now(), name: newProjectName, created_at: new Date().toISOString() }]);
      setNewProjectName('');
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#171717] flex font-sans selection:bg-[#2563eb] selection:text-white">
      
      {/* 1. PERMANENT LEFT SIDEBAR (240px) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. PERMANENT TOP NAVIGATION (60px) */}
        <TopNav activeTab={activeTab} apiStatus={apiStatus} />

        {/* 3. MAIN WORKSPACE DASHBOARD (BENTO GRID) */}
        <main className="flex-1 overflow-y-auto">
          <MainDashboard 
            projects={projects}
            newProjectName={newProjectName}
            setNewProjectName={setNewProjectName}
            handleCreateProject={handleCreateProject}
            reviews={reviews}
            insights={insights}
          />
        </main>

      </div>

    </div>
  );
}
