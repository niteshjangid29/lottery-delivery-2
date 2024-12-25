'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { RootState } from '../../../../redux/store';
import { FaArrowCircleLeft } from "react-icons/fa";
import Image from 'next/image';
import noOrderImg from "../../../../public/images/noOrderDetail.avif";

const OrderDetail: React.FC = () => {
  const { orderID } = useParams();
  const router = useRouter();
  const orderHistory = useSelector(
    (state: RootState) => state.order.orderHistory
  );

  const order = orderHistory[Number(orderID)];

  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>
      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto flex flex-col h-full">
        {/* Header */}
        <div className="bg-white shadow-md p-4 flex items-center">
          <FaArrowCircleLeft
            className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-150 cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-lg font-semibold flex-1 text-center">Order Detail</h1>
        </div>

        {/* Order Details */}
        {order ? (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-white p-4 mb-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-1">Order #{Number(orderID) + 1}</h2>
              <p className="text-sm text-gray-500 font-bold text-green-600 ">
                  ₹{order.totalAmount} 
                <span className="text-sm text-gray-500 ml-4">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
                </p>
            </div>

            {/* Lotteries in the Order */}
            {order.orders.map((lottery, lotteryIndex) => (
              <div
                key={lotteryIndex}
                className="bg-gray-50 p-3 mb-4 rounded-md shadow-sm"
              >
                 <div className="flex justify-between items-center">
                      <h3 className="text-md font-semibold">
                        {lottery.lotteryName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Draw Date: {new Date(lottery.drawDate).toLocaleDateString()}
                      </p>
                    </div>
                <p className="text-sm text-gray-500">Price: ₹{lottery.price}</p>

                {/* Tickets */}
                {lottery.tickets.map((ticket, ticketIndex) => (
                  <div
                    key={ticketIndex}
                    className="flex items-center justify-between bg-white p-2 mb-1 rounded-md"
                  >
                    <p className="text-sm text-gray-700">
                      Ticket No.: {ticket.ticket}
                    </p>
                    <p className="text-sm text-gray-700">
                      Price: {ticket.count * lottery.price}
                    </p>
                    <p className="text-sm text-gray-500">Count: {ticket.count}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
            <Image
              src={noOrderImg}
              alt="No Order Detail"
              className="max-w-200 mb-4"
              style={{ height: '200px',width: '200px' }}
            />
            <p className="text-sm text-gray-500">No order details found.</p>
          </div>
        )}
      </div>
      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default OrderDetail;
