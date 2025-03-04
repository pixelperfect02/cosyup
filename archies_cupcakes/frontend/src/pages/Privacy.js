import React from 'react';

function Privacy() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <p style={styles.paragraph}>At Twinkle & Tinsel, your privacy is important to us. We are committed to protecting your personal information and ensuring that it is handled with the utmost care and security.</p>
      <p style={styles.paragraph}>We collect personal information that you provide, such as your name, email address, payment details, and shipping information, solely for processing your orders and providing you with the best service. We will never share your personal information with third parties, except as required by law or to complete your orders (e.g., sharing your address with our delivery partners).</p>
      <p style={styles.paragraph}>We use industry-standard security practices to protect your information from unauthorized access or disclosure. However, please understand that no method of electronic storage or transmission is 100% secure, and while we strive to protect your information, we cannot guarantee absolute security.</p>
      <p style={styles.paragraph}>If you have any questions or concerns about how we handle your personal information, please contact us at twinkleandtinsell@gmail.com .</p>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: 'Cursive, sans-serif',
    color: '#000000',
    backgroundColor: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '30px',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '20px',
    textAlign: 'left', // Align text to the left for better readability
    maxWidth: '800px', // Optional: limit the width for better appearance
    margin: '0 auto', // Center the text block
  }
};

export default Privacy;
