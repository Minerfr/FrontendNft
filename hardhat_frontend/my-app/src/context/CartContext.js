import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
 const [cart, setCart] = useState([]);
 const [images, setImages] = useState([
    { id: 1, src: 'https://images.unsplash.com/photo-1593166073850-b42e3507c969?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 1', price: 0.001 },
    { id: 2, src: 'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 2', price: 0.001 },
    { id: 3, src: 'https://images.unsplash.com/photo-1608463026422-8f43ab4ebac0?w=180&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 3', price: 0.001 },
 ]);

 const addToCart = (item) => {
   setCart([...cart, item]);
};

const removeAllFromCart = () => {
   setCart([]);
   // Filter out the images that are in the cart from the list of available images
   const updatedImages = images.filter(image => !cart.some(item => item.id === image.id));
   setImages(updatedImages);
};

return (
   <CartContext.Provider value={{ cart, addToCart, removeAllFromCart, images }}>
     {children}
   </CartContext.Provider>
);
};