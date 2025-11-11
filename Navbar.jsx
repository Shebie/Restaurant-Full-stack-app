import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { 
  FiMenu, 
  FiUser, 
  FiShoppingCart, 
  FiX, 
  FiLogIn, 
  FiBookOpen, 
  FiInfo, 
  FiMessageSquare, 
  FiFileText, 
  FiShield, 
  FiPhone 
} from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#FFF8EF] shadow-md px-4 py-3 fixed top-0 left-0 w-full z-50 flex items-center justify-between" style={{ fontFamily: 'Fredoka, sans-serif' }}>
      {/* Left: Hamburger */}
      <div className="text-2xl text-[#2E2E2E] cursor-pointer" onClick={handleMenuToggle}>
        <FiMenu />
      </div>

      {/* Center: Logo + Nomster (Link to Home) */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/assets/nomsterLogo.png" alt="Logo" className="w-16 h-16" />
        <h1 className="text-xl font-bold text-[#2E2E2E] hover:text-[#FFD600] transition-colors">Nomster</h1>
      </Link>

      {/* Right: User + Cart */}
      <div className="flex gap-4 text-2xl text-[#2E2E2E]">
        <FiUser 
          className="cursor-pointer hover:text-[#FFD600] transition-colors" 
          onClick={() => navigate('/signin')}
          title="Sign In"
        />
        <FiShoppingCart 
          className="cursor-pointer hover:text-[#FFD600] transition-colors" 
          onClick={() => navigate('/cart')}
          title="Cart"
        />
      </div>

      {/* Slide-out Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <FiX className="text-2xl text-[#2E2E2E] cursor-pointer" onClick={handleMenuToggle} />
        </div>
        
        {/* Menu Links with Icons */}
        <ul className="flex flex-col gap-5 px-6 text-[#2E2E2E] text-[17px]">
          <li 
            className="cursor-pointer flex items-center gap-2 hover:text-[#FFD600] transition-colors"
            onClick={() => {
              navigate('/signin');
              setIsMenuOpen(false);
            }}
          >
            <FiLogIn /> Login
          </li>
          <li 
            className="cursor-pointer flex items-center gap-2 hover:text-[#FFD600] transition-colors"
            onClick={() => {
              navigate('/menu');
              setIsMenuOpen(false);
            }}
          >
            <FiBookOpen /> Explore Menu
          </li>
          <li className="cursor-pointer flex items-center gap-2 hover:text-[#FFD600] transition-colors">
            <FiInfo /> About Us
          </li>
          <li className="cursor-pointer flex items-center gap-2 hover:text-[#FFD600] transition-colors">
            <FiMessageSquare /> Feedback
          </li>
          <li className="cursor-pointer flex items-center gap-2 hover:text-[#FFD600] transition-colors">
            <FiFileText /> Terms & Conditions
          </li>
          <li className="cursor-pointer flex items-center gap-2 hover:text-[#FFD600] transition-colors">
            <FiShield /> Privacy Policy
          </li>
          <li className="cursor-pointer flex items-center gap-2 hover:text-[#FFD600] transition-colors">
            <FiPhone /> Contact Us
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleOverlayClick}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;