import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
// import { process.env.NEXT_PUBLIC_BACKEND_LINK } from "../../app/page";
import { LotteryTicket } from "../../redux/slice/retailerSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import img1 from "../../public/images/punjab.jpeg";
import img2 from "../../public/images/rattan.png";
import img3 from "../../public/images/rakhi.png";
import { useRouter } from "next/navigation";
import { store } from "../../redux/store";
import { clearOrder } from "../../redux/slice/historySlice";
import { getAllOrders } from "../../utils/API/settingorder";
import { getallcart } from "../../utils/API/settingcart";
import {clearCart} from "../../redux/slice/cartSlice";
const img = [img1, img2, img3];

interface Retailer {
  _id: string;
  name: string;
  lotteries: LotteryTicket;
  email: string;
  phone: number;
  about: string;
  address:string;
  rating: string;
}

const RetailerCard: React.FC = () => {
  const router = useRouter();
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const phoneNumber = useSelector((state: RootState) => state.user.phoneNo);
  const isLogin= useSelector((state:RootState) => state.user.isLogin);
  // Correct function name (handleRetailer instead of handleRetailers)
  const handleRetailer = (id: string) => {
    router.push(`/${id}`);
    store.dispatch(clearOrder());
    store.dispatch(clearCart());
    // console.log(isLogin)
    if(isLogin){
      getAllOrders(phoneNumber,id);
      getallcart(phoneNumber,id);
    }
  };

  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        console.log('Retail',process.env.NEXT_PUBLIC_NEXT_PUBLIC_BACKEND_LINK);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/retailersData`);
        if (!response) {
          console.error("Failed to fetch retailer data");
        }
        console.log(response.data.data);
        setRetailers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching retailer data:", error);
        setLoading(false);
      }
    };

    fetchRetailers();
  }, []);

  if (loading) {
    return <div className="h-[200px] flex items-center justify-center bg-white text-white">
    <div className="text-center">
      <p className="text-lg font-semibold text-black">Loading...</p>
    </div>
  </div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      <h2 className="text-2xl font-bold text-center text-yellow-600 mt-2">
        Our Retailers
      </h2>
      {retailers.map((retailer, idx) => (
        <div
          key={retailer._id}
          className="max-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer"
          onClick={() => handleRetailer(retailer._id)}
        >
          {/* Image Section */}
          <div className="relative">
            <Image
              src={img[idx]}
              alt={retailer.name}
              className="w-full h-auto object-cover"
              width={500}
              height={300}
            />
          </div>

          {/* Content Section */}
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{retailer.name}</h2>
              <span className="text-green-600 font-bold text-sm">
                {retailer.rating}  ★
              </span>
            </div>
            <p className="text-sm text-gray-500">{retailer.email}</p>
            <p className="text-sm text-gray-500">{retailer.phone}</p>

          </div>
        </div>
      ))}
    </div>
  );
};

export default RetailerCard;
