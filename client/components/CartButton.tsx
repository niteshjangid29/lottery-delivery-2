'use client';
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

const CartViewButton = () => {
    const isRetailer= useSelector((state:RootState)=> state.retailer.isRetailer);
    const ID= useSelector((state:RootState)=> state.retailer.id);
    const isLogin=useSelector((state:RootState)=> state.user.isLogin);
    const router=useRouter();
    const handleCart=()=>{
      if(!isLogin){
        router.push(isRetailer ? `/${ID}:/login`:"/login");}
      else{
      router.push(isRetailer ? `/${ID}/cart`:"/cart");
      }
    }
  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-50">
      <button
        onClick={handleCart}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 "
      >
        {/* Cart Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2m0 0L7 13h10l1.6-8H5.4m-2-2L5.4 4m5 13a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
        {/* Label */}
        <span className="font-semibold">View Cart</span>
        
        {/* Item Count */}
        <span className="ml-2 bg-green-600 text-white text-sm font-bold rounded-full px-2 py-2 ">
          <FaArrowRight/>
        </span>
      </button>
    </div>
  );
};

export default CartViewButton;
