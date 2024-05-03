import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="site-title">Volontiraj!</h2>
        </div>
        <p>Stranica za volontere SDŽ.</p>
        <div className="footer-section">
          <ul className="footer-nav">
            <li><a href="#">BOkkYN</a></li>
            <li><a href="#">GITHUB</a></li>
            <li><a href="#">LINKEDIN</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
