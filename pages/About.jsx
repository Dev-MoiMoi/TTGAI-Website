import React, { useEffect, useRef } from 'react';
import missionImg from '../assets/mission.jpg';
import visionImg from '../assets/vision.jpg';
import advocacyImg from '../assets/advocacy.jpg';
import valueImg from '../assets/value.jpg';
import '../styles/about.css';

const About = () => {
    const boxesRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        boxesRef.current.forEach((box, i) => {
            if (box) {
                // Set custom property for delay if needed, though usually handled in CSS with var()
                // The CSS uses var(--delay). We can set it inline.
                box.style.setProperty('--delay', (i * 90) + 'ms');
                observer.observe(box);
            }
        });

        return () => observer.disconnect();
    }, []);


    const addToRefs = (el) => {
        if (el && !boxesRef.current.includes(el)) {
            boxesRef.current.push(el);
        }
    };

    return (
        <div>
            <div id="header">
                <div className="header-text">
                    <h1>About Team Twilight</h1>
                    <p>
                        Established formally in 2025, Team Twilight Golfers Association Inc. traces its roots back to 2009 as a group of like-minded
                        business owners and executives. United by a passion for golf and a heart for service, we are committed to
                        nation-building through our flagship advocacy, "Pabaon Kay Iskolars".
                    </p>
                </div>
            </div>

            <div className="container">
                {/* Mission */}
                <div className="box" ref={addToRefs}>
                    <div className="box-media">
                        <img src={missionImg} alt="Mission image" />
                    </div>
                    <div className="box-content">
                        <h2>Our Mission</h2>
                        <p>To nurture future leaders by providing deserving students with academic support, value development, and leadership training.
                            We aim to fostering camaraderie among members while contributing to society through meaningful charitable initiatives.</p>
                    </div>
                </div>

                {/* The Education Crisis (New Section) */}
                <div className="box reverse" ref={addToRefs}>
                    <div className="box-media" style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#334155' }}>
                        <div style={{ fontSize: '4rem', fontWeight: '800', color: '#2563eb' }}>120</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>College Graduates</div>
                        <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>per 1,000 Grade 1 Students</div>
                    </div>
                    <div className="box-content">
                        <h2>The Reality</h2>
                        <p>
                            Statistics show a significant drop-off in Philippine education: for every 1,000 students entering Grade 1, only 120 eventually graduate college.
                            Furthermore, the Philippines ranked 61st in overall talent development (ASEAN 2019).
                            <br /><br />
                            <strong>"Pabaon Kay Iskolars"</strong> aims to bridge this gap by providing the financial and moral support students need to finish the race.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="box" ref={addToRefs}>
                    <div className="box-media">
                        <img src={valueImg} alt="Value proposition image" />
                    </div>
                    <div className="box-content">
                        <h2>Our Core Values</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                            <p style={{ margin: 0 }}>• Faith in God</p>
                            <p style={{ margin: 0 }}>• Love of Country</p>
                            <p style={{ margin: 0 }}>• Family & Compassion</p>
                            <p style={{ margin: 0 }}>• Courage & Discipline</p>
                            <p style={{ margin: 0 }}>• Justice & Truth</p>
                            <p style={{ margin: 0 }}>• Wisdom & Respect</p>
                        </div>
                    </div>
                </div>

                {/* Program Details */}
                <div className="box reverse" ref={addToRefs}>
                    <div className="box-media">
                        <img src={advocacyImg} alt="Advocacy image" />
                    </div>
                    <div className="box-content">
                        <h2>Holistic Support</h2>
                        <p>
                            We provide more than just financial aid ("Baon"). Our scholars undergo comprehensive training in:
                            <br /><br />
                            • Leadership & Management<br />
                            • Financial Literacy<br />
                            • Arts & Culture Appreciation<br />
                            • Critical Thinking<br />
                            <br />
                            Our goal is to produce graduates who are not just skilled, but morally upright and ready to lead.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
