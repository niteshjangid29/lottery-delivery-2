'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import img from "../public/images/noOrderHistory.png";
import { getAllOrders } from '../utils/API/settingorder';
const OrderHistory: React.FC = () => {
  const ID = useSelector((state: RootState) => state.retailer.id) || "Admin";
  const phoneNumber = useSelector((state: RootState) => state.user.phoneNo);
  // useEffect(() =>{
  //   getAllOrders(phoneNumber,ID);
  // },[]);
  const isRetailer = useSelector((state: RootState) => state.retailer.isRetailer);
  const orderHistory = useSelector((state: RootState) => state.order.orderHistory);
  const router = useRouter();
  console.log(ID,orderHistory);
  // Filter orders to include only those belonging to the logged-in retailer
  const filteredOrderHistory = orderHistory.map((order) => {
    // Filter lotteries in the order that belong to the retailer
    const filteredOrders = order.orders.filter((lottery) => lottery.retailerID === ID);
    // console.log(order.orders[0].retailerID);
    // Return the order with filtered lotteries
    return { ...order, orders: filteredOrders };
  }).filter(order => order.orders.length > 0);  // Remove orders with no matching lotteries
console.log(filteredOrderHistory);
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-center">
        <h1 className="text-lg font-semibold">Order History</h1>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredOrderHistory.length > 0 ? (
          filteredOrderHistory.map((order, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-4 rounded-md shadow-md cursor-pointer"
              onClick={() =>
                router.push(
                  isRetailer
                    ? `/${ID}/history/${index}`
                    : `/history/${index}`
                )
              }
            >
              {/* Order Details */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Order #{index + 1}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 font-bold text-green-600">
                  ₹{order.totalAmount}
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
                        Price: <span className="text-blue-500">₹{investment}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Result: <span className="text-green-500">TBD</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Rewards: <span className="text-red-500">₹0</span>
                      </p>
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
