'use client';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HowToUse from "../components/HowToUse";
import Carousel from "../components/Carousel";
import RetailerCard from "../components/cards/RetailerCard";
import { getalllotteries } from "../utils/API/filteringlottery";
import { getLocation } from "../utils/API/location";
import { RootState } from "../redux/store";

// export const process.env.NEXT_PUBLIC_BACKEND_LINK = "http://localhost:10000";
// export const process.env.NEXT_PUBLIC_BACKEND_LINK = "https://lottery-delivery-2-backend.vercel.app"

const CenteredLayout = () => {
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const state = useSelector((state: RootState) => state.location.state);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        await Promise.all([getalllotteries(), getLocation()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="loader bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="text-sm">Please wait while we load the data.</p>
        </div>
      </div>
    );
  }

  const allowedStates = ["Punjab", "Maharashtra", "Uttar Pradesh"];
  const isAllowedState = allowedStates.includes(state);

  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>

      {isAllowedState ? (
        <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto">
          <Header />
          <Carousel />
          <RetailerCard />
          <HowToUse />
          <Footer />
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center bg-black text-white">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Out of State</h1>
            <p className="text-sm mb-6">
              Sorry, we are currently only serving customers in Punjab, Maharashtra, and Uttar Pradesh. 
              Please check back later for updates on our expansion plans.
            </p>
          </div>
        </div>
      )}

      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default CenteredLayout;
