import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuItemsPanel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuData, setMenuData] = useState({ title: '', description: '', price: '', image: '', category: '' });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(res.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleChange = (e) => {
    setMenuData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/menu', menuData);
      setMenuData({ title: '', description: '', price: '', image: '', category: '' });
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/menu/${editId}`, menuData);
      setMenuData({ title: '', description: '', price: '', image: '', category: '' });
      setEditId(null);
      fetchMenuItems();
    } catch (error) {
      console.error('Error editing menu item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setMenuData(item);
    setShowForm(true);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-[#FFD600] text-[#2E2E2E] font-semibold px-6 py-3 rounded shadow hover:bg-yellow-400 transition mb-6"
      >
        {showForm ? 'Close Menu Form' : 'Update Menu'}
      </button>

      {showForm && (
        <div className="transition-all duration-500 bg-white shadow-md p-6 rounded mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-[#2E2E2E]">
            {editId ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h3>

          <div className="space-y-4 mb-8">
            <input name="title" placeholder="Title" value={menuData.title} onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="description" placeholder="Description" value={menuData.description} onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="price" placeholder="Price" value={menuData.price} onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="image" placeholder="Image URL" value={menuData.image} onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="category" placeholder="Category" value={menuData.category} onChange={handleChange} className="border p-2 w-full rounded" />
            <button
              onClick={editId ? handleEdit : handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editId ? 'Update Item' : 'Add Item'}
            </button>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-[#2E2E2E]">Current Menu Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white border p-4 rounded shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
                <h4 className="mt-2 font-bold text-[#2E2E2E]">{item.title}</h4>
                <p className="text-sm text-[#2E2E2E]">{item.description}</p>
                <p className="font-semibold mt-1 text-[#2E2E2E]">Rs. {item.price}</p>
                <p className="italic text-sm text-gray-500">Category: {item.category}</p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => startEdit(item)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItemsPanel;
