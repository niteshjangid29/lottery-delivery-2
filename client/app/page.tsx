'use client'
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HowToUse from "../components/HowToUse";
import Carousel from "../components/Carousel";
import HomeCard from "../components/cards/CardforHome";
import RetailerCard from "../components/cards/RetailerCard";
import SuperCard from "../components/cards/Supercard";
import BestsellerCard from "../components/cards/BestSellerCard";
import { getalllotteries } from "../utils/API/filteringlottery";
import Location from "../components/Location";
export const ToLink = "http://localhost:10000";
const CenteredLayout = () => {
  useEffect(() => {
    getalllotteries();
  }, []);
  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>

      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto">
        <Header />
        <Carousel />
        {/* <SuperCard /> */}
        {/* <BestsellerCard /> */}
        {/* <HomeCard /> */}
        <RetailerCard/>
        <HowToUse />
        {/* <Location /> */}
        {/* <div className="position-relative fixed bottom-0"> */}
        <Footer />
        {/* </div> */}
      </div>

      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default CenteredLayout;
