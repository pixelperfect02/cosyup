import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import homeImage from '../assets/home.png';
import pinkearring from '../assets/pinkearring.jpeg';
import goldenround from '../assets/goldenround.jpeg';
import purpleearring from '../assets/purpleearring.jpeg';
import puzzle from '../assets/puzzle.jpeg';
import necklace from '../assets/necklace.jpeg';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const scrollRef = useRef(null);

  const products = [
    { id: '1', name: 'Rose Glimmer', price: 30.0, image: pinkearring },
    { id: '2', name: 'Solar Glow', price: 30.0, image: necklace },
    { id: '3', name: 'Pink Pop', price: 30.0, image: purpleearring },
    { id: '4', name: 'Piece by Piece', price: 30.0, image: puzzle },
    { id: '5', name: 'Moonlit Glitz', price: 30.0, image: goldenround },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 260; // Adjust based on product card width
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 260;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="home-container" style={{ backgroundImage: `url(${homeImage})`, backgroundSize: 'cover', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Link to="/product" className="shop-button" style={{ padding: '10px 20px', background: '#FFD700', color: 'white', fontSize: '16px', textDecoration: 'none', borderRadius: '8px', fontFamily: 'Cursive, sans-serif' }}>
          Shop Now
        </Link>
      </div>

      {/* Introduction Text */}
      <div className="intro-text" style={{ textAlign: 'center', padding: '40px', fontSize: '22px', fontFamily: 'Cursive, sans-serif', color: 'black' }}>
        Welcome to Twinkle and Tinsel! Your magical destination for sparkling, festive delights.
      </div>

      {/* Featured Products Scrollable Carousel */}
      <div className="carousel-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px' }}>
        <button onClick={scrollLeft} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#8B0000' }}>
          <FaArrowLeft />
        </button>
        <div
          className="products-display"
          ref={scrollRef}
          style={{
            display: 'flex',
            overflowX: 'scroll',
            scrollBehavior: 'smooth',
            width: '800px',
            gap: '15px',
            padding: '10px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="product-card" style={{ minWidth: '360px', textAlign: 'center', padding: '15px', border: '2px solid black', borderRadius: '10px', background: 'white' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: '10px' }} />
              <h3 style={{ fontFamily: 'Cursive, sans-serif', color: '#8B0000' }}>{product.name}</h3>
              <p style={{ fontSize: '18px', color: 'black' }}>${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} style={{ display: 'block', marginTop: '10px', textDecoration: 'none', color: '#8B0000', fontWeight: 'bold' }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
        <button onClick={scrollRight} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#8B0000' }}>
          <FaArrowRight />
        </button>
      </div>

      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
