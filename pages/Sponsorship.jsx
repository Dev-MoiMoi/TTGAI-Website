import React, { useState } from 'react';
import '../styles/sponsorship.css';
import golfBg from '../assets/4.jpg';
import { useSiteImages } from '../lib/siteImages';

const packages = [
    {
        id: 'annual-benefactor',
        title: 'Annual Benefactor',
        price: '₱25k',
        priceRaw: '₱25,000',
        subtitle: 'Supports 1 Student for 1 Year',
        tier: 'entry',
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
        price: '₱50k',
        priceRaw: '₱50,000',
        subtitle: 'Supports 1 Student for 2 Years',
        tier: 'popular',
        highlight: true,
        badge: 'MOST POPULAR',
        features: [
            'Sustained 2-year support',
            'Direct mentorship opportunities',
            'Recognition as Key Partner',
            'Full progress reporting',
        ],
    },
    {
        id: 'major-benefactor',
        title: 'Major Benefactor',
        price: '₱150k',
        priceRaw: '₱150,000',
        subtitle: 'Supports Multiple Students',
        tier: 'major',
        highlight: false,
        badge: 'HIGH IMPACT',
        features: [
            'Support multiple scholars',
            'Dedicated program liaison',
            'Co-branded PKI recognition',
            'Quarterly impact reports',
        ],
    },
    {
        id: 'platinum-benefactor',
        title: 'Platinum Benefactor',
        price: '₱500k',
        priceRaw: '₱500,000+',
        subtitle: 'Premier Scholarship Partner',
        tier: 'platinum',
        highlight: false,
        badge: null,
        features: [
            'Endow entire scholar batch',
            'Name a scholarship track',
            'Executive mentor role',
            'Full annual impact gala seat',
        ],
    },
];

