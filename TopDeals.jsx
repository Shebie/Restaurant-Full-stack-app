// TopDeals.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopDeals = ({ addToCart }) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/top-deals');
      setDeals(res.data);
    } catch (error) {
      console.error('Error fetching top deals:', error);
    }
  };

  return (
    <section className="py-12 px-4 bg-[#FFF8EF]">
      <h2 className="text-3xl font-bold text-center text-[#2E2E2E] mb-8">Top Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white rounded shadow p-4 flex flex-col">
            <img
              src={deal.image}
              alt={deal.title}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold text-[#2E2E2E]">{deal.title}</h3>
            <p className="text-sm text-[#2E2E2E] my-2">{deal.description}</p>
            <p className="font-bold text-[#2E2E2E] mb-4">Rs. {deal.price}</p>
            <button
              onClick={() => addToCart(deal)}
              className="mt-auto bg-[#FFD600] hover:bg-yellow-400 text-[#2E2E2E] font-semibold py-2 px-4 rounded"
            >
              + Add to Bucket
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDeals;
