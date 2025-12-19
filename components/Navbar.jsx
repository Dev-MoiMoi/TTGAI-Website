import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/5.jpg';
import '../styles/navStyle.css';

const Navbar = () => {
    return (
        <nav>
            <img src={logo} className="logo" alt="Team Twilight Golfers Association Inc. logo" />
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/team">TEAM</Link></li>
                <li><Link to="/operations">OPERATION</Link></li>
                <li><Link to="/linkages">LINKAGES</Link></li>
                <li id="team"><Link to="/sponsorship"><button>BE A SPONSOR</button></Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
