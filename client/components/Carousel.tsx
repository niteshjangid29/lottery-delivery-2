"use client";
import { useState } from "react";
import Image from "next/image";
import img1 from "../public/images/img1.png";
import img2 from "../public/images/img2.png";
import img3 from "../public/images/img3.png";

const slides = [
  {
    title: "Win ₹1,00,000!",
    description: "Try your luck and win big with our exclusive lottery draw.",
    image: img3,
    gradient: "from-yellow-100 to-white",
  },
  {
    title: "Daily Cash Prizes",
    description: "Participate now for a chance to win daily cash rewards!",
    image: img1,
    gradient: "from-green-100 to-white",
  },
  {
    title: "Your Luck Awaits!",
    description: "Buy your ticket today and take the first step to winning.",
    image: img2,
    gradient: "from-purple-100 to-white",
  },
];

export default function CardCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center pt-10  bg-white">
      {/* Carousel Wrapper */}
      <div className="relative w-[400px]">
        {" "}
        {/* Adjusted width */}
        {/* Slide */}
        <div
          className={`flex items-center justify-between p-6 bg-gradient-to-r ${slides[currentSlide].gradient} rounded-xl shadow-lg transition-transform duration-300`}
        >
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {slides[currentSlide].title}
            </h3>
            <p className="text-sm text-gray-500">
              {slides[currentSlide].description}
            </p>
          </div>
          <div>
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        </div>
        {/* Controls */}
        <div className="absolute top-1/2 -left-3 transform -translate-y-1/2">
          <button
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200"
            onClick={handlePrev}
          >
            ❮
          </button>
        </div>
        <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
          <button
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200"
            onClick={handleNext}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex space-x-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full ${
              currentSlide === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
