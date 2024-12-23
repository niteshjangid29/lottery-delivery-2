'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import img from "../public/images/noOrderHistory.png";

const OrderHistory: React.FC = () => {
  const orderHistory = useSelector(
    (state: RootState) => state.order.orderHistory
  );
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-center">
        <h1 className="text-lg font-semibold">Order History</h1>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto p-4">
        {orderHistory.length > 0 ? (
          orderHistory.map((order, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-4 rounded-md shadow-md"
              onClick={() => router.push(`/history/${index}`)}
            >
              {/* Order Details */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Order #{index + 1}</h2>
                {/* <p className="text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p> */}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 font-bold text-green-600 ">
                  ₹{order.totalAmount} 
                <span className="text-sm text-gray-500 ml-4">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
                </p>
              </div>

              {/* Lotteries in the Order */}
              {order.orders.map((lottery, lotteryIndex) => {
                // Calculate total ticket count
                const totalTicketCount = lottery.tickets.reduce(
                  (sum, ticket) => sum + ticket.count,
                  0
                );

                // Calculate investment
                const investment = totalTicketCount * lottery.price;

                return (
                  <div
                    key={lotteryIndex}
                    className="bg-gray-50 p-3 mb-2 rounded-md shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-semibold">
                        {lottery.lotteryName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Draw Date: {new Date(lottery.drawDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-500">
                        Investment: ₹{investment}
                      </p>
                      <p className="text-sm text-gray-500">Result: Pending</p>
                      <p className="text-sm text-gray-500">Rewards: ₹0</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div
            className="flex-1 flex flex-col items-center justify-center"
            style={{ marginTop: '150px' }}
          >
            <Image
              src={img}
              alt="No Order Detail"
              className="max-w-200 mb-4"
              style={{ height: '200px', width: '200px' }}
            />
            <p className="text-sm text-gray-500">No order details found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
