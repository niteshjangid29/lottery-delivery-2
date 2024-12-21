'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import img from "../public/images/noOrderHistory.png"
const OrderHistory: React.FC = () => {
  const orderHistory = useSelector(
    (state: RootState) => state.order.orderHistory
  );
  const router = useRouter();
console.log(orderHistory)
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-center">
        <h1 className="text-lg font-semibold">Order History</h1>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto p-4" >
        {orderHistory.length > 0 ? (
          orderHistory.map((order, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-4 rounded-md shadow-md"
              onClick={() => router.push(`/history/${index}`)}
            >
              {/* Order Details */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Order #{index + 1}</h2>
                <p className="text-sm text-gray-500">
                  Order Date:{' '}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 font-bold text-green-600">
                  Total: ₹{order.totalAmount}
                </p>
              </div>

              {/* Lotteries in the Order */}
              {order.orders.map((lottery, lotteryIndex) => (
                <div
                  key={lotteryIndex}
                  className="bg-gray-50 p-3 mb-2 rounded-md shadow-sm"
                >
                  <h3 className="text-md font-semibold">
                    {lottery.lotteryName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Draw Date:{' '}
                    {new Date(lottery.drawDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ₹{lottery.price}
                  </p>

                  {/* Tickets in the Lottery */}
                  {lottery.tickets.map((ticket, ticketIndex) => (
                    <div
                      key={ticketIndex}
                      className="flex items-center justify-between bg-white p-2 mb-1 rounded-md"
                    >
                      <p className="text-sm text-gray-700">
                        Ticket Number: {ticket.ticket}
                      </p>
                      <p className="text-sm text-gray-500">
                        Count: {ticket.count}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center" style={{marginTop: '150px'}}>
            <Image
              src={img}
              alt="No Order Detail"
              className="max-w-200 mb-4"
              style={{ height: '200px',width: '200px' }}
            />
            <p className="text-sm text-gray-500">No order details found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
