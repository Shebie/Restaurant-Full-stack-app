import React from 'react';
import MenuItemCard from './MenuItemCard';

const MenuSection = ({ title, items, onAddToCart }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-[#2E2E2E] mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItemCard 
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            onAdd={() => onAddToCart(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;