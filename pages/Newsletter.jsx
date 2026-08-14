import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/newsletter.css';
import SubscribeForm from '../components/SubscribeForm';
import { getNewsletters, addNewsletter } from '../lib/supabase';
import { sanitizeHTML, sanitizeText, sanitizeName, RateLimiter } from '../lib/security';
import { uploadImage, ALLOWED_UPLOAD_TYPES as ALLOWED_TYPES, MAX_UPLOAD_BYTES as MAX_BYTES } from '../lib/cloudinary';

/* ─── Rate limiter for newsletter submissions ───────────── */
const submitLimiter = new RateLimiter({ maxAttempts: 3, windowMs: 10 * 60 * 1000 }); // 3 per 10 min

/* ─── Category colour map ─────────────────────────────────────────────────── */
const CATEGORY_COLORS = {
    'Events': { bg: '#ede9fe', text: '#6d28d9', border: '#c4b5fd' },
    'Fundraising': { bg: '#fef9c3', text: '#92400e', border: '#fde68a' },
    'Benefactor Spotlight': { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
    'Scholar Stories': { bg: '#dcfce7', text: '#166534', border: '#86efac' },
    'Announcements': { bg: '#ffe4e6', text: '#9f1239', border: '#fca5a5' },
};

const CATEGORIES = ['All', ...Object.keys(CATEGORY_COLORS)];
const VOLUMES = ['All Volumes', 'Vol. 1 (April–Sep 2025)', 'Vol. 2 (Oct 2025)', 'Community Submissions'];
/* ─── Lightbox Component ──────────────────────────────────────────────────── */
const Lightbox = ({ article, allArticles, onClose }) => {
    const [currentId, setCurrentId] = useState(article.id);
    const current = allArticles.find(a => a.id === currentId) || article;

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') navigate(1);
            if (e.key === 'ArrowLeft') navigate(-1);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    });

    const navigate = useCallback((dir) => {
        const idx = allArticles.findIndex(a => a.id === currentId);
        const next = (idx + dir + allArticles.length) % allArticles.length;
        setCurrentId(allArticles[next].id);
    }, [currentId, allArticles]);

    const style = CATEGORY_COLORS[current.category] || {};
    const idx = allArticles.findIndex(a => a.id === currentId);

    return (
        <div className="nl-lightbox-overlay" onClick={onClose}>
            <div className="nl-lightbox" onClick={e => e.stopPropagation()}>
                {/* Close */}
                <button className="nl-lb-close" onClick={onClose} aria-label="Close">✕</button>

                {/* Image */}
                <div className="nl-lb-img-wrap">
                    {current.image ? (
                        <img src={current.image} alt={current.title} className="nl-lb-img" />
                    ) : (
                        <div className="nl-lb-img-placeholder" aria-hidden="true"></div>
                    )}
                    {/* Nav arrows */}
                    <button className="nl-lb-nav nl-lb-prev" onClick={() => navigate(-1)} aria-label="Previous">‹</button>
                    <button className="nl-lb-nav nl-lb-next" onClick={() => navigate(1)} aria-label="Next">›</button>
                    {/* Counter */}
                    <span className="nl-lb-counter">{idx + 1} / {allArticles.length}</span>
                </div>

                {/* Info panel */}
                <div className="nl-lb-info">
                    <div className="nl-lb-meta">
                        <span className="nl-lb-volume">{current.volume}</span>
                        <span className="nl-lb-page">{current.page}</span>
                        <span
                            className="nl-category-pill"
                            style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
                        >
                            {current.category}
                        </span>
                    </div>
                    <h2 className="nl-lb-title">{current.title}</h2>
                    <p className="nl-lb-excerpt">{current.excerpt}</p>
                    <div className="nl-lb-byline">
                        <span>{current.author}</span>
                        <span>{current.date}</span>
                    </div>
                    {/* Thumbnail strip */}
                    <div className="nl-lb-strip">
                        {allArticles.map(a => (
                            <img
                                key={a.id}
                                src={a.image}
                                alt={a.title}
                                className={`nl-lb-thumb${a.id === currentId ? ' active' : ''}`}
                                onClick={() => setCurrentId(a.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── Category Pill ───────────────────────────────────────────────────────── */
const CategoryPill = ({ category }) => {
    const style = CATEGORY_COLORS[category] || { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
    return (
        <span
            className="nl-category-pill"
            style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
        >
            {category}
        </span>
    );
};

/* ─── Article Card (magazine style) ──────────────────────────────────────── */
const ArticleCard = ({ article, onOpen }) => (
    <article className="nl-card" onClick={() => onOpen(article)}>
        {/* Cover image */}
        <div className="nl-card-cover">
            {article.image ? (
                <img src={article.image} alt={article.title} className="nl-card-cover-img" />
            ) : (
                <div className="nl-card-cover-placeholder" aria-hidden="true"></div>
            )}
            <div className="nl-card-cover-overlay">
                <span className="nl-card-zoom-icon">🔍</span>
            </div>
            {/* Vol badge */}
            <span className="nl-card-vol-badge">Vol. Issue</span>
        </div>

        <div className="nl-card-body">
            <div className="nl-card-meta-top">
                <CategoryPill category={article.category} />
            </div>

            <h3 className="nl-card-title">{article.title}</h3>
            <p className="nl-card-excerpt">{article.excerpt}</p>

            <div className="nl-card-footer">
                <button className="nl-read-btn" onClick={e => { e.stopPropagation(); onOpen(article); }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                    Read
                </button>
                <button className="nl-bookmark-btn" onClick={e => e.stopPropagation()} title="Bookmark">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
            </div>
        </div>
    </article>
);

/* ─── Main Component ──────────────────────────────────────────────────────── */
const Newsletter = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeVolume, setActiveVolume] = useState('All Volumes');
    const [lightboxArticle, setLightboxArticle] = useState(null);
    const [dbArticles, setDbArticles] = useState([]);

    useEffect(() => {
        getNewsletters('approved')
            .then((data) => {
                const mapped = data.map(item => ({
                    id: item.id,
                    volume: sanitizeText(item.volume_key || 'Unknown Volume', 100),
                    volumeKey: item.volume_key || 'Other',
                    page: sanitizeText(item.page_info || 'Page 1/1', 50),
                    title: sanitizeText(item.title || 'Untitled', 200),
                    excerpt: sanitizeText(item.excerpt || '', 1000),
                    category: sanitizeText(item.category || 'Announcements', 50),
                    author: sanitizeName(item.author || 'Contributor'),
                    date: item.date || new Date(item.created_at).toLocaleDateString(),
                    image: item.image_url
                }));
                setDbArticles(mapped);
            })
            .catch(err => console.error('Error fetching newsletters:', err));
    }, []);

    const allArticles = useMemo(() => {
        return dbArticles;
    }, [dbArticles]);

    /* Close lightbox on overlay click captured at body level */
    const openLightbox = useCallback((article) => setLightboxArticle(article), []);
    const closeLightbox = useCallback(() => setLightboxArticle(null), []);

    /* Prevent scroll when lightbox open */
    useEffect(() => {
        if (lightboxArticle) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [lightboxArticle]);

    /* ── Cloudinary upload state ──────────────────────────── */
    const [form, setForm] = useState({ name: '', batch: '', school: '', newsletterTitle: '', description: '' });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fileError, setFileError] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const fileRef = useRef(null);

    const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        setFileError(''); setPreview(null); setFile(null);
        if (!f) return;
        if (!ALLOWED_TYPES.includes(f.type)) { setFileError('Invalid file type. Allowed: JPG, PNG, WebP, PDF.'); return; }
        if (f.size > MAX_BYTES) { setFileError('File is too large. Maximum size is 10 MB.'); return; }
        setFile(f);
        setPreview(f.type !== 'application/pdf' ? URL.createObjectURL(f) : 'pdf');
    };

    const isFormValid = form.name && form.batch && form.school && form.newsletterTitle && file && !fileError;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Rate‑limit submissions
        if (!submitLimiter.allow('newsletter-submit')) {
            const wait = submitLimiter.retryAfterSec('newsletter-submit');
            setUploadStatus('error');
            alert(`Too many submissions. Please wait ${Math.ceil(wait / 60)} minute(s) and try again.`);
            return;
        }

        // Sanitize inputs
        const safeName = sanitizeName(form.name);
        const safeTitle = sanitizeText(form.newsletterTitle, 100);
        const safeDesc = sanitizeText(form.description, 300);
        const safeBatch = sanitizeText(form.batch, 50);
        const safeSchool = sanitizeText(form.school, 100);

        setUploading(true); setProgress(0); setUploadStatus(null);
        try {
            const imageUrl = await uploadImage(file, {
                folder: 'ttgai-newsletters',
                tags: 'pending',
                context:
                    `caption=${safeTitle}|scholar_name=${safeName}|batch_year=${safeBatch}|school=${safeSchool}|description=${safeDesc}`,
                onProgress: (p) => setProgress(p),
            });

            // Create pending record in Supabase
            await addNewsletter({
                title: safeTitle,
                excerpt: safeDesc,
                category: 'Announcements', // Default category for community submissions
                author: safeName,
                batch_year: safeBatch,
                school: safeSchool,
                date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                volume_key: 'Community Submissions',
                page_info: 'Page 1/1',
                image_url: imageUrl,
                status: 'pending'
            });

            setUploading(false);
            setUploadStatus('success');
        } catch (err) {
            console.error('Error saving to Supabase:', err);
            setUploading(false);
            setUploadStatus('error');
        }
    };

    const resetForm = () => {
        setForm({ name: '', batch: '', school: '', newsletterTitle: '', description: '' });
        setFile(null); setPreview(null); setFileError(''); setProgress(0); setUploadStatus(null); setUploading(false);
        if (fileRef.current) fileRef.current.value = '';
    };

    /* Filtered articles */
    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return allArticles.filter((a) => {
            const matchSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
            const matchCat = activeCategory === 'All' || a.category === activeCategory;
            const matchVol = activeVolume === 'All Volumes' || a.volumeKey === activeVolume || (activeVolume === 'Community Submissions' && a.volumeKey === 'Community Submissions');
            return matchSearch && matchCat && matchVol;
        });
    }, [search, activeCategory, activeVolume, allArticles]);

    return (
        <div className="newsletter-page">
            {/* ── 1. Hero ── */}
            <header className="nl-hero nl-hero--split">
                {/* Admin quick-switch */}
                <Link to="/admin/newsletters" className="nl-admin-fab" title="Open Admin Panel">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Admin</span>
                </Link>
                <div className="nl-hero-left">
                    <span className="nl-hero-badge">The Twilight Monthly Recap</span>
                    <h1>The <span className="nl-hero-accent">Twilight</span><br/>Monthly Recap</h1>
                    <p className="nl-hero-sub">
                        Join our community of golfers and golf-fanatic scholars. Get exclusive updates on tournament results, scholarship milestones, and upcoming events delivered straight to your inbox.
                    </p>
                    <ul className="nl-hero-bullets">
                        <li><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Scholar Impact Stories</li>
                        <li><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Tournament Results</li>
                        <li><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Community Updates</li>
                        <li><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>+ Latest From the Team</li>
                    </ul>
                </div>
                <div className="nl-hero-right">
                    <div className="nl-hero-subscribe-card">
                        <h3>Subscribe Now</h3>
                        <SubscribeForm variant="inline" />
                        <p className="nl-hero-unsub-note">Or <a href="/unsubscribe">unsubscribe</a> from our mailing list</p>
                    </div>
                </div>
            </header>

            {/* ── 2 + 3. Filter & Search + Article Grid ── */}
            <div className="nl-filter-region">
                <div className="nl-controls-wrap">
                    <div className="nl-controls">
                        <div className="nl-search-wrap">
                            <svg className="nl-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="search"
                                className="nl-search"
                                placeholder="Search articles…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <select className="nl-volume-select" value={activeVolume} onChange={(e) => setActiveVolume(e.target.value)}>
                            {VOLUMES.map((v) => <option key={v}>{v}</option>)}
                        </select>
                    </div>
                    <div className="nl-cat-pills">
                        {CATEGORIES.map((cat) => (
                            <button key={cat} className={`nl-cat-btn${activeCategory === cat ? ' active' : ''}`} onClick={() => setActiveCategory(cat)}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <main className="nl-grid-section">
                    {filtered.length > 0 ? (
                        <div className="nl-grid">
                            {filtered.map((a) => <ArticleCard key={a.id} article={a} onOpen={openLightbox} />)}
                        </div>
                    ) : (
                        <div className="nl-empty">
                            <p>No articles match your search. Try a different keyword or category.</p>
                            <button className="nl-reset-btn" onClick={() => { setSearch(''); setActiveCategory('All'); setActiveVolume('All Volumes'); }}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* ── 4. Dark CTA Banner ── */}
            <section className="nl-big-cta">
                <div className="nl-big-cta-inner">
                    <h2>Ready to make a bigger impact?</h2>
                    <p>Our newsletters highlight the difference your support makes. Join us in our mission to empower the next generation of Filipino golfers.</p>
                    <div className="nl-big-cta-btns">
                        <a href="/sponsorship" className="nl-cta-btn-gold">Become a Sponsor</a>
                        <a href="/about" className="nl-cta-btn-outline">Find Out More →</a>
                    </div>
                </div>
            </section>

            {/* ── 5. Cloudinary Upload Section ── */}
            <section className="nl-submit-section">
                <div className="nl-submit-inner">
                    <h2>Share Your Story</h2>
                    <p className="nl-submit-desc">
                        Are you a TTGAI scholar? Submit your newsletter or article image and it will appear here after review.
                    </p>

                    {uploadStatus === 'success' ? (
                        <div className="nl-submit-success">
                            <span className="nl-success-icon">✓</span>
                            <h3>Submitted for Review!</h3>
                            <p>Your newsletter has been submitted! It will appear on this page once reviewed by our admin.</p>
                            <button className="nl-submit-btn" style={{ width: 'auto', padding: '0.75rem 2.5rem', marginTop: '0.5rem' }} onClick={resetForm}>
                                Submit Another
                            </button>
                        </div>
                    ) : (
                        <form className="nl-submit-form" onSubmit={handleSubmit}>
                            <div className="nl-form-row">
                                <div className="nl-form-group">
                                    <label htmlFor="up-name">Scholar Name <span className="nl-req">*</span></label>
                                    <input id="up-name" name="name" type="text" required placeholder="Your full name" value={form.name} onChange={handleFormChange} />
                                </div>
                                <div className="nl-form-group">
                                    <label htmlFor="up-batch">Batch Year <span className="nl-req">*</span></label>
                                    <input id="up-batch" name="batch" type="text" required placeholder="e.g. Batch Sinag (2025)" value={form.batch} onChange={handleFormChange} />
                                </div>
                            </div>
                            <div className="nl-form-group">
                                <label htmlFor="up-school">School / Course <span className="nl-req">*</span></label>
                                <input id="up-school" name="school" type="text" required placeholder="e.g. Pamantasan ng Cabuyao — BS Computer Science" value={form.school} onChange={handleFormChange} />
                            </div>
                            <div className="nl-form-group">
                                <label htmlFor="up-title">
                                    Newsletter Title <span className="nl-req">*</span>
                                    <span className="nl-char-count">{form.newsletterTitle.length}/100</span>
                                </label>
                                <input id="up-title" name="newsletterTitle" type="text" required maxLength={100} placeholder="Give your newsletter a title" value={form.newsletterTitle} onChange={handleFormChange} />
                            </div>
                            <div className="nl-form-group">
                                <label htmlFor="up-desc">
                                    Short Description
                                    <span className="nl-char-count">{form.description.length}/300</span>
                                </label>
                                <textarea id="up-desc" name="description" rows="3" maxLength={300} placeholder="Brief description of what this newsletter is about…" value={form.description} onChange={handleFormChange} />
                            </div>
                            <div className="nl-form-group">
                                <label htmlFor="up-file">Newsletter Image / PDF <span className="nl-req">*</span></label>
                                <label className="nl-file-drop" htmlFor="up-file">
                                    {preview ? (
                                        preview === 'pdf' ? (
                                            <div className="nl-file-pdf-preview">
                                                <span className="nl-pdf-icon">📄</span>
                                                <span>{file?.name}</span>
                                            </div>
                                        ) : (
                                            <img src={preview} alt="preview" className="nl-file-preview-img" />
                                        )
                                    ) : (
                                        <div className="nl-file-placeholder">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                            <span>Click to upload or drag &amp; drop</span>
                                            <span className="nl-file-hint">JPG, PNG, WebP, PDF — max 10 MB</span>
                                        </div>
                                    )}
                                    <input id="up-file" type="file" ref={fileRef} accept=".jpg,.jpeg,.png,.webp,.pdf" style={{ display: 'none' }} onChange={handleFileChange} />
                                </label>
                                {fileError && <p className="nl-file-error">{fileError}</p>}
                                {file && !fileError && <p className="nl-file-ok">✓ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>}
                            </div>

                            {uploading && (
                                <div className="nl-progress-wrap">
                                    <div className="nl-progress-bar" style={{ width: `${progress}%` }} />
                                    <span className="nl-progress-label">{progress}%</span>
                                </div>
                            )}
                            {uploadStatus === 'error' && (
                                <p className="nl-upload-error">Upload failed. Please check your file and try again.</p>
                            )}

                            <button type="submit" className="nl-submit-btn" disabled={!isFormValid || uploading} style={{ opacity: (!isFormValid || uploading) ? 0.5 : 1 }}>
                                {uploading ? `Uploading… ${progress}%` : 'Submit for Review'}
                            </button>
                            <p className="nl-submit-note">All submissions are reviewed before publishing.</p>
                        </form>
                    )}
                </div>
            </section>


            {/* ── 6. Lightbox ── */}
            {lightboxArticle && (
                <Lightbox
                    article={lightboxArticle}
                    allArticles={filtered.length > 0 ? filtered : allArticles}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
};

export default Newsletter;
