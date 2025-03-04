import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';


// Real key
const stripePromise = loadStripe('pk_live_51PnsEPP9dSGSLZgZ4vSFsHzxGNj1EsnyqaVZNOIATgEMTyqiG46TTkAGhJZTBIN11cG57pz16bLM571tytzrRbw900VunS4NKp');
// const stripePromise = loadStripe ('pk_test_51PnsEPP9dSGSLZgZxvG24SJjbyiBh7rfMk6A88IvmqaB85HbNDci932gdyXVbuzYOsHIF4AajGFuJNmlounF3VP300Rm6aSoAs');

// Function to group cart items and calculate their quantities
const getGroupedItems = (items) => {
  return items.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);
};

const CheckoutForm = ({ cartItems, totalAmount, pickupOrDelivery, setPickupOrDelivery }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [date, setDate] = useState(null); // Initialize date as null
  const [time, setTime] = useState(null); // Initialize time as null
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // New state to handle button disabling
  const [deliveryArea, setDeliveryArea] = useState('australia');  // Add this line
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the button was clicked

 // Function to validate Australian postcode
 const isAustralianPostCode = (address) => {
  const postcodeRegex = /\b\d{4}\b/; // Find any 4-digit number in the address
  return postcodeRegex.test(address);
};

 
// Function to extract and validate Australian postcode from the address
const extractPostcode = (address) => {
  const match = address.match(/\b\d{4}\b/); // Extract 4-digit postcode
  return match ? match[0] : null;
};

const isValidAddress = (address) => {
  return address.trim().length > 10 && extractPostcode(address); 
  // Ensures a full address is entered (arbitrary min 10 chars)
};
const handleFeeCheck = () => {
  console.log("Button clicked! Address:", address);
  setIsSubmitted(true);
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true); // Disable the submit button

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded');
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('[error]', error);
      setIsProcessing(false); // Re-enable the submit button on error
    } else {
      if (!stripe || !elements) {
        console.error('Stripe.js has not loaded');
        return;
      }

      try {
        // Send the order details to your backend
        // const response = await fetch('http://localhost:5001/process-order', {
          
          // for deployed app:
        const response = await fetch('https://backendtwinkleandtinsel.vercel.app/process-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
            phone,
            address,
            paymentMethodId: paymentMethod.id,
            pickupDate: date,
            pickupTime: time,
            totalAmount,
            cartItems,
          }),
  
        });

        const result = await response.json();
        console.log('Backend response:', result);

        if (result.success) {
          console.log('Navigating to order confirmation');
          
          navigate('/orderconfirmation', {
            state: {
              paymentMethodId: paymentMethod.id,
              email,
            },
          });
          
        } else {
          console.error('Payment failed:', result.error);
          setIsProcessing(false); // Re-enable the submit button on failure
        }
      } catch (err) {
        console.error('Payment processing error:', err);
        alert('Something went wrong with payment. Please try again.');
        setIsProcessing(false); // Re-enable the submit button on error
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
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
        <label htmlFor="phone" style={styles.label}>Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="address" style={styles.label}>Address:</label>
        <textarea
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={styles.textarea}
        />
      </div>



     



      <div style={styles.formGroup}>
        <label htmlFor="paymentMethod" style={styles.label}>Payment Method:</label>
        <CardElement style={styles.cardElement} />
      </div>

      <button type="submit" disabled={!stripe || isProcessing} style={styles.submitButton}>
        {isProcessing ? 'Processing...' : 'Submit Order'}
      </button>
    </form>
  );
};



function Checkout() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const groupedItems = getGroupedItems(cartItems);

  // Calculate total amount
  const totalAmount = groupedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const deliveryCost = 15; // Delivery cost

  const [pickupOrDelivery, setPickupOrDelivery] = useState('pickup');
  
  const finalAmount = pickupOrDelivery === 'delivery' ? totalAmount + deliveryCost : totalAmount;
  
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Checkout</h1>
      <div style={styles.cartSummaryContainer}>
        <div style={styles.cartSummary}>
          <h2>Cart Summary</h2>
          {groupedItems.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <h3 style={styles.productName}>{item.name}</h3>
              <p style={styles.productQuantity}>Quantity: {item.quantity}</p>
              <p style={styles.productPrice}>Price: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <h3 style={styles.totalAmount}>Total Amount: ${totalAmount.toFixed(2)}</h3>
          


          {pickupOrDelivery === 'pickup' && (
          <h3 style={styles.pickupLocation}>Pickup Location: Mansfield Park, 5012, available next Sunday (from when you place the order), 9am-5pm. We will email you once your order is ready to be picked up.</h3>
                 )}

          {pickupOrDelivery === 'delivery' && (
            <>
              <h3 style={styles.deliveryCost}>Delivery Cost (within Australia): ${deliveryCost.toFixed(2)}</h3>
              <h3 style={styles.finalAmount}>Final Amount: ${finalAmount.toFixed(2)}</h3>
            </>
          )}
  
          <div>
            <label>
              <input
                type="radio"
                value="pickup"
                checked={pickupOrDelivery === 'pickup'}
                onChange={() => setPickupOrDelivery('pickup')}
              />
              Pickup
            </label>
            <label>
              <input
                type="radio"
                value="delivery"
                checked={pickupOrDelivery === 'delivery'}
                onChange={() => setPickupOrDelivery('delivery')}
              />
              Delivery
            </label>
          </div>
        </div>
      </div>
  
      <Elements stripe={stripePromise}>
        <CheckoutForm 
          cartItems={cartItems} 
          totalAmount={finalAmount} 
          pickupOrDelivery={pickupOrDelivery} 
          setPickupOrDelivery={setPickupOrDelivery} 
        />
      </Elements>
    </div>
  );
  
}

const styles = {
  pageContainer: {
    fontFamily: 'Cursive, sans-serif',
    color: 'black',
    padding: '20px',
    textAlign: 'center',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
  },
  input: {
    width: '90%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '90%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    height: '10px',
  },
  datePicker: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  cardElement: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cartSummaryContainer: {
    marginTop: '10px',
    marginBottom: '20px',
    maxWidth: '640px',
marginLeft: 'auto', // Automatically adjust left margin
marginRight: 'auto', 
  },
  cartSummary: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '1px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cartItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  productName: {
    fontWeight: 'bold',
  },
  productQuantity: {
    color: '#555',
  },
  productPrice: {
    color: '#555',
  },
  totalAmount: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default Checkout;
