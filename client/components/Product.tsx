"use client";
import React, { useState } from "react";
import { useRouter,useParams } from "next/navigation";
import { RootState } from '../redux/store';
import { addToCart,updateCart } from "../redux/slice/cartSlice";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { setUserCart } from "../redux/slice/userSlice";
import { ToLink } from "../app/page";
type Lottery = {
  _id: string;  
  name: string;
  drawDate: string;
  prize: string;
  winningAmount: string;
  alltickets: Array<{ count: number; ticket: string[] }>;
  soldTickets: Array<{ count: number; ticket: string[] }>;
  availableTickets: Array<{ count: number; ticket: string[] }>;
};

type LotteryState = {
  alllotteries: Record<string, Lottery>;
};
const LotteryTicket=() => {
  const {slug} = useParams();
  console.log(slug);
   const lotteryState = useSelector((state: RootState) => state.lotteries) as LotteryState;
  const isLogin = useSelector((state:RootState)=> state.user.isLogin)
  const phone=useSelector((state:RootState)=> state.user.phoneNo);
  const lotteryTickets = Object.values(lotteryState.alllotteries);
  const retailerTicket = useSelector((state: RootState) => state.retailer.lotteries);
  // console.log(retailerTicket[0]._id);
  const mergeTickets = [...lotteryTickets, ...retailerTicket];
  const currLottery=mergeTickets.filter((lottery)=>(lottery._id)==slug);
  console.log(currLottery);
  const [ticketCount, setTicketCount] = useState<number>(currLottery[0].availableTickets[0].count);
  const data = useSelector((state: RootState) => state.cart);
  const lotteries = data.items;
  const cartLottery = lotteries.find((lottery) => lottery.id === (currLottery[0]._id));
  console.log(cartLottery?.tickets);
  const [selectedTickets, setSelectedTickets] = useState<{ ticket: string; count: number }[]>(cartLottery?.tickets ||[]);
  const router = useRouter();
  const isRetailer = useSelector((state: RootState) => state.retailer.isRetailer);
  const ID = useSelector((state: RootState) => state.retailer.id);
  const userCart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const getTicketsByQuantity = (count: number) => {
    const data = currLottery[0].availableTickets.find((item) => item.count === count);
    return data ? data.ticket : [];
  };

  const [ticketNumbers, setTicketNumbers] = useState<string[]>(getTicketsByQuantity(currLottery[0].availableTickets[0].count));

  const handleTicketSelection = (count: number) => {
    setTicketCount(count);
    setTicketNumbers(getTicketsByQuantity(count));
  };

  const toggleTicketSelection = (ticket: string) => {
    const ticketIndex = selectedTickets.findIndex((t) => t.ticket === ticket);

    if (ticketIndex >= 0) {
      const updatedTickets = selectedTickets.filter((t) => t.ticket !== ticket);
      setSelectedTickets(updatedTickets);
    } else {
      setSelectedTickets([...selectedTickets, { ticket, count: ticketCount }]);
    }
  };

  const removeTicket = (ticket: string) => {
    const updatedTickets = selectedTickets.filter((t) => t.ticket !== ticket);
    setSelectedTickets(updatedTickets);
  };

  const addToCartHandler = async() => {
    if (!isLogin) {
      router.push(isRetailer ? `/${ID}/login`:'/login');
      return;
    }
  
    let updatedCart;
  
    if (cartLottery) {
      // Update the existing lottery's tickets
      updatedCart = {
        ...userCart,
        items: userCart.items.map((item) =>
          item.id === currLottery[0]._id
            ? { ...item, tickets: selectedTickets }
            : item
        ),
      };
  
      dispatch(updateCart({ lotteryId: currLottery[0]._id, updatedTickets: selectedTickets }));
    } else {
      // Add a new lottery to the cart
      const newLottery = {
        id: currLottery[0]._id,
        lotteryName: currLottery[0].name,
        drawDate: currLottery[0].drawDate,
        price: Number(currLottery[0].prize),
        tickets: selectedTickets,
      };
  
      updatedCart = {
        ...userCart,
        items: [...userCart.items, newLottery],
      };
  
      dispatch(addToCart(newLottery));
    }
  
    console.log(updatedCart);
    try {
      await axios.post(`${ToLink}/userCart`, {updatedCart,phone});
    } catch (error:any) {
      console.error("Error adding to cart:", error.message);
    }

    dispatch(setUserCart(updatedCart));
  
    setSelectedTickets([]);
    router.push(isRetailer ? `/${ID}/cart`:"/cart");
  };
  

  const initialRows = 5;
  const [visibleRows, setVisibleRows] = useState<number>(initialRows);
  const rows = Math.ceil(ticketNumbers.length / 4);
  const rowsToDisplay = Math.min(visibleRows, rows);

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 3);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{currLottery[0].name}</h2>
      <p className="text-gray-600">Price per ticket: ₹{Number(currLottery[0].prize).toFixed(2)}</p>
      <p className="text-gray-500">Draw Date: {currLottery[0].drawDate}</p>

      <div className="mt-4">
        <p className="text-gray-700 font-medium">Select number of tickets:</p>
        <div className="flex justify-center space-x-4 mt-2">
          {currLottery[0].availableTickets.map((data,id) => (
            <button
              key={id}
              className={`py-1 px-3 rounded-md text-sm font-medium ${
                ticketCount === data.count
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400 hover:text-white`}
              onClick={() => handleTicketSelection(data.count)}
            >
              {data.count}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-700 font-medium">Available ticket numbers:</p>
        <div className="mt-2 flex flex-col items-center">
          {Array.from({ length: rowsToDisplay }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-4 mb-2">
              {ticketNumbers
                .slice(rowIndex * 4, (rowIndex + 1) * 4)
                .map((number, index) => (
                  <button
                    key={index + rowIndex * 3}
                    className={`py-2 px-4 rounded-full text-sm shadow-md border ${
                      selectedTickets.some((ticket) => ticket.ticket === number)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    } hover:bg-green-400 hover:text-white`}
                    onClick={() => toggleTicketSelection(number)}
                  >
                    {number}
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>

      {visibleRows < rows && (
        <div className="mt-4 text-center">
          <button
            onClick={handleShowMore}
            className="text-blue-500 hover:text-blue-700"
          >
            Show More
          </button>
        </div>
      )}

      <div className="mt-8">
        <p className="text-xl text-gray-700 font-medium">Selected tickets:</p>
        {selectedTickets.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {selectedTickets.map((ticket, index) => (
              <li
                key={index}
                className="relative flex items-start px-4 py-1 bg-gray-100 rounded-lg shadow-md border-dotted border-2 border-blue-300"
              >
                {/* Cross Button */}
                <button
                  className="absolute text-lg -top-2 -right-1 text-red-500 hover:text-red-700"
                  onClick={() => removeTicket(ticket.ticket)}
                >
                  <MdDelete/>
                </button>

                {/* Ticket Details */}
                <div>
                  <span className="text-xl font-bold text-gray-800">{ticket.ticket}</span>
                  <p className="text-md font-medium text-gray-500">Draw Date: {currLottery[0].drawDate}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md font-medium text-gray-600">
                    Tickets: {ticket.count}
                  </p>
                  <p className="text-md font-medium text-gray-600">
                    Price: ₹{(Number(currLottery[0].prize) * ticket.count).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tickets selected.</p>
        )}
      </div>

      <div className="mt-6 flex justify-between space-x-4">
        <button
          className={`w-full py-2 px-4 rounded-md shadow-md ${
            selectedTickets.length > 0
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={selectedTickets.length === 0}
          onClick={() => alert("Proceeding to Buy Now!")}
        >
          Buy Now for ₹
          {(Number(currLottery[0].prize) * selectedTickets.reduce((acc, item) => acc + item.count, 0)).toFixed(2)}
        </button>
        <button
          className={`w-full py-2 px-4 rounded-md shadow-md ${
            selectedTickets.length > 0
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={selectedTickets.length === 0}
          onClick={addToCartHandler}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default LotteryTicket;
