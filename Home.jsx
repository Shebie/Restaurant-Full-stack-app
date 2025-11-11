// Home.jsx
import React from "react";
import Hero from "../components/Hero";
import ExploreMenu from "../components/ExploreMenu";
import TopDeals from "../components/TopDeals";

const Home = ({ addToCart }) => {
  return (
    <main className="m-0 p-0 box-border">
      <Hero />
      <ExploreMenu />
      <TopDeals addToCart={addToCart} /> {/* ✅ Pass it down */}
    </main>
  );
};

export default Home;
