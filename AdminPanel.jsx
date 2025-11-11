import React from 'react';

import HeroSlidesPanel from '../components/admins/HeroSlidesPanel';


import TopDealsPanel from '../components/admins/TopDealsPanel';
import MenuItemsPanel from '../components/admins/MenuItemsPanel';

const AdminPanel = () => {
  return (
    <div className="pt-24 p-6 bg-[#FFF8EF] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#2E2E2E]">Admin Panel</h2>
      <HeroSlidesPanel />
      <TopDealsPanel />
      <MenuItemsPanel />
    </div>
  );
};

export default AdminPanel;
