import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../lib/admin';
import { sendNewsletterNotify } from '../lib/emailjs';
import {
  hashPassword,
  recordFailedLogin,
  resetLoginAttempts,
  getLoginLockStatus,
  createSession,
  destroySession,
  isSessionValid,
  getSessionToken,
  refreshSession,
  sanitizeHTML,
  sanitizeName,
  sanitizeText,
} from '../lib/security';
import '../styles/admin.css';
import SiteImagesTab from '../components/admin/SiteImagesTab';
import DashboardTab from '../components/admin/DashboardTab';
import { uploadImage } from '../lib/cloudinary';

/* ════════════════════════════════════════════
   SVG Icons
════════════════════════════════════════════ */
const IconLock = () => <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconGolf = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>;
const IconDashboard = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconNews = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>;
const IconUsers = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconAnalytics = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const IconBell = ({size=18}) => <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const IconSettings = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const IconLogOut = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const IconSearch = ({size=16}) => <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconFilter = ({size=14}) => <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const IconMailPlane = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const IconEdit = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconDelete = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const IconDoc = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const IconSent = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconDraft = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const IconImage = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;

/* ════════════════════════════════════════════
   Password Gate — with brute‑force protection
════════════════════════════════════════════ */
const PasswordGate = ({ onAuth }) => {
  const [pw, setPw] = useState('');
  const [wrong, setWrong] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [lockInfo, setLockInfo] = useState(getLoginLockStatus());
  const [verifying, setVerifying] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  // Countdown timer when locked out
  useEffect(() => {
    if (!lockInfo.locked) return;
    const interval = setInterval(() => {
      const status = getLoginLockStatus();
      setLockInfo(status);
      if (!status.locked) { clearInterval(interval); }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockInfo.locked]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const status = getLoginLockStatus();
    if (status.locked) { setLockInfo(status); return; }

    setVerifying(true);
    setNetworkError(false);
    try {
      const inputHash = await hashPassword(pw);
      const data = await adminApi.login(inputHash);
      resetLoginAttempts();
      createSession(data.token);
      onAuth();
    } catch (err) {
      if (err.status === 429) {
        setLockInfo({ locked: true, remainingSec: 300, attemptsLeft: 0 });
        setPw('');
      } else if (err.status === 401) {
        const result = recordFailedLogin();
        setLockInfo(result);
        setWrong(true);
        setShaking(true);
        setPw('');
        setTimeout(() => setShaking(false), 500);
      } else {
        setNetworkError(true);
        setPw('');
      }
    } finally {
      setVerifying(false);
    }
  };

  const formatLockTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="adm-gate">
      {/* Decorative background elements */}
      <div className="adm-gate-bg-orb adm-gate-bg-orb--1" />
      <div className="adm-gate-bg-orb adm-gate-bg-orb--2" />
      <div className="adm-gate-bg-orb adm-gate-bg-orb--3" />

      {/* Back to website */}
      <Link to="/" className="adm-gate-back">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Website
      </Link>

      <div className={`adm-gate-card${shaking ? ' adm-gate-card--shake' : ''}`}>
        {/* Logo / Branding */}
        <div className="adm-gate-brand">
          <div className="adm-gate-logo-ring">
            <IconGolf />
          </div>
          <span className="adm-gate-brand-name">TTGAI</span>
          <span className="adm-gate-brand-tag">Administration Portal</span>
        </div>

        {/* Divider */}
        <div className="adm-gate-divider" />

        {/* Lock icon + heading */}
        <div className="adm-gate-lock-wrap">
          <IconLock />
        </div>
        <h1>Admin Access</h1>
        <p>Enter your credentials to access the dashboard.</p>

        <form onSubmit={handleLogin}>
          <div className="adm-gate-input-wrap">
            <svg className="adm-gate-input-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPw ? 'text' : 'password'}
              className="adm-gate-input"
              placeholder="Enter admin password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setWrong(false); setNetworkError(false); }}
              disabled={lockInfo.locked || verifying}
              autoFocus
            />
            <button
              type="button"
              className="adm-gate-eye"
              onClick={() => setShowPw(!showPw)}
              tabIndex={-1}
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {lockInfo.locked && (
            <div className="adm-gate-error">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              Too many failed attempts. Try again in {formatLockTime(lockInfo.remainingSec)}.
            </div>
          )}

          {wrong && !lockInfo.locked && (
            <div className="adm-gate-error">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              Incorrect password. {lockInfo.attemptsLeft} attempt{lockInfo.attemptsLeft !== 1 ? 's' : ''} remaining.
            </div>
          )}

          {networkError && (
            <div className="adm-gate-error">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              Could not reach the admin service. Check your connection and try again.
            </div>
          )}

          <button type="submit" className="adm-gate-btn" disabled={lockInfo.locked || verifying || !pw}>
            {verifying ? (
              <><span className="adm-spinner" style={{width:16,height:16}} /> Verifying…</>
            ) : (
              <>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Enter Admin Panel
              </>
            )}
          </button>
        </form>

        <p className="adm-gate-footer-note">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Secured access · TTGAI © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   Confirm Modal
════════════════════════════════════════════ */
const ConfirmModal = ({ newsletter, subscriberCount, onConfirm, onCancel }) => (
  <div className="adm-modal-overlay" onClick={onCancel}>
    <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
      <div className="adm-modal-icon"><IconMailPlane /></div>
      <h2>Send newsletter notification to {subscriberCount} subscribers?</h2>
      <div className="adm-modal-nl-title">"{newsletter.caption}"</div>
      <div className="adm-modal-actions">
        <button className="adm-modal-cancel" onClick={onCancel}>Cancel</button>
        <button className="adm-modal-confirm" onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   Newsletters Tab
════════════════════════════════════════════ */
const NewslettersTab = () => {
  const [dbNls, setDbNls] = useState([]);
  const [notifyState, setNotifyState] = useState({}); // { [id]: 'idle'|'loading'|'confirming'|'sending'|'done'|'error' }
  const [subscribers, setSubscribers] = useState([]);
  const [modal, setModal] = useState(null); // { type: 'notify'|'create'|'edit'|'delete', newsletter?, editData? }
  const [sendProgress, setSendProgress] = useState({}); // { [id]: { sent, total, failed } }
  const [imgUploading, setImgUploading] = useState(false);
  const imgInputRef = useRef(null);

  const handleImageFile = async (file) => {
    if (!file) return;
    setImgUploading(true);
    try {
      const url = await uploadImage(file, { folder: 'ttgai-newsletters', tags: 'approved' });
      setModal((m) => ({ ...m, editData: { ...m.editData, image_url: url } }));
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setImgUploading(false);
    }
  };

  const fetchNewsletters = () => {
    adminApi.listNewsletters(getSessionToken()).then(setDbNls).catch(err => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const allNls = dbNls.map(n => ({
    id: n.id,
    caption: n.title,
    scholar_name: n.author,
    batch_year: n.batch_year || 'Unknown Batch',
    status: n.status || 'pending',
    isDb: true,
    originalData: n
  }));

  const getState = (id) => notifyState[id] || 'idle';
  const setState = (id, s) => setNotifyState((prev) => ({ ...prev, [id]: s }));

  // --- Actions ---
  const handleNotify = async (newsletter) => {
    setState(newsletter.id, 'loading');
    try {
      const allSubs = await adminApi.getAllSubscribers(getSessionToken());
      const activeSubs = allSubs.filter(s => s.is_active === true || s.is_active === 'true' || s.is_active === null);
      
      setSubscribers(activeSubs);
      setModal({ type: 'notify', newsletter });
      setState(newsletter.id, 'confirming');
    } catch (err) {
      console.error('Fetch Error:', err);
      setState(newsletter.id, 'error');
    }
  };

  const handleConfirmNotify = async () => {
    const { newsletter } = modal;
    setModal(null);
    setState(newsletter.id, 'sending');
    
    let sentCount = 0;
    let failedCount = 0;
    let lastError = null;
    const total = subscribers.length;
    setSendProgress((prev) => ({ ...prev, [newsletter.id]: { sent: 0, total, failed: 0 } }));

    for (const sub of subscribers) {
      const payload = {
        subscriber_email:  sub.email,
        subscriber_name:   sub.name || 'Friend',
        newsletter_title:  newsletter.context?.custom?.caption || newsletter.caption || 'New Newsletter',
        scholar_name:      newsletter.context?.custom?.scholar_name || newsletter.scholar_name || 'TTGAI Team',
        batch_year:        newsletter.context?.custom?.batch_year || newsletter.batch_year || '2025',
        publish_date:      new Date().toLocaleDateString(),
        newsletter_url:    'https://ttgai-website.vercel.app/newsletter'
      }

      try {
        await sendNewsletterNotify(payload);
        sentCount++;
      } catch (err) {
        failedCount++;
        lastError = err;
      }

      setSendProgress((prev) => ({ ...prev, [newsletter.id]: { sent: sentCount, failed: failedCount, total } }));
      await new Promise((r) => setTimeout(r, 450));
    }
    
    if (failedCount > 0 && sentCount === 0) {
      alert(`Failed to send emails. EmailJS Error: ${lastError?.text || lastError?.message || 'Unknown error'}`);
      setState(newsletter.id, 'error');
    } else {
      setState(newsletter.id, 'done');
      // Update database status to 'sent' if desired, skipping for now to keep status as 'approved'
    }
  };

  const handleApprove = async (id) => {
    await adminApi.updateNewsletter(getSessionToken(), id, { status: 'approved' });
    fetchNewsletters();
  };

  const openCreate = () => {
    setModal({
      type: 'create',
      editData: { title: '', author: '', batch_year: '', school: '', category: 'Events', volume_key: '', excerpt: '', image_url: '' }
    });
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    await adminApi.createNewsletter(getSessionToken(), {
      title: modal.editData.title,
      author: modal.editData.author,
      batch_year: modal.editData.batch_year,
      school: modal.editData.school,
      category: modal.editData.category,
      volume_key: modal.editData.volume_key,
      excerpt: modal.editData.excerpt,
      image_url: modal.editData.image_url || '',
      status: 'approved' // defaulting to approved for admin creation
    });
    fetchNewsletters();
    setModal(null);
  };

  const openEdit = (nl) => {
    setModal({
      type: 'edit',
      newsletter: nl,
      editData: {
        title: nl.caption || '',
        author: nl.scholar_name || '',
        batch_year: nl.batch_year || '',
        school: nl.originalData?.school || '',
        category: nl.originalData?.category || 'Events',
        volume_key: nl.originalData?.volume_key || '',
        excerpt: nl.originalData?.excerpt || '',
        image_url: nl.originalData?.image_url || ''
      }
    });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await adminApi.updateNewsletter(getSessionToken(), modal.newsletter.id, {
      title: modal.editData.title,
      author: modal.editData.author,
      batch_year: modal.editData.batch_year,
      school: modal.editData.school,
      category: modal.editData.category,
      volume_key: modal.editData.volume_key,
      excerpt: modal.editData.excerpt,
      image_url: modal.editData.image_url || ''
    });
    fetchNewsletters();
    setModal(null);
  };

  const openDelete = (nl) => {
    setModal({ type: 'delete', newsletter: nl });
  };

  const confirmDelete = async () => {
    await adminApi.deleteNewsletter(getSessionToken(), modal.newsletter.id);
    fetchNewsletters();
    setModal(null);
  };

  return (
    <div className="adm-tab-content">
      <div className="adm-page-header">
         <div className="adm-page-title-wrap">
            <h2 className="adm-section-title">Manage Newsletters</h2>
            <p className="adm-section-sub">Review database submissions, finalize editorial details, or broadcast published editions to your subscriber network.</p>
         </div>
         <button className="adm-create-btn" onClick={openCreate}>
            + CREATE NEWSLETTER
         </button>
      </div>

      <div className="adm-filters-bar">
         <div className="adm-filters-left">
            <span className="adm-filters-label"><IconFilter /> FILTERS</span>
            <select className="adm-filter-select">
               <option>Status: All</option>
               <option>Status: Pending</option>
               <option>Status: Sent</option>
            </select>
            <select className="adm-filter-select">
               <option>Batch: Sinag at Dangal</option>
               <option>Batch: All</option>
            </select>
            <select className="adm-filter-select">
               <option>Year: 2025</option>
               <option>Year: 2024</option>
            </select>
         </div>
         <div className="adm-filters-right">
            Showing <strong>{allNls.length}</strong> of <strong>{allNls.length}</strong> Newsletters
         </div>
      </div>

      <div className="adm-nl-grid">
        {allNls.map((nl) => {
          const state = getState(nl.id);
          const prog = sendProgress[nl.id];

          return (
            <div key={nl.id} className="adm-nl-card" style={nl.status === 'pending' ? {borderColor: '#f59e0b'} : {}}>
              <div className="adm-nl-card-top">
                 <div className="adm-nl-badge-wrap">
                    <span className="adm-nl-badge"><IconDoc /> NEWSLETTER</span>
                    {nl.status === 'pending' && <span className="adm-nl-status" style={{color: '#f59e0b'}}><IconDraft /> Draft</span>}
                    {nl.status === 'approved' && state === 'done' && <span className="adm-nl-status sent"><IconSent /> Sent</span>}
                 </div>
                {nl.isDb && (
                  <div className="adm-nl-actions">
                    <button className="adm-edit-icon" onClick={() => openEdit(nl)} title="Edit"><IconEdit /></button>
                    <button className="adm-del-icon" onClick={() => openDelete(nl)} title="Delete"><IconDelete /></button>
                  </div>
                )}
              </div>
              <h3 className="adm-nl-title">{nl.caption}</h3>
              <div className="adm-nl-meta-row">
                 <div className="adm-nl-meta-col">
                    <span className="adm-nl-meta-lbl">AUTHOR</span>
                    <span className="adm-nl-meta-val">{nl.scholar_name}</span>
                 </div>
                 <div className="adm-nl-meta-col">
                    <span className="adm-nl-meta-lbl">RECIPIENT BATCH</span>
                    <span className="adm-nl-meta-val">{nl.batch_year}</span>
                 </div>
              </div>

              {/* Action area */}
              <div className="adm-card-action">
                {state === 'idle' && nl.status === 'approved' && (
                  <button className="adm-notify-btn" onClick={() => handleNotify(nl)}>
                    <IconMailPlane /> NOTIFY SUBSCRIBERS
                  </button>
                )}
                {state === 'idle' && nl.status === 'pending' && (
                  <button className="adm-notify-btn approve" onClick={() => handleApprove(nl.id)}>
                     APPROVE NEWSLETTER
                  </button>
                )}
                {state === 'loading' && (
                  <div className="adm-notify-status adm-notify-status--loading">
                    <span className="adm-spinner" /> Fetching subscribers…
                  </div>
                )}
                {state === 'confirming' && (
                  <div className="adm-notify-status adm-notify-status--loading">
                    <span className="adm-spinner" /> Waiting for confirmation…
                  </div>
                )}
                {state === 'sending' && prog && (
                  <div className="adm-notify-progress">
                    <div className="adm-progress-bar-wrap">
                      <div
                        className="adm-progress-bar-fill"
                        style={{ width: `${prog.total ? (prog.sent / prog.total) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="adm-progress-label">
                      Sending… ({prog.sent} of {prog.total})
                    </p>
                  </div>
                )}
                {state === 'done' && prog && (
                  <div className="adm-notify-status adm-notify-status--done">
                    ✓ Notified {prog.sent} subscriber{prog.sent !== 1 ? 's' : ''}.
                    {prog.failed > 0 && (
                      <span style={{color: 'red', marginLeft: '4px'}}>({prog.failed} failed)</span>
                    )}
                    <button className="adm-redo-btn" onClick={() => setState(nl.id, 'idle')}>
                      Send Again
                    </button>
                  </div>
                )}
                {state === 'error' && (
                  <div className="adm-notify-status adm-notify-status--error">
                    ✕ Failed to match or send.
                    <button className="adm-redo-btn" onClick={() => setState(nl.id, 'idle')}>Retry</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="adm-bottom-actions">
         <button className="adm-load-btn">LOAD PREVIOUS EDITIONS</button>
      </div>

      {/* Notify Modal */}
      {modal?.type === 'notify' && (
        <ConfirmModal
          newsletter={modal.newsletter}
          subscriberCount={subscribers.length}
          onConfirm={handleConfirmNotify}
          onCancel={() => { setModal(null); setState(modal.newsletter.id, 'idle'); }}
        />
      )}

      {/* Create / Edit Modal */}
      {(modal?.type === 'edit' || modal?.type === 'create') && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal adm-edit-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modal.type === 'create' ? 'Create Newsletter' : 'Edit Newsletter'}</h2>
            <form className="adm-edit-form" onSubmit={modal.type === 'create' ? submitCreate : submitEdit}>
              <div className="adm-edit-group">
                <label className="adm-edit-label">Title</label>
                <input className="adm-edit-input" required type="text" value={modal.editData.title} onChange={e => setModal({...modal, editData: {...modal.editData, title: e.target.value}})} />
              </div>
              <div className="adm-edit-row">
                <div className="adm-edit-group">
                  <label className="adm-edit-label">Author/Scholar</label>
                  <input className="adm-edit-input" required type="text" value={modal.editData.author} onChange={e => setModal({...modal, editData: {...modal.editData, author: e.target.value}})} />
                </div>
                <div className="adm-edit-group">
                  <label className="adm-edit-label">Batch Year</label>
                  <input className="adm-edit-input" required type="text" value={modal.editData.batch_year} onChange={e => setModal({...modal, editData: {...modal.editData, batch_year: e.target.value}})} />
                </div>
              </div>
              <div className="adm-edit-group">
                <label className="adm-edit-label">School</label>
                <input className="adm-edit-input" type="text" value={modal.editData.school} onChange={e => setModal({...modal, editData: {...modal.editData, school: e.target.value}})} />
              </div>
              <div className="adm-edit-row">
                <div className="adm-edit-group">
                  <label className="adm-edit-label">Category</label>
                  <select className="adm-edit-select" value={modal.editData.category} onChange={e => setModal({...modal, editData: {...modal.editData, category: e.target.value}})}>
                    <option value="Events">Events</option>
                    <option value="Fundraising">Fundraising</option>
                    <option value="Benefactor Spotlight">Benefactor Spotlight</option>
                    <option value="Scholar Stories">Scholar Stories</option>
                    <option value="Announcements">Announcements</option>
                  </select>
                </div>
                <div className="adm-edit-group">
                  <label className="adm-edit-label">Volume</label>
                  <input className="adm-edit-input" type="text" value={modal.editData.volume_key} onChange={e => setModal({...modal, editData: {...modal.editData, volume_key: e.target.value}})} placeholder="e.g. Community Submissions" />
                </div>
              </div>
              <div className="adm-edit-group">
                <label className="adm-edit-label">Short Description / Excerpt</label>
                <textarea className="adm-edit-textarea" rows="8" value={modal.editData.excerpt} onChange={e => setModal({...modal, editData: {...modal.editData, excerpt: e.target.value}})} placeholder="Write the newsletter excerpt or full description here…" />
              </div>
              <div className="adm-edit-group">
                <label className="adm-edit-label">Cover Image</label>
                <div className="adm-edit-image-row">
                  <input className="adm-edit-input" type="url" placeholder="Paste image URL…" value={modal.editData.image_url || ''} onChange={e => setModal({...modal, editData: {...modal.editData, image_url: e.target.value}})} />
                  <input ref={imgInputRef} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" style={{ display: 'none' }} onChange={(e) => { handleImageFile(e.target.files?.[0]); e.target.value = ''; }} />
                  <button type="button" className="adm-edit-upload-btn" onClick={() => imgInputRef.current?.click()} disabled={imgUploading}>
                    {imgUploading ? 'Uploading…' : 'Upload'}
                  </button>
                </div>
                {modal.editData.image_url && (
                  <div className="adm-edit-image-preview">
                    <img src={modal.editData.image_url} alt="Cover preview" />
                  </div>
                )}
              </div>
              <div className="adm-modal-actions">
                <button type="button" className="adm-modal-cancel" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="adm-modal-confirm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modal?.type === 'delete' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{color: '#dc2626'}}>Delete Newsletter?</h2>
            <p style={{margin: '0.5rem 0'}}>Are you sure you want to delete <br/><strong>"{modal.newsletter.caption}"</strong>?</p>
            <div className="adm-modal-actions" style={{marginTop: '0'}}>
              <button className="adm-modal-cancel" onClick={() => setModal(null)}>Cancel</button>
              <button className="adm-modal-confirm" style={{background: '#dc2626'}} onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════
   Subscribers Tab
════════════════════════════════════════════ */
const SubscribersTab = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.getAllSubscribers(getSessionToken())
      .then(setSubs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const activeCount = subs.filter((s) => s.is_active).length;

  const exportCSV = () => {
    const header = 'Name,Email,Date Subscribed,Status';
    const rows = subs.map((s) => [
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${s.email}"`,
      `"${s.subscribed_at ? new Date(s.subscribed_at).toLocaleDateString('en-PH') : ''}"`,
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
  };

  return (
    <div className="adm-tab-content">
      <div className="adm-sub-header">
        <div>
          <h2 className="adm-section-title">Subscribers</h2>
          {!loading && !error && (
            <p className="adm-section-sub">
              There are <strong className="adm-active-count">{activeCount}</strong> active subscriber{activeCount !== 1 ? 's' : ''} out of {subs.length} total.
            </p>
          )}
        </div>
        <button className="adm-export-btn" onClick={exportCSV} disabled={loading || subs.length === 0}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
          Export CSV
        </button>
      </div>

      {loading && (
        <div className="adm-loading">
          <span className="adm-spinner adm-spinner--lg" /> Loading subscribers…
        </div>
      )}
      {error && <p className="adm-error">Error: {error}</p>}

      {!loading && !error && (
        <>
          {subs.length === 0 ? (
            <div className="adm-empty">No subscribers yet.</div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date Subscribed</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((s, i) => (
                    <tr key={s.email + i} className={s.is_active ? '' : 'adm-row--inactive'}>
                      <td className="adm-row-num">{i + 1}</td>
                      <td>{s.name || <span className="adm-muted">—</span>}</td>
                      <td className="adm-email">{s.email}</td>
                      <td>{s.subscribed_at ? new Date(s.subscribed_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}</td>
                      <td>
                        <span className={`adm-status-badge ${s.is_active ? 'adm-status-badge--active' : 'adm-status-badge--unsub'}`}>
                          {s.is_active ? 'Active' : 'Unsubscribed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════
   Main Admin Page
════════════════════════════════════════════ */
const AdminNewsletters = () => {
  const [authed, setAuthed] = useState(isSessionValid());
  const [tab, setTab] = useState(() => localStorage.getItem('adm_tab') || 'dashboard');
  const [maintenanceModal, setMaintenanceModal] = useState(null); // { name: string, icon: JSX }

  // Persist the active tab so a refresh lands on the same page (default: dashboard).
  const switchTab = useCallback((next) => {
    setTab(next);
    localStorage.setItem('adm_tab', next);
  }, []);

  // Auto‑expire the session when the 30‑minute JWT (or the inactivity
  // timestamp) runs out, so the page drops to the login gate instead of
  // sending a dead token and showing `invalid_token` everywhere.
  useEffect(() => {
    if (!authed) return;
    const checkSession = setInterval(() => {
      if (!isSessionValid()) {
        setAuthed(false);
      }
    }, 15_000); // check every 15 seconds
    return () => clearInterval(checkSession);
  }, [authed]);

  // Refresh session on meaningful user interaction
  const handleInteraction = useCallback(() => {
    if (authed) refreshSession();
  }, [authed]);

  useEffect(() => {
    if (!authed) return;
    const events = ['click', 'keydown', 'scroll'];
    events.forEach((e) => window.addEventListener(e, handleInteraction, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, handleInteraction));
  }, [authed, handleInteraction]);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="adm-page">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <span className="adm-sidebar-logo"><IconGolf /></span>
          <span className="adm-sidebar-name">TTGAI ADMIN</span>
        </div>
        <div className="adm-nav-menu">
          <button className={`adm-nav-link ${tab === 'dashboard' ? 'active' : ''}`} onClick={() => switchTab('dashboard')}><IconDashboard /> Dashboard</button>
          <button className={`adm-nav-link ${tab === 'newsletters' ? 'active' : ''}`} onClick={() => switchTab('newsletters')}>
            <IconNews /> Manage Newsletters
          </button>
          <button className={`adm-nav-link ${tab === 'site-images' ? 'active' : ''}`} onClick={() => switchTab('site-images')}>
            <IconImage /> Site Images
          </button>
          <button className={`adm-nav-link ${tab === 'subscribers' ? 'active' : ''}`} onClick={() => switchTab('subscribers')}>
            <IconUsers /> Subscribers
          </button>
          <button className="adm-nav-link" onClick={() => setMaintenanceModal({ name: 'Analytics', icon: <IconAnalytics /> })}><IconAnalytics /> Analytics</button>
          <button className="adm-nav-link" onClick={() => setMaintenanceModal({ name: 'Notifications', icon: <IconBell /> })}><IconBell /> Notifications</button>
          <button className="adm-nav-link" onClick={() => setMaintenanceModal({ name: 'System Settings', icon: <IconSettings /> })}><IconSettings /> System Settings</button>
        </div>
        <div className="adm-sidebar-footer">
          <Link to="/newsletter" className="adm-nav-link adm-back-link">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Back to Newsletter
          </Link>
          <button className="adm-logout" onClick={() => { destroySession(); setAuthed(false); }}>
            <IconLogOut /> Log Out
          </button>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="adm-content-wrapper">
         {/* Top Header */}
         <header className="adm-header">
            <div className="adm-search-wrap">
               <IconSearch />
               <input type="text" placeholder="Search newsletters, authors, or batches..." />
            </div>
            <div className="adm-header-right">
               <button className="adm-icon-btn"><IconBell size={20} /></button>
               <div className="adm-user-profile">
                  <div className="adm-user-text">
                     <span className="adm-user-name">Admin User</span>
                     <span className="adm-user-role">SUPER ADMINISTRATOR</span>
                  </div>
                  <div className="adm-user-avatar">
                     AU
                     <span className="adm-online-dot"></span>
                  </div>
               </div>
            </div>
         </header>

         {/* Main content body */}
         <main className="adm-main">
            {tab === 'dashboard' && <DashboardTab onNavigate={switchTab} />}
            {tab === 'newsletters' && <NewslettersTab />}
            {tab === 'site-images' && <SiteImagesTab />}
            {tab === 'subscribers' && <SubscribersTab />}
         </main>

         {/* Footer */}
         <footer className="adm-footer">
            <div className="adm-footer-copy">© {new Date().getFullYear()} TTGAI Administration Portal. All rights reserved.</div>
            <div className="adm-footer-links">
               <a href="#" className="adm-footer-link">Privacy Policy</a>
               <a href="#" className="adm-footer-link">Terms of Service</a>
               <a href="#" className="adm-footer-link">Documentation</a>
               <a href="#" className="adm-footer-link">Support</a>
            </div>
         </footer>
      </div>

      {/* Maintenance Modal */}
      {maintenanceModal && (
        <div className="adm-modal-overlay" onClick={() => setMaintenanceModal(null)}>
          <div className="adm-modal adm-maintenance-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-maint-icon-wrap">
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <div className="adm-maint-badge">
              {maintenanceModal.icon}
              <span>{maintenanceModal.name}</span>
            </div>
            <h2>Under Maintenance</h2>
            <p>
              The <strong>{maintenanceModal.name}</strong> module is currently under development and will be available in a future update.
            </p>
            <div className="adm-maint-timeline">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Expected: Coming Soon
            </div>
            <button className="adm-modal-confirm" onClick={() => setMaintenanceModal(null)} style={{ marginTop: '0.5rem' }}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsletters;
