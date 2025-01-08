'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { MdDelete } from 'react-icons/md';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Image from 'next/image';
import noCart from '../../public/images/noCart.jpg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getalllotteries } from "../../utils/API/filteringlottery";
import jsPDF from 'jspdf';
import QRCode from '../../components/QRCode';
import html2canvas from "html2canvas";
import ReactDOM from "react-dom/client";


const LotteryList: React.FC = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.user);
  const data = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const phone = useSelector((state: RootState) => state.user.phoneNo);
  const lottery = data.items.filter((item) => item.retailerID === "Admin");
  const [lotteries, setLotteries] = React.useState(lottery);
  const [showModal, setShowModal] = useState(false);

  const totalAmount = lotteries.reduce((total, lottery) => {
    return (
      total +
      lottery.tickets.reduce(
        (ticketTotal, ticket) => ticketTotal + ticket.count * lottery.price,
        0
      )
    );
  }, 0);

  const handleDelete = async (lotteryId: string, ticketName: string) => {
    dispatch({
      type: 'cart/removeTicket',
      payload: { lotteryId, ticketName },
    });
    const updatedLotteries = lotteries.map((lottery) => {
      if (lottery.id === lotteryId) {
        return {
          ...lottery,
          tickets: lottery.tickets.filter((ticket) => ticket.ticket !== ticketName),
        };
      }
      return lottery;
    }).filter((lottery) => lottery.tickets.length > 0);

    setLotteries(updatedLotteries);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/userCart`, {
        updatedCart: { items: updatedLotteries },
        phone,
        ID: "Admin",
      });
      dispatch({ type: 'user/setUserCart', payload: { items: updatedLotteries } });
    } catch (error: any) {
      console.error("Error updating cart:", error.message);
    }
  };

  const handleOrder = async (deliveryOption: string) => {
    // if (deliveryOption === "home") {
    //   console.log(lotteries);
    try{
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/userOrder`, {orders:lotteries,totalAmount,orderDate:new Date().toISOString(),phone});
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/userCart`, {updatedCart:{items:[]},phone,ID:"Admin"});
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/updatelotteries`, {lotteries,ID:"Admin"});
      // await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/retailerOrder`, {orders:lotteries,totalAmount,orderDate:new Date().toISOString(),phone,ID:"Admin"});
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
    alert("Ordered Successfully");
    if (deliveryOption === "office") 
      {
        const certificate = document.createElement('div');
        certificate.style.width = '595px';
        certificate.style.padding = '5px';
        certificate.style.background = '#fff';
        certificate.style.fontFamily = 'Arial, sans-serif';
        certificate.style.boxSizing = 'border-box';
        certificate.style.position = 'absolute';
        certificate.style.top = '-9999px';
        document.body.appendChild(certificate);

        const root = ReactDOM.createRoot(certificate);

        root.render(
          <div className="py-10 px-2 bg-white shadow-md rounded-lg">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">Ticket Purchase Certificate</h1>
              <p className="text-sm text-gray-500 mt-1">Official Confirmation of Purchase</p>
            </div>

            {/* Beneficiary Details */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
                Beneficiary Details
              </h2>
              <div className="text-sm text-gray-700">
                <p className="mb-2">
                  <span className="font-medium">Name:</span> {dataUser?.name}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Email:</span> {dataUser?.email}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Phone:</span> {dataUser?.phoneNo}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Address:</span> {dataUser?.address}
                </p>
              </div>
            </div>

            {/* Ticket Information */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
                Ticket Information
              </h2>
              {lotteries.map((lottery) => (
                <div key={lottery.id} className="mb-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">
                    {lottery.lotteryName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Draw Date:</span> {new Date(lottery.drawDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Price:</span> ₹{lottery.price}
                  </p>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tickets:</h4>
                  <div className="bg-gray-50 border rounded-lg p-4 text-sm">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {lottery.tickets.map((ticket) => (
                        <li
                          key={ticket.ticket}
                          className="bg-white border rounded-md p-2 shadow-sm"
                        >
                          Ticket Number: <span className="font-medium">{ticket.ticket}</span>
                          <br />
                          Count: <span className="font-medium">{ticket.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {/* Total Price */}
            <div className="mt-4 text-lg font-semibold text-green-600">
              Total Price: ₹
              {lotteries.reduce(
                (total, lottery) =>
                  total +
                  lottery.tickets.reduce(
                    (lotteryTotal, ticket) => lotteryTotal + ticket.count * lottery.price,
                    0
                  ),
                0
              )}
            </div>

            {/* QR Code Section */}
            <div className="text-center mt-6">
                <QRCode url={`https://www.lottog.shop/officelottery/${lotteries[0].id}`} />
                {/* <QRCode url={`http://localhost:3000/officelottery/${lotteries[0].id}`} /> */}

              <p className="text-sm text-gray-500 mt-2">
                Scan this QR code for more details
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-500 text-xs border-t pt-4">
              <p>
                Together, we verify and ensure ticket authorization.
                <br /> For assistance, contact the support team.
              </p>
            </div>
          </div>

        );

        setTimeout(async () => {
          const canvas = await html2canvas(certificate, {
            scale: 2,
            useCORS: true,
          });

          
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
          });

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = pdfWidth - 20;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const adjustedHeight =
            imgHeight > pdfHeight - 20 ? pdfHeight - 20 : imgHeight;
          const adjustedWidth =
            (canvas.width * adjustedHeight) / canvas.height;
          const xOffset = (pdfWidth - adjustedWidth) / 2;
          const yOffset = (pdfHeight - adjustedHeight) / 2;

          pdf.addImage(
            imgData,
            'PNG',
            xOffset,
            yOffset,
            adjustedWidth,
            adjustedHeight
          );
          pdf.save('Invoice.pdf');

          root.unmount();
          document.body.removeChild(certificate);
        }, 500);

    }

    getalllotteries();
    
    router.push("/lottery");
  }
  catch(error:any){
    console.error("Error placing order:", error.message);
  }
     
    setShowModal(false);
  };

  return (
    <div className="h-screen flex bg-black">
    {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowModal(false)} // Close modal when clicking outside
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-80"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <h2 className="text-lg font-semibold mb-4">Choose Delivery Option</h2>
              <button
                onClick={() => handleOrder("home")}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md mb-2"
              >
                Deliver to Home
              </button>
              <button
                onClick={() => handleOrder("office")}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Office Delivery
              </button>
            </div>
          </div>
        )}


      {/* Main Content */}
      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto flex flex-col h-full">
        {/* Header */}
        <div className={`${lotteries.length <= 0 ? "bg-gray-100" : "bg-white"} shadow-xl p-4 flex items-center`}>
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
              <div key={lotteryId} className="bg-white p-4 mb-4 rounded-md shadow-md">
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
                  <div key={ticketId} className="flex items-center justify-between bg-gray-50 p-3 mb-2 rounded-md shadow-sm">
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
              <Image src={noCart} alt="No Cart" className="mx-auto mb-4" style={{ width: '200px', height: '200px' }} />
              <p className="text-sm text-gray-500">Your cart is empty!</p>
            </div>
          </div>
        )}
        {lotteries.length > 0 && (
          <div className={`${lotteries.length <= 0 ? "bg-gray-100" : "bg-white"} shadow-md p-4 flex items-center justify-between`}>
            <div className="flex flex-col items-center">
              <p className="text-green-600 font-bold text-lg">₹{totalAmount}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-md font-medium hover:bg-green-600 transition-all duration-150"
              onClick={() => setShowModal(true)}
            >
              Proceed to Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LotteryList;
