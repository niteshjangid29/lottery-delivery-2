// "use client";
// import React, { useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState} from "../redux/store";
// import { setLocation, clearLocation } from "../redux/slice/locationSlice";

// const CityTracker: React.FC = () => {
//   const location = useSelector((state: RootState) => state.location);
//   const dispatch = useDispatch();
//   const [error, setError] = React.useState<string | null>(null);

//   const fetchCityFromCoordinates = async (latitude: number, longitude: number) => {
//     try {
//       const apiKey = process.env.NEXT_PUBLIC_OPENCAGEDATA_API_KEY;
//       if (!apiKey) {
//         throw new Error("API key is missing.");
//       }

//       const response = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
//       );

//       const { city, state, country } = response.data.results[0].components || {};

//       if (city && state && country) {
//         dispatch(setLocation({ city, state, country }));
//       } else {
//         setError("Could not determine the city.");
//       }
//     } catch (err) {
//       setError("Failed to fetch city from coordinates.");
//     }
//   };

//   const getLocation = () => {
//     if (typeof window !== "undefined" && "geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchCityFromCoordinates(latitude, longitude);
//         },
//         () => {
//           setError("Unable to fetch your location. Please enable location access.");
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by your browser.");
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
//       {/* <h2 className="text-lg font-semibold text-gray-800 mb-4">City Tracker</h2>
//       {location.city ? (
//         <div>
//           <p className="text-gray-700">City: {location.city}</p>
//           <p className="text-gray-700">State: {location.state}</p>
//           <p className="text-gray-700">Country: {location.country}</p>
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <p className="text-gray-500">Fetching your location...</p>
//       )}
//       <button
//         onClick={getLocation}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Refresh Location
//       </button>
//       <button
//         onClick={() => dispatch(clearLocation())}
//         className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Clear Location
//       </button> */}
//     </div>
//   );
// };

// export default CityTracker;
