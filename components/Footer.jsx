import React from 'react';

const Footer = () => {
    return (
        <div id="footer">
            <div className="container">
                <div className="row">
                    <div className="subscribe">
                        <h1 className="sub-title">Stay Connected!</h1>
                        <input type="text" name="Name" placeholder="Name" required /><br /><br />
                        <input type="text" name="email" placeholder="Email" required /><br /><br />
                        <button>Subscribe</button>
                    </div>

                    <div className="contact">
                        <h1 className="sub-title">Contact Us</h1>
                        <p><i className="fa-solid fa-paper-plane"></i> ttgasinc@gmail.com</p>
                        <p><i className="fa-solid fa-phone"></i> +63-9175645263</p>

                        <br /><br />
                        <p>&copy; 2025 Team Twilight Golfers Association Inc. All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
