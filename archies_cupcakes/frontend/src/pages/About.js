import React from 'react';

function About() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>Welcome to Twinkle & Tinsel, a handmade gift shop offering unique and thoughtfully crafted items. From beautiful earrings to custom-made gifts, we specialize in creating one-of-a-kind treasures for all occasions.</p>
      <p style={styles.paragraph}>Every product at Twinkle & Tinsel is carefully handcrafted with love and attention to detail. We believe in making gifts that not only stand out but also make lasting memories for you and your loved ones.</p>
      <p style={styles.paragraph}>Thank you for supporting our handmade creations. We are dedicated to bringing a little sparkle and joy into your life, one handmade gift at a time!</p>
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
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '18px',
    marginBottom: '20px',
    lineHeight: '1.6',
  }
};

export default About;
