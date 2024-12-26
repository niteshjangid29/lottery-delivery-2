import axios from "axios";
import { store } from "../../redux/store";
import { setAllCart } from "../../redux/slice/cartSlice";
import { ToLink } from "../../app/page";

export const getallcart = async (phone: string) => {
  console.log(phone);
  try {
    const response = await axios.get(`${ToLink}/userAllCart`, {
      params: {
        phone: phone,
      },
    });
    console.log(response.data.data);
    store.dispatch(setAllCart(response.data.data));
    store.dispatch({ type: "user/setUserCart", payload: {items:response.data.data} });
  } catch (e) {
    console.log("error in cart fetching");
    console.log(e);
  }
};
