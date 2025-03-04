import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pinkearring from '../assets/pinkearring.jpeg';
import goldenround from '../assets/goldenround.jpeg';
import purpleearring from '../assets/purpleearring.jpeg';
import puzzle from '../assets/puzzle.jpeg';
import necklace from '../assets/necklace.jpeg';

function Product() {
  const [snacks, setSnacks] = useState([]);

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

    setSnacks(dummySnacks);
  }, []);

  const addToCart = (snack) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(snack);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${snack.name} added to cart!`);
  };

  if (!snacks.length) return <div>Loading...</div>;

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Our Products</h1>
      <div style={styles.productContainer}>
        {snacks.map(snack => (
          <div key={snack.id} style={styles.productBlock}>
            <h2 style={styles.productName}>{snack.name}</h2>
            <img src={snack.image} alt={snack.name} style={styles.productImage} />
            <p style={styles.productDescription}>{snack.description}</p>
            <p style={styles.productPrice}>${snack.price.toFixed(2)}</p>
            <button style={styles.addToCartButton} onClick={() => addToCart(snack)}>Add to Cart</button>
            <Link to={`/product/${snack.id}`} style={styles.viewDetailsLink}>View Product Details</Link>
            <Link to="/cart" style={styles.viewDetailsLink}>View Cart</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: 'Cursive, sans-serif',
    color: '#000000', // Changed text color to black
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  heading: {
    marginBottom: '40px',
    color: '#000000', // Changed heading color to black
  },
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  productBlock: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    backgroundColor: 'white',
  },
  productName: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#000000', // Changed text color to black
  },
  productImage: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#000000', // Changed text color to black
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#000000', // Changed text color to black
  },
  addToCartButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  viewDetailsLink: {
    display: 'block',
    color: '#000000', // Changed text color to black
    textDecoration: 'none',
    marginTop: '10px',
  },
};

export default Product;
