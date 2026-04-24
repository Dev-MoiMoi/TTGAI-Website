import React from 'react';
import { Link } from 'react-router-dom';
import SubscribeForm from './SubscribeForm';
import '../styles/footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Column 1: Newsletter */}
                    <div className="footer-col subscribe-col">
                        <h3 className="footer-heading">Newsletter</h3>
                        <p className="footer-value-prop">
                            Be the first to know about every new upload and announcement.
                            <br />Subscribe and we'll send updates straight to your inbox — no spam, ever.
                        </p>
                        <SubscribeForm variant="footer" />
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col links-col">
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
                            <li><Link to="/about" onClick={scrollToTop}>About Us</Link></li>
                            <li><Link to="/team" onClick={scrollToTop}>Our Team</Link></li>
                            <li><Link to="/operations" onClick={scrollToTop}>Operations</Link></li>
                            <li><a href="#sponsors">Linkages & Sponsors</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Us */}
                    <div className="footer-col contact-col">
                        <h3 className="footer-heading">Contact Us</h3>
                        <div className="contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                            <span>ttgasinc@gmail.com</span>
                        </div>
                        <div className="contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1.01A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                            </svg>
                            <span>+63-9175645263</span>
                        </div>

                        <div className="social-links" style={{ flexDirection: 'column', gap: '8px' }}>
                            <a href="https://www.facebook.com/TTGAI" target="_blank" rel="noopener noreferrer" className="contact-item" style={{ textDecoration: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.966-.14-3.031 0-5.025 1.827-5.025 5.039v2.961H7v4h2.525V24h4.475V13.5z" />
                                </svg>
                                <span>Team Twilight Golfers Association, Inc.</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="trust-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="trust-icon">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                        </svg>
                        <span>Information sourced from official scholarship providers. We do not process applications.</span>
                    </div>

                    <div className="copyright" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: 'var(--primary-gold)', fontSize: '1rem' }}>
                            Pabaon Kay Iskolar — Empowering Filipino scholars, one golfer at a time.
                        </p>
                        &copy; 2025 Team Twilight Golfers Association Inc.
                    </div>

                    <button className="back-to-top" onClick={scrollToTop} aria-label="Back to Top">
                        <i className="fa-solid fa-arrow-up" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
