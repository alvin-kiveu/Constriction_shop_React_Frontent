import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { CiFacebook, CiTwitter, CiInstagram } from 'react-icons/ci';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#fff',
        color: '#495057',
        padding: '10px 0',
        borderTop: '1px solid #e9ecef',
        boxShadow: '0 3px 2px rgba(0, 0, 0, 0.1)',
        marginTop: '610px',
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="footer-links" style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to="/terms"
              className="footer-link"
              style={{
                marginRight: '15px',
                textDecoration: 'none',
                color: '#495057',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'color 0.3s',
              }}
            >
              Terms of Service
            </Link>
            <BsArrowRight className="ml-2" />
            <Link
              to="/privacy"
              className="footer-link"
              style={{
                marginRight: '15px',
                textDecoration: 'none',
                color: '#495057',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'color 0.3s',
              }}
            >
              Privacy Policy
            </Link>
          </div>
          <div className="footer-social" style={{ display: 'flex', marginLeft: 'auto' }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              style={{
                backgroundColor: '#E8AE5C',
                padding: '10px',
                color: '#fff',
                borderRadius: '20%',
                transition: 'background-color 0.3s',
                marginRight: '10px',
              }}
            >
              <CiFacebook size={30}/>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              style={{
                backgroundColor: '#E8AE5C',
                padding: '10px',
                color: '#fff',
                borderRadius: '20%',
                transition: 'background-color 0.3s',
                marginRight: '10px',
              }}
            >
              <CiTwitter size={30}/>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              style={{
                backgroundColor: '#E8AE5C',
                padding: '10px',
                color: '#fff',
                borderRadius: '20%',
                transition: 'background-color 0.3s',
                marginRight: '10px',
              }}
            >
              <CiInstagram size={30}/>
            </a>
          </div>
        </div>
        <div
          className="text-center mt-3"
          style={{ fontSize: '14px', color: '#6c757d' }}
        >
          <p>&copy; 2024 Victor Wanjala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






