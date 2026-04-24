import React, { useEffect, useRef, useState } from 'react';
import '../styles/team.css';
import placeholderMember from '../assets/5.jpg';
import benefactor1 from '../assets/1.jpg';

/* ─── Trustee photos ─────────────────────────────────────────────────────── */
import photoJonMateo from '../assets/Trustees/Jon Mateo.jpg';
import photoJuliusBuenaventura from '../assets/Trustees/Julius Buenaventura.jpg';
import photoReneDelaCruz from '../assets/Trustees/Rene Delacruz.jpg';

/* ─── Scholar photos ─────────────────────────────────────────────────────── */
import scholarDanielBenegas from '../assets/Scholars/Daniel Matthew Benegas.jpg';

const SCHOLAR_PHOTOS = {
    'Daniel Matthew Benegas': scholarDanielBenegas,
};

const Team = () => {
    const membersRef = useRef([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        membersRef.current.forEach((it) => {
            if (it) {
                it.style.setProperty('--delay', '0ms');
                obs.observe(it);
            }
        });

        return () => obs.disconnect();
    }, [selectedMember]);

    const addToRefs = (el) => {
        if (el && !membersRef.current.includes(el)) {
            membersRef.current.push(el);
        }
    };

    const teamMembers = [
        {
            name: "Tim Batac",
            role: "Chairman",
            section: "trustees",
            details: {
                title: "Mr. Teotimo \"Tim\" G. Batac",
                position: "LTI Operations Head, Gruppo EMS | Chairman, TTGASInc",
                background: "Mr. Tim serves as the LTI Operations Head of Gruppo EMS. He is one of the dedicated benefactors of the Team Twilight Scholarship Program. With a career in the semiconductor and electronics industry spanning over four decades, Tim currently oversees the PCB assembly and electronic assembly operations of Gruppo EMS, one of the largest electronics manufacturing services companies in the Philippines and worldwide. Beyond his corporate responsibilities, he serves as Chairman of the TTGASInc.",
                involvement: "He first became connected with the Team Twilight Scholarship Program through his camaraderie with fellow golfers. During the COVID-19 pandemic, the group delivered personal protective equipment (PPEs) to hospitals and supported community pantries for caddies who were out of work. These efforts strengthened their bond and inspired the group to pursue the scholarship program as a natural extension of their service.",
                vision: "\"We hope students graduate with the right values,\" he says. Mentorship is central to the program, but expectations are measured—once students are selected, the goal is to provide guidance and support, trusting that they will make the most of the opportunity. He hopes that the culture of service will continue through future generations.",
                message: "\"Recognize your own strengths and motivations, stay grounded in the basics, and always give back. Pay forward.\" For Tim, success is not measured by recognition, but by the positive impact one leaves in the lives of others."
            }
        },
        { name: "Cesar Sangalang", role: "Vice Chairman", section: "trustees" },
        { name: "Jon Mateo", role: "President", photo: photoJonMateo, section: "trustees" },
        { name: "Rene dela Cruz", role: "Vice President", photo: photoReneDelaCruz, section: "trustees" },
        { name: "Jun Valerio", role: "Treasurer", section: "trustees" },
        { name: "Julius Buenaventura", role: "Assistant Treasurer", photo: photoJuliusBuenaventura, section: "trustees" },
        {
            name: "Tony Mangubat",
            role: "Secretary",
            section: "trustees",
            details: {
                title: "Engr. Antonio \"Tony\" Mangubat",
                position: "Secretary, TTGASInc | Dedicated Benefactor",
                background: "Mr. Mangubat is one of the dedicated benefactors supporting the PKI Scholarship Program. A graduate of Technological University of the Philippines–Taguig, he proudly shares that he was once a government scholar—an opportunity that allowed him to pursue engineering despite the financial challenges his family faced. He began his career as a technician before completing his master's degree at Perpetual Help University, proving that perseverance and dedication can open many doors.",
                involvement: "He first became connected with PKI and Team Twilight through long-time friends, particularly Sir Rene, with whom he regularly played golf. When the group began discussing their shared desire to help students, Rene introduced the idea of formally building a scholarship program. Mr. Mangubat immediately agreed, recognizing the importance of supporting the next generation and giving them opportunities similar to the ones he received. His motivation for supporting the scholarship is deeply personal—if not for the scholarship he had as a student, he might not have been able to finish his degree.",
                vision: "When he speaks about the future of PKI scholars, his vision is clear. He hopes they will become future leaders in the industry—individuals who will excel not only in academics but also in their chosen fields, particularly in the semiconductor and electronics sector. He believes that leadership should extend beyond school performance; it must include service to the community and the ability to influence others toward positive action.",
                message: "\"Strive to be the best version of yourself, focus on your studies, and develop your leadership skills—both in school and in the community. True leadership is measured not only by achievements but by the ability to inspire others and produce meaningful results.\""
            }
        },
        { name: "Malvin Castro", role: "Trustee", section: "trustees" },
        { name: "Carlos Lagdameo", role: "Trustee", section: "trustees" },
        { name: "Rey Araos", role: "Trustee", section: "trustees" },
    ];

    const scholars = [
        { name: "Daniel Matthew Benegas", course: "BS Computer Science", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Dream big, work hard.", position: "President" },
        { name: "Joemhir Keil P. Badilla", course: "BEED", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Education empowers.", position: "Vice President" },
        { name: "Ghia Mariz Estorgio", course: "BS Nursing", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Caring hands, glowing heart." },
        { name: "Moises Fatal Jr.", course: "BS Computer Science", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Code is poetry." },
        { name: "Enrique Bague III", course: "BS Nursing", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "To serve and heal." },
        { name: "John Rico T. Añover", course: "BSED Social studies", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "History is our guide." },
        { name: "Charles Jabriel D. Beato", course: "BS Nursing", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Compassion first." },
        { name: "Jaidel C. Flores", course: "BS Computer Science", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Innovating the future." },
        { name: "Paula T. Vidal", course: "BS Psychology", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Understanding mind and soul." },
        { name: "Lindsay R. Laudato", course: "BSED Filipino", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Wika ng pag-asa." },
        { name: "Chelseah Nicole B. Mamplata", course: "BSED English", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Words have power." },
        { name: "John Rod Mhar M. Suario", course: "BS Information Technology", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Connecting the world." },
        { name: "Lorenzo Chauncey L. Dapan", course: "BS Accountancy", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Balance in all things." },
        { name: "Jefferson M. Caparas", course: "BSED-English", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Keep moving forward." },
        { name: "Justin Harvy C. Tapay", course: "BSED-Social Science", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Learning never stops." },
        { name: "Jericho B. Alintanahin", course: "BS Nursing", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Healing with a smile." },
        { name: "Ashzel Roi M. Caluit", course: "BSBA - Marketing", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Strategy meets creativity." },
        { name: "Ryven B. Villar", course: "BEED", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Teaching is passion." },
        { name: "Harold V. Magpantay", course: "BSED - Mathematics", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Numbers don't lie." },
        { name: "Jana Pauline D. Alcones", course: "BSED-Social Studies", batch: "Batch Sinag", school: "Pamantasan ng Cabuyao", quote: "Building a better tomorrow." }
    ];

    const benefactors = [
        {
            name: "Dr. Danilo \"Dan\" C. Lachica",
            role: "President, SEIPI",
            image: placeholderMember,
            newsletter: "Newsletter Spotlight 1/5 — October 2025",
            details: {
                title: "Dr. Danilo \"Dan\" C. Lachica",
                position: "President, Semiconductor and Electronics Industries in the Philippines Foundation, Inc. (SEIPI)",
                background: "Dr. Dan Lachica is the President of the Semiconductor and Electronics Industries in the Philippines Foundation, Inc. (SEIPI). At 70 years old, he carries with him decades of experience in Semiconductor, Academe, industry leadership and volunteer service. He studied at the UP Elementary School, Philippine Science High School, and was an NSDB (now DOST) scholar. His professional journey took him from Procter & Gamble to Silicon Valley, where he spent 16 years working in front-end semiconductor wafer fabrication for American Microsystems, Inc. He later returned to the Philippines to run I-Omega, the first US Zip drive manufacturer, and eventually served 14 years in the Lopez Group of Companies before joining full time with SEIPI.",
                involvement: "Dr. Lachica first learned about the PKI Scholarship through his long-time assistant, Ms. Mabelle dela Cruz and her husband, Rene. During the pandemic, Team Twilight Golfers began organizing initiatives helping Health Workers by donating PPEs. SEIPI supported Team Twilight's PPE distribution during the pandemic by designating Team Twilight as the Organizing Center and Logistics for SEIPI members' donation. Last April 2025, he became aware of the program's mission and felt compelled to help. Beyond financial support, Mr. Lachica consistently emphasizes mentorship and values formation. He often gives talks in schools and shares his own journey—admitting that he was not always the perfect student, but learned the importance of a straight moral compass as he grew older.",
                vision: "His vision for the scholars is grounded in character and purpose. He hopes that students nurtured by the program will become moral, godly, and responsible citizens who lead by example. He emphasized the importance of leadership—not only in titles, but in everyday actions, discipline, and integrity. In the next five to ten years, he hopes to witness PKI graduates who succeed in their careers and pay forward the support they once received, creating a cycle of generosity and service. SEIPI has more than 360 member companies, with over 40 belonging to academic institutions. With around 460,000 workers in the semiconductor and electronics sector, he believes that nurturing young talent is essential for sustaining the industry.",
                message: "\"Whatever you sow, you will reap.\" He encourages scholars to do everything in the service of God, stay sincere in their actions, and remember that true success is found in humility and service."
            }
        },
        {
            name: "Teotimo \"Tim\" G. Batac",
            role: "LTI Operations Head, Gruppo EMS",
            image: placeholderMember,
            newsletter: "Newsletter Spotlight 2/5 — October 2025",
            details: {
                title: "Mr. Teotimo \"Tim\" G. Batac",
                position: "LTI Operations Head, Gruppo EMS | Chairman, TTGASInc",
                background: "Mr. Tim serves as the LTI Operations Head of Gruppo EMS. He is one of the dedicated benefactors of the Team Twilight Scholarship Program. With a career in the semiconductor and electronics industry spanning over four decades, Tim currently oversees the PCB assembly and electronic assembly operations of Gruppo EMS, one of the largest electronics manufacturing services companies in the Philippines and worldwide. Beyond his corporate responsibilities, he serves as Chairman of the TTGASInc.",
                involvement: "He first became connected with the Team Twilight Scholarship Program through his camaraderie with fellow golfers. During the COVID-19 pandemic, the group delivered personal protective equipment (PPEs) to hospitals and supported community pantries for caddies who were out of work. Despite his age and concerns from family and friends, Tim personally delivered PPEs, an experience he describes as \"the most meaningful thing we did together.\" These efforts strengthened their bond and inspired the group to pursue the scholarship program as a natural extension of their service.",
                vision: "\"We hope students graduate with the right values,\" he says. Mentorship is central to the program, but expectations are measured—once students are selected, the goal is to provide guidance and support, trusting that they will make the most of the opportunity. Tim also hopes that his fellow golfers and benefactors will be inspired to contribute, creating a ripple effect of giving within the community.",
                message: "\"Recognize your own strengths and motivations, stay grounded in the basics, and always give back. Pay forward.\" For Tim, success is not measured by recognition, but by the positive impact one leaves in the lives of others."
            }
        },
        {
            name: "Engr. Domingo \"Dingo\" Bonifacio",
            role: "EVP & GM, Automated Technology Philippines",
            image: placeholderMember,
            newsletter: "Newsletter Spotlight 3/5 — October 2025",
            details: {
                title: "Engr. Domingo \"Dingo\" Bonifacio",
                position: "Executive Vice President & General Manager, Automated Technology Philippines",
                background: "Mr. Bonifacio serves as the Executive Vice President and General Manager of Automated Technology Philippines, leading its Electronics Manufacturing Services division. He is an Electronics and Communications Engineer who graduated from the University of Santo Tomas. After earning his degree, he migrated to the United States, where he spent twenty productive years working in Silicon Valley.",
                involvement: "Just like TTGAI members, his involvement with Team Twilight and the PKI Scholarship Program began through golf, where he regularly played with industry colleagues. Many members of the group come from the electronics field, and their shared experiences and camaraderie eventually inspired them to collaborate on something more meaningful.",
                vision: "When sharing his vision for the scholars, he emphasizes growth, learning, and national development. He hopes that students supported by the program will one day become professionals who contribute to the progress of the Philippines—whether by working in advanced technology industries, creating employment opportunities, or bringing expertise back into the country.",
                message: "He shares that he does not seek recognition for his contributions. He prefers to help quietly, without wanting to be remembered personally. What matters most to him is seeing students work hard, study diligently, and succeed."
            }
        },
        {
            name: "Engr. Antonio \"Tony\" Mangubat",
            role: "Secretary, TTGASInc | Benefactor",
            image: placeholderMember,
            newsletter: "Newsletter Spotlight 4/5 — October 2025",
            details: {
                title: "Engr. Antonio \"Tony\" Mangubat",
                position: "Secretary, TTGASInc | Dedicated Benefactor",
                background: "Mr. Mangubat is one of the dedicated benefactors supporting the PKI Scholarship Program. A graduate of Technological University of the Philippines–Taguig, he proudly shares that he was once a government scholar—an opportunity that allowed him to pursue engineering despite the financial challenges his family faced.",
                involvement: "He first became connected with PKI and Team Twilight through long-time friends, particularly Sir Rene, with whom he regularly played golf. When the group began discussing their shared desire to help students, Rene introduced the idea of formally building a scholarship program.",
                vision: "When he speaks about the future of PKI scholars, his vision is clear. He hopes they will become future leaders in the industry—individuals who will excel not only in academics but also in their chosen fields, particularly in the semiconductor and electronics sector.",
                message: "\"Strive to be the best version of yourself, focus on your studies, and develop your leadership skills—both in school and in the community. True leadership is measured not only by achievements but by the ability to inspire others and produce meaningful results.\""
            }
        },
        {
            name: "Engr. Rolando \"Rollie\" Lazaro",
            role: "Founder & CEO, Autronix Systems Inc.",
            image: placeholderMember,
            newsletter: "Newsletter Spotlight 5/5 — October 2025",
            details: {
                title: "Engr. Rolando \"Rollie\" Lazaro",
                position: "Founder & CEO, Autronix Systems Inc. (est. 2001)",
                background: "Mr. Lazaro, one of the original member of Team Twilight golfers, has been a supporter in strengthening the PKI Scholarship Program. He began his career in the electronics manufacturing industry, working first as a factory worker before moving into machine servicing and sales.",
                involvement: "His connection to PKI began with Team Twilight, a group he helped established. What started as a simple golf group eventually grew into a strong community of professionals from the semiconductor and electronics industry.",
                vision: "He envisions the program continuing for many more years. As long as the members of Team Twilight remain united, he believes the advocacy will thrive.",
                message: "\"Study hard, be ambitious, and always look ahead.\" He reminds scholars that finishing their education has the power to change their lives, their families, and the community around them."
            }
        },
        {
            name: "Primo \"Jon\" Mateo Jr.",
            role: "Managing Director, FASTECH",
            image: placeholderMember,
            newsletter: "Newsletter Spotlight — Sep 2025 4/6",
            details: {
                title: "Primo \"Jon\" Mateo Jr.",
                position: "Managing Director, FASTECH | President, TTGASInc",
                background: "Mr. Jon Mateo is a leader and mentor whose story reflects perseverance, vision, and compassion. Today, he serves as the Managing Director of FASTECH, one of the country's leading technology companies. He started his career as an auditor, later worked in banking, and eventually joined FASTECH as a finance supervisor.",
                involvement: "Sir Jon's partnership with the Twilight Scholarship Program and the Pabaon Kay Iskolar (PKI) Program reflects his strong belief in education as a tool for nation-building. His commitment began with a personal story: supporting his very first scholar since senior high school — almost 6 years of continuous support.",
                vision: "He openly expressed his dismay at the decline of moral values in society, worsened by public officials who normalize unethical behaviors. For him, education must raise leaders who will stand against corruption. He dreams of scholars who will not only succeed in their careers but also inspire others to do good.",
                message: "\"My hope is you do good in society. Maging successful in your profession — successful sa pagtulong sa ibang tao.\" Quoting Mother Teresa: 'Not all of us can do great things, but all of us can do small things with great love.'"
            }
        },
        {
            name: "Noel Cabangon",
            role: "Musician, Linkage & Advocate",
            image: benefactor1,
            newsletter: "Newsletter Spotlight — Sep 2025 3/6",
            details: {
                title: "Noel Cabangon",
                position: "Singer-Songwriter, Musician | Linkage & Advocate, PKI Program",
                background: "A celebrated Filipino singer-songwriter and social advocate, Noel Cabangon is a board member of FILSCAP, board member of Jesuit Communications Foundation, President of Akbayanihan Foundation, Vice President of Dakila (Collective for Modern Heroism), and member of Philippine Educational Theater Association.",
                involvement: "His involvement with the PKI Program started when it was first launched on April 11, 2025, during Mr. Rene Dela Cruz' birthday. Mr. Noel Cabangon found this initiative 'very interesting, very noble.' He saw the clear intention of these Golfers — to contribute to the betterment of society.",
                vision: "'Kabataan ang pag-asa ng bayan' resonates with him deeply and he values education as it is the only treasure one can truly own. Education, for Mr. Noel, is a way to have leaders that will continue the dreams of our forefathers, our National Heroes.",
                message: "He encourages scholars to value this opportunity and take it seriously. 'Wanting to have a better future for this country and empowering you, the scholars, will carry on the task… Education is really important.'"
            }
        }
    ];

    const FILTERS = ['All', 'Leadership', 'Staff', 'Coaches'];

    const handleMemberClick = (member) => {
        if (member.details) setSelectedMember(member);
    };

    const closeModal = () => setSelectedMember(null);

    // Board of Trustees = first 3 most prominent (Chairman, President, Asst. Treasurer who have photos)
    const boardOfTrustees = teamMembers.filter(m => ['Tim Batac', 'Jon Mateo', 'Julius Buenaventura'].includes(m.name));

    // Dedicated team = remaining trustees
    const dedicatedTeam = teamMembers.filter(m => !boardOfTrustees.includes(m));

    return (
        <div className="team-page">
            {/* ── Hero ── */}
            <header className="tm-hero">
                <div className="tm-hero-inner">
                    <span className="tm-hero-badge">Meet the Team</span>
                    <h1>Meet the <span className="tm-hero-accent">Visionaries</span></h1>
                    <p className="tm-hero-sub">
                        Our association is <strong>powered by dedicated professionals</strong> and volunteers committed to unlocking the potential of Filipino golfers through education and mentorship.
                    </p>
                    <div className="tm-hero-controls">
                        <div className="tm-search-wrap">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input
                                type="search"
                                className="tm-search"
                                placeholder="Search by name..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="tm-filter-pills">
                            {FILTERS.map(f => (
                                <button
                                    key={f}
                                    className={`tm-pill${activeFilter === f ? ' active' : ''}`}
                                    onClick={() => setActiveFilter(f)}
                                >{f}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Board of Trustees ── */}
            <section className="tm-section tm-section--light">
                <div className="tm-container">
                    <div className="tm-section-label">
                        <span className="tm-section-bar" />
                        <h2>Board of Trustees</h2>
                    </div>
                    <div className="tm-board-grid" ref={addToRefs}>
                        {boardOfTrustees.map((m, i) => (
                            <div
                                key={i}
                                className={`tm-board-card${m.details ? ' has-profile' : ''}`}
                                onClick={() => handleMemberClick(m)}
                            >
                                <div className="tm-board-avatar-wrap">
                                    <img src={m.photo || placeholderMember} alt={m.name} className="tm-board-avatar" />
                                </div>
                                <h3 className="tm-board-name">{m.name}</h3>
                                <p className="tm-board-role">{m.role}</p>
                                {m.details && <span className="tm-view-profile">View Profile →</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Dedicated Team (remaining trustees) ── */}
            <section className="tm-section tm-section--light" style={{ paddingTop: '1rem' }}>
                <div className="tm-container">
                    <div className="tm-section-label">
                        <span className="tm-section-bar" />
                        <h2>Dedicated Team</h2>
                    </div>
                    <div className="tm-team-grid" ref={addToRefs}>
                        {dedicatedTeam.map((m, i) => (
                            <div
                                key={i}
                                className={`tm-team-card${m.details ? ' has-profile' : ''}`}
                                onClick={() => handleMemberClick(m)}
                            >
                                <div className="tm-team-avatar-wrap">
                                    <img src={m.photo || placeholderMember} alt={m.name} className="tm-team-avatar" />
                                </div>
                                <h3 className="tm-team-name">{m.name}</h3>
                                <p className="tm-team-role">{m.role}</p>
                                {m.details && <span className="tm-view-profile tm-view-profile--sm">View Profile →</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Scholars Section ── */}
            <section className="tm-section tm-section--gray">
                <div className="tm-container">
                    <div className="tm-section-label">
                        <span className="tm-section-bar" />
                        <h2>The Scholars — <em>Batch Sinag at Dangal</em></h2>
                    </div>
                    <div className="tm-scholars-grid" ref={addToRefs}>
                        {scholars.map((s, i) => (
                            <div key={i} className={`tm-scholar-card${s.position ? ' tm-scholar-card--officer' : ''}`}>
                                <div className="tm-scholar-avatar-wrap">
                                    <img src={SCHOLAR_PHOTOS[s.name] || placeholderMember} alt={s.name} className="tm-scholar-avatar" />
                                    {s.position && <span className="tm-officer-badge">{s.position}</span>}
                                </div>
                                <h3 className="tm-scholar-name">{s.name}</h3>
                                <p className="tm-scholar-course">{s.course}</p>
                                <p className="tm-scholar-school">{s.school}</p>
                                <p className="tm-scholar-quote">"{s.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Benefactors ── */}
            <section className="tm-section tm-section--light">
                <div className="tm-container">
                    <div className="tm-section-label">
                        <span className="tm-section-bar" />
                        <h2>Featured Benefactors</h2>
                    </div>
                    <div className="tm-benefactors-list" ref={addToRefs}>
                        {benefactors.map((b, i) => (
                            <div key={i} className="tm-benefactor-row" onClick={() => handleMemberClick(b)}>
                                <img src={b.image} alt={b.name} className="tm-benefactor-avatar" />
                                <div className="tm-benefactor-info">
                                    <span className="tm-benefactor-name">{b.name}</span>
                                    <span className="tm-benefactor-role">{b.role}</span>
                                </div>
                                {b.newsletter && <span className="tm-benefactor-badge">{b.newsletter}</span>}
                                <span className="tm-benefactor-arrow">→</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="tm-cta">
                <div className="tm-cta-inner">
                    <h2>Want to Join the Mission?</h2>
                    <p>We are always looking for passionate educators, coaches, and sponsors who share our vision for a fulfilling excellence.</p>
                    <div className="tm-cta-btns">
                        <a href="/sponsorship" className="tm-cta-btn-gold">Become a Sponsor</a>
                        <a href="mailto:ttgasinc@gmail.com" className="tm-cta-btn-outline">Contact Us</a>
                    </div>
                </div>
            </section>

            {/* ── Modal ── */}
            {selectedMember && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <div className="modal-header">
                            <img src={selectedMember.image || placeholderMember} alt={selectedMember.name} className="modal-avatar" />
                            <div>
                                <h3>{selectedMember.details?.title || selectedMember.name}</h3>
                                <p className="modal-role">{selectedMember.details?.position || selectedMember.role}</p>
                                {selectedMember.newsletter && (
                                    <span className="modal-newsletter-tag">{selectedMember.newsletter}</span>
                                )}
                            </div>
                        </div>
                        <div className="modal-body">
                            {selectedMember.details ? (
                                <>
                                    {selectedMember.details.background && (
                                        <div className="modal-section">
                                            <h4 className="modal-section-title">Background</h4>
                                            <p>{selectedMember.details.background}</p>
                                        </div>
                                    )}
                                    {selectedMember.details.involvement && (
                                        <div className="modal-section">
                                            <h4 className="modal-section-title">Involvement in PKI Program</h4>
                                            <p>{selectedMember.details.involvement}</p>
                                        </div>
                                    )}
                                    {selectedMember.details.vision && (
                                        <div className="modal-section">
                                            <h4 className="modal-section-title">Vision for the Scholars</h4>
                                            <p>{selectedMember.details.vision}</p>
                                        </div>
                                    )}
                                    {selectedMember.details.message && (
                                        <div className="modal-section modal-message">
                                            <h4 className="modal-section-title">Message to Scholars</h4>
                                            <blockquote>{selectedMember.details.message}</blockquote>
                                        </div>
                                    )}
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
