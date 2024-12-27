'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { MdDelete } from 'react-icons/md';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Image from 'next/image';
import noCart from '../../public/images/noCart.jpg';
import axios from 'axios';
import { ToLink } from '../page';
import { useRouter } from 'next/navigation';
const LotteryList: React.FC = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.user);
  const data = useSelector((state: RootState) => state.cart);
  console.log(dataUser,data);
  const router = useRouter();
  const phone=useSelector((state:RootState)=> state.user.phoneNo);
  const lottery = (data.items).filter((item) => (item.retailerID==="Admin"));
  const [lotteries, setLotteries] = React.useState(lottery);
  console.log(data,lottery)
  const totalAmount = lotteries.reduce((total, lottery) => {
    return (
      total +
      lottery.tickets.reduce(
        (ticketTotal, ticket) => ticketTotal + ticket.count * lottery.price,
        0
      )
    );
  }, 0);

  const handleDelete = async(lotteryId: string, ticketName: string) => {
    console.log(lotteryId, ticketName);
    dispatch({
      type: 'cart/removeTicket',
      payload: { lotteryId, ticketName },
    });
    const updatedLotteries = lotteries.map((lottery, id) => {
      if (lottery.id === lotteryId) {
        return {
          ...lottery,
          tickets: lottery.tickets.filter((ticketID, tId) => ticketID.ticket !== ticketName),
        };
      }
      return lottery;
    }).filter((lottery) => lottery.tickets.length > 0); 
      console.log(updatedLotteries);
      setLotteries(updatedLotteries);
      try {
        await axios.post(`${ToLink}/userCart`, {updatedCart:{items:updatedLotteries},phone, ID:"Admin"});
        dispatch({ type: 'user/setUserCart', payload: {items:updatedLotteries} });
        dispatch({ type: 'cart/setAllCart', payload: updatedLotteries }); 
      } catch (error:any) {
        console.error("Error adding to cart:", error.message);
      }
      
  };

  const handleOrder = async() => {
    console.log(lotteries);
    try{
      await axios.post(`${ToLink}/userOrder`, {orders:lotteries,totalAmount,orderDate:new Date().toISOString(),phone});
      await axios.post(`${ToLink}/userCart`, {updatedCart:{items:[]},phone,ID:"Admin"});
      // await axios.post(`${ToLink}/updatelotteries`, lotteries);
      // await axios.post(`${ToLink}/retailerOrder`, {orders:lotteries,totalAmount,orderDate:new Date().toISOString(),phone,ID:"Admin"});
      dispatch({ type: 'user/setUserCart', payload: {items:lotteries} });
      dispatch({
      type: 'order/placeOrder',
      payload: {
        orders: lotteries,
        totalAmount,
        orderDate: new Date().toISOString(),
      },
    });
    dispatch({
      type: 'cart/clearCart',
    });
    alert("Ordered Successfully")
    router.push("/lottery");
  }
  catch(error:any){
    console.error("Error placing order:", error.message);
  }
    
  };
  console.log(lotteries);

  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>

      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto flex flex-col h-full">
        {/* Header */}
        <div className={`${lotteries.length<=0 ? "bg-gray-100": "bg-white" } shadow-xl p-4 flex items-center`}>
          <FaArrowCircleLeft 
            className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-150 cursor-pointer"
            onClick={() => window.history.back()}
          />
          <h1 className="text-lg font-semibold flex-1 text-center">Checkout</h1>
        </div>

        {/* Content */}
        {lotteries.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-4">
            {lotteries.map((lottery, lotteryId) => (
              <div
                key={lotteryId}
                className="bg-white p-4 mb-4 rounded-md shadow-md"
              >
                {/* Lottery Details */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">{lottery.lotteryName}</h2>
                  <p className="text-sm text-gray-500">
                    Draw Date: {new Date(lottery.drawDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">Price: ₹{lottery.price}</p>
                </div>

                {/* Tickets under the lottery */}
                {lottery.tickets.map((ticket, ticketId) => (
                  <div
                    key={ticketId}
                    className="flex items-center justify-between bg-gray-50 p-3 mb-2 rounded-md shadow-sm"
                  >
                    {/* Ticket Details */}
                    <div>
                      <p className="text-sm text-gray-700">
                        Ticket Number: {ticket.ticket}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Count:</span> {ticket.count}
                      </p>
                    </div>
                    {/* Delete Button */}
                    <MdDelete
                      onClick={() => handleDelete(lottery.id, ticket.ticket)}
                      className="text-red-500 hover:text-red-700 transition duration-150 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <Image
                src={noCart}
                alt="No Cart"
                className="mx-auto mb-4"
                style={{ width: '200px', height: '200px' }}
              />
              <p className="text-sm text-gray-500">Your cart is empty!</p>
            </div>
          </div>
        )}
        { (
          <div className={`${lotteries.length<=0 ? "bg-gray-100": "bg-white" }  shadow-md p-4 flex items-center justify-between`}>
            <div className="flex flex-col items-center">
              <p className="text-green-600 font-bold text-lg">₹{totalAmount}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-md font-medium hover:bg-green-600 transition-all duration-150"
              onClick={handleOrder}
            >
              Place Order
            </button>
          </div>
        )}
      </div>

      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default LotteryList;
