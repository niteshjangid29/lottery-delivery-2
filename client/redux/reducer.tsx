import { combineReducers } from "redux";
import currTabReducer from "./slice/currTabSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/historySlice";
import lotteriesReducer from "./reducer/lotteryreducer";
const minReducer = combineReducers({
  currTab: currTabReducer,
  cart: cartReducer,
  order: orderReducer,
  lotteries: lotteriesReducer
});

export default minReducer;
