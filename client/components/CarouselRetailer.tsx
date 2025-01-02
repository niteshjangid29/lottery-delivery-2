"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import img1 from "../public/images/img1.png";
import img2 from "../public/images/img2.png";
import img3 from "../public/images/img3.png";
import { RootState } from "../redux/store";

export default function CardCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const retailerData = useSelector((state: RootState) => state.retailer);

  const slides = [
    {
      title: retailerData.name,
      description: retailerData.email,
      image: img3,
      gradient: "from-yellow-100 to-white",
    },
    {
      title: "About",
      description: retailerData.about.slice(0, 90) + "...",
      image: img1,
      gradient: "from-green-100 to-white",
    },
    {
      title: "Address",
      description: retailerData.address,
      image: img2,
      gradient: "from-purple-100 to-white",
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Automatically cycle through slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // 3 seconds interval
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center pt-10 bg-white">
      {/* Carousel Wrapper */}
      <div className="relative w-[350px]">
        {/* Slide */}
        <div
          className={`flex items-center justify-between p-6 bg-gradient-to-r ${slides[currentSlide].gradient} rounded-xl shadow-lg transition-transform duration-700 easy-in-out`}
        >
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {slides[currentSlide].title}
            </h3>
            <p className="text-sm text-gray-500">
              {slides[currentSlide].description}
              <br />
              {currentSlide === 0 ? retailerData.phoneNo : null}
              <span className="text-red-600 font-bold">
                {currentSlide === 2 ? `Rating: ${retailerData.rating} ★` : null}
              </span>
            </p>
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
