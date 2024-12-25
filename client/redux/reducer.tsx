import { combineReducers } from "redux";
import currTabReducer from "./slice/currTabSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/historySlice";
import lotteriesReducer from "./reducer/lotteryreducer";
import userReducer from "./slice/userSlice"
import retailerReducer from "./slice/retailerSlice";
const minReducer = combineReducers({
  currTab: currTabReducer,
  cart: cartReducer,
  order: orderReducer,
  lotteries: lotteriesReducer,
  user: userReducer,
  retailer: retailerReducer,
});

export default minReducer;
