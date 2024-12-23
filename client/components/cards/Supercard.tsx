"use client";
import React from "react";

// Dummy data for 3 parterBrands
const parterBrands = [
  {
    name: "Rajshree",
    description: "A bestselling product that everyone is talking about.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "DreamOne",
    description: "The dream product for the dream customer.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "LootoSmile",
    description: "Guaranteed smiles with every purchase.",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const BestsellerCard = () => {
  return (
    <div className="flex justify-center items-center pt-10">
      <div className="w-full max-w-5xl bg-white border-3 border-yellow-500 rounded-lg  p-4">
        <div className="flex justify-between space-x-2 mb-4">
          {parterBrands.map((product, index) => (
            <div
              key={index}
              className="w-1/3 bg-white rounded-lg shadow-md p-2 relative border-2 border-dashed border-yellow-400"
            >
              <div className="text-center text-sm font-bold text-gray-700 mb-1">
                <h1 className="uppercase tracking-wide text-yellow-500">
                  {product.name}
                </h1>
              </div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <p className="text-xs text-gray-800 mb-2">
                {product.description.length <= 20
                  ? product.description
                  : product.description.slice(0, 35) + "..."}
              </p>
              <div className="text-center">
                <button className="w-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-medium py-1 px-2 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 text-xs">
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellerCard;
