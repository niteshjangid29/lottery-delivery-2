"use client";
import React from "react";

import rajshree from "../../public/images/rajshree.jpg";
import dearone from "../../public/images/dearlottery.jpg";

// Dummy data for 3 partner brands
const partnerBrands = [
  {
    name: "Rajshree",
    description:
      "A bestselling product that everyone is talking about. Experience the joy of winning with Rajshree.",
    imageUrl: rajshree, // Use the imported variable directly
  },
  {
    name: "DreamOne",
    description:
      "The dream product for the dream customer. With DreamOne, your aspirations are just a ticket away from becoming a reality.",
    imageUrl: dearone, // Use the imported variable directly
  },
];

const BestsellerCard = () => {
  return (
    <div className="flex justify-center items-center pt-10">
      
      <div className="w-full max-w-5xl bg-white border-3 border-yellow-500 rounded-lg p-4">
      <h2 className="text-2xl font-bold text-center text-yellow-600 mb-4">
          Our Partner Brands
        </h2>
        <div className="flex justify-between space-x-2 mb-4">
          {partnerBrands.map((product, index) => (
            <div
              key={index}
              className="w-1/2 bg-white rounded-lg shadow-md p-2 relative border-2 border-dashed border-yellow-400"
            >
              <div className="text-center text-sm font-bold text-gray-700 mb-1">
                <h1 className="uppercase tracking-wide text-yellow-500">
                  {product.name}
                </h1>
              </div>
              <img
                src={product.imageUrl.src} // Access the `src` property of the imported image
                alt={product.name}
                className="w-full h-auto object-cover rounded-md mb-2"
              />
              <p className="text-xs text-gray-800 mb-2">
                {product.description.length <= 150
                  ? product.description
                  : product.description.slice(0, 150) + "..."}
              </p>
              <div className="text-center">
                {/* Uncomment if needed */}
                {/* <button className="w-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-medium py-1 px-2 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 text-xs">
                  Explore More
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellerCard;
