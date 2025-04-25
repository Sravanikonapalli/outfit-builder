'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import OutfitControls from './components/OutfitControls';
import Cart from './components/Cart';
import './styles/styles.css';

// the structure for an item in a slot
interface SlotItem {
  id: string;
  imageUrl: string;
}

// the structure for the canvas slots
interface CanvasSlots {
  top: SlotItem | null;
  bottom: SlotItem | null;
  shoes: SlotItem | null;
  hat: SlotItem | null;
  scarf: SlotItem | null;
}

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  // Initialize state with null for each slot
  const [canvasSlots, setCanvasSlots] = useState<CanvasSlots>({
    top: null,
    bottom: null,
    shoes: null,
    hat: null,
    scarf: null,
  });

  // Function to reset the canvas
  const handleReset = () => {
    setCanvasSlots({ top: null, bottom: null, shoes: null, hat: null, scarf: null });
  };

  return (
    <div className="outfit-builder-container">
      <div className="main-content">
        <Sidebar />
        <Canvas canvasSlots={canvasSlots} setCanvasSlots={setCanvasSlots} />
      </div>
      <div className="controls-and-cart">
        <OutfitControls canvasSlots={canvasSlots} onReset={handleReset} />
        <button className="cart-toggle-button" onClick={() => setShowCart(!showCart)}>
          {showCart ? 'Hide Cart' : 'Show Cart'}
        </button>
        {showCart && <Cart />}
      </div>
    </div>
  );
}