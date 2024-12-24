import { combineReducers } from "redux";
import currTabReducer from "./slice/currTabSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/historySlice";
import lotteriesReducer from "./reducer/lotteryreducer";
import userReducer from "./slice/userSlice"
const minReducer = combineReducers({
  currTab: currTabReducer,
  cart: cartReducer,
  order: orderReducer,
  lotteries: lotteriesReducer,
  user: userReducer,
});

export default minReducer;
