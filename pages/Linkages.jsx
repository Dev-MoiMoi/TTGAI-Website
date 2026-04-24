import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/linkages.css';
import pncLogo from '../assets/Linkages/PnC Logo.jpg';
import cabuyaoLogo from '../assets/Linkages/Cabuyao Logo.png';
import buscowitzLogo from '../assets/Linkages/Buskowitz.png';

/* ─── Corporate Sponsors Data ─────────────────────────────────────────────── */
const SPONSORS = [
    {
        name: 'GMV Corporation',
        person: 'Jun Valerio',
        logo: 'https://images.squarespace-cdn.com/content/v1/62eb33c6069f4814c6f2f5d2/7bf7e610-a89b-4b14-bd84-bb4f4e22c454/GMV+NEW+LOGO.png',
        website: 'https://www.gmv.com.ph',
        description: 'Premium provider of products and services for the Philippine Semiconductor and Electronics Industry for over 30 years. Based in Biñan, Laguna.',
        darkBg: false,
        initials: 'GMV',
    },
    {
        name: 'Fastech Synergy Philippines',
        person: 'Primo "Jon" Mateo Jr.',
        logo: 'https://www.fastechsynergy.com/static/392877dc29c603e438f3e5da63b04bf6/a82c6/fastech-logo.png',
        website: 'https://www.fastechsynergy.com',
        description: 'Leading Philippine semiconductor manufacturing company recognized for expertise in power semiconductor components and RF/Microwave modules. Based in Cabuyao, Laguna.',
        darkBg: false,
        initials: 'FS',
    },
    {
        name: 'Buscowitz Energy',
        person: null,
        logo: buscowitzLogo,
        website: 'https://www.buskowitz.com',
        description: 'One of the leading solar energy companies in the Philippines, providing sustainable and renewable energy solutions. Organized the "Swing for a Cause" charity golf tournament benefiting PKI.',
        darkBg: true,
        initials: 'BE',
    },
    {
        name: 'SEIPI',
        person: 'Dr. Danilo Lachica',
        logo: 'https://seipi.org.ph/wp-content/uploads/elementor/thumbs/SEIPI-LOGO-qrmf087iuvkqfehukvhwsz242l482k8oyn0gynkkkg.png',
        website: 'https://seipi.org.ph',
        description: 'Semiconductor & Electronics Industries in the Philippines Foundation, Inc. — the largest organization of foreign and Filipino electronics companies in the Philippines. Industry partner and supporter of PKI.',
        darkBg: false,
        initials: 'SEIPI',
    },
    {
        name: 'FEMCO',
        person: null,
        logo: null,
        website: null,
        description: 'Corporate benefactor and supporter of the Pabaon Kay Iskolar Program.',
        darkBg: false,
        initials: 'FEMCO',
    },
    {
        name: 'AIPI',
        person: null,
        logo: null,
        website: null,
        description: 'Corporate benefactor and supporter of the Pabaon Kay Iskolar Program.',
        darkBg: false,
        initials: 'AIPI',
    },
];

/* ─── Individual Benefactors ──────────────────────────────────────────────── */
const BENEFACTORS = [
    { name: 'Ms. Cheng Portugal', detail: '' },
    { name: 'Ms. Gail Escudero', detail: '' },
    { name: 'Ms. Angie Larios', detail: '' },
    { name: 'Jun Valerio', detail: 'GMV Corporation' },
    { name: 'Rey Araos', detail: '' },
    { name: 'Carmelita M. Chua', detail: '' },
    { name: 'Teotimo G. Batac', detail: 'Chairman, TTGASInc' },
    { name: 'Julius Buenaventura', detail: '' },
    { name: 'Jingo Cabauatan', detail: '' },
    { name: 'Mr. Noel Cabangon', detail: 'Singer-Songwriter · Bar Tour Series' },
    { name: 'Rene Dela Cruz', detail: 'TTGAI Founding Benefactor · PKI Launch Host' },
    { name: 'Dingo Bonifacio', detail: 'Automated Technology Philippines' },
    { name: 'Rudy Mago', detail: '' },
    { name: 'Charlie Lagdameo', detail: '' },
    { name: 'Jon Mateo', detail: 'Managing Director, FASTECH' },
    { name: 'Joey Palma', detail: '' },
    { name: 'Danilo Alas', detail: '' },
    { name: 'Rodel Bascon', detail: '' },
];

/* ─── Logo Card ───────────────────────────────────────────────────────────── */
const LogoCard = ({ sponsor }) => {
    const [imgError, setImgError] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className={`lk-sponsor-card${sponsor.darkBg ? ' lk-sponsor-card--dark' : ''}`}>
            <div className="lk-sponsor-logo-wrap">
                {sponsor.logo && !imgError ? (
                    <>
                        {!imgLoaded && <div className="lk-sponsor-logo-skeleton" />}
                        <img
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            className={`lk-sponsor-logo-img${imgLoaded ? ' loaded' : ''}`}
                            onLoad={() => setImgLoaded(true)}
                            onError={() => setImgError(true)}
                        />
                    </>
                ) : (
                    <div className="lk-sponsor-logo-fallback">{sponsor.initials}</div>
                )}
            </div>

            <div className="lk-sponsor-card-body">
                <p className="lk-sponsor-partner-tag">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    PKI Partner
                </p>
                <h3 className="lk-sponsor-name">{sponsor.name}</h3>
                {sponsor.person && <p className="lk-sponsor-person">Rep: {sponsor.person}</p>}
                <p className="lk-sponsor-desc">{sponsor.description}</p>
            </div>

            {sponsor.website ? (
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="lk-sponsor-visit-btn">
                    Visit Website ↗
                </a>
            ) : (
                <span className="lk-sponsor-visit-btn lk-sponsor-visit-btn--soon">Coming Soon</span>
            )}
        </div>
    );
};

