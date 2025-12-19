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
                    <h1>About Us</h1>
                    <p>Team Twilight Golfers Association Inc. is a non-stock, non-profit organization registered with SEC and
                        BIR. Our members are like-minded business owners, leaders, managers who share the love for golf and a
                        passion for helping others.</p>
                </div>
            </div>

            <div className="container">
                <div className="box" ref={addToRefs}>
                    <div className="box-media">
                        <img src={missionImg} alt="Mission image" />
                    </div>
                    <div className="box-content">
                        <h2>Mission</h2>
                        <p>To promote the game of golf as a means to foster camaraderie, sportsmanship, and personal development
                            among its members while contributing to the betterment of society through charitable initiatives and
                            community engagement.</p>
                    </div>
                </div>

                <div className="box reverse" ref={addToRefs}>
                    <div className="box-media">
                        <img src={visionImg} alt="Vision image" />
                    </div>
                    <div className="box-content">
                        <h2>Vision</h2>
                        <p>To be recognized as a leading golf association that not only excels in the sport but also makes a
                            positive impact on the lives of individuals and communities through our dedication to philanthropy
                            and social responsibility.</p>
                    </div>
                </div>

                <div className="box" ref={addToRefs}>
                    <div className="box-media">
                        <img src={advocacyImg} alt="Advocacy image" />
                    </div>
                    <div className="box-content">
                        <h2>Our Advocacy</h2>
                        <p>Access to Education</p>
                        <p>Poverty Alleviation</p>
                        <p>Moral Integrity</p>
                        <p>Family Values</p>
                        <p> Building</p>
                    </div>
                </div>

                <div className="box reverse" ref={addToRefs}>
                    <div className="box-media">
                        <img src={valueImg} alt="Value proposition image" />
                    </div>
                    <div className="box-content">
                        <h2>Our Value Proposition</h2>
                        <p>To nurture future leaders by providing deserving students the means to complete their academic
                            formation augmented by development of values and leadership skills, work environment exposure and
                            industry-matched m skills.
                            <br /><br />
                            Provide Financial Aid (Baon) to deserving Students in the Community. Conduct learning sessions on
                            leadership , Arts, Culture, management skills, financial literacy, critical thinking and the values
                            we endear,
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
