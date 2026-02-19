import React, { useEffect, useRef, useState } from 'react';
import '../styles/team.css';
import placeholderMember from '../assets/5.jpg';
import benefactor1 from '../assets/1.jpg';

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
            details: {
                title: "Mr. Teotimo \"Tim\" G. Batac",
                position: "LTI Operations Head, Gruppo EMS | Chairman, TTGASInc",
                background: "Mr. Tim serves as the LTI Operations Head of Gruppo EMS. He is one of the dedicated benefactors of the Team Twilight Scholarship Program. With a career in the semiconductor and electronics industry spanning over four decades, Tim currently oversees the PCB assembly and electronic assembly operations of Gruppo EMS, one of the largest electronics manufacturing services companies in the Philippines and worldwide. Beyond his corporate responsibilities, he serves as Chairman of the TTGASInc.",
                involvement: "He first became connected with the Team Twilight Scholarship Program through his camaraderie with fellow golfers. During the COVID-19 pandemic, the group delivered personal protective equipment (PPEs) to hospitals and supported community pantries for caddies who were out of work. These efforts strengthened their bond and inspired the group to pursue the scholarship program as a natural extension of their service.",
                vision: "\"We hope students graduate with the right values,\" he says. Mentorship is central to the program, but expectations are measured—once students are selected, the goal is to provide guidance and support, trusting that they will make the most of the opportunity. He hopes that the culture of service will continue through future generations.",
                message: "\"Recognize your own strengths and motivations, stay grounded in the basics, and always give back. Pay forward.\" For Tim, success is not measured by recognition, but by the positive impact one leaves in the lives of others."
            }
        },
        { name: "Cesar Sangalang", role: "Vice Chairman" },
        { name: "Jon Mateo", role: "President" },
        { name: "Rene dela Cruz", role: "Vice President" },
        { name: "Jun Valerio", role: "Treasurer" },
        { name: "Julius Buenaventura", role: "Assistant Treasurer" },
        {
            name: "Tony Mangubat",
            role: "Secretary",
            details: {
                title: "Engr. Antonio \"Tony\" Mangubat",
                position: "Secretary, TTGASInc | Dedicated Benefactor",
                background: "Mr. Mangubat is one of the dedicated benefactors supporting the PKI Scholarship Program. A graduate of Technological University of the Philippines–Taguig, he proudly shares that he was once a government scholar—an opportunity that allowed him to pursue engineering despite the financial challenges his family faced. He began his career as a technician before completing his master's degree at Perpetual Help University, proving that perseverance and dedication can open many doors.",
                involvement: "He first became connected with PKI and Team Twilight through long-time friends, particularly Sir Rene, with whom he regularly played golf. When the group began discussing their shared desire to help students, Rene introduced the idea of formally building a scholarship program. Mr. Mangubat immediately agreed, recognizing the importance of supporting the next generation and giving them opportunities similar to the ones he received. His motivation for supporting the scholarship is deeply personal—if not for the scholarship he had as a student, he might not have been able to finish his degree.",
                vision: "When he speaks about the future of PKI scholars, his vision is clear. He hopes they will become future leaders in the industry—individuals who will excel not only in academics but also in their chosen fields, particularly in the semiconductor and electronics sector. He believes that leadership should extend beyond school performance; it must include service to the community and the ability to influence others toward positive action.",
                message: "\"Strive to be the best version of yourself, focus on your studies, and develop your leadership skills—both in school and in the community. True leadership is measured not only by achievements but by the ability to inspire others and produce meaningful results.\""
            }
        },
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

    // Primo "Jon" Mateo Jr. appears both as President in trustees AND as a featured benefactor spotlight (newsletter 4/6)
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
                involvement: "He first became connected with the Team Twilight Scholarship Program through his camaraderie with fellow golfers. During the COVID-19 pandemic, the group delivered personal protective equipment (PPEs) to hospitals and supported community pantries for caddies who were out of work. Despite his age and concerns from family and friends, Tim personally delivered PPEs, an experience he describes as \"the most meaningful thing we did together.\" These efforts strengthened their bond and inspired the group to pursue the scholarship program as a natural extension of their service. When asked why he supports the scholarship program, Tim emphasized the importance of values formation alongside academic achievement. Having managed over 10,000 employees in his career, he observed that engineers who struggled through school often became the most effective professionals.",
                vision: "\"We hope students graduate with the right values,\" he says. Mentorship is central to the program, but expectations are measured—once students are selected, the goal is to provide guidance and support, trusting that they will make the most of the opportunity. Tim also hopes that his fellow golfers and benefactors will be inspired to contribute, creating a ripple effect of giving within the community. On a personal level, the scholarship program has had a significant impact on Tim and his family. With his children actively participating, he sees the initiative as a way to instill a lifelong commitment to helping others.",
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
                background: "Mr. Bonifacio serves as the Executive Vice President and General Manager of Automated Technology Philippines, leading its Electronics Manufacturing Services division. He is an Electronics and Communications Engineer who graduated from the University of Santo Tomas. After earning his degree, he migrated to the United States, where he spent twenty productive years working in Silicon Valley. During his stay abroad, he completed his Microwave Engineering continuing education at the University of California, Berkeley. He eventually returned to the Philippines in 1996 to establish Pacific Microwave Corporation, one of the first microwave and RF manufacturing companies in the country. His company later became part of a U.S.-listed corporation before undergoing a management buyout in 2005, eventually becoming Remec Broadband Wireless—one of the main producers of microwave radios for Huawei, manufacturing more than one million units. Today, he continues to contribute his expertise by leading a specialized microwave manufacturing division under Automated Technology.",
                involvement: "Just like TTGAI members, his involvement with Team Twilight and the PKI Scholarship Program began through golf, where he regularly played with industry colleagues. Many members of the group come from the electronics field, and their shared experiences and camaraderie eventually inspired them to collaborate on something more meaningful. With a collective desire to support deserving students, the group came together to formalize a scholarship initiative that would benefit learners who struggle financially. Supporting the program is not new to him, as he has long been involved in helping students in his hometown in Pampanga. He recognizes that many young people possess intelligence, determination, and talent but lack the financial means to continue studying.",
                vision: "When sharing his vision for the scholars, he emphasizes growth, learning, and national development. He hopes that students supported by the program will one day become professionals who contribute to the progress of the Philippines—whether by working in advanced technology industries, creating employment opportunities, or bringing expertise back into the country. He believes that young scholars today can become future leaders and innovators who help build a stronger economy. Looking ahead, he sees the program growing even larger in the next five to ten years. His goal is to build a cycle of generosity—scholars who graduate and succeed will eventually help new scholars, allowing the advocacy to sustain itself and reach more young people.",
                message: "He shares that he does not seek recognition for his contributions. He prefers to help quietly, without wanting to be remembered personally. What matters most to him is seeing students work hard, study diligently, and succeed. For him, witnessing their growth is already the greatest reward. He hopes each scholar understands the value of dedication and uses their education to make a difference in their own lives and in the lives of others."
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
                background: "Mr. Mangubat is one of the dedicated benefactors supporting the PKI Scholarship Program. A graduate of Technological University of the Philippines–Taguig, he proudly shares that he was once a government scholar—an opportunity that allowed him to pursue engineering despite the financial challenges his family faced. He began his career as a technician before completing his master's degree at Perpetual Help University, proving that perseverance and dedication can open many doors.",
                involvement: "He first became connected with PKI and Team Twilight through long-time friends, particularly Sir Rene, with whom he regularly played golf. When the group began discussing their shared desire to help students, Rene introduced the idea of formally building a scholarship program. Mr. Mangubat immediately agreed, recognizing the importance of supporting the next generation and giving them opportunities similar to the ones he received. His motivation for supporting the scholarship is deeply personal. He shared that if not for the scholarship he had as a student, he might not have been able to finish his degree. Because of that experience, he sees this moment as his opportunity to give back. For him, helping PKI scholars is a way of honoring the support he once received and ensuring that deserving students today don't lose their chance to pursue education.",
                vision: "When he speaks about the future of PKI scholars, his vision is clear. He hopes they will become future leaders in the industry—individuals who will excel not only in academics but also in their chosen fields, particularly in the semiconductor and electronics sector, where he and many benefactors have built their careers. He believes that leadership should extend beyond school performance; it must include service to the community and the ability to influence others toward positive action. Supporting the program has been personally meaningful for him. He shared that this advocacy has been in discussion for years with Sir Rene, and seeing it finally come to life has brought him happiness and fulfillment. The growing support from many benefactors also strengthens his belief that the program will flourish for more than ten years, as long as more people continue stepping forward to help.",
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
                background: "Mr. Lazaro, one of the original member of Team Twilight golfers, has been a supporter in strengthening the PKI Scholarship Program. He began his career in the electronics manufacturing industry, working first as a factory worker before moving into machine servicing and sales. After several years of experience, he established his own business in 2001. Autronix Systems Inc. has been operating successfully for more than twenty-one years. They provide production equipment and services to various electronics manufacturing firms. From his early years as an employee to becoming a long-time businessman, he has built a career grounded in hard work, persistence, and a desire to uplift others.",
                involvement: "His connection to PKI began with Team Twilight, a group he helped established. What started as a simple golf group eventually grew into a strong community of professionals from the semiconductor and electronics industry. As their camaraderie deepened, the group decided to do more than simply gather and play—they began raising funds to support institutions and individuals in need. This eventually led to the formalization of their advocacy, which now includes supporting students through the PKI Scholarship Program. His vision for PKI scholars highlights the importance of education as the key to a better future. Before this program, he often extended help to orphanages and families needing financial assistance for medical bills. It was only recently, through discussions with Rene and other members of Team Twilight, that he discovered how many students were struggling to continue their studies due to financial limitations.",
                vision: "He envisions the program continuing for many more years. As long as the members of Team Twilight remain united, he believes the advocacy will thrive. He expressed concern over the country's political instability and emphasized the importance of investing in young people who will one day take on leadership roles. For him, the scholarship is not just financial support—it is a long-term investment in the nation's future. The inspiration for this scholarship program comes from a very personal place. Every December during his birthday, he would gather with friends to celebrate, play golf, and enjoy each other's company. Over time, he realized that these gatherings could be more meaningful if they were tied to a purpose. Instead of having celebrations centered only on leisure, he wanted them to become opportunities to help others. This idea evolved into organizing golf tournaments and fundraising initiatives focused on assisting institutions and individuals who needed support.",
                message: "\"Study hard, be ambitious, and always look ahead.\" He reminds scholars that finishing their education has the power to change their lives, their families, and the community around them. He believes that success is not measured only by profession or income, but by the positive change one brings to society. As the older generation steps back, he hopes the youth will rise to lead, innovate, and transform the future of the country."
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
                background: "Mr. Jon Mateo is a leader and mentor whose story reflects perseverance, vision, and compassion. Today, he serves as the Managing Director of FASTECH, one of the country's leading technology companies. He started his career as an auditor, later worked in banking, and eventually joined FASTECH as a finance supervisor. Through dedication and commitment, he worked his way up as CFO, COO, and now Managing Director. These milestones not only highlight his corporate success but also his discipline, integrity, and genuine concern for people. Beyond business, Sir Primo is also a family man and a mentor, inspired by the values he learned from his father and former boss. Their influence shaped his principles of humility, responsibility, and service — principles he now carries into his advocacies for education and community development.",
                involvement: "Sir Jon's partnership with the Twilight Scholarship Program and the Pabaon Kay Iskolar (PKI) Program reflects his strong belief in education as a tool for nation-building. His commitment began with a personal story: supporting his very first scholar since senior high school — almost 6 years of continuous support. That experience inspired him because, in his own little way of helping, he supported someone else's dreams and it made him delighted. He also envisions expanding his impact by teaching pro bono at PnC and conducting values-based workshops because he believes in sharing both professional skills and life lessons with the youngers.",
                vision: "He openly expressed his dismay at the decline of moral values in society, worsened by public officials who normalize unethical behaviors. For him, education must raise leaders who will stand against corruption. He dreams of scholars who will not only succeed in their careers but also inspire others to do good. He hopes to see some Iskolars become part of Team Twilight's leadership, paying forward the support they once received. Importantly, the program does not ask for repayment — only the hope that scholars will continue the cycle of kindness. In the long run, he hopes the scholarship program can grow to support a thousand scholars in the next five years.",
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
                background: "A celebrated Filipino singer-songwriter and social advocate, Noel Cabangon is a board member of FILSCAP, board member of Jesuit Communications Foundation, President of Akbayanihan Foundation, Vice President of Dakila (Collective for Modern Heroism), and member of Philippine Educational Theater Association. A graduate of Bachelor of Music major in Popular Music. His melodies are not only heard by the ears but deeply felt by the heart. Through the power of music, Mr. Noel voiced his hope for the nation, caring for nationalism, social activism, human rights, and care for Mother Earth.",
                involvement: "His involvement with the PKI Program started when it was first launched on April 11, 2025, during Mr. Rene Dela Cruz' birthday. Mr. Noel Cabangon found this initiative 'very interesting, very noble.' He saw the clear intention of these Golfers — to contribute to the betterment of society. With that purpose, he came up with an idea and started fundraising through his Bar Tour Series (June 25, 2025). From then on, his commitment to helping further ignited his passion for the nation. He also shared a personal story as to why he felt inspired to take part in this scholarship program — his immense belief in education, especially educating the youth.",
                vision: "'Kabataan ang pag-asa ng bayan' resonates with him deeply and he values education as it is the only treasure one can truly own. Education, for Mr. Noel, is a way to have leaders that will continue the dreams of our forefathers, our National Heroes. He clarified that it is not about giving the Iskolars a responsibility — it's about giving them opportunity and helping them make the right decision for themselves, and for the country. He believes that with this program, we will be able to change society, and our future, all for the better.",
                message: "He encourages scholars to value this opportunity and take it seriously. 'Wanting to have a better future for this country and empowering you, the scholars, will carry on the task… Education is really important.' He reminds every Iskolar that education is not only an investment in individuals but also a lasting contribution to the nation's future."
            }
        }
    ];

    const handleMemberClick = (member) => {
        if (member.details) {
            setSelectedMember(member);
        } else {
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
                        <div
                            key={index}
                            className={`member${member.details ? ' clickable-member' : ''}`}
                            ref={addToRefs}
                            onClick={() => handleMemberClick(member)}
                            title={member.details ? 'Click to view profile' : ''}
                        >
                            <img className="avatar" src={placeholderMember} alt={member.name} />
                            <p className="name">{member.name}</p>
                            <p className="role">{member.role}</p>
                            {member.details && <span className="view-profile-hint">View Profile ›</span>}
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
                <p className="benefactors-subtitle">
                    Click on any benefactor card to read their full profile and story.
                </p>
                <div className="benefactors-list-grid">
                    {benefactors.map((member, index) => (
                        <div
                            key={`ben-${index}`}
                            className="benefactor-card member clickable-member"
                            ref={addToRefs}
                            onClick={() => handleMemberClick(member)}
                        >
                            <img className="avatar" src={member.image} alt={member.name} style={{ borderColor: '#ffd700' }} />
                            <div className="benefactor-info">
                                <p className="name">{member.name}</p>
                                <p className="role">{member.role}</p>
                                {member.newsletter && (
                                    <span className="newsletter-tag">{member.newsletter}</span>
                                )}
                                <span className="view-profile-hint">Read Full Profile ›</span>
                            </div>
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
                                            <h4 className="modal-section-title">📋 Background</h4>
                                            <p>{selectedMember.details.background}</p>
                                        </div>
                                    )}
                                    {selectedMember.details.involvement && (
                                        <div className="modal-section">
                                            <h4 className="modal-section-title">🤝 Involvement in PKI Program</h4>
                                            <p>{selectedMember.details.involvement}</p>
                                        </div>
                                    )}
                                    {selectedMember.details.description && (
                                        <div className="modal-section">
                                            <h4 className="modal-section-title">🎵 Advocacy</h4>
                                            <p>{selectedMember.details.description}</p>
                                        </div>
                                    )}
                                    {selectedMember.details.vision && (
                                        <div className="modal-section">
                                            <h4 className="modal-section-title">🔭 Vision for the Scholars</h4>
                                            <p>{selectedMember.details.vision}</p>
                                        </div>
                                    )}
                                    {selectedMember.details.message && (
                                        <div className="modal-section modal-message">
                                            <h4 className="modal-section-title">💬 Message to Scholars</h4>
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
