import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Footer() {

    return (
        <footer className="bg-black text-white pt-5 pb-4">
            <div className="container">
                <div className="row">

                    {/* Brand */}
                    <div className="col-md-4 mb-4">
                        <h2 className="fw-light">LessHassle</h2>
                        <p className="text-white-50 small mt-4">
                            2026 LessHassle. All rights reserved.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="col-6 col-md-2 mb-4">
                        <ul className="list-unstyled">
                            
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="col-6 col-md-3 mb-4">
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Facebook</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Instagram</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Twitter</a></li>
                            <li><a href="#" className="text-white text-decoration-none">LinkedIn</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="col-6 col-md-3 mb-4">
                        <ul className="list-unstyled">
                            <li><Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
}