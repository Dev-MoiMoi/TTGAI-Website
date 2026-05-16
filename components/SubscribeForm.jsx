import React, { useState } from 'react';
import { addSubscriber } from '../lib/supabase';
import { sendWelcomeEmail } from '../lib/emailjs';
import { validateEmail, sanitizeName, RateLimiter } from '../lib/security';
import '../styles/subscribe-form.css';

const subscribeLimiter = new RateLimiter({ maxAttempts: 5, windowMs: 2 * 60 * 1000 }); // 5 per 2 min

/**
 * Reusable newsletter subscribe form.
 * Props:
 *   variant — 'footer' (dark bg) | 'inline' (light bg, default)
 */
const SubscribeForm = ({ variant = 'inline' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | already | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Validate email format
    if (!validateEmail(email.trim())) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Rate limit
    if (!subscribeLimiter.allow('subscribe')) {
      setStatus('error');
      setErrorMsg('Too many attempts. Please wait a moment and try again.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const safeName = sanitizeName(name.trim());

    try {
      await addSubscriber(safeName, email.trim());
      // Fire-and-forget welcome email (don't block UI on it)
      sendWelcomeEmail(safeName, email.trim()).catch(() => {});
      setStatus('success');
      setName('');
      setEmail('');
    } catch (err) {
      if (err.message === 'already_subscribed') {
        setStatus('already');
      } else {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again.');
      }
    }
  };

  const cls = (base) => `${base} ${base}--${variant}`;

  if (status === 'success') {
    return (
      <div className={cls('sf-success')}>
        <span className="sf-success-icon">✓</span>
        <div>
          <p className="sf-success-title">Subscribed!</p>
          <p className="sf-success-sub">Check your email for confirmation.</p>
        </div>
      </div>
    );
  }

  return (
    <form className={cls('sf-form')} onSubmit={handleSubmit} noValidate>
      <div className="sf-fields">
        <input
          type="text"
          className={cls('sf-input')}
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <input
          type="email"
          className={cls('sf-input')}
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      {status === 'already' && (
        <p className="sf-msg sf-msg--already">You are already subscribed!</p>
      )}
      {status === 'error' && (
        <p className="sf-msg sf-msg--error">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        className={cls('sf-btn')}
        disabled={status === 'loading' || !email}
      >
        {status === 'loading' ? (
          <>
            <span className="sf-spinner" /> Subscribing...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Subscribe to Updates
          </>
        )}
      </button>

      <p className="sf-disclaimer">No spam, ever. Unsubscribe anytime.</p>
    </form>
  );
};

export default SubscribeForm;
