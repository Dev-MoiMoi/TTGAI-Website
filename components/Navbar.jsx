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
                <li><a href="#operation">OPERATION</a></li>
                <li><a href="#sponsors">LINKAGES</a></li>
                <li id="team"><button>BE A SPONSOR</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
