"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LotteryState } from "../../utils/data/lotteryData";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const LotteryTicketCard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const lotteryState = useSelector((state: RootState) => state.lotteries) as LotteryState;
  const isRetailer = useSelector((state: RootState) => state.retailer.isRetailer);
  const ID = useSelector((state: RootState) => state.retailer.id);
  const lotteryTickets = Object.values(lotteryState.alllotteries);
  const ticketsPerPage = 3;
  const router = useRouter();

  // Handle next button click (pagination)
  const handleNext = () => {
    if (startIndex + ticketsPerPage < lotteryTickets.length) {
      setStartIndex(startIndex + ticketsPerPage);
    }
  };

  // Handle previous button click (pagination)
  const handlePrev = () => {
    if (startIndex - ticketsPerPage >= 0) {
      setStartIndex(startIndex - ticketsPerPage);
    }
  };

  // Handle buying a ticket
  const handleBuy = (id: string) => {
    console.log("Buy Now");
    router.push(isRetailer ? `/${ID}/lottery/${id}` : `/lottery/${id}`);
  };

  // Get visible tickets for the current page
  const visibleTickets = lotteryTickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  );

  return (
    <div className="flex justify-center items-center py-5">
      <div className="w-full max-w-5xl bg-white border-3 border-yellow-500 rounded-lg px-4 relative">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-4">
          Best Seller
        </h2>

        <div className="flex justify-between items-center relative">
          {/* Left Arrow */}
          {startIndex > 0 && (
            <button
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200 absolute left-5 transform -translate-x-full"
              onClick={handlePrev}
            >
              ❮
            </button>
          )}

          <div className="flex space-x-2 justify-center items-stretch w-full">
            {visibleTickets.map((data, index) => {
              // Determine the gradient color based on the lottery type
              const gradientStyle =
                data.type === "Rajshree"
                  ? "bg-gradient-to-r from-red-300 to-red-500"
                  : data.type === "Dear"
                  ? "bg-gradient-to-r from-yellow-300 to-yellow-500":"bg-gradient-to-r from-yellow-300 to-yellow-500"
                  ; // Default to Rajshree if type is unknown

              return (
                <div
                  key={index + startIndex}
                  className="max-w-1/3 bg-white rounded-lg shadow-md p-1 border-2 border-dashed border-yellow-400 flex flex-col justify-between"
                  style={{ width: "125px" }}
                >
                  <div className="text-center text-sm font-bold text-gray-700 mb-1">
                    <h1 className="uppercase tracking-wide text-yellow-500">
                      {data.name.length <= 9
                        ? data.name
                        : data.name.slice(0, 8) + "..."}
                    </h1>
                  </div>
                  <div
                    className={`${gradientStyle} p-1 rounded-md shadow-inner mb-2 text-center`}
                  >
                    <span className={data.type === "Dear" ? "text-green-600":"text-white"}>{data.winningAmount}</span>
                    <p className="text-[7px] font-semibold text-gray-800">
                      Draw Date: {data.drawDate}
                    </p>
                    <p className="text-[7px] font-semibold text-gray-800">
                      Ticket Price: ₹{data.prize}
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => handleBuy(data._id)}
                      className="w-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-medium py-1 px-2 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 text-xs"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          {startIndex + ticketsPerPage < lotteryTickets.length && (
            <button
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200 absolute right-5 transform translate-x-full"
              onClick={handleNext}
            >
              ❯
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LotteryTicketCard;
