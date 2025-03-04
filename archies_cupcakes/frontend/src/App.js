import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail'; 
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Faqs from './pages/Faqs';
import Header from './components/Header';
import SearchResults from './pages/SearchResults'; 
import Privacy from './pages/Privacy'; 
import Checkout from './pages/Checkout'; 
import OrderConfirmation from './pages/OrderConfirmation'; 
import Terms from './pages/Terms'; 
import './App.css'; // Ensure App.css is imported
import customCursor from './assets/custom-cursor.gif';

function App() {
  useEffect(() => {
    document.body.style.cursor = `url(${customCursor}), auto`;
  }, []);

  return (
    <div className="App"> {/* Apply the App class */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} /> {/* Add route for search results */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderconfirmation" element={<OrderConfirmation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
