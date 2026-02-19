import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/linkages.css';
import pncLogo from '../assets/PnC Logo.jpg';
import cabuyaoLogo from '../assets/Cabuyao Logo.png';
import buscowitzLogo from '../assets/Buskowitz.png';
import academicCapIcon from '../assets/square-academic-cap-svgrepo-com.svg';
import communityIcon from '../assets/community-svgrepo-com.svg';
import corporateIcon from '../assets/cooperate-svgrepo-com.svg';

/* ─── Inline SVG Icon Components ─────────────────────────────────────────── */



const BanayBanayIcon = () => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-svg">
        <circle cx="40" cy="40" r="40" fill="url(#bb-grad)" />
        <defs>
            <linearGradient id="bb-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#15803d" />
                <stop offset="1" stopColor="#4ade80" />
            </linearGradient>
        </defs>
        {/* House shape */}
        <polygon points="40,16 62,36 58,36 58,60 22,60 22,36 18,36" fill="white" opacity="0.95" />
        {/* Door */}
        <rect x="33" y="45" width="14" height="15" rx="2" fill="#15803d" />
        {/* Window */}
        <rect x="25" y="42" width="9" height="8" rx="1" fill="#15803d" opacity="0.7" />
        <rect x="46" y="42" width="9" height="8" rx="1" fill="#15803d" opacity="0.7" />
        {/* Tree / leaf detail */}
        <circle cx="40" cy="28" r="4" fill="#4ade80" opacity="0.4" />
    </svg>
);

const RotaryIcon = () => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-svg">
        <circle cx="40" cy="40" r="40" fill="url(#rot-grad)" />
        <defs>
            <linearGradient id="rot-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7c3aed" />
                <stop offset="1" stopColor="#c084fc" />
            </linearGradient>
        </defs>
        {/* Rotary gear-wheel style icon */}
        <circle cx="40" cy="40" r="18" stroke="white" strokeWidth="4" fill="none" opacity="0.9" />
        <circle cx="40" cy="40" r="8" fill="white" opacity="0.9" />
        {/* Spokes / gear teeth */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <rect key={i}
                x="38.5" y="18"
                width="3" height="6"
                rx="1.5"
                fill="white"
                opacity="0.9"
                transform={`rotate(${deg} 40 40)`}
            />
        ))}
        {/* Globe lines */}
        <ellipse cx="40" cy="40" rx="8" ry="5" stroke="#7c3aed" strokeWidth="1.2" fill="none" opacity="0.7" />
        <line x1="32" y1="40" x2="48" y2="40" stroke="#7c3aed" strokeWidth="1.2" opacity="0.7" />
        <line x1="40" y1="32" x2="40" y2="48" stroke="#7c3aed" strokeWidth="1.2" opacity="0.7" />
    </svg>
);

/* ─── Real Partner Data ───────────────────────────────────────────────────── */

const partners = [
    {
        name: "University of Cabuyao",
        short: "UC",
        category: "Academic",
        description: "Primary academic partner and host institution for the Pabaon Kay Iskolar Program — empowering scholars with quality university education.",
        status: "Strategic Academic Partner",
        icon: <img src={pncLogo} alt="University of Cabuyao Logo" className="partner-logo-img" />,
        accentColor: "#2563eb",
        bgLight: "#eff6ff",
    },
    {
        name: "Buscowitz Energy",
        short: "Buscowitz",
        category: "Corporate",
        description: "Major benefactor and renewable energy transition partner — funding scholarships and championing sustainable development in Cabuyao.",
        status: "Corporate Benefactor",
        icon: <img src={buscowitzLogo} alt="Buscowitz Energy Logo" className="partner-logo-img" />,
        accentColor: "#f97316",
        bgLight: "#fff7ed",
    },
    {
        name: "City Government of Cabuyao",
        short: "LGU Cabuyao",
        category: "Community",
        description: "Local government partner providing institutional support, endorsements, and public-sector alignment for our scholarship beneficiaries.",
        status: "Government Partner",
        icon: <img src={cabuyaoLogo} alt="City Government of Cabuyao Logo" className="partner-logo-img" />,
        accentColor: "#0f766e",
        bgLight: "#f0fdfa",
    },
    {
        name: "Barangay Banay-Banay",
        short: "Brgy. Banay-Banay",
        category: "Community",
        description: "Grassroots community partner bridging TTGAI directly to local families and deserving student applicants in Cabuyao.",
        status: "Community Partner",
        icon: <BanayBanayIcon />,
        accentColor: "#15803d",
        bgLight: "#f0fdf4",
    },
    {
        name: "Rotary Club",
        short: "Rotary",
        category: "Community",
        description: "Multi-chapter civic partner collaborating on outreach, service projects, and scholarship advocacy across various Rotary districts.",
        status: "Civic Organization",
        icon: <RotaryIcon />,
        accentColor: "#7c3aed",
        bgLight: "#faf5ff",
    },

];

