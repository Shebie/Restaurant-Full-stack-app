import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopDealsPanel = () => {
  const [topDeals, setTopDeals] = useState([]);
  const [dealData, setDealData] = useState({ title: '', description: '', price: '', image: '' });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTopDeals();
  }, []);

  const fetchTopDeals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/top-deals');
      setTopDeals(res.data);
    } catch (error) {
      console.error('Error fetching top deals:', error);
    }
  };

  const handleChange = (e) => {
    setDealData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/top-deals', dealData);
      setDealData({ title: '', description: '', price: '', image: '' });
      fetchTopDeals();
    } catch (error) {
      console.error('Error adding deal:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/top-deals/${editId}`, dealData);
      setDealData({ title: '', description: '', price: '', image: '' });
      setEditId(null);
      fetchTopDeals();
    } catch (error) {
      console.error('Error editing deal:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/top-deals/${id}`);
      fetchTopDeals();
    } catch (error) {
      console.error('Error deleting deal:', error);
    }
  };

  const startEdit = (deal) => {
    setEditId(deal.id);
    setDealData(deal);
    setShowForm(true);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-[#FFD600] text-[#2E2E2E] font-semibold px-6 py-3 rounded shadow hover:bg-yellow-400 transition mb-6"
      >
        {showForm ? 'Close Deal Form' : 'Add a Deal!'}
      </button>

      {showForm && (
        <div className="transition-all duration-500 bg-white shadow-md p-6 rounded mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-[#2E2E2E]">
            {editId ? 'Edit Deal' : 'Add New Deal'}
          </h3>

          <div className="space-y-4 mb-8">
            <input name="title" placeholder="Title" value={dealData.title} onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="description" placeholder="Description" value={dealData.description} onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="price" placeholder="Price" value={dealData.price} onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="image" placeholder="Image URL" value={dealData.image} onChange={handleChange} className="border p-2 w-full rounded" />
            <button
              onClick={editId ? handleEdit : handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editId ? 'Update Deal' : 'Add Deal'}
            </button>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-[#2E2E2E]">Current Deals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topDeals.map((deal) => (
              <div key={deal.id} className="bg-white border p-4 rounded shadow-sm">
                <img src={deal.image} alt={deal.title} className="w-full h-40 object-cover rounded" />
                <h4 className="mt-2 font-bold text-[#2E2E2E]">{deal.title}</h4>
                <p className="text-sm text-[#2E2E2E]">{deal.description}</p>
                <p className="font-semibold mt-1 text-[#2E2E2E]">Rs. {deal.price}</p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => startEdit(deal)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</button>
                  <button onClick={() => handleDelete(deal.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopDealsPanel;
