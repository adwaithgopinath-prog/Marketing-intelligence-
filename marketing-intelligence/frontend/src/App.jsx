import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Layers,
  ArrowUpRight,
  Activity,
  Plus,
  Compass
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [insights, setInsights] = useState([
    { id: 1, title: 'Positive Sentiment Surge', desc: 'Customer praise for product UI increased by 28% after recent release.', type: 'positive' },
    { id: 2, desc: 'Competitor X launched a new pricing model targeting mid-market users.', title: 'Competitor Update', type: 'warning' },
    { id: 3, desc: 'Customer support response times raised concerns in 12 recent reviews.', title: 'Support Delays', type: 'negative' }
  ]);

  const [reviews] = useState([
    { id: 1, author: 'Alex Turner', source: 'Google', text: 'The insights generated saved our marketing team over 15 hours a week!', sentiment: 'positive', score: 0.92 },
    { id: 2, author: 'Sarah Jenkins', source: 'Trustpilot', text: 'Decent analytics dashboard, but would love more custom exports.', sentiment: 'neutral', score: 0.51 },
    { id: 3, author: 'Markus Vance', source: 'Yelp', text: 'Initial onboarding had a slight learning curve, but backend API is solid.', sentiment: 'positive', score: 0.78 }
  ]);

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status === 'ok' ? 'Online' : 'Degraded'))
      .catch(() => setApiStatus('Offline'));

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
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-icon">
            <Sparkles size={20} />
          </div>
          <span className="logo-text">MarketingIntel</span>
        </div>

        <ul className="nav-list">
          <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <BarChart3 size={18} />
            <span>Dashboard</span>
          </li>
          <li className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <Layers size={18} />
            <span>Projects</span>
          </li>
          <li className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
            <MessageSquare size={18} />
            <span>Reviews</span>
          </li>
          <li className={`nav-item ${activeTab === 'competitors' ? 'active' : ''}`} onClick={() => setActiveTab('competitors')}>
            <Users size={18} />
            <span>Competitors</span>
          </li>
          <li className={`nav-item ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')}>
            <Compass size={18} />
            <span>AI Insights</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-title">
            <h1>Marketing Intelligence Platform</h1>
            <p>AI-driven consumer review ingestion & analytics engine</p>
          </div>
          <div className="status-badge">
            <div className="pulse-dot"></div>
            <span>Backend API: {apiStatus}</span>
          </div>
        </header>

        {/* Top Metric Cards */}
        <section className="metrics-grid">
          <div className="glass-panel metric-card">
            <div className="metric-header">
              <span>Ingested Reviews</span>
              <MessageSquare size={16} />
            </div>
            <div className="metric-value">14,290</div>
            <div className="metric-change positive">
              <TrendingUp size={14} /> +12.4% this month
            </div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-header">
              <span>Sentiment Score</span>
              <Activity size={16} />
            </div>
            <div className="metric-value">84%</div>
            <div className="metric-change positive">
              <TrendingUp size={14} /> +3.2% vs baseline
            </div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-header">
              <span>Competitors Tracked</span>
              <Users size={16} />
            </div>
            <div className="metric-value">8 Brands</div>
            <div className="metric-change positive">
              <ArrowUpRight size={14} /> Live Sync
            </div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-header">
              <span>AI Insights Generated</span>
              <Sparkles size={16} />
            </div>
            <div className="metric-value">142</div>
            <div className="metric-change positive">
              <ShieldCheck size={14} /> High Confidence
            </div>
          </div>
        </section>

        {/* Dashboard Main Content */}
        <div className="dashboard-grid">
          {/* Main Feed Section */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="card-title">
              <MessageSquare size={20} color="#6366f1" />
              Live Ingested Reviews & Sentiment Analysis
            </h2>
            <div style={{ marginTop: '16px' }}>
              {reviews.map((item) => (
                <div className="review-item" key={item.id}>
                  <div className="review-meta">
                    <strong>{item.author} ({item.source})</strong>
                    <span className={`sentiment-tag sentiment-${item.sentiment}`}>
                      {item.sentiment} ({Math.round(item.score * 100)}%)
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>"{item.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Side Panel: Create Project & AI Signals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Project Creation Box */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <h3 className="card-title">
                <Plus size={18} color="#06b6d4" />
                New Brand Campaign
              </h3>
              <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Brand / Product name..." 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <button type="submit" className="btn-primary">
                  <Plus size={16} /> Add Campaign
                </button>
              </form>
              
              {projects.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px' }}>Active Projects:</h4>
                  {projects.map((p, idx) => (
                    <div key={idx} style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '6px' }}>
                      ⚡ {p.name || 'Marketing Project'}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Insights Summary */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <h3 className="card-title">
                <Sparkles size={18} color="#10b981" />
                Latest AI Insights
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                {insights.map(i => (
                  <div key={i.id} style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', borderLeft: `3px solid ${i.type === 'positive' ? '#10b981' : i.type === 'negative' ? '#f43f5e' : '#f59e0b'}` }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>{i.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{i.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
