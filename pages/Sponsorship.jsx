import React, { useState } from 'react';
import '../styles/sponsorship.css';

const packages = [
    {
        id: 'annual-benefactor',
        title: 'Annual Benefactor',
        price: '₱20,000',
        subtitle: 'Supports 1 Student for 1 Year',
        tier: 'bronze',
        highlight: false,
        badge: null,
        features: [
            'Monthly "Baon" distribution',
            'Updates on scholar progress',
            'Invitation to training sessions',
        ],
    },
    {
        id: 'full-term-benefactor',
        title: 'Full Term Benefactor',
        price: '₱40,000',
        subtitle: 'Supports 1 Student for 2 Years',
        tier: 'gold',
        highlight: true,
        badge: 'MOST IMPACTFUL',
        features: [
            'Sustained 2-year support',
            'Direct mentorship opportunities',
            'Recognition as Key Partner',
            'Full progress reporting',
        ],
    },
    {
        id: 'mentorship-partner',
        title: 'Mentorship Partner',
        price: 'Time & Skill',
        subtitle: 'Invaluable Guidance',
        tier: 'silver',
        highlight: false,
        badge: null,
        features: [
            'Conduct learning sessions',
            'Share industry expertise',
            'Provide moral support',
        ],
    },
];

const Sponsorship = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        organization: '',
        contactPerson: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const scrollToForm = () => {
        const formElement = document.getElementById('inquiry-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg.id === selectedPackage ? null : pkg.id);
        // Scroll to form after a short delay for UX
        setTimeout(() => {
            const formElement = document.getElementById('inquiry-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedPkg = packages.find(p => p.id === selectedPackage);
        const submissionData = {
            ...formData,
            selectedPackageId: selectedPackage || 'none',
            selectedPackageTitle: selectedPkg ? selectedPkg.title : 'General Sponsorship',
            selectedPackagePrice: selectedPkg ? selectedPkg.price : 'N/A',
        };
        console.log('Sponsorship Request Submitted:', submissionData);
        setSubmitted(true);
    };

    const getSelectedPkg = () => packages.find(p => p.id === selectedPackage);

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

            {/* 4. Packages — Selectable */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="section-title">Scholarship Packages</h2>
                    <p className="packages-hint">
                        <i className="fa-solid fa-hand-pointer"></i> Click a package to select it — your choice will be included in your inquiry.
                    </p>
                    <div className="packages-grid">
                        {packages.map((pkg) => {
                            const isSelected = selectedPackage === pkg.id;
                            return (
                                <div
                                    key={pkg.id}
                                    id={`package-${pkg.id}`}
                                    className={`package-card${pkg.highlight ? ' highlight' : ''}${isSelected ? ' selected' : ''}`}
                                    onClick={() => handlePackageSelect(pkg)}
                                    role="button"
                                    tabIndex={0}
                                    aria-pressed={isSelected}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePackageSelect(pkg)}
                                >
                                    {pkg.badge && (
                                        <div className="package-badge">{pkg.badge}</div>
                                    )}
                                    {isSelected && (
                                        <div className="package-selected-indicator">
                                            <i className="fa-solid fa-circle-check"></i> Selected
                                        </div>
                                    )}
                                    <span className={`package-name ${pkg.tier}`}>{pkg.title}</span>
                                    <div className="package-price">{pkg.price}</div>
                                    <p className="package-subtitle">{pkg.subtitle}</p>
                                    <ul className="package-features">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i}>
                                                <i className="fa-solid fa-check"></i>{feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`package-select-btn${isSelected ? ' active' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); handlePackageSelect(pkg); }}
                                    >
                                        {isSelected ? '✓ Package Selected' : 'Select This Package'}
                                    </button>
                                </div>
                            );
                        })}
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
                            <h3>Select a Package</h3>
                            <p>Choose the sponsorship tier that fits your capacity above.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Submit Inquiry</h3>
                            <p>Fill out the form below to express your interest.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Team Review</h3>
                            <p>Our team will review your details and contact you.</p>
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

                    {/* Selected Package Banner */}
                    {selectedPackage && (
                        <div className="selected-package-banner">
                            <i className="fa-solid fa-circle-check"></i>
                            <span>
                                You've selected: <strong>{getSelectedPkg()?.title}</strong> — {getSelectedPkg()?.price}
                            </span>
                            <button
                                className="clear-selection-btn"
                                onClick={() => setSelectedPackage(null)}
                                title="Clear selection"
                            >
                                ✕ Change
                            </button>
                        </div>
                    )}

                    <div className="sponsor-form-card">
                        {submitted ? (
                            <div className="form-success">
                                <i className="fa-solid fa-circle-check success-icon"></i>
                                <h3>Thank You for Your Interest!</h3>
                                <p>
                                    We received your inquiry
                                    {getSelectedPkg() ? ` for the <strong>${getSelectedPkg().title}</strong> package` : ''}.
                                    Our team will contact you within 2–3 business days.
                                </p>
                                <button
                                    className="submit-btn"
                                    style={{ marginTop: '1.5rem', maxWidth: '300px' }}
                                    onClick={() => { setSubmitted(false); setSelectedPackage(null); setFormData({ organization: '', contactPerson: '', email: '', message: '' }); }}
                                >
                                    Submit Another Inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="organization">Organization Name</label>
                                    <input
                                        id="organization"
                                        name="organization"
                                        type="text"
                                        className="form-control"
                                        placeholder="Company or Organization"
                                        value={formData.organization}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactPerson">Contact Person</label>
                                    <input
                                        id="contactPerson"
                                        name="contactPerson"
                                        type="text"
                                        className="form-control"
                                        placeholder="Full Name"
                                        value={formData.contactPerson}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Hidden: Selected Package (auto-bundled) */}
                                <input type="hidden" name="selectedPackageId" value={selectedPackage || 'general'} />
                                <input type="hidden" name="selectedPackageTitle" value={getSelectedPkg()?.title || 'General Sponsorship'} />

                                {/* Package Summary in Form */}
                                <div className="form-group">
                                    <label>Selected Package</label>
                                    <div className={`form-package-display${!selectedPackage ? ' empty' : ''}`}>
                                        {selectedPackage ? (
                                            <>
                                                <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginRight: '8px' }}></i>
                                                <strong>{getSelectedPkg()?.title}</strong>
                                                <span style={{ color: '#64748b', marginLeft: '8px' }}>— {getSelectedPkg()?.price}</span>
                                            </>
                                        ) : (
                                            <span style={{ color: '#94a3b8' }}>
                                                No package selected — <a href="#package-annual-benefactor" onClick={(e) => { e.preventDefault(); document.getElementById('package-annual-benefactor')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: '#2563eb' }}>choose one above</a> or we'll discuss options with you.
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-control"
                                        rows="4"
                                        placeholder="How would you like to partner with us?"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn">
                                    {selectedPackage
                                        ? `Submit Sponsor Request — ${getSelectedPkg()?.title}`
                                        : 'Submit Sponsorship Request'}
                                </button>
                                <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
                                    We will contact you within 2–3 business days.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* 7. Social Proof */}
            <section className="section-padding">
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: '500' }}>
                        TRUSTED BY STUDENT ORGANIZATIONS AND EDUCATIONAL PARTNERS
                    </p>
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
                            { q: "Can we customize packages?", a: "Absolutely! Contact us through the form above and we can tailor a package to your needs." }
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
