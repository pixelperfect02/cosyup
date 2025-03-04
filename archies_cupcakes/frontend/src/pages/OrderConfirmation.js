import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { paymentMethodId, email } = state || {};

  // Redirect to the home or checkout page if no state is found
  useEffect(() => {
    if (!state) {
      navigate('/'); // Redirect to home page or you can use navigate('/checkout') to redirect to checkout page
    }
  }, [state, navigate]);

  if (!state) {
    return null; // Prevents the component from rendering if state is not available
  }

  console.log('OrderConfirmation state:', state); // Debug statement

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Order Confirmation</h1>
      <p style={styles.paragraph}>Thank you for your purchase!</p>
      <p style={styles.paragraph}>Your payment was successful.</p>
      {/* <p style={styles.paragraph}>Payment Method ID: {paymentMethodId}</p> */}
      <p style={styles.paragraph}>A confirmation email has been sent to {email}.</p>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: 'Cursive, sans-serif',
    color: '#000000', // All text color set to black
    backgroundColor: 'white', // Background color set to white
    padding: '40px 20px',
    textAlign: 'center',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#000000', // Heading text color set to black
  },
  paragraph: {
    fontSize: '18px',
    marginBottom: '20px',
    lineHeight: '1.6',
    color: '#000000', // Paragraph text color set to black
  }
};

export default OrderConfirmation;
