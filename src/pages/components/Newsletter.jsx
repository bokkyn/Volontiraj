import React from 'react';
import "./Newsletter.css"

function Newsletter() {
  return (
    <form className="newsletter-form">
      <span className="newsletter-title">Pridruži se našoj mail listi.</span>
      <p className="newsletter-description">Primaj najnovije obavijesti i pozive na akcije.</p>
      <div>
        <input placeholder="Enter your email" type="email" name="email" className="newsletter-input" id="email-address" />
        <button type="submit" className="newsletter-button">Subscribe</button>
      </div>
    </form>
  );
}

export default Newsletter;
