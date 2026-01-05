import React, { useEffect, useRef, useState } from 'react';
import '../styles/team.css';
import placeholderMember from '../assets/5.jpg';
import benefactor1 from '../assets/1.jpg';
import benefactor2 from '../assets/2.jpg';

const Team = () => {
    const membersRef = useRef([]);
    const [selectedMember, setSelectedMember] = useState(null);

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
    }, [selectedMember]); // Re-run if selectedMember changes (modal might affect layout, though unlikely)

    const addToRefs = (el) => {
        if (el && !membersRef.current.includes(el)) {
            membersRef.current.push(el);
        }
    };

    const teamMembers = [
        { name: "Tim Batac", role: "Chairman" },
        { name: "Cesar Sangalang", role: "Vice Chairman" },
        { name: "Jon Mateo", role: "President" },
        { name: "Rene dela Cruz", role: "Vice President" },
        { name: "Jun Valerio", role: "Treasurer" },
        { name: "Julius Buenaventura", role: "Assistant Treasurer" },
        { name: "Tony Mangubat", role: "Secretary" },
        { name: "Malvin Castro", role: "Trustee" },
        { name: "Carlos Lagdameo", role: "Trustee" },
        { name: "Rey Araos", role: "Trustee" },
    ];

    const scholars = [
        { name: "Daniel Matthew Benegas", course: "BS Computer Science", position: "President" },
        { name: "Joemhir Keil P. Badilla", course: "BEED", position: "Vice President" },
        { name: "Ghia Mariz Estorgio", course: "BS Nursing" },
        { name: "Moises Fatal Jr.", course: "BS Computer Science" },
        { name: "Enrique Bague III", course: "BS Nursing" },
        { name: "John Rico T. Añover", course: "BSED Social studies" },
        { name: "Charles Jabriel D. Beato", course: "BS Nursing" },
        { name: "Jaidel C. Flores", course: "BS Computer Science" },
        { name: "Paula T. Vidal", course: "BS Psychology" },
        { name: "Lindsay R. Laudato", course: "BSED Filipino" },
        { name: "Chelseah Nicole B. Mamplata", course: "BSED English" },
        { name: "John Rod Mhar M. Suario", course: "BS Information Technology" },
        { name: "Lorenzo Chauncey L. Dapan", course: "BS Accountancy" },
        { name: "Jefferson M. Caparas", course: "BSED-English" },
        { name: "Justin Harvy C. Tapay", course: "BSED-Social Science" },
        { name: "Jericho B. Alintanahin", course: "BS Nursing" },
        { name: "Ashzel Roi M. Caluit", course: "BSBA - Marketing" },
        { name: "Ryven B. Villar", course: "BEED" },
        { name: "Harold V. Magpantay", course: "BSED - Mathematics" },
        { name: "Jana Pauline D. Alcones", course: "BSED-Social Studies" }
    ];

    const benefactors = [
        {
            name: "Noel Cabangon",
            role: "Linkage & Advocate",
            image: benefactor1,
            details: {
                role: "Benefactor and Fundraiser",
                description: "Inspired by the 'noble' intent of the golfers, he uses his music to advocate for 'nationalism, social activism, and care for Mother Earth.'",
                message: "He believes education is the 'only treasure one can truly own' and encourages scholars to take the opportunity seriously."
            }
        },
        {
            name: "Primo “Jon” Mateo Jr.",
            role: "Managing Director, FASTECH",
            image: benefactor2,
            details: {
                role: "Leader and Mentor",
                vision: "Aims to raise leaders who will stand against corruption and normalize ethical behavior.",
                history: "Has been personally supporting a scholar for 6 years; donated PPE during COVID-19; and established community pantries for golf caddies.",
                goal: "To grow the program to support 1,000 scholars in the next five years."
            }
        }
    ];

    const handleMemberClick = (member) => {
        if (member.details) {
            setSelectedMember(member);
        } else {
            // Optional: Show a default 'Coming Soon' or nothing
            console.log("No details for this member yet.");
        }
    };

    const closeModal = () => setSelectedMember(null);

    return (
        <div className="team-page">
            <main className="team-section">

                {/* Trustees Section */}
                <h2 className="team-title">The Trustees</h2>
                <div className="team-grid trustees-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="member" ref={addToRefs} onClick={() => handleMemberClick(member)}>
                            <img className="avatar" src={placeholderMember} alt={member.name} />
                            <p className="name">{member.name}</p>
                            <p className="role">{member.role}</p>
                        </div>
                    ))}
                </div>

                {/* Scholars Section */}
                <h2 className="team-title" style={{ marginTop: '4rem', background: '#10b981' }}>The Scholars</h2>
                <div className="team-grid scholars-grid">
                    {scholars.map((scholar, index) => (
                        <div key={`scholar-${index}`} className={`member ${scholar.position === 'President' ? 'scholar-president' : scholar.position === 'Vice President' ? 'scholar-vp' : ''}`} ref={addToRefs}>
                            <img className="avatar" src={placeholderMember} alt={scholar.name} style={{ width: '100px', height: '100px', borderColor: scholar.position ? '#ffd700' : 'rgba(255,255,255,0.95)' }} />
                            <p className="name">{scholar.name}</p>
                            {scholar.position && <p style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '0.8rem', margin: '2px 0' }}>{scholar.position}</p>}
                            <p className="role">{scholar.course}</p>
                        </div>
                    ))}
                </div>

                {/* Featured Benefactors Section */}
                <h2 className="team-title" style={{ marginTop: '4rem', background: '#2563eb' }}>Featured Benefactors</h2>
                <div className="team-grid benefactors-grid">
                    {benefactors.map((member, index) => (
                        <div key={`ben-${index}`} className="member" ref={addToRefs} onClick={() => handleMemberClick(member)} style={{ cursor: 'pointer' }}>
                            <img className="avatar" src={member.image} alt={member.name} style={{ borderColor: '#ffd700' }} />
                            <p className="name">{member.name}</p>
                            <p className="role">{member.role}</p>
                        </div>
                    ))}
                </div>

            </main>

            {/* Modal */}
            {selectedMember && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <div className="modal-header">
                            <img src={selectedMember.image || placeholderMember} alt={selectedMember.name} className="modal-avatar" />
                            <div>
                                <h3>{selectedMember.name}</h3>
                                <p className="modal-role">{selectedMember.role}</p>
                            </div>
                        </div>
                        <div className="modal-body">
                            {selectedMember.details ? (
                                <>
                                    {selectedMember.details.role && <p><strong>Role:</strong> {selectedMember.details.role}</p>}
                                    {selectedMember.details.description && <p><strong>Involvement:</strong> {selectedMember.details.description}</p>}
                                    {selectedMember.details.message && <p><strong>Message:</strong> {selectedMember.details.message}</p>}
                                    {selectedMember.details.vision && <p><strong>Vision:</strong> {selectedMember.details.vision}</p>}
                                    {selectedMember.details.history && <p><strong>History of Service:</strong> {selectedMember.details.history}</p>}
                                    {selectedMember.details.goal && <p><strong>Goal:</strong> {selectedMember.details.goal}</p>}
                                </>
                            ) : (
                                <p>Detailed profile information coming soon.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Team;
