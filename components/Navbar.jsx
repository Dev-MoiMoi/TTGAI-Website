import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/5.jpg';
import '../styles/navStyle.css';

const NAV_LINKS = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT' },
    { to: '/history', label: 'HISTORY' },
    { to: '/team', label: 'TEAM' },
    { to: '/operations', label: 'OPERATIONS' },
    { to: '/linkages', label: 'LINKAGES' },
    { to: '/newsletter', label: 'NEWSLETTER' },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const toggleRef = useRef(null);
    const closeRef = useRef(null);
    const wasOpen = useRef(false);

    const closeMenu = () => setOpen(false);
    const toggleMenu = () => setOpen((o) => !o);

    /* Close on route change */
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    /* Lock body scroll while the drawer is open */
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    /* Move focus into the drawer on open, back to the toggle on close */
    useEffect(() => {
        if (open && !wasOpen.current) {
            closeRef.current?.focus();
        } else if (!open && wasOpen.current) {
            toggleRef.current?.focus();
        }
        wasOpen.current = open;
    }, [open]);

    /* Escape closes the drawer */
    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    /* Keep Tab focus inside the drawer */
    const trapFocus = (e) => {
        if (e.key !== 'Tab') return;
        const focusables = e.currentTarget.querySelectorAll('a, button:not([disabled])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

    return (
        <nav className="navbar" aria-label="Primary">
            <Link to="/" className="nav-brand" onClick={closeMenu} aria-label="Home">
                <img src={logo} className="logo" alt="Team Twilight Golfers Association Inc. logo" />
            </Link>

            {/* Desktop links */}
            <ul className="nav-links">
                {NAV_LINKS.map(({ to, label }) => (
                    <li key={to}>
                        <Link
                            to={to}
                            className={isActive(to) ? 'nav-active' : ''}
                            aria-current={isActive(to) ? 'page' : undefined}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
                <li className="nav-sponsor">
                    <Link
                        to="/sponsorship"
                        className={isActive('/sponsorship') ? 'nav-active sponsor' : 'sponsor'}
                        aria-current={isActive('/sponsorship') ? 'page' : undefined}
                    >
                        Be a Sponsor
                    </Link>
                </li>
            </ul>

            {/* Mobile hamburger */}
            <button
                type="button"
                ref={toggleRef}
                className={`menu-icon${open ? ' open' : ''}`}
                onClick={toggleMenu}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="nav-menu"
            >
                <span className="top"></span>
                <span className="mid"></span>
                <span className="bot"></span>
            </button>

            {/* Backdrop (click outside to dismiss) */}
            <div className={`nav-backdrop${open ? ' show' : ''}`} onClick={closeMenu} aria-hidden="true" />

            {/* Mobile drawer */}
            <aside
                id="nav-menu"
                className={`nav-drawer${open ? ' open' : ''}`}
                aria-label="Mobile navigation"
                aria-hidden={!open}
                onKeyDown={trapFocus}
            >
                <div className="nav-drawer-head">
                    <span className="nav-drawer-brand">Menu</span>
                    <button
                        ref={closeRef}
                        type="button"
                        className="nav-drawer-close"
                        onClick={closeMenu}
                        aria-label="Close menu"
                        tabIndex={open ? 0 : -1}
                    >
                        ✕
                    </button>
                </div>
                <ul className="nav-drawer-links">
                    {NAV_LINKS.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={isActive(to) ? 'nav-active' : ''}
                                aria-current={isActive(to) ? 'page' : undefined}
                                onClick={closeMenu}
                                tabIndex={open ? 0 : -1}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    to="/sponsorship"
                    className="nav-drawer-cta"
                    onClick={closeMenu}
                    tabIndex={open ? 0 : -1}
                >
                    Be a Sponsor
                </Link>
            </aside>
        </nav>
    );
};

export default Navbar;
