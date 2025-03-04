import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pinkearring from '../assets/pinkearring.jpeg';
import goldenround from '../assets/goldenround.jpeg';
import purpleearring from '../assets/purpleearring.jpeg';
import puzzle from '../assets/puzzle.jpeg';
import necklace from '../assets/necklace.jpeg';

// Updated product data
const data = {
  products: [
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
  ],
  pages: [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      content: 'At Twinkle & Tinsel, your privacy is important to us. '
    },
    {
      id: 'product',
      title: 'Our Products',
      content: 'We offer a range of products...'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: 'We are happy to help...'
    },
    {
      id: 'cart',
      title: 'Cart',
      content: 'Your Cart...'
    },
    {
      id: 'terms',
      title: 'Terms and Conditions',
      content: 'Welcome to Twinkle & Tinsel! By using our website and services, you agree to the following terms and conditions...'
    },
    {
      id: 'about',
      title: 'About Us',
      content: 'Welcome to Twinkle & Tinsel, a handmade gift shop offering unique and thoughtfully crafted items...'
    },
    {
      id: 'checkout',
      title: 'Checkout',
      content: 'Information about the checkout process...'
    },
    {
      id: 'faqs',
      title: 'FAQs',
      content: 'Frequently asked questions...'
    }
  ]
};

function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get('query')?.toLowerCase() || '';
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);

  useEffect(() => {
    console.log('Search Query:', query); // Debugging line

    // Filter products based on the query
    const productResults = data.products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    console.log('Product Results:', productResults); // Debugging line
    setFilteredProducts(productResults);

    // Filter pages based on the query
    const pageResults = data.pages.filter(page =>
      page.title.toLowerCase().includes(query) ||
      page.content.toLowerCase().includes(query)
    );
    console.log('Page Results:', pageResults); // Debugging line
    setFilteredPages(pageResults);
  }, [query]);

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Search Results</h1>
      <p style={styles.paragraph}>Results for: <strong>{query}</strong></p>

      {/* Display product results */}
      {filteredProducts.length > 0 && (
        <div style={styles.resultsContainer}>
          {filteredProducts.map(product => (
            <div key={product.id} style={styles.productCard}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <h2 style={styles.productTitle}>{product.name}</h2>
              <p style={styles.productPrice}>${product.price.toFixed(2)}</p>
              <button style={styles.addToCartButton}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}

      {/* Display page results */}
      {filteredPages.length > 0 && (
        <div style={styles.pageContainer}>
          {filteredPages.map(page => (
            <div key={page.id} style={styles.pageCard}>
              <h2 style={styles.pageTitle}>{page.title}</h2>
              <p style={styles.pageContent}>{page.content.substring(0, 100)}...</p>
              <a href={`/${page.id}`} style={styles.pageLink}>Read More</a>
            </div>
          ))}
        </div>
      )}

      {/* Display no results message */}
      {filteredProducts.length === 0 && filteredPages.length === 0 && (
        <p style={styles.noResults}>No results found for "{query}"</p>
      )}
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
    fontSize: '20px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  resultsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  productCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#FFF',
    width: '300px',
    textAlign: 'left',
    color: 'black',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  productTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  addToCartButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: 'pink',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  noResults: {
    fontSize: '18px',
    color: 'black',
  }
};

export default SearchResults;
