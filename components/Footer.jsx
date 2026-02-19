import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [subEmail, setSubEmail] = useState('');

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const subject = encodeURIComponent('Newsletter Subscription - New Upload Notifications');
        const body = encodeURIComponent(
            `Newsletter Subscription Request\n\n` +
            `Subscriber Email: ${email}\n\n` +
            `This person has subscribed to receive email notifications every time a new update or upload is posted by Team Twilight Golfers Association Inc.\n\n` +
            `Please add them to your newsletter mailing list.`
        );
        window.location.href = `mailto:ttgasinc@gmail.com?subject=${subject}&body=${body}`;
        setSubEmail(email);
        setSubscribed(true);
        e.target.reset();
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

                        {subscribed ? (
                            <div className="subscribe-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4.5-4.5 1.41-1.41L10 13.67l7.09-7.09 1.41 1.41L10 16.5z" />
                                </svg>
                                <span>You're subscribed! Check your email to confirm.</span>
                            </div>
                        ) : (
                            <form className="subscribe-form" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    required
                                    className="footer-input"
                                />
                                <button type="submit" className="footer-btn">
                                    Subscribe to Updates
                                </button>
                            </form>
                        )}
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

                        <div className="social-links">
                            <a href="https://www.facebook.com/TTGAI" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.966-.14-3.031 0-5.025 1.827-5.025 5.039v2.961H7v4h2.525V24h4.475V13.5z" />
                                </svg>
                            </a>
                            <a href="#" className="social-icon" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                </svg>
                            </a>
                            <a href="#" className="social-icon" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
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

                    <div className="copyright">
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
