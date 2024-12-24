"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lottery } from "../../utils/data/lotteryData";
import Slider from "@mui/material/Slider";
import { FaFilter } from "react-icons/fa";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const LotteryTicketCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const lotteryState = useSelector((state: RootState) => state.lotteries.searchLotteries);

  const searchTerm = searchParams?.get("search") || "";

  const [tickets, setTickets] = useState<Lottery[]>(lotteryState);
  const [sliderValue, setSliderValue] = useState<number>(
    lotteryState.length ? Math.max(...lotteryState.map((ticket: any) => Number(ticket.prize))) : 0
  );
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleBuy = (id: string) => {
    router.push(`/lottery/${id}`);
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setSliderValue(value);
    }
  };

  const toggleSlider = () => {
    setShowSlider((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowSlider(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filteredLotteryState = lotteryState.filter((ticket:any) => 
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(searchTerm)
    setTickets(filteredLotteryState);
    
    if (filteredLotteryState.length) {
      setSliderValue(Math.max(...filteredLotteryState.map((ticket: any) => Number(ticket.prize))));
    }
  }, [lotteryState, searchTerm]); 

  const filteredTickets = tickets.filter(
    (ticket) => Number(ticket.prize) <= sliderValue
  );

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
                min={Math.min(...lotteryState.map((ticket: any) => Number(ticket.prize)))}
                max={Math.max(...lotteryState.map((ticket: any) => Number(ticket.prize)))}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
              />
            </div>
          )}
        </div>

        {/* Lottery Tickets */}
        {filteredTickets.length > 0 ? (
          Array.from({ length: Math.ceil(filteredTickets.length / 3) }).map(
            (_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex justify-between space-x-2 mb-4"
              >
                {filteredTickets
                  .slice(rowIndex * 3, (rowIndex + 1) * 3)
                  .map((ticket, index) => (
                    <div
                      key={index + rowIndex * 3}
                      className="w-1/3 bg-white rounded-lg shadow-md p-2 relative border-2 border-dashed border-yellow-400"
                    >
                      <div className="text-center text-sm font-bold text-gray-700 mb-1">
                        <h1 className="uppercase tracking-wide text-yellow-500">
                          {ticket.name.length <= 10
                            ? ticket.name
                            : ticket.name.slice(0, 9) + "..."}
                        </h1>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-1 rounded-md shadow-inner mb-2 text-center">
                        <span className="text-green-600">{ticket.winningAmount}</span>
                        <p className="text-[7px] font-semibold text-gray-800">
                          Draw Date: {ticket.drawDate}
                        </p>
                        <p className="text-[7px] font-semibold text-gray-800">
                          Ticket Price: ₹{ticket.prize}
                        </p>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() => handleBuy(ticket._id)}
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
    </div>
  );
};

export default LotteryTicketCard;
