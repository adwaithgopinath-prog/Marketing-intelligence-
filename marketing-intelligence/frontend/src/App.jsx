import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import ProblemSection from './components/ProblemSection';
import ProductOverviewSection from './components/ProductOverviewSection';
import AnalyticsSection from './components/AnalyticsSection';
import AIIntelligenceSection from './components/AIIntelligenceSection';
import HowItWorksSection from './components/HowItWorksSection';
import UseCasesSection from './components/UseCasesSection';
import FinalCTASection from './components/FinalCTASection';
import FooterSection from './components/FooterSection';
import DashboardView from './components/DashboardView';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [isAppOpen, setIsAppOpen] = useState(false);
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
    // Health check
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status === 'ok' ? 'Online' : 'Degraded'))
      .catch(() => setApiStatus('Offline'));

    // Projects list
    fetch(`${API_BASE}/api/v1/projects`)
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(err => console.log('Projects endpoint error:', err));
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
      // Fallback local addition if DB offline
      setProjects(prev => [...prev, { id: Date.now(), name: newProjectName, created_at: new Date().toISOString() }]);
      setNewProjectName('');
    });
  };

  return (
    <div className="bg-[#070a12] text-[#f8fafc] min-h-screen relative font-sans selection:bg-[#4f7cff] selection:text-white">
      
      {/* 01 — NAVIGATION */}
      <Navbar 
        onLaunchApp={() => setIsAppOpen(!isAppOpen)} 
        isAppOpen={isAppOpen}
        apiStatus={apiStatus}
      />

      {/* 02 — HERO */}
      <HeroSection onLaunchApp={() => setIsAppOpen(true)} />

      {/* 03 — TRUST / SOCIAL PROOF */}
      <TrustSection />

      {/* 04 — CORE PROBLEM */}
      <ProblemSection />

      {/* 05 — PRODUCT OVERVIEW */}
      <ProductOverviewSection />

      {/* 06 — ANALYTICS */}
      <AnalyticsSection />

      {/* 07 — AI INTELLIGENCE */}
      <AIIntelligenceSection />

      {/* 08 — HOW IT WORKS */}
      <HowItWorksSection />

      {/* 09 — USE CASES */}
      <UseCasesSection />

      {/* 10 — FINAL CTA */}
      <FinalCTASection onLaunchApp={() => setIsAppOpen(true)} />

      {/* 11 — FOOTER */}
      <FooterSection />

      {/* INTERACTIVE WORKSPACE MODAL */}
      {isAppOpen && (
        <DashboardView 
          apiStatus={apiStatus}
          projects={projects}
          newProjectName={newProjectName}
          setNewProjectName={setNewProjectName}
          handleCreateProject={handleCreateProject}
          reviews={reviews}
          insights={insights}
          onClose={() => setIsAppOpen(false)}
        />
      )}

    </div>
  );
}
