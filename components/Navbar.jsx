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
            <label className="menu-icon" htmlFor="check">
                <input
                    id="check"
                    type="checkbox"
                    checked={click}
                    onChange={handleClick}
                />
                <span className="top"></span>
                <span className="mid"></span>
                <span className="bot"></span>
            </label>
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
