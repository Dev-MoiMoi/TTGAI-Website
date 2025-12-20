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
                        <h2>The PKI Program</h2>
                        <p>
                            <strong>Batch Sinag at Dangal</strong> ("First Ray of Light and Hope")
                            <br /><br />
                            Guided by the philosophy that <em>"Education is the key to a better future, the most effective equalizer in society,"</em> we provide more than just financial aid ("Baon").
                            <br /><br />
                            Our scholars undergo comprehensive training in:
                            <br />
                            • Leadership & Management<br />
                            • Financial Literacy<br />
                            • Arts & Culture Appreciation<br />
                            • Critical Thinking<br />
                            <br />
                            Our goal is to produce graduates who are not just skilled, but morally upright and ready to lead.
                        </p>
                    </div>
                </div>

                {/* Key Events & Milestones (New Section) */}
                <div className="box" ref={addToRefs} style={{ display: 'block' }}>
                    <div className="box-content" style={{ width: '100%', maxWidth: '100%' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>2025 Key Events & Milestones</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                            {/* April Event */}
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '10px' }}>
                                <h3 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>April: PKI Launch</h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b' }}><strong>April 11, 2025</strong> | Canlubang Golf & Country Club</p>
                                <p style={{ marginTop: '1rem' }}>
                                    Joint Birthday/Charity Golf Tournament for Mr. Rene Dela Cruz’s 60th Birthday. Attended by 118+ players. Officially launched the <strong>Pabaon Kay Iskolar (PKI) Program</strong>, raising an initial P50,000 kickstarter fund.
                                </p>
                            </div>

                            {/* May Event */}
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '10px' }}>
                                <h3 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>May: Buscowitz Cup</h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>"SWING for a Cause"</p>
                                <p style={{ marginTop: '1rem' }}>
                                    Partnered with Buscowitz Energy. Supported solar installations at Nereo Joaquin National High School and contributed to the PKI Program for students at Pamantasan ng Cabuyao.
                                </p>
                            </div>

                            {/* June Event */}
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '10px' }}>
                                <h3 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>June: Noel Cabangon Tour</h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>"Bar Tour Series"</p>
                                <p style={{ marginTop: '1rem' }}>
                                    A benefit concert series by singer-songwriter Noel Cabangon to raise funds for the scholarship program through music and advocacy.
                                </p>
                            </div>

                            {/* August Event */}
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '10px' }}>
                                <h3 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>August: MOA Signing</h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b' }}><strong>August 6, 2025</strong></p>
                                <p style={{ marginTop: '1rem' }}>
                                    Formal signing of Memorandum of Agreement (MOA) between Team Twilight and Pamantasan ng Cabuyao (PnC), committing to financial assistance starting AY 2025–2026.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
