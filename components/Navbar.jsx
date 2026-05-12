import React, { useState } from 'react';
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
    const [click, setClick] = useState(false);
    const location = useLocation();
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav>
            <Link to="/" onClick={closeMobileMenu}>
                <img src={logo} className="logo" alt="Team Twilight Golfers Association Inc. logo" />
            </Link>
            <label
                className="menu-icon"
                htmlFor="check"
                tabIndex="0"
                aria-label="Toggle mobile menu"
                aria-expanded={click}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleClick();
                    }
                }}
            >
                <input
                    id="check"
                    type="checkbox"
                    checked={click}
                    onChange={handleClick}
                    tabIndex="-1"
                />
                <span className="top"></span>
                <span className="mid"></span>
                <span className="bot"></span>
            </label>
            <ul className={click ? 'active' : ''}>
                {NAV_LINKS.map(({ to, label }) => (
                    <li key={to}>
                        <Link
                            to={to}
                            className={isActive(to) ? 'nav-active' : ''}
                            onClick={closeMobileMenu}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
                <li id="team">
                    <Link
                        to="/sponsorship"
                        className={isActive('/sponsorship') ? 'nav-active' : ''}
                        onClick={closeMobileMenu}
                    >
                        <button>BE A SPONSOR</button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
