'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Type for a single clothing item
interface OutfitItem {
  id: string;
  imageUrl: string;
}

//(an array of items)
type CartOutfit = OutfitItem[];

interface CartContextType {
  cartItems: CartOutfit[]; 
  addToCart: (outfit: CartOutfit) => void; // Function accepts a complete outfit
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartOutfit[]>([]);

  const addToCart = (outfit: CartOutfit) => {
    // Add the entire outfit array as one element in the cartItems array
    setCartItems((prevCartItems) => [...prevCartItems, outfit]);
     console.log("Added to cart:", outfit); 
     console.log("Current cart:", [...cartItems, outfit]); 
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};