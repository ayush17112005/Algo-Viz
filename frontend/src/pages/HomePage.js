import React from "react";

import { Hero } from "../components/Hero";
import { AlgorithmCategories } from "../components/AlgorithmCategories";
import { Features } from "../components/Features";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <AlgorithmCategories />
      <Features />
    </div>
  );
};

export default HomePage;
