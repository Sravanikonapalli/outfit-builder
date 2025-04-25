'use client';

import React from 'react';
import '../styles/styles.css';

//Type for each item (e.g., a shirt or shoes)
interface SlotItem {
  id: string;
  imageUrl: string;
}

type CanvasSlotName = 'top' | 'bottom' | 'shoes' | 'hat' | 'scarf';

//  All canvas slots (each can be an item or null)
interface CanvasSlots {
  top: SlotItem | null;
  bottom: SlotItem | null;
  shoes: SlotItem | null;
  hat: SlotItem | null;
  scarf: SlotItem | null;
}

interface CanvasProps {
  canvasSlots: CanvasSlots;
  setCanvasSlots: React.Dispatch<React.SetStateAction<CanvasSlots>>;
}

export default function Canvas({ canvasSlots, setCanvasSlots }: CanvasProps) {

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    // Grab the item info from the drag event
    const id = e.dataTransfer.getData('item-id');
    const imageUrl = e.dataTransfer.getData('image-url');
    const targetSlot = e.dataTransfer.getData('item-slot') as CanvasSlotName;

    if (id && imageUrl && targetSlot && targetSlot in canvasSlots) {
      setCanvasSlots(prev => ({
        ...prev,
        [targetSlot]: { id, imageUrl },
      }));
    } else {
      console.warn(`Drop failed: Invalid data. ID: ${id}, Slot: ${targetSlot}`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveItem = (slot: CanvasSlotName) => {
    setCanvasSlots(prev => ({
      ...prev,
      [slot]: null,
    }));
  };

  return (
    <div className="canvas-area" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="canvas-label">CANVAS AREA</div>

      {Object.entries(canvasSlots).map(([slot, item]) => (
        item ? (
          <div
            key={slot}
            className={`canvas-slot canvas-slot-${slot}`}
            onClick={() => handleRemoveItem(slot as CanvasSlotName)}
          >
            <img src={item.imageUrl} alt={item.id} className="canvas-item-img" />
          </div>
        ) : (
          <div
            key={slot}
            className={`canvas-slot canvas-slot-${slot} empty`}
          ></div>
        )
      ))}
    </div>
  );
}
