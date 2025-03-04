import React from 'react';
import { Link } from 'react-router-dom';

// Function to group cart items and calculate their quantities
const groupItems = (items) => {
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

// Function to calculate the total price of the cart
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

function Cart() {
  const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem('cart')) || []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Handle checkout logic if needed
  };

  const groupedCart = groupItems(cart);
  const totalAmount = calculateTotal(groupedCart);

  if (!groupedCart.length) {
    return <div style={styles.emptyCart}>Your cart is empty.</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Your Cart</h1>
      <div style={styles.cartContainer}>
        {groupedCart.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <h2 style={styles.productName}>{item.name}</h2>
            <img src={item.image} alt={item.name} style={styles.productImage} />
            <p style={styles.productDescription}>{item.description}</p>
            <p style={styles.productPrice}>${(item.price * item.quantity).toFixed(2)}</p>
            <p style={styles.itemQuantity}>Quantity: {item.quantity}</p>
            <button
              onClick={() => handleRemove(item.id)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div style={styles.totalContainer}>
        <h2 style={styles.totalHeading}>Total Amount:</h2>
        <p style={styles.totalAmount}>${totalAmount.toFixed(2)}</p>
      </div>
      <Link to="/checkout">
        <button onClick={handleCheckout} style={styles.checkoutButton}>Checkout</button>
      </Link>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: 'Cursive, sans-serif',
    color: '#000000',
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  heading: {
    marginBottom: '40px',
    color: '#552519', // Dark color for the heading
  },
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  cartItem: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    backgroundColor: 'white',
    position: 'relative',
    textAlign: 'center',
  },
  productName: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#000000', // Dark color for product names
  },
  productImage: {
    width: '100px',
    height: 'auto',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#000000', // Dark color for description
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#000000', // Dark color for price
  },
  itemQuantity: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#000000', // Dark color for item quantity
  },
  removeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    border: 'none',
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  checkoutButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  emptyCart: {
    backgroundColor: 'white',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'black',
    fontSize: '24px',
  },
  totalContainer: {
    marginTop: '20px',
  },
  totalHeading: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'f44336', // Light pink color for total heading
  },
  totalAmount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'black', // Light pink color for total amount
  }
};

export default Cart;
