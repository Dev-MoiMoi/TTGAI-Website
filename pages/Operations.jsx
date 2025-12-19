import React from 'react';
import '../styles/operations.css';

const Operations = () => {
    return (
        <div className="operations-page">
            <div className="operations-header">
                <h1>Website Operations</h1>
                <p>
                    Ensuring transparency, accuracy, and reliability in how we manage scholarships,
                    updates, and user support.
                </p>
            </div>

            <div className="operations-grid">
                {/* 1. Scholarship Listing Process */}
                <div className="operation-card">
                    <div className="card-decoration"></div>
                    <h2>Scholarship Posting Workflow</h2>
                    <ul>
                        <li>Scholarships are collected from official and verified sources</li>
                        <li>Information is rigorously reviewed for accuracy before posting</li>
                        <li>Deadlines and specific requirements are cross-verified</li>
                    </ul>
                </div>

                {/* 2. Content Review and Verification */}
                <div className="operation-card">
                    <div className="card-decoration"></div>
                    <h2>Review and Verification</h2>
                    <ul>
                        <li>Strict verification of eligibility criteria against the source</li>
                        <li>Routine checks on the validity of deadlines and official links</li>
                        <li>Prompt removal of expired or invalid scholarship listings</li>
                    </ul>
                </div>

                {/* 3. Update and Maintenance Schedule */}
                <div className="operation-card">
                    <div className="card-decoration"></div>
                    <h2>Update Schedule</h2>
                    <ul>
                        <li>Website monitored regularly to ensure content remains active</li>
                        <li>Weekly updates to scholarship lists and resources</li>
                        <li>Regular comprehensive content reviews to ensure freshness</li>
                    </ul>
                </div>

                {/* 4. User Interaction and Support */}
                <div className="operation-card">
                    <div className="card-decoration"></div>
                    <h2>User Support</h2>
                    <ul>
                        <li>Tools to search and filter scholarships by relevant criteria</li>
                        <li>Ability to save or bookmark opportunities for later review</li>
                        <li>Dedicated support channels for reporting concerns or corrections</li>
                    </ul>
                </div>

                {/* 5. Application Guidance Process */}
                <div className="operation-card">
                    <div className="card-decoration"></div>
                    <h2>Application Guidance</h2>
                    <ul>
                        <li>We provide comprehensive guidance and direct links to applications</li>
                        <li><strong>Note:</strong> We do not process applications directly</li>
                        <li>Our role is to facilitate your direct connection to scholarship providers</li>
                    </ul>
                </div>

                {/* 6. Data Privacy and Security */}
                <div className="operation-card">
                    <div className="card-decoration"></div>
                    <h2>Privacy & Security</h2>
                    <ul>
                        <li>User data is protected according to security best practices</li>
                        <li>We strictly do not share personal data with third parties</li>
                        <li>Secure contact forms are used for all user communications</li>
                    </ul>
                </div>

                {/* 7. Feedback and Improvement */}
                <div className="operation-card">
                    <div className="card-decoration"></div>
                    <h2>Feedback & Improvement</h2>
                    <ul>
                        <li>Open feedback channels for suggestions on new scholarships</li>
                        <li>Active monitoring for community reporting of incorrect listings</li>
                        <li>Continuous platform improvement based on user needs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Operations;
