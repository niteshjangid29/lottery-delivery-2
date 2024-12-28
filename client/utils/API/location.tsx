import { setLocation} from "../../redux/slice/locationSlice";
import axios from "axios";
import {store} from "../../redux/store";
const fetchCityFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENCAGEDATA_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing.");
      }

      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );

      const { city, state, country } = response.data.results[0].components || {};

      if (city && state && country) {
        store.dispatch(setLocation({ city, state, country }));
      } else {
        console.log("Could not determine the city.");
      }
    } catch (err) {
      console.log("Failed to fetch city from coordinates.");
    }
  };

  export const getLocation = () => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityFromCoordinates(latitude, longitude);
        },
        () => {
          console.log("Unable to fetch your location. Please enable location access.");
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  };