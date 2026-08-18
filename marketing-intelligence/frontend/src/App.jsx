import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductStory from './components/ProductStory';
import AnalyticsSection from './components/AnalyticsSection';
import AIInsightsSection from './components/AIInsightsSection';
import DashboardView from './components/DashboardView';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

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
    <div className="bg-[#08090c] text-[#f4f4f6] min-h-screen relative font-sans selection:bg-[#ff4800] selection:text-white">
      
      {/* Editorial Navigation */}
      <Navbar 
        onLaunchApp={() => setIsAppOpen(!isAppOpen)} 
        isAppOpen={isAppOpen}
        apiStatus={apiStatus}
      />

      {/* Hero Section */}
      <div id="product">
        <Hero onLaunchApp={() => setIsAppOpen(true)} />
      </div>

      {/* Product Workflow Story */}
      <ProductStory />

      {/* Analytics Visualizations */}
      <AnalyticsSection />

      {/* Dramatic AI Insights Engine */}
      <AIInsightsSection onLaunchApp={() => setIsAppOpen(true)} />

      {/* Final CTA */}
      <FinalCTA onLaunchApp={() => setIsAppOpen(true)} />

      {/* Minimal Footer */}
      <Footer />

      {/* Full Live Dashboard Modal View */}
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
