import React from 'react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#FFF8EF] text-[#2E2E2E] py-6 px-4 mt-12 shadow-inner">
      {/* Logo + Name (horizontal) */}
      <div className="flex justify-center items-center gap-3 mb-4">
        <img src="/assets/nomsterLogo.png" alt="Nomster Logo" className="w-10 h-10" />
        <h2 className="text-xl font-bold" style={{ fontFamily: 'Fredoka, sans-serif' }}>
          Nomster
        </h2>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center text-sm mb-4">
        <a href="/about-us" className="hover:text-[#FF3B3F] transition">About Us</a>
        <a href="/feedback" className="hover:text-[#FF3B3F] transition">Feedback</a>
        <a href="/terms" className="hover:text-[#FF3B3F] transition">Terms & Conditions</a>
        <a href="/privacy" className="hover:text-[#FF3B3F] transition">Privacy Policy</a>
        <a href="/contact" className="hover:text-[#FF3B3F] transition">Contact Us</a>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-4 text-xl mb-2">
        <a href="#" className="hover:text-[#FF3B3F] transition"><FaInstagram /></a>
        <a href="#" className="hover:text-[#FF3B3F] transition"><FaFacebookF /></a>
        <a href="#" className="hover:text-[#FF3B3F] transition"><FaTiktok /></a>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Nomster. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
