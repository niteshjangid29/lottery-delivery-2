"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrTab } from "../../redux/slice/currTabSlice";
import { RootState } from "../../redux/store";
import { LotteryState } from "../../utils/data/lotteryData";

const LotteryTicketCard: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const lotteryState = useSelector((state: RootState) => state.lotteries) as LotteryState;
  const lottery = Object.values(lotteryState.alllotteries).slice(0, 6);
  const isRetailer = useSelector((state: RootState) => state.retailer.isRetailer);
  const ID = useSelector((state: RootState) => state.retailer.id);

  const handleBuy = (id: string): void => {
    console.log("Buy Now", id);
    router.push(isRetailer ? `/${ID}/lottery/${id}` : `/lottery/${id}`);
  };

  const showAll = (): void => {
    router.push("/lottery");
    dispatch(setCurrTab("Lottery"));
  };

  if (!lottery || lottery.length === 0) {
    return (
      <div className="flex justify-center items-center py-5">
        <div className="text-center text-gray-500">No lotteries available at the moment.</div>
      </div>
    );
  }

  const rows = Math.ceil(lottery.length / 3);

  // Function to get the appropriate gradient color based on lottery type
  const getGradientColor = (lotteryType: string) => {
    if (lotteryType === "Rajshree") {
      return "bg-gradient-to-r from-yellow-300 to-yellow-500";
    } else if (lotteryType === "Dreamone") {
      return "bg-gradient-to-r from-red-300 to-red-500";
    } else {
      return "bg-gradient-to-r from-yellow-300 to-yellow-500"; // Default to yellow gradient if unknown
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-yellow-600 mt-6">
        Categories
      </h2>
      <div className="flex justify-center items-center py-5">
        <div className="w-full max-w-5xl bg-white border-3 border-yellow-500 rounded-lg px-4">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-between space-x-2 mb-4">
              {lottery.slice(rowIndex * 3, (rowIndex + 1) * 3).map((data) => {
                // Determine the gradient color based on the lottery type
                const gradientStyle = getGradientColor(data.type);

                return (
                  <div
                    key={data._id}
                    className="w-1/3 bg-white rounded-lg shadow-md p-2 relative border-2 border-dashed border-yellow-400"
                  >
                    <div className="text-center text-sm font-bold text-gray-700 mb-1">
                      <h1 className="uppercase tracking-wide text-yellow-500">
                        {data.name.length <= 10
                          ? data.name
                          : data.name.slice(0, 9) + "..."}
                      </h1>
                    </div>
                    <div
                      className={`${gradientStyle} p-1 rounded-md shadow-inner mb-2 text-center`}
                    >
                      {/* Apply white text for Dreamone type, otherwise keep default color */}
                      <span className={data.type === "Dreamone" ? "text-white" : "text-green-600"}>
                        {data.winningAmount || "N/A"}
                      </span>
                      <p className="text-[7px] font-semibold text-black">
                        Draw Date: {data.drawDate}
                      </p>
                      <p className="text-[7px] font-semibold text-black">
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
          ))}
          <div className="flex justify-center mt-4">
            <button
              onClick={showAll}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Show All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LotteryTicketCard;