const categories = ['All', 'Academic', 'Corporate', 'Community'];

/* ─── Component ────────────────────────────────────────────────────────────── */

const Linkages = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPartners = activeCategory === 'All'
        ? partners
        : partners.filter(p => p.category === activeCategory);

    const iconStyle = { width: '28px', height: '28px', filter: 'brightness(0) saturate(100%) invert(27%) sepia(88%) saturate(1500%) hue-rotate(210deg) brightness(95%) contrast(95%)' };

    const categoryMeta = {
        Academic: { icon: <img src={academicCapIcon} alt="Academic" style={iconStyle} />, label: 'Academic Partners', count: partners.filter(p => p.category === 'Academic').length },
        Corporate: { icon: <img src={corporateIcon} alt="Corporate" style={iconStyle} />, label: 'Corporate Partners', count: partners.filter(p => p.category === 'Corporate').length },
        Community: { icon: <img src={communityIcon} alt="Community" style={iconStyle} />, label: 'Community Partners', count: partners.filter(p => p.category === 'Community').length },
    };

    return (
        <div className="linkages-page">

            {/* ── Hero ──────────────────────────────────────────────────────────── */}
            <section className="linkages-hero">
                <div className="linkage-container">
                    <div className="hero-badge">OUR NETWORK</div>
                    <h1>Linkages &amp; Partnerships</h1>
                    <p>
                        TTGAI is powered by a strong coalition of academic institutions, corporate
                        champions, and community leaders — all united to expand access to quality
                        education and uplift deserving scholars in Cabuyao.
                    </p>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="stat-number">{partners.length}</span>
                            <span className="stat-label">Active Partners</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <span className="stat-number">{[...new Set(partners.map(p => p.category))].length}</span>
                            <span className="stat-label">Sectors</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <span className="stat-number">1</span>
                            <span className="stat-label">Shared Mission</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Category Summary Cards ─────────────────────────────────────────── */}
            <section className="category-summary-section">
                <div className="linkage-container">
                    <div className="category-summary-grid">
                        {Object.entries(categoryMeta).map(([key, val]) => (
                            <button
                                key={key}
                                className={`category-summary-card ${activeCategory === key ? 'active' : ''}`}
                                onClick={() => setActiveCategory(key)}
                                id={`cat-btn-${key.toLowerCase()}`}
                            >
                                <span className="cat-emoji">{val.icon}</span>
                                <span className="cat-count">{val.count}</span>
                                <span className="cat-label">{val.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Partners Grid ─────────────────────────────────────────────────── */}
            <section className="linkage-section">
                <div className="linkage-container">
                    <div className="section-header">
                        <h2>Our Network</h2>
                        <p>Real organisations. Real commitment. Real impact for our scholars.</p>
                    </div>

                    {/* Filter tabs */}
                    <div className="category-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                id={`filter-tab-${cat.toLowerCase()}`}
                                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="partners-grid">
                        {filteredPartners.map((partner, index) => (
                            <div
                                key={index}
                                className="partner-card"
                                style={{ '--card-accent': partner.accentColor, '--card-bg-light': partner.bgLight }}
                            >
                                <div className="partner-logo-placeholder">
                                    {partner.icon}
                                </div>
                                <span className="partner-category-badge">{partner.category}</span>
                                <span className="partner-tag" style={{ background: partner.bgLight, color: partner.accentColor }}>
                                    {partner.status}
                                </span>
                                <h3>{partner.name}</h3>
                                <p>{partner.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How We Collaborate ────────────────────────────────────────────── */}
            <section className="linkage-section collab-section">
                <div className="linkage-container">
                    <div className="section-header">
                        <h2>How We Collaborate</h2>
                        <p>Our partnerships are built on shared values and concrete, measurable actions.</p>
                    </div>

                    <div className="collab-types-grid">
                        <div className="collab-card">
                            <div className="collab-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" />
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13c-.34-1.06-.52-2.17-.52-3.31A2 2 0 014.63 7.69" />
                                    <path d="M15 2a5 5 0 010 10" /><path d="M9.09 9a3 3 0 105.83 1c0-1.66-1.34-3-3-3z" />
                                </svg>
                            </div>
                            <div>
                                <h3>Scholarship Funding</h3>
                                <p>Corporate and civic partners provide direct financial grants for tuition, allowances, and education materials for scholars.</p>
                            </div>
                        </div>

                        <div className="collab-card">
                            <div className="collab-icon" style={{ background: '#fff7ed', color: '#f97316' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                                </svg>
                            </div>
                            <div>
                                <h3>Program Coordination</h3>
                                <p>PnC and the CCS SG coordinate academic schedules, scholar onboarding, and campus integration for the Pabaon Kay Iskolar program.</p>
                            </div>
                        </div>

                        <div className="collab-card">
                            <div className="collab-icon" style={{ background: '#f0fdf4', color: '#15803d' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                                </svg>
                            </div>
                            <div>
                                <h3>Community Outreach</h3>
                                <p>Barangay Banay-Banay, City LGU, and Rotary Club help identify deserving students and reach families who need support the most.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why Linkages Matter ───────────────────────────────────────────── */}
            <section className="linkage-section impact-section">
                <div className="linkage-container">
                    <div className="section-header">
                        <h2 style={{ color: 'white' }}>Why Linkages Matter</h2>
                        <p style={{ color: '#94a3b8' }}>Creating a unified ecosystem of support for every scholar's journey.</p>
                    </div>

                    <div className="impact-grid">
                        <div className="impact-item">
                            <div className="impact-icon-wrap">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" width="40" height="40">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                                </svg>
                            </div>
                            <h3>Wider Reach</h3>
                            <p>Multi-sector alliances mean more students are discovered, informed, and supported across Cabuyao's communities.</p>
                        </div>
                        <div className="impact-item">
                            <div className="impact-icon-wrap">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" width="40" height="40">
                                    <polyline points="20 6 9 17 4 12" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            </div>
                            <h3>Credibility &amp; Trust</h3>
                            <p>Every partner is a trusted institution — from the local government to an accredited university — ensuring legitimate, transparent scholarship delivery.</p>
                        </div>
                        <div className="impact-item">
                            <div className="impact-icon-wrap">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" width="40" height="40">
                                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
                                    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
                                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                                </svg>
                            </div>
                            <h3>Sustainable Impact</h3>
                            <p>With energy sector funding and civic backing, TTGAI can sustain scholarships year after year, providing long-term opportunity.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Become a Partner CTA ─────────────────────────────────────────── */}
            <section className="linkage-cta">
                <div className="linkage-container">
                    <div className="cta-box">
                        <div className="cta-badge">JOIN OUR COALITION</div>
                        <h2>Interested in partnering with us?</h2>
                        <p>
                            Whether you are a business, civic group, or academic institution — your partnership
                            can change a student's life. Let's build something impactful together for Cabuyao's next generation.
                        </p>
                        <Link to="/sponsorship" className="btn-partner" id="btn-become-partner">
                            Become a Partner
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Linkages;
