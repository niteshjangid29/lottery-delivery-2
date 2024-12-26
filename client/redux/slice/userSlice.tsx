// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Ticket {
  ticket: string;
  count: number;
  // _id: string;
}

interface CartItem {
  id: string;
  retailerID: string;
  lotteryName: string;
  drawDate: string;
  price: number;
  tickets: Ticket[];
}

// interface CartState {
//   items: CartItem[];
// }
interface UserState {
  name: string;
  address: string;
  phoneNo: string;
  email: string;
  isLogin: boolean;
  items: CartItem[];
}

const initialState: UserState = {
  name: "",
  address: "",
  phoneNo:"",
  email: "",
  isLogin: false,
  items: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<{ name: string; address: string;email:string }>) {
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.email = action.payload.email;
    },
    setUserPhone(state, action: PayloadAction<{ phoneNo: string,isLogin:boolean;}>) { state.phoneNo= action.payload.phoneNo;state.isLogin= action.payload.isLogin},
    setUserCart(state, action: PayloadAction<{items: CartItem[]}>) { state.items=action.payload.items;}
  },
});

export const { setUserDetails,setUserPhone,setUserCart } = userSlice.actions;
export default userSlice.reducer;
