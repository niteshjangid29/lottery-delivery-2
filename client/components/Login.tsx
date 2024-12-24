'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { ToLink } from "../app/page";
import UserDetail from "../components/Userdetail";
import {useDispatch,useSelector} from "react-redux"
import { setUserDetails, setUserPhone } from "../redux/slice/userSlice";
import { RootState } from "../redux/store";
import { FaArrowCircleLeft } from "react-icons/fa";
import { getallcart } from "../utils/API/settingcart"
const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0); 
  const isLogin = useSelector((state:RootState)=> state.user.isLogin)
  console.log(isLogin)
const dispatch = useDispatch();
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleSendCode = async () => {
    try {
      const response = await axios.post(`${ToLink}/generateOtp`, { phoneNumber });
      if (response.data.success) {
        setMessage("Verification code sent!");
        setTimer(30);
      } else {
        setMessage("Failed to send verification code.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(`${ToLink}/verifyOtp`, {
        phone: phoneNumber,
        otp: verificationCode,
      });
      if (response.data.success) {
        console.log(response.data);
        dispatch(setUserDetails({
          name:response.data.user.name,
          email:response.data.user.email,
          address:response.data.user.address,
        }))
        dispatch(setUserPhone({
            phoneNo: phoneNumber,
            isLogin:true
        }))
        getallcart(phoneNumber);

        setMessage("Phone number verified successfully!");
      } else {
        setMessage("Invalid verification code.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (<>
    <div className={"bg-white shadow-xl p-4 flex items-center"}>
        <FaArrowCircleLeft 
        className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-150 cursor-pointer"
        onClick={() => window.history.back()}
        />
        <h1 className="text-lg font-semibold flex-1 text-center">Login</h1>
    </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        
       {(!isLogin) ? (<div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login with SMS Authentication
        </h2>
       
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number:
              </label>
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleSendCode}
              className={`w-full ${
                timer > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white py-2 px-4 rounded-md transition`}
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Send Verification Code"}
            </button>
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                Verification Code:
              </label>
              <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter the code"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyCode}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Verify Code
            </button>
          </form>
        
      </div>) : (
          <UserDetail/>
        )}
    </div>
    </>);
};

export default LoginPage;
