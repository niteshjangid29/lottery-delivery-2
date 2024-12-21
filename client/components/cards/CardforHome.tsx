"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import { setCurrTab } from "../../redux/slice/currTabSlice";
import { lotteryTickets } from "../../utils/data/lotteryData";

const LotteryTicketCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const tickets = (
    lotteryTickets.slice(0, 6)
  );
  const handleBuy = (id:number) => {
    console.log("Buy Now");
    router.push(`/lottery/${id}`);
  }
  const showAll = () => {
    router.push("/lottery");
    dispatch(setCurrTab("Lottery"))
  };

  const rows = Math.ceil(tickets.length / 3);

  return (
    <div className="flex justify-center items-center py-5">
      <div className="w-full max-w-5xl bg-white border-3 border-yellow-500 rounded-lg px-4">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-between space-x-2 mb-4">
            {tickets
              .slice(rowIndex * 3, (rowIndex + 1) * 3)
              .map((data, index) => (
                <div
                  key={index + rowIndex * 3}
                  className="w-1/3 bg-white rounded-lg shadow-md p-2 relative border-2 border-dashed border-yellow-400"
                >
                  <div className="text-center text-sm font-bold text-gray-700 mb-1">
                    <h1 className="uppercase tracking-wide text-yellow-500">
                      {data.name.length <= 10
                        ? data.name
                        : data.name.slice(0, 9) + "..."}
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
                    <button onClick={()=>handleBuy(index+1+(rowIndex*3))} className="w-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-medium py-1 px-2 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 text-xs">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
          <div className="flex justify-center mt-4">
            <button
              onClick={showAll}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Show More
            </button>
          </div>
      </div>
    </div>
  );
};

export default LotteryTicketCard;
