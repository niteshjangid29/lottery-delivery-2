'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../redux/store';
import { setUserDetails } from '../redux/slice/userSlice';
// import { process.env.NEXT_PUBLIC_BACKEND_LINK } from '../app/page';
import axios from 'axios';
const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Fetch user details from Redux store
  const { name, phoneNo, email, address } = useSelector((state: RootState) => state.user);
    console.log(name, phoneNo, email, address);
  // State variables for form inputs
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newAddress, setNewAddress] = useState(address);

  const handleContinue = async() => {
    try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/userDetails`, {
        name: newName,
        email: newEmail,
        address: newAddress,
        phone: phoneNo
      });
      if(response.status==200 ){
        // console.log(response.data.data[0]);
        dispatch(setUserDetails({
            name: newName,
            email: newEmail,
            address: newAddress,
        }));
      }
    } catch (error) {
        console.error(error);
        }
    router.back(); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome to FullToss Lottery
        </h1>
        
        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Name:</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone Input (non-editable) */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Phone Number:</h2>
            <label
              className="mt-1 block w-full p-2"
            >{phoneNo}</label>
          </div>

          {/* Email Input */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Email:</h2>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Address Input */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Address:</h2>
            <textarea
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
