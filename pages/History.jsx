import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/history.css';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';

const milestones = [
    {
        date: '2009',
        title: 'TTGAI Founded',
        description: 'A group of golfers formed TTMO in early 2009, playing at various courses during Twilight promo at 50% off regular golf rate. The group became known for hosting quarterly Birthday Golf Tournaments and initiating charity fundraising events.',
        category: 'FOUNDING',
        color: '#7c3aed',
        image: img1,
    },
    {
        date: '2012',
        title: 'First Invitational Charity Cup',
        description: 'Team Twilight organized its first major Invitational Charity Cup, cementing its identity as a group that plays with purpose. Proceeds went toward community education initiatives.',
        category: 'CHARITY',
        color: '#d97706',
        image: img2,
    },
    {
        date: '2016',
        title: 'Blockchain Partnerships with PKI',
        description: 'Team Twilight began forging formal partnerships with schools and local government units to align corporate resources with scholar selection for the upcoming PKI program.',
        category: 'PARTNERSHIPS',
        color: '#0d9488',
        image: img5,
    },
    {
        date: 'April 11, 2025',
        title: 'Scholarship Batch 1: Sinag',
        description: 'Launched at Canlubang Golf and Country Club during the 48th St. 1965 Golf Tour. Over 118 players attended. The event raised ₱50,000 as seed funding, with golfers and friends committing as inaugural Benefactors.',
        category: 'PKI LAUNCH',
        color: '#0d9488',
        image: img3,
    },
    {
        date: 'September 2025',
        title: 'Global Outreach Program',
        description: 'TTGAI expanded its vision by welcoming international partners and benefactors to support Filipino scholars, aiming to grow the PKI program beyond domestic reach.',
        category: 'FIRST SCHOLARS',
        color: '#16a34a',
        image: img4,
    },
    {
        date: '2024',
        title: '15 Years of Impact',
        description: 'Team Twilight celebrated 15 years of community, camaraderie, and change — marking ₱12M+ in committed scholarship funds and 20 active scholars in its inaugural Batch Sinag at Dangal.',
        category: 'MILESTONE',
        color: '#2563eb',
        image: img5,
    },
];

const FILTERS = ['All', 'FOUNDING', 'CHARITY', 'PARTNERSHIPS', 'PKI LAUNCH', 'FIRST SCHOLARS', 'MILESTONE'];

const History = () => {
    const cardRefs = useRef([]);
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All' ? milestones : milestones.filter(m => m.category === activeFilter);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.12 }
        );

        cardRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [filtered]);

    return (
        <div className="history-page">
            {/* ── Hero Header ── */}
            <header className="history-hero">
                <div className="history-hero-inner">
                    <span className="history-hero-badge">History</span>
                    <h1>History &amp; <span className="history-h1-accent">Milestones</span></h1>
                    <p>
                        From a weekend golf group to a premier scholarship-empowering force — celebrating milestones and significant contributions.
                    </p>
                </div>
            </header>

            {/* ── Filter Pills ── */}
            <div className="history-filters-wrap">
                <div className="history-filters">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            className={`history-filter-btn${activeFilter === f ? ' active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Timeline ── */}
            <section className="history-timeline-section">
                <div className="history-timeline">
                    {filtered.map((m, i) => (
                        <div
                            key={m.title + i}
                            className={`history-tl-item${i % 2 === 0 ? '' : ' history-tl-item--flip'}`}
                            ref={(el) => (cardRefs.current[i] = el)}
                        >
                            {/* Year label on the spine */}
                            <div className="history-tl-year" style={{ color: m.color }}>{m.date}</div>

                            {/* Image side */}
                            <div className="history-tl-img-wrap">
                                <img src={m.image} alt={m.title} />
                                <span
                                    className="history-tl-cat"
                                    style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}55` }}
                                >{m.category}</span>
                            </div>

                            {/* Text side */}
                            <div className="history-tl-card">
                                <div
                                    className="history-tl-accent"
                                    style={{ background: m.color }}
                                />
                                <h3>{m.title}</h3>
                                <p>{m.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing Quote */}
                <blockquote className="history-closing-quote">
                    <span className="quote-mark">&ldquo;</span>
                    Batch Sinag at Dangal &mdash; ang unang kislap ng liwanag at pag-asa,
                    ang unang hakbang ng paninindigan para sa bansa.
                    <span className="quote-mark">&rdquo;</span>
                </blockquote>
            </section>

            {/* ── CTA Banner ── */}
            <section className="history-cta">
                <div className="history-cta-inner">
                    <div className="history-cta-left">
                        <div className="history-cta-icon">
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"/></svg>
                        </div>
                        <div>
                            <h3>Want the Full Recap?</h3>
                            <p>Read the full timeline of our events, charity tournaments, and scholar milestones in our official newsletters. Download the full report and pass it on to us.</p>
                        </div>
                    </div>
                    <div className="history-cta-btns">
                        <Link to="/newsletter" className="history-cta-btn-gold">View Newsletter Archive →</Link>
                        <Link to="/sponsorship" className="history-cta-btn-outline">Become a Sponsor</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default History;
