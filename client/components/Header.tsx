"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { ToLink } from "../app/page";
import {RootState, store} from "../redux/store"
import lotteriesreducer from "../redux/reducer/lotteryreducer";
import {setSearchLotteries}  from "../redux/action/lotteryactions";
import { useSelector,useDispatch } from "react-redux";
// import { getallcart } from "../utils/API/settingcart"
import {setUserPhone} from "../redux/slice/userSlice"
const Header = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isRetailer = useSelector((state: RootState) => state.retailer.isRetailer);
  const ID = useSelector((state: RootState) => state.retailer.id);
  const headerRef = useRef<HTMLDivElement>(null);
  // const phone = useSelector((state:RootState)=>state.user.phoneNo)
  const [search, setSearch] = useState("");
  const router = useRouter();
  const isLogin=useSelector((state:RootState)=>state.user.isLogin)
  const handleLogin=()=>{
    if(!isLogin)
    router.push(isRetailer ? `/${ID}/login`:"/login");
    else{
      dispatch(setUserPhone({
        phoneNo: "",
        isLogin:false
    }))
    }
  }
  const handleCart=()=>{
    if(!isLogin){
      router.push(isRetailer ? `/${ID}:/login`:"/login");}
    else{
      // getallcart(phone);
    router.push(isRetailer ? `/${ID}/cart`:"/cart");
    }
  }
  const handleSearch = async () => {
    console.log(search);
    if (search.trim() === "") {
      // notify("Please enter a search");
      return;
    }

    try {
      const res = await axios.get(`${ToLink}/search`, {
        params: { search },
        headers: {
          // Authorization: `Bearer ${accessToken}`,
        },
      });
      router.push(isRetailer ? `/${ID}/searchedlottery`:"/searchedlottery");
      // setSearchBooks(res.data.data.books);
      store.dispatch(setSearchLotteries(res.data.data.lotteries));
      console.log(res.data.data.lotteries); // Log books
    } catch (error) {
      console.error(
        "Error searching for books:",
        // error.response?.data?.message || error.message
      );
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getColorClass = (id: string) => {
    switch (id) {
      case "676c68cdc1c64b35fc8bcc8f":
        return "bg-blue-400"; // Example color for ID 1
      case "676c68cdc1c64b35fc8bcc90":
        return "bg-green-400"; // Example color for ID 2
      case "676c68cdc1c64b35fc8bcc91":
        return "bg-red-400"; // Example color for ID 3
      default:
        return "bg-yellow-400"; // Default color
    }
  };

  return (
    <div ref={headerRef} className={`px-4 py-3 ${getColorClass(ID)}`}>
      {/* Top Section */}
      <div className="flex justify-between items-center">
        {/* Branding */}
        <div>
          <p className="text-black text-sm">Fulltoss</p>
          <p className="text-black text-2xl font-bold">10 minutes</p>
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <div
            className="w-8 h-8 bg-white rounded-full flex justify-center items-center shadow cursor-pointer"
            onClick={toggleDropdown}
          >
            <FaUserAlt className="text-black" aria-label="User Profile" />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-0 w-36 bg-white shadow-lg rounded-lg text-sm text-gray-700 z-50 opacity-90"
            >
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleCart}
                >
                  My Cart
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push(isRetailer ? `/${ID}/contactus`:"/contactus")}
                >
                  Contact Us
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogin}>
                  {isLogin ? "Logout" : "Login"}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Subheading */}
      <div className="mt-2 text-sm text-black">
        HOME -{" "}
        <span className="font-semibold">
          Divya Kumar, Near Panchvati Jajmau
        </span>
      </div>

      {/* Search Bar */}
      <div className="mt-3">
        <div className="flex items-center bg-white rounded-full shadow px-3 py-1">
          <CiSearch className="text-gray-700" aria-label="Search Icon" onClick={handleSearch}/>
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 flex-grow bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
