import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ticket {
  ticket: string;
  count: number;
  // _id: string;
}

export interface CartItem {
  id: string;
  // _id: string;
  // isAdmin: boolean;
  retailerID: string;
  lotteryName: string;
  type: string;
  drawDate: string;
  price: number;
  tickets: Ticket[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    removeTicket: (
      state,
      action: PayloadAction<{ lotteryId: string; ticketName: string }>
    ) => {
      const { lotteryId, ticketName } = action.payload;
      const lottery = state.items.find((item) => item.id === lotteryId);
    
      if (lottery) {
        const ticketIndex = lottery.tickets.findIndex(
          (ticket) => ticket.ticket === ticketName
        );
    
        if (ticketIndex !== -1) {
          lottery.tickets.splice(ticketIndex, 1);
          if (lottery.tickets.length === 0) {
            state.items = state.items.filter((item) => item.id !== lotteryId);
          }
        }
      }
    },
    
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log(action.payload);
      state.items.push(action.payload);
    },
    updateCart: (
      state,
      action: PayloadAction<{ lotteryId: string; updatedTickets: Ticket[] }>
    ) => {
      const { lotteryId, updatedTickets } = action.payload;
      const lottery = state.items.find((item) => item.id === lotteryId);

      if (lottery) {
        lottery.tickets = updatedTickets;
      }
    },
    setAllCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeTicket, updateCart,clearCart,setAllCart } = cartSlice.actions;
export default cartSlice.reducer;
