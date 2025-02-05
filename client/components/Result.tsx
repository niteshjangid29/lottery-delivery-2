'use client'
import React, { useState } from 'react';
import { lotteryResults } from '../utils/data/resultData'; 
import WinnerCard from './cards/WinnersCard';

const LotteryResult = () => {
  const [searchDate, setSearchDate] = useState(''); 
  const filteredResults = searchDate
    ? lotteryResults.filter((result) => result.firstPrize.drawDate === searchDate)
    : lotteryResults;

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 space-y-6">
    
      <div className="w-full max-w-3xl mb-6">
        <label htmlFor="dateFilter" className="block text-lg font-bold text-gray-700 mb-2">
          Search by Draw Date:
        </label>
        <input
          type="date"
          id="dateFilter"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="flex flex-wrap justify-center w-full space-y-6">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            <div
              key={index}
              className="w-full p-6 rounded-lg shadow-md bg-white space-y-6 border border-gray-300"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">{result.firstPrize.name}</h1>
                <p className="text-lg text-gray-600">Draw Date: {result.firstPrize.drawDate}</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-400 p-6 rounded-lg shadow-xl">
                <h2 className="text-4xl font-extrabold text-amber-900 tracking-wide text-center">
                  {result.firstPrize.prize}
                </h2>
                <WinnerCard
                  name={result.firstPrize.name}
                  drawDate={result.firstPrize.drawDate}
                  number={result.firstPrize.winnerNumbers[0]}
                  prize={result.firstPrize.prize}
                />
              </div>

              <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-6 rounded-lg shadow-xl">
                <h2 className="text-4xl font-extrabold text-blue-800 tracking-wide text-center">
                  {result.secondPrizes.prize}
                </h2>
                <p className="text-center text-lg text-gray-800 font-semibold mt-2">Winners</p>
                <div className="flex justify-center flex-wrap gap-2 mt-4">
                  {result.secondPrizes.winnerNumbers.map((num, idx) => (
                    <p
                      key={idx}
                      className="text-2xl font-bold text-blue-900 bg-blue-100 p-2 rounded-md"
                    >
                      {num}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 p-6 rounded-lg shadow-xl">
                <h2 className="text-4xl font-extrabold text-green-800 tracking-wide text-center">
                  {result.thirdPrizes.prize}
                </h2>
                <p className="text-center text-lg text-gray-800 font-semibold mt-2">Winners</p>
                <div className="flex justify-center flex-wrap gap-2 mt-4">
                  {result.thirdPrizes.winnerNumbers.map((num, idx) => (
                    <p
                      key={idx}
                      className="text-sm font-bold text-green-900 bg-green-100 p-2 rounded-md"
                    >
                      {num}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-5 shadow-inner">
                <h2 className="text-2xl font-bold text-gray-700 text-center">Next 50 Winners</h2>
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {result.nextWinners.map((number, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-800 bg-white p-3 rounded-md shadow text-center hover:bg-blue-100 transition-colors"
                    >
                      {number}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No results found for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default LotteryResult;
