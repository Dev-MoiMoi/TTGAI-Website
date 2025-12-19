import React, { useState } from 'react';
import '../styles/sponsorship.css';

const Sponsorship = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const scrollToForm = () => {
        const formElement = document.getElementById('inquiry-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="sponsorship-page">
            {/* 1. Hero Section */}
            <section className="sponsor-hero">
                <div className="container">
                    <h1>Sponsor the "Pabaon Kay Iskolars" Program</h1>
                    <p>Partner with Team Twilight to provide financial aid ("Baon") and holistic leadership training to deserving Filipino youth.</p>
                    <button className="hero-cta-btn" onClick={scrollToForm}>
                        Become a Benefactor
                    </button>
                </div>
            </section>

            {/* 2. Why Sponsor Us */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title">Why Support Our Advocacy</h2>
                    <div className="why-sponsor-grid">
                        <div className="why-card">
                            <i className="fa-solid fa-graduation-cap why-icon"></i>
                            <h3>Address the Crisis</h3>
                            <p>Help bridge the gap where only 120 out of 1,000 Grade 1 students eventually graduate college.</p>
                        </div>
                        <div className="why-card">
                            <i className="fa-solid fa-chalkboard-user why-icon"></i>
                            <h3>Holistic Training</h3>
                            <p>We don't just give funds; we teach leadership, financial literacy, arts, and critical thinking.</p>
                        </div>
                        <div className="why-card">
                            <i className="fa-solid fa-hand-holding-heart why-icon"></i>
                            <h3>Direct Impact</h3>
                            <p>Your support goes directly to the "Baon" (₱2,000/mo) and training of selected scholars.</p>
                        </div>
                        <div className="why-card">
                            <i className="fa-solid fa-users-rays why-icon"></i>
                            <h3>Mentorship</h3>
                            <p>Share your time, experience, and moral support to guide the next generation of leaders.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Sponsorship Benefits */}
            <section className="section-padding benefits-section">
                <div className="container">
                    <h2 className="section-title">What Your Sponsorship Provides</h2>
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <i className="fa-solid fa-circle-check check-icon"></i>
                            <div>
                                <h4>Financial Aid ("Baon")</h4>
                                <p>₱2,000 monthly support for a student's educational needs.</p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <i className="fa-solid fa-circle-check check-icon"></i>
                            <div>
                                <h4>Leadership Development</h4>
                                <p>Sessions on management, values, and critical thinking.</p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <i className="fa-solid fa-circle-check check-icon"></i>
                            <div>
                                <h4>Cultural & Arts Exposure</h4>
                                <p>Broadening horizons through appreciation of arts and culture.</p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <i className="fa-solid fa-circle-check check-icon"></i>
                            <div>
                                <h4>Values Formation</h4>
                                <p>Instilling discipline, integrity, and love for country.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Packages */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title">Scholarship Packages</h2>
                    <div className="packages-grid">
                        {/* 1 Year */}
                        <div className="package-card">
                            <span className="package-name bronze">Annual Benefactor</span>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0', color: '#1e293b' }}>₱20,000</div>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Supports 1 Student for 1 Year</p>
                            <ul className="package-features">
                                <li><i className="fa-solid fa-check"></i> Monthly "Baon" distribution</li>
                                <li><i className="fa-solid fa-check"></i> Updates on scholar progress</li>
                                <li><i className="fa-solid fa-check"></i> Invitation to training sessions</li>
                            </ul>
                        </div>

                        {/* 2 Years */}
                        <div className="package-card highlight">
                            <div style={{ position: 'absolute', top: 0, right: 0, background: '#2563eb', color: 'white', padding: '0.5rem 1rem', fontSize: '0.8rem', borderBottomLeftRadius: '10px' }}>MOST IMPACTFUL</div>
                            <span className="package-name gold">Full Term Benefactor</span>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0', color: '#1e293b' }}>₱40,000</div>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Supports 1 Student for 2 Years</p>
                            <ul className="package-features">
                                <li><i className="fa-solid fa-check"></i> Sustained 2-year support</li>
                                <li><i className="fa-solid fa-check"></i> Direct mentorship opportunities</li>
                                <li><i className="fa-solid fa-check"></i> Recognition as Key Partner</li>
                                <li><i className="fa-solid fa-check"></i> Full progress reporting</li>
                            </ul>
                        </div>

                        {/* Mentorship */}
                        <div className="package-card">
                            <span className="package-name silver">Mentorship Partner</span>
                            <div style={{ fontSize: '2rem', fontWeight: '800', margin: '1rem 0', color: '#1e293b' }}>Time & Skill</div>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Invaluable Guidance</p>
                            <ul className="package-features">
                                <li><i className="fa-solid fa-check"></i> Conduct learning sessions</li>
                                <li><i className="fa-solid fa-check"></i> Share industry expertise</li>
                                <li><i className="fa-solid fa-check"></i> Provide moral support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Process Flow */}
            <section className="section-padding benefits-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="process-steps">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Submit Inquiry</h3>
                            <p>Fill out the form below to express your interest.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Team Review</h3>
                            <p>Our team will review your details and contact you.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Partnership</h3>
                            <p>We finalize the agreement and launch the partnership.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h3>Go Live</h3>
                            <p>Your sponsorship goes live, impacting students immediately.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Inquiry Form */}
            <section id="inquiry-form" className="section-padding form-section">
                <div className="container">
                    <h2 className="section-title">Partner With Us</h2>
                    <div className="sponsor-form-card">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label>Organization Name</label>
                                <input type="text" className="form-control" placeholder="Company or Organization" required />
                            </div>
                            <div className="form-group">
                                <label>Contact Person</label>
                                <input type="text" className="form-control" placeholder="Full Name" required />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="form-control" placeholder="email@example.com" required />
                            </div>
                            <div className="form-group">
                                <label>Sponsorship Interest</label>
                                <select className="form-control">
                                    <option>General Sponsorship</option>
                                    <option>Bronze Tier</option>
                                    <option>Silver Tier</option>
                                    <option>Gold Tier</option>
                                    <option>Other / Custom</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea className="form-control" rows="4" placeholder="How would you like to partner with us?"></textarea>
                            </div>
                            <button type="submit" className="submit-btn">Submit Sponsorship Request</button>
                            <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
                                We will contact you within 2–3 business days.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* 7. Social Proof */}
            <section className="section-padding">
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: '500' }}>
                        TRUSTED BY STUDENT ORGANIZATIONS AND EDUCATIONAL PARTNERS
                    </p>
                    {/* Placeholder for logos - text used for now to keep it clean without assets */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', opacity: 0.6 }}>
                        <h3>Global Scholars</h3>
                        <h3>EduFuture</h3>
                        <h3>Student Alliance</h3>
                    </div>
                </div>
            </section>

            {/* 8. FAQ */}
            <section className="section-padding benefits-section">
                <div className="container">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-container">
                        {[
                            { q: "Do you handle scholarship applications?", a: "No, we strictly provide guidance and connect students to official sources. We do not process applications ourselves." },
                            { q: "Is sponsorship refundable?", a: "Sponsorship contributions are generally non-refundable as they are allocated to our operational and charitable activities immediately." },
                            { q: "How long does sponsorship last?", a: "Standard packages run for 12 months, but we can discuss shorter campaigns or multi-year partnerships." },
                            { q: "Can we customize packages?", a: "Absolutely! Select 'Other / Custom' in the form, and we can tailor a package to your needs." }
                        ].map((item, index) => (
                            <div key={index} className="faq-item">
                                <button className="faq-question" onClick={() => toggleFaq(index)}>
                                    {item.q}
                                    <i className={`fa-solid fa-chevron-${openFaq === index ? 'up' : 'down'}`}></i>
                                </button>
                                {openFaq === index && <div className="faq-answer">{item.a}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Final CTA */}
            <section className="final-cta">
                <div className="container">
                    <h2>Ready to make an impact?</h2>
                    <button className="hero-cta-btn" onClick={scrollToForm} style={{ background: 'white', color: '#1e293b' }}>
                        Become a Sponsor Today
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Sponsorship;
