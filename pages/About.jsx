import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import missionImg from '../assets/mission.jpg';
import visionImg from '../assets/vision.jpg';
import advocacyImg from '../assets/advocacy.jpg';
import valueImg from '../assets/value.jpg';
import aboutBg from '../assets/About bg.jpg';
import { useSiteImages } from '../lib/siteImages';
import '../styles/about.css';

const About = () => {
    const boxesRef = useRef([]);
    const siteImages = useSiteImages();

    const heroBg = siteImages.about_hero || aboutBg;
    const milestoneMission = siteImages.about_mission || missionImg;
    const milestoneFounding = siteImages.about_founding || advocacyImg;
    const milestonePki = siteImages.about_pki || valueImg;
    const milestoneSinag = siteImages.about_sinag || visionImg;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        boxesRef.current.forEach((box, i) => {
            if (box) {
                box.style.setProperty('--delay', (i * 90) + 'ms');
                observer.observe(box);
            }
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !boxesRef.current.includes(el)) {
            boxesRef.current.push(el);
        }
    };

    return (
        <div className="about-page">
            {/* ── 1. Hero ── */}
            <header className="about-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="about-hero-inner">
                    <span className="about-hero-badge">Our Purpose</span>
                    <h1>Our Story of <span className="about-h1-accent">Purpose<br/>&amp; Passion</span></h1>
                    <p>
                        From a weekend golf group to nation-builders — Team Twilight is changing lives
                        one swing at a time through the Pabaon Kay Iskolar scholarship program.
                    </p>
                    <div className="about-hero-btns">
                        <Link to="/sponsorship" className="about-btn-gold">Support a Cause</Link>
                        <Link to="/history" className="about-btn-outline">Learn More</Link>
                    </div>
                </div>
            </header>

            {/* ── 2. Mission + Vision Cards ── */}
            <section className="about-mv-section">
                <div className="about-mv-inner">
                    <div className="about-mv-card" ref={addToRefs}>
                        <div className="about-mv-card-icon">
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h3>Our Mission</h3>
                        <p>
                            To nurture future leaders by providing deserving students with academic support, value development, and leadership training.
                            We aim to foster camaraderie among members while contributing to society through meaningful charitable initiatives.
                        </p>
                    </div>
                    <div className="about-mv-card about-mv-card--dark" ref={addToRefs}>
                        <div className="about-mv-card-icon">
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            TTGAI envisions a Philippines where education is truly accessible to all — where passion, talent, and financial need are no longer barriers.
                            We strive to be the bridge that connects opportunity with deserving young Filipinos, changing the landscape of Philippine education one scholar at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 3. Values We Carry ── */}
            <section className="about-values-section">
                <div className="about-values-inner">
                    <p className="about-values-eyebrow">What Drives Us</p>
                    <h2>The Values We Carry</h2>
                    <div className="about-values-grid">
                        <div className="about-value-item" ref={addToRefs}>
                            <div className="about-vi-icon">
                                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h4>Integrity</h4>
                            <p>We lead with honesty, accountability, and faith in every decision we make for our scholars and our community.</p>
                        </div>
                        <div className="about-value-item" ref={addToRefs}>
                            <div className="about-vi-icon">
                                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <h4>Community</h4>
                            <p>We believe in the power of united purpose — golfers, families, and businesses working together to lift each other up.</p>
                        </div>
                        <div className="about-value-item" ref={addToRefs}>
                            <div className="about-vi-icon">
                                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                            </div>
                            <h4>Excellence</h4>
                            <p>From the golf course to the classroom, we pursue the highest standards of performance and character development.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. Major Milestones ── */}
            <section className="about-milestones-section">
                <div className="about-milestones-inner">
                    <p className="about-values-eyebrow">Our Journey</p>
                    <h2>Major Milestones</h2>
                    <p className="about-milestones-sub">From the first swing to the first scholarship — here are the moments that defined us.</p>

                    {/* Milestone 1 */}
                    <div className="about-ms-item about-ms-item--right" ref={addToRefs}>
                        <div className="about-ms-img">
                            <img src={milestoneMission} alt="TTGAI Founded" />
                            <span className="about-ms-year-badge">2009</span>
                        </div>
                        <div className="about-ms-text">
                            <h4>The Weekend Spar</h4>
                            <p>
                                A group of like-minded golfers began their journey playing at various courses during Twilight promo hours,
                                forming the nucleus of what would become Team Twilight Golfers Association, Inc.
                            </p>
                        </div>
                    </div>

                    {/* Milestone 2 */}
                    <div className="about-ms-item" ref={addToRefs}>
                        <div className="about-ms-img">
                            <img src={milestoneFounding} alt="Founding the Association" />
                            <span className="about-ms-year-badge about-ms-year-badge--gold">2021</span>
                        </div>
                        <div className="about-ms-text">
                            <h4>Founding the Association</h4>
                            <p>
                                TTGAI was formally incorporated as a non-profit organization, cementing its commitment to nation-building,
                                education advocacy, and camaraderie among members.
                            </p>
                        </div>
                    </div>

                    {/* Milestone 3 */}
                    <div className="about-ms-item about-ms-item--right" ref={addToRefs}>
                        <div className="about-ms-img">
                            <img src={milestonePki} alt="Scholarship Program" />
                            <span className="about-ms-year-badge">2025</span>
                        </div>
                        <div className="about-ms-text">
                            <h4>Scholarship PKI Program</h4>
                            <p>
                                The Pabaon Kay Iskolar (PKI) program was officially launched at Canlubang Golf Club during the 48th St. 1965 Golf Tour,
                                raising ₱50,000 as seed funding for its inaugural scholars.
                            </p>
                        </div>
                    </div>

                    {/* Milestone 4 */}
                    <div className="about-ms-item" ref={addToRefs}>
                        <div className="about-ms-img">
                            <img src={milestoneSinag} alt="Batch Sinag at Dangal" />
                            <span className="about-ms-year-badge about-ms-year-badge--gold">2025</span>
                        </div>
                        <div className="about-ms-text">
                            <h4>Batch Sinag at Dangal</h4>
                            <p>
                                20 deserving students from Pamantasan ng Cabuyao were welcomed as TTGAI's inaugural scholars —
                                "Batch Sinag at Dangal" (First Ray of Light and Hope).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. PKI Program Details (preserved) ── */}
            <section className="about-pki-section">
                <div className="about-pki-inner">
                    <div className="about-pki-text" ref={addToRefs}>
                        <p className="about-values-eyebrow">The Program</p>
                        <h2>The PKI Program</h2>
                        <p>
                            <strong>Batch Sinag at Dangal</strong> ("First Ray of Light and Hope") — guided by the philosophy that
                            <em> "Education is the key to a better future, the most effective equalizer in society,"</em> we provide more than just financial aid ("Baon").
                        </p>
                        <p>Our scholars undergo comprehensive training in:</p>
                        <ul className="about-pki-list">
                            <li>Leadership &amp; Management</li>
                            <li>Financial Literacy</li>
                            <li>Arts &amp; Culture Appreciation</li>
                            <li>Critical Thinking</li>
                        </ul>
                    </div>
                    <div className="about-pki-stat-block" ref={addToRefs}>
                        <div className="about-pki-stat">
                            <span className="about-pki-stat-num">120</span>
                            <span className="about-pki-stat-label">College Graduates per 1,000 Grade 1 entrants</span>
                        </div>
                        <p className="about-pki-stat-desc">
                            The Philippines faces a severe education gap. For every 1,000 Grade 1 students, only 120 eventually graduate college.
                            TTGAI's PKI program directly addresses this with targeted support.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 6. CTA Footer ── */}
            <section className="about-cta-section">
                <div className="about-cta-inner">
                    <div className="about-cta-icon">
                        <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h2>Be Part of the Story</h2>
                    <p>Every donation provides the foundation for all future scholar's dreams. Help us write the next chapter of scholarship success.</p>
                    <Link to="/sponsorship" className="about-btn-gold">Become a Sponsor →</Link>
                </div>
            </section>
        </div>
    );
};

export default About;
