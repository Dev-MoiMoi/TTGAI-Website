/**
 * ═══════════════════════════════════════════════════════════
 *  TTGAI Security Utilities
 *  Provides sanitization, validation, rate‑limiting,
 *  password hashing, and session management helpers.
 * ═══════════════════════════════════════════════════════════
 */

/* ── HTML / XSS Sanitisation ─────────────────────────────── */

/**
 * Strip dangerous HTML tags / attributes from a string.
 * Keeps the text content but removes scripts, iframes, event handlers, etc.
 * Safe for rendering user‑supplied titles, excerpts, names.
 */
export function sanitizeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    // Remove script / iframe / object / embed / form tags and contents
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '')
    // Remove event handlers (onclick, onerror, onload, …)
    .replace(/\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
    // Remove javascript: / data: / vbscript: href/src
    .replace(/(?:href|src)\s*=\s*["']?\s*(?:javascript|data|vbscript)\s*:/gi, 'href="')
    // Strip remaining HTML tags entirely (keep text)
    .replace(/<[^>]*>/g, '')
    // Collapse excessive whitespace
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Escape special HTML characters to prevent injection when
 * inserting into innerHTML (prefer textContent, but this is a fallback).
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}

/* ── Email Validation ────────────────────────────────────── */

/**
 * Validate an email address using an RFC 5322–ish regex.
 * Returns `true` if the email looks valid.
 */
export function validateEmail(email) {
  if (typeof email !== 'string') return false;
  // Practical RFC‑compliant pattern (covers 99.9 % of real addresses)
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email.trim()) && email.trim().length <= 254;
}

/* ── Password Hashing (SHA‑256, browser‑native) ──────────── */

/**
 * Hash a password string with SHA‑256 using the Web Crypto API.
 * Returns a hex‑encoded hash string.
 *
 * NOTE: This is NOT a substitute for server‑side bcrypt/argon2.
 * It simply prevents the raw password from sitting in the JS bundle.
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* ── Rate Limiter ────────────────────────────────────────── */

/**
 * Simple in‑memory, per‑action rate limiter.
 *
 * Usage:
 *   const limiter = new RateLimiter({ maxAttempts: 5, windowMs: 60_000 });
 *   if (!limiter.allow('subscribe')) { alert('Too many attempts'); }
 */
export class RateLimiter {
  /**
   * @param {Object}  opts
   * @param {number}  opts.maxAttempts  — max calls allowed within the window
   * @param {number}  opts.windowMs     — sliding window in milliseconds
   */
  constructor({ maxAttempts = 5, windowMs = 60_000 } = {}) {
    this._max = maxAttempts;
    this._windowMs = windowMs;
    /** @type {Map<string, number[]>} */
    this._store = new Map();
  }

  /** Returns `true` if the action is allowed, `false` if rate‑limited. */
  allow(action = 'default') {
    const now = Date.now();
    const timestamps = (this._store.get(action) || []).filter(
      (t) => now - t < this._windowMs
    );
    if (timestamps.length >= this._max) {
      this._store.set(action, timestamps);
      return false;
    }
    timestamps.push(now);
    this._store.set(action, timestamps);
    return true;
  }

  /** Reset the limiter for a given action. */
  reset(action = 'default') {
    this._store.delete(action);
  }

  /** Returns remaining seconds until the oldest entry expires. */
  retryAfterSec(action = 'default') {
    const timestamps = this._store.get(action) || [];
    if (timestamps.length === 0) return 0;
    const oldest = Math.min(...timestamps);
    const remaining = Math.max(0, this._windowMs - (Date.now() - oldest));
    return Math.ceil(remaining / 1000);
  }
}

/* ── Brute‑Force Login Protection ────────────────────────── */

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes

const loginState = {
  attempts: 0,
  lockedUntil: 0,
};

/**
 * Record a failed login attempt.
 * @returns {{ locked: boolean, remainingSec: number }}
 */
export function recordFailedLogin() {
  loginState.attempts += 1;
  if (loginState.attempts >= LOGIN_MAX_ATTEMPTS) {
    loginState.lockedUntil = Date.now() + LOGIN_LOCKOUT_MS;
  }
  return getLoginLockStatus();
}

/**
 * Reset the login counter (call on successful login).
 */
export function resetLoginAttempts() {
  loginState.attempts = 0;
  loginState.lockedUntil = 0;
}

/**
 * Check current lockout status.
 * @returns {{ locked: boolean, remainingSec: number, attemptsLeft: number }}
 */
export function getLoginLockStatus() {
  if (loginState.lockedUntil && Date.now() < loginState.lockedUntil) {
    const remainingSec = Math.ceil((loginState.lockedUntil - Date.now()) / 1000);
    return { locked: true, remainingSec, attemptsLeft: 0 };
  }
  // If lockout expired, reset
  if (loginState.lockedUntil && Date.now() >= loginState.lockedUntil) {
    resetLoginAttempts();
  }
  return {
    locked: false,
    remainingSec: 0,
    attemptsLeft: LOGIN_MAX_ATTEMPTS - loginState.attempts,
  };
}

/* ── Session Manager ─────────────────────────────────────── */

const SESSION_KEY = 'ttgai_admin';
const SESSION_TS_KEY = 'ttgai_admin_ts';
const SESSION_TOKEN_KEY = 'ttgai_admin_token';
const SESSION_MAX_AGE_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Create an admin session (call after the edge function returns a token).
 * @param {string} [token] — JWT issued by the admin edge function
 */
export function createSession(token) {
  sessionStorage.setItem(SESSION_KEY, '1');
  sessionStorage.setItem(SESSION_TS_KEY, String(Date.now()));
  if (token) sessionStorage.setItem(SESSION_TOKEN_KEY, token);
}

/**
 * Destroy the admin session.
 */
export function destroySession() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_TS_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
}