/* ─── Main Component ──────────────────────────────────────────────────────── */
const Linkages = () => {
    return (
        <div className="linkages-page">

            {/* ── 1. Hero ── */}
            <header className="lk-hero">
                <div className="lk-hero-inner">
                    <span className="lk-hero-badge">Our Network</span>
                    <h1>Our Linkages &amp; Partners</h1>
                    <p className="lk-hero-sub">
                        Together with our generous benefactors, sponsors, and partner organizations,
                        we empower Filipino scholars and their families to build a better future.
                    </p>
                    <div className="lk-hero-stats">
                        <div className="lk-stat">
                            <span className="lk-stat-num">{SPONSORS.length}</span>
                            <span className="lk-stat-label">Corporate Partners</span>
                        </div>
                        <div className="lk-stat-divider" />
                        <div className="lk-stat">
                            <span className="lk-stat-num">{BENEFACTORS.length}</span>
                            <span className="lk-stat-label">Individual Benefactors</span>
                        </div>
                        <div className="lk-stat-divider" />
                        <div className="lk-stat">
                            <span className="lk-stat-num">1</span>
                            <span className="lk-stat-label">Academic Partner</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── 2. Corporate Sponsors ── */}
            <section className="lk-section">
                <div className="lk-container">
                    <div className="lk-section-hd">
                        <div>
                            <h2>Corporate Sponsors &amp; Partners</h2>
                            <p className="lk-section-sub">Companies that have pledged resources, expertise, and funding to advance the Pabaon Kay Iskolar Program.</p>
                        </div>
                    </div>
                    <div className="lk-sponsors-grid">
                        {SPONSORS.map((s, i) => <LogoCard key={i} sponsor={s} />)}
                    </div>
                </div>
            </section>

            {/* ── 3. Academic Partner ── */}
            <section className="lk-section lk-section--alt">
                <div className="lk-container">
                    <div className="lk-section-hd">
                        <div>
                            <h2>Academic Partner</h2>
                            <p className="lk-section-sub">The institution that hosts and nurtures our scholars on their path to graduation.</p>
                        </div>
                    </div>

                    <div className="lk-academic-card">
                        <div className="lk-academic-logo-wrap">
                            <img src={pncLogo} alt="Pamantasan ng Cabuyao Logo" className="lk-academic-logo" />
                        </div>
                        <div className="lk-academic-body">
                            <div className="lk-academic-badges">
                                <span className="lk-badge lk-badge--gold">MOA Signed — August 6, 2025</span>
                                <span className="lk-badge lk-badge--blue">Strategic Academic Partner</span>
                            </div>
                            <h3>Pamantasan ng Cabuyao (PnC)</h3>
                            <p>
                                Official academic partner of TTGAI. A Memorandum of Agreement was formally signed on
                                August 6, 2025, committing partner companies to provide financial assistance to selected
                                PnC students starting AY 2025–2026. PnC is home to TTGAI's first batch of scholars —
                                <strong> "Batch Sinag at Dangal"</strong> — 20 deserving students selected for both
                                academic merit and financial need.
                            </p>
                            <a href="https://www.pnc.edu.ph" target="_blank" rel="noopener noreferrer" className="lk-academic-visit-btn">
                                Visit PnC Website ↗
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. Individual Benefactors ── */}
            <section className="lk-section">
                <div className="lk-container">
                    <div className="lk-section-hd">
                        <div>
                            <h2>Our Benefactors</h2>
                            <p className="lk-section-sub">
                                These individuals have generously committed to supporting Filipino scholars through the Pabaon Kay Iskolar Program.
                            </p>
                        </div>
                    </div>

                    <div className="lk-benefactors-grid">
                        {BENEFACTORS.map((b, i) => (
                            <div key={i} className="lk-benefactor-item">
                                <div className="lk-benefactor-avatar">
                                    {b.name.replace(/^(Ms\.|Mr\.|Dr\.|Engr\.)\s+/, '')
                                        .split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                                </div>
                                <div className="lk-benefactor-info">
                                    <span className="lk-benefactor-name">{b.name}</span>
                                    {b.detail && <span className="lk-benefactor-detail">{b.detail}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. CTA ── */}
            <section className="lk-cta">
                <div className="lk-container">
                    <div className="lk-cta-inner">
                        <div className="lk-cta-icon">
                            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </div>
                        <h2>Join our network of impact and empower the next generation.</h2>
                        <p>
                            Whether as a corporate sponsor, academic partner, or individual benefactor — your commitment
                            directly funds the education of deserving Filipino scholars.
                        </p>
                        <div className="lk-cta-actions">
                            <Link to="/sponsorship" className="lk-btn lk-btn--primary">Become a Partner</Link>
                            <a href="mailto:ttgasinc@gmail.com" className="lk-btn lk-btn--outline">Get in Touch</a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Linkages;
