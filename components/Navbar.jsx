import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/5.jpg';
import '../styles/navStyle.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <nav>
            <Link to="/" onClick={closeMobileMenu}>
                <img src={logo} className="logo" alt="Team Twilight Golfers Association Inc. logo" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                {click ? (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
            </div>
            <ul className={click ? 'active' : ''}>
                <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
                <li><Link to="/about" onClick={closeMobileMenu}>ABOUT</Link></li>
                <li><Link to="/team" onClick={closeMobileMenu}>TEAM</Link></li>
                <li><Link to="/operations" onClick={closeMobileMenu}>OPERATIONS</Link></li>
                <li><Link to="/linkages" onClick={closeMobileMenu}>LINKAGES</Link></li>
                <li id="team"><Link to="/sponsorship" onClick={closeMobileMenu}><button>BE A SPONSOR</button></Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
