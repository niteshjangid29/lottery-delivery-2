'use client';
import { useState } from "react";
import axios from "axios";
import { ToLink } from "../app/page";

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleSendCode = async () => {
    try {
      const response = await axios.post(`${ToLink}/generateOtp`, { phoneNumber });
      if (response.data.success) {
        setMessage("Verification code sent!");
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
        setIsVerified(true);
        setMessage("Phone number verified successfully!");
      } else {
        setMessage("Invalid verification code.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Login with SMS Authentication
      </h2>
      {!isVerified ? (
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Send Verification Code
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
      ) : (
        <h3 className="text-center text-xl font-semibold text-green-600">
          You are successfully logged in!
        </h3>
      )}
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default LoginPage;
