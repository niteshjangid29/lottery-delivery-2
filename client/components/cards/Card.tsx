"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LotteryState, Lottery } from "../../utils/data/lotteryData";
import Slider from "@mui/material/Slider";
import { FaFilter } from "react-icons/fa";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const LotteryTicketCard = () => {
  const router = useRouter();
  const lotteryState = useSelector((state: RootState) => state.lotteries) as LotteryState;
  const lottery = Object.values(lotteryState.alllotteries);
  const isRetailer = useSelector((state: RootState) => state.retailer.isRetailer);
  const ID = useSelector((state: RootState) => state.retailer.id);
  const retailerTicket = useSelector((state: RootState) => state.retailer.lotteries);
  const mergeTickets = [...lottery, ...retailerTicket];

  const [sliderValue, setSliderValue] = useState<number>(Math.max(...mergeTickets.map((ticket) => Number(ticket.prize))));
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false); // State to toggle all items
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleBuy = (id: string) => {
    router.push(isRetailer ? `/${ID}/lottery/${id}` : `/lottery/${id}`);
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setSliderValue(value);
    }
  };

  const toggleSlider = () => {
    setShowSlider((prev) => !prev);
  };

  const showAll = () => {
    setShowAllItems(true); // Show all tickets
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowSlider(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter tickets based on the prize value from slider
  const filteredRetailerTickets = retailerTicket.filter(
    (ticket) => Number(ticket.prize) <= sliderValue
  );
  const filteredLotteryTickets = lottery.filter(
    (ticket) => Number(ticket.prize) <= sliderValue
  );
  
  const filteredTickets = [...filteredRetailerTickets, ...filteredLotteryTickets];
  
  // Determine tickets to display based on showAllItems state
  const visibleTickets = showAllItems
  ? filteredTickets
  : filteredTickets.slice(0, 12);

  // Function to get the appropriate gradient color based on lottery type
  const getGradientColor = (lotteryType: string) => {
    if (lotteryType === "Rajshree") {
      return "bg-gradient-to-r from-yellow-300 to-yellow-500";
    } else if (lotteryType === "Dreamone") {
      return "bg-gradient-to-r from-red-300 to-red-500"; // Red gradient for Dreamone
    } else {
      return "bg-gradient-to-r from-yellow-300 to-yellow-500"; // Default to yellow gradient if unknown
    }
  };
  
  // Function to get the appropriate text color based on lottery type
  const getTextColor = (lotteryType: string) => {
    if (lotteryType === "Dreamone") {
      return "text-white"; // White text for Dreamone (red gradient)
    }
    return "text-gray-700"; // Default text color for other lotteries
  };

  return (
    <div className="flex justify-center items-center py-5">
      <div className="w-full max-w-5xl bg-white border-3 border-yellow-500 rounded-lg px-4">
        {/* Filter Button */}
        <div
          className="flex justify-end items-center mb-4 relative z-40 opacity-90"
          ref={filterRef}
        >
          <button
            onClick={toggleSlider}
            className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <FaFilter className="mr-2" /> Filter
          </button>
          {showSlider && (
            <div
              className="absolute top-10 right-0 bg-white shadow-lg px-4 py-2 rounded-lg border border-gray-200 w-50"
              ref={dropdownRef}
            >
              <p className="text-gray-700 font-thin text-xs">
                Filter by Price: ₹{sliderValue}
              </p>
              <Slider
                value={sliderValue}
                min={Math.min(...mergeTickets.map((ticket) => Number(ticket.prize)))}
                max={Math.max(...mergeTickets.map((ticket) => Number(ticket.prize)))}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
              />
            </div>
          )}
        </div>

        {/* Retailer Tickets */}
        {isRetailer && <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Retailer Special</h2>
          {filteredRetailerTickets.length > 0 ? (
            Array.from({ length: Math.ceil(filteredRetailerTickets.length / 3) }).map(
              (_, rowIndex) => (
                <div
                  key={`retailer-row-${rowIndex}`}
                  className="flex justify-between space-x-2 mb-4"
                >
                  {filteredRetailerTickets
                    .slice(rowIndex * 3, (rowIndex + 1) * 3)
                    .map((data, index) => (
                      <div
                        key={data._id || `retailer-${rowIndex}-${index}`} 
                        className="w-1/3 bg-white rounded-lg shadow-md p-2 relative border-2 border-dashed border-yellow-400"
                      >
                        <div className="text-center text-sm font-bold mb-1">
                          <h1 className={`uppercase tracking-wide ${getTextColor(data.name)}`}>
                            {data.name.length <= 10
                              ? data.name
                              : data.name.slice(0, 9) + "..." }
                          </h1>
                        </div>
                        <div className={`${data.type==="Dreamone" ? "bg-gradient-to-r from-red-300 to-red-500":"bg-gradient-to-r from-yellow-300 to-yellow-500"} p-1 rounded-md shadow-inner mb-2 text-center`}>
                          <span className={data.type === "Dreamone" ? "text-white" : "text-green-600"}>{data.winningAmount}</span>
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
              )
            )
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No retailer products available.
            </p>
          )}
        </div>}

        {/* Lottery Tickets */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Lottery Tickets</h2>
          {visibleTickets.length > 0 ? (
            Array.from({ length: Math.ceil(visibleTickets.length / 3) }).map(
              (_, rowIndex) => (
                <div
                  key={`lottery-row-${rowIndex}`}
                  className="flex justify-between space-x-2 mb-4"
                >
                  {visibleTickets
                    .slice(rowIndex * 3, (rowIndex + 1) * 3)
                    .map((data) => (
                      <div
                        key={`lottery-${data._id}`}
                        className="w-1/3 bg-white rounded-lg shadow-md p-2 relative border-2 border-dashed border-yellow-400"
                      >
                        <div className="text-center text-sm font-bold mb-1">
                          <h1 className={`uppercase tracking-wide ${getTextColor(data.name)}`}>
                            {data.name.length <= 10
                              ? data.name
                              : data.name.slice(0, 9) + "..." }
                          </h1>
                        </div>
                        <div className={`${data.type==="Dreamone" ? "bg-gradient-to-r from-red-300 to-red-500":"bg-gradient-to-r from-yellow-300 to-yellow-500"} p-1 rounded-md shadow-inner mb-2 text-center`}>
                          <span className={data.type === "Dreamone" ? "text-white" : "text-green-600"}>{data.winningAmount}</span>
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
              )
            )
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No tickets available under the selected price range.
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          {!showAllItems && (
            <button
              onClick={showAll}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Show All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LotteryTicketCard;
