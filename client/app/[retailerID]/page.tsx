'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HowToUse from "../../components/HowToUse";
import CarouselRetailer from "../../components/CarouselRetailer";
import HomeCard from "../../components/cards/CardforHome";
import SuperCard from "../../components/cards/Supercard";
import BestsellerCard from "../../components/cards/BestSellerCard";
import { getalllotteries } from "../../utils/API/filteringlottery";
import { getRetailerDetails } from "../../utils/API/retailerDetails";
import { setRetailerDetails } from "../../redux/slice/retailerSlice";
import { useDispatch,useSelector } from "react-redux";
import { getLocation } from "../../utils/API/location";
import { RootState } from "../../redux/store";
// export const ToLink = "http://localhost:10000";

const CenteredLayout = () => {
  const { retailerID } = useParams();
  const [isRetailer, setIsRetailer] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const dispatch = useDispatch();

  useEffect(() => {
    getLocation();
    const fetchRetailerDetails = async () => {
      try {
        const response = await getRetailerDetails(retailerID);
        console.log(response);

        if (response?.status === 200) {
          setIsRetailer(true);
          dispatch(
            setRetailerDetails({
              name: response.data.data.name,
              email: response.data.data.email,
              phoneNo: response.data.data.phone,
              lotteries: response.data.data.lotteries,
              isRetailer: true,
              _id: response.data.data._id,
              address: response.data.data.address,
              about: response.data.data.about,
              rating: response.data.data.rating,
            })
          );
        } else {
          setIsRetailer(false);
        }
      } catch (error) {
        console.error("Failed to fetch retailer details:", error);
        setIsRetailer(false);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchRetailerDetails();
    getalllotteries();
    
  }, [retailerID, dispatch]);
  const state= useSelector((state:RootState)=> state.location.state)
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="loader bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="text-sm">Please wait while we load the data.</p>
        </div>
      </div>
    );
  }

  if (!isRetailer) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Invalid Link</h1>
          <p className="text-sm mb-6">
            The link you followed is invalid, or the retailer does not exist. Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }
  if(state !=="Uttar Pradesh" && state !=="Maharastra" && state !=="Pubjab"){
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Out of State</h1>
        <p className="text-sm mb-6">
        Sorry, we are currently only serving customers in Uttar Pradesh. Please check back later for updates on our expansion plans.
        </p>
      </div>
    </div>
    );
  }

  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>
      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto">
        <Header />
        <CarouselRetailer />
        <SuperCard />
        <BestsellerCard />
        <HomeCard />
        <HowToUse />
        <Footer />
      </div>
      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default CenteredLayout;
