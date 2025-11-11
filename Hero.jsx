import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch slides from backend
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hero-slides');
        setSlides(res.data);
      } catch (error) {
        console.error('Error fetching hero slides:', error);
      }
    };
    fetchSlides();
  }, []);

  // Slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return <div className="h-screen bg-[#000] text-white flex items-center justify-center">Loading...</div>;

  const { image, title, subtitle } = slides[current];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-2 md:px-4">
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        <p className="text-xl md:text-2xl mt-4">{subtitle}</p>
        
        <button className="mt-6 px-6 py-3 bg-[#FFD600] text-[#2E2E2E] font-bold rounded hover:bg-yellow-500 transition">
          
          Explore Menu
        </button>
      </div>

      {/* Arrows */}
      <div className="absolute inset-0 z-20 flex justify-between items-center px-4">
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="text-4xl text-white hover:text-yellow-400 transition"
        >
          &#8249;
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="text-4xl text-white hover:text-yellow-400 transition"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Hero;
