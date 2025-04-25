'use client';
import { useCart } from '../context/cartContext';
import '../styles/styles.css';

// Import the types (ensure consistency)
interface SlotItem {
  id: string;
  imageUrl: string;
}

interface CanvasSlots {
  top: SlotItem | null;
  bottom: SlotItem | null;
  shoes: SlotItem | null;
  hat: SlotItem | null;
  scarf: SlotItem | null;
}

interface OutfitControlsProps {
  canvasSlots: CanvasSlots;
  onReset: () => void; // Receive the reset handler from parent
}

export default function OutfitControls({ canvasSlots, onReset }: OutfitControlsProps) {
  const { addToCart } = useCart();

  const getCurrentOutfit = (): SlotItem[] => {
    return Object.values(canvasSlots).filter((item): item is SlotItem => item !== null);
  };

  const saveOutfit = async () => {
    const currentOutfit = getCurrentOutfit(); 

    if (currentOutfit.length === 0) {
        alert('Canvas is empty. Add items to save an outfit.');
        return;
    }

    // Prepare the data to be sent to the backend
    const outfitData = { items: currentOutfit };

    // const outfitData = canvasSlots;

    try {
        const response = await fetch('http://localhost:4000/api/outfits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(outfitData), 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Save response:', data); 
        alert('Outfit saved!');
    } catch (error) {
        console.error("Failed to save outfit:", error);
        alert('Failed to save outfit. See console for details.');
    }
  };


  const handleAddToCart = () => {
    const currentOutfit = getCurrentOutfit();

    if (currentOutfit.length > 0) {
      addToCart(currentOutfit); // Add the entire array of items as one outfit
      alert('Outfit added to cart!');
    } else {
      alert('Canvas is empty. Add items to create an outfit.');
    }
  };

  return (
    <div className="controls">
      <button onClick={saveOutfit}>Save Outfit</button>
      <button onClick={onReset}>Reset Canvas</button>
      <button onClick={handleAddToCart}>Add Outfit to Cart</button>
    </div>
  );
}