import React from 'react';

const MenuItemCard = ({ image, title, description, price, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col justify-between text-[#2E2E2E]">
      <img src={image} alt={title} className="h-40 w-full object-cover rounded" />
      <h3 className="mt-3 text-xl font-bold">{title}</h3>
      <p className="text-sm mt-1">{description}</p>
      <p className="font-semibold text-lg mt-2">Rs. {price}</p>
      <button
        onClick={() => onAdd()} // Fixed: Now properly triggers addToCart
        className="mt-4 bg-[#FFD600] hover:bg-yellow-400 text-[#2E2E2E] font-bold py-2 px-4 rounded"
      >
        + Add to Bucket
      </button>
    </div>
  );
};

export default MenuItemCard;