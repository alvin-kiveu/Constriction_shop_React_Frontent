// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { CiFacebook, CiTwitter, CiInstagram } from 'react-icons/ci';
import './footer.css';

const Footer = () => {
  return (
    <footer className="bg-light text-dark footer">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="footer-links">
            <Link to="/terms" className="footer-link">
              Terms of Service
            </Link>
            <BsArrowRight className="ml-2" />
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <CiFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <CiTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <CiInstagram />
            </a>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 Victor Wanjala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

