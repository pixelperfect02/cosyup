import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the logo image
import { MdShoppingBag, MdSearch, MdClose } from 'react-icons/md'; // Import icons
import './Header.css'; // Import the CSS file for additional styles

function Header() {

  // Define the font family style for links
  const fontStyle = {
   fontFamily: 'Cursive, sans-serif',
   color: 'black',
   textDecoration: 'none',
   transition: 'color 0.3s ease',
   margin: '0 20px'
 };

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Redirect to search results page with query
    }
  };


  return (
    <header className="header"  style={{ fontFamily: 'Cursive, sans-serif' }}>
      <div className="logo-container">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Company Logo" className="logo" />
        </Link>
      </div>
      <div className="button-container">
        {/* Search Icon */}
        <div className="search-icon" onClick={() => setShowSearch(true)}>
          <MdSearch size={30} color="black" />
        </div>

        
        <Link to="/" className="button" style={fontStyle}>Home</Link>
        <Link to="/product" className="button" style={fontStyle}>Shop</Link>
        <Link to="/contact" className="button" style={fontStyle}>Contact</Link>

        {/* Cart Icon */}
        <Link to="/cart" className="cart-link">
          <div className="cart-icon-container">
            <MdShoppingBag size={30} color="black" />
          </div>
        </Link>

        {/* Search Form */}
        {showSearch && (
          <div className="search-bar-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                <MdSearch size={30} color="blacks" />
              </button>
              <button type="button" onClick={() => setShowSearch(false)} className="close-button">
                <MdClose size={30} color="black" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
