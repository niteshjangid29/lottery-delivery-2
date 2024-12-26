import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type LotteryTicket = {
    _id: string;
    name: string;
    drawDate: string;
    prize: string;
    winningAmount: string;
    alltickets: Array<{ count: number; ticket: string[] }>;
    soldTickets: Array<{ count: number; ticket: string[]  }>;
    availableTickets: Array<{ count: number; ticket: string[] ;}>;
  };
interface RetailerState {
  id:string;
  name: string;
  phoneNo: string;
  email: string;
  isRetailer: boolean; 
  lotteries:LotteryTicket[];
}

const initialState: RetailerState = {
  id:"",
  name: "",
  phoneNo:"",
  email: "",
  isRetailer: false,
  lotteries: [],
};

const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {
    setRetailerDetails(state, action: PayloadAction<{ name: string; lotteries:LotteryTicket[];email:string ;phoneNo: string,isRetailer:boolean;_id:string}>) {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.phoneNo = action.payload.phoneNo;
      state.email = action.payload.email;
      state.isRetailer = action.payload.isRetailer;
      state.lotteries = action.payload.lotteries;
    },
  },
});

export const { setRetailerDetails} = retailerSlice.actions;
export default retailerSlice.reducer;
