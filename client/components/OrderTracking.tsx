'use client';
import React, { useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdShoppingBag } from "react-icons/md"; // Icon for shopping bag

const OrderTracking: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0); // Progress for the current connecting line
  const [remainingTime, setRemainingTime] = useState(0); // Remaining time in seconds

  // Stages for the timeline
  const stages = [
    { name: "Ordered", description: "Started Wednesday, May 23" },
    { name: "Shipped", description: "2 mins later" },
    { name: "Out for Delivery", description: "4 mins later" },
    { name: "Delivered", description: "10 mins later" },
  ];

  const timings = [0, 2 * 60, 4 * 60, 10 * 60]; // Stage timings in seconds

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = timings[timings.length - 1] * 1000; // Total duration in milliseconds

    const interval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Elapsed time in seconds

      // Update the current stage, progress, and remaining time
      for (let i = timings.length - 1; i >= 0; i--) {
        if (elapsedTime >= timings[i]) {
          setCurrentStageIndex(i);
          setProgress(((elapsedTime - timings[i]) / (timings[i + 1] - timings[i])) * 100);
          setRemainingTime(Math.max(0, timings[i + 1] - elapsedTime)); // Calculate remaining time
          break;
        }
      }

      // Stop animation after the timeline is complete
      if (elapsedTime >= totalDuration / 1000) {
        clearInterval(interval);
        setProgress(100); // Fully complete the last line
        setRemainingTime(0); // No time left after delivery
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format the "Arriving in" text
  const formatArrivingText = () => {
    if (currentStageIndex === stages.length - 1) {
      return "now"; // Delivered
    }
    const minutes = Math.ceil(remainingTime / 60);
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg mt-7">
      {/* Arriving & Tracking */}
      <div className="border p-4 rounded-md mb-6">
        <h3 className="text-2xl font-semibold text-purple-600 mb-2">
          Arriving in {formatArrivingText()}
        </h3>
        <p className="text-sm text-gray-600 mb-4">Your order is on the way</p>

        {/* Timeline */}
        <div className="relative">
          {stages.map((stage, index) => {
            const isActive = index <= currentStageIndex; // Check if the stage is active
            const isLast = index === stages.length - 1;

            return (
              <div
                key={stage.name}
                className={`relative flex items-center mb-6 ${isLast ? "mb-0" : ""}`}
              >
                {/* Circle */}
                <div
                  className={`${
                    isActive ? "bg-blue-600" : "bg-gray-300"
                  } w-5 h-5 rounded-full relative z-10`}
                ></div>

                {/* Connecting Line */}
                {!isLast && (
                  <div className="relative w-1 -left-3 top-8 bg-gray-300" style={{ height: "40px" }}>
                    <div
                      className="absolute left-0 top-0 w-full bg-blue-600"
                      style={{
                        height: `${
                          index === currentStageIndex
                            ? progress
                            : isActive
                            ? 100
                            : 0
                        }%`,
                        transition: "height 1s linear",
                      }}
                    ></div>
                  </div>
                )}

                {/* Stage Details */}
                <div className="ml-6">
                  <p className={`font-medium ${isActive ? "text-black" : "text-gray-500"}`}>
                    {stage.name}
                  </p>
                  <p className="text-xs text-gray-500">{stage.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Partner Details */}
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
        <div className="bg-purple-100 py-2 px-4 rounded-full">
          <span className="text-purple-600 font-bold text-xl ">A</span>
        </div>
        <div className="ml-4">
          <p className="font-semibold">Abhinendra Singh</p>
          <p className="text-sm text-gray-500">Delivery Partner</p>
        </div>
        <div className="ml-auto">
          <FiPhoneCall className="text-purple-600 text-2xl" />
        </div>
      </div>

      {/* Item Details */}
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-center">
          <MdShoppingBag className="text-purple-600 text-xl mr-3" />
          <div>
            <p className="text-sm font-medium">1 Item</p>
            <p className="text-xs text-green-600 font-semibold">₹97.01 saved</p>
          </div>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700">
          Pay Now
        </button>
      </div>

      {/* Delivery Address */}
      <p className="text-sm text-gray-500">
        Delivering to: 2, Main Patel Road, Block 2, East Patel Nagar
      </p>
    </div>
  );
};

export default OrderTracking;
