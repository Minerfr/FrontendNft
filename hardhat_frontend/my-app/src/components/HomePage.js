// src/components/HomePage.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
 const { addToCart, images } = useContext(CartContext);
 const navigate = useNavigate();

 const handleAddToCart = (image) => {
    addToCart(image);
    navigate('/cart');
 };

 return (
    <div className="content-container">
      <button 
        className="view-cart-button"
        onClick={() => navigate('/cart')}
      >
        View Cart
      </button>
      <h2>NFT Buying website</h2>
      {images.map(image => (
        <div key={image.id} className="image-container"> {/* Apply the CSS class */}
          <img src={image.src} alt={image.alt} />
          <p>Price: ${image.price}</p>
          <button 
            className="buy-button"
            onClick={() => handleAddToCart(image)}
          >
            Buy
          </button>
        </div>
      ))}
    </div>
 );
};

export default HomePage;