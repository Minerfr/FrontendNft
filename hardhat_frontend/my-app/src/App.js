// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
 return (
    <CartProvider>
      <Router>
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
 );
}

export default App;