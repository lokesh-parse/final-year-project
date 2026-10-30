import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileSearch,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Cpu,
  Database,
  Video,
  HardDrive,
  Info
} from "lucide-react";

export default function Dashboard() {
  const [statsData] = useState({
    totalAudits: 0,
    totalTrend: "+0%",
    passedAudits: 0,
    passedTrend: "+0%",
    failedAudits: 0,
    failedTrend: "-0%",
    criticalFindings: 0,
    criticalTrend: "-0%",
  });

  const [recentAudits] = useState([]);

  const systemServices = [
    { name: "AI Model", subtitle: "RAG + Azure AI Search", status: "Online", icon: Cpu },
    { name: "Database", subtitle: "Supabase", status: "Online", icon: Database },
    { name: "Video Processing", subtitle: "FFmpeg Pipeline", status: "Online", icon: Video },
    { name: "Storage", subtitle: "Supabase Storage", status: "Online", icon: HardDrive },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>👋 Compliance Dashboard</h1>
          <p>Monitor and manage your video compliance audits with AI-powered insights.</p>
        </div>
        <Link to="/new-audit" className="primary-button">
          <Plus size={18} />
          New Audit
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon-wrapper icon-blue"><FileSearch size={22} /></div>
            <span className="stat-label">Total Audits</span>
          </div>
          <div className="stat-bottom">
            <h2 className="stat-value">{statsData.totalAudits}</h2>
            <div className="trend-badge trend-up">
              <TrendingUp size={14} /> <span>{statsData.totalTrend} vs. last 7 days</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon-wrapper icon-green"><CheckCircle2 size={22} /></div>
            <span className="stat-label">Passed Audits</span>
          </div>
          <div className="stat-bottom">
            <h2 className="stat-value">{statsData.passedAudits}</h2>
            <div className="trend-badge trend-up">
              <TrendingUp size={14} /> <span>{statsData.passedTrend} vs. last 7 days</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon-wrapper icon-red"><XCircle size={22} /></div>
            <span className="stat-label">Failed Audits</span>
          </div>
          <div className="stat-bottom">
            <h2 className="stat-value">{statsData.failedAudits}</h2>
            <div className="trend-badge trend-down">
              <TrendingDown size={14} /> <span>{statsData.failedTrend} vs. last 7 days</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon-wrapper icon-orange"><AlertTriangle size={22} /></div>
            <span className="stat-label">Critical Findings</span>
          </div>
          <div className="stat-bottom">
            <h2 className="stat-value">{statsData.criticalFindings}</h2>
            <div className="trend-badge trend-down">
              <TrendingDown size={14} /> <span>{statsData.criticalTrend} vs. last 7 days</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pastel Graph Cards (Pure CSS & SVG) */}
      <section className="charts-grid">
        {/* Graph 1: Compliance Trend */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3>Compliance Trend</h3>
              <p>Pass rate over the last 7 days</p>
            </div>
            <span className="badge-tag">Last 7 days</span>
          </div>
          <div className="chart-placeholder-box">
            <svg viewBox="0 0 300 120" className="chart-svg">
              <line x1="10" y1="100" x2="290" y2="100" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="10" y1="60" x2="290" y2="60" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="4" />
              <line x1="10" y1="20" x2="290" y2="20" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="4" />
              {/* Baseline flat line when 0 */}
              <polyline points="20,100 60,100 110,100 160,100 210,100 260,100 280,100" fill="none" stroke="#10b981" strokeWidth="2.5" />
            </svg>
            <div className="chart-x-labels">
              <span>Oct 2</span><span>Oct 4</span><span>Oct 6</span><span>Oct 8</span>
            </div>
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-circle bg-green" /> Passed</span>
            <span className="legend-item"><span className="legend-circle bg-red" /> Failed</span>
          </div>
        </div>

        {/* Graph 2: Donut Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3>Audit Results</h3>
              <p>Pass / Fail distribution</p>
            </div>
          </div>
          <div className="donut-center-container">
            <svg viewBox="0 0 100 100" className="donut-svg">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="12" />
            </svg>
            <div className="donut-center-label">
              <h4>{statsData.totalAudits}</h4>
              <span>Total Audits</span>
            </div>
          </div>
          <div className="donut-legend-list">
            <div className="legend-row">
              <span className="legend-item"><span className="legend-circle bg-green" /> Passed</span>
              <strong>{statsData.passedAudits} (0%)</strong>
            </div>
            <div className="legend-row">
              <span className="legend-item"><span className="legend-circle bg-red" /> Failed</span>
              <strong>{statsData.failedAudits} (0%)</strong>
            </div>
          </div>
        </div>

        {/* Graph 3: Findings by Severity */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3>Findings by Severity</h3>
              <p>Distribution of compliance findings</p>
            </div>
          </div>
          <div className="bars-wrapper">
            <div className="bar-item">
              <div className="bar-track"><div className="bar-fill bg-red" style={{ height: '0%' }} /></div>
              <span>Critical</span>
            </div>
            <div className="bar-item">
              <div className="bar-track"><div className="bar-fill bg-orange" style={{ height: '0%' }} /></div>
              <span>High</span>
            </div>
            <div className="bar-item">
              <div className="bar-track"><div className="bar-fill bg-yellow" style={{ height: '0%' }} /></div>
              <span>Medium</span>
            </div>
            <div className="bar-item">
              <div className="bar-track"><div className="bar-fill bg-blue" style={{ height: '0%' }} /></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Recent Audits & System Status */}
      <div className="dashboard-main-grid">
        <section className="dashboard-section recent-audits-card">
          <div className="section-header">
            <div>
              <h2>Recent Audits</h2>
              <p>Latest compliance audit results.</p>
            </div>
            <Link to="/audit-history" className="section-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {recentAudits.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><FileSearch size={32} /></div>
              <h3>No audits yet</h3>
              <p>Start your first video compliance audit to see results here.</p>
              <Link to="/new-audit" className="secondary-button">
                <Plus size={17} /> Create First Audit
              </Link>
            </div>
          ) : null}
        </section>

        {/* System Status Section */}
        <section className="dashboard-section system-status-card">
          <div className="section-header">
            <div>
              <h2>System Status</h2>
              <p>Current platform status</p>
            </div>
          </div>
          <div className="system-status-list">
            {systemServices.map((service) => {
              const Icon = service.icon;
              return (
                <div className="system-status-row" key={service.name}>
                  <div className="system-icon-box"><Icon size={18} /></div>
                  <div className="system-info">
                    <strong>{service.name}</strong>
                    <span>{service.subtitle}</span>
                  </div>
                  <div className="status-badge-online">
                    <span className="dot online" /> {service.status}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="system-footer-note">
            <Info size={16} />
            <div>
              <p className="note-title">All systems are operating normally.</p>
              <p className="note-sub">Ready for compliance audits.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}