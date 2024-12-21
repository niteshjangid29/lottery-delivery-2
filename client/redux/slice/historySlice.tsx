import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
  ticket: string;
  count: number;
}

interface Lottery {
  lotteryName: string;
  drawDate: string;
  price: number;
  tickets: Ticket[];
}

interface Order {
  orders: Lottery[];
  totalAmount: number;
  orderDate: string;
}

interface OrderState {
  orderHistory: Order[];
}

const initialState: OrderState = {
  orderHistory: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orderHistory.push(action.payload);
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
