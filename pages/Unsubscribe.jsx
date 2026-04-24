import React, { useState } from 'react';
import { unsubscribeEmail } from '../lib/supabase';
import '../styles/unsubscribe.css';

const Unsubscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | not_found | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      await unsubscribeEmail(email.trim());
      setStatus('success');
    } catch (err) {
      if (err.message === 'not_found') {
        setStatus('not_found');
      } else {
        setStatus('error');
      }
    }
  };

  return (
    <div className="unsub-page">
      {/* Background blobs */}
      <div className="unsub-blob unsub-blob--1" />
      <div className="unsub-blob unsub-blob--2" />

      <div className="unsub-card">
        {/* Icon */}
        <div className="unsub-icon-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        <div className="unsub-badge">TTGAI Newsletter</div>
        <h1 className="unsub-title">Unsubscribe from TTGAI Newsletter</h1>
        <p className="unsub-sub">
          We're sorry to see you go. Enter your email below to unsubscribe.
        </p>

        {status === 'success' ?
 (
          <div className="unsub-result unsub-result--success">
            <span className="unsub-result-icon">👋</span>
            <h2>You have been unsubscribed.</h2>
            <p>Thank you for being part of our community.</p>
          </div>
        ) : (
          <form className="unsub-form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              className="unsub-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            {status === 'not_found' && (
              <p className="unsub-msg unsub-msg--warn">
                ⚠ This email is not in our subscriber list.
              </p>
            )}
            {status === 'error' && (
              <p className="unsub-msg unsub-msg--error">
                ✕ Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="unsub-btn"
              disabled={status === 'loading' || !email.trim()}
            >
              {status === 'loading' ? (
                <span className="unsub-spinner" />
              ) : (
                'Unsubscribe'
              )}
            </button>
          </form>
        )}

        <p className="unsub-footer-note">
          Changed your mind?{' '}
          <a href="/newsletter">Visit our Newsletter page</a> to re-subscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default Unsubscribe;
