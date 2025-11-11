import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroSlidesPanel = () => {
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({ title: '', subtitle: '', image: '' });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hero-slides');
      setSlides(res.data);
    } catch (error) {
      console.error('Error fetching hero slides:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/hero-slides/${editId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/hero-slides', formData);
      }
      setFormData({ title: '', subtitle: '', image: '' });
      setEditId(null);
      fetchSlides();
    } catch (error) {
      console.error('Error saving slide:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hero-slides/${id}`);
      fetchSlides();
    } catch (error) {
      console.error('Error deleting slide:', error);
    }
  };

  const startEdit = (slide) => {
    setEditId(slide.id);
    setFormData(slide);
    setShowForm(true);
  };

  return (
    <div className="mb-10">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-[#FFD600] text-[#2E2E2E] font-semibold px-6 py-3 rounded shadow hover:bg-yellow-400 transition mb-4"
      >
        {showForm ? 'Close Hero Slide Form' : 'Add Hero Slides!'}
      </button>

      {showForm && (
        <div className="bg-white shadow-md p-6 rounded mb-6 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-[#2E2E2E]">
            {editId ? 'Edit Slide' : 'Add New Slide'}
          </h3>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            name="subtitle"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 w-full mb-4 rounded"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editId ? 'Update Slide' : 'Add Slide'}
          </button>

          {/* ✅ Only show this when form is open */}
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-[#2E2E2E]">Current Slides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {slides.map((slide) => (
              <div key={slide.id} className="bg-white border p-4 rounded shadow-sm">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h4 className="mt-2 font-bold text-[#2E2E2E]">{slide.title}</h4>
                <p className="text-sm text-[#2E2E2E]">{slide.subtitle}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => startEdit(slide)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSlidesPanel;
