import React, { useEffect, useRef } from 'react';
import '../styles/team.css';
import placeholderMember from '../assets/5.jpg'; // Using logo as fallback since member images are missing

const Team = () => {
    const membersRef = useRef([]);

    useEffect(() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        membersRef.current.forEach((it, i) => {
            if (it) {
                it.style.setProperty('--delay', (i * 80) + 'ms');
                obs.observe(it);
            }
        });

        return () => obs.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !membersRef.current.includes(el)) {
            membersRef.current.push(el);
        }
    };

    const teamMembers = [
        { name: "Maria Lopez", role: "Chairperson", class: "m1" },
        { name: "Rafael Lopez", role: "President", class: "m2" },
        { name: "Camille Reyes", role: "Investment Committee", class: "m3" },
        { name: "Estelle Perez", role: "Risk Management", class: "m4" },
        { name: "Maximiliano V.", role: "Trustee", class: "m5" },
        { name: "Judith R.", role: "Trustee", class: "m6" },
        { name: "Joanne S.", role: "Trustee", class: "m7" },
    ];

    return (
        <div className="team-page">
            <main className="team-section">
                <h2 className="team-title">The Trustees</h2>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className={`member ${member.class}`} ref={addToRefs}>
                            <img className="avatar" src={placeholderMember} alt={member.name} />
                            <p className="name">{member.name}</p>
                            <p className="role">{member.role}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Team;
