"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LotteryState } from "../../utils/data/lotteryData";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
const LotteryTicketCard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const lotteryState = useSelector((state: RootState) => state.lotteries) as LotteryState;
  const lotteryTickets = Object.values(lotteryState.alllotteries)
  const ticketsPerPage = 3;
  const router = useRouter();

  const handleNext = () => {
    if (startIndex + ticketsPerPage < lotteryTickets.length) {
      setStartIndex(startIndex + ticketsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - ticketsPerPage >= 0) {
      setStartIndex(startIndex - ticketsPerPage);
    }
  };

  const handleBuy = (id: string) => {
    console.log("Buy Now");
    router.push(`/lottery/${id}`);
  };

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
            {visibleTickets.map((data, index) => (
              <div
                key={index + startIndex}
                className="max-w-1/3 bg-white rounded-lg shadow-md p-1 border-2 border-dashed border-yellow-400 flex flex-col justify-between"
                style={{ width: "125px"}}
              >
                <div className="text-center text-sm font-bold text-gray-700 mb-1">
                  <h1 className="uppercase tracking-wide text-yellow-500">
                    {data.name.length <= 9
                      ? data.name
                      : data.name.slice(0, 8) + "..."}
                  </h1>
                </div>
                <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-1 rounded-md shadow-inner mb-2 text-center">
                  <span className="text-green-600">{data.winningAmount}</span>
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
            ))}
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
