import React from 'react';
import '../styles/global.css';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <img src={img4} alt="Team Twilight Golfers" className="hero-image" />
                <div className="hero-content">
                    <h1>Team Twilight Golfers Association, Incorporated</h1>
                    <p>
                        Team Twilight Golfers Association Inc. is a non-profit organization dedicated to making a positive impact on our community.
                        With a strong vision of providing our youth with access to proper education, we strive to empower the next generation through opportunities that foster growth, learning, and brighter futures.
                        Beyond the game of golf, our mission is centered on service, education, and community development—ensuring that every young individual has the chance to succeed.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="our-story">
                <h2>Our Story</h2>
                <p>Driving Change, One Swing at a Time - Supporting Students Through the Pabaon kay Iskolar program and Fundraising for a Brighter Future.</p>
                <div className="story-cards">
                    <div className="card">
                        <img src={img2} alt="Charity Golf Tournament" />
                        <h3>Charity Golf Tournament</h3>
                        <p>Heartfelt initiative dedicated to helping deserving students gain access to quality education.</p>
                    </div>
                    <div className="card">
                        <img src={img3} alt="Pabaon Kay Iskolar" />
                        <h3>Pabaon Kay Iskolar</h3>
                        <p>Empowering students with the resources they need to succeed in their academic journey.</p>
                    </div>
                    <div className="card">
                        <img src={img1} alt="Fundraising" />
                        <h3>Fundraising</h3>
                        <p>Raising funds to support our scholarship program and provide opportunities for students in need.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
