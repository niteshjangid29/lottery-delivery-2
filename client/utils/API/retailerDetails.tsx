import axios from "axios";
// import { process.env.NEXT_PUBLIC_BACKEND_LINK } from "../../app/page";
export const getRetailerDetails = async (retailerID:any) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/retailer/${retailerID}`);
      if (!response) {
        console.error("Failed to fetch retailer data");
      }
      console.log(response.data.data);
      return response;
    //   const data = await response.json();
    //   console.log(data);
      // dispatch(setRetailerData(data));
    } catch (error) {
      console.error("Error fetching retailer data:", error);
    }
  };