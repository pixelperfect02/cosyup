import React from 'react';

function Terms() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Terms and Conditions</h1>
      <p style={styles.paragraph}>Welcome to Twinkle & Tinsel! By using our website and services, you agree to the following terms and conditions:</p>
      
      <h2 style={styles.subHeading}>1. Orders</h2>
      <p style={styles.paragraph}>All orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order for any reason.</p>
      
      <h2 style={styles.subHeading}>2. Payment</h2>
      <p style={styles.paragraph}>Payment must be made in full at the time of ordering. We accept all major credit and debit cards.</p>
      
      <h2 style={styles.subHeading}>3. Delivery</h2>
      <p style={styles.paragraph}>We offer a flat rate delivery service within Australia for $15. Delivery times will vary based on your location.</p>
      
      <h2 style={styles.subHeading}>4. Pick Up</h2>
      <p style={styles.paragraph}>Orders can be picked up the next Sunday after your order is placed, between 9 AM and 5 PM Adelaide time, at our store located at Mansfield Park, 5012.</p>
      
      <h2 style={styles.subHeading}>5. Returns and Refunds</h2>
      <p style={styles.paragraph}>Due to the nature of our products, we do not accept returns or offer refunds. If you encounter an issue with your order, please contact us immediately.</p>
      
      <h2 style={styles.subHeading}>6. Changes to Terms</h2>
      <p style={styles.paragraph}>We may update these terms and conditions from time to time. Changes will be posted on this page, and your continued use of our website signifies your acceptance of the updated terms.</p>
      
      <p style={styles.paragraph}>If you have any questions or concerns about these terms, please contact us at twinkleandtinsell@gmail.com .</p>
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
  subHeading: {
    fontSize: '28px',
    marginBottom: '20px',
    marginTop: '30px',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '20px',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto',
  }
};

export default Terms;
