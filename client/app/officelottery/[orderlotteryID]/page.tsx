'use client';
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Ticket {
  ticket: string;
  count: number;
}

// Lottery interface
interface Lottery {
  id: string;
  retailerID: string;
  lotteryName: string;
  drawDate: string;
  type: string;
  price: number;
  tickets: Ticket[];
}

// API Order interface (from the API response)
interface Order {
  _id: string;
  orderDate: string;
  totalAmount: number;
  orders: Lottery[];
}

const TicketDetails = () => {
  const router = useRouter();
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const user = useSelector((state: RootState) => state.user);
  const params = useParams();
  const [order, setOrder] = React.useState<Order | null>(null);
  const { orderlotteryID } = params;

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ data: Order[] }>(
          `${process.env.NEXT_PUBLIC_BACKEND_LINK}/userAllOrder`,
          {
            params: {
              phone: user.phoneNo,
            },
          }
        );

        const orders = response.data.data.filter(order => 
          order._id===orderlotteryID
        );
        console.log(orders);
        setOrder(orders[0]);
      } catch (e) {
        console.error('Error in fetching orders:', e);
      }
    };

    fetchOrders();
  }, [isLogin, router, user.phoneNo]);

  const handleOrder = () => {
    router.push('/lottery');
  };
  console.log(order);
  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>
    <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto flex flex-col h-full">
      {!order ? (
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Ticket Found</h1>
          <p className="text-gray-600">
            No such ticket exists for this user. Please try with the correct user ID.
          </p>
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg"
            onClick={() => router.push('/draw/results')}
          >
            Verify Another Ticket
          </button>
        </div>
      ) : (
        <div
          className="relative bg-white shadow-lg rounded-lg w-full max-w-4xl py-10 px-12"
          style={{
            backgroundImage: `url('/punjab.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg pointer-events-none"></div>

          <div className="relative">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="text-green-600">
                <FaCheckCircle size={50} />
              </div>
              <h1 className="text-2xl font-bold mt-4 text-gray-800">
                Ticket Successfully Verified
              </h1>
              <p className="text-gray-600 mt-2">Certificate for Ticket Authorization</p>
            </div>

            {/* Form Content */}
            <form className="space-y-8">
              {/* User Information */}
              <fieldset className="border border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold text-gray-700 px-2">User Information</legend>
                <div className="space-y-4 mt-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium text-gray-800">Name:</span>
                    <span className="text-gray-700">{user.name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium text-gray-800">Email:</span>
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium text-gray-800">Phone:</span>
                    <span className="text-gray-700">{user.phoneNo}</span>
                  </div>
                </div>
              </fieldset>

              {/* Ticket Information */}
              {order.orders.map((lottery, index) => (
                <fieldset key={index} className="border border-gray-300 rounded-lg p-6 mb-6">
                    <legend className="text-lg font-semibold text-gray-700 px-2">Ticket Information - {index + 1}</legend>
                    <div className="space-y-4 mt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-800">Lottery Name:</span>
                        <span className="text-gray-700">{lottery.lotteryName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-800">Draw Date:</span>
                        <span className="text-gray-700">{lottery.drawDate}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-800">Purchase Date:</span>
                        <span className="text-gray-700">
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }).format(new Date(order.orderDate))}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-800">Price:</span>
                        <span className="text-gray-700"> ₹{lottery.price}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-800">Tickets Numbers:</span>
                        <span className="text-gray-700">
                        {lottery.tickets.map((ticket, ticketIndex) => (
                            <span key={ticketIndex} className="block">
                            {ticket.ticket}
                            </span>
                        ))}
                        </span>
                    </div>
                    </div>
                </fieldset>
                ))}


              {/* Verify Another Ticket Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg"
                  onClick={handleOrder}
                >
                  Order Another Lottery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    <div className="bg-black flex-1"></div>
    </div>);
};

export default TicketDetails;
