'use client';

import { useState } from 'react';
import '../styles/styles.css';

interface ClothingItem {
  id: string;
  name: string;
  image: string;
  slot: 'top' | 'bottom' | 'shoes' | 'hat' | 'scarf';
}

const clothingItems: ClothingItem[] = [
  { id: 'top-shirt-basic', name: 'Shirt', image: 'https://i.postimg.cc/13LvDNDx/20-2-Photoroom.png', slot: 'top' },
  { id: 'bottom-pants-jeans', name: 'Pants', image: 'https://i.postimg.cc/Zqx609cx/dropbox-7052211115061150.jpg', slot: 'bottom' },
  { id: 'shoes-sneakers-white', name: 'Shoes', image: 'https://i.postimg.cc/4d4VcJ2k/473-Wx593-H-466433013-white-MODEL.jpg', slot: 'shoes' },
  { id: 'hat-cap-black', name: 'Hat', image: 'https://i.postimg.cc/prpj0sts/image.jpg', slot: 'hat' },
  { id: 'scarf-wool-red', name: 'Scarf', image: 'https://i.postimg.cc/pr4F3KWR/image.jpg', slot: 'scarf' },
  { id: 'top-dress-floral-midi', name: 'Floral Midi Dress', image: 'https://www.mytheresa.com/media/1094/1238/100/f3/P01007119.jpg', slot: 'top' },
  { id: 'lether-sandles', name: 'Leather Sandals', image: 'https://www.mytheresa.com/media/1094/1238/100/aa/P00961605.jpg', slot: 'shoes' },
  { id: 'top-girls-blouse-lace', name: 'Girls Lace Blouse', image: 'https://i.postimg.cc/zD6LnZVY/9cb9ef89fda50290261ee9c2c1e73d91d1e78284.jpg', slot: 'top' },
  { id: 'top-frock-girls-checkered', name: 'Girls Checkered Frock', image: 'https://i.pinimg.com/236x/dd/90/8e/dd908ea74ecf633ba827395655d39e64.jpg', slot: 'top' },
  { id: 'bottom-jeans-ripped-blue', name: 'Ripped Blue Jeans', image: 'https://5.imimg.com/data5/XY/WD/DJ/SELLER-42861258/faded-blue-jeans.jpg', slot: 'bottom' },
  { id: 'top-shirt-gents-halfsleeve-plain', name: 'Mens Plain Half-Sleeve Shirt', image: 'https://i.postimg.cc/nh8DtbJG/01-bbfeabd1-2534-49d1-bcf7-09713399d53a.jpg', slot: 'top' },
  { id: 'top-tshirt-gents-vneck', name: 'Mens V-Neck T-Shirt', image: 'https://i.postimg.cc/9QTy4Xpk/3a3030680e5b5cbfe3c3b2d69385cca2592481f1.jpg', slot: 'top' },
  { id: 'bottom-jeans-girls-skinny', name: 'Girls Skinny Jeans', image: 'https://i.postimg.cc/hGL8Y4Qm/214886601-g5.jpg', slot: 'bottom' }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {clothingItems.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('item-id', item.id);
              e.dataTransfer.setData('image-url', item.image);
              e.dataTransfer.setData('item-slot', item.slot);
            }}
            className="draggable-item"
          >
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </>
  );
}
