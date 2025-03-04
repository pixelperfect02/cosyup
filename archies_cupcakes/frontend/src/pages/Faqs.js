import React from 'react';

function FAQ() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Frequently Asked Questions (FAQ)</h1>
      
      <div style={styles.questionContainer}>
        <h2 style={styles.question}>1. What are your store hours?</h2>
        <p style={styles.answer}>We are open for pick-up every Sunday between 9 AM and 5 PM Adelaide time.</p>
      </div>

      <div style={styles.questionContainer}>
        <h2 style={styles.question}>2. Do you offer delivery?</h2>
        <p style={styles.answer}>Yes, we offer delivery within Australia for a flat rate of $15.</p>
      </div>

      <div style={styles.questionContainer}>
        <h2 style={styles.question}>3. How do I place an order?</h2>
        <p style={styles.answer}>You can place an order directly through our website.</p>
      </div>

      <div style={styles.questionContainer}>
        <h2 style={styles.question}>4. What payment methods do you accept?</h2>
        <p style={styles.answer}>We accept all major credit and debit cards.</p>
      </div>

      <div style={styles.questionContainer}>
        <h2 style={styles.question}>5. What is your return policy?</h2>
        <p style={styles.answer}>Due to the nature of our products, we do not accept returns or offer refunds. If you encounter any issues with your order, please contact us immediately.</p>
      </div>

      <div style={styles.questionContainer}>
        <h2 style={styles.question}>6. How can I contact customer service?</h2>
        <p style={styles.answer}>You can reach us via email at twinkleandtinsell@gmail.com.</p>
      </div>
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
  questionContainer: {
    marginBottom: '20px',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto',
  },
  question: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  answer: {
    fontSize: '18px',
    lineHeight: '1.6',
  }
};

export default FAQ;
