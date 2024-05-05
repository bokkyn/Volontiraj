import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="site-title">Volontiraj!</h2>
          <p className='sredina'>Stranica za volontere SDŽ.</p>
        </div>
        
        <div className="footer-section">
          <ul className="footer-nav">
            <li><a href="https://www.dalmacija.hr">SDŽ</a></li>
            <li>BOkkYN</li>
            <li><a href="https://github.com/bokkyn">GITHUB</a></li>
            <li><a href="https://www.linkedin.com/in/borna-goreta/">LINKEDIN</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
