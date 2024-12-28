import axios from "axios";
import { store } from "../../redux/store";
import { setAllCart } from "../../redux/slice/cartSlice";
// import { process.env.NEXT_PUBLIC_BACKEND_LINK } from "../../app/page";
import { CartItem } from "../../redux/slice/cartSlice";

export const getallcart = async (phone: string, ID: string) => {
  console.log(phone);
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/userAllCart`, {
      params: {
        phone: phone,
      },
    });

    // Properly type the items from the response
    console.log(response.data.data);
    const items: CartItem[] = response.data.data;
    console.log(items);
    // Filter items based on the given ID
    const filteredItems = items?.filter((item) => item.retailerID === (ID || "Admin"));
    // const filteredItems = items;


    console.log(filteredItems)
    store.dispatch(setAllCart(filteredItems));
    store.dispatch({
      type: "user/setUserCart",
      payload: { items: filteredItems },
    });
  } catch (e) {
    console.error("Error in cart fetching", e);
  }
};
