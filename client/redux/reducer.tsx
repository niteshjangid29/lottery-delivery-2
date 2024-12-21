import { combineReducers } from "redux";
import currTabReducer from "./slice/currTabSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/historySlice";
const minReducer = combineReducers({
  currTab: currTabReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default minReducer;
