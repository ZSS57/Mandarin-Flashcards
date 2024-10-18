import React from 'react';
import './Footer.css';  // Importing the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Learn & Teach</h4>
          <ul>
            <li>Learn Chinese</li>
            <li>Learn Code</li>
            <li>Learn Math</li>
            
          </ul>
        </div>
        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li>All Stars Mandarin Center</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
       
        <div className="footer-column">
          <h4>Privacy & Terms</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
         
        
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
