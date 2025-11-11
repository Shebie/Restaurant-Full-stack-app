import React, { useRef } from 'react';

const menuItems = [
  { id: 1, image: '/assets/burger1.png', title: 'Burgers' },
  { id: 2, image: '/assets/pizza1.png', title: 'Pizza' },
  { id: 3, image: '/assets/hero3.png', title: 'Pasta' },
  { id: 4, image: '/assets/desert.png', title: 'Desserts' },
  { id: 5, image: '/assets/sandwiches.png', title: 'Sandwiches' },
  { id: 6, image: '/assets/wings.png', title: 'Wings' },
  { id: 7, image: '/assets/steak.png', title: 'Steaks' },
  { id: 8, image: '/assets/bar b.png', title: 'Bar-B Que' },
];

const ExploreMenu = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 px-4 bg-[#FFF8EF] relative">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2E2E2E] text-center mb-8">
        Explore Menu
      </h2>

      {/* Left & Right Arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[#FFD600] text-[#2E2E2E] text-2xl rounded-full w-10 h-10 shadow hover:bg-yellow-400 transition"
      >
        &#8249;
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[#FFD600] text-[#2E2E2E] text-2xl rounded-full w-10 h-10 shadow hover:bg-yellow-400 transition"
      >
        &#8250;
      </button>

      {/* Horizontal Scrollable Menu */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-6 scroll-smooth hide-scrollbar"
      >
        {menuItems.map((item) => (
          <div key={item.id} className="flex-shrink-0 flex flex-col items-center mx-5">
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-2 border-[#FFD600] shadow-sm"
            />
            <p className="mt-2 text-[#2E2E2E] font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreMenu;