/**
 * Return the current admin JWT, or null if the session is invalid/expired.
 */
export function getSessionToken() {
  if (!isSessionValid()) return null;
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
}

/**
 * JWT `exp` claim (ms since epoch) decoded from the token payload, or 0 if
 * the token is missing/unparseable. Payload is NOT signed data — we only
 * read the expiry so the client stops using a token the server will reject.
 */
export function getSessionExpiryMs() {
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (!token) return 0;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return 0;
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

/**
 * Check if a valid admin session exists.
 *
 * The server rejects the JWT once its `exp` passes (30 minutes from login),
 * so the client MUST honor that too — otherwise the page keeps sending a dead
 * token and every call comes back `invalid_token`. The inactivity timestamp
 * below is a secondary guard only.
 */
export function isSessionValid() {
  const flag = sessionStorage.getItem(SESSION_KEY);
  const ts = sessionStorage.getItem(SESSION_TS_KEY);
  if (!flag || !ts) return false;
  const exp = getSessionExpiryMs();
  if (exp && Date.now() >= exp) {
    destroySession();
    return false;
  }
  if (Date.now() - Number(ts) > SESSION_MAX_AGE_MS) {
    destroySession();
    return false;
  }
  return true;
}

/**
 * Refresh the session timestamp (call on meaningful user interaction).
 */
export function refreshSession() {
  if (isSessionValid()) {
    sessionStorage.setItem(SESSION_TS_KEY, String(Date.now()));
  }
}

/* ── Input Validators ────────────────────────────────────── */

/**
 * Validate and sanitize a "name" field.
 * Allows letters, spaces, hyphens, apostrophes, periods. Max 100 chars.
 */
export function sanitizeName(name) {
  if (typeof name !== 'string') return '';
  return name
    .replace(/[<>{}[\]\\\/]/g, '') // strip dangerous chars
    .trim()
    .slice(0, 100);
}

/**
 * Validate a generic text field (titles, descriptions).
 * Strips HTML but preserves text content.
 */
export function sanitizeText(text, maxLength = 500) {
  if (typeof text !== 'string') return '';
  return sanitizeHTML(text).slice(0, maxLength);
}
