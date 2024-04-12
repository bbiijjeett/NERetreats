import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";

const Home = () => {
  return (
    <div className="h-full bg-[#f4f6ef]">
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
    </div>
  );
};

export default Home;
