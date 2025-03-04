import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pinkearring from '../assets/pinkearring.jpeg';
import goldenround from '../assets/goldenround.jpeg';
import purpleearring from '../assets/purpleearring.jpeg';
import puzzle from '../assets/puzzle.jpeg';
import necklace from '../assets/necklace.jpeg';
import { Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [snack, setSnack] = useState(null);

  useEffect(() => {
    const dummySnacks = [
     {
            id: '1',
            name: 'Rose Glimmer',
            price: 30.0,
            image: pinkearring
          },
          {
            id: '2',
            name: 'Solar Glow',
            price: 30.0,
            image: necklace
          },
          {
            id: '3',
            name: 'Pink Pop',
            price: 30.0,
            image: purpleearring
          },
          {
            id: '4',
            name: 'Piece by Piece',
            price: 30.0,
            image: puzzle
          },
          {
            id: "5",
            name: 'Moonlit Glitz',
            price: 30.0,
            image: goldenround
          }
    ];

    const selectedSnack = dummySnacks.find(snack => snack.id === id);

    if (selectedSnack) {
      setSnack(selectedSnack);
    } else {
      console.error('Snack not found');
    }
  }, [id]);

  const addToCart = () => {
    if (!snack) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(snack);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${snack.name} added to cart!`);
  };

  if (!snack) return <div>Loading...</div>;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.content}>
        <h1 style={styles.heading}>{snack.name}</h1>
        <img src={snack.image} alt={snack.name} style={styles.productImage} />
        <p style={styles.productDescription}>{snack.description}</p>
        <p style={styles.productPrice}>${snack.price.toFixed(2)}</p>
        <button style={styles.addToCartButton} onClick={addToCart}>Add to Cart</button>
        <Link to="/cart" style={styles.viewDetailsLink}>View Cart</Link>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    backgroundColor: 'white', // Pink background color
    padding: '20px',
  },
  content: {
    backgroundColor: '#FFFFFF', // White background for product block
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontFamily: 'Cursive, sans-serif',
    color: '#000000', // Black text color
  },
  productImage: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#000000', // Black text color
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#000000', // Black text color
  },
  addToCartButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'black', // Pink button background
    color: 'white', // Light pink text color
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  viewDetailsLink: {
    display: 'block',
    color: '#000000', // Black link color
    textDecoration: 'none',
    marginTop: '10px',
    fontFamily: 'Cursive, sans-serif',
  },
};

export default ProductDetail;
