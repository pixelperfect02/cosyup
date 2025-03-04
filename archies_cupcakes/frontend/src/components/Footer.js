import React from 'react';
import './Footer.css'; // Import the CSS file for additional styles

const Footer = () => {
  // Define the font family style for links
  const fontStyle = {
    fontFamily: 'Cursive, sans-serif',
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    margin: '0 20px'
  };

  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="/about" style={fontStyle}>About</a>
        <a href="/faqs" style={fontStyle}>FAQs</a>
        <a href="/privacy" style={fontStyle}>Privacy</a>
        <a href="/terms" style={fontStyle}>Terms</a>
      </div>
   
      <div className="footer-social">
        <a href="https://www.facebook.com/profile.php?id=61572876462692" target="_blank" rel="noopener noreferrer" style={fontStyle}>
          <i className="fab fa-facebook-f"></i>
        </a>
     
        <a href="https://www.instagram.com/twinkleandtinselll?igsh=MWdpb2pqdTNzanpldw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={fontStyle}>
          <i className="fab fa-instagram"></i>
        </a>
        {/* <a href="https://www.tiktok.com/@chompandchill?lang=en" target="_blank" rel="noopener noreferrer" style={fontStyle}>
          <i className="fab fa-tiktok"></i>
        </a> */}
        <a href="https://wa.me/61466815945" target="_blank" rel="noopener noreferrer" style={fontStyle}>
          <i className="fab fa-whatsapp"></i>
        </a>
       
      </div>
   
      <div className="payment-methods">
        <i className="fab fa-cc-mastercard icon-large"></i>
        <i className="fab fa-cc-visa icon-large"></i>
        {/* <img src="/images/payment-methods/visa.png" alt="Visa" />
        <img src="/images/payment-methods/mastercard.png" alt="MasterCard" />
        <img src="/images/payment-methods/apple-pay.png" alt="Apple Pay" />
        <img src="/images/payment-methods/google-pay.png" alt="Google Pay" /> */}
      </div>
      
      <p>&copy; {new Date().getFullYear()} Twinkle & Tinsel. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
