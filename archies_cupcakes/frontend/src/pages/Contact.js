import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for handling form submission

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable the submit button

    try {
      // Before
     // const response = await fetch('http://localhost:5001/contact', {
      // Changed this link after deployment 
      const response = await fetch('https://backendtwinkleandtinsel.vercel.app/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSuccess(false);
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      {success === true && <p style={styles.successMessage}>Thank you for your message! We'll get back to you soon.</p>}
      {success === false && <p style={styles.errorMessage}>Something went wrong. Please try again later.</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <button type="submit" disabled={isSubmitting} style={styles.button}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Cursive, sans-serif',
    color: '#000000',
    marginBottom: '20px',
  },
  successMessage: {
    color: '#FCB8C0',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
  },
  form: {
    width: '90%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10pxs rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '5px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontFamily: 'Cursive, sans-serif',
    color: 'black',
  },
  input: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid black',
    borderRadius: '4px',
    outline: 'none',
  },
  textarea: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid black',
    borderRadius: '4px',
    outline: 'none',
    minHeight: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Contact;
