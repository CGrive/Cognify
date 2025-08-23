/*
  Dashboard.jsx
  A responsive, polished dashboard layout for Cognify.

  Usage:
  - Save this file as src/pages/Dashboard.jsx
  - Ensure your project has the global CSS variables (e.g. --card-bg, --accent-color) from src/index.css
  - Import and use <Dashboard /> in your router for the /dashboard route

  This is a single-file component that injects its own CSS at runtime so you can drop it in without extra files.
*/

import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

    useEffect(() => {
        // inject styles once
        const styleId = 'cognify-dashboard-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
      .dashboard-root{ display:flex; gap:20px; align-items:flex-start; padding:20px 0; }
      .dashboard-root .sidebar{ width:260px; background:var(--card-bg,#1e1e1e); border-radius:10px; padding:18px; height:calc(100vh - 120px); position:sticky; top:20px; box-shadow: 0 8px 20px rgba(0,0,0,0.6); transition: transform 260ms ease, opacity 260ms ease; }
      .sidebar.closed{ transform: translateX(-110%); opacity:0; }
      .sidebar .brand{ display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
      .sidebar .brand h2{ color:var(--accent-color,#4cafef); font-size:1.2rem; }
      .sidebar nav ul{ list-style:none; padding:0; margin-top:8px; display:flex; flex-direction:column; gap:8px; }
      .sidebar nav a{ color:var(--text-color,#fff); padding:10px 8px; display:block; border-radius:6px; font-weight:500; }
      .sidebar nav a:hover{ background: rgba(255,255,255,0.03); color:var(--accent-color,#4cafef); }
      .sidebar .profile{ margin-top:auto; display:flex; gap:10px; align-items:center; padding-top:12px; border-top:1px solid rgba(255,255,255,0.03); }
      .avatar{ width:44px; height:44px; border-radius:10px; background:linear-gradient(135deg,#334155,#0f1720); display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; }

      .main-area{ flex:1; min-width:0; }
      .main-header{ display:flex; gap:12px; align-items:center; justify-content:space-between; margin-bottom:18px; }
      .left-controls{ display:flex; gap:12px; align-items:center; }
      .hamburger{ background:transparent; border:1px solid rgba(255,255,255,0.06); padding:8px; border-radius:8px; cursor:pointer; font-size:18px; }
      .searchbox{ background:var(--card-bg,#1e1e1e); padding:8px 12px; border-radius:10px; display:flex; gap:8px; align-items:center; border:1px solid rgba(255,255,255,0.03); }
      .searchbox input{ background:transparent; border:0; outline:none; color:var(--text-color,#fff); width:260px; }
      .header-actions{ display:flex; gap:10px; align-items:center; }

      .overview-grid{ display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:12px; margin-bottom:18px; }
      .overview-card{ background:var(--card-bg,#1e1e1e); padding:14px; border-radius:10px; box-shadow: 0 6px 16px rgba(0,0,0,0.45); }
      .overview-card h4{ margin-bottom:8px; }
      .overview-card .big{ font-size:1.4rem; font-weight:700; }

      .content-grid{ display:grid; grid-template-columns: 2fr 1fr; gap:12px; }
      .card{ background:var(--card-bg,#1e1e1e); padding:14px; border-radius:10px; box-shadow: 0 6px 18px rgba(0,0,0,0.45); }

      .projects-list{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
      .project-item{ display:flex; justify-content:space-between; gap:12px; align-items:center; padding:10px; border-radius:8px; background: linear-gradient(180deg, rgba(255,255,255,0.01), transparent); }
      .project-meta{ display:flex; gap:12px; align-items:center; }
      .project-title{ font-weight:600; }
      .project-actions button{ margin-left:8px; padding:6px 10px; border-radius:6px; border:0; cursor:pointer; }

      .tools-grid{ display:flex; gap:8px; flex-wrap:wrap; }
      .tool-btn{ padding:10px 12px; border-radius:8px; background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.03); cursor:pointer; }

      .activity-list{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
      .activity-item{ padding:10px; border-radius:8px; background: linear-gradient(180deg, rgba(255,255,255,0.01), transparent); }

      /* small screens */
      @media (max-width: 900px){
        .dashboard-root{ padding:12px 0; }
        .dashboard-root .sidebar{ position:fixed; left:12px; top:80px; z-index:1200; height:calc(100vh - 100px); }
        .overview-grid{ grid-template-columns: repeat(2,1fr); }
        .content-grid{ grid-template-columns: 1fr; }
        .searchbox input{ width:140px; }
      }

      @media (max-width: 520px){
        .overview-grid{ grid-template-columns: 1fr; }
        .searchbox input{ width:100px; }
      }
      `;
            document.head.appendChild(style);
        }

        // close sidebar on small screens when resizing
        const onResize = () => {
            if (window.innerWidth <= 900) setSidebarOpen(false);
            else setSidebarOpen(true);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const mockProjects = [
        { id: 1, title: 'Deep Learning in NLP', updated: '2 days ago', progress: 48 },
        { id: 2, title: 'Survey on Transformer Models', updated: '1 week ago', progress: 72 },
        { id: 3, title: 'Data Analysis of Climate CSV', updated: '3 weeks ago', progress: 23 },
    ];

    const mockActivities = [
        { id: 1, text: 'You published a draft: "Experimental Results on X"', time: '3h' },
        { id: 2, text: 'Anna commented on your project: "Great findings!"', time: '1d' },
        { id: 3, text: 'You ran summarizer on "Transformer paper"', time: '2d' },
    ];

    return (
        <div className="dashboard-root">
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="brand">
                    <h2>Cognify</h2>
                    <button className="hamburger" aria-label="close" onClick={() => setSidebarOpen(false)}>✕</button>
                </div>

                <nav>
                    <ul>
                        <li><a href="#">Overview</a></li>
                        <li><a href="#projects">My Projects</a></li>
                        <li><a href="#tools">AI Tools</a></li>
                        <li><a href="#citations">Citations</a></li>
                        <li><a href="#feed">Social Feed</a></li>
                        <li><a href="#account">Account</a></li>
                    </ul>
                </nav>

                <div className="profile">
                    <div className="avatar">JD</div>
                    <div>
                        <div style={{ fontWeight: 700 }}>John Doe</div>
                        <div style={{ fontSize: 12, color: 'var(--muted,#9aa4b2)' }}>Researcher • 12 followers</div>
                    </div>
                </div>
            </aside>

            <div className="main-area">
                <div className="main-header">
                    <div className="left-controls">
                        <button className="hamburger" aria-label="open sidebar" onClick={() => setSidebarOpen(s => !s)}>☰</button>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 14, color: 'var(--muted,#9aa4b2)' }}>Welcome back,</div>
                            <div style={{ fontWeight: 800 }}>John — here's your workspace</div>
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <div className="searchbox">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="11" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <input placeholder="Search projects, tools, papers..." />
                        </div>
                    </div>

                    <div className="header-actions">
                        <button onClick={() => alert('Create new project (stub)')}>+ New Project</button>
                        <button onClick={() => alert('Publish (stub)')}>Publish</button>
                    </div>
                </div>

                <div className="overview-grid">
                    <div className="overview-card card">
                        <h4>Projects</h4>
                        <div className="big">{mockProjects.length}</div>
                        <div style={{ marginTop: 8, fontSize: 13, color: 'var(--muted,#9aa4b2)' }}>Active projects</div>
                    </div>
                    <div className="overview-card card">
                        <h4>AI Tools</h4>
                        <div className="big">5</div>
                        <div style={{ marginTop: 8, fontSize: 13, color: 'var(--muted,#9aa4b2)' }}>Available</div>
                    </div>
                    <div className="overview-card card">
                        <h4>Followers</h4>
                        <div className="big">12</div>
                        <div style={{ marginTop: 8, fontSize: 13, color: 'var(--muted,#9aa4b2)' }}>People following you</div>
                    </div>
                    <div className="overview-card card">
                        <h4>Storage</h4>
                        <div className="big">3.2 GB</div>
                        <div style={{ marginTop: 8, fontSize: 13, color: 'var(--muted,#9aa4b2)' }}>Used</div>
                    </div>
                </div>

                <div className="content-grid">
                    <div className="projects-panel card" id="projects">
                        <h3>My Projects</h3>
                        <p style={{ color: 'var(--muted,#9aa4b2)', marginBottom: 12 }}>Recent projects — click to open or continue editing.</p>
                        <ul className="projects-list">
                            {mockProjects.map(p => (
                                <li key={p.id} className="project-item">
                                    <div className="project-meta">
                                        <div style={{ width: 8, height: 8, borderRadius: 4, background: 'linear-gradient(90deg,#6ee7b7,#4cafef)' }}></div>
                                        <div>
                                            <div className="project-title">{p.title}</div>
                                            <div style={{ fontSize: 12, color: 'var(--muted,#9aa4b2)' }}>{p.updated} • {p.progress}%</div>
                                        </div>
                                    </div>

                                    <div className="project-actions">
                                        <button onClick={() => alert('Open project: ' + p.title)}>Open</button>
                                        <button onClick={() => alert('More actions (stub)')}>•••</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div className="card" id="tools">
                            <h3>Quick AI Tools</h3>
                            <p style={{ color: 'var(--muted,#9aa4b2)' }}>Run tools on selected text or files.</p>
                            <div className="tools-grid" style={{ marginTop: 8 }}>
                                <button className="tool-btn" onClick={() => alert('Summarizer (stub)')}>Summarizer</button>
                                <button className="tool-btn" onClick={() => alert('Data Analysis (stub)')}>Data Analysis</button>
                                <button className="tool-btn" onClick={() => alert('Hypothesis Validator (stub)')}>Hypothesis Validator</button>
                                <button className="tool-btn" onClick={() => alert('Originality Checker (stub)')}>Originality Checker</button>
                                <button className="tool-btn" onClick={() => alert('Find Papers (stub)')}>Find Papers</button>
                            </div>
                        </div>

                        <div className="card" id="activity">
                            <h3>Recent Activity</h3>
                            <ul className="activity-list">
                                {mockActivities.map(a => (
                                    <li key={a.id} className="activity-item">
                                        <div style={{ fontSize: 13 }}>{a.text}</div>
                                        <div style={{ fontSize: 12, color: 'var(--muted,#9aa4b2)' }}>{a.time}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card" id="stats">
                            <h3>Quick Stats</h3>
                            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted,#9aa4b2)' }}>Mini charts will go here (integration later)</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
