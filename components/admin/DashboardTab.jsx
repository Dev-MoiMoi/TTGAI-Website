import React, { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../lib/admin';
import { getSessionToken } from '../../lib/security';

const IconUsers = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconNews = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>;
const IconImage = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const IconClock = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const IconMail = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconAlert = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

const KpiCard = ({ label, value, sub, icon, accent, onClick }) => (
  <button type="button" className={`adm-kpi ${accent}`} onClick={onClick}>
    <span className="adm-kpi-icon">{icon}</span>
    <div className="adm-kpi-body">
      <span className="adm-kpi-value">{value}</span>
      <span className="adm-kpi-label">{label}</span>
      {sub && <span className="adm-kpi-sub">{sub}</span>}
    </div>
  </button>
);

const Panel = ({ title, icon, action, onTitleClick, children }) => (
  <section className="adm-dash-panel">
    <header className="adm-dash-panel-hd">
      <h3 className="adm-dash-panel-title" onClick={onTitleClick}>{icon} {title}</h3>
      {action}
    </header>
    {children}
  </section>
);

const BarRow = ({ label, count, total, onClick }) => (
  <button type="button" className="adm-bar-row" onClick={onClick}>
    <span className="adm-bar-label">{label}</span>
    <span className="adm-bar-track">
      <span className="adm-bar-fill" style={{ width: `${total ? (count / total) * 100 : 0}%` }} />
    </span>
    <span className="adm-bar-count">{count}</span>
  </button>
);

const DashboardTab = ({ onNavigate }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [approvingId, setApprovingId] = useState(null);

  const fetchStats = useCallback(() => {
    adminApi
      .getDashboardStats(getSessionToken())
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const approve = async (id) => {
    setApprovingId(id);
    try {
      await adminApi.updateNewsletter(getSessionToken(), id, { status: 'approved' });
      fetchStats();
    } catch (err) {
      console.error('Approve failed:', err);
      alert('Approve failed. Please try again.');
    } finally {
      setApprovingId(null);
    }
  };

  const exportCSV = async () => {
    try {
      const subs = await adminApi.getAllSubscribers(getSessionToken());
      const header = 'Name,Email,Date Subscribed,Status';
      const rows = subs.map((s) => [
        `"${(s.name || '').replace(/"/g, '""')}"`,
        `"${s.email}"`,
        `"${s.subscribed_at ? fmtDate(s.subscribed_at) : ''}"`,
        s.is_active ? 'Active' : 'Unsubscribed',
      ].join(','));
      const csv = [header, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ttgai-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="adm-tab-content">
        <div className="adm-loading">
          <span className="adm-spinner adm-spinner--lg" /> Loading dashboard…
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="adm-tab-content">
        <div className="adm-page-header">
          <div className="adm-page-title-wrap">
            <h2 className="adm-section-title">Dashboard</h2>
            <p className="adm-section-sub">Error: {error}</p>
          </div>
          <button className="adm-export-btn" onClick={fetchStats}>Retry</button>
        </div>
      </div>
    );
  }

  const { subscribers, newsletters, siteImages } = stats;
  const pendingNls = newsletters.recent.filter((n) => n.status === 'pending');

  return (
    <div className="adm-tab-content">
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h2 className="adm-section-title">Dashboard</h2>
          <p className="adm-section-sub">A live snapshot of your subscribers, newsletters, and site content.</p>
        </div>
        <button className="adm-export-btn" onClick={fetchStats} disabled={loading}>Refresh</button>
      </div>

      {/* KPI cards */}
      <div className="adm-kpi-grid">
        <KpiCard
          label="Active Subscribers"
          value={subscribers.active}
          sub={`of ${subscribers.total} total`}
          icon={<IconUsers />}
          accent="kpi--indigo"
          onClick={() => onNavigate('subscribers')}
        />
        <KpiCard
          label="Total Subscribers"
          value={subscribers.total}
          sub={`${subscribers.newThisMonth} new in 30 days`}
          icon={<IconMail />}
          accent="kpi--blue"
          onClick={() => onNavigate('subscribers')}
        />
        <KpiCard
          label="New This Week"
          value={subscribers.newThisWeek}
          sub={`${subscribers.newToday} today`}
          icon={<IconClock />}
          accent="kpi--emerald"
          onClick={() => onNavigate('subscribers')}
        />
        <KpiCard
          label="Approved Newsletters"
          value={newsletters.approved}
          sub={`of ${newsletters.total} total`}
          icon={<IconNews />}
          accent="kpi--violet"
          onClick={() => onNavigate('newsletters')}
        />
        <KpiCard
          label="Pending Approval"
          value={newsletters.pending}
          sub={newsletters.pending ? 'needs review' : 'all caught up'}
          icon={<IconAlert />}
          accent={newsletters.pending ? 'kpi--amber' : 'kpi--emerald'}
          onClick={() => onNavigate('newsletters')}
        />
        <KpiCard
          label="Site Images Filled"
          value={`${siteImages.filled}/${siteImages.total}`}
          sub="custom images uploaded"
          icon={<IconImage />}
          accent="kpi--rose"
          onClick={() => onNavigate('site-images')}
        />
      </div>

      <div className="adm-dash-grid">
        {/* Needs attention */}
        <Panel
          title="Needs Attention"
          icon={<IconAlert />}
          onTitleClick={() => onNavigate('newsletters')}
          action={
            <button type="button" className="adm-dash-link" onClick={() => onNavigate('newsletters')}>View all →</button>
          }
        >
          {pendingNls.length === 0 ? (
            <div className="adm-dash-empty">No pending newsletters — all caught up.</div>
          ) : (
            <ul className="adm-dash-list">
              {pendingNls.map((n) => (
                <li key={n.id} className="adm-dash-row">
                  <span className="adm-dash-row-main">
                    <span className="adm-dash-row-title">{n.title}</span>
                    <span className="adm-dash-row-meta">{n.author} · {n.batch_year || '—'}</span>
                  </span>
                  <button
                    type="button"
                    className="adm-approve-btn"
                    onClick={() => approve(n.id)}
                    disabled={approvingId === n.id}
                  >
                    {approvingId === n.id ? '…' : 'Approve'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* Site images snapshot */}
        <Panel
          title="Site Images Snapshot"
          icon={<IconImage />}
          onTitleClick={() => onNavigate('site-images')}
          action={
            <button type="button" className="adm-dash-link" onClick={() => onNavigate('site-images')}>Manage →</button>
          }
        >
          <ul className="adm-dash-list">
            {siteImages.bySection.map((sec) => (
              <li key={sec.section} className="adm-dash-row">
                <span className="adm-dash-row-main">
                  <span className="adm-dash-row-title">{sec.section}</span>
                </span>
                <span className="adm-bar-track adm-bar-track--sm">
                  <span className="adm-bar-fill" style={{ width: `${sec.total ? (sec.filled / sec.total) * 100 : 0}%` }} />
                </span>
                <span className="adm-bar-count">{sec.filled}/{sec.total}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Recent newsletters */}
        <Panel
          title="Recent Newsletters"
          icon={<IconNews />}
          onTitleClick={() => onNavigate('newsletters')}
          action={
            <button type="button" className="adm-dash-link" onClick={() => onNavigate('newsletters')}>Manage →</button>
          }
        >
          {newsletters.recent.length === 0 ? (
            <div className="adm-dash-empty">No newsletters yet.</div>
          ) : (
            <ul className="adm-dash-list">
              {newsletters.recent.map((n) => (
                <li key={n.id} className="adm-dash-row">
                  <span className="adm-dash-thumb">
                    {n.image_url
                      ? <img src={n.image_url} alt="" />
                      : <span className="adm-dash-thumb-none"><IconNews /></span>}
                  </span>
                  <span className="adm-dash-row-main">
                    <span className="adm-dash-row-title">{n.title}</span>
                    <span className="adm-dash-row-meta">{n.author} · {n.batch_year || '—'} · {fmtDate(n.created_at)}</span>
                  </span>
                  <span className={`adm-status-badge ${n.status === 'approved' ? 'adm-status-badge--active' : 'adm-status-badge--unsub'}`}>
                    {n.status === 'approved' ? 'Approved' : 'Pending'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* Recent subscribers */}
        <Panel
          title="Recent Subscribers"
          icon={<IconUsers />}
          onTitleClick={() => onNavigate('subscribers')}
          action={
            <button type="button" className="adm-export-btn" onClick={exportCSV}>Export CSV</button>
          }
        >
          {subscribers.recent.length === 0 ? (
            <div className="adm-dash-empty">No subscribers yet.</div>
          ) : (
            <ul className="adm-dash-list">
              {subscribers.recent.map((s) => (
                <li key={s.email + s.subscribed_at} className="adm-dash-row">
                  <span className="adm-dash-row-main">
                    <span className="adm-dash-row-title">{s.name || '—'}</span>
                    <span className="adm-dash-row-meta">{s.email} · {fmtDate(s.subscribed_at)}</span>
                  </span>
                  <span className={`adm-status-badge ${s.is_active ? 'adm-status-badge--active' : 'adm-status-badge--unsub'}`}>
                    {s.is_active ? 'Active' : 'Unsubscribed'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* Breakdowns */}
        <Panel title="Newsletters by Category" icon={<IconNews />} onTitleClick={() => onNavigate('newsletters')}>
          {newsletters.byCategory.length === 0 ? (
            <div className="adm-dash-empty">No data yet.</div>
          ) : (
            <div className="adm-bar-list">
              {newsletters.byCategory.map((b) => (
                <BarRow key={b.label} label={b.label} count={b.count} total={newsletters.total} onClick={() => onNavigate('newsletters')} />
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Newsletters by Batch" icon={<IconNews />} onTitleClick={() => onNavigate('newsletters')}>
          {newsletters.byBatch.length === 0 ? (
            <div className="adm-dash-empty">No data yet.</div>
          ) : (
            <div className="adm-bar-list">
              {newsletters.byBatch.map((b) => (
                <BarRow key={b.label} label={b.label} count={b.count} total={newsletters.total} onClick={() => onNavigate('newsletters')} />
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
};

export default DashboardTab;
