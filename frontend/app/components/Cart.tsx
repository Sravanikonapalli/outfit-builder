'use client';

import { useCart } from '../context/cartContext';
import '../styles/styles.css';

// Import the type for a single item
interface OutfitItem {
  id: string;
  imageUrl: string;
}

export default function Cart() {
  const { cartItems } = useCart(); 

  return (
    <div className="cart">
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>No outfits in cart</p>
      ) : (
        cartItems.map((outfit, outfitIndex) => (
          <div key={outfitIndex} className="cart-outfit">
            <h3>Outfit {outfitIndex + 1}</h3>
            {outfit.map((item, itemIndex) => (
              <div key={`${outfitIndex}-${itemIndex}-${item.id}`} className="cart-item">
                <img src={item.imageUrl} alt={item.id} className="cart-item-img" />
                <p>{item.id}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}