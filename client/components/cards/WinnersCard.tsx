import React from "react";
interface WinnerCardProps {
    name: string;
    drawDate: string;
    number: string;  // or number if it's a number
    prize: string;
  }
const LotteryTicketCard: React.FC<WinnerCardProps> = ({name, drawDate, number, prize }) => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-full max-w-sm bg-gradient-to-br from-yellow-100 to-yellow-300 border border-yellow-500 rounded-xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="text-center">
          <h1 className="uppercase text-lg font-bold text-yellow-600 tracking-wider mb-2">
            {name}
          </h1>
        </div>

        {/* Ticket Number */}
        <div className="bg-white border border-yellow-400 border-dashed p-4 rounded-lg shadow-md text-center mb-4">
          <p className="text-sm text-gray-500">Ticket Number</p>
          <p className="text-2xl font-extrabold text-gray-800 tracking-wide">
            #{number}
          </p>
        </div>

        {/* Prize Information */}
        <div className="text-center bg-yellow-500 text-white rounded-lg py-3 px-2 shadow-lg">
          <p className="text-lg font-bold">Grand Prize</p>
          <p className="text-3xl font-extrabold">{prize}</p>
          <p className="text-sm mt-1">Draw Date: <span className="font-semibold">{drawDate}</span></p>
        </div>

        {/* VIP Tag */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xs">VIP</span>
        </div>
      </div>
    </div>
  );
};

export default LotteryTicketCard;
