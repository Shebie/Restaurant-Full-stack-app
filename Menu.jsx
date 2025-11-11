import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuSection from '../components/MenuSection';

const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(res.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const grouped = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="pt-24 p-6 bg-[#FFF8EF] min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-[#2E2E2E] text-center">Full Menu</h1>
      {Object.entries(grouped).map(([category, items]) => (
        <MenuSection 
          key={category} 
          title={category} 
          items={items} 
          onAddToCart={(item) => addToCart(item)} 
        />
      ))}
    </div>
  );
};

export default Menu;