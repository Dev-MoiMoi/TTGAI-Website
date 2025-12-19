import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/linkages.css';

const Linkages = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Educational Institutions', 'Student Organizations', 'Corporate Partners', 'Community Groups'];

    const partners = [
        {
            name: "Global Scholars Initiative",
            category: "Educational Institutions",
            description: "Partnered to provide international exchange opportunities.",
            status: "Strategic Partner",
            icon: "fa-university"
        },
        {
            name: "Future Leaders Alliance",
            category: "Student Organizations",
            description: "Collaborating on leadership workshops and seminars.",
            status: "Active Collaborator",
            icon: "fa-users"
        },
        {
            name: "Tech Solutions Inc.",
            category: "Corporate Partners",
            description: "Sponsoring STEM scholarships for underprivileged youth.",
            status: "Corporate Sponsor",
            icon: "fa-building"
        },
        {
            name: "City Youth Foundation",
            category: "Community Groups",
            description: "Joint community outreach programs in local barangays.",
            status: "Community Partner",
            icon: "fa-hand-holding-heart"
        },
        {
            name: "Green Earth Coalition",
            category: "Community Groups",
            description: "Prospective partner for environmental scholarships.",
            status: "In Discussion",
            icon: "fa-leaf"
        },
        {
            name: "University of the Arts",
            category: "Educational Institutions",
            description: "Curriculum alignment and arts scholarship support.",
            status: "Academic Partner",
            icon: "fa-graduation-cap"
        }
    ];

    const filteredPartners = activeCategory === 'All'
        ? partners
        : partners.filter(p => p.category === activeCategory);

    return (
        <div className="linkages-page">
            {/* 1. Hero Section */}
            <section className="linkages-hero">
                <div className="linkage-container">
                    <h1>Our Linkages & Partnerships</h1>
                    <p>Building strong connections to expand access to scholarship opportunities and empower the next generation.</p>
                </div>
            </section>

            {/* 2 & 3. Partner Categories & Grid */}
            <section className="linkage-section">
                <div className="linkage-container">
                    <div className="section-header">
                        <h2>Our Network</h2>
                        <p>We work with credible organizations to deliver the best for our students.</p>
                    </div>

                    <div className="category-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="partners-grid">
                        {filteredPartners.map((partner, index) => (
                            <div key={index} className="partner-card">
                                <div className="partner-logo-placeholder">
                                    <i className={`fa-solid ${partner.icon}`}></i>
                                </div>
                                <span className="partner-tag">{partner.status}</span>
                                <h3>{partner.name}</h3>
                                <p>{partner.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Collaboration Types */}
            <section className="linkage-section" style={{ background: 'white' }}>
                <div className="linkage-container">
                    <div className="section-header">
                        <h2>How We Collaborate</h2>
                        <p>Our partnerships are built on shared values and concrete actions.</p>
                    </div>

                    <div className="collab-types-grid">
                        <div className="collab-card">
                            <div className="collab-icon">
                                <i className="fa-solid fa-bullhorn"></i>
                            </div>
                            <div>
                                <h3>Information Sharing</h3>
                                <p>We cross-post verified scholarship details to ensure students get accurate and timely information.</p>
                            </div>
                        </div>
                        <div className="collab-card">
                            <div className="collab-icon">
                                <i className="fa-solid fa-calendar-check"></i>
                            </div>
                            <div>
                                <h3>Event Collaboration</h3>
                                <p>Jointly organizing career fairs, educational webinars, and scholarship guidance sessions.</p>
                            </div>
                        </div>
                        <div className="collab-card">
                            <div className="collab-icon">
                                <i className="fa-solid fa-people-carry-box"></i>
                            </div>
                            <div>
                                <h3>Student Outreach</h3>
                                <p>Reaching deep into communities to find and support deserving students who need financial aid.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Why Linkages Matter */}
            <section className="linkage-section impact-section">
                <div className="linkage-container">
                    <div className="section-header">
                        <h2 style={{ color: 'white' }}>Why Linkages Matter</h2>
                        <p style={{ color: '#94a3b8' }}>Creating a supportive ecosystem for student success.</p>
                    </div>

                    <div className="impact-grid">
                        <div className="impact-item">
                            <i className="fa-solid fa-globe impact-icon"></i>
                            <h3>Wider Reach</h3>
                            <p>Connecting more students to opportunities they wouldn't find otherwise.</p>
                        </div>
                        <div className="impact-item">
                            <i className="fa-solid fa-check-double impact-icon"></i>
                            <h3>Verified Trust</h3>
                            <p>Ensuring all scholarship information comes from credible and legitimate sources.</p>
                        </div>
                        <div className="impact-item">
                            <i className="fa-solid fa-hand-holding-hand impact-icon"></i>
                            <h3>Strong Support</h3>
                            <p>Gathering academic and industry backing to provide holistic support to scholars.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Become a Partner CTA */}
            <section className="linkage-cta">
                <div className="linkage-container">
                    <div className="cta-box">
                        <h2>Interested in partnering with us?</h2>
                        <p style={{ marginTop: '1rem', color: '#64748b' }}>
                            Join our network of educational leaders and change-makers. Let's build something impactful together.
                        </p>
                        <Link to="/sponsorship" className="btn-partner">
                            Become a Partner
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Linkages;
