import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type LotteryTicket = {
    _id: string;
    name: string;
    drawDate: string;
    prize: string;
    winningAmount: string;
    type:string;
    alltickets: Array<{ count: number; ticket: string[] }>;
    soldTickets: Array<{ count: number; ticket: string[]  }>;
    availableTickets: Array<{ count: number; ticket: string[] ;}>;
  };
  // interface Ticket {
  //   ticket: string;
  //   count: number;
  // }
  
  // interface Lottery {
  //   retailerID: string;
  //   lotteryName: string;
  //   drawDate: string;
  //   price: number;
  //   tickets: Ticket[];
  // }
  
  // interface Order {
  //   orders: Lottery[];
  //   totalAmount: number;
  //   orderDate: string;
  // }
interface RetailerState {
  id:string;
  name: string;
  phoneNo: string;
  email: string;
  address: string;
  about: string;
  // orderHistory:Order;
  rating:string;
  isRetailer: boolean; 
  lotteries:LotteryTicket[];
}

const initialState: RetailerState = {
  id:"",
  name: "",
  address: "",
  about: "",
  rating: "",
  // orderHistory: {
  //   orders: [],
  //   totalAmount: 0,
  //   orderDate: "",
  // },
  phoneNo:"",
  email: "",
  isRetailer: false,
  lotteries: [],
};

const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {
    setRetailerDetails(state, action: PayloadAction<{ name: string; lotteries:LotteryTicket[];email:string ;phoneNo: string,isRetailer:boolean;_id:string;address:string;about:string;rating:string}>) {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.phoneNo = action.payload.phoneNo;
      state.email = action.payload.email;
      state.isRetailer = action.payload.isRetailer;
      state.lotteries = action.payload.lotteries;
      state.address=action.payload.address;
      state.about=action.payload.about;
      state.rating=action.payload.rating;
    },
  },
});

export const { setRetailerDetails} = retailerSlice.actions;
export default retailerSlice.reducer;
