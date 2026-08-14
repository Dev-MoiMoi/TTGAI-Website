import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import { useSiteImages } from '../lib/siteImages';

/* ── Earth Day 2026 images ── */
import earthDay1 from '../assets/Earth Day/684180445_946665661451288_8343696422311329551_n.jpg';
import earthDay2 from '../assets/Earth Day/679722873_946663178118203_8060107513597089396_n.jpg';
import earthDay3 from '../assets/Earth Day/684563813_946667001451154_2670219676718142406_n.jpg';
import earthDay4 from '../assets/Earth Day/683586609_946666171451237_1391433544689973347_n.jpg';
import earthDay5 from '../assets/Earth Day/682565609_946666071451247_6417247281028576333_n.jpg';
import earthDay6 from '../assets/Earth Day/684180445_946663738118147_77551954255807091_n.jpg';

/* ── Ethics Seminar images ── */
import ethics1 from '../assets/Ethics Seminar/679770527_1629939499136462_8784497964349652169_n.jpg';
import ethics2 from '../assets/Ethics Seminar/680216454_1629939552469790_6476341565189612828_n.jpg';
import ethics3 from '../assets/Ethics Seminar/679618311_1629939532469792_2245372649445564062_n.jpg';

const Home = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [earthDayIdx, setEarthDayIdx] = useState(0);
    const [ethicsIdx, setEthicsIdx] = useState(0);
    const siteImages = useSiteImages();

    const earthDayPhotos = [
        siteImages.earth_day_1 || earthDay1,
        siteImages.earth_day_2 || earthDay2,
        siteImages.earth_day_3 || earthDay3,
        siteImages.earth_day_4 || earthDay4,
        siteImages.earth_day_5 || earthDay5,
        siteImages.earth_day_6 || earthDay6,
    ];
    const ethicsPhotos = [
        siteImages.ethics_seminar_1 || ethics1,
        siteImages.ethics_seminar_2 || ethics2,
        siteImages.ethics_seminar_3 || ethics3,
    ];
    const heroBg = siteImages.home_hero || img4;
    const spot1 = siteImages.home_spot_1 || img1;
    const spot2 = siteImages.home_spot_2 || img2;
    const spot3 = siteImages.home_spot_3 || img3;

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    /* Auto-rotate event carousels */
    useEffect(() => {
        const t1 = setInterval(() => setEarthDayIdx((i) => (i + 1) % 6), 4000);
        const t2 = setInterval(() => setEthicsIdx((i) => (i + 1) % 3), 5000);
        return () => { clearInterval(t1); clearInterval(t2); };
    }, []);

    return (
        <>
            {/* ── 1. Hero ── */}
            <section className="home-hero">
                <img src={heroBg} alt="Team Twilight Golfers" className="home-hero-bg" />
                <div className="home-hero-overlay" />
                <div className="home-hero-content">
                    <span className="home-hero-badge">Pabaon Kay Iskolar</span>
                    <h1>
                        Empowering Filipino Golfers —{' '}
                        <span className="home-hero-accent">One Scholarship at a Time.</span>
                    </h1>
                    <p>
                        Team Twilight is dedicated to fostering excellence in the game. With TTGAI, we champion the next generation of Filipino golfers.
                    </p>
                    <div className="home-hero-btns">
                        <Link to="/sponsorship" className="home-btn-gold">Become a Sponsor</Link>
                        <Link to="/about" className="home-btn-outline">Learn More</Link>
                    </div>
                </div>
            </section>

            {/* ── 2. Stats Strip ── */}
            <div className="home-stats-strip">
                <div className="home-stat">
                    <span className="home-stat-num">52+</span>
                    <span className="home-stat-label">Golfers</span>
                </div>
                <div className="home-stat-divider" />
                <div className="home-stat">
                    <span className="home-stat-num">20</span>
                    <span className="home-stat-label">Scholars</span>
                </div>
                <div className="home-stat-divider" />
                <div className="home-stat">
                    <span className="home-stat-num">360+</span>
                    <span className="home-stat-label">Commitments</span>
                </div>
                <div className="home-stat-divider" />
                <div className="home-stat">
                    <span className="home-stat-num">₱12M</span>
                    <span className="home-stat-label">Fund Commitment</span>
                </div>
            </div>

            {/* ── 3. Foundation of Excellence ── */}
            <section className="home-foundation">
                <div className="home-foundation-inner">
                    <h2>Foundation of Excellence</h2>
                    <p className="home-foundation-sub">
                        We bridge the gap between passion for golf and commitment to education,
                        scholarships, and community excellence. One swing at a time.
                    </p>
                    <div className="home-foundation-grid">
                        <div className="home-foundation-card">
                            <div className="home-fc-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <h4>Our Story</h4>
                            <p>From weekend golfers to nation-builders. Our journey began in 2009.</p>
                        </div>
                        <div className="home-foundation-card">
                            <div className="home-fc-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                            </div>
                            <h4>Events</h4>
                            <p>Charity golf tournaments, benefit concerts, MOA signings and more.</p>
                        </div>
                        <div className="home-foundation-card">
                            <div className="home-fc-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                            </div>
                            <h4>Scholars</h4>
                            <p>20 deserving students in Batch Sinag at Dangal — the first light of hope.</p>
                        </div>
                        <div className="home-foundation-card">
                            <div className="home-fc-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h4>Befriended</h4>
                            <p>Backed by industry leaders, business owners, and passionate benefactors.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3½. RECENT EVENTS ── */}
            <section className="home-events">
                <div className="home-events-inner">
                    <div className="home-events-header">
                        <span className="home-events-badge">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            Latest Activity
                        </span>
                        <h2>Recent Events &amp; Seminars</h2>
                        <p className="home-events-sub">
                            TTGAI continues to empower communities through impactful seminars, workshops,
                            and advocacy events — proving that we're more than golfers.
                        </p>
                    </div>

                    <div className="home-events-grid">
                        {/* ── Earth Day 2026 ── */}
                        <div className="home-event-card">
                            <div className="home-event-carousel">
                                {earthDayPhotos.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Earth Day 2026 — Photo ${i + 1}`}
                                        className={`home-event-img ${i === earthDayIdx ? 'active' : ''}`}
                                    />
                                ))}
                                <div className="home-event-dots">
                                    {earthDayPhotos.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`home-event-dot ${i === earthDayIdx ? 'active' : ''}`}
                                            onClick={() => setEarthDayIdx(i)}
                                            aria-label={`View photo ${i + 1}`}
                                        />
                                    ))}
                                </div>
                                <span className="home-event-tag home-event-tag--green">
                                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>
                                    ADVOCACY
                                </span>
                            </div>
                            <div className="home-event-body">
                                <div className="home-event-date-row">
                                    <span className="home-event-date">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                        April 22, 2026
                                    </span>
                                    <span className="home-event-location">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                        University of Cabuyao
                                    </span>
                                </div>
                                <h3>Earth Day 2026 Celebration</h3>
                                <p>
                                    TTGAI co-organized the Earth Day 2026 celebration at the University of Cabuyao,
                                    bringing together hundreds of students, faculty, and community leaders in a day
                                    of environmental awareness, performances, and collective action for a greener future.
                                </p>
                                <div className="home-event-highlights">
                                    <span className="home-event-highlight"><strong>300+</strong> Attendees</span>
                                    <span className="home-event-highlight"><strong>6</strong> Speakers</span>
                                    <span className="home-event-highlight"><strong>1</strong> Day of Impact</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Ethical Leadership Workshop ── */}
                        <div className="home-event-card">
                            <div className="home-event-carousel">
                                {ethicsPhotos.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Ethical Leadership Workshop — Photo ${i + 1}`}
                                        className={`home-event-img ${i === ethicsIdx ? 'active' : ''}`}
                                    />
                                ))}
                                <div className="home-event-dots">
                                    {ethicsPhotos.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`home-event-dot ${i === ethicsIdx ? 'active' : ''}`}
                                            onClick={() => setEthicsIdx(i)}
                                            aria-label={`View photo ${i + 1}`}
                                        />
                                    ))}
                                </div>
                                <span className="home-event-tag home-event-tag--blue">
                                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                                    SEMINAR
                                </span>
                            </div>
                            <div className="home-event-body">
                                <div className="home-event-date-row">
                                    <span className="home-event-date">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                        April 25, 2026
                                    </span>
                                    <span className="home-event-location">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                        Aurotech Corp, Sta. Rosa, Laguna
                                    </span>
                                </div>
                                <h3>Ethical Leadership Workshop</h3>
                                <p>
                                    In partnership with the Philippine Leadership Society, TTGAI hosted an exclusive
                                    Ethical Leadership Workshop for Pabaon Kay Iskolar scholars — facilitated by
                                    Dr. Oscar G. Bulaong Jr., PhD, focusing on leading with integrity and confidence.
                                </p>
                                <div className="home-event-highlights">
                                    <span className="home-event-highlight"><strong>PKI</strong> Exclusive</span>
                                    <span className="home-event-highlight"><strong>Dr. Bulaong</strong> Facilitator</span>
                                    <span className="home-event-highlight"><strong>PLS</strong> Partnership</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. Inner Circle CTA ── */}
            <section className="home-inner-circle">
                <div className="home-ic-inner">
                    <div className="home-ic-text">
                        <h3>Join the Inner Circle</h3>
                        <p>Follow our events, scholarships, and updates on golf and impact.</p>
                    </div>
                    <Link to="/newsletter" className="home-btn-gold">Subscribe Now</Link>
                </div>
            </section>

            {/* ── 5. Driving Change ── */}
            <section className="home-driving">
                <div className="home-driving-inner">
                    <div className="home-driving-left">
                        <h2>Driving Change,<br/><span className="home-driving-accent">One Hole at a Time</span></h2>
                        <p>
                            At Team Twilight Golfers Association, we don't just organize charity golf tournaments —
                            we build a movement of golfers who believe education is the most powerful equalizer in society.
                            We are taking a swing for the nation.
                        </p>
                        <ul className="home-driving-list">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                Funding scholarships for top Filipino students
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                The TTGAI PKI program reaches across Cabuyao
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                Making every swing of golf count for the next generation
                            </li>
                        </ul>
                        <Link to="/history" className="home-btn-outlined-navy">View Our Story →</Link>
                    </div>
                    <div className="home-driving-right">
                        <div className="home-driving-stat">
                            <span className="home-ds-num">14+</span>
                            <span className="home-ds-label">Years of Community</span>
                        </div>
                        <div className="home-driving-stat">
                            <span className="home-ds-num">360</span>
                            <span className="home-ds-label">Benefactor Commitments</span>
                        </div>
                        <div className="home-driving-stat">
                            <span className="home-ds-num">98%</span>
                            <span className="home-ds-label">Scholar Retention</span>
                        </div>
                        <div className="home-driving-stat">
                            <span className="home-ds-num">₱12M</span>
                            <span className="home-ds-label">Total Fund Commitment</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. Inside Team Twilight ── */}
            <section className="home-spotlight">
                <div className="home-spotlight-inner">
                    <div className="home-spotlight-header">
                        <h2>Inside Team Twilight</h2>
                        <Link to="/newsletter" className="home-spot-more">View All Stories →</Link>
                    </div>
                    <div className="home-spotlight-grid">
                        <div className="home-spot-card">
                            <div className="home-spot-img-wrap">
                                <img src={spot2} alt="Charity Golf Tournament" />
                                <span className="home-spot-tag">EVENT</span>
                            </div>
                            <div className="home-spot-body">
                                <h4>We Welcome New Scholars From Batch Sinag at Dangal This Year</h4>
                                <p>Catching up with our newest recruits and what drives them to the fairway.</p>
                                <span className="home-spot-author">TTGAI</span>
                            </div>
                        </div>
                        <div className="home-spot-card">
                            <div className="home-spot-img-wrap">
                                <img src={spot3} alt="Pabaon Kay Iskolar" />
                                <span className="home-spot-tag">SCHOLARSHIP</span>
                            </div>
                            <div className="home-spot-body">
                                <h4>Behind the Scenes: How Our Charity Golf Tournament Fuels the Fund</h4>
                                <p>From tee time to tuition, the story behind every peso raised.</p>
                                <span className="home-spot-author">TTGAI</span>
                            </div>
                        </div>
                        <div className="home-spot-card">
                            <div className="home-spot-img-wrap">
                                <img src={spot1} alt="Fundraising" />
                                <span className="home-spot-tag">IMPACT</span>
                            </div>
                            <div className="home-spot-body">
                                <h4>Mastering the Game: Managing Our Scholarship Program for the Team</h4>
                                <p>How TTGAI continued its scholarship impact through 2025.</p>
                                <span className="home-spot-author">TTGAI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. FAQ Section (preserved) ── */}
            <section className="home-faq">
                <div className="home-faq-inner">
                    <h2>Frequently Asked Questions</h2>
                    <div className="home-faq-list">
                        {[
                            { q: "What are the eligibility requirements?", a: "To be eligible, applicants must be incoming college freshmen or currently enrolled college students demonstrating both financial need and academic potential. Candidates must align with our core values and demonstrate strong leadership capabilities." },
                            { q: "What is the application timeline?", a: "Applications usually open in the early part of the year (March-April) ahead of the incoming academic year. Deadlines and specific screening dates will be announced on our official channels." },
                            { q: "How much is the scholarship amount?", a: "Selected scholars receive financial aid, commonly referred to as 'Baon', which amounts to ₱2,000 monthly." },
                            { q: "What is the disbursement schedule?", a: "The financial aid is distributed monthly directly to the scholar to support their regular day-to-day educational needs." }
                        ].map((item, index) => (
                            <div key={index} className="home-faq-item">
                                <button
                                    className="home-faq-q"
                                    onClick={() => toggleFaq(index)}
                                >
                                    {item.q}
                                    <span className="home-faq-toggle">{openFaq === index ? '−' : '+'}</span>
                                </button>
                                {openFaq === index && (
                                    <div className="home-faq-a">{item.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 8. Ready to Shape the Future ── */}
            <section className="home-cta-footer">
                <div className="home-ctaf-inner">
                    <h2>Ready to Shape the Future<br/>of Filipino Golfers?</h2>
                    <div className="home-ctaf-btns">
                        <Link to="/sponsorship" className="home-btn-gold">Become a Sponsor</Link>
                        <Link to="/about" className="home-btn-outline-light">Find Out More →</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