const Sponsorship = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // --- Donation Calculator State ---
    const PRESET_TIERS = [5000, 10000, 25000];
    const [calcTier, setCalcTier] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [numScholars, setNumScholars] = useState(1);
    const [numYears, setNumYears] = useState(1);

    const isInKind = calcTier === 'in-kind';
    const activeAmount = isInKind ? 0 : (calcTier || 0);
    const totalCommitment = activeAmount * numScholars * numYears;

    const formatPeso = (num) =>
        '₱' + num.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const handleProceedCalc = (e) => {
        if (e) e.preventDefault();
        if (activeAmount === 0 && !isInKind) return;
        setSelectedPackage('custom');
        setTimeout(() => {
            document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    // Form state
    const [formData, setFormData] = useState({ organization: '', contactPerson: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const siteImages = useSiteImages();
    const heroBg = siteImages.sponsorship_hero || golfBg;

    const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

    const scrollToForm = () => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg.id === selectedPackage ? null : pkg.id);
        setTimeout(() => {
            document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedPkg = getSelectedPkg();
        console.log('Sponsorship Request Submitted:', {
            ...formData,
            selectedPackageId: selectedPackage || 'none',
            selectedPackageTitle: selectedPkg ? selectedPkg.title : 'General Sponsorship',
            selectedPackagePrice: selectedPkg ? selectedPkg.priceRaw : 'N/A',
        });
        setSubmitted(true);
    };

    const getSelectedPkg = () => {
        if (selectedPackage === 'custom') {
            return {
                id: 'custom',
                title: isInKind
                    ? `In-Kind Donation: ${customAmount || '(Details to follow)'}`
                    : `Custom: ${numScholars} Scholar(s) for ${numYears} Year(s)`,
                priceRaw: isInKind ? 'In-Kind' : `Total: ${formatPeso(totalCommitment)}`,
            };
        }
        return packages.find(p => p.id === selectedPackage);
    };

    return (
        <div className="sponsorship-page">

            {/* 1. Hero */}
            <section className="sp-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="sp-hero-overlay" />
                <div className="sp-hero-inner">
                    <span className="sp-hero-badge">Pabaon Kay Iskolar</span>
                    <h1>Empower Dreams<br/>Through <span className="sp-hero-accent">The Game of Golf.</span></h1>
                    <p className="sp-hero-sub">
                        Join Team Twilight in building pathways for the next generation of Filipino golfers. Your sponsorship directly funds scholarships, mentorship, and professional development for deserving students.
                    </p>
                    <div className="sp-hero-btns">
                        <button className="sp-btn-gold" onClick={scrollToForm}>Become a Benefactor</button>
                        <a href="/about" className="sp-btn-outline">Learn More About Us</a>
                    </div>
                </div>
            </section>

            {/* 2. Why Partner */}
            <section className="sp-section">
                <div className="sp-container">
                    <div className="sp-section-hd">
                        <h2>Why Partner with Team Twilight</h2>
                        <p>We are more than a scholarship program — we are a movement to uplift Filipino golf and shape tomorrow's leaders.</p>
                    </div>
                    <div className="sp-why-grid">
                        {[
                            { icon: '🎓', title: 'Real Visibility', desc: 'Help bridge the gap where only 120 out of 1,000 Grade 1 students ever graduate college.' },
                            { icon: '🤝', title: 'Community Impact', desc: 'We don\'t just give funds — we teach leadership, financial literacy, arts, and critical thinking.' },
                            { icon: '💡', title: 'Provable ROI', desc: 'Your support goes directly to the monthly "Baon" (₱2,000/mo) and training of selected scholars.' },
                            { icon: '🌟', title: 'Exclusivity', desc: 'Share your time, experience, and moral support to guide the next generation of leaders in golf and beyond.' },
                        ].map((w, i) => (
                            <div key={i} className="sp-why-card">
                                <span className="sp-why-icon">{w.icon}</span>
                                <h3>{w.title}</h3>
                                <p>{w.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Sponsorship Tiers */}
            <section className="sp-section sp-section--gray">
                <div className="sp-container">
                    <div className="sp-section-hd">
                        <h2>Select Your Sponsorship Tier</h2>
                        <p>Choose the commitment that best aligns with your capacity. Every tier directly changes a student's life.</p>
                    </div>
                    <div className="sp-tiers-grid">
                        {packages.map((pkg) => {
                            const isSelected = selectedPackage === pkg.id;
                            return (
                                <div
                                    key={pkg.id}
                                    id={`package-${pkg.id}`}
                                    className={`sp-tier-card sp-tier-card--${pkg.tier}${pkg.highlight ? ' sp-tier-card--popular' : ''}${isSelected ? ' sp-tier-card--selected' : ''}`}
                                    onClick={() => handlePackageSelect(pkg)}
                                    role="button"
                                    tabIndex={0}
                                    aria-pressed={isSelected}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePackageSelect(pkg)}
                                >
                                    {pkg.badge && <div className="sp-tier-badge">{pkg.badge}</div>}
                                    <div className="sp-tier-price">{pkg.price}</div>
                                    <h3 className="sp-tier-name">{pkg.title}</h3>
                                    <p className="sp-tier-sub">{pkg.subtitle}</p>
                                    <ul className="sp-tier-features">
                                        {pkg.features.map((f, fi) => (
                                            <li key={fi}>
                                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`sp-tier-btn${isSelected ? ' sp-tier-btn--selected' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); handlePackageSelect(pkg); }}
                                    >
                                        {isSelected ? '✓ Selected' : 'Become This Sponsor'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="sp-impact-note">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>Impact: ₱5,000 = 1 scholar supported for 1 semester.</span>
                        <a href="#inquiry-form" onClick={(e) => { e.preventDefault(); scrollToForm(); }} style={{ marginLeft: '8px', color: 'var(--primary-gold)', fontWeight: 700 }}>Build a custom package →</a>
                    </div>
                </div>
            </section>

            {/* 3b. Donation Calculator */}
            <section className="sp-section">
                <div className="sp-container">
                    <div className="sp-section-hd">
                        <h2>Donation Calculator</h2>
                        <p>Choose a preset amount or enter your own — see your impact instantly.</p>
                    </div>
                    <div className="sp-calc-wrap">
                        <div className="sp-calc-tiers">
                            {PRESET_TIERS.map((tier) => (
                                <button
                                    key={tier}
                                    className={`sp-calc-tier-btn${calcTier === tier ? ' active' : ''}`}
                                    onClick={() => setCalcTier(tier)}
                                >
                                    {formatPeso(tier)}
                                </button>
                            ))}
                            <button
                                className={`sp-calc-tier-btn${calcTier === 'in-kind' ? ' active' : ''}`}
                                onClick={() => { setCalcTier('in-kind'); setCustomAmount(''); }}
                            >
                                IN-KIND
                            </button>
                        </div>

                        {calcTier === 'in-kind' && (
                            <div className="sp-calc-custom-wrap">
                                <input
                                    type="text"
                                    className="sp-calc-custom-input"
                                    placeholder="Enter items to donate (e.g. Laptops, Books)"
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="sp-calc-inputs-row">
                            <div className="sp-calc-input-group">
                                <label htmlFor="calc-scholars">Number of scholars to sponsor</label>
                                <input
                                    id="calc-scholars"
                                    type="number"
                                    min="1"
                                    value={numScholars}
                                    onChange={(e) => setNumScholars(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="sp-calc-number-input"
                                />
                            </div>
                            <div className="sp-calc-input-group">
                                <label htmlFor="calc-years">Number of years to commit</label>
                                <input
                                    id="calc-years"
                                    type="number"
                                    min="1"
                                    value={numYears}
                                    onChange={(e) => setNumYears(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="sp-calc-number-input"
                                />
                            </div>
                        </div>

                        <div className="sp-calc-stats">
                            <div className="sp-calc-stat">
                                <span>Per scholar / year</span>
                                <strong>{isInKind ? 'In-Kind' : (activeAmount > 0 ? formatPeso(activeAmount) : '—')}</strong>
                            </div>
                            <div className="sp-calc-stat">
                                <span>Total scholars</span>
                                <strong>{numScholars}</strong>
                            </div>
                            <div className="sp-calc-stat sp-calc-stat--highlight">
                                <span>Total commitment</span>
                                <strong>{isInKind ? 'In-Kind' : (totalCommitment > 0 ? formatPeso(totalCommitment) : '—')}</strong>
                            </div>
                        </div>

                        {(activeAmount > 0 || isInKind) && (
                            <p className="sp-calc-impact">
                                Your sponsorship will support{' '}
                                <strong>{numScholars} scholar{numScholars > 1 ? 's' : ''}</strong>{' '}
                                for{' '}
                                <strong>{numYears} year{numYears > 1 ? 's' : ''}</strong>{' '}
                                — a total commitment of{' '}
                                <strong>{isInKind ? (customAmount || 'In-Kind Items') : formatPeso(totalCommitment)}</strong>.
                            </p>
                        )}

                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <button
                                onClick={handleProceedCalc}
                                className={`sp-btn-gold${(activeAmount === 0 && !isInKind) ? ' sp-btn-disabled' : ''}`}
                                disabled={activeAmount === 0 && !isInKind}
                            >
                                Proceed with Sponsorship
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. How It Works */}
            <section className="sp-section sp-section--gray">
                <div className="sp-container">
                    <div className="sp-section-hd">
                        <h2>How It Works</h2>
                        <p>A simple, transparent process to get you started.</p>
                    </div>
                    <div className="sp-steps">
                        {[
                            { num: '1', label: 'Inquiry', desc: 'Fill out the form below to express your interest in sponsoring a scholar.' },
                            { num: '2', label: 'Agreement', desc: 'Our team reviews your inquiry and reaches out within 2–3 business days.' },
                            { num: '3', label: 'Impact', desc: 'Your sponsorship goes live — scholar receives monthly "Baon" and joins our training program.' },
                        ].map((s, i) => (
                            <div key={i} className="sp-step">
                                <div className="sp-step-circle">{s.num}</div>
                                <h3>{s.label}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Inquiry Form */}
            <section id="inquiry-form" className="sp-section">
                <div className="sp-container sp-container--narrow">
                    <div className="sp-section-hd">
                        <h2>Partner With Us</h2>
                        <p>Fill out the form and our team will be in touch.</p>
                    </div>

                    {selectedPackage && (
                        <div className="sp-selected-banner">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                            <span>Selected: <strong>{getSelectedPkg()?.title}</strong> — {getSelectedPkg()?.priceRaw}</span>
                            <button className="sp-clear-btn" onClick={() => setSelectedPackage(null)}>✕ Change</button>
                        </div>
                    )}

                    <div className="sp-form-card">
                        {submitted ? (
                            <div className="sp-form-success">
                                <div className="sp-success-icon">✓</div>
                                <h3>Thank You for Your Interest!</h3>
                                <p>We received your inquiry{getSelectedPkg() ? ` for the ${getSelectedPkg().title} package` : ''}. Our team will contact you within 2–3 business days.</p>
                                <button
                                    className="sp-btn-gold"
                                    style={{ width: 'auto', padding: '0.75rem 2.5rem', marginTop: '1rem' }}
                                    onClick={() => { setSubmitted(false); setSelectedPackage(null); setFormData({ organization: '', contactPerson: '', email: '', message: '' }); }}
                                >
                                    Submit Another Inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="sp-form-group">
                                    <label htmlFor="organization">Organization Name</label>
                                    <input id="organization" name="organization" type="text" className="sp-form-input" placeholder="Company or Organization" value={formData.organization} onChange={handleInputChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label htmlFor="contactPerson">Contact Person</label>
                                    <input id="contactPerson" name="contactPerson" type="text" className="sp-form-input" placeholder="Full Name" value={formData.contactPerson} onChange={handleInputChange} required />
                                </div>
                                <div className="sp-form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input id="email" name="email" type="email" className="sp-form-input" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <input type="hidden" name="selectedPackageId" value={selectedPackage || 'general'} />
                                <div className="sp-form-group">
                                    <label>Selected Package</label>
                                    <div className={`sp-form-pkg-display${!selectedPackage ? ' empty' : ''}`}>
                                        {selectedPackage ? (
                                            <>
                                                <svg width="14" height="14" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                                <strong>{getSelectedPkg()?.title}</strong>
                                                <span style={{ color: '#64748b', marginLeft: '8px' }}>— {getSelectedPkg()?.priceRaw}</span>
                                            </>
                                        ) : (
                                            <span style={{ color: '#94a3b8' }}>No package selected — choose one above or we'll discuss options with you.</span>
                                        )}
                                    </div>
                                </div>
                                <div className="sp-form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" className="sp-form-input" rows="4" placeholder="How would you like to partner with us?" value={formData.message} onChange={handleInputChange}></textarea>
                                </div>
                                <button type="submit" className="sp-btn-gold" style={{ width: '100%' }}>
                                    {selectedPackage ? `Submit Request — ${getSelectedPkg()?.title}` : 'Submit Sponsorship Request'}
                                </button>
                                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.82rem', color: '#94a3b8' }}>
                                    We will contact you within 2–3 business days.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* 6. Our Valued Partners logos strip */}
            <section className="sp-section sp-section--navy">
                <div className="sp-container">
                    <p className="sp-partners-label">Our Valued Partners</p>
                    <div className="sp-partners-strip">
                        {['GMV Corporation', 'FASTECH', 'Buscowitz Energy', 'SEIPI', 'Pamantasan ng Cabuyao'].map((p, i) => (
                            <span key={i} className="sp-partner-pill">{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FAQ */}
            <section className="sp-section">
                <div className="sp-container sp-container--narrow">
                    <div className="sp-faq-layout">
                        <div className="sp-faq-left">
                            <span className="sp-faq-eyebrow">Common Questions</span>
                            <h2>Got questions?<br/>We have answers.</h2>
                            <p>Do you have any other questions?<br/>Feel free to <a href="mailto:ttgasinc@gmail.com">contact us</a>.</p>
                        </div>
                        <div className="sp-faq-right">
                            {[
                                { q: "Do you handle scholarship applications?", a: "No, we strictly provide guidance and connect students to official sources. We do not process applications ourselves." },
                                { q: "Is sponsorship refundable?", a: "Sponsorship contributions are generally non-refundable as they are allocated to our operational and charitable activities immediately." },
                                { q: "How long does sponsorship last?", a: "Standard packages run for 12 months, but we can discuss shorter campaigns or multi-year partnerships." },
                                { q: "Can we customize packages?", a: "Absolutely! Contact us through the form above and we can tailor a package to your needs." },
                            ].map((item, index) => (
                                <div key={index} className="sp-faq-item">
                                    <button className="sp-faq-q" onClick={() => toggleFaq(index)}>
                                        <span>{item.q}</span>
                                        <svg className={`sp-faq-chevron${openFaq === index ? ' open' : ''}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                                    </button>
                                    {openFaq === index && <div className="sp-faq-a">{item.a}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Final CTA */}
            <section className="sp-final-cta">
                <div className="sp-final-cta-inner">
                    <div className="sp-final-cta-icon">
                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
                    </div>
                    <h2>Let's build a legacy together.</h2>
                    <p>Ready to become a TTGAI Benefactor? Fill out the sponsorship form and let's create a lasting impact in these scholarships.</p>
                    <div className="sp-final-cta-btns">
                        <button className="sp-btn-gold" onClick={scrollToForm}>Become a Benefactor</button>
                        <a href="mailto:ttgasinc@gmail.com" className="sp-btn-outline-light">Get in Touch</a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Sponsorship;
